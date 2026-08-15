/* =========================================================
   SANDEEP ELECTROFIX - CONFIGURATION FILE (v3.2)
========================================================= */

window.CARD_CONFIG = {
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
        cardQR: "assets/qr-card.png",

        // Buttons & Links Visibility
        showElements: {
            logo: true,
            tagline: true,
            location: true,
            phoneCall: true,
            whatsappChat: true,
            email: true,
            website: true,
            googleMaps: true,
            facebook: true,
            instagram: true,
            youtube: true,
            cardQR: true,
            saveContactBtn: true,
            shareBtn: true
        }
    },

    features: {
        heroSection: true,
        quickAccessBar: true,
        themeToggle: true,
        languageSwitch: true,
        discountOffer: true,
        servicesSection: true,
        gallerySection: true,
        reviewsSection: true,
        quoteFormSection: true,
        faqSection: true,
        locationTracker: true,
        footerSection: true,
        mobileBottomNav: true
    },

    serviceSettings: {
        showCategoryDescription: true,
        showSubItems: true,
        showPrices: true
    },

    discount: {
        show: true,
        title: "Special Discount",
        percentage: 10,
        message: "Get 10% OFF on selected electrical services.",
        validityText: "Valid for limited time"
    },

    services: [
        {
            id: "house-wiring",
            show: true,
            title: "House Wiring",
            icon: "🏠",
            description: "Professional house wiring and electrical installation services.",
            subServices: [
                { name: "New House Wiring", rate: "₹45 / sq.ft. onwards", show: true },
                { name: "Concealed Wiring", rate: "₹40 / sq.ft. onwards", show: true },
                { name: "Surface Wiring", rate: "₹30 / sq.ft. onwards", show: true },
                { name: "Slab Piping", rate: "₹15 / sq.ft. onwards", show: true },
                { name: "Switch & Socket Installation", rate: "₹80 / point onwards", show: true },
                { name: "Complete House Wiring", rate: "₹50 / sq.ft. onwards", show: true }
            ]
        },
        {
            id: "light-fan-installation",
            show: true,
            title: "Light & Fan Installation",
            icon: "💡",
            description: "Professional installation of lights, fans and electrical fittings.",
            subServices: [
                { name: "Ceiling Fan Installation", rate: "₹250 / fan onwards", show: true },
                { name: "Exhaust Fan Installation", rate: "₹200 / fan onwards", show: true },
                { name: "LED Light Installation", rate: "₹100 / light onwards", show: true },
                { name: "Decorative Light Installation", rate: "₹250 / light onwards", show: true },
                { name: "Tube Light Installation", rate: "₹120 / light onwards", show: true },
                { name: "Fan Regulator Installation", rate: "₹100 / piece onwards", show: true }
            ]
        },
        {
            id: "mcb-db-work",
            show: true,
            title: "MCB & DB Work",
            icon: "🔌",
            description: "MCB, DB, RCCB and RCBO installation and electrical panel work.",
            subServices: [
                { name: "MCB Installation", rate: "₹150 / MCB onwards", show: true },
                { name: "DB Installation", rate: "₹500 / DB onwards", show: true },
                { name: "MCB Replacement", rate: "₹100 / MCB onwards", show: true },
                { name: "RCCB Installation", rate: "₹300 / piece onwards", show: true },
                { name: "RCBO Installation", rate: "₹350 / piece onwards", show: true },
                { name: "DB Wiring & Maintenance", rate: "₹500 / DB onwards", show: true }
            ]
        },
        {
            id: "false-ceiling-wiring",
            show: true,
            title: "False Ceiling Wiring",
            icon: "🏗️",
            description: "Electrical wiring and lighting point installation for false ceilings.",
            subServices: [
                { name: "Ceiling Light Wiring", rate: "₹8 / sq.ft. onwards", show: true },
                { name: "Downlight Wiring", rate: "₹8 / sq.ft. onwards", show: true },
                { name: "Panel Light Wiring", rate: "₹8 / sq.ft. onwards", show: true },
                { name: "Strip Light Wiring", rate: "₹10 / sq.ft. onwards", show: true },
                { name: "Fan Point Wiring", rate: "₹150 / point onwards", show: true },
                { name: "Concealed Ceiling Wiring", rate: "₹10 / sq.ft. onwards", show: true }
            ]
        },
        {
            id: "inverter-backup",
            show: true,
            title: "Inverter & Backup",
            icon: "🔋",
            description: "Inverter, battery, changeover and backup electrical services.",
            subServices: [
                { name: "Inverter Installation", rate: "₹500 / set onwards", show: true },
                { name: "Inverter Wiring", rate: "₹8 / sq.ft. onwards", show: true },
                { name: "Battery Connection", rate: "₹150 / connection onwards", show: true },
                { name: "Changeover Installation", rate: "₹300 / piece onwards", show: true },
                { name: "Backup Wiring", rate: "₹8 / sq.ft. onwards", show: true },
                { name: "Inverter Fault Checking", rate: "₹200 / visit onwards", show: true }
            ]
        },
        {
            id: "electrical-repair",
            show: true,
            title: "Electrical Repair",
            icon: "🔧",
            description: "Electrical repair and maintenance for common household problems.",
            subServices: [
                { name: "Switch Repair", rate: "₹80 / point onwards", show: true },
                { name: "Socket Repair", rate: "₹80 / point onwards", show: true },
                { name: "Fan Repair", rate: "₹150 / fan onwards", show: true },
                { name: "Light Repair", rate: "₹100 / light onwards", show: true },
                { name: "Loose Connection Repair", rate: "₹150 / point onwards", show: true },
                { name: "Short Circuit Repair", rate: "₹300 / visit onwards", show: true }
            ]
        },
        {
            id: "fault-finding",
            show: true,
            title: "Fault Finding",
            icon: "🔍",
            description: "Electrical fault detection and troubleshooting services.",
            subServices: [
                { name: "Power Failure Checking", rate: "₹200 / visit onwards", show: true },
                { name: "Short Circuit Detection", rate: "₹300 / visit onwards", show: true },
                { name: "MCB Tripping Problem", rate: "₹250 / visit onwards", show: true },
                { name: "Voltage Checking", rate: "₹150 / visit onwards", show: true },
                { name: "Wiring Fault Detection", rate: "₹300 / visit onwards", show: true },
                { name: "Loose Connection Detection", rate: "₹200 / visit onwards", show: true }
            ]
        },
        {
            id: "commercial-electrical-work",
            show: true,
            title: "Commercial Electrical Work",
            icon: "🏢",
            description: "Electrical installation, wiring and maintenance for shops and offices.",
            subServices: [
                { name: "Shop Wiring", rate: "₹45 / sq.ft. onwards", show: true },
                { name: "Office Wiring", rate: "₹50 / sq.ft. onwards", show: true },
                { name: "Electrical Point Installation", rate: "₹100 / point onwards", show: true },
                { name: "DB & MCB Work", rate: "₹500 / DB onwards", show: true },
                { name: "Lighting Installation", rate: "₹150 / light onwards", show: true },
                { name: "Electrical Maintenance", rate: "₹500 / visit onwards", show: true }
            ]
        }
    ],

    gallery: [
        { id: "work-1", show: true, image: "assets/gallery/work1.jpg", title: "House Wiring" },
        { id: "work-2", show: true, image: "assets/gallery/work2.jpg", title: "False Ceiling Wiring" },
        { id: "work-3", show: true, image: "assets/gallery/work3.jpg", title: "DB Panel Installation" },
        { id: "work-4", show: true, image: "assets/gallery/work4.jpg", title: "Lighting Work" },
        { id: "work-5", show: true, image: "assets/gallery/work5.jpg", title: "Switch Board Work" },
        { id: "work-6", show: true, image: "assets/gallery/work6.jpg", title: "Electrical Repair" },
        { id: "work-7", show: true, image: "assets/gallery/work7.jpg", title: "New Project" }
    ],

    reviews: [
        { id: "review-1", show: true, name: "Customer", rating: 5, text: "Excellent electrical service and professional work." },
        { id: "review-2", show: true, name: "Customer", rating: 5, text: "Good quality work and on-time service." },
        { id: "review-3", show: true, name: "Customer", rating: 5, text: "Trusted electrician service in Lucknow." }
    ],

    faq: [
        { id: "faq-1", show: true, question: "House wiring ka kaam karte hain?", answer: "Haan, new house wiring, concealed wiring aur renovation wiring ki service available hai." },
        { id: "faq-2", show: true, question: "Electrical fault finding karte hain?", answer: "Haan, short circuit, MCB tripping, power fault aur wiring fault checking ki service available hai." },
        { id: "faq-3", show: true, question: "Fan aur light installation available hai?", answer: "Haan, fan, light, switch, socket aur other electrical fittings install ki jaati hain." },
        { id: "faq-4", show: true, question: "Estimate kaise milega?", answer: "Neeche diye gaye WhatsApp Quote Form se apni requirement bhejiye." },
        { id: "faq-5", show: true, question: "Aap Lucknow me service dete hain?", answer: "Haan, Sandeep ElectroFix Lucknow me service deta hai." }
    ],

    quote: {
        show: true,
        whatsappNumber: "919026036445",
        requireName: true,
        requirePhone: true,
        requireService: true,
        requireLocation: false
    }
};
