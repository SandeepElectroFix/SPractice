/* =========================================================
   SANDEEP ELECTROFIX
   ADVANCED MATERIAL ESTIMATE SYSTEM
   MASTER MATERIAL CATALOGUE
   Version 2.0.0

   STRUCTURE

   Material
      ↓
   Type
      ↓
   Sub Type / Size
      ↓
   Color
      ↓
   Quantity
      ↓
   Unit
      ↓
   Brand

   FEATURES
   ✓ Hindi + English
   ✓ Stage wise
   ✓ Show / Hide
   ✓ Type / Sub Type
   ✓ Color
   ✓ Quantity
   ✓ Material specific Unit
   ✓ Brand
   ✓ Non Brand / Local
   ✓ Skip Brand
========================================================= */


/* =========================================================
   COMMON HELPERS
========================================================= */

const MATERIAL_COLORS = [
    {
        id: "red",
        show: true,
        name_hi: "लाल",
        name_en: "Red"
    },
    {
        id: "black",
        show: true,
        name_hi: "काला",
        name_en: "Black"
    },
    {
        id: "yellow",
        show: true,
        name_hi: "पीला",
        name_en: "Yellow"
    },
    {
        id: "blue",
        show: true,
        name_hi: "नीला",
        name_en: "Blue"
    },
    {
        id: "green",
        show: true,
        name_hi: "हरा",
        name_en: "Green"
    },
    {
        id: "white",
        show: true,
        name_hi: "सफेद",
        name_en: "White"
    },
    {
        id: "grey",
        show: true,
        name_hi: "स्लेटी",
        name_en: "Grey"
    }
];


const UNITS = {

    PCS: {
        id: "pcs",
        show: true,
        name_hi: "पीस",
        name_en: "Pcs"
    },

    BUNDLE: {
        id: "bundle",
        show: true,
        name_hi: "बंडल",
        name_en: "Bundle"
    },

    BOX: {
        id: "box",
        show: true,
        name_hi: "बॉक्स",
        name_en: "Box"
    },

    METER: {
        id: "meter",
        show: true,
        name_hi: "मीटर",
        name_en: "Meter"
    },

    COIL: {
        id: "coil",
        show: true,
        name_hi: "कॉइल",
        name_en: "Coil"
    },

    ROLL: {
        id: "roll",
        show: true,
        name_hi: "रोल",
        name_en: "Roll"
    },

    PACKET: {
        id: "packet",
        show: true,
        name_hi: "पैकेट",
        name_en: "Packet"
    },

    SET: {
        id: "set",
        show: true,
        name_hi: "सेट",
        name_en: "Set"
    },

    KG: {
        id: "kg",
        show: true,
        name_hi: "किलोग्राम",
        name_en: "Kg"
    },

    BAG: {
        id: "bag",
        show: true,
        name_hi: "बैग",
        name_en: "Bag"
    }
};


/* =========================================================
   MATERIAL FACTORY
========================================================= */

function createMaterial({
    id,
    hi,
    en,
    types = [],
    colors = null,
    units = [],
    show = true
}) {

    return {

        id,

        show,

        name_hi: hi,
        name_en: en,

        types,

        colors,

        unit: {

            show: true,

            options: units

        },

        brand: {

            show: true,

            allowSkip: true,

            allowNonBrand: true,

            customEntry: true

        }

    };
}


function createType(
    id,
    hi,
    en,
    subTypes = [],
    show = true
) {

    return {

        id,

        show,

        name_hi: hi,
        name_en: en,

        subTypes

    };
}


function createSubType(
    id,
    hi,
    en,
    colors = null,
    show = true
) {

    return {

        id,

        show,

        name_hi: hi,
        name_en: en,

        colors

    };
}


/* =========================================================
   STAGE 1
   SLAB CONDUIT INSTALLATION
========================================================= */

