import * as RD from '@devexperts/remote-data-ts'
import { ARB_GAS_ASSET_DECIMAL } from '@xchainjs/xchain-arbitrum'
import { Fees, FeeType } from '@xchainjs/xchain-client'
import { getFee, GasPrices, Client } from '@xchainjs/xchain-evm'
import { Asset, baseAmount } from '@xchainjs/xchain-util'
import { ethers } from 'ethers'
import * as FP from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
import * as Rx from 'rxjs'
import * as RxOp from 'rxjs/operators'

import { isAethAsset } from '../../helpers/assetHelper'
import { observableState } from '../../helpers/stateHelper'
import { FeeLD } from '../chain/types'
import * as C from '../clients'
import { FeesLD } from '../clients'
import { ERC20_OUT_TX_GAS_LIMIT, ETH_OUT_TX_GAS_LIMIT, EVMZeroAddress } from '../evm/const'
import { FeesService, PollInTxFeeParams, ApproveFeeHandler, ApproveParams, TxParams } from '../evm/types'
import { Client$ } from '../evm/types'

export const createFeesService = (client$: Client$): FeesService => {
  const { get$: reloadFees$, set: reloadFees } = observableState<TxParams>({
    amount: baseAmount(1),
    recipient: EVMZeroAddress
  })

  const fees$ = (params: TxParams): FeesLD =>
    Rx.combineLatest([reloadFees$, client$]).pipe(
      RxOp.switchMap(([reloadFeesParams, oClient]) =>
        FP.pipe(
          oClient,
          O.fold(
            () => Rx.EMPTY,
            (client) => Rx.from(estimateAndCalculateFees(client, reloadFeesParams || params))
          )
        )
      ),
      RxOp.map(RD.success),
      RxOp.catchError((error) => Rx.of(RD.failure(error))),
      RxOp.startWith(RD.pending)
    )

  async function estimateAndCalculateFees(client: Client, params: TxParams) {
    // Estimate gas prices
    const gasPrices = await client.estimateGasPrices()
    const { fast: fastGP, fastest: fastestGP, average: averageGP } = gasPrices

    // Estimate gas limit
    const gasLimit = await client.estimateGasLimit({
      from: params.from,
      asset: params.asset as Asset,
      amount: params.amount,
      recipient: params.recipient,
      memo: params.memo
    })
    const fees: Fees = {
      type: FeeType.PerByte,
      average: getFee({ gasPrice: averageGP, gasLimit, decimals: ARB_GAS_ASSET_DECIMAL }),
      fast: getFee({ gasPrice: fastGP, gasLimit, decimals: ARB_GAS_ASSET_DECIMAL }),
      fastest: getFee({ gasPrice: fastestGP, gasLimit, decimals: ARB_GAS_ASSET_DECIMAL })
    }
    // Calculate fees
    return fees
  }

  /**
   * Fees for sending txs into pool on Arb
   **/
  const poolInTxFees$ = ({ address, abi, func, params }: PollInTxFeeParams): C.FeesLD =>
    client$.pipe(
      RxOp.switchMap((oClient) =>
        FP.pipe(
          oClient,
          O.fold(
            () => Rx.of(RD.initial),
            (client) =>
              Rx.combineLatest([
                client.estimateCall({ contractAddress: address, abi, funcName: func, funcParams: params }),
                client.estimateGasPrices()
              ]).pipe(
                RxOp.map<[ethers.BigNumber, GasPrices], Fees>(([gasLimit, gasPrices]) => ({
                  type: FeeType.PerByte,
                  average: getFee({ gasPrice: gasPrices.average, gasLimit, decimals: ARB_GAS_ASSET_DECIMAL }),
                  fast: getFee({ gasPrice: gasPrices.fast, gasLimit, decimals: ARB_GAS_ASSET_DECIMAL }),
                  fastest: getFee({ gasPrice: gasPrices.fastest, gasLimit, decimals: ARB_GAS_ASSET_DECIMAL })
                })),
                RxOp.map(RD.success),
                RxOp.catchError((error) => Rx.of(RD.failure(error))),
                RxOp.startWith(RD.pending)
              )
          )
        )
      )
    )

  /**
   * Fees for sending txs out of a pool on Arb
   **/
  const poolOutTxFee$ = (asset: Asset): C.FeesLD =>
    client$.pipe(
      RxOp.switchMap((oClient) =>
        FP.pipe(
          oClient,
          O.fold(
            () => Rx.of(RD.initial),
            (client) => {
              const gasLimit = isAethAsset(asset) ? ETH_OUT_TX_GAS_LIMIT : ERC20_OUT_TX_GAS_LIMIT
              return Rx.from(client.estimateGasPrices()).pipe(
                RxOp.map<GasPrices, Fees>((gasPrices) => ({
                  type: FeeType.PerByte,
                  average: getFee({ gasPrice: gasPrices.average, gasLimit, decimals: ARB_GAS_ASSET_DECIMAL }),
                  fast: getFee({ gasPrice: gasPrices.fast, gasLimit, decimals: ARB_GAS_ASSET_DECIMAL }),
                  fastest: getFee({ gasPrice: gasPrices.fastest, gasLimit, decimals: ARB_GAS_ASSET_DECIMAL })
                })),
                RxOp.map(RD.success),
                RxOp.catchError((error) => Rx.of(RD.failure(error))),
                RxOp.startWith(RD.pending)
              )
            }
          )
        )
      )
    )

  /**
   * Fees for approve Tx
   **/
  const approveTxFee$ = ({ spenderAddress, contractAddress, fromAddress }: ApproveParams): FeeLD =>
    client$.pipe(
      RxOp.switchMap((oClient) =>
        FP.pipe(
          oClient,
          O.fold(
            () => Rx.of(RD.initial),
            (client) =>
              Rx.combineLatest([
                client.estimateApprove({ contractAddress, spenderAddress, fromAddress }),
                client.estimateGasPrices()
              ]).pipe(
                RxOp.map(([gasLimit, gasPrices]) =>
                  getFee({ gasPrice: gasPrices.fast, gasLimit, decimals: ARB_GAS_ASSET_DECIMAL })
                ),
                RxOp.map(RD.success),
                RxOp.catchError((error) => Rx.of(RD.failure(error))),
                RxOp.startWith(RD.pending)
              )
          )
        )
      )
    )

  // state for reloading approve fees
  const { get$: reloadApproveFee$, set: reloadApproveFee } = observableState<ApproveParams | undefined>(undefined)

  const approveFee$: ApproveFeeHandler = (params) => {
    return reloadApproveFee$.pipe(
      RxOp.debounceTime(300),
      RxOp.switchMap((approveParams) => {
        return FP.pipe(
          Rx.from(
            // asset
            approveTxFee$(approveParams || params)
          )
        )
      })
    )
  }

  return {
    fees$,
    reloadFees,
    poolInTxFees$,
    poolOutTxFee$,
    approveFee$,
    reloadApproveFee
  }
}
