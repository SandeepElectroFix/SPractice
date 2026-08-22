/* =========================================================
   SANDEEP ELECTROFIX
   ESTIMATE LIST
   MASTER MATERIAL DATABASE
   Version 3.0.0

   FEATURES
   ---------------------------------------------------------
   ✓ English + Hindi
   ✓ Default Language = English
   ✓ Category Show / Hide
   ✓ Item Show / Hide
   ✓ Type Show / Hide
   ✓ Sub-Type Show / Hide
   ✓ Size Show / Hide
   ✓ Rating Show / Hide
   ✓ Colour Show / Hide
   ✓ Material Show / Hide
   ✓ Variety Show / Hide
   ✓ Brand Show / Hide
   ✓ Quantity Show / Hide
   ✓ Unit Show / Hide
   ✓ Show All
   ✓ Hide All
   ✓ Reset
   ✓ LocalStorage
   ✓ Search
========================================================= */


/* =========================================================
   1. GLOBAL CONFIG
========================================================= */

window.ESTIMATE_LIST_CONFIG = {

    appName: "Estimate List",

    companyName: "SANDEEP ELECTROFIX",

    version: "3.0.0",

    currency: "₹",

    /* DEFAULT LANGUAGE */
    languageDefault: "en",

    /* LANGUAGE */
    enableEnglish: true,
    enableHindi: true,

    /* SEARCH */
    enableSearch: true,

    /* GLOBAL CONTROLS */
    enableShowHide: true,

    /* MATERIAL LEVELS */
    enableCategory: true,
    enableMaterial: true,
    enableType: true,
    enableSubType: true,
    enableSize: true,
    enableRating: true,
    enableColour: true,
    enableMaterialType: true,
    enableVariety: true,

    /* ESTIMATE */
    enableQuantity: true,
    enableUnit: true,

    /* BRAND */
    enableBrand: true,
    enableNonBrand: true,
    enableBrandSkip: true,

    storageKey:
        "sandeep_estimate_list_settings"

};


/* =========================================================
   2. LANGUAGE
========================================================= */

window.ESTIMATE_LANGUAGE = {

    current:
        localStorage.getItem(
            "sandeep_estimate_language"
        ) ||
        window.ESTIMATE_LIST_CONFIG.languageDefault,

    set(lang) {

        if (
            lang !== "en" &&
            lang !== "hi"
        ) {
            return;
        }

        this.current = lang;

        localStorage.setItem(
            "sandeep_estimate_language",
            lang
        );

    },

    get(item) {

        if (!item) return "";

        return (
            item[this.current] ||
            item.en ||
            ""
        );

    }

};


/* =========================================================
   3. SHOW / HIDE OBJECT
========================================================= */

function visibility(show = true) {

    return {
        show: show
    };

}


/* =========================================================
   4. MASTER MATERIAL DATABASE
========================================================= */

