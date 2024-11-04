import { DepositMessages } from '../types'

const deposit: DepositMessages = {
  'deposit.interact.actions.bond': 'निवेश करें',
  'deposit.interact.actions.unbond': 'निकालें',
  'deposit.interact.actions.leave': 'बाहर जाएं',
  'deposit.interact.actions.runePool': 'रून पूल',
  'deposit.interact.actions.buyThorname': 'THORName खरीदें',
  'deposit.interact.actions.buyMayaname': 'MAYAName खरीदें',
  'deposit.interact.actions.checkThorname': 'उपलब्धता जांचें',
  'deposit.interact.actions.addBondProvider': 'बांड प्रदाता जोड़ें',
  'deposit.interact.title': 'जमा',
  'deposit.interact.subtitle': '{chain}Chain के साथ इंटरैक्ट करें',
  'deposit.interact.label.bondprovider': 'बांड प्रदाता (वैकल्पिक)',
  'deposit.share.title': 'पूल में आपकी कुल हिस्सेदारी',
  'deposit.share.units': 'लिक्विडिटी इकाइयाँ',
  'deposit.share.poolshare': 'पूल में हिस्सा',
  'deposit.share.total': 'कुल मूल्य',
  'deposit.redemption.title': 'वर्तमान खरीद मूल्य',
  'deposit.totalEarnings': 'पूल से आपकी कुल कमाई',
  'deposit.add.sym': 'जोड़ें',
  'deposit.add.asym': '{asset} जोड़ें',
  'deposit.add.runeSide': '{dex} साइड',
  'deposit.add.assetSide': 'एसेट साइड',
  'deposit.add.min.info': 'सभी आवक और जावक लेन-देन शुल्कों को कवर करने के लिए न्यूनतम जमा राशि।',
  'deposit.add.max.infoWithFee': 'अनुमानित शुल्क ({fee}) को घटाकर बैलेंस ({balance}) के आधार पर अधिकतम जमा राशि।',
  'deposit.add.max.info': 'दूसरे पक्ष के एसेट के अनुसार बैलेंस ({balance}) के आधार पर अधिकतम जमा राशि।',
  'deposit.add.state.sending': 'जमा के लिए लेन-देन भेज रहे हैं',
  'deposit.add.state.checkResults': 'जमा की स्थिति जांचें',
  'deposit.add.state.pending': 'जमा जोड़ रहे हैं',
  'deposit.add.state.success': 'जमा सफलतापूर्वक पूरा हुआ',
  'deposit.add.state.error': 'निधि जमा करने में त्रुटि',
  'deposit.add.error.chainFeeNotCovered': 'आवश्यक शुल्क {fee} आपके बैलेंस से कवर नहीं होता: {balance}',
  'deposit.add.error.nobalances': 'कोई फंड नहीं',
  'deposit.add.error.nobalance1': 'आपके पास {asset} के जमा के लिए वॉलेट में कोई फंड नहीं है',
  'deposit.add.error.nobalance2': 'आपके पास {asset1} और {asset2} के जमा के लिए वॉलेट में कोई फंड नहीं है',
  'deposit.add.pendingAssets.title': 'लंबित एसेट्स का पता चला',
  'deposit.add.pendingAssets.description':
    'ये एसेट्स सफलतापूर्वक भेजे गए थे, लेकिन दूसरे एसेट के लिए लेन-देन पूरा नहीं हुआ या उसे भेजते समय त्रुटि हुई:',
  'deposit.add.failedAssets.description':
    'नीचे दिए गए एसेट को जोड़ने में विफल रहे, कृपया जांच लें कि यह सही है या नहीं।',
  'deposit.add.pendingAssets.recoveryDescriptionRune':
    'रून एलपी जोड़ने को पूरा करने के लिए: वॉलेट में कस्टम जमा विकल्प का उपयोग करके मेमो के साथ रून राशि जमा करें',
  'deposit.add.pendingAssets.recoveryDescriptionAsset':
    'एक एसेट एलपी जोड़ने के लिए: इनबाउंड एड्रेस पर मेमो के साथ एसेट राशि भेजने के लिए वॉलेट में भेजने का विकल्प उपयोग करें',
  'deposit.add.pendingAssets.recoveryTitle': 'रिकवरी टूल खोलें',
  'deposit.add.asymAssets.title': 'असममित जमा पाया गया',
  'deposit.add.asymAssets.description': 'पिछले असममित जमा के कारण सममित एसेट जोड़ी जोड़ना बंद है: ',
  'deposit.add.asymAssets.recoveryDescription':
    'असममित जोड़ना ASGARDEX के वर्तमान संस्करण में समर्थित नहीं है। हालांकि, आप THORSwap का उपयोग करके पिछले असममित जमा को निकाल सकते हैं।',
  'deposit.add.asymAssets.recoveryTitle': 'THORSwap',
  'deposit.add.assetMissmatch.title': 'एसेट्स की असंगति का पता चला',
  'deposit.add.assetMissmatch.description':
    'वर्तमान में चुने गए एसेट्स में से एक का इस्तेमाल पहले दूसरे एसेट के साथ जमा में किया जा चुका है। पिछली जमा जोड़ी देखने के लिए निम्नलिखित पते जांचें।',
  'deposit.bond.state.error': 'निवेश में त्रुटि',
  'deposit.unbond.state.error': 'निकासी में त्रुटि',
  'deposit.leave.state.error': 'बाहर निकलने में त्रुटि',
  'deposit.advancedMode': 'उन्नत मोड',
  'deposit.poolDetails.depth': 'गहराई',
  'deposit.poolDetails.24hvol': '24 घंटों में मात्रा',
  'deposit.poolDetails.allTimeVal': 'समय के साथ कुल मात्रा',
  'deposit.poolDetails.totalSwaps': 'कुल अदला-बदली',
  'deposit.poolDetails.totalUsers': 'कुल उपयोगकर्ता',
  'deposit.poolDetails.volumeTotal': 'कुल मात्रा',
  'deposit.poolDetails.earnings': 'कमाई',
  'deposit.poolDetails.ilpPaid': 'भुगतान की गई बीमा राशि',
  'deposit.poolDetails.totalTx': 'कुल लेन-देन',
  'deposit.poolDetails.totalFees': 'कुल शुल्क',
  'deposit.poolDetails.members': 'सदस्य',
  'deposit.poolDetails.apy': 'APY',
  'deposit.wallet.add': 'जोड़ें',
  'deposit.wallet.connect': 'कृपया अपना वॉलेट जोड़ें',
  'deposit.pool.noShares': 'आपकी इस पूल में कोई हिस्सेदारी नहीं है',
  'deposit.withdraw.sym': 'निकालें',
  'deposit.withdraw.asym': '{asset} निकालें',
  'deposit.withdraw.sym.title': 'निकासी समायोजन (सममित)',
  'deposit.withdraw.asym.title': 'निकासी समायोजन (असममित)',
  'deposit.withdraw.pending': 'निकालना प्रक्रियाधीन',
  'deposit.withdraw.success': 'सफलतापूर्वक निकाला गया',
  'deposit.withdraw.error': 'निकासी में त्रुटि',
  'deposit.withdraw.choseText': 'चुनें कि आप 0% से 100% तक कितनी राशि निकालना चाहते हैं',
  'deposit.withdraw.fees': 'लेन-देन शुल्क: {thorMemo}, आउटगोइंग शुल्क: {thorOut} + {assetOut}',
  'deposit.withdraw.feeNote': 'महत्वपूर्ण: आपके वॉलेट में {fee} BNB शुल्कों को कवर करने के लिए बने रहेंगे।',
  'deposit.withdraw.error.feeNotCovered':
    'लेन-देन शुल्क {fee} आपके बैलेंस द्वारा कवर किया जाना चाहिए (बैलेंस: {balance})',
  'deposit.ledger.sign': 'अपने डिवाइस पर निवेश लेन-देन को हस्ताक्षरित करने के लिए आगे बढ़ें।'
}

export default deposit
