import { Language } from '../types';

export interface TranslationDictionary {
  brandName: string;
  tagline: string;
  subTagline: string;
  tapToStart: string;
  back: string;
  stepOf: (curr: number, total: number) => string;
  continueBtn: string;
  cancelBtn: string;
  saveLookbook: string;
  inStock: string;
  perMetre: string;
  tryOn: string;
  tryThisOn: string;
  createLookTitle: string;
  processingMsg1: string;
  processingMsg2: string;
  processingMsg3: string;
  processingMsg4: string;
  processingNote: string;
  resultTitle: string;
  buyThisCta: string;
  sendToPhone: string;
  tryAnother: string;
  saveLook: string;
  inquiryTitle: string;
  yourLook: string;
  yourName: string;
  phoneNumber: string;
  visitTime: string;
  specialRequests: string;
  submitInquiry: string;
  submitting: string;
  submitted: string;
  noThanks: string;
  thankYouTitle: string;
  thankYouDesc: string;
  scanQrNotice: string;
  startNewSession: string;
  resetTimerText: (seconds: number) => string;
  modes: {
    title: string;
    tryOnTitle: string;
    tryOnDesc: string;
    recreateTitle: string;
    recreateDesc: string;
    designTitle: string;
    designDesc: string;
    uploadTitle: string;
    uploadDesc: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    brandName: 'PADAVALA',
    tagline: 'Discover How You Look in Every Fabric',
    subTagline: 'Explore • Try • Visualise',
    tapToStart: 'TAP TO START',
    back: 'Back',
    stepOf: (curr, total) => `STEP ${curr} OF ${total}`,
    continueBtn: 'CONTINUE →',
    cancelBtn: 'Cancel',
    saveLookbook: 'Save to Lookbook',
    inStock: 'In Stock',
    perMetre: 'per metre',
    tryOn: 'TRY ON',
    tryThisOn: '✨ TRY THIS ON',
    createLookTitle: 'Creating your look...',
    processingMsg1: 'Draping the fabric...',
    processingMsg2: 'Matching your style...',
    processingMsg3: 'Creating your look...',
    processingMsg4: 'Almost ready...',
    processingNote: 'This usually takes 15–30 seconds',
    resultTitle: "Here's your look! ✨",
    buyThisCta: 'I WANT TO BUY THIS',
    sendToPhone: '📲 SEND TO MY PHONE',
    tryAnother: 'Try Another',
    saveLook: 'Save Look',
    inquiryTitle: 'Great choice! 🎉',
    yourLook: 'YOUR LOOK',
    yourName: 'YOUR NAME',
    phoneNumber: 'PHONE NUMBER',
    visitTime: 'PREFERRED VISIT TIME',
    specialRequests: 'SPECIAL REQUESTS',
    submitInquiry: 'SUBMIT INQUIRY',
    submitting: 'SUBMITTING...',
    submitted: 'Inquiry submitted ✓',
    noThanks: 'No thanks, just browsing',
    thankYouTitle: 'Thank you!',
    thankYouDesc: 'Your look has been saved. Our team will be in touch soon.',
    scanQrNotice: 'Scan to see your look on your phone',
    startNewSession: 'START NEW SESSION',
    resetTimerText: (s) => `Starting a new session in... ${s}`,
    modes: {
      title: 'What would you like to do today?',
      tryOnTitle: 'Try On a Look',
      tryOnDesc: 'Browse fabrics & see yourself in it',
      recreateTitle: 'Recreate a Look',
      recreateDesc: 'Upload a photo & find matching fabric',
      designTitle: 'Design My Look',
      designDesc: 'Describe your style & let AI create it',
      uploadTitle: 'Upload My Cloth',
      uploadDesc: 'Try on any fabric photo',
    },
  },
  hi: {
    brandName: 'PADAVALA',
    tagline: 'हर कपड़े में अपना रूप निहारें',
    subTagline: 'खोजें • आज़माएं • अनुभव करें',
    tapToStart: 'शुरू करने के लिए छुएं',
    back: 'वापस',
    stepOf: (curr, total) => `चरण ${curr} / ${total}`,
    continueBtn: 'आगे बढ़ें →',
    cancelBtn: 'रद्द करें',
    saveLookbook: 'लुकबुक में सहेजें',
    inStock: 'उपलब्ध है',
    perMetre: 'प्रति मीटर',
    tryOn: 'पहन कर देखें',
    tryThisOn: '✨ इसे पहन कर देखें',
    createLookTitle: 'आपका नया रूप तैयार हो रहा है...',
    processingMsg1: 'कपड़े की ड्रैपिंग हो रही है...',
    processingMsg2: 'आपकी शैली का मिलान किया जा रहा है...',
    processingMsg3: 'भव्य रूप तैयार हो रहा है...',
    processingMsg4: 'बस कुछ ही क्षण शेष...',
    processingNote: 'इसमें सामान्यतः 15–30 सेकंड लगते हैं',
    resultTitle: 'यह रहा आपका नया रूप! ✨',
    buyThisCta: 'मुझे यह खरीदना है',
    sendToPhone: '📲 मेरे फोन पर भेजें',
    tryAnother: 'दूसरा आज़माएं',
    saveLook: 'सहेजें',
    inquiryTitle: 'शानदार पसंद! 🎉',
    yourLook: 'आपका चुना हुआ लुक',
    yourName: 'आपका नाम',
    phoneNumber: 'मोबाइल नंबर',
    visitTime: 'दुकान आने का पसंदीदा समय',
    specialRequests: 'कोई विशेष अनुरोध',
    submitInquiry: 'पूछताछ दर्ज करें',
    submitting: 'दर्ज हो रहा है...',
    submitted: 'पूछताछ सफलतापूर्ण दर्ज ✓',
    noThanks: 'धन्यवाद, अभी केवल देख रहे हैं',
    thankYouTitle: 'हार्दिक धन्यवाद!',
    thankYouDesc: 'आपका लुक सुरक्षित कर लिया गया है। हमारे प्रतिनिधि शीघ्र संपर्क करेंगे।',
    scanQrNotice: 'अपने फोन पर लुक देखने के लिए स्कैन करें',
    startNewSession: 'नया सत्र शुरू करें',
    resetTimerText: (s) => `नया सत्र शुरू होने में... ${s} सेकंड`,
    modes: {
      title: 'आज आप क्या अनुभव करना चाहेंगे?',
      tryOnTitle: 'लुक पहन कर देखें',
      tryOnDesc: 'पसंदीदा कपड़े चुनें और खुद को उसमें देखें',
      recreateTitle: 'लुक दोबारा बनाएं',
      recreateDesc: 'तस्वीर अपलोड करें और मिलता कपड़ा खोजें',
      designTitle: 'मेरा लुक डिज़ाइन करें',
      designDesc: 'अपनी पसंद बताएं और AI से डिज़ाइन कराएं',
      uploadTitle: 'अपना कपड़ा अपलोड करें',
      uploadDesc: 'अपने कपड़े की फोटो लगाकर देखें',
    },
  },
  te: {
    brandName: 'PADAVALA',
    tagline: 'ప్రతి వస్త్రంలో మీ రూపాన్ని సరిచూసుకోండి',
    subTagline: 'శోధించండి • ప్రయత్నించండి • దర్శించండి',
    tapToStart: 'ప్రారంభించడానికి తాకండి',
    back: 'వెనుకకు',
    stepOf: (curr, total) => `దశ ${curr} / ${total}`,
    continueBtn: 'కొనసాగించండి →',
    cancelBtn: 'రద్దు చేయి',
    saveLookbook: 'లుక్‌బుక్‌లో భద్రపరచు',
    inStock: 'స్టాక్ ఉంది',
    perMetre: 'మీటరుకు',
    tryOn: 'ధరించి చూడండి',
    tryThisOn: '✨ దీన్ని ధరించి చూడండి',
    createLookTitle: 'మీ నూతన రూపాన్ని సిద్ధం చేస్తున్నాము...',
    processingMsg1: 'వస్త్రాన్ని పొందికగా అమర్చుతున్నాము...',
    processingMsg2: 'మీ శైలికి సరిపోలుస్తున్నాము...',
    processingMsg3: 'అందమైన రూపాన్ని రూపొందిస్తున్నాము...',
    processingMsg4: 'దాదాపు పూర్తయింది...',
    processingNote: 'దీనికి సుమారు 15–30 సెకన్లు పడుతుంది',
    resultTitle: 'ఇదిగో మీ అందమైన లుక్! ✨',
    buyThisCta: 'నేను దీన్ని కొనాలనుకుంటున్నాను',
    sendToPhone: '📲 నా ఫోన్‌కు పంపండి',
    tryAnother: 'మరొకటి చూడండి',
    saveLook: 'భద్రపరుచు',
    inquiryTitle: 'అద్భుతమైన ఎంపిక! 🎉',
    yourLook: 'మీ ఎంపిక వివరాలు',
    yourName: 'మీ పేరు',
    phoneNumber: 'ఫోన్ నంబర్',
    visitTime: 'స్టోర్ సందర్శించే సమయం',
    specialRequests: 'ప్రత్యేక అవసరాలు / అభ్యర్థనలు',
    submitInquiry: 'వివరాలు సమర్పించండి',
    submitting: 'సమర్పిస్తున్నాము...',
    submitted: 'వివరాలు సమర్పించబడ్డాయి ✓',
    noThanks: 'పరవాలేదు, కేవలం చూస్తున్నాము',
    thankYouTitle: 'ధన్యవాదాలు!',
    thankYouDesc: 'మీ లుక్ భద్రపరచబడింది. మా స్టోర్ నిపుణులు త్వరలోనే సంప్రదిస్తారు.',
    scanQrNotice: 'మీ ఫోన్‌లో మీ లుక్ చూడటానికి స్కాన్ చేయండి',
    startNewSession: 'కొత్త సెషన్ ప్రారంభించండి',
    resetTimerText: (s) => `కొత్త సెషన్ ప్రారంభమయ్యే సమయం... ${s}`,
    modes: {
      title: 'ఈరోజు మీరు ఏమి చేయాలనుకుంటున్నారు?',
      tryOnTitle: 'లుక్ ధరించి చూడండి',
      tryOnDesc: 'వస్త్రాలు ఎంచుకోండి & అందులో మిమ్మల్ని మీరు చూడండి',
      recreateTitle: 'లుక్‌ను రీక్రియేట్ చేయండి',
      recreateDesc: 'ఫోటో అప్‌లోడ్ చేసి సరిపోలే వస్త్రాన్ని కనుగొనండి',
      designTitle: 'నా లుక్ డిజైన్ చేయండి',
      designDesc: 'మీ శైలిని వివరించండి, AI రూపాన్ని సృష్టిస్తుంది',
      uploadTitle: 'నా వస్త్రాన్ని అప్‌లోడ్ చేయండి',
      uploadDesc: 'మీ వస్త్ర ఫోటోతో ధరించి చూసుకోండి',
    },
  },
};