window.ESTIMATE_LIST = [

    /* =====================================================
       CONDUIT & BOX
    ===================================================== */

    {
        id: "conduit-box",

        show: true,

        name_en: "Conduit & Box",
        name_hi: "कंड्यूट और बॉक्स",

        icon: "🔵",

        items: [

            {
                id: "conduit-pipe",

                show: true,

                name_en: "Conduit Pipe",
                name_hi: "कंड्यूट पाइप",

                types: [

                    {
                        id: "heavy",

                        show: true,

                        en: "Heavy",
                        hi: "हेवी",

                        subTypes: [

                            {
                                id: "19mm",

                                show: true,

                                en: "19mm",
                                hi: "19mm"
                            },

                            {
                                id: "25mm",

                                show: true,

                                en: "25mm",
                                hi: "25mm"
                            },

                            {
                                id: "32mm",

                                show: true,

                                en: "32mm",
                                hi: "32mm"
                            }

                        ]

                    },

                    {
                        id: "medium",

                        show: true,

                        en: "Medium",
                        hi: "मीडियम",

                        subTypes: [

                            {
                                id: "19mm",

                                show: true,

                                en: "19mm",
                                hi: "19mm"
                            },

                            {
                                id: "25mm",

                                show: true,

                                en: "25mm",
                                hi: "25mm"
                            }

                        ]

                    },

                    {
                        id: "light",

                        show: true,

                        en: "Light",
                        hi: "लाइट",

                        subTypes: [

                            {
                                id: "19mm",

                                show: true,

                                en: "19mm",
                                hi: "19mm"
                            },

                            {
                                id: "25mm",

                                show: true,

                                en: "25mm",
                                hi: "25mm"
                            }

                        ]

                    }

                ],

                units: [

                    {
                        id: "pcs",
                        show: true,
                        en: "pcs",
                        hi: "पीस"
                    },

                    {
                        id: "bundle",
                        show: true,
                        en: "Bundle",
                        hi: "बंडल"
                    }

                ]

            },


            {
                id: "pvc-box",

                show: true,

                name_en: "PVC Box",
                name_hi: "पी. वी. सी. बॉक्स",

                types: [

                    {
                        id: "1-module",

                        show: true,

                        en: "1 Module",
                        hi: "1 मॉड्यूल"
                    },

                    {
                        id: "2-module",

                        show: true,

                        en: "2 Module",
                        hi: "2 मॉड्यूल"
                    },

                    {
                        id: "3-module",

                        show: true,

                        en: "3 Module",
                        hi: "3 मॉड्यूल"
                    },

                    {
                        id: "4-module",

                        show: true,

                        en: "4 Module",
                        hi: "4 मॉड्यूल"
                    },

                    {
                        id: "6-module",

                        show: true,

                        en: "6 Module",
                        hi: "6 मॉड्यूल"
                    },

                    {
                        id: "8-module",

                        show: true,

                        en: "8 Module",
                        hi: "8 मॉड्यूल"
                    },

                    {
                        id: "12-module",

                        show: true,

                        en: "12 Module",
                        hi: "12 मॉड्यूल"
                    },

                    {
                        id: "16-module",

                        show: true,

                        en: "16 Module",
                        hi: "16 मॉड्यूल"
                    }

                ],

                units: [

                    {
                        id: "pcs",
                        show: true,
                        en: "pcs",
                        hi: "पीस"
                    }

                ]

            }

        ]

    },


    /* =====================================================
       SWITCHGEAR
    ===================================================== */

    {
        id: "switchgear",

        show: true,

        name_en: "Switchgear",
        name_hi: "स्विचगियर",

        icon: "🔌",

        items: [

            {
                id: "modular-switch",

                show: true,

                name_en: "Modular Switch",
                name_hi: "मॉड्यूलर स्विच",

                types: [

                    {
                        id: "6a-1way",

                        show: true,

                        en: "6A 1 Way",
                        hi: "6A 1 वे"
                    },

                    {
                        id: "6a-2way",

                        show: true,

                        en: "6A 2 Way",
                        hi: "6A 2 वे"
                    },

                    {
                        id: "16a",

                        show: true,

                        en: "16A",
                        hi: "16A"
                    },

                    {
                        id: "20a",

                        show: true,

                        en: "20A",
                        hi: "20A"
                    }

                ],

                units: [

                    {
                        id: "pcs",
                        show: true,
                        en: "pcs",
                        hi: "पीस"
                    },

                    {
                        id: "box",
                        show: true,
                        en: "Box",
                        hi: "बॉक्स"
                    }

                ]

            },


            {
                id: "dp-switch",

                show: true,

                name_en: "DP Switch",
                name_hi: "डी. पी. स्विच",

                types: [

                    {
                        id: "dp",

                        show: true,

                        en: "DP Switch",
                        hi: "डी. पी. स्विच"
                    },

                    {
                        id: "dp-indicator",

                        show: true,

                        en: "DP Switch With Indicator",
                        hi: "डी. पी. स्विच विद इंडिकेटर"
                    },

                    {
                        id: "dp-fuse",

                        show: true,

                        en: "DP Switch With Fuse",
                        hi: "डी. पी. स्विच विद फ्यूज"
                    }

                ],

                ratings: [

                    {
                        id: "6a",
                        show: true,
                        en: "6A",
                        hi: "6A"
                    },

                    {
                        id: "16a",
                        show: true,
                        en: "16A",
                        hi: "16A"
                    },

                    {
                        id: "20a",
                        show: true,
                        en: "20A",
                        hi: "20A"
                    },

                    {
                        id: "32a",
                        show: true,
                        en: "32A",
                        hi: "32A"
                    },

                    {
                        id: "40a",
                        show: true,
                        en: "40A",
                        hi: "40A"
                    },

                    {
                        id: "63a",
                        show: true,
                        en: "63A",
                        hi: "63A"
                    }

                ],

                colours: [

                    {
                        id: "white",
                        show: true,
                        en: "White",
                        hi: "सफेद"
                    },

                    {
                        id: "black",
                        show: true,
                        en: "Black",
                        hi: "काला"
                    },

                    {
                        id: "grey",
                        show: true,
                        en: "Grey",
                        hi: "ग्रे"
                    }

                ],

                units: [

                    {
                        id: "pcs",
                        show: true,
                        en: "pcs",
                        hi: "पीस"
                    },

                    {
                        id: "box",
                        show: true,
                        en: "Box",
                        hi: "बॉक्स"
                    }

                ]

            }

        ]

    },


    /* =====================================================
       PROTECTION
    ===================================================== */

    {
        id: "protection",

        show: true,

        name_en: "Protection",
        name_hi: "प्रोटेक्शन",

        icon: "🛡️",

        items: [

            {
                id: "mcb",

                show: true,

                name_en: "MCB",
                name_hi: "एम. सी. बी.",

                types: [

                    {
                        id: "sp",

                        show: true,

                        en: "SP",
                        hi: "एस. पी."
                    },

                    {
                        id: "dp",

                        show: true,

                        en: "DP",
                        hi: "डी. पी."
                    },

                    {
                        id: "tp",

                        show: true,

                        en: "TP",
                        hi: "टी. पी."
                    },

                    {
                        id: "tpn",

                        show: true,

                        en: "TPN",
                        hi: "टी. पी. एन."
                    }

                ],

                ratings: [

                    {
                        id: "6a",
                        show: true,
                        en: "6A",
                        hi: "6A"
                    },

                    {
                        id: "10a",
                        show: true,
                        en: "10A",
                        hi: "10A"
                    },

                    {
                        id: "16a",
                        show: true,
                        en: "16A",
                        hi: "16A"
                    },

                    {
                        id: "20a",
                        show: true,
                        en: "20A",
                        hi: "20A"
                    },

                    {
                        id: "25a",
                        show: true,
                        en: "25A",
                        hi: "25A"
                    },

                    {
                        id: "32a",
                        show: true,
                        en: "32A",
                        hi: "32A"
                    },

                    {
                        id: "40a",
                        show: true,
                        en: "40A",
                        hi: "40A"
                    },

                    {
                        id: "63a",
                        show: true,
                        en: "63A",
                        hi: "63A"
                    }

                ],

                curves: [

                    {
                        id: "b",
                        show: true,
                        en: "B Curve",
                        hi: "बी कर्व"
                    },

                    {
                        id: "c",
                        show: true,
                        en: "C Curve",
                        hi: "सी कर्व"
                    },

                    {
                        id: "d",
                        show: true,
                        en: "D Curve",
                        hi: "डी कर्व"
                    }

                ]

            },


            {
                id: "rccb",

                show: true,

                name_en: "RCCB",
                name_hi: "आर. सी. सी. बी.",

                types: [

                    {
                        id: "2p",
                        show: true,
                        en: "2P",
                        hi: "2P"
                    },

                    {
                        id: "4p",
                        show: true,
                        en: "4P",
                        hi: "4P"
                    }

                ],

                ratings: [

                    {
                        id: "25a",
                        show: true,
                        en: "25A",
                        hi: "25A"
                    },

                    {
                        id: "40a",
                        show: true,
                        en: "40A",
                        hi: "40A"
                    },

                    {
                        id: "63a",
                        show: true,
                        en: "63A",
                        hi: "63A"
                    }

                ],

                sensitivities: [

                    {
                        id: "30ma",
                        show: true,
                        en: "30mA",
                        hi: "30mA"
                    },

                    {
                        id: "100ma",
                        show: true,
                        en: "100mA",
                        hi: "100mA"
                    },

                    {
                        id: "300ma",
                        show: true,
                        en: "300mA",
                        hi: "300mA"
                    }

                ]

            },


            {
                id: "rcbo",

                show: true,

                name_en: "RCBO",
                name_hi: "आर. सी. बी. ओ.",

                types: [

                    {
                        id: "1pn",
                        show: true,
                        en: "1P+N",
                        hi: "1P+N"
                    },

                    {
                        id: "2p",
                        show: true,
                        en: "2P",
                        hi: "2P"
                    }

                ],

                ratings: [

                    {
                        id: "6a",
                        show: true,
                        en: "6A",
                        hi: "6A"
                    },

                    {
                        id: "10a",
                        show: true,
                        en: "10A",
                        hi: "10A"
                    },

                    {
                        id: "16a",
                        show: true,
                        en: "16A",
                        hi: "16A"
                    },

                    {
                        id: "20a",
                        show: true,
                        en: "20A",
                        hi: "20A"
                    },

                    {
                        id: "25a",
                        show: true,
                        en: "25A",
                        hi: "25A"
                    },

                    {
                        id: "32a",
                        show: true,
                        en: "32A",
                        hi: "32A"
                    }

                ],

                sensitivities: [

                    {
                        id: "30ma",
                        show: true,
                        en: "30mA",
                        hi: "30mA"
                    },

                    {
                        id: "100ma",
                        show: true,
                        en: "100mA"
                        ,
                        hi: "100mA"
                    }

                ]

            }

        ]

    },


    /* =====================================================
       WIRE & CABLE
    ===================================================== */

    {
        id: "wire-cable",

        show: true,

        name_en: "Wire & Cable",
        name_hi: "वायर और केबल",

        icon: "🔴",

        items: [

            {
                id: "wire",

                show: true,

                name_en: "Wire",
                name_hi: "वायर",

                types: [

                    {
                        id: "hrfr",

                        show: true,

                        en: "HRFR Wire",
                        hi: "एच. आर. एफ. आर. वायर"
                    },

                    {
                        id: "fr",

                        show: true,

                        en: "FR Wire",
                        hi: "एफ. आर. वायर"
                    },

                    {
                        id: "frls",

                        show: true,

                        en: "FRLS Wire",
                        hi: "एफ. आर. एल. एस. वायर"
                    },

                    {
                        id: "flexible",

                        show: true,

                        en: "Flexible Wire",
                        hi: "फ्लेक्सिबल वायर"
                    }

                ],

                sizes: [

                    {
                        id: "0.75",
                        show: true,
                        en: "0.75 Sqmm",
                        hi: "0.75 Sqmm"
                    },

                    {
                        id: "1",
                        show: true,
                        en: "1 Sqmm",
                        hi: "1 Sqmm"
                    },

                    {
                        id: "1.5",
                        show: true,
                        en: "1.5 Sqmm",
                        hi: "1.5 Sqmm"
                    },

                    {
                        id: "2.5",
                        show: true,
                        en: "2.5 Sqmm",
                        hi: "2.5 Sqmm"
                    },

                    {
                        id: "4",
                        show: true,
                        en: "4 Sqmm",
                        hi: "4 Sqmm"
                    },

                    {
                        id: "6",
                        show: true,
                        en: "6 Sqmm",
                        hi: "6 Sqmm"
                    },

                    {
                        id: "10",
                        show: true,
                        en: "10 Sqmm",
                        hi: "10 Sqmm"
                    }

                ],

                colours: [

                    {
                        id: "red",
                        show: true,
                        en: "Red",
                        hi: "लाल"
                    },

                    {
                        id: "black",
                        show: true,
                        en: "Black",
                        hi: "काला"
                    },

                    {
                        id: "blue",
                        show: true,
                        en: "Blue",
                        hi: "नीला"
                    },

                    {
                        id: "yellow",
                        show: true,
                        en: "Yellow",
                        hi: "पीला"
                    },

                    {
                        id: "green",
                        show: true,
                        en: "Green",
                        hi: "हरा"
                    },

                    {
                        id: "white",
                        show: true,
                        en: "White",
                        hi: "सफेद"
                    },

                    {
                        id: "grey",
                        show: true,
                        en: "Grey",
                        hi: "ग्रे"
                    }

                ]

            },


            {
                id: "xlpe-cable",

                show: true,

                name_en: "XLPE Cable",
                name_hi: "एक्स. एल. पी. ई. केबल",

                types: [

                    {
                        id: "1-core",
                        show: true,
                        en: "Single Core",
                        hi: "सिंगल कोर"
                    },

                    {
                        id: "2-core",
                        show: true,
                        en: "2 Core",
                        hi: "2 कोर"
                    },

                    {
                        id: "3-core",
                        show: true,
                        en: "3 Core",
                        hi: "3 कोर"
                    },

                    {
                        id: "4-core",
                        show: true,
                        en: "4 Core",
                        hi: "4 कोर"
                    }

                ],

                sizes: [

                    {
                        id: "1.5",
                        show: true,
                        en: "1.5 Sqmm",
                        hi: "1.5 Sqmm"
                    },

                    {
                        id: "2.5",
                        show: true,
                        en: "2.5 Sqmm",
                        hi: "2.5 Sqmm"
                    },

                    {
                        id: "4",
                        show: true,
                        en: "4 Sqmm",
                        hi: "4 Sqmm"
                    },

                    {
                        id: "6",
                        show: true,
                        en: "6 Sqmm",
                        hi: "6 Sqmm"
                    },

                    {
                        id: "10",
                        show: true,
                        en: "10 Sqmm",
                        hi: "10 Sqmm"
                    },

                    {
                        id: "16",
                        show: true,
                        en: "16 Sqmm",
                        hi: "16 Sqmm"
                    },

                    {
                        id: "25",
                        show: true,
                        en: "25 Sqmm",
                        hi: "25 Sqmm"
                    },

                    {
                        id: "35",
                        show: true,
                        en: "35 Sqmm",
                        hi: "35 Sqmm"
                    },

                    {
                        id: "50",
                        show: true,
                        en: "50 Sqmm",
                        hi: "50 Sqmm"
                    }

                ]

            }

        ]

    },


    /* =====================================================
       LIGHTING
    ===================================================== */

    {
        id: "lighting",

        show: true,

        name_en: "Lighting",
        name_hi: "लाइटिंग",

        icon: "💡",

        items: [

            {
                id: "led-bulb",

                show: true,

                name_en: "LED Bulb",
                name_hi: "एल. ई. डी. बल्ब",

                wattages: [

                    {
                        id: "5w",
                        show: true,
                        en: "5W",
                        hi: "5W"
                    },

                    {
                        id: "9w",
                        show: true,
                        en: "9W",
                        hi: "9W"
                    },

                    {
                        id: "12w",
                        show: true,
                        en: "12W",
                        hi: "12W"
                    },

                    {
                        id: "15w",
                        show: true,
                        en: "15W",
                        hi: "15W"
                    },

                    {
                        id: "18w",
                        show: true,
                        en: "18W",
                        hi: "18W"
                    }

                ]

            },


            {
                id: "led-panel",

                show: true,

                name_en: "LED Panel",
                name_hi: "एल. ई. डी. पैनल",

                types: [

                    {
                        id: "round",
                        show: true,
                        en: "Round",
                        hi: "राउंड"
                    },

                    {
                        id: "square",
                        show: true,
                        en: "Square",
                        hi: "स्क्वायर"
                    }

                ],

                wattages: [

                    {
                        id: "6w",
                        show: true,
                        en: "6W",
                        hi: "6W"
                    },

                    {
                        id: "9w",
                        show: true,
                        en: "9W",
                        hi: "9W"
                    },

                    {
                        id: "12w",
                        show: true,
                        en: "12W",
                        hi: "12W"
                    },

                    {
                        id: "18w",
                        show: true,
                        en: "18W",
                        hi: "18W"
                    }

                ]

            }

        ]

    },


    /* =====================================================
       EARTHING
    ===================================================== */

    {
        id: "earthing",

        show: true,

        name_en: "Earthing",
        name_hi: "अर्थिंग",

        icon: "🌍",

        items: [

            {
                id: "earthing-wire",

                show: true,

                name_en: "Earthing Wire",
                name_hi: "अर्थिंग वायर",

                materials: [

                    {
                        id: "copper",
                        show: true,
                        en: "Copper",
                        hi: "कॉपर"
                    },

                    {
                        id: "aluminium",
                        show: true,
                        en: "Aluminium",
                        hi: "एल्युमिनियम"
                    }

                ],

                sizes: [

                    {
                        id: "2.5",
                        show: true,
                        en: "2.5 Sqmm",
                        hi: "2.5 Sqmm"
                    },

                    {
                        id: "4",
                        show: true,
                        en: "4 Sqmm",
                        hi: "4 Sqmm"
                    },

                    {
                        id: "6",
                        show: true,
                        en: "6 Sqmm",
                        hi: "6 Sqmm"
                    },

                    {
                        id: "10",
                        show: true,
                        en: "10 Sqmm",
                        hi: "10 Sqmm"
                    },

                    {
                        id: "16",
                        show: true,
                        en: "16 Sqmm",
                        hi: "16 Sqmm"
                    }

                ]

            }

        ]

    },


    /* =====================================================
       LUG
    ===================================================== */

    {
        id: "cable-accessories",

        show: true,

        name_en: "Cable Accessories",
        name_hi: "केबल एक्सेसरीज",

        icon: "🔩",

        items: [

            {
                id: "lug",

                show: true,

                name_en: "Lug",
                name_hi: "लग",

                materials: [

                    {
                        id: "copper",
                        show: true,
                        en: "Copper",
                        hi: "कॉपर"
                    },

                    {
                        id: "aluminium",
                        show: true,
                        en: "Aluminium",
                        hi: "एल्युमिनियम"
                    },

                    {
                        id: "bimetallic",
                        show: true,
                        en: "Bimetallic",
                        hi: "बाइमेटैलिक"
                    }

                ],

                types: [

                    {
                        id: "pin",
                        show: true,
                        en: "Pin",
                        hi: "पिन"
                    },

                    {
                        id: "ring",
                        show: true,
                        en: "Ring",
                        hi: "रिंग"
                    },

                    {
                        id: "fork",
                        show: true,
                        en: "Fork / U",
                        hi: "फोर्क / U"
                    },

                    {
                        id: "spade",
                        show: true,
                        en: "Spade",
                        hi: "स्पेड"
                    },

                    {
                        id: "flat",
                        show: true,
                        en: "Flat",
                        hi: "फ्लैट"
                    },

                    {
                        id: "tubular",
                        show: true,
                        en: "Tubular",
                        hi: "ट्यूब्यूलर"
                    },

                    {
                        id: "palm",
                        show: true,
                        en: "Palm",
                        hi: "पाम"
                    }

                ],

                cableSizes: [

                    {
                        id: "1.5",
                        show: true,
                        en: "1.5 Sqmm",
                        hi: "1.5 Sqmm"
                    },

                    {
                        id: "2.5",
                        show: true,
                        en: "2.5 Sqmm",
                        hi: "2.5 Sqmm"
                    },

                    {
                        id: "4",
                        show: true,
                        en: "4 Sqmm",
                        hi: "4 Sqmm"
                    },

                    {
                        id: "6",
                        show: true,
                        en: "6 Sqmm",
                        hi: "6 Sqmm"
                    },

                    {
                        id: "10",
                        show: true,
                        en: "10 Sqmm",
                        hi: "10 Sqmm"
                    },

                    {
                        id: "16",
                        show: true,
                        en: "16 Sqmm",
                        hi: "16 Sqmm"
                    },

                    {
                        id: "25",
                        show: true,
                        en: "25 Sqmm",
                        hi: "25 Sqmm"
                    },

                    {
                        id: "35",
                        show: true,
                        en: "35 Sqmm",
                        hi: "35 Sqmm"
                    },

                    {
                        id: "50",
                        show: true,
                        en: "50 Sqmm",
                        hi: "50 Sqmm"
                    }

                ]

            }

        ]

    }

];


