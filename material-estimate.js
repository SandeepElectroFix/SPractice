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






/* =========================================================
   SANDEEP ELECTROFIX
   MATERIAL ESTIMATE SYSTEM
   MASTER MATERIAL DATA
   Stage 1 - Slab Conduit Installation
========================================================= */

window.MATERIAL_ESTIMATE_MATERIALS = [

    /* =====================================================
       STAGE 1 – SLAB CONDUIT INSTALLATION
    ===================================================== */

    {
        id: "stage1-pipe-heavy",
        stage: "stage-1",
        name: "Pipe",
        size: "Heavy",
        rate: 0,
        rateEditable: true,
        colorWise: false
    },

    {
        id: "stage1-long-bend-heavy",
        stage: "stage-1",
        name: "Long Bend",
        size: "Heavy",
        rate: 0,
        rateEditable: true,
        colorWise: false
    },

    {
        id: "stage1-deep-junction-box",
        stage: "stage-1",
        name: "Deep Junction Box",
        size: "",
        rate: 0,
        rateEditable: true,
        colorWise: false
    },

    {
        id: "stage1-fan-box",
        stage: "stage-1",
        name: "Fan Box",
        size: "",
        rate: 0,
        rateEditable: true,
        colorWise: false
    },

    {
        id: "stage1-light-box",
        stage: "stage-1",
        name: "Light Box",
        size: "",
        rate: 0,
        rateEditable: true,
        colorWise: false
    },

    {
        id: "stage1-tape-3inch",
        stage: "stage-1",
        name: "Tape",
        size: '3"',
        rate: 0,
        rateEditable: true,
        colorWise: false
    },

    {
        id: "stage1-solvent-cement",
        stage: "stage-1",
        name: "Solvent Cement",
        size: "",
        rate: 0,
        rateEditable: true,
        colorWise: false
    },

    {
        id: "stage1-neel-powder",
        stage: "stage-1",
        name: "Neel Powder",
        size: "",
        rate: 0,
        rateEditable: true,
        colorWise: false
    },

    {
        id: "stage1-binding-wire",
        stage: "stage-1",
        name: "Binding Wire",
        size: "",
        rate: 0,
        rateEditable: true,
        colorWise: false
    },

    {
        id: "stage1-cable-tie",
        stage: "stage-1",
        name: "Cable Tie",
        size: "",
        rate: 0,
        rateEditable: true,
        colorWise: false
    }

];

console.log(
    "Stage 1 Materials Loaded:",
    window.MATERIAL_ESTIMATE_MATERIALS.length
);




/* =========================================================
   STAGE 2 – WALL CONDUIT INSTALLATION
========================================================= */

