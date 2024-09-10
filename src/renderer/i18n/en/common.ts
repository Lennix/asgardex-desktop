import { CommonMessages } from '../types'

const common: CommonMessages = {
  'common.stats': 'Stats',
  'common.network': 'Network',
  'common.dex': 'Dex',
  'common.faqs': 'FAQs',
  'common.greeting': 'Hello {name}',
  'common.copyright': '©',
  'common.type': 'Type',
  'common.chain': 'Chain',
  'common.store': 'Store',
  'common.address': 'Address',
  'common.addresses': 'Addresses',
  'common.savedAddresses': 'Saved Addresses',
  'common.addAddress': 'Address added successfully',
  'common.removeAddress': 'Address removed sucessfully',
  'common.thorname': 'THORName',
  'common.thornameRegistrationSpecifics':
    'THORNames allow anyone to register cross-chain wallet addresses to a 1-30 long string of hexadecimal characters which include special characters -_+. THORNames are limited to 30 characters, including ^[a-zA-Z0-9+_-]+$',
  'common.thornameError': 'THORName not available',
  'common.mayaname': 'MAYAName',
  'common.owner': 'Owner',
  'common.preferredAsset': 'Preferred Asset',
  'common.expirationBlock': 'Expiry Block',
  'common.aliasChain': 'Alias Chain',
  'common.aliasAddress': 'Alias Address',
  'common.expiry': 'Expiry',
  'common.isUpdate': 'Update THORName',
  'common.address.self': 'Self',
  'common.to': 'To',
  'common.from': 'From',
  'common.filterValue': 'Filter out empty balances',
  'common.amount': 'Amount',
  'common.coin': 'Coin',
  'common.collapseAll': 'Collapse All',
  'common.expandAll': 'Expand All',
  'common.password': 'Password',
  'common.memo': 'Memo',
  'common.memos': 'Memos',
  'common.date': 'Date',
  'common.refresh': 'Refresh',
  'common.back': 'Back',
  'common.general': 'General',
  'common.advanced': 'Advanced',
  'common.privateData': 'Private Data',
  'common.enable': '{chain} enabled',
  'common.disable': '{chain} disabled',
  'common.disabledChains': 'Disabled Chains',
  'common.chainDisabled': 'You have disabled {chain} chain, please enable to continue with swap',
  'common.remove': 'Remove',
  'common.keystore': 'Keystore',
  'common.keystorePassword': 'Keystore password',
  'common.ledger': 'Ledger',
  'common.phrase': 'Phrase',
  'common.submit': 'Submit',
  'common.confirm': 'Confirm',
  'common.cancel': 'Cancel',
  'common.reject': 'Reject',
  'common.next': 'Next',
  'common.finish': 'Finish',
  'common.copy': 'Copy',
  'common.loading': 'Loading…',
  'common.error': 'Error',
  'common.error.api.limit': 'API rate limit exceeded',
  'common.test': 'Test',
  'common.change': 'Change',
  'common.wallet': 'Wallet',
  'common.history': 'History',
  'common.settings': 'Settings',
  'common.asset': 'Asset',
  'common.assets': 'Assets',
  'common.rune': '{dex}',
  'common.pool': 'Pool',
  'common.pool.inbound': 'Pool Inbound',
  'common.pools': 'Pools',
  'common.price': 'Price',
  'common.price.rune': 'RUNE price',
  'common.price.cacao': 'Cacao price',
  'common.transaction': 'Transaction',
  'common.transaction.short.rune': '{dex} tx',
  'common.transaction.short.asset': 'Asset tx',
  'common.viewTransaction': 'View transaction',
  'common.copyTxUrl': 'Copy transaction url',
  'common.trackTransaction': 'Track transaction',
  'common.copyTxHash': 'Copy transaction hash',
  'common.fee': 'Fee',
  'common.feeRate': 'Fee Rate',
  'common.fee.nodeOperator': 'Node Operator Fee %',
  'common.fees': 'Fees',
  'common.fee.estimated': 'Estimated fee',
  'common.fees.estimated': 'Estimated fees',
  'common.fee.inbound': 'Inbound',
  'common.fee.inbound.rune': '{dex} inbound',
  'common.fee.inbound.asset': 'Asset inbound',
  'common.fee.outbound': 'Outbound',
  'common.fee.outbound.rune': '{dex} outbound',
  'common.fee.outbound.asset': 'Asset outbound',
  'common.fee.affiliate': 'Affiliate',
  'common.max': 'Max',
  'common.min': 'Min',
  'common.search': 'Search',
  'common.searchAsset': 'Search Asset',
  'common.addAsset': 'Token not showing? add manually',
  'common.removeAsset': 'Remove asset from wallet view',
  'common.searchExample': 'Search example for non synth chain.ticker i.e btc.btc or for synth btc/btc',
  'common.excludeSynth': 'Exclude Synths',
  'common.retry': 'Retry',
  'common.reload': 'Reload',
  'common.action': 'Action',
  'common.add': 'Add',
  'common.completeLp': 'Complete Lp',
  'common.swap': 'Swap',
  'common.savers': 'Savers',
  'common.lending': 'Lending',
  'common.collateral': 'Collateral',
  'common.debt': 'Debt',
  'common.borrow': 'Borrow',
  'common.repay': 'Repay',
  'common.earn': 'Earn',
  'common.withdraw': 'Withdraw',
  'common.liquidity': 'Liquidity',
  'common.approve': 'Approve',
  'common.accept': 'Accept',
  'common.approve.checking': 'Checking allowance for {asset}',
  'common.approve.error': 'Error while checking allowance for {asset}: {error}',
  'common.step': 'Step {current}/{total}',
  'common.done': 'Done',
  'common.nodeAddress': 'Node address',
  'common.providerAddress': 'Provider address',
  'common.tx.healthCheck': 'Health check',
  'common.tx.sending': 'Send transaction',
  'common.tx.sendingAsset': 'Send {assetTicker} transaction',
  'common.tx.success': 'Transaction has been sent successfully',
  'common.tx.success-info':
    'The transaction might take some time to be confirmed (up to several minutes depending on the chain)',
  'common.tx.checkResult': 'Check result',
  'common.tx.view': 'View {assetTicker} transaction',
  'common.modal.confirmTitle': 'Confirm action',
  'common.value': 'Value',
  'common.manage': 'Manage',
  'common.managePosition': 'Manage Position',
  'common.analytics': 'Analytics',
  'common.asset.base': 'Base',
  'common.asset.change': 'Change asset',
  'common.asset.quickSelect': 'Quick Select L1',
  'common.noResult': 'No result',
  'common.rate': 'Rate',
  'common.tx.type.swap': 'Swap',
  'common.tx.type.donate': 'Donate',
  'common.tx.type.refund': 'Refund',
  'common.tx.type.deposit': 'Deposit',
  'common.tx.type.withdraw': 'Withdraw',
  'common.detail': 'Detail',
  'common.details': 'Details',
  'common.filter': 'Filter',
  'common.all': 'All',
  'common.time.days': '{days} days',
  'common.time.days.short': '{days}d',
  'common.time.month1': '1 month',
  'common.time.month1.short': '1m',
  'common.time.months3': '3 months',
  'common.time.months3.short': '3m',
  'common.time.year1': '1 year',
  'common.time.year1.short': '1y',
  'common.time.all': 'All',
  'common.time.all.short': 'All',
  'common.time.title': 'Time',
  'common.inbound.time': 'Inbound',
  'common.outbound.time': 'Outbound',
  'common.streaming.time': 'Streaming',
  'common.streaming.time.info': 'Estimated time for this streaming swap to be completed',
  'common.totaltransaction.time': 'Total transaction time',
  'common.confirmation.time': '{chain} Chain Confirmation',
  'common.theme.light': 'Day mode',
  'common.theme.dark': 'Night mode',
  'common.volume24': 'Volume (24h)',
  'common.volume24.description': '24h volume of swaps, add liquidity and withdrawals',
  'common.informationMore': 'More information',
  'common.balance': 'Balance',
  'common.balance.loading': 'Loading balance',
  'common.balances': 'Balances',
  'common.custom': 'Custom',
  'common.notsupported.fornetwork': 'Not supported for {network}',
  'common.recipient': 'Recipient',
  'common.sender': 'Sender',
  'common.legacy': 'Legacy',
  'common.ledgerlive': 'Ledger Live',
  'common.metamask': 'MetaMask',
  'common.unknown': 'Unknown',
  'common.featureUnderDevelopment': 'Feature under development, do not use'
}

export default common
