/* =========================================================
   SANDEEP ELECTROFIX
   MATERIAL ESTIMATE SYSTEM
   MASTER MATERIAL CATALOGUE
   Version 1.0.0

   Structure:
   Material
      ↓
   Type
      ↓
   Sub Type / Size
      ↓
   Color
      ↓
   Qty
      ↓
   Brand
========================================================= */

window.MATERIAL_CATALOG = [

    /* =====================================================
       STAGE 1
       SLAB CONDUIT INSTALLATION
    ===================================================== */

    {
        id: "slab-conduit",
        stage: "slab-conduit",
        show: true,

        name_hi: "Slab Conduit Installation",
        name_en: "Slab Conduit Installation",

        materials: [

            {
                id: "slab-pipe",
                show: true,

                name_hi: "Pipe",
                name_en: "Pipe",

                types: [

                    {
                        id: "heavy",
                        show: true,
                        name_hi: "Heavy",
                        name_en: "Heavy",
                        subTypes: []
                    },

                    {
                        id: "medium",
                        show: true,
                        name_hi: "Medium",
                        name_en: "Medium",
                        subTypes: []
                    },

                    {
                        id: "light",
                        show: true,
                        name_hi: "Light",
                        name_en: "Light",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "slab-long-bend",
                show: true,

                name_hi: "Long Bend",
                name_en: "Long Bend",

                types: [
                    {
                        id: "heavy",
                        show: true,
                        name_hi: "Heavy",
                        name_en: "Heavy",
                        subTypes: []
                    }
                ],

                brands: []
            },


            {
                id: "deep-junction-box",
                show: true,

                name_hi: "Deep Junction Box",
                name_en: "Deep Junction Box",

                types: [],
                brands: []
            },


            {
                id: "fan-box",
                show: true,

                name_hi: "Fan Box",
                name_en: "Fan Box",

                types: [],
                brands: []
            },


            {
                id: "light-box",
                show: true,

                name_hi: "Light Box",
                name_en: "Light Box",

                types: [],
                brands: []
            },


            {
                id: "three-inch-tape",
                show: true,

                name_hi: '3" Tape',
                name_en: '3" Tape',

                types: [],
                brands: []
            },


            {
                id: "solvent-cement",
                show: true,

                name_hi: "Solvent Cement",
                name_en: "Solvent Cement",

                types: [],
                brands: []
            },


            {
                id: "neel-powder",
                show: true,

                name_hi: "Neel Powder",
                name_en: "Neel Powder",

                types: [],
                brands: []
            },


            {
                id: "binding-wire",
                show: true,

                name_hi: "Binding Wire",
                name_en: "Binding Wire",

                types: [],
                brands: []
            },


            {
                id: "cable-tie",
                show: true,

                name_hi: "Cable Tie",
                name_en: "Cable Tie",

                types: [],
                brands: []
            }

        ]
    },


    /* =====================================================
       STAGE 2
       WALL CONDUIT INSTALLATION
    ===================================================== */

    {
        id: "wall-conduit",
        stage: "wall-conduit",
        show: true,

        name_hi: "Wall Conduit Installation",
        name_en: "Wall Conduit Installation",

        materials: [

            {
                id: "gi-board",
                show: true,

                name_hi: "GI Board",
                name_en: "GI Board",

                types: [

                    {
                        id: "2-module",
                        show: true,
                        name_hi: "2 Module",
                        name_en: "2 Module",
                        subTypes: []
                    },

                    {
                        id: "3-module",
                        show: true,
                        name_hi: "3 Module",
                        name_en: "3 Module",
                        subTypes: []
                    },

                    {
                        id: "4-module",
                        show: true,
                        name_hi: "4 Module",
                        name_en: "4 Module",
                        subTypes: []
                    },

                    {
                        id: "6-module",
                        show: true,
                        name_hi: "6 Module",
                        name_en: "6 Module",
                        subTypes: []
                    },

                    {
                        id: "8-module-square",
                        show: true,
                        name_hi: "8 Module Square",
                        name_en: "8 Module Square",
                        subTypes: []
                    },

                    {
                        id: "8-module-rectangular",
                        show: true,
                        name_hi: "8 Module Rectangular",
                        name_en: "8 Module Rectangular",
                        subTypes: []
                    },

                    {
                        id: "12-module",
                        show: true,
                        name_hi: "12 Module",
                        name_en: "12 Module",
                        subTypes: []
                    },

                    {
                        id: "16-module",
                        show: true,
                        name_hi: "16 Module",
                        name_en: "16 Module",
                        subTypes: []
                    },

                    {
                        id: "18-module",
                        show: true,
                        name_hi: "18 Module",
                        name_en: "18 Module",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "wall-pipe",
                show: true,

                name_hi: "Pipe",
                name_en: "Pipe",

                types: [

                    {
                        id: "heavy",
                        show: true,
                        name_hi: "Heavy",
                        name_en: "Heavy",
                        subTypes: []
                    },

                    {
                        id: "medium",
                        show: true,
                        name_hi: "Medium",
                        name_en: "Medium",
                        subTypes: []
                    },

                    {
                        id: "light",
                        show: true,
                        name_hi: "Light",
                        name_en: "Light",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "wall-junction-box",
                show: true,

                name_hi: "Junction Box 4 Way (Dibby)",
                name_en: "Junction Box 4 Way (Dibby)",

                types: [],
                brands: []
            },


            {
                id: "wall-long-bend",
                show: true,

                name_hi: "Long Bend",
                name_en: "Long Bend",

                types: [],
                brands: []
            },


            {
                id: "wall-three-inch-tape",
                show: true,

                name_hi: '3" Tape',
                name_en: '3" Tape',

                types: [],
                brands: []
            },


            {
                id: "25mm-clip",
                show: true,

                name_hi: "25mm Clip",
                name_en: "25mm Clip",

                types: [],
                brands: []
            },


            {
                id: "mcb-box-double-door",
                show: true,

                name_hi: "MCB Box Double Door",
                name_en: "MCB Box Double Door",

                types: [],
                brands: []
            }

        ]
    },


    /* =====================================================
       STAGE 3
       WIRING INSTALLATION
    ===================================================== */

    {
        id: "wiring",
        stage: "wiring",
        show: true,

        name_hi: "Wiring Installation",
        name_en: "Wiring Installation",

        materials: [

            {
                id: "wire",
                show: true,

                name_hi: "Wire",
                name_en: "Wire",

                types: [

                    {
                        id: "fr",
                        show: true,

                        name_hi: "FR",
                        name_en: "FR",

                        subTypes: [

                            {
                                id: "075-sqmm",
                                show: true,
                                name_hi: "0.75 Sqmm",
                                name_en: "0.75 Sqmm",

                                colors: [
                                    "Red",
                                    "Black",
                                    "Yellow",
                                    "Blue",
                                    "Green",
                                    "White",
                                    "Grey"
                                ]
                            },

                            {
                                id: "1-sqmm",
                                show: true,
                                name_hi: "1 Sqmm",
                                name_en: "1 Sqmm",

                                colors: [
                                    "Red",
                                    "Black",
                                    "Yellow",
                                    "Blue",
                                    "Green",
                                    "White",
                                    "Grey"
                                ]
                            },

                            {
                                id: "15-sqmm",
                                show: true,
                                name_hi: "1.5 Sqmm",
                                name_en: "1.5 Sqmm",

                                colors: [
                                    "Red",
                                    "Black",
                                    "Yellow",
                                    "Blue",
                                    "Green",
                                    "White",
                                    "Grey"
                                ]
                            },

                            {
                                id: "25-sqmm",
                                show: true,
                                name_hi: "2.5 Sqmm",
                                name_en: "2.5 Sqmm",

                                colors: [
                                    "Red",
                                    "Black",
                                    "Yellow",
                                    "Blue",
                                    "Green",
                                    "White",
                                    "Grey"
                                ]
                            },

                            {
                                id: "4-sqmm",
                                show: true,
                                name_hi: "4 Sqmm",
                                name_en: "4 Sqmm",

                                colors: [
                                    "Red",
                                    "Black",
                                    "Yellow",
                                    "Blue",
                                    "Green",
                                    "White",
                                    "Grey"
                                ]
                            },

                            {
                                id: "6-sqmm",
                                show: true,
                                name_hi: "6 Sqmm",
                                name_en: "6 Sqmm",

                                colors: [
                                    "Red",
                                    "Black",
                                    "Yellow",
                                    "Blue",
                                    "Green",
                                    "White",
                                    "Grey"
                                ]
                            },

                            {
                                id: "10-sqmm",
                                show: true,
                                name_hi: "10 Sqmm",
                                name_en: "10 Sqmm",

                                colors: [
                                    "Red",
                                    "Black",
                                    "Yellow",
                                    "Blue",
                                    "Green",
                                    "White",
                                    "Grey"
                                ]
                            }

                        ]
                    }

                ],

                brands: []
            },


            {
                id: "wiring-electrical-tape",
                show: true,

                name_hi: "Electrical Tape",
                name_en: "Electrical Tape",

                types: [],
                brands: []
            },


            {
                id: "flexible-pipe",
                show: true,

                name_hi: "Flexible Pipe",
                name_en: "Flexible Pipe",

                types: [

                    {
                        id: "075-inch",
                        show: true,
                        name_hi: '0.75"',
                        name_en: '0.75"',
                        subTypes: []
                    },

                    {
                        id: "1-inch",
                        show: true,
                        name_hi: '1"',
                        name_en: '1"',
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "steel-wire",
                show: true,

                name_hi: "Steel Wire / Spring Wire",
                name_en: "Steel Wire / Spring Wire",

                types: [],
                brands: []
            },


            {
                id: "pop",
                show: true,

                name_hi: "Pop",
                name_en: "Pop",

                types: [],
                brands: []
            },


            {
                id: "putty-blade",
                show: true,

                name_hi: "Putty Blade / Patta",
                name_en: "Putty Blade / Patta",

                types: [],
                brands: []
            },


            {
                id: "fastener",
                show: true,

                name_hi: "Fastener",
                name_en: "Fastener",

                types: [

                    {
                        id: "m10",
                        show: true,
                        name_hi: "M10",
                        name_en: "M10",
                        subTypes: []
                    },

                    {
                        id: "m12",
                        show: true,
                        name_hi: "M12",
                        name_en: "M12",
                        subTypes: []
                    }

                ],

                brands: []
            }

        ]
    },


    /* =====================================================
       STAGE 4
       FINAL ELECTRICAL FITTINGS
    ===================================================== */

    {
        id: "final-fittings",
        stage: "final-fittings",
        show: true,

        name_hi: "Final Electrical Fittings",
        name_en: "Final Electrical Fittings",

        materials: [

            {
                id: "modular-sheet",
                show: true,

                name_hi: "Modular Sheet",
                name_en: "Modular Sheet",

                types: [

                    "2 Module",
                    "3 Module",
                    "4 Module",
                    "6 Module",
                    "8 Module Square",
                    "8 Module Rectangular",
                    "12 Module",
                    "16 Module",
                    "18 Module"

                ].map(
                    (name, index) => ({

                        id:
                            "modular-" +
                            (index + 1),

                        show: true,

                        name_hi: name,
                        name_en: name,

                        subTypes: []

                    })
                ),

                brands: []
            },


            {
                id: "switch",
                show: true,

                name_hi: "Switch",
                name_en: "Switch",

                types: [

                    {
                        id: "6a",
                        show: true,
                        name_hi: "6A",
                        name_en: "6A",
                        subTypes: []
                    },

                    {
                        id: "16a",
                        show: true,
                        name_hi: "16A",
                        name_en: "16A",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "socket",
                show: true,

                name_hi: "Socket",
                name_en: "Socket",

                types: [

                    {
                        id: "6a",
                        show: true,
                        name_hi: "6A",
                        name_en: "6A",
                        subTypes: []
                    },

                    {
                        id: "16a",
                        show: true,
                        name_hi: "16A",
                        name_en: "16A",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "mini-mcb",
                show: true,

                name_hi: "Mini MCB",
                name_en: "Mini MCB",

                types: [
                    "6A",
                    "10A",
                    "16A",
                    "20A",
                    "25A",
                    "32A"
                ].map(
                    (name, index) => ({

                        id:
                            "mini-mcb-" +
                            (index + 1),

                        show: true,

                        name_hi: name,
                        name_en: name,

                        subTypes: []

                    })
                ),

                brands: []
            },


            {
                id: "fan-regulator",
                show: true,

                name_hi: "Fan Regulator",
                name_en: "Fan Regulator",

                types: [

                    {
                        id: "1m",
                        show: true,
                        name_hi: "1M",
                        name_en: "1M",
                        subTypes: []
                    },

                    {
                        id: "2m",
                        show: true,
                        name_hi: "2M",
                        name_en: "2M",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "two-way-switch",
                show: true,

                name_hi: "2 Way Switch",
                name_en: "2 Way Switch",

                types: [

                    {
                        id: "6a",
                        show: true,
                        name_hi: "6A",
                        name_en: "6A",
                        subTypes: []
                    },

                    {
                        id: "16a",
                        show: true,
                        name_hi: "16A",
                        name_en: "16A",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "bell-push",
                show: true,

                name_hi: "Bell Push",
                name_en: "Bell Push",

                types: [

                    {
                        id: "1m",
                        show: true,
                        name_hi: "1M",
                        name_en: "1M",
                        subTypes: []
                    },

                    {
                        id: "2m",
                        show: true,
                        name_hi: "2M",
                        name_en: "2M",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "neon-indicator",
                show: true,

                name_hi: "Neon Indicator",
                name_en: "Neon Indicator",

                types: [],
                brands: []
            },


            {
                id: "blank-plate",
                show: true,

                name_hi: "Blank Plate / Dummy Switch",
                name_en: "Blank Plate / Dummy Switch",

                types: [],
                brands: []
            },


            {
                id: "fan-sheet",
                show: true,

                name_hi: "Fan Sheet",
                name_en: "Fan Sheet",

                types: [

                    {
                        id: "pvc",
                        show: true,
                        name_hi: "PVC",
                        name_en: "PVC",
                        subTypes: []
                    },

                    {
                        id: "mica",
                        show: true,
                        name_hi: "Mica",
                        name_en: "Mica",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "door-bell",
                show: true,

                name_hi: "Door Bell",
                name_en: "Door Bell",

                types: [],
                brands: []
            },


            {
                id: "ceiling-rose",
                show: true,

                name_hi: "Ceiling Rose",
                name_en: "Ceiling Rose",

                types: [],
                brands: []
            },


            {
                id: "led-bulb",
                show: true,

                name_hi: "LED Bulb",
                name_en: "LED Bulb",

                types: [],
                brands: []
            },


            {
                id: "led-tube-light",
                show: true,

                name_hi: "LED Tube Light",
                name_en: "LED Tube Light",

                types: [],
                brands: []
            },


            {
                id: "foot-light",
                show: true,

                name_hi: "Foot Light",
                name_en: "Foot Light",

                types: [],
                brands: []
            },


            {
                id: "up-down-light",
                show: true,

                name_hi: "Up Down Light",
                name_en: "Up Down Light",

                types: [],
                brands: []
            },


            {
                id: "panel-light",
                show: true,

                name_hi: "Panel Light",
                name_en: "Panel Light",

                types: [],
                brands: []
            },


            {
                id: "surface-light",
                show: true,

                name_hi: "Surface Light",
                name_en: "Surface Light",

                types: [],
                brands: []
            },


            {
                id: "cob-light",
                show: true,

                name_hi: "COB Light",
                name_en: "COB Light",

                types: [],
                brands: []
            },


            {
                id: "cob-spot-light",
                show: true,

                name_hi: "COB Spot Light",
                name_en: "COB Spot Light",

                types: [],
                brands: []
            },


            {
                id: "down-light",
                show: true,

                name_hi: "Down Light",
                name_en: "Down Light",

                types: [

                    {
                        id: "warm-white",
                        show: true,
                        name_hi: "Warm White",
                        name_en: "Warm White",
                        subTypes: []
                    },

                    {
                        id: "natural-white",
                        show: true,
                        name_hi: "Natural White",
                        name_en: "Natural White",
                        subTypes: []
                    },

                    {
                        id: "cool-white",
                        show: true,
                        name_hi: "Cool White",
                        name_en: "Cool White",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "strip-light",
                show: true,

                name_hi: "Strip Light",
                name_en: "Strip Light",

                types: [

                    {
                        id: "60-leds",
                        show: true,
                        name_hi: "60 LEDs/Mtr",
                        name_en: "60 LEDs/Mtr",
                        subTypes: []
                    },

                    {
                        id: "120-leds",
                        show: true,
                        name_hi: "120 LEDs/Mtr",
                        name_en: "120 LEDs/Mtr",
                        subTypes: []
                    },

                    {
                        id: "240-leds",
                        show: true,
                        name_hi: "240 LEDs/Mtr",
                        name_en: "240 LEDs/Mtr",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "rope-light",
                show: true,

                name_hi: "Rope Light",
                name_en: "Rope Light",

                types: [],
                brands: []
            },


            {
                id: "led-profile-channel",
                show: true,

                name_hi: "LED Profile Channel",
                name_en: "LED Profile Channel",

                types: [

                    {
                        id: "10ft",
                        show: true,
                        name_hi: "10ft",
                        name_en: "10ft",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "led-strip-driver",
                show: true,

                name_hi: "LED Strip Driver",
                name_en: "LED Strip Driver",

                types: [

                    {
                        id: "5a",
                        show: true,
                        name_hi: "5A",
                        name_en: "5A",
                        subTypes: []
                    },

                    {
                        id: "10a",
                        show: true,
                        name_hi: "10A",
                        name_en: "10A",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "batten-holder",
                show: true,

                name_hi: "Batten Holder",
                name_en: "Batten Holder",

                types: [

                    {
                        id: "normal",
                        show: true,
                        name_hi: "Normal",
                        name_en: "Normal",
                        subTypes: []
                    },

                    {
                        id: "modular",
                        show: true,
                        name_hi: "Modular",
                        name_en: "Modular",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "angle-holder",
                show: true,

                name_hi: "Angle Holder",
                name_en: "Angle Holder",

                types: [

                    {
                        id: "normal",
                        show: true,
                        name_hi: "Normal",
                        name_en: "Normal",
                        subTypes: []
                    },

                    {
                        id: "modular",
                        show: true,
                        name_hi: "Modular",
                        name_en: "Modular",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "instant-glue",
                show: true,

                name_hi: "Instant Glue",
                name_en: "Instant Glue",

                types: [],
                brands: []
            },


            {
                id: "araldite-glue",
                show: true,

                name_hi: "Araldite Glue",
                name_en: "Araldite Glue",

                types: [],
                brands: []
            },


            {
                id: "screw",
                show: true,

                name_hi: "Screw",
                name_en: "Screw",

                types: [

                    "1\"",
                    "1.5\"",
                    "2\"",
                    "2.5\"",
                    "3\""

                ].map(
                    (name, index) => ({

                        id:
                            "screw-" +
                            (index + 1),

                        show: true,

                        name_hi: name,
                        name_en: name,

                        subTypes: []

                    })
                ),

                brands: []
            },


            {
                id: "round-sheet",
                show: true,

                name_hi: "Round Sheet",
                name_en: "Round Sheet",

                types: [

                    {
                        id: "pvc",
                        show: true,
                        name_hi: "PVC",
                        name_en: "PVC",
                        subTypes: []
                    },

                    {
                        id: "mica",
                        show: true,
                        name_hi: "Mica",
                        name_en: "Mica",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "electrical-tape-final",
                show: true,

                name_hi: "Electrical Tape",
                name_en: "Electrical Tape",

                types: [

                    "Red",
                    "Black",
                    "White",
                    "Green",
                    "Blue",
                    "Yellow"

                ].map(
                    (name, index) => ({

                        id:
                            "tape-" +
                            (index + 1),

                        show: true,

                        name_hi: name,
                        name_en: name,

                        subTypes: []

                    })
                ),

                brands: []
            },


            {
                id: "dp-switch",
                show: true,

                name_hi: "DP Switch",
                name_en: "DP Switch",

                types: [
                    "16A",
                    "20A",
                    "25A",
                    "32A"
                ].map(
                    (name, index) => ({

                        id:
                            "dp-switch-" +
                            (index + 1),

                        show: true,

                        name_hi: name,
                        name_en: name,

                        subTypes: []

                    })
                ),

                brands: []
            },


            {
                id: "sp-mcb",
                show: true,

                name_hi: "SP MCB",
                name_en: "SP MCB",

                types: [
                    "10A",
                    "16A",
                    "20A",
                    "25A",
                    "32A",
                    "40A"
                ].map(
                    (name, index) => ({

                        id:
                            "sp-mcb-" +
                            (index + 1),

                        show: true,

                        name_hi: name,
                        name_en: name,

                        subTypes: []

                    })
                ),

                brands: []
            },


            {
                id: "dp-mcb",
                show: true,

                name_hi: "DP MCB",
                name_en: "DP MCB",

                types: [
                    "16A",
                    "25A",
                    "32A",
                    "40A",
                    "63A"
                ].map(
                    (name, index) => ({

                        id:
                            "dp-mcb-" +
                            (index + 1),

                        show: true,

                        name_hi: name,
                        name_en: name,

                        subTypes: []

                    })
                ),

                brands: []
            },


            {
                id: "tpn-mcb",
                show: true,

                name_hi: "TPN MCB",
                name_en: "TPN MCB",

                types: [
                    "32A",
                    "40A",
                    "63A"
                ].map(
                    (name, index) => ({

                        id:
                            "tpn-mcb-" +
                            (index + 1),

                        show: true,

                        name_hi: name,
                        name_en: name,

                        subTypes: []

                    })
                ),

                brands: []
            },


            {
                id: "mcb-changeover",
                show: true,

                name_hi: "MCB Changeover",
                name_en: "MCB Changeover",

                types: [
                    "32A",
                    "40A",
                    "63A"
                ].map(
                    (name, index) => ({

                        id:
                            "changeover-" +
                            (index + 1),

                        show: true,

                        name_hi: name,
                        name_en: name,

                        subTypes: []

                    })
                ),

                brands: []
            },


            {
                id: "dp-isolator",
                show: true,

                name_hi: "DP Isolator",
                name_en: "DP Isolator",

                types: [
                    "40A",
                    "63A",
                    "100A"
                ].map(
                    (name, index) => ({

                        id:
                            "dp-isolator-" +
                            (index + 1),

                        show: true,

                        name_hi: name,
                        name_en: name,

                        subTypes: []

                    })
                ),

                brands: []
            },


            {
                id: "tpn-isolator",
                show: true,

                name_hi: "TPN Isolator",
                name_en: "TPN Isolator",

                types: [
                    "32A",
                    "40A",
                    "63A"
                ].map(
                    (name, index) => ({

                        id:
                            "tpn-isolator-" +
                            (index + 1),

                        show: true,

                        name_hi: name,
                        name_en: name,

                        subTypes: []

                    })
                ),

                brands: []
            },


            {
                id: "rccb-rcd",
                show: true,

                name_hi: "RCCB / RCD",
                name_en: "RCCB / RCD",

                types: [

                    {
                        id: "30ma-25a",
                        show: true,

                        name_hi: "30mA • 25A",
                        name_en: "30mA • 25A",

                        subTypes: []
                    },

                    {
                        id: "30ma-40a",
                        show: true,

                        name_hi: "30mA • 40A",
                        name_en: "30mA • 40A",

                        subTypes: []
                    },

                    {
                        id: "30ma-63a",
                        show: true,

                        name_hi: "30mA • 63A",
                        name_en: "30mA • 63A",

                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "kit-kat-fuse",
                show: true,

                name_hi: "Kit Kat Fuse",
                name_en: "Kit Kat Fuse",

                types: [
                    "32A / 415V",
                    "63A / 415V",
                    "100A / 415V"
                ].map(
                    (name, index) => ({

                        id:
                            "kitkat-" +
                            (index + 1),

                        show: true,

                        name_hi: name,
                        name_en: name,

                        subTypes: []

                    })
                ),

                brands: []
            },


            {
                id: "pin-type-copper-lug",
                show: true,

                name_hi: "Pin Type Copper Lug",
                name_en: "Pin Type Copper Lug",

                types: [
                    "2.5mm",
                    "4mm",
                    "6mm",
                    "10mm"
                ].map(
                    (name, index) => ({

                        id:
                            "lug-" +
                            (index + 1),

                        show: true,

                        name_hi: name,
                        name_en: name,

                        subTypes: []

                    })
                ),

                brands: []
            },


            {
                id: "final-pop",
                show: true,

                name_hi: "Pop",
                name_en: "Pop",

                types: [],
                brands: []
            },


            {
                id: "final-putty-blade",
                show: true,

                name_hi: "Putty Blade / Patta",
                name_en: "Putty Blade / Patta",

                types: [],
                brands: []
            }

        ]
    },


    /* =====================================================
       FALSE CEILING WIRING
    ===================================================== */

    {
        id: "false-ceiling",
        stage: "false-ceiling",
        show: true,

        name_hi: "False Ceiling Wiring Material",
        name_en: "False Ceiling Wiring Material",

        materials: [

            {
                id: "fc-wire",
                show: true,

                name_hi: "Wire",
                name_en: "Wire",

                types: [

                    {
                        id: "fr",
                        show: true,

                        name_hi: "FR",
                        name_en: "FR",

                        subTypes: [

                            {
                                id: "075",
                                show: true,
                                name_hi: "0.75 Sqmm",
                                name_en: "0.75 Sqmm",

                                colors: [
                                    "Red",
                                    "Black",
                                    "Yellow",
                                    "Blue",
                                    "Green",
                                    "White",
                                    "Grey"
                                ]
                            },

                            {
                                id: "1",
                                show: true,
                                name_hi: "1 Sqmm",
                                name_en: "1 Sqmm",

                                colors: [
                                    "Red",
                                    "Black",
                                    "Yellow",
                                    "Blue",
                                    "Green",
                                    "White",
                                    "Grey"
                                ]
                            },

                            {
                                id: "15",
                                show: true,
                                name_hi: "1.5 Sqmm",
                                name_en: "1.5 Sqmm",

                                colors: [
                                    "Red",
                                    "Black",
                                    "Yellow",
                                    "Blue",
                                    "Green",
                                    "White",
                                    "Grey"
                                ]
                            },

                            {
                                id: "25",
                                show: true,
                                name_hi: "2.5 Sqmm",
                                name_en: "2.5 Sqmm",

                                colors: [
                                    "Red",
                                    "Black",
                                    "Yellow",
                                    "Blue",
                                    "Green",
                                    "White",
                                    "Grey"
                                ]
                            },

                            {
                                id: "4",
                                show: true,
                                name_hi: "4 Sqmm",
                                name_en: "4 Sqmm",

                                colors: [
                                    "Red",
                                    "Black",
                                    "Yellow",
                                    "Blue",
                                    "Green",
                                    "White",
                                    "Grey"
                                ]
                            },

                            {
                                id: "6",
                                show: true,
                                name_hi: "6 Sqmm",
                                name_en: "6 Sqmm",

                                colors: [
                                    "Red",
                                    "Black",
                                    "Yellow",
                                    "Blue",
                                    "Green",
                                    "White",
                                    "Grey"
                                ]
                            },

                            {
                                id: "10",
                                show: true,
                                name_hi: "10 Sqmm",
                                name_en: "10 Sqmm",

                                colors: [
                                    "Red",
                                    "Black",
                                    "Yellow",
                                    "Blue",
                                    "Green",
                                    "White",
                                    "Grey"
                                ]
                            }

                        ]
                    }

                ],

                brands: []
            },


            {
                id: "fc-electrical-tape",
                show: true,

                name_hi: "Electrical Tape",
                name_en: "Electrical Tape",

                types: [],
                brands: []
            },


            {
                id: "fc-pipe",
                show: true,

                name_hi: "Pipe",
                name_en: "Pipe",

                types: [

                    {
                        id: "heavy",
                        show: true,
                        name_hi: "Heavy",
                        name_en: "Heavy",
                        subTypes: []
                    },

                    {
                        id: "medium",
                        show: true,
                        name_hi: "Medium",
                        name_en: "Medium",
                        subTypes: []
                    },

                    {
                        id: "light",
                        show: true,
                        name_hi: "Light",
                        name_en: "Light",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "fc-long-bend",
                show: true,

                name_hi: "Long Bend",
                name_en: "Long Bend",

                types: [],
                brands: []
            },


            {
                id: "fc-junction-box",
                show: true,

                name_hi: "Junction Box 4 Way (Dibby)",
                name_en: "Junction Box 4 Way (Dibby)",

                types: [],
                brands: []
            },


            {
                id: "zip-tie",
                show: true,

                name_hi: "Zip Tie / Cable Tie",
                name_en: "Zip Tie / Cable Tie",

                types: [

                    {
                        id: "300mm",
                        show: true,
                        name_hi: "300mm",
                        name_en: "300mm",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "fc-flexible-pipe",
                show: true,

                name_hi: "Flexible Pipe",
                name_en: "Flexible Pipe",

                types: [

                    {
                        id: "075",
                        show: true,
                        name_hi: '0.75"',
                        name_en: '0.75"',
                        subTypes: []
                    },

                    {
                        id: "1",
                        show: true,
                        name_hi: '1"',
                        name_en: '1"',
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "saddle-clamp",
                show: true,

                name_hi: "Saddle Clamp",
                name_en: "Saddle Clamp",

                types: [

                    {
                        id: "25mm",
                        show: true,
                        name_hi: "25 mm",
                        name_en: "25 mm",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "cable-clip",
                show: true,

                name_hi: "Cable Clip",
                name_en: "Cable Clip",

                types: [

                    {
                        id: "25mm",
                        show: true,
                        name_hi: "25mm",
                        name_en: "25mm",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "fc-screw",
                show: true,

                name_hi: "Screw",
                name_en: "Screw",

                types: [

                    {
                        id: "1",
                        show: true,
                        name_hi: '1"',
                        name_en: '1"',
                        subTypes: []
                    },

                    {
                        id: "15",
                        show: true,
                        name_hi: '1.5"',
                        name_en: '1.5"',
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "fc-fastener",
                show: true,

                name_hi: "Fastener",
                name_en: "Fastener",

                types: [

                    {
                        id: "m10",
                        show: true,
                        name_hi: "M10",
                        name_en: "M10",
                        subTypes: []
                    },

                    {
                        id: "m12",
                        show: true,
                        name_hi: "M12",
                        name_en: "M12",
                        subTypes: []
                    }

                ],

                brands: []
            },


            {
                id: "fan-rod",
                show: true,

                name_hi: "Fan Rod",
                name_en: "Fan Rod",

                types: [],
                brands: []
            },


            {
                id: "fan-clamp",
                show: true,

                name_hi: "Fan Clamp",
                name_en: "Fan Clamp",

                types: [],
                brands: []
            },


            {
                id: "pvc-wall-plug",
                show: true,

                name_hi: "PVC Wall Plug / Gulli / Gitti",
                name_en: "PVC Wall Plug / Gulli / Gitti",

                types: [],
                brands: []
            },


            {
                id: "washer",
                show: true,

                name_hi: "Washer",
                name_en: "Washer",

                types: [],
                brands: []
            },


            {
                id: "chain",
                show: true,

                name_hi: "Chain",
                name_en: "Chain",

                types: [],
                brands: []
            }

        ]
    }

];


/* =========================================================
   GLOBAL BRAND CONFIGURATION
   ---------------------------------------------------------
   Brand is ALWAYS the LAST selection.
========================================================= */

window.MATERIAL_BRAND_CONFIG = {

    show: true,

    allowSkip: true,

    allowNonBrand: true,

    options: [

        {
            id: "non-brand",
            show: true,

            name_hi: "Non Brand / Local",
            name_en: "Non Brand / Local"
        },

        {
            id: "skip",
            show: true,

            name_hi: "Brand Skip करें",
            name_en: "Skip Brand"
        }

    ]

};


/* =========================================================
   COLOR CONFIGURATION
   ---------------------------------------------------------
   Heading will be COLOR NAME.
========================================================= */

window.MATERIAL_COLOR_CONFIG = {

    show: true,

    colors: [

        {
            id: "red",
            show: true,
            name_hi: "Red",
            name_en: "Red"
        },

        {
            id: "black",
            show: true,
            name_hi: "Black",
            name_en: "Black"
        },

        {
            id: "yellow",
            show: true,
            name_hi: "Yellow",
            name_en: "Yellow"
        },

        {
            id: "blue",
            show: true,
            name_hi: "Blue",
            name_en: "Blue"
        },

        {
            id: "green",
            show: true,
            name_hi: "Green",
            name_en: "Green"
        },

        {
            id: "white",
            show: true,
            name_hi: "White",
            name_en: "White"
        },

        {
            id: "grey",
            show: true,
            name_hi: "Grey",
            name_en: "Grey"
        }

    ]

};


/* =========================================================
   CATALOGUE SETTINGS
========================================================= */

window.MATERIAL_CATALOG_SETTINGS = {

    showStageMenu: true,

    showAllMaterials: true,

    showSearch: true,

    showHindiEnglish: true,

    showBrand: true,

    showColor: true,

    showQty: true,

    showRate: true,

    allowEditFinalEstimate: true,

    allowDeleteFinalEstimate: true,

    allowAddFromFinalEstimate: true

};


/* =========================================================
   END MATERIAL CATALOG
========================================================= */
