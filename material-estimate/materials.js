/* =========================================================
   SANDEEP ELECTROFIX
   MATERIAL ESTIMATE SYSTEM
   MASTER MATERIAL DATABASE
   Version 3.0.0

   Structure:
   Stage
      ↓
   Material
      ↓
   Type
      ↓
   Sub Type
      ↓
   Qty
      ↓
   Brand

   Features:
   • Hindi + English
   • Stage 1–5
   • Material Show / Hide
   • Type Show / Hide
   • Sub Type Show / Hide
   • Brand Show / Hide
   • Unit
   • Colour Support
   • Non Brand / Local Brand
   • Brand Skip
========================================================= */


/* =========================================================
   GLOBAL SETTINGS
========================================================= */

window.MATERIAL_ESTIMATE_CONFIG = {

    general: {

        companyName: "SANDEEP ELECTROFIX",

        ownerName: "Sandeep Verma",

        languageDefault: "en",

        currency: "₹",

        defaultUnit: "pcs",

        enableBrand: true,

        enableNonBrand: true,

        enableBrandSkip: true,

        enableType: true,

        enableSubType: true,

        enableSearch: true,

        enableColour: true,

        enableUnits: true,

        enableShowHide: true

    },


    /* =====================================================
       COLOUR MASTER
    ===================================================== */

    colours: [

        {
            id: "red",
            name_hi: "लाल",
            name_en: "Red",
            show: true
        },

        {
            id: "black",
            name_hi: "काला",
            name_en: "Black",
            show: true
        },

        {
            id: "yellow",
            name_hi: "पीला",
            name_en: "Yellow",
            show: true
        },

        {
            id: "blue",
            name_hi: "नीला",
            name_en: "Blue",
            show: true
        },

        {
            id: "green",
            name_hi: "हरा",
            name_en: "Green",
            show: true
        },

        {
            id: "white",
            name_hi: "सफेद",
            name_en: "White",
            show: true
        },

        {
            id: "grey",
            name_hi: "स्लेटी",
            name_en: "Grey",
            show: true
        }

    ],


    /* =====================================================
       BRAND MASTER
       हर material में अपना brand array भी दिया जा सकता है।
    ===================================================== */

    defaultBrands: [

        {
            id: "polycab",
            name_hi: "पॉलीकैब",
            name_en: "Polycab",
            show: true
        },

        {
            id: "havells",
            name_hi: "हैवेल्स",
            name_en: "Havells",
            show: true
        },

        {
            id: "finolex",
            name_hi: "फिनोलेक्स",
            name_en: "Finolex",
            show: true
        },

        {
            id: "rr_kabel",
            name_hi: "आरआर केबल",
            name_en: "RR Kabel",
            show: true
        },

        {
            id: "anchor",
            name_hi: "एंकर",
            name_en: "Anchor",
            show: true
        },

        {
            id: "legrand",
            name_hi: "लेग्रांड",
            name_en: "Legrand",
            show: true
        },

        {
            id: "schneider",
            name_hi: "श्नाइडर",
            name_en: "Schneider",
            show: true
        },

        {
            id: "abb",
            name_hi: "एबीबी",
            name_en: "ABB",
            show: true
        },

        {
            id: "other",
            name_hi: "अन्य ब्रांड",
            name_en: "Other Brand",
            show: true
        },

        {
            id: "local",
            name_hi: "बिना ब्रांड / लोकल",
            name_en: "Non Brand / Local",
            show: true,
            isNonBrand: true
        },

        {
            id: "skip",
            name_hi: "ब्रांड छोड़ें",
            name_en: "Skip Brand",
            show: true,
            isSkip: true
        }

    ],


    /* =====================================================
       STAGES
    ===================================================== */

    stages: [

        /* =================================================
           STAGE 1
        ================================================= */

        {

            id: "stage1",

            name_hi: "स्लैब कंड्यूट इंस्टॉलेशन",

            name_en: "Slab Conduit Installation",

            short_hi: "स्लैब कंड्यूट",

            short_en: "Slab Conduit",

            icon: "🏗️",

            show: true,

            materials: [

                {
                    id: "slab_pipe",
                    name_hi: "पाइप",
                    name_en: "Pipe",
                    icon: "🔌",
                    show: true,

                    types: [

                        {
                            id: "heavy",
                            name_hi: "भारी",
                            name_en: "Heavy",
                            show: true
                        },

                        {
                            id: "medium",
                            name_hi: "माध्यम",
                            name_en: "Medium",
                            show: true
                        },

                        {
                            id: "light",
                            name_hi: "हल्का",
                            name_en: "Light",
                            show: true
                        }

                    ],

                    unit: "pcs/bundle",

                    brands: []

                },


                {
                    id: "slab_long_bend",

                    name_hi: "लॉन्ग बेंड",

                    name_en: "Long Bend",

                    icon: "↪️",

                    show: true,

                    types: [

                        {
                            id: "heavy",
                            name_hi: "भारी",
                            name_en: "Heavy",
                            show: true
                        },

                        {
                            id: "medium",
                            name_hi: "माध्यम",
                            name_en: "Medium",
                            show: true
                        },

                        {
                            id: "light",
                            name_hi: "हल्का",
                            name_en: "Light",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "deep_junction_box",

                    name_hi: "डीप जंक्शन बॉक्स",

                    name_en: "Deep Junction Box",

                    icon: "📦",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "fan_box",

                    name_hi: "फैन बॉक्स",

                    name_en: "Fan Box",

                    icon: "🌀",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "light_box",

                    name_hi: "लाइट बॉक्स",

                    name_en: "Light Box",

                    icon: "💡",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "three_inch_tape",

                    name_hi: "3\" टेप",

                    name_en: "3\" Tape",

                    icon: "🧻",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "solvent_cement",

                    name_hi: "सॉल्वेंट सीमेंट",

                    name_en: "Solvent Cement",

                    icon: "🧴",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "neel_powder",

                    name_hi: "नील पाउडर",

                    name_en: "Neel Powder",

                    icon: "🧪",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "binding_wire",

                    name_hi: "कच्चा तार",

                    name_en: "Binding Wire",

                    icon: "〰️",

                    show: true,

                    unit: "kg",

                    brands: []

                },


                {
                    id: "cable_tie_slab",

                    name_hi: "केबल टाई",

                    name_en: "Cable Tie",

                    icon: "🔗",

                    show: true,

                    unit: "pcs",

                    brands: []

                }

            ]

        },


        /* =================================================
           STAGE 2
        ================================================= */

        {

            id: "stage2",

            name_hi: "वॉल कंड्यूट इंस्टॉलेशन",

            name_en: "Wall Conduit Installation",

            short_hi: "वॉल कंड्यूट",

            short_en: "Wall Conduit",

            icon: "🧱",

            show: true,

            materials: [

                {
                    id: "gi_board",

                    name_hi: "जीआई बोर्ड / मेटल बॉक्स",

                    name_en: "GI Board / Metal Box",

                    icon: "⬜",

                    show: true,

                    types: [

                        {
                            id: "2_module",
                            name_hi: "2 मॉड्यूल",
                            name_en: "2 Module",
                            show: true
                        },

                        {
                            id: "3_module",
                            name_hi: "3 मॉड्यूल",
                            name_en: "3 Module",
                            show: true
                        },

                        {
                            id: "4_module",
                            name_hi: "4 मॉड्यूल",
                            name_en: "4 Module",
                            show: true
                        },

                        {
                            id: "6_module",
                            name_hi: "6 मॉड्यूल",
                            name_en: "6 Module",
                            show: true
                        },

                        {
                            id: "8_square",
                            name_hi: "8 मॉड्यूल (चौकोर)",
                            name_en: "8 Module Square",
                            show: true
                        },

                        {
                            id: "8_rectangular",
                            name_hi: "8 मॉड्यूल (लम्बा)",
                            name_en: "8 Module Rectangular",
                            show: true
                        },

                        {
                            id: "12_module",
                            name_hi: "12 मॉड्यूल",
                            name_en: "12 Module",
                            show: true
                        },

                        {
                            id: "16_module",
                            name_hi: "16 मॉड्यूल",
                            name_en: "16 Module",
                            show: true
                        },

                        {
                            id: "18_module",
                            name_hi: "18 मॉड्यूल",
                            name_en: "18 Module",
                            show: true
                        }

                    ],

                    unit: "pcs/box",

                    brands: []

                },


                {
                    id: "wall_pipe",

                    name_hi: "पाइप",

                    name_en: "Pipe",

                    icon: "🔌",

                    show: true,

                    types: [

                        {
                            id: "heavy",
                            name_hi: "भारी",
                            name_en: "Heavy",
                            show: true
                        },

                        {
                            id: "medium",
                            name_hi: "माध्यम",
                            name_en: "Medium",
                            show: true
                        },

                        {
                            id: "light",
                            name_hi: "हल्का",
                            name_en: "Light",
                            show: true
                        }

                    ],

                    unit: "pcs/bundle",

                    brands: []

                },


                {
                    id: "wall_junction_box",

                    name_hi: "जंक्शन बॉक्स 4वे (डिब्बी)",

                    name_en: "Junction Box 4 Way (Dibby)",

                    icon: "📦",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "wall_long_bend",

                    name_hi: "लॉन्ग बेंड",

                    name_en: "Long Bend",

                    icon: "↪️",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "wall_tape",

                    name_hi: "3\" टेप",

                    name_en: "3\" Tape",

                    icon: "🧻",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "clip_25mm",

                    name_hi: "25 एमएम क्लिप",

                    name_en: "25mm Clip",

                    icon: "🔗",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "mcb_box_double_door",

                    name_hi: "एमसीबी बॉक्स डबल डोर",

                    name_en: "MCB Box Double Door",

                    icon: "⚡",

                    show: true,

                    unit: "pcs",

                    brands: []

                }

            ]

        },


        /* =================================================
           STAGE 3
        ================================================= */

        {

            id: "stage3",

            name_hi: "वायरिंग इंस्टॉलेशन",

            name_en: "Wiring Installation",

            short_hi: "वायरिंग",

            short_en: "Wiring",

            icon: "🧵",

            show: true,

            materials: [

                {
                    id: "wiring_wire",

                    name_hi: "तार",

                    name_en: "Wire",

                    icon: "🧵",

                    show: true,

                    types: [

                        {
                            id: "0_75",
                            name_hi: "0.75 स्क्वायर एमएम",
                            name_en: "0.75 Sqmm",
                            show: true
                        },

                        {
                            id: "1",
                            name_hi: "1 स्क्वायर एमएम",
                            name_en: "1 Sqmm",
                            show: true
                        },

                        {
                            id: "1_5",
                            name_hi: "1.5 स्क्वायर एमएम",
                            name_en: "1.5 Sqmm",
                            show: true
                        },

                        {
                            id: "2_5",
                            name_hi: "2.5 स्क्वायर एमएम",
                            name_en: "2.5 Sqmm",
                            show: true
                        },

                        {
                            id: "4",
                            name_hi: "4 स्क्वायर एमएम",
                            name_en: "4 Sqmm",
                            show: true
                        },

                        {
                            id: "6",
                            name_hi: "6 स्क्वायर एमएम",
                            name_en: "6 Sqmm",
                            show: true
                        },

                        {
                            id: "10",
                            name_hi: "10 स्क्वायर एमएम",
                            name_en: "10 Sqmm",
                            show: true
                        }

                    ],

                    unit: "meter",

                    colourMode: true,

                    colours: "default",

                    brands: []

                },


                {
                    id: "wiring_tape",

                    name_hi: "बिजली वाला टेप",

                    name_en: "Electrical Tape",

                    icon: "🧻",

                    show: true,

                    unit: "pcs",

                    colourMode: false,

                    brands: []

                },


                {
                    id: "flexible_pipe_wiring",

                    name_hi: "फ्लेक्सिबल पाइप",

                    name_en: "Flexible Pipe",

                    icon: "〰️",

                    show: true,

                    types: [

                        {
                            id: "0_75",
                            name_hi: "0.75\"",
                            name_en: "0.75\"",
                            show: true
                        },

                        {
                            id: "1",
                            name_hi: "1\"",
                            name_en: "1\"",
                            show: true
                        }

                    ],

                    unit: "meter",

                    brands: []

                },


                {
                    id: "steel_spring_wire",

                    name_hi: "स्टील तार / स्प्रिंग तार",

                    name_en: "Steel Wire / Spring Wire",

                    icon: "〰️",

                    show: true,

                    unit: "meter",

                    brands: []

                },


                {
                    id: "pop_wiring",

                    name_hi: "पीओपी",

                    name_en: "POP",

                    icon: "🪣",

                    show: true,

                    unit: "kg",

                    brands: []

                },


                {
                    id: "putty_blade_wiring",

                    name_hi: "पुट्टी वाला पत्ता",

                    name_en: "Putty Blade / Patta",

                    icon: "🛠️",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "fastener_wiring",

                    name_hi: "फास्टनर",

                    name_en: "Fastener",

                    icon: "🔩",

                    show: true,

                    types: [

                        {
                            id: "m10",
                            name_hi: "एम 10",
                            name_en: "M10",
                            show: true
                        },

                        {
                            id: "m12",
                            name_hi: "एम 12",
                            name_en: "M12",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                }

            ]

        },


        /* =================================================
           STAGE 4
        ================================================= */

        {

            id: "stage4",

            name_hi: "फाइनल इलेक्ट्रिकल फिटिंग",

            name_en: "Final Electrical Fittings",

            short_hi: "फाइनल फिटिंग",

            short_en: "Final Fittings",

            icon: "💡",

            show: true,

            materials: [

                {
                    id: "modular_sheet",

                    name_hi: "मॉड्यूलर प्लेट",

                    name_en: "Modular Sheet",

                    icon: "⬜",

                    show: true,

                    types: [

                        {
                            id: "2_module",
                            name_hi: "2 मॉड्यूल",
                            name_en: "2 Module",
                            show: true
                        },

                        {
                            id: "3_module",
                            name_hi: "3 मॉड्यूल",
                            name_en: "3 Module",
                            show: true
                        },

                        {
                            id: "4_module",
                            name_hi: "4 मॉड्यूल",
                            name_en: "4 Module",
                            show: true
                        },

                        {
                            id: "6_module",
                            name_hi: "6 मॉड्यूल",
                            name_en: "6 Module",
                            show: true
                        },

                        {
                            id: "8_square",
                            name_hi: "8 मॉड्यूल (चौकोर)",
                            name_en: "8 Module Square",
                            show: true
                        },

                        {
                            id: "8_rectangular",
                            name_hi: "8 मॉड्यूल (लम्बा)",
                            name_en: "8 Module Rectangular",
                            show: true
                        },

                        {
                            id: "12_module",
                            name_hi: "12 मॉड्यूल",
                            name_en: "12 Module",
                            show: true
                        },

                        {
                            id: "16_module",
                            name_hi: "16 मॉड्यूल",
                            name_en: "16 Module",
                            show: true
                        },

                        {
                            id: "18_module",
                            name_hi: "18 मॉड्यूल",
                            name_en: "18 Module",
                            show: true
                        }

                    ],

                    unit: "pcs/box",

                    brands: []

                },


                {
                    id: "switch",

                    name_hi: "स्विच",

                    name_en: "Switch",

                    icon: "🔘",

                    show: true,

                    types: [

                        {
                            id: "6a",
                            name_hi: "6 एम्पेयर",
                            name_en: "6 Ampere",
                            show: true
                        },

                        {
                            id: "16a",
                            name_hi: "16 एम्पेयर",
                            name_en: "16 Ampere",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "socket",

                    name_hi: "सॉकेट",

                    name_en: "Socket",

                    icon: "🔌",

                    show: true,

                    types: [

                        {
                            id: "6a",
                            name_hi: "6 एम्पेयर",
                            name_en: "6 Ampere",
                            show: true
                        },

                        {
                            id: "16a",
                            name_hi: "16 एम्पेयर",
                            name_en: "16 Ampere",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "mini_mcb",

                    name_hi: "मिनी एमसीबी",

                    name_en: "Mini MCB",

                    icon: "⚡",

                    show: true,

                    types: [

                        "6 एम्पेयर",
                        "10 एम्पेयर",
                        "16 एम्पेयर",
                        "20 एम्पेयर",
                        "25 एम्पेयर",
                        "32 एम्पेयर"

                    ].map((name, index) => ({

                        id: "mini_" + index,

                        name_hi: name,

                        name_en: name
                            .replace("एम्पेयर", "Ampere"),

                        show: true

                    })),

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "fan_regulator",

                    name_hi: "फैन रेगुलेटर",

                    name_en: "Fan Regulator",

                    icon: "🌀",

                    show: true,

                    types: [

                        {
                            id: "1m",
                            name_hi: "1 मॉड्यूल",
                            name_en: "1 Module",
                            show: true
                        },

                        {
                            id: "2m",
                            name_hi: "2 मॉड्यूल",
                            name_en: "2 Module",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "two_way_switch",

                    name_hi: "2वे स्विच",

                    name_en: "2 Way Switch",

                    icon: "🔘",

                    show: true,

                    types: [

                        {
                            id: "6a",
                            name_hi: "6 एम्पेयर",
                            name_en: "6 Ampere",
                            show: true
                        },

                        {
                            id: "16a",
                            name_hi: "16 एम्पेयर",
                            name_en: "16 Ampere",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "bell_push",

                    name_hi: "बेल पुश (घंटी स्विच)",

                    name_en: "Bell Push",

                    icon: "🔔",

                    show: true,

                    types: [

                        {
                            id: "1m",
                            name_hi: "1 मॉड्यूल",
                            name_en: "1 Module",
                            show: true
                        },

                        {
                            id: "2m",
                            name_hi: "2 मॉड्यूल",
                            name_en: "2 Module",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "neon_indicator",

                    name_hi: "निऑन इंडिकेटर",

                    name_en: "Neon Indicator",

                    icon: "🔴",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "blank_plate",

                    name_hi: "ब्लेंक प्लेट / डमी स्विच",

                    name_en: "Blank Plate / Dummy Switch",

                    icon: "⬜",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "fan_sheet",

                    name_hi: "फैन शीट",

                    name_en: "Fan Sheet",

                    icon: "🌀",

                    show: true,

                    types: [

                        {
                            id: "pvc",
                            name_hi: "पीवीसी",
                            name_en: "PVC",
                            show: true
                        },

                        {
                            id: "mica",
                            name_hi: "माइका",
                            name_en: "Mica",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "door_bell",

                    name_hi: "डोर बेल (घंटी)",

                    name_en: "Door Bell",

                    icon: "🔔",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "ceiling_rose",

                    name_hi: "सीलिंग रोज",

                    name_en: "Ceiling Rose",

                    icon: "⭕",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "led_bulb",

                    name_hi: "एलईडी बल्ब",

                    name_en: "LED Bulb",

                    icon: "💡",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "led_tube",

                    name_hi: "एलईडी ट्यूब लाइट",

                    name_en: "LED Tube Light",

                    icon: "💡",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "foot_light",

                    name_hi: "फुट लाइट",

                    name_en: "Foot Light",

                    icon: "💡",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "up_down_light",

                    name_hi: "अप डाउन लाइट",

                    name_en: "Up Down Light",

                    icon: "💡",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "panel_light",

                    name_hi: "पैनल लाइट",

                    name_en: "Panel Light",

                    icon: "💡",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "surface_light",

                    name_hi: "सरफेस लाइट",

                    name_en: "Surface Light",

                    icon: "💡",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "cob_light",

                    name_hi: "सीओबी लाइट",

                    name_en: "COB Light",

                    icon: "💡",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "cob_spot_light",

                    name_hi: "सीओबी स्पॉट लाइट",

                    name_en: "COB Spot Light",

                    icon: "🔦",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "down_light",

                    name_hi: "डाउन लाइट",

                    name_en: "Down Light",

                    icon: "💡",

                    show: true,

                    types: [

                        {
                            id: "warm_white",
                            name_hi: "वार्म वाइट",
                            name_en: "Warm White",
                            show: true
                        },

                        {
                            id: "cool_white",
                            name_hi: "कूल वाइट",
                            name_en: "Cool White",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "strip_light",

                    name_hi: "स्ट्रिप लाइट",

                    name_en: "Strip Light",

                    icon: "✨",

                    show: true,

                    types: [

                        {
                            id: "60",
                            name_hi: "60 एलईडी / मीटर",
                            name_en: "60 LEDs / Meter",
                            show: true
                        },

                        {
                            id: "120",
                            name_hi: "120 एलईडी / मीटर",
                            name_en: "120 LEDs / Meter",
                            show: true
                        },

                        {
                            id: "240",
                            name_hi: "240 एलईडी / मीटर",
                            name_en: "240 LEDs / Meter",
                            show: true
                        }

                    ],

                    unit: "meter",

                    brands: []

                },


                {
                    id: "rope_light",

                    name_hi: "रोप लाइट",

                    name_en: "Rope Light",

                    icon: "✨",

                    show: true,

                    unit: "meter",

                    brands: []

                },


                {
                    id: "led_profile",

                    name_hi: "एलईडी प्रोफाइल चैनल",

                    name_en: "LED Profile Channel",

                    icon: "📏",

                    show: true,

                    types: [

                        {
                            id: "10ft",
                            name_hi: "10 फीट",
                            name_en: "10ft",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "led_driver",

                    name_hi: "एलईडी स्ट्रिप ड्राइवर",

                    name_en: "LED Strip Driver",

                    icon: "⚡",

                    show: true,

                    types: [

                        {
                            id: "5a",
                            name_hi: "5 एम्पेयर",
                            name_en: "5 Ampere",
                            show: true
                        },

                        {
                            id: "10a",
                            name_hi: "10 एम्पेयर",
                            name_en: "10 Ampere",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "batten_holder",

                    name_hi: "बैटन होल्डर",

                    name_en: "Batten Holder",

                    icon: "💡",

                    show: true,

                    types: [

                        {
                            id: "normal",
                            name_hi: "नॉर्मल",
                            name_en: "Normal",
                            show: true
                        },

                        {
                            id: "modular",
                            name_hi: "मॉड्यूलर",
                            name_en: "Modular",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "angle_holder",

                    name_hi: "एंगल होल्डर",

                    name_en: "Angle Holder",

                    icon: "💡",

                    show: true,

                    types: [

                        {
                            id: "normal",
                            name_hi: "नॉर्मल",
                            name_en: "Normal",
                            show: true
                        },

                        {
                            id: "modular",
                            name_hi: "मॉड्यूलर",
                            name_en: "Modular",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "instant_glue",

                    name_hi: "इंस्टेंट ग्लू",

                    name_en: "Instant Glue",

                    icon: "🧴",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "screw",

                    name_hi: "पेंच",

                    name_en: "Screw",

                    icon: "🔩",

                    show: true,

                    types: [

                        {
                            id: "1",
                            name_hi: "1\"",
                            name_en: "1\"",
                            show: true
                        },

                        {
                            id: "1_5",
                            name_hi: "1.5\"",
                            name_en: "1.5\"",
                            show: true
                        },

                        {
                            id: "2",
                            name_hi: "2\"",
                            name_en: "2\"",
                            show: true
                        },

                        {
                            id: "2_5",
                            name_hi: "2.5\"",
                            name_en: "2.5\"",
                            show: true
                        },

                        {
                            id: "3",
                            name_hi: "3\"",
                            name_en: "3\"",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "round_sheet",

                    name_hi: "राउंड शीट",

                    name_en: "Round Sheet",

                    icon: "⭕",

                    show: true,

                    types: [

                        {
                            id: "pvc",
                            name_hi: "पीवीसी",
                            name_en: "PVC",
                            show: true
                        },

                        {
                            id: "mica",
                            name_hi: "माइका",
                            name_en: "Mica",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "dp_switch",

                    name_hi: "डीपी स्विच",

                    name_en: "DP Switch",

                    icon: "⚡",

                    show: true,

                    types: [

                        "16 एम्पेयर",
                        "20 एम्पेयर",
                        "25 एम्पेयर",
                        "32 एम्पेयर"

                    ].map((name, index) => ({

                        id: "dp_switch_" + index,

                        name_hi: name,

                        name_en: name.replace(
                            "एम्पेयर",
                            "Ampere"
                        ),

                        show: true

                    })),

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "electrical_tape",

                    name_hi: "इलेक्ट्रिकल टेप",

                    name_en: "Electrical Tape",

                    icon: "🧻",

                    show: true,

                    colourMode: true,

                    colours: [

                        "red",
                        "black",
                        "white",
                        "green",
                        "blue",
                        "yellow"
                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "sp_mcb",

                    name_hi: "एसपी एमसीबी",

                    name_en: "SP MCB",

                    icon: "⚡",

                    show: true,

                    types: [

                        "6 एम्पेयर",
                        "10 एम्पेयर",
                        "16 एम्पेयर",
                        "20 एम्पेयर",
                        "25 एम्पेयर",
                        "32 एम्पेयर",
                        "40 एम्पेयर"

                    ].map((name, index) => ({

                        id: "sp_" + index,

                        name_hi: name,

                        name_en: name.replace(
                            "एम्पेयर",
                            "Ampere"
                        ),

                        show: true

                    })),

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "dp_mcb",

                    name_hi: "डीपी एमसीबी",

                    name_en: "DP MCB",

                    icon: "⚡",

                    show: true,

                    types: [

                        "16 एम्पेयर",
                        "25 एम्पेयर",
                        "32 एम्पेयर",
                        "40 एम्पेयर",
                        "63 एम्पेयर"

                    ].map((name, index) => ({

                        id: "dp_mcb_" + index,

                        name_hi: name,

                        name_en: name.replace(
                            "एम्पेयर",
                            "Ampere"
                        ),

                        show: true

                    })),

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "tpn_mcb",

                    name_hi: "टीपीएन एमसीबी",

                    name_en: "TPN MCB",

                    icon: "⚡",

                    show: true,

                    types: [

                        "32 एम्पेयर",
                        "40 एम्पेयर",
                        "63 एम्पेयर"

                    ].map((name, index) => ({

                        id: "tpn_mcb_" + index,

                        name_hi: name,

                        name_en: name.replace(
                            "एम्पेयर",
                            "Ampere"
                        ),

                        show: true

                    })),

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "mcb_changeover",

                    name_hi: "एमसीबी चेंजओवर",

                    name_en: "MCB Changeover",

                    icon: "🔄",

                    show: true,

                    types: [

                        "32 एम्पेयर",
                        "40 एम्पेयर",
                        "63 एम्पेयर"

                    ].map((name, index) => ({

                        id: "change_" + index,

                        name_hi: name,

                        name_en: name.replace(
                            "एम्पेयर",
                            "Ampere"
                        ),

                        show: true

                    })),

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "dp_isolator",

                    name_hi: "डीपी आइसोलेटर",

                    name_en: "DP Isolator",

                    icon: "⚡",

                    show: true,

                    types: [

                        "40 एम्पेयर",
                        "63 एम्पेयर",
                        "100 एम्पेयर"

                    ].map((name, index) => ({

                        id: "dp_iso_" + index,

                        name_hi: name,

                        name_en: name.replace(
                            "एम्पेयर",
                            "Ampere"
                        ),

                        show: true

                    })),

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "tpn_isolator",

                    name_hi: "टीपीएन आइसोलेटर",

                    name_en: "TPN Isolator",

                    icon: "⚡",

                    show: true,

                    types: [

                        "32 एम्पेयर",
                        "40 एम्पेयर",
                        "63 एम्पेयर"

                    ].map((name, index) => ({

                        id: "tpn_iso_" + index,

                        name_hi: name,

                        name_en: name.replace(
                            "एम्पेयर",
                            "Ampere"
                        ),

                        show: true

                    })),

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "rccb_rcd",

                    name_hi: "आरसीसीबी / आरसीडी",

                    name_en: "RCCB / RCD",

                    icon: "🛡️",

                    show: true,

                    types: [

                        {
                            id: "25a_30ma",
                            name_hi: "25 एम्पेयर / 30mA",
                            name_en: "25 Ampere / 30mA",
                            show: true
                        },

                        {
                            id: "40a_30ma",
                            name_hi: "40 एम्पेयर / 30mA",
                            name_en: "40 Ampere / 30mA",
                            show: true
                        },

                        {
                            id: "63a_30ma",
                            name_hi: "63 एम्पेयर / 30mA",
                            name_en: "63 Ampere / 30mA",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "pin_copper_lug",

                    name_hi: "पिन टाइप कॉपर लग",

                    name_en: "Pin Type Copper Lug",

                    icon: "🔩",

                    show: true,

                    types: [

                        {
                            id: "2_5",
                            name_hi: "2.5 एमएम",
                            name_en: "2.5mm",
                            show: true
                        },

                        {
                            id: "4",
                            name_hi: "4 एमएम",
                            name_en: "4mm",
                            show: true
                        },

                        {
                            id: "6",
                            name_hi: "6 एमएम",
                            name_en: "6mm",
                            show: true
                        },

                        {
                            id: "10",
                            name_hi: "10 एमएम",
                            name_en: "10mm",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "pop_final",

                    name_hi: "पीओपी",

                    name_en: "POP",

                    icon: "🪣",

                    show: true,

                    unit: "kg",

                    brands: []

                },


                {
                    id: "putty_blade_final",

                    name_hi: "पुट्टी वाला पत्ता",

                    name_en: "Putty Blade / Patta",

                    icon: "🛠️",

                    show: true,

                    unit: "pcs",

                    brands: []

                }

            ]

        },


        /* =================================================
           STAGE 5
           FALSE CEILING WIRING
        ================================================= */

        {

            id: "stage5",

            name_hi: "फॉल्स सीलिंग वायरिंग",

            name_en: "False Ceiling Wiring",

            short_hi: "फॉल्स सीलिंग",

            short_en: "False Ceiling",

            icon: "🏠",

            show: true,

            materials: [

                {
                    id: "fc_wire",

                    name_hi: "तार",

                    name_en: "Wire",

                    icon: "🧵",

                    show: true,

                    types: [

                        {
                            id: "0_75",
                            name_hi: "0.75 स्क्वायर एमएम",
                            name_en: "0.75 Sqmm",
                            show: true
                        },

                        {
                            id: "1",
                            name_hi: "1 स्क्वायर एमएम",
                            name_en: "1 Sqmm",
                            show: true
                        },

                        {
                            id: "1_5",
                            name_hi: "1.5 स्क्वायर एमएम",
                            name_en: "1.5 Sqmm",
                            show: true
                        },

                        {
                            id: "2_5",
                            name_hi: "2.5 स्क्वायर एमएम",
                            name_en: "2.5 Sqmm",
                            show: true
                        },

                        {
                            id: "4",
                            name_hi: "4 स्क्वायर एमएम",
                            name_en: "4 Sqmm",
                            show: true
                        },

                        {
                            id: "6",
                            name_hi: "6 स्क्वायर एमएम",
                            name_en: "6 Sqmm",
                            show: true
                        },

                        {
                            id: "10",
                            name_hi: "10 स्क्वायर एमएम",
                            name_en: "10 Sqmm",
                            show: true
                        }

                    ],

                    unit: "meter",

                    colourMode: true,

                    colours: "default",

                    brands: []

                },


                {
                    id: "fc_tape",

                    name_hi: "बिजली वाला टेप",

                    name_en: "Electrical Tape",

                    icon: "🧻",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "fc_pipe",

                    name_hi: "पाइप",

                    name_en: "Pipe",

                    icon: "🔌",

                    show: true,

                    types: [

                        {
                            id: "heavy",
                            name_hi: "भारी",
                            name_en: "Heavy",
                            show: true
                        },

                        {
                            id: "medium",
                            name_hi: "माध्यम",
                            name_en: "Medium",
                            show: true
                        },

                        {
                            id: "light",
                            name_hi: "हल्का",
                            name_en: "Light",
                            show: true
                        }

                    ],

                    unit: "pcs/bundle",

                    brands: []

                },


                {
                    id: "fc_long_bend",

                    name_hi: "लॉन्ग बेंड",

                    name_en: "Long Bend",

                    icon: "↪️",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "fc_junction_box",

                    name_hi: "जंक्शन बॉक्स 4वे (डिब्बी)",

                    name_en: "Junction Box 4 Way (Dibby)",

                    icon: "📦",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "zip_tie",

                    name_hi: "ज़िप टाई / केबल टाई",

                    name_en: "Zip Tie / Cable Tie",

                    icon: "🔗",

                    show: true,

                    types: [

                        {
                            id: "300mm",
                            name_hi: "300 एमएम",
                            name_en: "300mm",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "fc_flexible_pipe",

                    name_hi: "फ्लेक्सिबल पाइप",

                    name_en: "Flexible Pipe",

                    icon: "〰️",

                    show: true,

                    types: [

                        {
                            id: "0_75",
                            name_hi: "0.75\"",
                            name_en: "0.75\"",
                            show: true
                        },

                        {
                            id: "1",
                            name_hi: "1\"",
                            name_en: "1\"",
                            show: true
                        }

                    ],

                    unit: "meter",

                    brands: []

                },


                {
                    id: "saddle_clamp",

                    name_hi: "सैडल क्लैंप",

                    name_en: "Saddle Clamp",

                    icon: "🔗",

                    show: true,

                    types: [

                        {
                            id: "25mm",
                            name_hi: "25 एमएम",
                            name_en: "25mm",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "cable_clip",

                    name_hi: "केबल क्लिप",

                    name_en: "Cable Clip",

                    icon: "🔗",

                    show: true,

                    types: [

                        {
                            id: "25mm",
                            name_hi: "25 एमएम",
                            name_en: "25mm",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "fc_screw",

                    name_hi: "पेंच",

                    name_en: "Screw",

                    icon: "🔩",

                    show: true,

                    types: [

                        {
                            id: "1",
                            name_hi: "1\"",
                            name_en: "1\"",
                            show: true
                        },

                        {
                            id: "1_5",
                            name_hi: "1.5\"",
                            name_en: "1.5\"",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "fc_fastener",

                    name_hi: "फास्टनर",

                    name_en: "Fastener",

                    icon: "🔩",

                    show: true,

                    types: [

                        {
                            id: "m10",
                            name_hi: "एम 10",
                            name_en: "M10",
                            show: true
                        },

                        {
                            id: "m12",
                            name_hi: "एम 12",
                            name_en: "M12",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "fan_rod",

                    name_hi: "फैन रॉड",

                    name_en: "Fan Rod",

                    icon: "🌀",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "fan_clamp",

                    name_hi: "फैन क्लैंप",

                    name_en: "Fan Clamp",

                    icon: "🌀",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "pvc_wall_plug",

                    name_hi: "पीवीसी वॉल प्लग / गुल्ली / गिट्टी",

                    name_en: "PVC Wall Plug / Gulli / Gitti",

                    icon: "🔩",

                    show: true,

                    unit: "pcs",

                    brands: []

                },


                {
                    id: "washer",

                    name_hi: "वॉशर",

                    name_en: "Washer",

                    icon: "⭕",

                    show: true,

                    unit: "pcs",

                    brands: []

                }

            ]

        }

    ]

};


/* =========================================================
   HELPER FUNCTIONS
========================================================= */


/*
   सभी stages को एक जगह से access करने के लिए
*/

window.MATERIAL_ESTIMATE_CONFIG.getStages = function () {

    return this.stages.filter(stage => stage.show !== false);

};


/*
   सभी materials निकालने के लिए
*/

window.MATERIAL_ESTIMATE_CONFIG.getAllMaterials = function () {

    const result = [];

    this.stages.forEach(stage => {

        if (stage.show === false) return;

        (stage.materials || []).forEach(material => {

            if (material.show === false) return;

            result.push({

                ...material,

                stageId: stage.id,

                stageNameHi: stage.name_hi,

                stageNameEn: stage.name_en

            });

        });

    });

    return result;

};


/*
   ID से material खोजें
*/

window.MATERIAL_ESTIMATE_CONFIG.findMaterial = function (materialId) {

    for (const stage of this.stages) {

        const material = (stage.materials || []).find(
            item => item.id === materialId
        );

        if (material) {

            return {

                material,

                stage

            };

        }

    }

    return null;

};


/*
   किसी material के brand प्राप्त करें

   अगर material में अलग brand नहीं दिया है
   तो default brand list इस्तेमाल होगी।
*/

window.MATERIAL_ESTIMATE_CONFIG.getBrands = function (material) {

    if (
        material &&
        Array.isArray(material.brands) &&
        material.brands.length
    ) {

        return material.brands.filter(
            brand => brand.show !== false
        );

    }

    return this.defaultBrands.filter(
        brand => brand.show !== false
    );

};


/*
   Colour list
*/

window.MATERIAL_ESTIMATE_CONFIG.getColours = function (material) {

    if (!material || !material.colourMode) {

        return [];

    }

    if (
        Array.isArray(material.colours) &&
        material.colours.length
    ) {

        return material.colours
            .map(id => this.colours.find(
                colour => colour.id === id
            ))
            .filter(Boolean)
            .filter(colour => colour.show !== false);

    }

    return this.colours.filter(
        colour => colour.show !== false
    );

};


/*
   Type check
*/

window.MATERIAL_ESTIMATE_CONFIG.hasTypes = function (material) {

    return Boolean(
        material &&
        Array.isArray(material.types) &&
        material.types.length
    );

};


/*
   Sub Type check

   आगे भविष्य में किसी material के अंदर:
   type.subTypes = [...]
   डाल सकते हैं।
*/

window.MATERIAL_ESTIMATE_CONFIG.hasSubTypes = function (type) {

    return Boolean(
        type &&
        Array.isArray(type.subTypes) &&
        type.subTypes.length
    );

};


/*
   Language helper
*/

window.MATERIAL_ESTIMATE_CONFIG.getName = function (
    item,
    language = "hi"
) {

    if (!item) return "";

    if (language === "en") {

        return item.name_en ||
               item.name_hi ||
               "";

    }

    return item.name_hi ||
           item.name_en ||
           "";

};


/* =========================================================
   READY MESSAGE
========================================================= */

console.log(
    "SANDEEP ELECTROFIX Material Database Loaded",
    window.MATERIAL_ESTIMATE_CONFIG
);
