/* =========================================================
   SANDEEP ELECTROFIX - MASTER CONFIGURATION
========================================================= */

window.MASTER_CONFIG = {
    controls: {
        showHero: true,
        showDiscount: false,
        discountPercent: 5,
        showQuickAccess: true,
        showSocialLinks: true,
        showAbout: true,
        showLocation: true,
        showServices: true,
        showGallery: false,
        showQR: true,
        showReviews: false,
        showQuoteForm: true,
        showFAQ: true,
        showFooter: true,
        showBottomNav: true,

        pwaShortcuts: {
            enabled: true,
            call: false,
            whatsapp: false,
            services: true
        },

        showThemeToggle: false,
        showLanguageSwitcher: false,
        showResetBtn: false,
        showLogo: true,
        showTagline: true,
        showHeroLocation: true,
        showHeroCallBtn: true,
        showHeroWhatsappBtn: true,

        showQuickCall: true,
        showQuickWhatsapp: true,
        showQuickEmail: true,
        showQuickWebsite: false,
        showQuickMaps: true,
        showQuickSaveContact: true,
        showQuickShare: true,
        showQuickWork: false,
        showQuickCatalogue: false,

        showFacebook: true,
        showInstagram: true,
        showYoutube: true,

        showQuoteWhatsappBtn: true,
        showQuotePdfBtn: true
    },

    business: {
        name: "Sandeep ElectroFix",
        owner: "Sandeep Verma",
        phone: "+919026036445",
        whatsapp: "919026036445",
        email: "SandeepElectroFix@gmail.com",
        location_en: "Lucknow, Uttar Pradesh",
        location_hi: "लखनऊ, उत्तर प्रदेश",
        tagline_en: "Powering Your Trust",
        tagline_hi: "आपके विश्वास को रोशन करते हुए",
        website: "https://sandeepelectrofix.github.io/",
        cardWebsite: "https://sandeepelectrofix.github.io/SandeepElectroFix-Card/",
        googleMaps: "https://maps.app.goo.gl/XYZnm7sFAVRT68Vs7",
        facebook: "https://www.facebook.com/SandeepElectroFix",
        instagram: "https://www.instagram.com/sandeep_electrofix",
        youtube: "https://youtube.com/@sandeepelectrofix",
        logo: "assets/logo.png",
        qrCode: "assets/qr-card.png"
    },

    services: [
        {
            id: "house-wiring",
            show: true,
            icon: "🏠",
            title_en: "House Wiring",
            title_hi: "हाउस वायरिंग",
            desc_en: "Complete house wiring and piping solutions.",
            desc_hi: "नए और पुराने मकान की पूरी वायरिंग और पाइपिंग।",
            subServices: [
                { show: false, name_en: "New House Wiring", name_hi: "नए मकान की वायरिंग", rate_en: "₹45 / sq.ft.", rate_hi: "₹45 / वर्ग फीट", price: 45 },
                { show: true, name_en: "Concealed Wiring", name_hi: "कंसील्ड (अंडरग्राउंड) वायरिंग", rate_en: "₹40 / sq.ft.", rate_hi: "₹40 / वर्ग फीट", price: 40 },
                { show: true, name_en: "Surface Wiring", name_hi: "ओपन / सरफेस वायरिंग", rate_en: "₹30 / sq.ft.", rate_hi: "₹30 / वर्ग फीट", price: 30 },
                { show: true, name_en: "Slab Piping", name_hi: "छत / स्लैब पाइपिंग", rate_en: "₹15 / sq.ft.", rate_hi: "₹15 / वर्ग फीट", price: 15 },
                { show: false, name_en: "Switch & Socket Installation", name_hi: "स्विच और सॉकेट फिटिंग", rate_en: "₹80 / point", rate_hi: "₹80 / point", price: 80 },
                { show: true, name_en: "Complete House Wiring", name_hi: "फुल हाउस वायरिंग सेटअप", rate_en: "₹50 / sq.ft.", rate_hi: "₹50 / वर्ग फीट", price: 50 }
            ]
        },
        {
            id: "light-fan-installation",
            show: true,
            icon: "💡",
            title_en: "Light & Fan Installation",
            title_hi: "लाइट और पंखा फिटिंग",
            desc_en: "Fitting of ceiling fans, LED lights and fixtures.",
            desc_hi: "सीलिंग फैन, एग्जॉस्ट फैन और सभी प्रकार की लाइट फिटिंग।",
            subServices: [
                { show: true, name_en: "Ceiling Fan Installation", name_hi: "सीलिंग पंखा फिटिंग", rate_en: "₹250 / fan", rate_hi: "₹250 / पंखा", price: 250 },
                { show: true, name_en: "Exhaust Fan Installation", name_hi: "एग्जॉस्ट पंखा फिटिंग", rate_en: "₹200 / fan", rate_hi: "₹200 / पंखा", price: 200 },
                { show: true, name_en: "LED Light Installation", name_hi: "एलईडी लाइट इंस्टॉलेशन", rate_en: "₹100 / light", rate_hi: "₹100 / लाइट", price: 100 },
                { show: true, name_en: "Decorative Light Fitting", name_hi: "डेकोरेटिव / झूमर लाइट", rate_en: "₹250 / light", rate_hi: "₹250 / लाइट", price: 250 },
                { show: true, name_en: "Tube Light Installation", name_hi: "ट्यूब लाइट फिटिंग", rate_en: "₹120 / light", rate_hi: "₹120 / लाइट", price: 120 },
                { show: true, name_en: "Fan Regulator Fitting", name_hi: "फैन रेगुलेटर फिटिंग", rate_en: "₹100 / piece", rate_hi: "₹100 / पीस", price: 100 }
            ]
        },
        {
            id: "mcb-db-work",
            show: true,
            icon: "🔌",
            title_en: "MCB & DB Work",
            title_hi: "एमसीबी और डीबी पैनल वर्क",
            desc_en: "MCB, DB, RCCB and circuit safety installation.",
            desc_hi: "एमसीबी, आरसीसीबी और डिस्ट्रीब्यूशन बोर्ड सुरक्षित फिटिंग।",
            subServices: [
                { show: true, name_en: "MCB Installation", name_hi: "एमसीबी फिटिंग", rate_en: "₹150 / MCB", rate_hi: "₹150 / MCB", price: 150 },
                { show: true, name_en: "DB Installation", name_hi: "डीबी बॉक्स फिटिंग", rate_en: "₹500 / DB", rate_hi: "₹500 / DB", price: 500 },
                { show: true, name_en: "MCB Replacement", name_hi: "खराब MCB बदलना", rate_en: "₹100 / MCB", rate_hi: "₹100 / MCB", price: 100 },
                { show: true, name_en: "RCCB Installation", name_hi: "आरसीसीबी फिटिंग", rate_en: "₹300 / pc", rate_hi: "₹300 / पीस", price: 300 },
                { show: true, name_en: "RCBO Installation", name_hi: "आरसीबीओ फिटिंग", rate_en: "₹350 / pc", rate_hi: "₹350 / पीस", price: 350 },
                { show: true, name_en: "DB Board Dressing", name_hi: "डीबी बोर्ड ड्रेसिंग", rate_en: "₹500 / DB", rate_hi: "₹500 / DB", price: 500 }
            ]
        },
        {
            id: "false-ceiling-wiring",
            show: true,
            icon: "🏗️",
            title_en: "False Ceiling Wiring",
            title_hi: "फॉल्स सीलिंग वायरिंग",
            desc_en: "Wiring for COB, profile, strip lights in ceiling.",
            desc_hi: "फॉल्स सीलिंग लाइट्स, प्रोफाइल और स्ट्रिप लाइट वायरिंग।",
            subServices: [
                { show: true, name_en: "Ceiling Light Wiring", name_hi: "सीलिंग लाइट वायरिंग", rate_en: "₹8 / sq.ft.", rate_hi: "₹8 / वर्ग फीट", price: 8 },
                { show: true, name_en: "Downlight Wiring", name_hi: "डाउनलाइट वायरिंग", rate_en: "₹8 / sq.ft.", rate_hi: "₹8 / वर्ग फीट", price: 8 },
                { show: true, name_en: "Panel Light Wiring", name_hi: "पैनल लाइट वायरिंग", rate_en: "₹8 / sq.ft.", rate_hi: "₹8 / वर्ग फीट", price: 8 },
                { show: true, name_en: "Strip Light Wiring", name_hi: "स्ट्रिप लाइट वायरिंग", rate_en: "₹10 / sq.ft.", rate_hi: "₹10 / वर्ग फीट", price: 10 },
                { show: true, name_en: "Fan Point in Ceiling", name_hi: "सीलिंग में फैन पॉइंट", rate_en: "₹150 / point", rate_hi: "₹150 / पॉइंट", price: 150 },
                { show: true, name_en: "Concealed Ceiling Wiring", name_hi: "कंसील्ड सीलिंग वायरिंग", rate_en: "₹10 / sq.ft.", rate_hi: "₹10 / वर्ग फीट", price: 10 }
            ]
        },
        {
            id: "inverter-backup",
            show: true,
            icon: "🔋",
            title_en: "Inverter & Backup",
            title_hi: "इन्वर्टर और बैटरी कनेक्शन",
            desc_en: "Inverter battery setup and changeover services.",
            desc_hi: "इन्वर्टर कनेक्शन, चेंजओवर स्विच और बैकअप वायरिंग।",
            subServices: [
                { show: true, name_en: "Inverter Installation", name_hi: "इन्वर्टर इंस्टॉलेशन", rate_en: "₹500 / set", rate_hi: "₹500 / सेट", price: 500 },
                { show: true, name_en: "Inverter Wiring", name_hi: "इन्वर्टर लाइन वायरिंग", rate_en: "₹5 / sq.ft.", rate_hi: "₹5 / वर्ग फीट", price: 5 },
                { show: true, name_en: "Battery Connection", name_hi: "बैटरी कनेक्शन", rate_en: "₹150 / conn", rate_hi: "₹150 / कनेक्शन", price: 150 },
                { show: true, name_en: "Changeover Switch Fitting", name_hi: "चेंजओवर स्विच लगाना", rate_en: "₹300 / pc", rate_hi: "₹300 / पीस", price: 300 },
                { show: false, name_en: "Backup Line Routing", name_hi: "बैकअप लाइन बिछाना", rate_en: "₹8 / sq.ft.", rate_hi: "₹8 / वर्ग फीट", price: 8 },
                { show: true, name_en: "Inverter Fault Check", name_hi: "इन्वर्टर फॉल्ट चेकिंग", rate_en: "₹200 / visit", rate_hi: "₹200 / विजिट", price: 200 }
            ]
        },
        {
            id: "electrical-repair",
            show: true,
            icon: "🔧",
            title_en: "Electrical Repair",
            title_hi: "इलेक्ट्रिकल रिपेयर",
            desc_en: "Quick repairs for switches, sockets, and fans.",
            desc_hi: "स्विच, सॉकेट, पंखा और सामान्य बिजली रिपेयर सेवा।",
            subServices: [
                { show: true, name_en: "Switch Repair", name_hi: "स्विच रिपेयर", rate_en: "₹80 / point", rate_hi: "₹80 / point", price: 80 },
                { show: true, name_en: "Socket Repair", name_hi: "सॉकेट रिपेयर", rate_en: "₹80 / point", rate_hi: "₹80 / point", price: 80 },
                { show: false, name_en: "Fan Repair", name_hi: "पंखा रिपेयर", rate_en: "₹150 / fan", rate_hi: "₹150 / पंखा", price: 150 },
                { show: false, name_en: "Light Repair", name_hi: "लाइट रिपेयर", rate_en: "₹100 / light", rate_hi: "₹100 / लाइट", price: 100 },
                { show: true, name_en: "Loose Connection Fix", name_hi: "लूज कनेक्शन सही करना", rate_en: "₹150 / point", rate_hi: "₹150 / पॉइंट", price: 150 },
                { show: true, name_en: "Short Circuit Fix", name_hi: "शॉर्ट सर्किट रिपेयर", rate_en: "₹300 / visit", rate_hi: "₹300 / विजिट", price: 300 }
            ]
        },
        {
            id: "fault-finding",
            show: false,
            icon: "🔍",
            title_en: "Fault Finding",
            title_hi: "फॉल्ट टेस्टिंग और चेकिंग",
            desc_en: "Short circuit detection and power restoration.",
            desc_hi: "शॉर्ट सर्किट, लाइन फॉल्ट और वोल्टेज टेस्टिंग।",
            subServices: [
                { show: true, name_en: "Power Failure Checking", name_hi: "पावर कट / लाइन चेकिंग", rate_en: "₹200 / visit", rate_hi: "₹200 / विजिट", price: 200 },
                { show: true, name_en: "Short Circuit Detection", name_hi: "शॉर्ट सर्किट पकड़ना", rate_en: "₹300 / visit", rate_hi: "₹300 / विजिट", price: 300 },
                { show: true, name_en: "MCB Tripping Issue", name_hi: "बार-बार MCB गिरना", rate_en: "₹250 / visit", rate_hi: "₹250 / विजिट", price: 250 },
                { show: true, name_en: "Voltage Checking", name_hi: "वोल्टेज जांच", rate_en: "₹150 / visit", rate_hi: "₹150 / विजिट", price: 150 },
                { show: true, name_en: "Wiring Fault Detection", name_hi: "वायरिंग फॉल्ट टेस्ट", rate_en: "₹300 / visit", rate_hi: "₹300 / विजिट", price: 300 },
                { show: true, name_en: "Loose Neutral Detection", name_hi: "न्यूट्रल / अर्थिंग जांच", rate_en: "₹200 / visit", rate_hi: "₹200 / विजिट", price: 200 }
            ]
        },
        {
            id: "commercial-electrical-work",
            show: true,
            icon: "🏢",
            title_en: "Commercial Work",
            title_hi: "कमर्शियल इलेक्ट्रिकल कार्य",
            desc_en: "Wiring and maintenance for shops, offices, and clinics.",
            desc_hi: "दुकान, ऑफिस और शोरूम की पूरी वायरिंग व मेंटेनेंस।",
            subServices: [
                { show: true, name_en: "Shop Wiring", name_hi: "दुकान की वायरिंग", rate_en: "₹35 / sq.ft.", rate_hi: "₹35 / वर्ग फीट", price: 35 },
                { show: true, name_en: "Office Wiring", name_hi: "ऑफिस वायरिंग", rate_en: "₹35 / sq.ft.", rate_hi: "₹35 / वर्ग फीट", price: 35 },
                { show: false, name_en: "Commercial Points Fitting", name_hi: "कमर्शियल पॉइंट फिटिंग", rate_en: "₹100 / point", rate_hi: "₹100 / पॉइंट", price: 100 },
                { show: false, name_en: "Commercial DB Setup", name_hi: "कमर्शियल डीबी सेटअप", rate_en: "₹500 / DB", rate_hi: "₹500 / DB", price: 500 },
                { show: true, name_en: "Track Light Fitting", name_hi: "ट्रैक लाइट इंस्टॉलेशन", rate_en: "₹300 / light", rate_hi: "₹300 / लाइट", price: 300 },
                { show: true, name_en: "Monthly Maintenance", name_hi: "मासिक मेंटेनेंस विजिट", rate_en: "₹500 / visit", rate_hi: "₹500 / विजिट", price: 500 }
            ]
        }
    ],

    gallery: [
        { show: true, image: "assets/gallery/work1.jpg", title_en: "House Wiring", title_hi: "हाउस वायरिंग" },
        { show: true, image: "assets/gallery/work2.jpg", title_en: "False Ceiling Wiring", title_hi: "फॉल्स सीलिंग वायरिंग" },
        { show: true, image: "assets/gallery/work3.jpg", title_en: "DB Panel Installation", title_hi: "डीबी पैनल इंस्टॉलेशन" },
        { show: true, image: "assets/gallery/work4.jpg", title_en: "Lighting Work", title_hi: "लाइटिंग वर्क" }
    ],

    reviews: [
        { show: true, name: "Rahul Sharma", rating: 5, text_en: "Excellent electrical service and professional work.", text_hi: "बहुत ही बढ़िया और सुरक्षित काम किया।" },
        { show: true, name: "Amit Verma", rating: 5, text_en: "Good quality work and on-time service.", text_hi: "समय पर और बेहतरीन क्वालिटी का काम।" }
    ],

    faq: [
        { show: true, q_en: "Do you provide complete house wiring?", q_hi: "क्या आप पूरे मकान की वायरिंग करते हैं?", a_en: "Yes, we provide new house concealed and surface wiring.", a_hi: "हाँ, हम नए और पुराने मकानों की पूरी अंडरग्राउंड व ओपन वायरिंग करते हैं।" },
        { show: true, q_en: "Do you fix short circuits and tripping?", q_hi: "क्या आप शॉर्ट सर्किट और फॉल्ट ठीक करते हैं?", a_en: "Yes, we detect and fix short circuits safely.", a_hi: "हाँ, हम शॉर्ट सर्किट और एमसीबी ट्रिपिंग तुरंत चेक करके ठीक करते हैं।" }
    ]
};


