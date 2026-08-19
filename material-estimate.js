/* =========================================================
   SANDEEP ELECTROFIX
   MATERIAL ESTIMATE SYSTEM
   MASTER CONFIGURATION
   Version 1.0.0
========================================================= */

window.MATERIAL_ESTIMATE_CONFIG = {

    /* =====================================================
       GENERAL SETTINGS
    ===================================================== */

    general: {

        companyName: "Sandeep ElectroFix",

        ownerName: "Sandeep Verma",

        phone: "+919026036445",

        email: "SandeepElectroFix@gmail.com",

        website:
            "https://sandeepelectrofix.github.io/",

        location:
            "Lucknow, Uttar Pradesh",

        slogan:
            "Powering Your Trust",

        logo:
            "assets/logo.png"

    },


    /* =====================================================
       ESTIMATE SETTINGS
    ===================================================== */

    estimate: {

        /* Rate पहले से Master Config में रखा जा सकता है */
        predefinedRate: true,

        /* User rate बदल सकता है या नहीं */
        userCanChangeRate: true,

        /* Quantity डालना जरूरी */
        quantityRequired: true,

        /* जिन materials में colour quantity चाहिए */
        colorWiseQuantity: true,

        /* Total amount दिखाना */
        showItemTotal: true,

        /* Grand total दिखाना */
        showGrandTotal: true,

        /* PDF button */
        showPdfButton: true,

        /* WhatsApp future option */
        showWhatsAppButton: false

    },


    /* =====================================================
       MATERIAL DISPLAY SETTINGS
    ===================================================== */

    display: {

        showMaterialName: true,

        showSize: true,

        showRate: true,

        showQuantity: true,

        showTotal: true,

        showStage: false,

        showSearch: true,

        showCounter: true

    },


    /* =====================================================
       MENU SETTINGS
       
       अभी 6 menus:
       1. All
       2. Stage 1
       3. Stage 2
       4. Stage 3
       5. Stage 4
       6. Stage 5
       
       Future में इसी array में नया menu add होगा.
    ===================================================== */

    menus: [

        {
            id: "all",
            name: "All Materials",
            name_hi: "सभी सामग्री",
            icon: "🛒",
            show: true
        },

        {
            id: "stage-1",
            name: "Stage 1",
            name_hi: "स्टेज 1",
            title: "Slab Conduit Installation",
            icon: "🏗️",
            show: true
        },

        {
            id: "stage-2",
            name: "Stage 2",
            name_hi: "स्टेज 2",
            title: "Wall Conduit Installation",
            icon: "🧱",
            show: true
        },

        {
            id: "stage-3",
            name: "Stage 3",
            name_hi: "स्टेज 3",
            title: "Wiring Installation",
            icon: "🔌",
            show: true
        },

        {
            id: "stage-4",
            name: "Stage 4",
            name_hi: "स्टेज 4",
            title: "Final Electrical Fittings",
            icon: "💡",
            show: true
        },

        {
            id: "stage-5",
            name: "Stage 5",
            name_hi: "स्टेज 5",
            title: "False Ceiling Wiring",
            icon: "🏠",
            show: true
        }

    ],


    /* =====================================================
       COLOR SETTINGS
       
       Wiring materials के लिए:
       Red / Black / Yellow / Blue /
       Green / White / Grey
    ===================================================== */

    colors: [

        {
            id: "red",
            name: "Red",
            show: true
        },

        {
            id: "black",
            name: "Black",
            show: true
        },

        {
            id: "yellow",
            name: "Yellow",
            show: true
        },

        {
            id: "blue",
            name: "Blue",
            show: true
        },

        {
            id: "green",
            name: "Green",
            show: true
        },

        {
            id: "white",
            name: "White",
            show: true
        },

        {
            id: "grey",
            name: "Grey",
            show: true
        }

    ]

};


/* =========================================================
   CHECK CONFIG
========================================================= */

console.log(
    "Sandeep ElectroFix Material Estimate Config Loaded"
);

console.log(
    "Menus:",
    window.MATERIAL_ESTIMATE_CONFIG.menus.length
);
