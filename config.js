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
       SERVICES WITH SUB-SERVICES & RATES (Updated from CONFIG v3.1)
    ===================================================== */
    services: [
        {
            id: "house-wiring",
            show: true,
            title: "House Wiring",
            icon: "🏠",
            description: "Professional house wiring and electrical installation services.",
            subServices: [
                { name: "New House Wiring", rate: "₹45 / sq.ft. onwards" },
                { name: "Concealed Wiring", rate: "₹40 / sq.ft. onwards" },
                { name: "Surface Wiring", rate: "₹30 / sq.ft. onwards" },
                { name: "Slab Piping", rate: "₹15 / sq.ft. onwards" },
                { name: "Switch & Socket Installation", rate: "₹80 / point onwards" },
                { name: "Complete House Wiring", rate: "₹50 / sq.ft. onwards" }
            ]
        },
        {
            id: "light-fan-installation",
            show: true,
            title: "Light & Fan Installation",
            icon: "💡",
            description: "Professional installation of lights, fans and electrical fittings.",
            subServices: [
                { name: "Ceiling Fan Installation", rate: "₹250 / fan onwards" },
                { name: "Exhaust Fan Installation", rate: "₹200 / fan onwards" },
                { name: "LED Light Installation", rate: "₹100 / light onwards" },
                { name: "Decorative Light Installation", rate: "₹250 / light onwards" },
                { name: "Tube Light Installation", rate: "₹120 / light onwards" },
                { name: "Fan Regulator Installation", rate: "₹100 / piece onwards" }
            ]
        },
        {
            id: "mcb-db-work",
            show: true,
            title: "MCB & DB Work",
            icon: "🔌",
            description: "MCB, DB, RCCB and RCBO installation and electrical panel work.",
            subServices: [
                { name: "MCB Installation", rate: "₹150 / MCB onwards" },
                { name: "DB Installation", rate: "₹500 / DB onwards" },
                { name: "MCB Replacement", rate: "₹100 / MCB onwards" },
                { name: "RCCB Installation", rate: "₹300 / piece onwards" },
                { name: "RCBO Installation", rate: "₹350 / piece onwards" },
                { name: "DB Wiring & Maintenance", rate: "₹500 / DB onwards" }
            ]
        },
        {
            id: "false-ceiling-wiring",
            show: true,
            title: "False Ceiling Wiring",
            icon: "🏗️",
            description: "Electrical wiring and lighting point installation for false ceilings.",
            subServices: [
                { name: "Ceiling Light Wiring", rate: "₹8 / sq.ft. onwards" },
                { name: "Downlight Wiring", rate: "₹8 / sq.ft. onwards" },
                { name: "Panel Light Wiring", rate: "₹8 / sq.ft. onwards" },
                { name: "Strip Light Wiring", rate: "₹10 / sq.ft. onwards" },
                { name: "Fan Point Wiring", rate: "₹150 / point onwards" },
                { name: "Concealed Ceiling Wiring", rate: "₹10 / sq.ft. onwards" }
            ]
        },
        {
            id: "inverter-backup",
            show: true,
            title: "Inverter & Backup",
            icon: "🔋",
            description: "Inverter, battery, changeover and backup electrical services.",
            subServices: [
                { name: "Inverter Installation", rate: "₹500 / set onwards" },
                { name: "Inverter Wiring", rate: "₹8 / sq.ft. onwards" },
                { name: "Battery Connection", rate: "₹150 / connection onwards" },
                { name: "Changeover Installation", rate: "₹300 / piece onwards" },
                { name: "Backup Wiring", rate: "₹8 / sq.ft. onwards" },
                { name: "Inverter Fault Checking", rate: "₹200 / visit onwards" }
            ]
        },
        {
            id: "electrical-repair",
            show: true,
            title: "Electrical Repair",
            icon: "🔧",
            description: "Electrical repair and maintenance for common household problems.",
            subServices: [
                { name: "Switch Repair", rate: "₹80 / point onwards" },
                { name: "Socket Repair", rate: "₹80 / point onwards" },
                { name: "Fan Repair", rate: "₹150 / fan onwards" },
                { name: "Light Repair", rate: "₹100 / light onwards" },
                { name: "Loose Connection Repair", rate: "₹150 / point onwards" },
                { name: "Short Circuit Repair", rate: "₹300 / visit onwards" }
            ]
        },
        {
            id: "fault-finding",
            show: true,
            title: "Fault Finding",
            icon: "🔍",
            description: "Electrical fault detection and troubleshooting services.",
            subServices: [
                { name: "Power Failure Checking", rate: "₹200 / visit onwards" },
                { name: "Short Circuit Detection", rate: "₹300 / visit onwards" },
                { name: "MCB Tripping Problem", rate: "₹250 / visit onwards" },
                { name: "Voltage Checking", rate: "₹150 / visit onwards" },
                { name: "Wiring Fault Detection", rate: "₹300 / visit onwards" },
                { name: "Loose Connection Detection", rate: "₹200 / visit onwards" }
            ]
        },
        {
            id: "commercial-electrical-work",
            show: true,
            title: "Commercial Electrical Work",
            icon: "🏢",
            description: "Electrical installation, wiring and maintenance for shops and offices.",
            subServices: [
                { name: "Shop Wiring", rate: "₹45 / sq.ft. onwards" },
                { name: "Office Wiring", rate: "₹50 / sq.ft. onwards" },
                { name: "Electrical Point Installation", rate: "₹100 / point onwards" },
                { name: "DB & MCB Work", rate: "₹500 / DB onwards" },
                { name: "Lighting Installation", rate: "₹150 / light onwards" },
                { name: "Electrical Maintenance", rate: "₹500 / visit onwards" }
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