{
    id: "stage2-gi-board-2m",
    stage: "stage-2",
    name: "GI Board",
    size: "2 Module",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage2-gi-board-3m",
    stage: "stage-2",
    name: "GI Board",
    size: "3 Module",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage2-gi-board-4m",
    stage: "stage-2",
    name: "GI Board",
    size: "4 Module",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage2-gi-board-6m",
    stage: "stage-2",
    name: "GI Board",
    size: "6 Module",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage2-gi-board-8m-square",
    stage: "stage-2",
    name: "GI Board",
    size: "8 Module Square",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage2-gi-board-8m-rectangular",
    stage: "stage-2",
    name: "GI Board",
    size: "8 Module Rectangular",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage2-gi-board-12m",
    stage: "stage-2",
    name: "GI Board",
    size: "12 Module",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage2-gi-board-16m",
    stage: "stage-2",
    name: "GI Board",
    size: "16 Module",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage2-gi-board-18m",
    stage: "stage-2",
    name: "GI Board",
    size: "18 Module",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   PIPE
===================================================== */

{
    id: "stage2-pipe-heavy",
    stage: "stage-2",
    name: "Pipe",
    size: "Heavy",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage2-pipe-medium",
    stage: "stage-2",
    name: "Pipe",
    size: "Medium",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage2-pipe-light",
    stage: "stage-2",
    name: "Pipe",
    size: "Light",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   OTHER MATERIALS
===================================================== */

{
    id: "stage2-junction-box-4way",
    stage: "stage-2",
    name: "Junction Box",
    size: "4 Way (Dibby)",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage2-long-bend",
    stage: "stage-2",
    name: "Long Bend",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage2-tape-3inch",
    stage: "stage-2",
    name: "Tape",
    size: '3"',
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage2-clip-25mm",
    stage: "stage-2",
    name: "Clip",
    size: "25mm",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage2-mcb-box-double-door",
    stage: "stage-2",
    name: "MCB Box",
    size: "Double Door",
    rate: 0,
    rateEditable: true,
    colorWise: false
}



/* =========================================================
   STAGE 3 – WIRING INSTALLATION
========================================================= */

/* =====================================================
   WIRE - COLOUR WISE QUANTITY
===================================================== */

{
    id: "stage3-wire-075",
    stage: "stage-3",
    name: "Wire",
    size: "0.75 Sqmm",
    rate: 0,
    rateEditable: true,
    colorWise: true
},

{
    id: "stage3-wire-1",
    stage: "stage-3",
    name: "Wire",
    size: "1 Sqmm",
    rate: 0,
    rateEditable: true,
    colorWise: true
},

{
    id: "stage3-wire-15",
    stage: "stage-3",
    name: "Wire",
    size: "1.5 Sqmm",
    rate: 0,
    rateEditable: true,
    colorWise: true
},

{
    id: "stage3-wire-25",
    stage: "stage-3",
    name: "Wire",
    size: "2.5 Sqmm",
    rate: 0,
    rateEditable: true,
    colorWise: true
},

{
    id: "stage3-wire-4",
    stage: "stage-3",
    name: "Wire",
    size: "4 Sqmm",
    rate: 0,
    rateEditable: true,
    colorWise: true
},

{
    id: "stage3-wire-6",
    stage: "stage-3",
    name: "Wire",
    size: "6 Sqmm",
    rate: 0,
    rateEditable: true,
    colorWise: true
},

{
    id: "stage3-wire-10",
    stage: "stage-3",
    name: "Wire",
    size: "10 Sqmm",
    rate: 0,
    rateEditable: true,
    colorWise: true
},

/* =====================================================
   OTHER WIRING MATERIALS
===================================================== */

{
    id: "stage3-electrical-tape",
    stage: "stage-3",
    name: "Electrical Tape",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage3-flexible-pipe-075",
    stage: "stage-3",
    name: "Flexible Pipe",
    size: '0.75"',
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage3-flexible-pipe-1",
    stage: "stage-3",
    name: "Flexible Pipe",
    size: '1"',
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage3-steel-spring-wire",
    stage: "stage-3",
    name: "Steel Wire / Spring Wire",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage3-pop",
    stage: "stage-3",
    name: "POP",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage3-putty-blade",
    stage: "stage-3",
    name: "Putty Blade / Patta",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   FASTENER
===================================================== */

{
    id: "stage3-fastener-m10",
    stage: "stage-3",
    name: "Fastener",
    size: "M10",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage3-fastener-m12",
    stage: "stage-3",
    name: "Fastener",
    size: "M12",
    rate: 0,
    rateEditable: true,
    colorWise: false
}



/* =========================================================
   STAGE 4 – FINAL ELECTRICAL FITTINGS
========================================================= */

/* =====================================================
   MODULAR SHEET
===================================================== */

{
    id: "stage4-modular-sheet-2m",
    stage: "stage-4",
    name: "Modular Sheet",
    size: "2 Module",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-modular-sheet-3m",
    stage: "stage-4",
    name: "Modular Sheet",
    size: "3 Module",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-modular-sheet-4m",
    stage: "stage-4",
    name: "Modular Sheet",
    size: "4 Module",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-modular-sheet-6m",
    stage: "stage-4",
    name: "Modular Sheet",
    size: "6 Module",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-modular-sheet-8m-square",
    stage: "stage-4",
    name: "Modular Sheet",
    size: "8 Module Square",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-modular-sheet-8m-rectangular",
    stage: "stage-4",
    name: "Modular Sheet",
    size: "8 Module Rectangular",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-modular-sheet-12m",
    stage: "stage-4",
    name: "Modular Sheet",
    size: "12 Module",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-modular-sheet-16m",
    stage: "stage-4",
    name: "Modular Sheet",
    size: "16 Module",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-modular-sheet-18m",
    stage: "stage-4",
    name: "Modular Sheet",
    size: "18 Module",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   SWITCH
===================================================== */

{
    id: "stage4-switch-6a",
    stage: "stage-4",
    name: "Switch",
    size: "6A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-switch-16a",
    stage: "stage-4",
    name: "Switch",
    size: "16A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   SOCKET
===================================================== */

{
    id: "stage4-socket-6a",
    stage: "stage-4",
    name: "Socket",
    size: "6A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-socket-16a",
    stage: "stage-4",
    name: "Socket",
    size: "16A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   MINI MCB
===================================================== */

{
    id: "stage4-mini-mcb-6a",
    stage: "stage-4",
    name: "Mini MCB",
    size: "6A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-mini-mcb-10a",
    stage: "stage-4",
    name: "Mini MCB",
    size: "10A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-mini-mcb-16a",
    stage: "stage-4",
    name: "Mini MCB",
    size: "16A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-mini-mcb-20a",
    stage: "stage-4",
    name: "Mini MCB",
    size: "20A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-mini-mcb-25a",
    stage: "stage-4",
    name: "Mini MCB",
    size: "25A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-mini-mcb-32a",
    stage: "stage-4",
    name: "Mini MCB",
    size: "32A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   FAN REGULATOR
===================================================== */

{
    id: "stage4-fan-regulator-1m",
    stage: "stage-4",
    name: "Fan Regulator",
    size: "1M",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-fan-regulator-2m",
    stage: "stage-4",
    name: "Fan Regulator",
    size: "2M",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   2 WAY SWITCH
===================================================== */

{
    id: "stage4-2way-switch-6a",
    stage: "stage-4",
    name: "2 Way Switch",
    size: "6A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-2way-switch-16a",
    stage: "stage-4",
    name: "2 Way Switch",
    size: "16A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   BELL PUSH
===================================================== */

{
    id: "stage4-bell-push-1m",
    stage: "stage-4",
    name: "Bell Push",
    size: "1M",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-bell-push-2m",
    stage: "stage-4",
    name: "Bell Push",
    size: "2M",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   OTHER FITTINGS
===================================================== */

{
    id: "stage4-neon-indicator",
    stage: "stage-4",
    name: "Neon Indicator",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-blank-plate",
    stage: "stage-4",
    name: "Blank Plate / Dummy Switch",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-fan-sheet-pvc",
    stage: "stage-4",
    name: "Fan Sheet",
    size: "PVC",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-fan-sheet-mica",
    stage: "stage-4",
    name: "Fan Sheet",
    size: "Mica",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-door-bell",
    stage: "stage-4",
    name: "Door Bell",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-ceiling-rose",
    stage: "stage-4",
    name: "Ceiling Rose",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   LIGHTING
===================================================== */

{
    id: "stage4-led-bulb",
    stage: "stage-4",
    name: "LED Bulb",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-led-tube-light",
    stage: "stage-4",
    name: "LED Tube Light",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-foot-light",
    stage: "stage-4",
    name: "Foot Light",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-up-down-light",
    stage: "stage-4",
    name: "Up Down Light",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-panel-light",
    stage: "stage-4",
    name: "Panel Light",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-surface-light",
    stage: "stage-4",
    name: "Surface Light",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-cob-light",
    stage: "stage-4",
    name: "COB Light",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-cob-spot-light",
    stage: "stage-4",
    name: "COB Spot Light",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   DOWN LIGHT
===================================================== */

{
    id: "stage4-down-light-warm",
    stage: "stage-4",
    name: "Down Light",
    size: "Warm White",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-down-light-natural",
    stage: "stage-4",
    name: "Down Light",
    size: "Natural White",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-down-light-cool",
    stage: "stage-4",
    name: "Down Light",
    size: "Cool White",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   STRIP / ROPE LIGHT
===================================================== */

{
    id: "stage4-strip-light-60",
    stage: "stage-4",
    name: "Strip Light",
    size: "60 LEDs/Mtr",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-strip-light-120",
    stage: "stage-4",
    name: "Strip Light",
    size: "120 LEDs/Mtr",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-strip-light-240",
    stage: "stage-4",
    name: "Strip Light",
    size: "240 LEDs/Mtr",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-rope-light",
    stage: "stage-4",
    name: "Rope Light",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-led-profile-channel",
    stage: "stage-4",
    name: "LED Profile Channel",
    size: "10ft",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   LED STRIP DRIVER
===================================================== */

{
    id: "stage4-led-strip-driver-5a",
    stage: "stage-4",
    name: "LED Strip Driver",
    size: "5A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-led-strip-driver-10a",
    stage: "stage-4",
    name: "LED Strip Driver",
    size: "10A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   HOLDERS
===================================================== */

{
    id: "stage4-batten-holder-normal",
    stage: "stage-4",
    name: "Batten Holder",
    size: "Normal",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-batten-holder-modular",
    stage: "stage-4",
    name: "Batten Holder",
    size: "Modular",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-angle-holder-normal",
    stage: "stage-4",
    name: "Angle Holder",
    size: "Normal",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-angle-holder-modular",
    stage: "stage-4",
    name: "Angle Holder",
    size: "Modular",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   GLUES
===================================================== */

{
    id: "stage4-instant-glue",
    stage: "stage-4",
    name: "Instant Glue",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-araldite-glue",
    stage: "stage-4",
    name: "Araldite Glue",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   SCREWS
===================================================== */

{
    id: "stage4-screw-1inch",
    stage: "stage-4",
    name: "Screw",
    size: '1"',
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-screw-15inch",
    stage: "stage-4",
    name: "Screw",
    size: '1.5"',
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-screw-2inch",
    stage: "stage-4",
    name: "Screw",
    size: '2"',
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-screw-25inch",
    stage: "stage-4",
    name: "Screw",
    size: '2.5"',
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-screw-3inch",
    stage: "stage-4",
    name: "Screw",
    size: '3"',
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   ROUND SHEET
===================================================== */

{
    id: "stage4-round-sheet-pvc",
    stage: "stage-4",
    name: "Round Sheet",
    size: "PVC",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-round-sheet-mica",
    stage: "stage-4",
    name: "Round Sheet",
    size: "Mica",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   ELECTRICAL TAPE - COLOUR VARIANTS
===================================================== */

{
    id: "stage4-electrical-tape-red",
    stage: "stage-4",
    name: "Electrical Tape",
    size: "Red",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-electrical-tape-black",
    stage: "stage-4",
    name: "Electrical Tape",
    size: "Black",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-electrical-tape-white",
    stage: "stage-4",
    name: "Electrical Tape",
    size: "White",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-electrical-tape-green",
    stage: "stage-4",
    name: "Electrical Tape",
    size: "Green",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-electrical-tape-blue",
    stage: "stage-4",
    name: "Electrical Tape",
    size: "Blue",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-electrical-tape-yellow",
    stage: "stage-4",
    name: "Electrical Tape",
    size: "Yellow",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   DP SWITCH
===================================================== */

{
    id: "stage4-dp-switch-16a",
    stage: "stage-4",
    name: "DP Switch",
    size: "16A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-dp-switch-20a",
    stage: "stage-4",
    name: "DP Switch",
    size: "20A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-dp-switch-25a",
    stage: "stage-4",
    name: "DP Switch",
    size: "25A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-dp-switch-32a",
    stage: "stage-4",
    name: "DP Switch",
    size: "32A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   SP MCB
===================================================== */

{
    id: "stage4-sp-mcb-10a",
    stage: "stage-4",
    name: "SP MCB",
    size: "10A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-sp-mcb-16a",
    stage: "stage-4",
    name: "SP MCB",
    size: "16A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-sp-mcb-20a",
    stage: "stage-4",
    name: "SP MCB",
    size: "20A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-sp-mcb-25a",
    stage: "stage-4",
    name: "SP MCB",
    size: "25A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-sp-mcb-32a",
    stage: "stage-4",
    name: "SP MCB",
    size: "32A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-sp-mcb-40a",
    stage: "stage-4",
    name: "SP MCB",
    size: "40A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   DP MCB
===================================================== */

{
    id: "stage4-dp-mcb-16a",
    stage: "stage-4",
    name: "DP MCB",
    size: "16A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-dp-mcb-25a",
    stage: "stage-4",
    name: "DP MCB",
    size: "25A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-dp-mcb-32a",
    stage: "stage-4",
    name: "DP MCB",
    size: "32A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-dp-mcb-40a",
    stage: "stage-4",
    name: "DP MCB",
    size: "40A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-dp-mcb-63a",
    stage: "stage-4",
    name: "DP MCB",
    size: "63A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   TPN MCB
===================================================== */

{
    id: "stage4-tpn-mcb-32a",
    stage: "stage-4",
    name: "TPN MCB",
    size: "32A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-tpn-mcb-40a",
    stage: "stage-4",
    name: "TPN MCB",
    size: "40A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-tpn-mcb-63a",
    stage: "stage-4",
    name: "TPN MCB",
    size: "63A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   MCB CHANGEOVER
===================================================== */

{
    id: "stage4-mcb-changeover-32a",
    stage: "stage-4",
    name: "MCB Changeover",
    size: "32A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-mcb-changeover-40a",
    stage: "stage-4",
    name: "MCB Changeover",
    size: "40A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-mcb-changeover-63a",
    stage: "stage-4",
    name: "MCB Changeover",
    size: "63A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   DP ISOLATOR
===================================================== */

{
    id: "stage4-dp-isolator-40a",
    stage: "stage-4",
    name: "DP Isolator",
    size: "40A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-dp-isolator-63a",
    stage: "stage-4",
    name: "DP Isolator",
    size: "63A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-dp-isolator-100a",
    stage: "stage-4",
    name: "DP Isolator",
    size: "100A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   TPN ISOLATOR
===================================================== */

{
    id: "stage4-tpn-isolator-32a",
    stage: "stage-4",
    name: "TPN Isolator",
    size: "32A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-tpn-isolator-40a",
    stage: "stage-4",
    name: "TPN Isolator",
    size: "40A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-tpn-isolator-63a",
    stage: "stage-4",
    name: "TPN Isolator",
    size: "63A",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   RCCB / RCD
===================================================== */

{
    id: "stage4-rccb-25a-30ma",
    stage: "stage-4",
    name: "RCCB / RCD",
    size: "25A / 30mA",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-rccb-40a-30ma",
    stage: "stage-4",
    name: "RCCB / RCD",
    size: "40A / 30mA",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-rccb-63a-30ma",
    stage: "stage-4",
    name: "RCCB / RCD",
    size: "63A / 30mA",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   KIT KAT FUSE
===================================================== */

{
    id: "stage4-kitkat-32a-415v",
    stage: "stage-4",
    name: "Kit Kat Fuse",
    size: "32A / 415V",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-kitkat-32a-416v",
    stage: "stage-4",
    name: "Kit Kat Fuse",
    size: "32A / 416V",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-kitkat-32a-417v",
    stage: "stage-4",
    name: "Kit Kat Fuse",
    size: "32A / 417V",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   PIN TYPE COPPER LUG
===================================================== */

{
    id: "stage4-copper-lug-25",
    stage: "stage-4",
    name: "Pin Type Copper Lug",
    size: "2.5mm",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-copper-lug-4",
    stage: "stage-4",
    name: "Pin Type Copper Lug",
    size: "4mm",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-copper-lug-6",
    stage: "stage-4",
    name: "Pin Type Copper Lug",
    size: "6mm",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-copper-lug-10",
    stage: "stage-4",
    name: "Pin Type Copper Lug",
    size: "10mm",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   FINAL SMALL MATERIALS
===================================================== */

{
    id: "stage4-pop",
    stage: "stage-4",
    name: "POP",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage4-putty-blade",
    stage: "stage-4",
    name: "Putty Blade / Patta",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
}




/* =========================================================
   STAGE 5 – FALSE CEILING WIRING
========================================================= */

/* =====================================================
   WIRE – COLOUR WISE QUANTITY
===================================================== */

{
    id: "stage5-wire-075",
    stage: "stage-5",
    name: "Wire",
    size: "0.75 Sqmm",
    rate: 0,
    rateEditable: true,
    colorWise: true
},

{
    id: "stage5-wire-1",
    stage: "stage-5",
    name: "Wire",
    size: "1 Sqmm",
    rate: 0,
    rateEditable: true,
    colorWise: true
},

{
    id: "stage5-wire-15",
    stage: "stage-5",
    name: "Wire",
    size: "1.5 Sqmm",
    rate: 0,
    rateEditable: true,
    colorWise: true
},

{
    id: "stage5-wire-25",
    stage: "stage-5",
    name: "Wire",
    size: "2.5 Sqmm",
    rate: 0,
    rateEditable: true,
    colorWise: true
},

{
    id: "stage5-wire-4",
    stage: "stage-5",
    name: "Wire",
    size: "4 Sqmm",
    rate: 0,
    rateEditable: true,
    colorWise: true
},

{
    id: "stage5-wire-6",
    stage: "stage-5",
    name: "Wire",
    size: "6 Sqmm",
    rate: 0,
    rateEditable: true,
    colorWise: true
},

{
    id: "stage5-wire-10",
    stage: "stage-5",
    name: "Wire",
    size: "10 Sqmm",
    rate: 0,
    rateEditable: true,
    colorWise: true
},

/* =====================================================
   OTHER MATERIALS
===================================================== */

{
    id: "stage5-electrical-tape",
    stage: "stage-5",
    name: "Electrical Tape",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage5-pipe",
    stage: "stage-5",
    name: "Pipe",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage5-long-bend",
    stage: "stage-5",
    name: "Long Bend",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage5-junction-box-4way",
    stage: "stage-5",
    name: "Junction Box 4 Way (Dibby)",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   ZIP TIE / CABLE TIE
===================================================== */

{
    id: "stage5-zip-tie-300mm",
    stage: "stage-5",
    name: "Zip Tie / Cable Tie",
    size: "300mm",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   FLEXIBLE PIPE
===================================================== */

{
    id: "stage5-flexible-pipe-075",
    stage: "stage-5",
    name: "Flexible Pipe",
    size: '0.75"',
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage5-flexible-pipe-1",
    stage: "stage-5",
    name: "Flexible Pipe",
    size: '1"',
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   SADDLE CLAMP
===================================================== */

{
    id: "stage5-saddle-clamp-25mm",
    stage: "stage-5",
    name: "Saddle Clamp",
    size: "25mm",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   CABLE CLIP
===================================================== */

{
    id: "stage5-cable-clip-25mm",
    stage: "stage-5",
    name: "Cable Clip",
    size: "25mm",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   SCREW
===================================================== */

{
    id: "stage5-screw-1inch",
    stage: "stage-5",
    name: "Screw",
    size: '1"',
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage5-screw-15inch",
    stage: "stage-5",
    name: "Screw",
    size: '1.5"',
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   FASTENER
===================================================== */

{
    id: "stage5-fastener-m10",
    stage: "stage-5",
    name: "Fastener",
    size: "M10",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage5-fastener-m12",
    stage: "stage-5",
    name: "Fastener",
    size: "M12",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   FAN ACCESSORIES
===================================================== */

{
    id: "stage5-fan-rod",
    stage: "stage-5",
    name: "Fan Rod",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

{
    id: "stage5-fan-clamp",
    stage: "stage-5",
    name: "Fan Clamp",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   PVC WALL PLUG
===================================================== */

{
    id: "stage5-pvc-wall-plug",
    stage: "stage-5",
    name: "PVC Wall Plug / Gulli / Gitti",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   WASHER
===================================================== */

{
    id: "stage5-washer",
    stage: "stage-5",
    name: "Washer",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
},

/* =====================================================
   CHAIN
===================================================== */

{
    id: "stage5-chain",
    stage: "stage-5",
    name: "Chain",
    size: "",
    rate: 0,
    rateEditable: true,
    colorWise: false
}
]
