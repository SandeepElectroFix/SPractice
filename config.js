/* =========================================================
   SANDEEP ELECTROFIX
   SMART DIGITAL CARD CONFIGURATION
   Version 3.0.0
========================================================= */

window.CARD_CONFIG = {

    /* =====================================================
       BUSINESS PROFILE
    ===================================================== */
    business: {
        name: "Sandeep ElectroFix",
        owner: "Sandeep Verma",
        tagline: "Powering Your Trust",
        phone: "+919026036445",
        whatsapp: "919026036445",
        email: "SandeepElectroFix@gmail.com",
        location: "Lucknow, Uttar Pradesh",
        website: "https://sandeepelectrofix.github.io/",
        cardWebsite: "https://sandeepelectrofix.github.io/SandeepElectroFix-Card/",
        googleMaps: "https://maps.app.goo.gl/XYZnm7sFAVRT68Vs7",
        facebook: "https://www.facebook.com/SandeepElectroFix",
        instagram: "https://www.instagram.com/sandeep_electrofix",
        youtube: "https://youtube.com/@sandeepelectrofix",
        logo: "assets/logo.png",
        cardQR: "assets/qr-card.png"
    },

    /* =====================================================
       FEATURES CONTROL
    ===================================================== */
    features: {
        themeToggle: true,
        languageSwitch: true,
        discountOffer: true,
        services: true,
        gallery: true,
        reviews: true,
        quoteForm: true,
        faq: true,
        locationTracker: true,
        mobileBottomNav: true
    },

    /* =====================================================
       SPECIAL DISCOUNT
    ===================================================== */
    discount: {
        enabled: true,
        title: "Special Discount",
        percentage: 10,
        message: "Get 10% OFF on selected electrical services.",
        validityText: "Valid for limited time"
    },

    /* =====================================================
       SERVICES WITH SUB-SERVICES & RATES
    ===================================================== */
    services: [
        {
            id: "house-wiring",
            show: true,
            title: "House Wiring",
            icon: "⚡",
            description: "Complete residential wiring, concealed piping, renovation and rewiring solutions.",
            subServices: [
                { name: "New House Wiring (Per Point)", rate: "₹150 - ₹250" },
                { name: "Slab / Wall Piping", rate: "₹15 - ₹25 / ft" },
                { name: "Complete Rewiring", rate: "Estimate on Visit" }
            ]
        },
        {
            id: "false-ceiling",
            show: true,
            title: "False Ceiling Wiring",
            icon: "💡",
            description: "Modern false ceiling light wiring, COB lights, strip lights and profile channel lights.",
            subServices: [
                { name: "COB Light Installation", rate: "₹70 - ₹120 / pc" },
                { name: "LED Strip / Profile Light", rate: "₹30 - ₹50 / meter" },
                { name: "Panel Light Cutting & Fitting", rate: "₹80 - ₹150 / pc" }
            ]
        },
        {
            id: "switch-socket",
            show: true,
            title: "Switch & Socket Installation",
            icon: "🔌",
            description: "Modular switch board installation, 6A/16A socket replacement and power points.",
            subServices: [
                { name: "Single Switch / Socket Change", rate: "₹50 - ₹80" },
                { name: "Complete Modular Board Fitting", rate: "₹150 - ₹300" },
                { name: "Heavy Power Plug (AC/Geyser)", rate: "₹120 - ₹200" }
            ]
        },
        {
            id: "mcb-db",
            show: true,
            title: "MCB & DB Installation",
            icon: "⚙️",
            description: "Distribution board dressing, single/double pole MCB, RCCB and circuit protection.",
            subServices: [
                { name: "Single Pole MCB Fitting", rate: "₹100 - ₹150" },
                { name: "DP / 4-Pole MCB / RCCB Fitting", rate: "₹250 - ₹450" },
                { name: "Complete DB Board Dressing", rate: "₹500 - ₹1200" }
            ]
        },
        {
            id: "fan-fitting",
            show: true,
            title: "Fan Installation",
            icon: "🌬️",
            description: "Ceiling fan installation, exhaust fan, wall fan mounting and regulator replacement.",
            subServices: [
                { name: "Ceiling Fan Assembly & Fitting", rate: "₹150 - ₹250" },
                { name: "Exhaust Fan Fitting", rate: "₹120 - ₹200" },
                { name: "Fan Regulator Change", rate: "₹50 - ₹80" }
            ]
        },
        {
            id: "inverter-wiring",
            show: true,
            title: "Inverter Wiring",
            icon: "🔋",
            description: "Inverter battery setup, separate home inverter wiring and changeover installation.",
            subServices: [
                { name: "Inverter & Battery Connection", rate: "₹250 - ₹400" },
                { name: "Separate Inverter Line Routing", rate: "₹300 - ₹600" },
                { name: "Manual / Auto Changeover Switch", rate: "₹200 - ₹350" }
            ]
        },
        {
            id: "electrical-repair",
            show: true,
            title: "Electrical Repair",
            icon: "🛠️",
            description: "General electrical repairs, geyser connection, motor starter and appliance fixes.",
            subServices: [
                { name: "Geyser Electrical Connection", rate: "₹150 - ₹250" },
                { name: "Water Motor / Submersible Starter", rate: "₹200 - ₹350" },
                { name: "General Maintenance Visit", rate: "₹150 - ₹200" }
            ]
        },
        {
            id: "fault-finding",
            show: true,
            title: "Fault Finding",
            icon: "🚨",
            description: "Short circuit detection, MCB tripping resolution and complete wire continuity test.",
            subServices: [
                { name: "Short Circuit Checking", rate: "₹250 - ₹450" },
                { name: "MCB Tripping Fault Fix", rate: "₹200 - ₹350" },
                { name: "Neutral / Earth Leakage Check", rate: "₹300 - ₹500" }
            ]
        },
        {
            id: "commercial-wiring",
            show: true,
            title: "Commercial Wiring",
            icon: "🏢",
            description: "Electrical setup for shops, offices, showrooms, schools and commercial units.",
            subServices: [
                { name: "Shop / Office Wiring", rate: "Estimate on Visit" },
                { name: "3-Phase DB Dressing", rate: "₹800 - ₹2000" },
                { name: "Commercial Track Lighting", rate: "₹100 - ₹200 / pc" }
            ]
        }
    ],

    /* =====================================================
       GALLERY
    ===================================================== */
    gallery: [
        { id: "work-1", show: true, image: "assets/gallery/work1.jpg", title: "House Wiring" },
        { id: "work-2", show: true, image: "assets/gallery/work2.jpg", title: "False Ceiling Wiring" },
        { id: "work-3", show: true, image: "assets/gallery/work3.jpg", title: "DB Panel Installation" },
        { id: "work-4", show: true, image: "assets/gallery/work4.jpg", title: "Lighting Work" },
        { id: "work-5", show: true, image: "assets/gallery/work5.jpg", title: "Switch Board Work" },
        { id: "work-6", show: true, image: "assets/gallery/work6.jpg", title: "Electrical Repair" },
        { id: "work-7", show: true, image: "assets/gallery/work7.jpg", title: "New Project" }
    ],

    /* =====================================================
       CUSTOMER REVIEWS
    ===================================================== */
    reviews: [
        {
            id: "review-1",
            show: true,
            name: "Customer",
            rating: 5,
            text: "Excellent electrical service and professional work."
        },
        {
            id: "review-2",
            show: true,
            name: "Customer",
            rating: 5,
            text: "Good quality work and on-time service."
        },
        {
            id: "review-3",
            show: true,
            name: "Customer",
            rating: 5,
            text: "Trusted electrician service in Lucknow."
        }
    ],

    /* =====================================================
       FAQ
    ===================================================== */
    faq: [
        {
            id: "faq-1",
            show: true,
            question: "House wiring ka kaam karte hain?",
            answer: "Haan, new house wiring, concealed wiring aur renovation wiring ki service available hai."
        },
        {
            id: "faq-2",
            show: true,
            question: "Electrical fault finding karte hain?",
            answer: "Haan, short circuit, MCB tripping, power fault aur wiring fault checking ki service available hai."
        },
        {
            id: "faq-3",
            show: true,
            question: "Fan aur light installation available hai?",
            answer: "Haan, fan, light, switch, socket aur other electrical fittings install ki jaati hain."
        },
        {
            id: "faq-4",
            show: true,
            question: "Estimate kaise milega?",
            answer: "Neeche diye gaye WhatsApp Quote Form se apni requirement bhejiye. Aapki requirement ke according estimate discuss kiya ja sakta hai."
        },
        {
            id: "faq-5",
            show: true,
            question: "Aap Lucknow me service dete hain?",
            answer: "Haan, Sandeep ElectroFix Lucknow, Uttar Pradesh me electrical services provide karta hai."
        }
    ]
};
