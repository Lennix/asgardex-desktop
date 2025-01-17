import { FeeOption, Network } from '@xchainjs/xchain-client'
import { baseAmount, bn } from '@xchainjs/xchain-util'

import { WalletType } from '../wallet/types'
import { AssetRuneNative } from './asset'
import {
  isAsset,
  isBaseAmount,
  isError,
  isEvmHDMode,
  isFeeOption,
  isKeystoreWallet,
  isLedgerWallet,
  isNetwork,
  isWalletType
} from './guard'

describe('shared/utils/guard', () => {
  describe('isAsset', () => {
    it('true for "THOR.RUNE"', () => {
      expect(isAsset('THOR.RUNE')).toBeTruthy()
    })
    it('true for AssetRuneNative', () => {
      expect(isAsset(AssetRuneNative)).toBeTruthy()
    })
    it('false for invalid chain ', () => {
      expect(isAsset({ symbol: 'THOR', chain: 'INVALID', ticker: 'RUNE' })).toBeFalsy()
    })
    it('false for invalid string ', () => {
      expect(isAsset('invalid')).toBeFalsy()
    })
  })

  describe('isNetwork', () => {
    it('true for "mainnet"', () => {
      expect(isNetwork(Network.Mainnet)).toBeTruthy()
    })
    it('true for "stagenet"', () => {
      expect(isNetwork(Network.Stagenet)).toBeTruthy()
    })
    it('true for testnet', () => {
      expect(isNetwork(Network.Testnet)).toBeTruthy()
    })
    it('false for invalid network ', () => {
      expect(isNetwork('network')).toBeFalsy()
    })
  })

  describe('isNetwork', () => {
    it('legacy', () => {
      expect(isEvmHDMode('legacy')).toBeTruthy()
    })
    it('ledgerlive', () => {
      expect(isEvmHDMode('ledgerlive')).toBeTruthy()
    })
    it('metamask', () => {
      expect(isEvmHDMode('metamask')).toBeTruthy()
    })
    it('false for invalid value', () => {
      expect(isNetwork('anything')).toBeFalsy()
    })
  })

  describe('isBaseAmount', () => {
    it('true"', () => {
      expect(isBaseAmount(baseAmount(1))).toBeTruthy()
    })
    it('false -> BigNumber', () => {
      expect(isBaseAmount(bn('123'))).toBeFalsy()
    })
    it('false -> string', () => {
      expect(isBaseAmount('123')).toBeFalsy()
      expect(isBaseAmount('')).toBeFalsy()
    })
    it('false -> number', () => {
      expect(isBaseAmount(2)).toBeFalsy()
    })
    it('false -> misc.', () => {
      expect(isBaseAmount(undefined)).toBeFalsy()
      expect(isBaseAmount(null)).toBeFalsy()
      expect(isBaseAmount({ hello: 'world' })).toBeFalsy()
      expect(isBaseAmount({})).toBeFalsy()
    })
  })

  describe('isWalletType', () => {
    it('true for "ledger"', () => {
      expect(isWalletType(WalletType.Ledger)).toBeTruthy()
    })
    it('true for "keystore"', () => {
      expect(isWalletType(WalletType.Keystore)).toBeTruthy()
    })
    it('false for invalid string', () => {
      expect(isWalletType('invalid')).toBeFalsy()
    })
  })

  describe('isLedgerWallet', () => {
    it('false for "keystore"', () => {
      expect(isLedgerWallet(WalletType.Keystore)).toBeFalsy()
    })
    it('true for "ledger"', () => {
      expect(isLedgerWallet(WalletType.Ledger)).toBeTruthy()
    })
  })

  describe('isKeystoreWallet', () => {
    it('false for "ledger"', () => {
      expect(isKeystoreWallet(WalletType.Ledger)).toBeFalsy()
    })
    it('true for "keystore"', () => {
      expect(isKeystoreWallet(WalletType.Keystore)).toBeTruthy()
    })
  })

  describe('isError', () => {
    it('true for object with message key', () => {
      expect(isError(new Error('foo'))).toBeTruthy()
    })
    it('false for string', () => {
      expect(isError('foo')).toBeFalsy()
    })

    it('false for object with message key', () => {
      expect(isError({ message: 'message' })).toBeFalsy()
    })

    it('false for empty object', () => {
      expect(isError({})).toBeFalsy()
    })
  })

  describe('isFeeOption', () => {
    it('true (Average)', () => {
      expect(isFeeOption(FeeOption.Average)).toBeTruthy()
    })
    it('true (Fast)', () => {
      expect(isFeeOption(FeeOption.Fast)).toBeTruthy()
    })
    it('true (Fastest)', () => {
      expect(isFeeOption(FeeOption.Fastest)).toBeTruthy()
    })
    it('false (random string)', () => {
      expect(isFeeOption('foo')).toBeFalsy()
    })
    it('false (null|undefined)', () => {
      expect(isFeeOption(null)).toBeFalsy()
      expect(isFeeOption(undefined)).toBeFalsy()
    })
  })
})