/* =========================================================
   5. BRAND MASTER
========================================================= */

window.ESTIMATE_BRANDS = [

    {
        id: "polycab",
        show: true,
        en: "Polycab",
        hi: "पॉलीकैब"
    },

    {
        id: "havells",
        show: true,
        en: "Havells",
        hi: "हैवेल्स"
    },

    {
        id: "finolex",
        show: true,
        en: "Finolex",
        hi: "फिनोलेक्स"
    },

    {
        id: "rr-kabel",
        show: true,
        en: "RR Kabel",
        hi: "आर. आर. केबल"
    },

    {
        id: "anchor",
        show: true,
        en: "Anchor",
        hi: "एंकर"
    },

    {
        id: "legrand",
        show: true,
        en: "Legrand",
        hi: "लेग्रांड"
    },

    {
        id: "schneider",
        show: true,
        en: "Schneider",
        hi: "श्नाइडर"
    },

    {
        id: "abb",
        show: true,
        en: "ABB",
        hi: "ए. बी. बी."
    },

    {
        id: "other",
        show: true,
        en: "Other Brand",
        hi: "अन्य ब्रांड"
    },

    {
        id: "local",
        show: true,
        en: "Non Brand / Local",
        hi: "नॉन ब्रांड / लोकल"
    },

    {
        id: "skip",
        show: true,
        en: "Skip Brand",
        hi: "ब्रांड छोड़ें"
    }

];


