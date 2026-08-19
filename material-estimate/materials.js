/* =========================================================
   SANDEEP ELECTROFIX
   MATERIAL ESTIMATE SYSTEM
   MATERIAL CATALOGUE DATABASE
   Version 1.0.0
   Hindi + English
========================================================= */

"use strict";

/* =========================================================
   GLOBAL MATERIAL CONFIG
========================================================= */

window.MATERIAL_CATALOGUE = {

    /* =====================================================
       GENERAL
    ===================================================== */

    version: "1.0.0",

    companyName: "Sandeep ElectroFix",

    defaultLanguage: "hi",

    /* =====================================================
       DEFAULT OPTIONS
    ===================================================== */

    settings: {

        showBrand: true,

        brandOptional: true,

        allowNonBrand: true,

        allowSkipBrand: true,

        showUnit: true,

        showSearch: true,

        showStageMenu: true,

        showAllMaterials: true,

        allowCustomMaterial: true,

        allowEditEstimate: true,

        allowDeleteEstimate: true,

        allowAddEstimate: true

    },


    /* =====================================================
       BRAND OPTIONS
       Brand हमेशा सबसे आखिरी level पर रहेगा
    ===================================================== */

    defaultBrands: [

        {
            id: "polycab",
            name_hi: "पॉलीकैब",
            name_en: "Polycab",
            show: true
        },

        {
            id: "finolex",
            name_hi: "फिनोलेक्स",
            name_en: "Finolex",
            show: true
        },

        {
            id: "havells",
            name_hi: "हैवेल्स",
            name_en: "Havells",
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
            name_hi: "लेग्रैंड",
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
            id: "finolex_cables",
            name_hi: "फिनोलेक्स केबल्स",
            name_en: "Finolex Cables",
            show: true
        },

        {
            id: "rr_kabel",
            name_hi: "आरआर केबल",
            name_en: "RR Kabel",
            show: true
        },

        {
            id: "kei",
            name_hi: "केईआई",
            name_en: "KEI",
            show: true
        },

        {
            id: "wipro",
            name_hi: "विप्रो",
            name_en: "Wipro",
            show: true
        },

        {
            id: "syska",
            name_hi: "सिस्का",
            name_en: "Syska",
            show: true
        },

        {
            id: "bajaj",
            name_hi: "बजाज",
            name_en: "Bajaj",
            show: true
        },

        {
            id: "orient",
            name_hi: "ओरिएंट",
            name_en: "Orient",
            show: true
        },

        {
            id: "usha",
            name_hi: "उषा",
            name_en: "Usha",
            show: true
        },

        {
            id: "crompton",
            name_hi: "क्रॉम्पटन",
            name_en: "Crompton",
            show: true
        },

        {
            id: "havells",
            name_hi: "हैवेल्स",
            name_en: "Havells",
            show: true
        },

        {
            id: "local",
            name_hi: "नॉन-ब्रांड / लोकल",
            name_en: "Non-Brand / Local",
            show: true,
            special: true
        },

        {
            id: "other",
            name_hi: "अन्य ब्रांड",
            name_en: "Other Brand",
            show: true,
            special: true
        },

        {
            id: "skip",
            name_hi: "ब्रांड छोड़ें",
            name_en: "Skip Brand",
            show: true,
            special: true
        }

    ],


    /* =====================================================
       COLOR OPTIONS
    ===================================================== */

    colors: [

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
       STAGES
    ===================================================== */

    stages: [

        /* =================================================
           STAGE 1
        ================================================= */

        {
            id: "stage_1",

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

                    types: [

                        {
                            id: "heavy",
                            name_hi: "भारी",
                            name_en: "Heavy",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },

                {
                    id: "slab_long_bend",
                    name_hi: "लॉन्ग बेंड",
                    name_en: "Long Bend",

                    types: [

                        {
                            id: "heavy",
                            name_hi: "भारी",
                            name_en: "Heavy",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },

                {
                    id: "deep_junction_box",
                    name_hi: "डीप जंक्शन बॉक्स",
                    name_en: "Deep Junction Box",

                    unit: "pcs",

                    show: true
                },

                {
                    id: "fan_box",
                    name_hi: "फैन बॉक्स",
                    name_en: "Fan Box",

                    unit: "pcs",

                    show: true
                },

                {
                    id: "light_box",
                    name_hi: "लाइट बॉक्स",
                    name_en: "Light Box",

                    unit: "pcs",

                    show: true
                },

                {
                    id: "slab_tape",
                    name_hi: "3\" टेप",
                    name_en: "3\" Tape",

                    unit: "pcs",

                    show: true
                },

                {
                    id: "solvent_cement",
                    name_hi: "सॉल्वेंट सीमेंट",
                    name_en: "Solvent Cement",

                    unit: "pcs",

                    show: true
                },

                {
                    id: "neel_powder",
                    name_hi: "नील पाउडर",
                    name_en: "Neel Powder",

                    unit: "pcs",

                    show: true
                },

                {
                    id: "binding_wire",
                    name_hi: "कच्चा तार",
                    name_en: "Binding Wire",

                    unit: "kg",

                    show: true
                },

                {
                    id: "slab_cable_tie",
                    name_hi: "केबल टाई",
                    name_en: "Cable Tie",

                    unit: "pcs",

                    show: true
                }

            ]
        },


        /* =================================================
           STAGE 2
        ================================================= */

        {
            id: "stage_2",

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
                            id: "8_module_square",
                            name_hi: "8 मॉड्यूल (चौकोर)",
                            name_en: "8 Module Square",
                            show: true
                        },

                        {
                            id: "8_module_rectangular",
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

                    unit: "pcs",

                    show: true
                },


                {
                    id: "wall_pipe",

                    name_hi: "पाइप",

                    name_en: "Pipe",

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

                    alternateUnits: [
                        "bundle"
                    ],

                    show: true
                },


                {
                    id: "wall_junction_box",

                    name_hi: "जंक्शन बॉक्स 4वे (डिब्बी)",

                    name_en: "Junction Box 4 Way (Dibby)",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "wall_long_bend",

                    name_hi: "लॉन्ग बेंड",

                    name_en: "Long Bend",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "wall_tape",

                    name_hi: "3\" टेप",

                    name_en: "3\" Tape",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "clip_25mm",

                    name_hi: "25 एमएम क्लिप",

                    name_en: "25mm Clip",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "mcb_box_double_door",

                    name_hi: "एमसीबी बॉक्स डबल डोर",

                    name_en: "MCB Box Double Door",

                    unit: "pcs",

                    show: true
                }

            ]
        },


        /* =================================================
           STAGE 3
        ================================================= */

        {
            id: "stage_3",

            name_hi: "वायरिंग इंस्टॉलेशन",

            name_en: "Wiring Installation",

            short_hi: "वायरिंग",

            short_en: "Wiring",

            icon: "⚡",

            show: true,

            materials: [

                {
                    id: "wiring_wire",

                    name_hi: "तार",

                    name_en: "Wire",

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

                    colors: true,

                    unit: "meter",

                    alternateUnits: [
                        "coil"
                    ],

                    show: true
                },


                {
                    id: "wiring_tape",

                    name_hi: "बिजली वाला टेप",

                    name_en: "Electrical Tape",

                    colors: true,

                    unit: "pcs",

                    show: true
                },


                {
                    id: "flexible_pipe",

                    name_hi: "फ्लेक्सिबल पाइप",

                    name_en: "Flexible Pipe",

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

                    alternateUnits: [
                        "bundle"
                    ],

                    show: true
                },


                {
                    id: "steel_spring_wire",

                    name_hi: "स्टील तार / स्प्रिंग तार",

                    name_en: "Steel Wire / Spring Wire",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "pop",

                    name_hi: "पीओपी",

                    name_en: "POP",

                    unit: "kg",

                    show: true
                },


                {
                    id: "putty_blade",

                    name_hi: "पुट्टी वाला पत्ता",

                    name_en: "Putty Blade / Patta",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "fastener",

                    name_hi: "फास्टनर",

                    name_en: "Fastener",

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

                    show: true
                }

            ]
        },


        /* =================================================
           STAGE 4
        ================================================= */

        {
            id: "stage_4",

            name_hi: "फाइनल इलेक्ट्रिकल फिटिंग",

            name_en: "Final Electrical Fittings",

            short_hi: "फाइनल फिटिंग",

            short_en: "Final Fittings",

            icon: "💡",

            show: true,

            materials: [

                /* MODULE PLATE */

                {
                    id: "modular_plate",

                    name_hi: "मॉड्यूलर प्लेट",

                    name_en: "Modular Plate",

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

                    unit: "pcs",

                    alternateUnits: [
                        "box"
                    ],

                    show: true
                },


                /* SWITCH */

                {
                    id: "switch",

                    name_hi: "स्विच",

                    name_en: "Switch",

                    types: [

                        {
                            id: "6a",
                            name_hi: "6 एम्पेयर",
                            name_en: "6A",
                            show: true
                        },

                        {
                            id: "16a",
                            name_hi: "16 एम्पेयर",
                            name_en: "16A",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                /* SOCKET */

                {
                    id: "socket",

                    name_hi: "सॉकेट",

                    name_en: "Socket",

                    types: [

                        {
                            id: "6a",
                            name_hi: "6 एम्पेयर",
                            name_en: "6A",
                            show: true
                        },

                        {
                            id: "16a",
                            name_hi: "16 एम्पेयर",
                            name_en: "16A",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                /* MINI MCB */

                {
                    id: "mini_mcb",

                    name_hi: "मिनी एमसीबी",

                    name_en: "Mini MCB",

                    types: [

                        {
                            id: "6a",
                            name_hi: "6 एम्पेयर",
                            name_en: "6A",
                            show: true
                        },

                        {
                            id: "10a",
                            name_hi: "10 एम्पेयर",
                            name_en: "10A",
                            show: true
                        },

                        {
                            id: "16a",
                            name_hi: "16 एम्पेयर",
                            name_en: "16A",
                            show: true
                        },

                        {
                            id: "20a",
                            name_hi: "20 एम्पेयर",
                            name_en: "20A",
                            show: true
                        },

                        {
                            id: "25a",
                            name_hi: "25 एम्पेयर",
                            name_en: "25A",
                            show: true
                        },

                        {
                            id: "32a",
                            name_hi: "32 एम्पेयर",
                            name_en: "32A",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                /* FAN REGULATOR */

                {
                    id: "fan_regulator",

                    name_hi: "फैन रेगुलेटर",

                    name_en: "Fan Regulator",

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

                    show: true
                },


                /* 2 WAY SWITCH */

                {
                    id: "two_way_switch",

                    name_hi: "2वे स्विच",

                    name_en: "2 Way Switch",

                    types: [

                        {
                            id: "6a",
                            name_hi: "6 एम्पेयर",
                            name_en: "6A",
                            show: true
                        },

                        {
                            id: "16a",
                            name_hi: "16 एम्पेयर",
                            name_en: "16A",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                /* BELL PUSH */

                {
                    id: "bell_push",

                    name_hi: "बेल पुश (घंटी स्विच)",

                    name_en: "Bell Push",

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

                    show: true
                },


                {
                    id: "neon_indicator",

                    name_hi: "निऑन इंडिकेटर",

                    name_en: "Neon Indicator",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "blank_plate",

                    name_hi: "ब्लेंक प्लेट / डमी स्विच",

                    name_en: "Blank Plate / Dummy Switch",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "fan_sheet",

                    name_hi: "फैन शीट",

                    name_en: "Fan Sheet",

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

                    show: true
                },


                {
                    id: "door_bell",

                    name_hi: "डोर बेल (घंटी)",

                    name_en: "Door Bell",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "ceiling_rose",

                    name_hi: "सीलिंग रोज",

                    name_en: "Ceiling Rose",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "led_bulb",

                    name_hi: "एलईडी बल्ब",

                    name_en: "LED Bulb",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "led_tube",

                    name_hi: "एलईडी ट्यूब लाइट",

                    name_en: "LED Tube Light",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "foot_light",

                    name_hi: "फुट लाइट",

                    name_en: "Foot Light",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "up_down_light",

                    name_hi: "अप डाउन लाइट",

                    name_en: "Up Down Light",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "panel_light",

                    name_hi: "पैनल लाइट",

                    name_en: "Panel Light",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "surface_light",

                    name_hi: "सरफेस लाइट",

                    name_en: "Surface Light",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "cob_light",

                    name_hi: "सीओबी लाइट",

                    name_en: "COB Light",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "cob_spot_light",

                    name_hi: "सीओबी स्पॉट लाइट",

                    name_en: "COB Spot Light",

                    unit: "pcs",

                    show: true
                },


                /* DOWN LIGHT */

                {
                    id: "down_light",

                    name_hi: "डाउन लाइट",

                    name_en: "Down Light",

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

                    show: true
                },


                /* STRIP LIGHT */

                {
                    id: "strip_light",

                    name_hi: "स्ट्रिप लाइट",

                    name_en: "Strip Light",

                    types: [

                        {
                            id: "60_led",
                            name_hi: "60 एलईडी / मीटर",
                            name_en: "60 LEDs / Meter",
                            show: true
                        },

                        {
                            id: "120_led",
                            name_hi: "120 एलईडी / मीटर",
                            name_en: "120 LEDs / Meter",
                            show: true
                        },

                        {
                            id: "240_led",
                            name_hi: "240 एलईडी / मीटर",
                            name_en: "240 LEDs / Meter",
                            show: true
                        }

                    ],

                    unit: "meter",

                    show: true
                },


                {
                    id: "rope_light",

                    name_hi: "रोप लाइट",

                    name_en: "Rope Light",

                    unit: "meter",

                    show: true
                },


                {
                    id: "led_profile_channel",

                    name_hi: "एल ई डी प्रोफाइल चैनल",

                    name_en: "LED Profile Channel",

                    types: [

                        {
                            id: "10ft",
                            name_hi: "10 फीट",
                            name_en: "10ft",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                {
                    id: "led_strip_driver",

                    name_hi: "एलईडी स्ट्रिप ड्राइवर",

                    name_en: "LED Strip Driver",

                    types: [

                        {
                            id: "5a",
                            name_hi: "5 एम्पेयर",
                            name_en: "5A",
                            show: true
                        },

                        {
                            id: "10a",
                            name_hi: "10 एम्पेयर",
                            name_en: "10A",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                /* HOLDER */

                {
                    id: "batten_holder",

                    name_hi: "बैटन होल्डर",

                    name_en: "Batten Holder",

                    types: [

                        {
                            id: "normal",
                            name_hi: "नॉर्मल",
                            name_en: "Normal",
                            show: true
                        },

                        {
                            id: "modular",
                            name_hi: "मॉडयूलर",
                            name_en: "Modular",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                {
                    id: "angle_holder",

                    name_hi: "एंगल होल्डर",

                    name_en: "Angle Holder",

                    types: [

                        {
                            id: "normal",
                            name_hi: "नॉर्मल",
                            name_en: "Normal",
                            show: true
                        },

                        {
                            id: "modular",
                            name_hi: "मॉडयूलर",
                            name_en: "Modular",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                {
                    id: "instant_glue",

                    name_hi: "इंस्टेंट ग्लू",

                    name_en: "Instant Glue",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "screw",

                    name_hi: "पेंच",

                    name_en: "Screw",

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

                    alternateUnits: [
                        "box"
                    ],

                    show: true
                },


                {
                    id: "round_sheet",

                    name_hi: "राउंड शीट",

                    name_en: "Round Sheet",

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

                    show: true
                },


                /* DP SWITCH */

                {
                    id: "dp_switch",

                    name_hi: "डीपी स्विच",

                    name_en: "DP Switch",

                    types: [

                        {
                            id: "16a",
                            name_hi: "16 एम्पेयर",
                            name_en: "16A",
                            show: true
                        },

                        {
                            id: "20a",
                            name_hi: "20 एम्पेयर",
                            name_en: "20A",
                            show: true
                        },

                        {
                            id: "25a",
                            name_hi: "25 एम्पेयर",
                            name_en: "25A",
                            show: true
                        },

                        {
                            id: "32a",
                            name_hi: "32 एम्पेयर",
                            name_en: "32A",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                /* ELECTRICAL TAPE */

                {
                    id: "final_electrical_tape",

                    name_hi: "इलेक्ट्रिकल टेप",

                    name_en: "Electrical Tape",

                    colors: true,

                    unit: "pcs",

                    show: true
                },


                /* SP MCB */

                {
                    id: "sp_mcb",

                    name_hi: "एसपी एमसीबी",

                    name_en: "SP MCB",

                    types: [

                        {
                            id: "6a",
                            name_hi: "6 एम्पेयर",
                            name_en: "6A",
                            show: true
                        },

                        {
                            id: "10a",
                            name_hi: "10 एम्पेयर",
                            name_en: "10A",
                            show: true
                        },

                        {
                            id: "16a",
                            name_hi: "16 एम्पेयर",
                            name_en: "16A",
                            show: true
                        },

                        {
                            id: "20a",
                            name_hi: "20 एम्पेयर",
                            name_en: "20A",
                            show: true
                        },

                        {
                            id: "25a",
                            name_hi: "25 एम्पेयर",
                            name_en: "25A",
                            show: true
                        },

                        {
                            id: "32a",
                            name_hi: "32 एम्पेयर",
                            name_en: "32A",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                /* DP ISOLATOR */

                {
                    id: "dp_isolator",

                    name_hi: "डीपी आइसोलेटर",

                    name_en: "DP Isolator",

                    types: [

                        {
                            id: "40a",
                            name_hi: "40 एम्पेयर",
                            name_en: "40A",
                            show: true
                        },

                        {
                            id: "63a",
                            name_hi: "63 एम्पेयर",
                            name_en: "63A",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                /* PIN TYPE COPPER LUG */

                {
                    id: "copper_lug",

                    name_hi: "पिन टाइप कॉपर लग",

                    name_en: "Pin Type Copper Lug",

                    types: [

                        {
                            id: "2_5mm",
                            name_hi: "2.5 एमएम",
                            name_en: "2.5mm",
                            show: true
                        },

                        {
                            id: "4mm",
                            name_hi: "4 एमएम",
                            name_en: "4mm",
                            show: true
                        },

                        {
                            id: "6mm",
                            name_hi: "6 एमएम",
                            name_en: "6mm",
                            show: true
                        },

                        {
                            id: "10mm",
                            name_hi: "10 एमएम",
                            name_en: "10mm",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                /* MCB CHANGEOVER */

                {
                    id: "mcb_changeover",

                    name_hi: "एमसीबी चेंजओवर",

                    name_en: "MCB Changeover",

                    types: [

                        {
                            id: "32a",
                            name_hi: "32 एम्पेयर",
                            name_en: "32A",
                            show: true
                        },

                        {
                            id: "40a",
                            name_hi: "40 एम्पेयर",
                            name_en: "40A",
                            show: true
                        },

                        {
                            id: "63a",
                            name_hi: "63 एम्पेयर",
                            name_en: "63A",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                /* DP MCB */

                {
                    id: "dp_mcb",

                    name_hi: "डीपी एमसीबी",

                    name_en: "DP MCB",

                    types: [

                        {
                            id: "16a",
                            name_hi: "16 एम्पेयर",
                            name_en: "16A",
                            show: true
                        },

                        {
                            id: "25a",
                            name_hi: "25 एम्पेयर",
                            name_en: "25A",
                            show: true
                        },

                        {
                            id: "32a",
                            name_hi: "32 एम्पेयर",
                            name_en: "32A",
                            show: true
                        },

                        {
                            id: "40a",
                            name_hi: "40 एम्पेयर",
                            name_en: "40A",
                            show: true
                        },

                        {
                            id: "63a",
                            name_hi: "63 एम्पेयर",
                            name_en: "63A",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                /* TPN MCB */

                {
                    id: "tpn_mcb",

                    name_hi: "टीपीएन एमसीबी",

                    name_en: "TPN MCB",

                    types: [

                        {
                            id: "32a",
                            name_hi: "32 एम्पेयर",
                            name_en: "32A",
                            show: true
                        },

                        {
                            id: "40a",
                            name_hi: "40 एम्पेयर",
                            name_en: "40A",
                            show: true
                        },

                        {
                            id: "63a",
                            name_hi: "63 एम्पेयर",
                            name_en: "63A",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                /* TPN ISOLATOR */

                {
                    id: "tpn_isolator",

                    name_hi: "टीपीएन आइसोलेटर",

                    name_en: "TPN Isolator",

                    types: [

                        {
                            id: "32a",
                            name_hi: "32 एम्पेयर",
                            name_en: "32A",
                            show: true
                        },

                        {
                            id: "40a",
                            name_hi: "40 एम्पेयर",
                            name_en: "40A",
                            show: true
                        },

                        {
                            id: "63a",
                            name_hi: "63 एम्पेयर",
                            name_en: "63A",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                /* RCCB / RCD */

                {
                    id: "rccb_rcd",

                    name_hi: "आरसीसीबी / आरसीडी",

                    name_en: "RCCB / RCD",

                    types: [

                        {
                            id: "25a",
                            name_hi: "25 एम्पेयर",
                            name_en: "25A",
                            show: true
                        },

                        {
                            id: "40a",
                            name_hi: "40 एम्पेयर",
                            name_en: "40A",
                            show: true
                        },

                        {
                            id: "63a",
                            name_hi: "63 एम्पेयर",
                            name_en: "63A",
                            show: true
                        }

                    ],

                    subTypes: [

                        {
                            id: "30ma",
                            name_hi: "30 एमए",
                            name_en: "30mA",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                {
                    id: "final_pop",

                    name_hi: "पीओपी",

                    name_en: "POP",

                    unit: "kg",

                    show: true
                },


                {
                    id: "final_putty_blade",

                    name_hi: "पुट्टी वाला पत्ता",

                    name_en: "Putty Blade / Patta",

                    unit: "pcs",

                    show: true
                }

            ]
        },


        /* =================================================
           FALSE CEILING WIRING
        ================================================= */

        {
            id: "false_ceiling",

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

                    colors: true,

                    unit: "meter",

                    alternateUnits: [
                        "coil"
                    ],

                    show: true
                },


                {
                    id: "fc_electrical_tape",

                    name_hi: "बिजली वाला टेप",

                    name_en: "Electrical Tape",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "fc_pipe",

                    name_hi: "पाइप",

                    name_en: "Pipe",

                    unit: "pcs",

                    alternateUnits: [
                        "bundle"
                    ],

                    show: true
                },


                {
                    id: "fc_long_bend",

                    name_hi: "लॉन्ग बेंड",

                    name_en: "Long Bend",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "fc_junction_box",

                    name_hi: "जंक्शन बॉक्स 4वे (डिब्बी)",

                    name_en: "Junction Box 4 Way (Dibby)",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "zip_tie",

                    name_hi: "ज़िप टाई / केबल टाई",

                    name_en: "Zip Tie / Cable Tie",

                    types: [

                        {
                            id: "300mm",
                            name_hi: "300 एमएम",
                            name_en: "300mm",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                {
                    id: "fc_flexible_pipe",

                    name_hi: "फ्लेक्सिबल पाइप",

                    name_en: "Flexible Pipe",

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

                    show: true
                },


                {
                    id: "saddle_clamp",

                    name_hi: "सैडल क्लैंप",

                    name_en: "Saddle Clamp",

                    types: [

                        {
                            id: "25mm",
                            name_hi: "25 एमएम",
                            name_en: "25mm",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                {
                    id: "cable_clip",

                    name_hi: "केबल क्लिप",

                    name_en: "Cable Clip",

                    types: [

                        {
                            id: "25mm",
                            name_hi: "25 एमएम",
                            name_en: "25mm",
                            show: true
                        }

                    ],

                    unit: "pcs",

                    show: true
                },


                {
                    id: "fc_screw",

                    name_hi: "पेंच",

                    name_en: "Screw",

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

                    alternateUnits: [
                        "box"
                    ],

                    show: true
                },


                {
                    id: "fc_fastener",

                    name_hi: "फास्टनर",

                    name_en: "Fastener",

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

                    show: true
                },


                {
                    id: "fan_rod",

                    name_hi: "फैन रॉड",

                    name_en: "Fan Rod",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "fan_clamp",

                    name_hi: "फैन क्लैंप",

                    name_en: "Fan Clamp",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "pvc_wall_plug",

                    name_hi: "पीवीसी वॉल प्लग / गुल्ली / गिट्टी",

                    name_en: "PVC Wall Plug / Gulli / Gitti",

                    unit: "pcs",

                    show: true
                },


                {
                    id: "washer",

                    name_hi: "वॉशर",

                    name_en: "Washer",

                    unit: "pcs",

                    show: true
                }

            ]
        }

    ]

};


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

/*
    किसी भी material में नया Type जोड़ने के लिए:

    MATERIAL_CATALOGUE_HELPERS.addType(
        "stage_2",
        "wall_pipe",
        {
            id: "extra",
            name_hi: "अतिरिक्त",
            name_en: "Extra",
            show: true
        }
    );
*/

window.MATERIAL_CATALOGUE_HELPERS = {


    /* =====================================================
       GET STAGE
    ===================================================== */

    getStage(stageId) {

        return window.MATERIAL_CATALOGUE.stages.find(
            stage => stage.id === stageId
        ) || null;

    },


    /* =====================================================
       GET MATERIAL
    ===================================================== */

    getMaterial(stageId, materialId) {

        const stage = this.getStage(stageId);

        if (!stage) return null;

        return stage.materials.find(
            material => material.id === materialId
        ) || null;

    },


    /* =====================================================
       ADD TYPE
    ===================================================== */

    addType(stageId, materialId, typeObject) {

        const material = this.getMaterial(
            stageId,
            materialId
        );

        if (!material) return false;

        if (!Array.isArray(material.types)) {

            material.types = [];

        }

        material.types.push(typeObject);

        return true;

    },


    /* =====================================================
       ADD BRAND
    ===================================================== */

    addBrand(brandObject) {

        if (!brandObject || !brandObject.id) {

            return false;

        }

        const exists =
            window.MATERIAL_CATALOGUE.defaultBrands.some(
                brand => brand.id === brandObject.id
            );

        if (exists) return false;

        window.MATERIAL_CATALOGUE.defaultBrands.push(
            brandObject
        );

        return true;

    },


    /* =====================================================
       SHOW / HIDE STAGE
    ===================================================== */

    toggleStage(stageId, visible) {

        const stage = this.getStage(stageId);

        if (!stage) return false;

        stage.show = Boolean(visible);

        return true;

    },


    /* =====================================================
       SHOW / HIDE MATERIAL
    ===================================================== */

    toggleMaterial(
        stageId,
        materialId,
        visible
    ) {

        const material =
            this.getMaterial(
                stageId,
                materialId
            );

        if (!material) return false;

        material.show = Boolean(visible);

        return true;

    },


    /* =====================================================
       SHOW / HIDE TYPE
    ===================================================== */

    toggleType(
        stageId,
        materialId,
        typeId,
        visible
    ) {

        const material =
            this.getMaterial(
                stageId,
                materialId
            );

        if (
            !material ||
            !Array.isArray(material.types)
        ) {

            return false;

        }

        const type =
            material.types.find(
                item => item.id === typeId
            );

        if (!type) return false;

        type.show = Boolean(visible);

        return true;

    },


    /* =====================================================
       GET ALL VISIBLE MATERIALS
    ===================================================== */

    getAllVisibleMaterials() {

        const result = [];

        window.MATERIAL_CATALOGUE.stages
            .filter(stage => stage.show !== false)
            .forEach(stage => {

                stage.materials
                    .filter(material =>
                        material.show !== false
                    )
                    .forEach(material => {

                        result.push({

                            stageId: stage.id,

                            stage_hi: stage.name_hi,

                            stage_en: stage.name_en,

                            ...material

                        });

                    });

            });

        return result;

    },


    /* =====================================================
       SEARCH MATERIAL
    ===================================================== */

    search(query) {

        const q =
            String(query || "")
                .trim()
                .toLowerCase();

        if (!q) return [];

        const results = [];

        window.MATERIAL_CATALOGUE.stages
            .filter(stage => stage.show !== false)
            .forEach(stage => {

                stage.materials
                    .filter(material =>
                        material.show !== false
                    )
                    .forEach(material => {

                        const materialText = [

                            material.name_hi,

                            material.name_en,

                            stage.name_hi,

                            stage.name_en

                        ]
                            .filter(Boolean)
                            .join(" ")
                            .toLowerCase();


                        if (
                            materialText.includes(q)
                        ) {

                            results.push({

                                stageId: stage.id,

                                stage_hi:
                                    stage.name_hi,

                                stage_en:
                                    stage.name_en,

                                material

                            });

                        }


                        if (
                            Array.isArray(
                                material.types
                            )
                        ) {

                            material.types
                                .filter(
                                    type =>
                                        type.show !== false
                                )
                                .forEach(type => {

                                    const typeText = [

                                        material.name_hi,

                                        material.name_en,

                                        type.name_hi,

                                        type.name_en

                                    ]
                                        .join(" ")
                                        .toLowerCase();


                                    if (
                                        typeText.includes(q)
                                    ) {

                                        results.push({

                                            stageId:
                                                stage.id,

                                            stage_hi:
                                                stage.name_hi,

                                            stage_en:
                                                stage.name_en,

                                            material,

                                            type

                                        });

                                    }

                                });

                        }

                    });

            });

        return results;

    }

};


/* =========================================================
   MATERIAL ESTIMATE DATA
   Final estimate में जाने वाला structure
========================================================= */

window.MATERIAL_ESTIMATE = {


    items: [],


    /* =====================================================
       ADD ITEM
    ===================================================== */

    addItem(item) {

        if (!item) return false;

        const estimateItem = {

            id:
                item.id ||
                (
                    "estimate_" +
                    Date.now() +
                    "_" +
                    Math.random()
                        .toString(36)
                        .substring(2, 8)
                ),

            stageId:
                item.stageId || "",

            stageNameHi:
                item.stageNameHi || "",

            stageNameEn:
                item.stageNameEn || "",

            materialId:
                item.materialId || "",

            materialNameHi:
                item.materialNameHi || "",

            materialNameEn:
                item.materialNameEn || "",

            typeNameHi:
                item.typeNameHi || "",

            typeNameEn:
                item.typeNameEn || "",

            subTypeNameHi:
                item.subTypeNameHi || "",

            subTypeNameEn:
                item.subTypeNameEn || "",

            colorId:
                item.colorId || "",

            colorNameHi:
                item.colorNameHi || "",

            colorNameEn:
                item.colorNameEn || "",

            qty:
                Number(item.qty) || 0,

            unit:
                item.unit || "pcs",

            brandId:
                item.brandId || "",

            brandNameHi:
                item.brandNameHi || "",

            brandNameEn:
                item.brandNameEn || "",

            rate:
                Number(item.rate) || 0,

            amount:
                Number(item.amount) || 0

        };


        this.items.push(
            estimateItem
        );

        return estimateItem;

    },


    /* =====================================================
       UPDATE ITEM
    ===================================================== */

    updateItem(itemId, changes) {

        const index =
            this.items.findIndex(
                item => item.id === itemId
            );

        if (index === -1) {

            return false;

        }

        this.items[index] = {

            ...this.items[index],

            ...changes

        };

        return this.items[index];

    },


    /* =====================================================
       DELETE ITEM
    ===================================================== */

    deleteItem(itemId) {

        const index =
            this.items.findIndex(
                item => item.id === itemId
            );

        if (index === -1) {

            return false;

        }

        this.items.splice(index, 1);

        return true;

    },


    /* =====================================================
       CLEAR ESTIMATE
    ===================================================== */

    clear() {

        this.items = [];

    },


    /* =====================================================
       TOTAL
    ===================================================== */

    getSubtotal() {

        return this.items.reduce(

            (total, item) => {

                const amount =
                    Number(item.amount) ||
                    (
                        Number(item.qty || 0) *
                        Number(item.rate || 0)
                    );

                return total + amount;

            },

            0

        );

    }

};


/* =========================================================
   PAGE READY CHECK
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Sandeep ElectroFix Material Catalogue Loaded:",
            window.MATERIAL_CATALOGUE.version
        );

        console.log(
            "Total Visible Materials:",
            window
                .MATERIAL_CATALOGUE_HELPERS
                .getAllVisibleMaterials()
                .length
        );

    }
);
