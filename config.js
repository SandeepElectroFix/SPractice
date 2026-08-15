/* =========================================================
   SANDEEP ELECTROFIX
   PROJECT 2 - DIGITAL CARD
   MASTER CONFIGURATION
   VERSION 3.0
   ========================================================= */

const CONFIG = {

    /* =====================================================
       BUSINESS INFORMATION
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
       MASTER FEATURE CONTROL
    ===================================================== */

    features: {
        hero: true,
        quickAccess: true,
        about: true,
        services: true,
        gallery: true,
        reviews: false,
        googleMaps: true,
        contactForm: true,
        faq: true,
        qrCode: true,
        contact: true,
        footer: true,

        heroItems: {
            logo: true,
            tagline: true,
            location: true,
            callButton: true,
            whatsappButton: true,
            themeButton: true,
            languageSwitcher: true
        },

        quickAccessItems: {
            materialCatalogue: true,
            call: true,
            whatsapp: true,
            website: true,
            googleMaps: true,
            facebook: true,
            instagram: true,
            youtube: true,
            email: true,
            saveContact: true,
            share: true,
            ourWork: true
        },

        serviceSettings: {
            showMainServices: true,
            showSubItems: true,
            showDescription: true,
            showPrices: true,
            showUnits: true
        },

        offers: true,
        discountOffer: true,
        discountSection: true,

        darkMode: true,
        languageSwitcher: true,
        visitorCounter: false,
        youtube: true,

        bottomNavigation: true,

        bottomNavItems: {
            home: true,
            services: true,
            work: true,
            quote: true,
            call: true
        }
    },

    /* =====================================================
       DISCOUNT
    ===================================================== */

    discount: {
        enabled: true,
        type: "percentage",
        value: 10,
        title: "Special Discount",
        message: "Get special discount on selected electrical services.",
        validUntil: "",
        showOnCard: true
    },

    /* =====================================================
       SERVICES (MAIN + SUB-SERVICES + RATES)
    ===================================================== */

    services: [
        {
            id: "house-wiring",
            show: true,
            icon: "🏠",
            title: "House Wiring",
            description: "Professional house wiring for new and existing homes.",
            items: [
                { id: "concealed-wiring", show: true, title: "Concealed Wiring", price: 25, unit: "sq.ft" },
                { id: "surface-wiring", show: true, title: "Surface Wiring", price: 18, unit: "sq.ft" },
                { id: "point-wiring", show: true, title: "Point Wiring", price: 350, unit: "point" },
                { id: "fan-point", show: true, title: "Fan Point", price: 450, unit: "point" },
                { id: "light-point", show: true, title: "Light Point", price: 300, unit: "point" }
            ]
        },
        {
            id: "fan-light",
            show: true,
            icon: "💡",
            title: "Fan & Light Fitting",
            description: "Professional installation of fans, lights and fittings.",
            items: [
                { id: "ceiling-fan", show: true, title: "Ceiling Fan Installation", price: 300, unit: "piece" },
                { id: "wall-fan", show: true, title: "Wall Fan Installation", price: 250, unit: "piece" },
                { id: "led-light", show: true, title: "LED Light Installation", price: 150, unit: "piece" }
            ]
        },
        {
            id: "mcb-db",
            show: true,
            icon: "⚡",
            title: "MCB & DB Installation",
            description: "MCB, DB and electrical protection system installation.",
            items: [
                { id: "mcb-installation", show: true, title: "MCB Installation", price: 150, unit: "piece" },
                { id: "db-installation", show: true, title: "DB Installation", price: 500, unit: "piece" },
                { id: "rccb-installation", show: true, title: "RCCB Installation", price: 300, unit: "piece" }
            ]
        },
        {
            id: "false-ceiling",
            show: true,
            icon: "🔌",
            title: "False Ceiling Wiring",
            description: "Neat and safe wiring for false ceiling lights and electrical points.",
            items: [
                { id: "ceiling-light-point", show: true, title: "Ceiling Light Point", price: 250, unit: "point" },
                { id: "ceiling-fan-point", show: true, title: "Ceiling Fan Point", price: 400, unit: "point" }
            ]
        },
        {
            id: "inverter",
            show: true,
            icon: "🔋",
            title: "Inverter Wiring",
            description: "Professional inverter and backup power wiring.",
            items: [
                { id: "inverter-wiring", show: true, title: "Basic Inverter Wiring", price: 800, unit: "job" },
                { id: "changeover", show: true, title: "Inverter Changeover", price: 500, unit: "job" }
            ]
        },
        {
            id: "repair",
            show: true,
            icon: "🛠️",
            title: "Electrical Repair",
            description: "Electrical repair and maintenance for homes and shops.",
            items: [
                { id: "minor-repair", show: true, title: "Minor Electrical Repair", price: 300, unit: "job" },
                { id: "fault-repair", show: true, title: "Electrical Fault Repair", price: 500, unit: "job" }
            ]
        },
        {
            id: "fault-finding",
            show: true,
            icon: "🔎",
            title: "Fault Finding",
            description: "Electrical fault detection and troubleshooting.",
            items: [
                { id: "basic-fault", show: true, title: "Basic Fault Finding", price: 300, unit: "visit" },
                { id: "detailed-fault", show: true, title: "Detailed Fault Finding", price: 500, unit: "visit" }
            ]
        },
        {
            id: "commercial",
            show: true,
            icon: "🏢",
            title: "Commercial Wiring",
            description: "Electrical wiring for shops and commercial spaces.",
            items: [
                { id: "commercial-point", show: true, title: "Commercial Point Wiring", price: 450, unit: "point" },
                { id: "shop-wiring", show: true, title: "Shop Wiring", price: 1500, unit: "job" }
            ]
        }
    ],

    /* =====================================================
       GALLERY
    ===================================================== */

    gallery: [
        { id: "work-1", show: true, image: "assets/gallery/work1.jpg", title: "Electrical Work" },
        { id: "work-2", show: true, image: "assets/gallery/work2.jpg", title: "House Wiring" },
        { id: "work-3", show: true, image: "assets/gallery/work3.jpg", title: "Electrical Installation" },
        { id: "work-4", show: true, image: "assets/gallery/work4.jpg", title: "Professional Electrical Work" }
    ],

    /* =====================================================
       REVIEWS
    ===================================================== */

    reviews: [
        { id: "review-1", show: true, name: "Customer", rating: 5, text: "Professional electrical service with good workmanship." },
        { id: "review-2", show: true, name: "Customer", rating: 5, text: "Good quality electrical work and proper guidance." },
        { id: "review-3", show: true, name: "Customer", rating: 5, text: "Reliable electrician service in Lucknow." }
    ],

    /* =====================================================
       FAQ
    ===================================================== */

    faq: [
        {
            id: "faq-1",
            show: true,
            question: "What electrical services do you provide?",
            answer: "We provide house wiring, false ceiling wiring, MCB & DB installation, fan and light fitting, inverter wiring, electrical repair, fault finding and maintenance services."
        },
        {
            id: "faq-2",
            show: true,
            question: "Do you provide house wiring services?",
            answer: "Yes. We provide professional electrical wiring services for new construction, renovation and existing homes."
        },
        {
            id: "faq-3",
            show: true,
            question: "Do you provide electrical repair services?",
            answer: "Yes. We provide electrical fault finding, repair and maintenance services."
        },
        {
            id: "faq-4",
            show: true,
            question: "How can I request a quotation?",
            answer: "Use the Request a Quote form on this digital card and send your enquiry directly through WhatsApp."
        },
        {
            id: "faq-5",
            show: true,
            question: "Which area do you serve?",
            answer: "Sandeep ElectroFix provides electrical services in Lucknow, Uttar Pradesh."
        }
    ],

    /* =====================================================
       QUOTE FORM
    ===================================================== */

    quote: {
        enabled: true,
        whatsappNumber: "919026036445",
        defaultMessage: "Hello Sandeep ElectroFix, I would like to enquire about electrical service.",
        requireName: true,
        requirePhone: true,
        requireService: true,
        requireLocation: true
    }
};

window.CONFIG = CONFIG;
console.log("Sandeep ElectroFix Master Config Loaded", CONFIG);