/* =========================================================
   6. SHOW / HIDE ENGINE
========================================================= */

window.EstimateVisibility = {

    STORAGE_KEY:
        window.ESTIMATE_LIST_CONFIG.storageKey,


    /* ---------------------------------------------
       Save
    --------------------------------------------- */

    save() {

        localStorage.setItem(

            this.STORAGE_KEY,

            JSON.stringify(
                window.ESTIMATE_LIST
            )

        );

    },


    /* ---------------------------------------------
       Load
    --------------------------------------------- */

    load() {

        const saved =
            localStorage.getItem(
                this.STORAGE_KEY
            );

        if (!saved) return;

        try {

            const data =
                JSON.parse(saved);

            if (
                Array.isArray(data)
            ) {

                window.ESTIMATE_LIST =
                    data;

            }

        } catch (error) {

            console.warn(
                "Estimate settings load error:",
                error
            );

        }

    },


    /* ---------------------------------------------
       Set Category
    --------------------------------------------- */

    setCategory(id, value) {

        const category =
            window.ESTIMATE_LIST.find(
                item => item.id === id
            );

        if (!category) return;

        category.show = Boolean(value);

        this.save();

    },


    /* ---------------------------------------------
       Set Material
    --------------------------------------------- */

    setMaterial(
        categoryId,
        materialId,
        value
    ) {

        const category =
            this.getCategory(
                categoryId
            );

        if (!category) return;

        const material =
            category.items?.find(
                item =>
                    item.id === materialId
            );

        if (!material) return;

        material.show =
            Boolean(value);

        this.save();

    },


    /* ---------------------------------------------
       Set Nested Item
    --------------------------------------------- */

    setNested(
        array,
        id,
        value
    ) {

        if (!Array.isArray(array)) {
            return;
        }

        const item =
            array.find(
                element =>
                    element.id === id
            );

        if (!item) return;

        item.show =
            Boolean(value);

        this.save();

    },


    /* ---------------------------------------------
       Get Category
    --------------------------------------------- */

    getCategory(id) {

        return window.ESTIMATE_LIST.find(
            item =>
                item.id === id
        );

    },


    /* ---------------------------------------------
       Get Visible Categories
    --------------------------------------------- */

    visibleCategories() {

        return window.ESTIMATE_LIST.filter(
            item =>
                item.show !== false
        );

    },


    /* ---------------------------------------------
       Get Visible Materials
    --------------------------------------------- */

    visibleMaterials(
        category
    ) {

        if (!category) return [];

        return (
            category.items || []
        ).filter(
            item =>
                item.show !== false
        );

    },


    /* ---------------------------------------------
       Get Visible Nested Items
    --------------------------------------------- */

    visibleItems(
        array
    ) {

        if (!Array.isArray(array)) {
            return [];
        }

        return array.filter(
            item =>
                item.show !== false
        );

    },


    /* ---------------------------------------------
       Hide Everything
    --------------------------------------------- */

    hideAll() {

        window.ESTIMATE_LIST
            .forEach(category => {

                category.show = false;

                (
                    category.items || []
                ).forEach(item => {

                    item.show = false;

                    this.hideNested(
                        item
                    );

                });

            });

        window.ESTIMATE_BRANDS
            .forEach(
                brand =>
                    brand.show = false
            );

        this.save();

    },


    /* ---------------------------------------------
       Show Everything
    --------------------------------------------- */

    showAll() {

        window.ESTIMATE_LIST
            .forEach(category => {

                category.show = true;

                (
                    category.items || []
                ).forEach(item => {

                    item.show = true;

                    this.showNested(
                        item
                    );

                });

            });

        window.ESTIMATE_BRANDS
            .forEach(
                brand =>
                    brand.show = true
            );

        this.save();

    },


    /* ---------------------------------------------
       Nested Hide
    --------------------------------------------- */

    hideNested(obj) {

        if (!obj || typeof obj !== "object") {
            return;
        }

        Object.keys(obj)
            .forEach(key => {

                const value =
                    obj[key];

                if (!Array.isArray(value)) {
                    return;
                }

                value.forEach(item => {

                    if (
                        item &&
                        typeof item === "object"
                    ) {

                        item.show = false;

                        this.hideNested(
                            item
                        );

                    }

                });

            });

    },


    /* ---------------------------------------------
       Nested Show
    --------------------------------------------- */

    showNested(obj) {

        if (!obj || typeof obj !== "object") {
            return;
        }

        Object.keys(obj)
            .forEach(key => {

                const value =
                    obj[key];

                if (!Array.isArray(value)) {
                    return;
                }

                value.forEach(item => {

                    if (
                        item &&
                        typeof item === "object"
                    ) {

                        item.show = true;

                        this.showNested(
                            item
                        );

                    }

                });

            });

    },


    /* ---------------------------------------------
       Reset
    --------------------------------------------- */

    reset() {

        localStorage.removeItem(
            this.STORAGE_KEY
        );

        location.reload();

    }

};


