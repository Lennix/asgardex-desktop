import { bn, baseAmount } from '@xchainjs/xchain-util'

import { ASSETS_MAINNET } from '../../../shared/mock/assets'
import { AssetBTC, AssetBSC, AssetETH, AssetRuneNative } from '../../../shared/utils/asset'
import { WalletType } from '../../../shared/wallet/types'
import { AssetUSDC, ZERO_BASE_AMOUNT } from '../../const'
import { WalletBalance } from '../../services/wallet/types'
import { PoolData, PricePool } from '../../views/pools/Pools.types'
import { ordBigNumber, ordBaseAmount, ordAsset, ordWalletBalanceByAsset, ordPricePool } from './ord'

describe('helpers/fp/ord', () => {
  describe('ordBigNumber', () => {
    it('is greater', () => {
      expect(ordBigNumber.compare(bn(1.01), bn(1))).toEqual(1)
    })
    it('is less', () => {
      expect(ordBigNumber.compare(bn(1), bn(1.01))).toEqual(-1)
    })
  })
  describe('ordBaseAmount', () => {
    it('is greater', () => {
      expect(ordBaseAmount.compare(baseAmount(101), baseAmount(1))).toEqual(1)
    })
    it('is less', () => {
      expect(ordBaseAmount.compare(baseAmount(1), baseAmount(101))).toEqual(-1)
    })
    it('is equal', () => {
      expect(ordBaseAmount.compare(baseAmount(1), baseAmount(1))).toEqual(0)
    })
  })
  describe('ordAsset', () => {
    it('is less', () => {
      expect(ordAsset.compare(AssetRuneNative, AssetBTC)).toEqual(1)
    })
    it('is grreater', () => {
      expect(ordAsset.compare(AssetBTC, AssetRuneNative)).toEqual(-1)
    })
    it('is equal', () => {
      expect(ordAsset.compare(AssetBTC, AssetBTC)).toEqual(0)
    })
  })
  describe('ordWalletBalanceByAsset', () => {
    const a: WalletBalance = {
      walletType: WalletType.Keystore,
      amount: baseAmount('1'),
      asset: AssetRuneNative,
      walletAddress: '',
      walletAccount: 0,
      walletIndex: 0,
      hdMode: 'default'
    }
    const b: WalletBalance = {
      ...a,
      asset: AssetBSC
    }
    const c: WalletBalance = {
      ...a,
      asset: ASSETS_MAINNET.BTC
    }
    it('is less', () => {
      expect(ordWalletBalanceByAsset.compare(a, b)).toEqual(1)
    })
    it('is greater', () => {
      expect(ordWalletBalanceByAsset.compare(b, c)).toEqual(-1)
    })
    it('is equal', () => {
      expect(ordWalletBalanceByAsset.compare(a, a)).toEqual(0)
    })
  })

  describe('ordPricePool', () => {
    const poolData: PoolData = {
      dexBalance: ZERO_BASE_AMOUNT,
      assetBalance: ZERO_BASE_AMOUNT
    }
    const rune: PricePool = {
      asset: AssetRuneNative,
      poolData
    }
    const eth: PricePool = {
      poolData,
      asset: AssetETH
    }
    const btc: PricePool = {
      poolData,
      asset: AssetBTC
    }
    const usd: PricePool = {
      poolData,
      asset: AssetUSDC
    }
    it('rune > eth', () => {
      expect(ordPricePool.compare(rune, eth)).toEqual(1)
    })
    it('eth < btc', () => {
      expect(ordPricePool.compare(eth, btc)).toEqual(-1)
    })
    it('usd < btc', () => {
      expect(ordPricePool.compare(usd, btc)).toEqual(-1)
    })
  })
})