const STAGE_1_MATERIALS = [

    createMaterial({
        id: "slab-pipe",
        hi: "पाइप",
        en: "Pipe",

        types: [

            createType(
                "heavy",
                "भारी",
                "Heavy"
            ),

            createType(
                "medium",
                "माध्यम",
                "Medium"
            ),

            createType(
                "light",
                "हल्का",
                "Light"
            )

        ],

        units: [
            UNITS.PCS,
            UNITS.BUNDLE
        ]
    }),


    createMaterial({
        id: "slab-long-bend",
        hi: "लॉन्ग बेंड",
        en: "Long Bend",

        types: [

            createType(
                "heavy",
                "भारी",
                "Heavy"
            )

        ],

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "deep-junction-box",
        hi: "डीप जंक्शन बॉक्स",
        en: "Deep Junction Box",

        units: [
            UNITS.PCS,
            UNITS.BOX
        ]
    }),


    createMaterial({
        id: "fan-box",
        hi: "फैन बॉक्स",
        en: "Fan Box",

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "light-box",
        hi: "लाइट बॉक्स",
        en: "Light Box",

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "slab-tape",
        hi: '3" टेप',
        en: '3" Tape',

        units: [
            UNITS.ROLL,
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "neel-powder",
        hi: "नील पाउडर",
        en: "Neel Powder",

        units: [
            UNITS.PACKET,
            UNITS.KG
        ]
    }),


    createMaterial({
        id: "kachcha-wire",
        hi: "कच्चा तार",
        en: "Binding Wire",

        units: [
            UNITS.KG,
            UNITS.BUNDLE
        ]
    }),


    createMaterial({
        id: "cable-tie",
        hi: "केबल टाई",
        en: "Cable Tie",

        units: [
            UNITS.PCS,
            UNITS.PACKET
        ]
    })

];


/* =========================================================
   STAGE 2
   WALL CONDUIT INSTALLATION
========================================================= */

const STAGE_2_MATERIALS = [

    createMaterial({
        id: "gi-metal-box",
        hi: "जीआई बोर्ड / मेटल बॉक्स",
        en: "GI Board / Metal Box",

        types: [

            createType(
                "2-module",
                "2 मॉड्यूल",
                "2 Module"
            ),

            createType(
                "3-module",
                "3 मॉड्यूल",
                "3 Module"
            ),

            createType(
                "4-module",
                "4 मॉड्यूल",
                "4 Module"
            ),

            createType(
                "6-module",
                "6 मॉड्यूल",
                "6 Module"
            ),

            createType(
                "8-module-square",
                "8 मॉड्यूल (चौकोर)",
                "8 Module (Square)"
            ),

            createType(
                "8-module-long",
                "8 मॉड्यूल (लम्बा)",
                "8 Module (Rectangular)"
            ),

            createType(
                "12-module",
                "12 मॉड्यूल",
                "12 Module"
            ),

            createType(
                "16-module",
                "16 मॉड्यूल",
                "16 Module"
            ),

            createType(
                "18-module",
                "18 मॉड्यूल",
                "18 Module"
            )

        ],

        units: [
            UNITS.PCS,
            UNITS.BOX
        ]
    }),


    createMaterial({
        id: "wall-pipe",
        hi: "पाइप",
        en: "Pipe",

        types: [

            createType(
                "heavy",
                "भारी",
                "Heavy"
            ),

            createType(
                "medium",
                "माध्यम",
                "Medium"
            ),

            createType(
                "light",
                "हल्का",
                "Light"
            )

        ],

        units: [
            UNITS.PCS,
            UNITS.BUNDLE
        ]
    }),


    createMaterial({
        id: "wall-junction-box",
        hi: "जंक्शन बॉक्स 4वे (डिब्बी)",
        en: "Junction Box 4 Way (Dibby)",

        units: [
            UNITS.PCS,
            UNITS.BOX
        ]
    }),


    createMaterial({
        id: "wall-long-bend",
        hi: "लॉन्ग बेंड",
        en: "Long Bend",

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "wall-tape",
        hi: '3" टेप',
        en: '3" Tape',

        units: [
            UNITS.ROLL,
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "25mm-clip",
        hi: "25 एमएम क्लिप",
        en: "25mm Clip",

        units: [
            UNITS.PCS,
            UNITS.PACKET
        ]
    }),


    createMaterial({
        id: "mcb-box-double-door",
        hi: "एमसीबी बॉक्स डबल डोर",
        en: "MCB Box Double Door",

        units: [
            UNITS.PCS
        ]
    })

];


/* =========================================================
   STAGE 3
   WIRING INSTALLATION
========================================================= */

const WIRE_SIZES = [

    createSubType(
        "0-75-sqmm",
        "0.75 स्क्वायर एमएम",
        "0.75 Sqmm",
        MATERIAL_COLORS
    ),

    createSubType(
        "1-sqmm",
        "1 स्क्वायर एमएम",
        "1 Sqmm",
        MATERIAL_COLORS
    ),

    createSubType(
        "1-5-sqmm",
        "1.5 स्क्वायर एमएम",
        "1.5 Sqmm",
        MATERIAL_COLORS
    ),

    createSubType(
        "2-5-sqmm",
        "2.5 स्क्वायर एमएम",
        "2.5 Sqmm",
        MATERIAL_COLORS
    ),

    createSubType(
        "4-sqmm",
        "4 स्क्वायर एमएम",
        "4 Sqmm",
        MATERIAL_COLORS
    ),

    createSubType(
        "6-sqmm",
        "6 स्क्वायर एमएम",
        "6 Sqmm",
        MATERIAL_COLORS
    ),

    createSubType(
        "10-sqmm",
        "10 स्क्वायर एमएम",
        "10 Sqmm",
        MATERIAL_COLORS
    )

];


const STAGE_3_MATERIALS = [

    createMaterial({
        id: "wire",
        hi: "तार",
        en: "Wire",

        types: [

            createType(
                "fr",
                "FR",
                "FR",
                WIRE_SIZES
            )

        ],

        units: [
            UNITS.METER,
            UNITS.COIL
        ]
    }),


    createMaterial({
        id: "wiring-tape",
        hi: "बिजली वाला टेप",
        en: "Electrical Tape",

        types: [],

        units: [
            UNITS.ROLL,
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "flexible-pipe",
        hi: "फ्लेक्सिबल पाइप",
        en: "Flexible Pipe",

        types: [

            createType(
                "0-75-inch",
                '0.75"',
                '0.75"'
            ),

            createType(
                "1-inch",
                '1"',
                '1"'
            )

        ],

        units: [
            UNITS.METER,
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "steel-spring-wire",
        hi: "स्टील तार / स्प्रिंग तार",
        en: "Steel Wire / Spring Wire",

        units: [
            UNITS.METER,
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "pop",
        hi: "पीओपी",
        en: "POP",

        units: [
            UNITS.KG,
            UNITS.BAG
        ]
    }),


    createMaterial({
        id: "putty-blade",
        hi: "पुट्टी वाला पत्ता",
        en: "Putty Blade / Patta",

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "fastener",
        hi: "फास्टनर",
        en: "Fastener",

        types: [

            createType(
                "m10",
                "एम 10",
                "M10"
            ),

            createType(
                "m12",
                "एम 12",
                "M12"
            )

        ],

        units: [
            UNITS.PCS,
            UNITS.BOX
        ]
    })

];


/* =========================================================
   STAGE 4
   FINAL ELECTRICAL FITTINGS
========================================================= */

const STAGE_4_MATERIALS = [

    /* ---------- MODULAR PLATE ---------- */

    createMaterial({
        id: "modular-plate",
        hi: "मॉड्यूलर प्लेट",
        en: "Modular Plate",

        types: [

            createType(
                "2-module",
                "2 मॉड्यूल",
                "2 Module"
            ),

            createType(
                "3-module",
                "3 मॉड्यूल",
                "3 Module"
            ),

            createType(
                "4-module",
                "4 मॉड्यूल",
                "4 Module"
            ),

            createType(
                "6-module",
                "6 मॉड्यूल",
                "6 Module"
            ),

            createType(
                "8-module-square",
                "8 मॉड्यूल (चौकोर)",
                "8 Module (Square)"
            ),

            createType(
                "8-module-long",
                "8 मॉड्यूल (लम्बा)",
                "8 Module (Rectangular)"
            ),

            createType(
                "12-module",
                "12 मॉड्यूल",
                "12 Module"
            ),

            createType(
                "16-module",
                "16 मॉड्यूल",
                "16 Module"
            ),

            createType(
                "18-module",
                "18 मॉड्यूल",
                "18 Module"
            )

        ],

        units: [
            UNITS.PCS,
            UNITS.BOX
        ]
    }),


    /* ---------- SWITCH ---------- */

    createMaterial({
        id: "switch",
        hi: "स्विच",
        en: "Switch",

        types: [

            createType(
                "6a",
                "6 एम्पेयर",
                "6 Ampere"
            ),

            createType(
                "16a",
                "16 एम्पेयर",
                "16 Ampere"
            )

        ],

        units: [
            UNITS.PCS,
            UNITS.BOX
        ]
    }),


    /* ---------- SOCKET ---------- */

    createMaterial({
        id: "socket",
        hi: "सॉकेट",
        en: "Socket",

        types: [

            createType(
                "6a",
                "6 एम्पेयर",
                "6 Ampere"
            ),

            createType(
                "16a",
                "16 एम्पेयर",
                "16 Ampere"
            )

        ],

        units: [
            UNITS.PCS,
            UNITS.BOX
        ]
    }),


    /* ---------- MINI MCB ---------- */

    createMaterial({
        id: "mini-mcb",
        hi: "मिनी एमसीबी",
        en: "Mini MCB",

        types: [

            createType("6a", "6 एम्पेयर", "6 Ampere"),
            createType("10a", "10 एम्पेयर", "10 Ampere"),
            createType("16a", "16 एम्पेयर", "16 Ampere"),
            createType("20a", "20 एम्पेयर", "20 Ampere"),
            createType("25a", "25 एम्पेयर", "25 Ampere"),
            createType("32a", "32 एम्पेयर", "32 Ampere")

        ],

        units: [
            UNITS.PCS,
            UNITS.BOX
        ]
    }),


    /* ---------- FAN REGULATOR ---------- */

    createMaterial({
        id: "fan-regulator",
        hi: "फैन रेगुलेटर",
        en: "Fan Regulator",

        types: [

            createType(
                "1-module",
                "1 मॉड्यूल",
                "1 Module"
            ),

            createType(
                "2-module",
                "2 मॉड्यूल",
                "2 Module"
            )

        ],

        units: [
            UNITS.PCS
        ]
    }),


    /* ---------- 2 WAY SWITCH ---------- */

    createMaterial({
        id: "2-way-switch",
        hi: "2वे स्विच",
        en: "2 Way Switch",

        types: [

            createType(
                "6a",
                "6 एम्पेयर",
                "6 Ampere"
            ),

            createType(
                "16a",
                "16 एम्पेयर",
                "16 Ampere"
            )

        ],

        units: [
            UNITS.PCS
        ]
    }),


    /* ---------- BELL PUSH ---------- */

    createMaterial({
        id: "bell-push",
        hi: "बेल पुश (घन्टी स्विच)",
        en: "Bell Push",

        types: [

            createType(
                "1-module",
                "1 मॉड्यूल",
                "1 Module"
            ),

            createType(
                "2-module",
                "2 मॉड्यूल",
                "2 Module"
            )

        ],

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "neon-indicator",
        hi: "निऑन इंडिकेटर",
        en: "Neon Indicator",

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "blank-plate",
        hi: "ब्लेंक प्लेट/डमी स्विच",
        en: "Blank Plate / Dummy Switch",

        units: [
            UNITS.PCS
        ]
    }),


    /* ---------- FAN SHEET ---------- */

    createMaterial({
        id: "fan-sheet",
        hi: "फैन शीट",
        en: "Fan Sheet",

        types: [

            createType(
                "pvc",
                "पीवीसी",
                "PVC"
            ),

            createType(
                "mica",
                "माइका",
                "Mica"
            )

        ],

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "door-bell",
        hi: "डोर बेल (घन्टी)",
        en: "Door Bell",

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "ceiling-rose",
        hi: "सीलिंग रोज",
        en: "Ceiling Rose",

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "led-bulb",
        hi: "एलईडी बल्ब",
        en: "LED Bulb",

        units: [
            UNITS.PCS,
            UNITS.BOX
        ]
    }),


    createMaterial({
        id: "led-tube-light",
        hi: "एलईडी ट्यूब लाइट",
        en: "LED Tube Light",

        units: [
            UNITS.PCS,
            UNITS.BOX
        ]
    }),


    createMaterial({
        id: "foot-light",
        hi: "फुट लाइट",
        en: "Foot Light",

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "up-down-light",
        hi: "अप डाउन लाइट",
        en: "Up Down Light",

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "panel-light",
        hi: "पैनल लाइट",
        en: "Panel Light",

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "surface-light",
        hi: "सरफेस लाइट",
        en: "Surface Light",

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "cob-light",
        hi: "सीओबी लाइट",
        en: "COB Light",

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "cob-spot-light",
        hi: "सीओबी स्पॉट लाइट",
        en: "COB Spot Light",

        units: [
            UNITS.PCS
        ]
    }),


    /* ---------- DOWN LIGHT ---------- */

    createMaterial({
        id: "down-light",
        hi: "डाउन लाइट",
        en: "Down Light",

        types: [

            createType(
                "warm-white",
                "वार्म वाइट",
                "Warm White"
            ),

            createType(
                "cool-white",
                "कूल वाइट",
                "Cool White"
            )

        ],

        units: [
            UNITS.PCS
        ]
    }),


    /* ---------- STRIP LIGHT ---------- */

    createMaterial({
        id: "strip-light",
        hi: "स्ट्रिप लाइट",
        en: "Strip Light",

        types: [

            createType(
                "60-led",
                "60 एलईडी/मीटर",
                "60 LED/Meter"
            ),

            createType(
                "120-led",
                "120 एलईडी/मीटर",
                "120 LED/Meter"
            ),

            createType(
                "240-led",
                "240 एलईडी/मीटर",
                "240 LED/Meter"
            )

        ],

        units: [
            UNITS.METER,
            UNITS.ROLL
        ]
    }),


    createMaterial({
        id: "rope-light",
        hi: "रोप लाइट",
        en: "Rope Light",

        units: [
            UNITS.METER,
            UNITS.ROLL
        ]
    }),


    createMaterial({
        id: "led-profile-channel",
        hi: "एल ई डी प्रोफाइल चैनल",
        en: "LED Profile Channel",

        units: [
            UNITS.PCS
        ]
    }),


    /* ---------- BATTEN HOLDER ---------- */

    createMaterial({
        id: "batten-holder",
        hi: "बैटन होल्डर",
        en: "Batten Holder",

        types: [

            createType(
                "normal",
                "नॉर्मल",
                "Normal"
            ),

            createType(
                "modular",
                "मॉडयूलर",
                "Modular"
            )

        ],

        units: [
            UNITS.PCS
        ]
    }),


    /* ---------- ANGLE HOLDER ---------- */

    createMaterial({
        id: "angle-holder",
        hi: "एंगल होल्डर",
        en: "Angle Holder",

        types: [

            createType(
                "normal",
                "नॉर्मल",
                "Normal"
            ),

            createType(
                "modular",
                "मॉडयूलर",
                "Modular"
            )

        ],

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "instant-glue",
        hi: "इंस्टेंट ग्लू",
        en: "Instant Glue",

        units: [
            UNITS.PCS
        ]
    }),


    /* ---------- SCREW ---------- */

    createMaterial({
        id: "screw",
        hi: "पेंच",
        en: "Screw",

        types: [

            createType("1-inch", '1"', '1"'),
            createType("1-5-inch", '1.5"', '1.5"'),
            createType("2-inch", '2"', '2"'),
            createType("2-5-inch", '2.5"', '2.5"'),
            createType("3-inch", '3"', '3"')

        ],

        units: [
            UNITS.PCS,
            UNITS.BOX
        ]
    }),


    /* ---------- ROUND SHEET ---------- */

    createMaterial({
        id: "round-sheet",
        hi: "राउंड शीट",
        en: "Round Sheet",

        types: [

            createType(
                "pvc",
                "पीवीसी",
                "PVC"
            ),

            createType(
                "mica",
                "माइका",
                "Mica"
            )

        ],

        units: [
            UNITS.PCS
        ]
    }),


    /* ---------- DP SWITCH ---------- */

    createMaterial({
        id: "dp-switch",
        hi: "डीपी स्विच",
        en: "DP Switch",

        types: [

            createType("16a", "16 एम्पेयर", "16 Ampere"),
            createType("20a", "20 एम्पेयर", "20 Ampere"),
            createType("25a", "25 एम्पेयर", "25 Ampere"),
            createType("32a", "32 एम्पेयर", "32 Ampere")

        ],

        units: [
            UNITS.PCS
        ]
    }),


    /* ---------- ELECTRICAL TAPE ---------- */

    createMaterial({
        id: "final-electrical-tape",
        hi: "इलेक्ट्रिकल टेप",
        en: "Electrical Tape",

        types: [

            createType("red", "लाल", "Red"),
            createType("black", "काला", "Black"),
            createType("white", "सफेद", "White"),
            createType("green", "हरा", "Green"),
            createType("blue", "नीला", "Blue"),
            createType("yellow", "पीला", "Yellow")

        ],

        units: [
            UNITS.ROLL,
            UNITS.PCS
        ]
    }),


    /* ---------- SP MCB ---------- */

    createMaterial({
        id: "sp-mcb",
        hi: "एसपी एमसीबी",
        en: "SP MCB",

        types: [

            createType("6a", "6 एम्पेयर", "6 Ampere"),
            createType("10a", "10 एम्पेयर", "10 Ampere"),
            createType("16a", "16 एम्पेयर", "16 Ampere"),
            createType("20a", "20 एम्पेयर", "20 Ampere"),
            createType("25a", "25 एम्पेयर", "25 Ampere"),
            createType("32a", "32 एम्पेयर", "32 Ampere")

        ],

        units: [
            UNITS.PCS,
            UNITS.BOX
        ]
    }),


    /* ---------- DP ISOLATOR ---------- */

    createMaterial({
        id: "dp-isolator",
        hi: "डीपी आइसोलेटर",
        en: "DP Isolator",

        types: [

            createType("40a", "40 एम्पेयर", "40 Ampere"),
            createType("63a", "63 एम्पेयर", "63 Ampere")

        ],

        units: [
            UNITS.PCS
        ]
    }),


    /* ---------- PIN TYPE COPPER LUG ---------- */

    createMaterial({
        id: "pin-type-copper-lug",
        hi: "पिन टाइप कॉपर लग",
        en: "Pin Type Copper Lug",

        types: [

            createType("2-5mm", "2.5 एमएम", "2.5mm"),
            createType("4mm", "4 एमएम", "4mm"),
            createType("6mm", "6 एमएम", "6mm"),
            createType("10mm", "10 एमएम", "10mm")

        ],

        units: [
            UNITS.PCS,
            UNITS.PACKET
        ]
    }),


    /* ---------- MCB CHANGEOVER ---------- */

    createMaterial({
        id: "mcb-changeover",
        hi: "एमसीबी चेंजओवर",
        en: "MCB Changeover",

        types: [

            createType("32a", "32 एम्पेयर", "32 Ampere"),
            createType("40a", "40 एम्पेयर", "40 Ampere"),
            createType("63a", "63 एम्पेयर", "63 Ampere")

        ],

        units: [
            UNITS.PCS
        ]
    }),


    /* ---------- DP MCB ---------- */

    createMaterial({
        id: "dp-mcb",
        hi: "डीपी एमसीबी",
        en: "DP MCB",

        types: [

            createType("16a", "16 एम्पेयर", "16 Ampere"),
            createType("25a", "25 एम्पेयर", "25 Ampere"),
            createType("32a", "32 एम्पेयर", "32 Ampere"),
            createType("40a", "40 एम्पेयर", "40 Ampere"),
            createType("63a", "63 एम्पेयर", "63 Ampere")

        ],

        units: [
            UNITS.PCS,
            UNITS.BOX
        ]
    }),


    /* ---------- TPN MCB ---------- */

    createMaterial({
        id: "tpn-mcb",
        hi: "टीपीएन एमसीबी",
        en: "TPN MCB",

        types: [

            createType("32a", "32 एम्पेयर", "32 Ampere"),
            createType("40a", "40 एम्पेयर", "40 Ampere"),
            createType("63a", "63 एम्पेयर", "63 Ampere")

        ],

        units: [
            UNITS.PCS,
            UNITS.BOX
        ]
    }),


    /* ---------- TPN ISOLATOR ---------- */

    createMaterial({
        id: "tpn-isolator",
        hi: "टीपीएन आइसोलेटर",
        en: "TPN Isolator",

        types: [

            createType("32a", "32 एम्पेयर", "32 Ampere"),
            createType("40a", "40 एम्पेयर", "40 Ampere"),
            createType("63a", "63 एम्पेयर", "63 Ampere")

        ],

        units: [
            UNITS.PCS
        ]
    }),


    /* ---------- RCCB / RCD ---------- */

    createMaterial({
        id: "rccb-rcd",
        hi: "आरसीसीबी / आरसीडी",
        en: "RCCB / RCD",

        types: [

            createType(
                "25a",
                "25 एम्पेयर",
                "25 Ampere"
            ),

            createType(
                "40a",
                "40 एम्पेयर",
                "40 Ampere"
            ),

            createType(
                "63a",
                "63 एम्पेयर",
                "63 Ampere"
            )

        ],

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "final-pop",
        hi: "पीओपी",
        en: "POP",

        units: [
            UNITS.KG,
            UNITS.BAG
        ]
    }),


    createMaterial({
        id: "final-putty-blade",
        hi: "पुट्टी वाला पत्ता",
        en: "Putty Blade / Patta",

        units: [
            UNITS.PCS
        ]
    })

];


/* =========================================================
   FALSE CEILING WIRING MATERIAL
========================================================= */

const FALSE_CEILING_WIRE_SIZES = [

    createSubType(
        "0-75",
        "0.75 स्क्वायर एमएम",
        "0.75 Sqmm",
        MATERIAL_COLORS
    ),

    createSubType(
        "1",
        "1 स्क्वायर एमएम",
        "1 Sqmm",
        MATERIAL_COLORS
    ),

    createSubType(
        "1-5",
        "1.5 स्क्वायर एमएम",
        "1.5 Sqmm",
        MATERIAL_COLORS
    ),

    createSubType(
        "2-5",
        "2.5 स्क्वायर एमएम",
        "2.5 Sqmm",
        MATERIAL_COLORS
    ),

    createSubType(
        "4",
        "4 स्क्वायर एमएम",
        "4 Sqmm",
        MATERIAL_COLORS
    ),

    createSubType(
        "6",
        "6 स्क्वायर एमएम",
        "6 Sqmm",
        MATERIAL_COLORS
    ),

    createSubType(
        "10",
        "10 स्क्वायर एमएम",
        "10 Sqmm",
        MATERIAL_COLORS
    )

];


const FALSE_CEILING_MATERIALS = [

    createMaterial({
        id: "fc-wire",
        hi: "तार",
        en: "Wire",

        types: [

            createType(
                "fr",
                "FR",
                "FR",
                FALSE_CEILING_WIRE_SIZES
            )

        ],

        units: [
            UNITS.METER,
            UNITS.COIL
        ]
    }),


    createMaterial({
        id: "fc-electrical-tape",
        hi: "बिजली वाला टेप",
        en: "Electrical Tape",

        units: [
            UNITS.ROLL,
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "fc-pipe",
        hi: "पाइप",
        en: "Pipe",

        types: [

            createType(
                "heavy",
                "भारी",
                "Heavy"
            ),

            createType(
                "medium",
                "माध्यम",
                "Medium"
            ),

            createType(
                "light",
                "हल्का",
                "Light"
            )

        ],

        units: [
            UNITS.PCS,
            UNITS.BUNDLE
        ]
    }),


    createMaterial({
        id: "fc-long-bend",
        hi: "लॉन्ग बेंड",
        en: "Long Bend",

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "fc-junction-box",
        hi: "जंक्शन बॉक्स 4वे (डिब्बी)",
        en: "Junction Box 4 Way (Dibby)",

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "zip-tie-cable-tie",
        hi: "ज़िप टाई / केबल टाई",
        en: "Zip Tie / Cable Tie",

        types: [

            createType(
                "300mm",
                "300 एमएम",
                "300mm"
            )

        ],

        units: [
            UNITS.PCS,
            UNITS.PACKET
        ]
    }),


    createMaterial({
        id: "fc-flexible-pipe",
        hi: "फ्लेक्सिबल पाइप",
        en: "Flexible Pipe",

        types: [

            createType(
                "0-75",
                '0.75"',
                '0.75"'
            ),

            createType(
                "1",
                '1"',
                '1"'
            )

        ],

        units: [
            UNITS.METER,
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "saddle-clamp",
        hi: "सैडल क्लैंप",
        en: "Saddle Clamp",

        types: [

            createType(
                "25mm",
                "25 एमएम",
                "25mm"
            )

        ],

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "cable-clip",
        hi: "केबल क्लिप",
        en: "Cable Clip",

        types: [

            createType(
                "25mm",
                "25 एमएम",
                "25mm"
            )

        ],

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "fc-screw",
        hi: "पेंच",
        en: "Screw",

        types: [

            createType("1-inch", '1"', '1"'),
            createType("1-5-inch", '1.5"', '1.5"')

        ],

        units: [
            UNITS.PCS,
            UNITS.BOX
        ]
    }),


    createMaterial({
        id: "fc-fastener",
        hi: "फास्टनर",
        en: "Fastener",

        types: [

            createType(
                "m10",
                "एम 10",
                "M10"
            ),

            createType(
                "m12",
                "एम 12",
                "M12"
            )

        ],

        units: [
            UNITS.PCS,
            UNITS.BOX
        ]
    }),


    createMaterial({
        id: "fan-rod",
        hi: "फैन रॉड",
        en: "Fan Rod",

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "fan-clam",
        hi: "फैन क्लैम",
        en: "Fan Clamp",

        units: [
            UNITS.PCS
        ]
    }),


    createMaterial({
        id: "pvc-wall-plug",
        hi: "पीवीसी वॉल प्लग / गुल्ली / गिट्टी",
        en: "PVC Wall Plug",

        units: [
            UNITS.PCS,
            UNITS.PACKET
        ]
    }),


    createMaterial({
        id: "washer",
        hi: "वॉशर",
        en: "Washer",

        units: [
            UNITS.PCS,
            UNITS.PACKET
        ]
    })

];


/* =========================================================
   STAGE CONFIGURATION
========================================================= */

window.MATERIAL_STAGES = [

    {
        id: "stage-1",
        show: true,

        name_hi: "स्लैब कंड्यूट इंस्टॉलेशन",
        name_en: "Slab Conduit Installation",

        materials: STAGE_1_MATERIALS
    },


    {
        id: "stage-2",
        show: true,

        name_hi: "वॉल कंड्यूट इंस्टॉलेशन",
        name_en: "Wall Conduit Installation",

        materials: STAGE_2_MATERIALS
    },


    {
        id: "stage-3",
        show: true,

        name_hi: "वायरिंग इंस्टॉलेशन",
        name_en: "Wiring Installation",

        materials: STAGE_3_MATERIALS
    },


    {
        id: "stage-4",
        show: true,

        name_hi: "फाइनल इलेक्ट्रिकल फिटिंग्स",
        name_en: "Final Electrical Fittings",

        materials: STAGE_4_MATERIALS
    },


    {
        id: "false-ceiling",
        show: true,

        name_hi: "फॉल्स सीलिंग वायरिंग मटेरियल",
        name_en: "False Ceiling Wiring Material",

        materials: FALSE_CEILING_MATERIALS
    }

];


/* =========================================================
   GLOBAL MATERIAL CATALOGUE
========================================================= */

window.MATERIAL_CATALOG = {

    version: "2.0.0",

    language: {

        default: "hi",

        supported: [
            "hi",
            "en"
        ]

    },

    stages: window.MATERIAL_STAGES,

    allMaterials: true,

    search: {

        show: true,

        searchHindi: true,

        searchEnglish: true,

        searchMaterial: true,

        searchType: true,

        searchSubType: true,

        searchBrand: true

    },

    quantity: {

        show: true,

        allowDecimal: true,

        minimum: 0

    },

    unit: {

        show: true,

        required: true,

        allowChange: true

    },

    brand: {

        show: true,

        position: "last",

        allowSkip: true,

        allowNonBrand: true,

        allowCustomBrand: true,

        options: [

            {
                id: "non-brand",
                show: true,

                name_hi: "लोकल / बिना ब्रांड",
                name_en: "Local / Non Brand"
            },

            {
                id: "skip",
                show: true,

                name_hi: "ब्रांड छोड़ें",
                name_en: "Skip Brand"
            }

        ]

    },

    color: {

        show: true,

        headingUsesColorName: true,

        colors: MATERIAL_COLORS

    },

    visibility: {

        stage: true,

        material: true,

        type: true,

        subType: true,

        color: true,

        unit: true,

        brand: true

    },

    finalEstimate: {

        show: true,

        editable: true,

        allowAdd: true,

        allowDelete: true,

        allowEdit: true,

        allowChangeQty: true,

        allowChangeUnit: true,

        allowChangeBrand: true,

        allowChangeRate: true,

        allowChangeAmount: true

    }

};


/* =========================================================
   BACKWARD COMPATIBILITY
========================================================= */

window.MATERIAL_ESTIMATE_CONFIG = {

    catalogue: window.MATERIAL_CATALOG,

    stages: window.MATERIAL_STAGES,

    brands: window.MATERIAL_CATALOG.brand,

    colors: window.MATERIAL_CATALOG.color,

    settings: {

        showSearch: true,

        showAllMaterials: true,

        showBrand: true,

        showColor: true,

        showQty: true,

        showUnit: true,

        showRate: true,

        allowEdit: true,

        allowDelete: true,

        allowAdd: true

    }

};


/* =========================================================
   DEBUG / LOAD CHECK
========================================================= */

console.log(
    "Sandeep ElectroFix Material Catalogue Loaded:",
    window.MATERIAL_CATALOG
);

console.log(
    "Material Stages:",
    window.MATERIAL_STAGES.length
);

console.log(
    "Stage 1 Materials:",
    STAGE_1_MATERIALS.length
);

console.log(
    "Stage 2 Materials:",
    STAGE_2_MATERIALS.length
);

console.log(
    "Stage 3 Materials:",
    STAGE_3_MATERIALS.length
);

console.log(
    "Stage 4 Materials:",
    STAGE_4_MATERIALS.length
);

console.log(
    "False Ceiling Materials:",
    FALSE_CEILING_MATERIALS.length
);

/* =========================================================
   END
========================================================= */