/* =========================================================
   7. SEARCH ENGINE
========================================================= */

window.EstimateSearch = {

    search(keyword) {

        const query =
            String(keyword || "")
                .toLowerCase()
                .trim();

        if (!query) {

            return (
                window.ESTIMATE_LIST
            );

        }

        const results = [];

        window.ESTIMATE_LIST
            .forEach(category => {

                if (
                    category.show === false
                ) {
                    return;
                }

                (
                    category.items || []
                ).forEach(item => {

                    if (
                        item.show === false
                    ) {
                        return;
                    }

                    const text = [

                        item.name_en,
                        item.name_hi,
                        category.name_en,
                        category.name_hi

                    ]
                        .filter(Boolean)
                        .join(" ")
                        .toLowerCase();

                    if (
                        text.includes(query)
                    ) {

                        results.push({

                            category,
                            item

                        });

                    }

                });

            });

        return results;

    }

};


/* =========================================================
   8. BRAND ENGINE
========================================================= */

window.EstimateBrandEngine = {

    getVisible() {

        if (
            !window.ESTIMATE_LIST_CONFIG
                .enableBrand
        ) {

            return [];

        }

        return window.ESTIMATE_BRANDS
            .filter(
                brand =>
                    brand.show !== false
            );

    },


    showAll() {

        window.ESTIMATE_BRANDS
            .forEach(
                brand =>
                    brand.show = true
            );

        localStorage.setItem(

            "sandeep_estimate_brands",

            JSON.stringify(
                window.ESTIMATE_BRANDS
            )

        );

    },


    hideAll() {

        window.ESTIMATE_BRANDS
            .forEach(
                brand =>
                    brand.show = false
            );

        localStorage.setItem(

            "sandeep_estimate_brands",

            JSON.stringify(
                window.ESTIMATE_BRANDS
            )

        );

    }

};


/* =========================================================
   9. LOAD SAVED SETTINGS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        EstimateVisibility.load();

    }
);


/* =========================================================
   END
========================================================= */
