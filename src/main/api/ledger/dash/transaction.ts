import Transport from '@ledgerhq/hw-transport'
import { FeeRate, Network, TxHash } from '@xchainjs/xchain-client'
import {
  AssetDASH,
  BitgoProviders,
  ClientLedger,
  DASHChain,
  DASH_DECIMAL,
  defaultDashParams
} from '@xchainjs/xchain-dash'
import { Address, BaseAmount } from '@xchainjs/xchain-util'
import { BlockcypherNetwork, BlockcypherProvider, UtxoOnlineDataProviders } from '@xchainjs/xchain-utxo-providers'
import * as E from 'fp-ts/lib/Either'

import { LedgerError, LedgerErrorId } from '../../../../shared/api/types'
import { isError } from '../../../../shared/utils/guard'
import { removeAffiliate } from '../doge/common'
import { getDerivationPaths } from './common'

/**
 * Sends DASH tx using Ledger
 */
export const send = async ({
  transport,
  network,
  sender,
  recipient,
  amount,
  feeRate,
  memo,
  walletAccount,
  walletIndex,
  apiKey
}: {
  transport: Transport
  network: Network
  sender?: Address
  recipient: Address
  amount: BaseAmount
  feeRate: FeeRate
  memo?: string
  walletAccount: number
  walletIndex: number
  apiKey: string
}): Promise<E.Either<LedgerError, TxHash>> => {
  if (!sender) {
    return E.left({
      errorId: LedgerErrorId.GET_ADDRESS_FAILED,
      msg: `Getting sender address using Ledger failed`
    })
  }
  //======================
  // Block Cypher
  //======================

  const mainnetBlockcypherProvider = new BlockcypherProvider(
    'https://api.blockcypher.com/v1',
    DASHChain,
    AssetDASH,
    DASH_DECIMAL,
    BlockcypherNetwork.DASH,
    apiKey || ''
  )
  const BlockcypherDataProviders: UtxoOnlineDataProviders = {
    [Network.Testnet]: undefined,
    [Network.Stagenet]: mainnetBlockcypherProvider,
    [Network.Mainnet]: mainnetBlockcypherProvider
  }

  try {
    const dashClient = new ClientLedger({
      transport,
      ...defaultDashParams,
      rootDerivationPaths: getDerivationPaths(walletAccount, network),
      dataProviders: [BlockcypherDataProviders, BitgoProviders],
      network: network
    })
    const newMemo = memo !== undefined ? removeAffiliate(memo) : memo // removes affilaite to shorten memo.
    const txHash = await dashClient.transfer({
      asset: AssetDASH,
      recipient,
      amount,
      memo: newMemo,
      walletIndex,
      feeRate
    })

    if (!txHash) {
      return E.left({
        errorId: LedgerErrorId.INVALID_RESPONSE,
        msg: `Post request to send DASH transaction using Ledger failed`
      })
    }
    return E.right(txHash)
  } catch (error) {
    return E.left({
      errorId: LedgerErrorId.SEND_TX_FAILED,
      msg: isError(error) ? error?.message ?? error.toString() : `${error}`
    })
  }
}
