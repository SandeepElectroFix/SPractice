/* =========================================================
   SANDEEP ELECTROFIX
   MATERIAL ESTIMATE SYSTEM
   MATERIAL MASTER DATABASE
   Version 1.0.0

   STRUCTURE:
   Stage
   └── Material
       └── Type
           └── Sub Type
               └── Color
                   └── Brand
                       └── Unit
========================================================= */

window.MATERIAL_DATA = [

/* =========================================================
   STAGE 1
   SLAB CONDUIT INSTALLATION
========================================================= */

{
    id: "stage1",
    show: true,
    name_hi: "स्लैब कंड्यूट इंस्टॉलेशन",
    name_en: "Slab Conduit Installation",
    icon: "🏗️",

    materials: [

        {
            id: "pipe",
            show: true,
            name_hi: "पाइप",
            name_en: "Pipe",
            types: [
                {
                    id: "heavy",
                    show: true,
                    name_hi: "भारी",
                    name_en: "Heavy"
                },
                {
                    id: "medium",
                    show: true,
                    name_hi: "माध्यम",
                    name_en: "Medium"
                },
                {
                    id: "light",
                    show: true,
                    name_hi: "हल्का",
                    name_en: "Light"
                }
            ],
            brands: [
                "Polycab",
                "AKG",
                "Precision",
                "Finolex",
                "Supreme"
            ],
            unit: "bundle",
            unit_hi: "बंडल",
            unit_en: "Bundle"
        },

        {
            id: "long-bend",
            show: true,
            name_hi: "लॉन्ग बेंड",
            name_en: "Long Bend",
            types: [
                {
                    id: "heavy",
                    show: true,
                    name_hi: "भारी",
                    name_en: "Heavy"
                },
                {
                    id: "medium",
                    show: true,
                    name_hi: "माध्यम",
                    name_en: "Medium"
                },
                {
                    id: "light",
                    show: true,
                    name_hi: "हल्का",
                    name_en: "Light"
                }
            ],
            brands: [],
            unit: "pcs",
            unit_hi: "पीस",
            unit_en: "Pcs"
        },

        {
            id: "deep-junction-box",
            show: true,
            name_hi: "डीप जंक्शन बॉक्स",
            name_en: "Deep Junction Box",
            types: [],
            brands: [],
            unit: "pcs",
            unit_hi: "पीस",
            unit_en: "Pcs"
        },

        {
            id: "fan-box",
            show: true,
            name_hi: "फैन बॉक्स",
            name_en: "Fan Box",
            types: [],
            brands: [],
            unit: "pcs",
            unit_hi: "पीस",
            unit_en: "Pcs"
        },

        {
            id: "light-box",
            show: true,
            name_hi: "लाइट बॉक्स",
            name_en: "Light Box",
            types: [],
            brands: [],
            unit: "pcs",
            unit_hi: "पीस",
            unit_en: "Pcs"
        },

        {
            id: "tape-3",
            show: true,
            name_hi: '3" टेप',
            name_en: '3" Tape',
            types: [],
            brands: [],
            unit: "pcs",
            unit_hi: "पीस",
            unit_en: "Pcs"
        },

        {
            id: "solvent-cement",
            show: true,
            name_hi: "सॉल्वेंट सीमेंट",
            name_en: "Solvent Cement",
            types: [],
            brands: [],
            unit: "pcs",
            unit_hi: "पीस",
            unit_en: "Pcs"
        },

        {
            id: "neel-powder",
            show: true,
            name_hi: "नील पाउडर",
            name_en: "Neel Powder",
            types: [],
            brands: [],
            unit: "kg",
            unit_hi: "किलो",
            unit_en: "Kg"
        },

        {
            id: "binding-wire",
            show: true,
            name_hi: "कच्चा तार",
            name_en: "Binding Wire",
            types: [],
            brands: [],
            unit: "kg",
            unit_hi: "किलो",
            unit_en: "Kg"
        },

        {
            id: "cable-tie",
            show: true,
            name_hi: "केबल टाई",
            name_en: "Cable Tie",
            types: [],
            brands: [],
            unit: "pcs",
            unit_hi: "पीस",
            unit_en: "Pcs"
        }

    ]
},

/* =========================================================
   STAGE 2
   WALL CONDUIT INSTALLATION
========================================================= */

{
    id: "stage2",
    show: true,
    name_hi: "वॉल कंड्यूट इंस्टॉलेशन",
    name_en: "Wall Conduit Installation",
    icon: "🧱",

    materials: [

        {
            id: "gi-board",
            show: true,
            name_hi: "जीआई बोर्ड / मेटल बॉक्स",
            name_en: "GI Board / Metal Box",

            types: [
                { id:"2m", show:true, name_hi:"2 मॉड्यूल", name_en:"2 Module" },
                { id:"3m", show:true, name_hi:"3 मॉड्यूल", name_en:"3 Module" },
                { id:"4m", show:true, name_hi:"4 मॉड्यूल", name_en:"4 Module" },
                { id:"6m", show:true, name_hi:"6 मॉड्यूल", name_en:"6 Module" },
                { id:"8sq", show:true, name_hi:"8 मॉड्यूल (चौकोर)", name_en:"8 Module Square" },
                { id:"8rect", show:true, name_hi:"8 मॉड्यूल (लम्बा)", name_en:"8 Module Rectangular" },
                { id:"12m", show:true, name_hi:"12 मॉड्यूल", name_en:"12 Module" },
                { id:"16m", show:true, name_hi:"16 मॉड्यूल", name_en:"16 Module" },
                { id:"18m", show:true, name_hi:"18 मॉड्यूल", name_en:"18 Module" }
            ],

            brands: [],
            unit: "pcs",
            unit_hi: "पीस",
            unit_en: "Pcs"
        },

        {
            id: "wall-pipe",
            show: true,
            name_hi: "पाइप",
            name_en: "Pipe",

            types: [
                { id:"heavy", show:true, name_hi:"भारी", name_en:"Heavy" },
                { id:"medium", show:true, name_hi:"माध्यम", name_en:"Medium" },
                { id:"light", show:true, name_hi:"हल्का", name_en:"Light" }
            ],

            brands: [
                "Polycab",
                "AKG",
                "Precision",
                "Finolex",
                "Supreme"
            ],

            unit: "bundle",
            unit_hi: "बंडल",
            unit_en: "Bundle"
        },

        {
            id: "junction-4way",
            show: true,
            name_hi: "जंक्शन बॉक्स 4वे (डिब्बी)",
            name_en: "Junction Box 4 Way (Dibby)",
            types: [],
            brands: [],
            unit: "pcs",
            unit_hi: "पीस",
            unit_en: "Pcs"
        },

        {
            id: "wall-long-bend",
            show: true,
            name_hi: "लॉन्ग बेंड",
            name_en: "Long Bend",
            types: [],
            brands: [],
            unit: "pcs",
            unit_hi: "पीस",
            unit_en: "Pcs"
        },

        {
            id: "wall-tape",
            show: true,
            name_hi: '3" टेप',
            name_en: '3" Tape',
            types: [],
            brands: [],
            unit: "pcs",
            unit_hi: "पीस",
            unit_en: "Pcs"
        },

        {
            id: "clip-25",
            show: true,
            name_hi: "25 एमएम क्लिप",
            name_en: "25mm Clip",
            types: [],
            brands: [],
            unit: "pcs",
            unit_hi: "पीस",
            unit_en: "Pcs"
        },

        {
            id: "mcb-box-double",
            show: true,
            name_hi: "एमसीबी बॉक्स डबल डोर",
            name_en: "MCB Box Double Door",
            types: [],
            brands: [],
            unit: "pcs",
            unit_hi: "पीस",
            unit_en: "Pcs"
        }

    ]
},

/* =========================================================
   STAGE 3
   WIRING INSTALLATION
========================================================= */

{
    id: "stage3",
    show: true,
    name_hi: "वायरिंग इंस्टॉलेशन",
    name_en: "Wiring Installation",
    icon: "🔌",

    materials: [

        {
            id: "wire",
            show: true,
            name_hi: "तार",
            name_en: "Wire",

            types: [
                { id:"0.75", show:true, name_hi:"0.75 स्क्वायर एमएम", name_en:"0.75 Sqmm" },
                { id:"1", show:true, name_hi:"1 स्क्वायर एमएम", name_en:"1 Sqmm" },
                { id:"1.5", show:true, name_hi:"1.5 स्क्वायर एमएम", name_en:"1.5 Sqmm" },
                { id:"2.5", show:true, name_hi:"2.5 स्क्वायर एमएम", name_en:"2.5 Sqmm" },
                { id:"4", show:true, name_hi:"4 स्क्वायर एमएम", name_en:"4 Sqmm" },
                { id:"6", show:true, name_hi:"6 स्क्वायर एमएम", name_en:"6 Sqmm" },
                { id:"10", show:true, name_hi:"10 स्क्वायर एमएम", name_en:"10 Sqmm" }
            ],

            colors: [
                { id:"red", show:true, name_hi:"लाल", name_en:"Red" },
                { id:"black", show:true, name_hi:"काला", name_en:"Black" },
                { id:"yellow", show:true, name_hi:"पीला", name_en:"Yellow" },
                { id:"blue", show:true, name_hi:"नीला", name_en:"Blue" },
                { id:"green", show:true, name_hi:"हरा", name_en:"Green" },
                { id:"white", show:true, name_hi:"सफेद", name_en:"White" },
                { id:"grey", show:true, name_hi:"स्लेटी", name_en:"Grey" }
            ],

            brands: [
                "Polycab",
                "Finolex",
                "Havells",
                "RR Kabel",
                "KEI",
                "Anchor"
            ],

            unit: "meter",
            unit_hi: "मीटर",
            unit_en: "Meter"
        },

        {
            id: "electrical-tape",
            show: true,
            name_hi: "बिजली वाला टेप",
            name_en: "Electrical Tape",

            types: [],
            colors: [
                { id:"red", show:true, name_hi:"लाल", name_en:"Red" },
                { id:"black", show:true, name_hi:"काला", name_en:"Black" },
                { id:"white", show:true, name_hi:"सफेद", name_en:"White" },
                { id:"green", show:true, name_hi:"हरा", name_en:"Green" },
                { id:"blue", show:true, name_hi:"नीला", name_en:"Blue" },
                { id:"yellow", show:true, name_hi:"पीला", name_en:"Yellow" }
            ],
            brands: [],
            unit: "pcs",
            unit_hi: "पीस",
            unit_en: "Pcs"
        },

        {
            id: "flexible-pipe",
            show: true,
            name_hi: "फ्लेक्सिबल पाइप",
            name_en: "Flexible Pipe",

            types: [
                { id:"0.75", show:true, name_hi:'0.75"', name_en:'0.75"' },
                { id:"1", show:true, name_hi:'1"', name_en:'1"' }
            ],

            brands: [],
            unit: "meter",
            unit_hi: "मीटर",
            unit_en: "Meter"
        },

        {
            id: "steel-spring-wire",
            show: true,
            name_hi: "स्टील तार / स्प्रिंग तार",
            name_en: "Steel Wire / Spring Wire",
            types: [],
            brands: [],
            unit: "meter",
            unit_hi: "मीटर",
            unit_en: "Meter"
        },

        {
            id: "pop",
            show: true,
            name_hi: "पीओपी",
            name_en: "POP",
            types: [],
            brands: [],
            unit: "kg",
            unit_hi: "किलो",
            unit_en: "Kg"
        },

        {
            id: "putty-blade",
            show: true,
            name_hi: "पुट्टी वाला पत्ता",
            name_en: "Putty Blade / Patta",
            types: [],
            brands: [],
            unit: "pcs",
            unit_hi: "पीस",
            unit_en: "Pcs"
        },

        {
            id: "fastener",
            show: true,
            name_hi: "फास्टनर",
            name_en: "Fastener",

            types: [
                { id:"m10", show:true, name_hi:"एम 10", name_en:"M10" },
                { id:"m12", show:true, name_hi:"एम 12", name_en:"M12" }
            ],

            brands: [],
            unit: "pcs",
            unit_hi: "पीस",
            unit_en: "Pcs"
        }

    ]
},

/* =========================================================
   STAGE 4
   FINAL ELECTRICAL FITTINGS
========================================================= */

{
    id: "stage4",
    show: true,
    name_hi: "फाइनल इलेक्ट्रिकल फिटिंग",
    name_en: "Final Electrical Fittings",
    icon: "💡",

    materials: [

        {
            id:"modular-sheet",
            show:true,
            name_hi:"मॉड्यूलर प्लेट",
            name_en:"Modular Sheet",
            types:[
                {id:"2",show:true,name_hi:"2 मॉड्यूल",name_en:"2 Module"},
                {id:"3",show:true,name_hi:"3 मॉड्यूल",name_en:"3 Module"},
                {id:"4",show:true,name_hi:"4 मॉड्यूल",name_en:"4 Module"},
                {id:"6",show:true,name_hi:"6 मॉड्यूल",name_en:"6 Module"},
                {id:"8sq",show:true,name_hi:"8 मॉड्यूल (चौकोर)",name_en:"8 Module Square"},
                {id:"8rect",show:true,name_hi:"8 मॉड्यूल (लम्बा)",name_en:"8 Module Rectangular"},
                {id:"12",show:true,name_hi:"12 मॉड्यूल",name_en:"12 Module"},
                {id:"16",show:true,name_hi:"16 मॉड्यूल",name_en:"16 Module"},
                {id:"18",show:true,name_hi:"18 मॉड्यूल",name_en:"18 Module"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"switch",
            show:true,
            name_hi:"स्विच",
            name_en:"Switch",
            types:[
                {id:"6a",show:true,name_hi:"6 एम्पेयर",name_en:"6A"},
                {id:"16a",show:true,name_hi:"16 एम्पेयर",name_en:"16A"}
            ],
            brands:["Anchor","Havells","Legrand","GM","Goldmedal","Schneider"],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"socket",
            show:true,
            name_hi:"सॉकेट",
            name_en:"Socket",
            types:[
                {id:"6a",show:true,name_hi:"6 एम्पेयर",name_en:"6A"},
                {id:"16a",show:true,name_hi:"16 एम्पेयर",name_en:"16A"}
            ],
            brands:["Anchor","Havells","Legrand","GM","Goldmedal"],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"mini-mcb",
            show:true,
            name_hi:"मिनी एमसीबी",
            name_en:"Mini MCB",
            types:[
                {id:"6a",show:true,name_hi:"6 एम्पेयर",name_en:"6A"},
                {id:"10a",show:true,name_hi:"10 एम्पेयर",name_en:"10A"},
                {id:"16a",show:true,name_hi:"16 एम्पेयर",name_en:"16A"},
                {id:"20a",show:true,name_hi:"20 एम्पेयर",name_en:"20A"},
                {id:"25a",show:true,name_hi:"25 एम्पेयर",name_en:"25A"},
                {id:"32a",show:true,name_hi:"32 एम्पेयर",name_en:"32A"}
            ],
            brands:["Schneider","Havells","Legrand","L&T","Siemens","Polycab"],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"fan-regulator",
            show:true,
            name_hi:"फैन रेगुलेटर",
            name_en:"Fan Regulator",
            types:[
                {id:"1m",show:true,name_hi:"1 मॉड्यूल",name_en:"1M"},
                {id:"2m",show:true,name_hi:"2 मॉड्यूल",name_en:"2M"}
            ],
            brands:["Anchor","Havells","Legrand","GM"],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"two-way-switch",
            show:true,
            name_hi:"2वे स्विच",
            name_en:"2 Way Switch",
            types:[
                {id:"6a",show:true,name_hi:"6 एम्पेयर",name_en:"6A"},
                {id:"16a",show:true,name_hi:"16 एम्पेयर",name_en:"16A"}
            ],
            brands:["Anchor","Havells","Legrand","GM"],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"bell-push",
            show:true,
            name_hi:"बेल पुश (घन्टी स्विच)",
            name_en:"Bell Push",
            types:[
                {id:"1m",show:true,name_hi:"1 मॉड्यूल",name_en:"1M"},
                {id:"2m",show:true,name_hi:"2 मॉड्यूल",name_en:"2M"}
            ],
            brands:["Anchor","Havells","Legrand","GM"],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"neon-indicator",
            show:true,
            name_hi:"निऑन इंडिकेटर",
            name_en:"Neon Indicator",
            types:[],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"blank-plate",
            show:true,
            name_hi:"ब्लेंक प्लेट / डमी स्विच",
            name_en:"Blank Plate / Dummy Switch",
            types:[],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"fan-sheet",
            show:true,
            name_hi:"फैन शीट",
            name_en:"Fan Sheet",
            types:[
                {id:"pvc",show:true,name_hi:"पीवीसी",name_en:"PVC"},
                {id:"mica",show:true,name_hi:"माइका",name_en:"Mica"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"door-bell",
            show:true,
            name_hi:"डोर बेल (घन्टी)",
            name_en:"Door Bell",
            types:[],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"ceiling-rose",
            show:true,
            name_hi:"सीलिंग रोज",
            name_en:"Ceiling Rose",
            types:[],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"led-bulb",
            show:true,
            name_hi:"एलईडी बल्ब",
            name_en:"LED Bulb",
            types:[],
            brands:["Philips","Havells","Wipro","Syska","Crompton"],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"led-tube",
            show:true,
            name_hi:"एलईडी ट्यूब लाइट",
            name_en:"LED Tube Light",
            types:[],
            brands:["Philips","Havells","Wipro","Syska","Crompton"],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"foot-light",
            show:true,
            name_hi:"फुट लाइट",
            name_en:"Foot Light",
            types:[],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"up-down-light",
            show:true,
            name_hi:"अप डाउन लाइट",
            name_en:"Up Down Light",
            types:[],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"panel-light",
            show:true,
            name_hi:"पैनल लाइट",
            name_en:"Panel Light",
            types:[],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"surface-light",
            show:true,
            name_hi:"सरफेस लाइट",
            name_en:"Surface Light",
            types:[],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"cob-light",
            show:true,
            name_hi:"सीओबी लाइट",
            name_en:"COB Light",
            types:[],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"cob-spot",
            show:true,
            name_hi:"सीओबी स्पॉट लाइट",
            name_en:"COB Spot Light",
            types:[],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"down-light",
            show:true,
            name_hi:"डाउन लाइट",
            name_en:"Down Light",
            types:[
                {id:"warm",show:true,name_hi:"वार्म वाइट",name_en:"Warm White"},
                {id:"natural",show:true,name_hi:"नेचुरल वाइट",name_en:"Natural White"},
                {id:"cool",show:true,name_hi:"कूल वाइट",name_en:"Cool White"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"strip-light",
            show:true,
            name_hi:"स्ट्रिप लाइट",
            name_en:"Strip Light",
            types:[
                {id:"60",show:true,name_hi:"60 एलईडी/मीटर",name_en:"60 LEDs/Meter"},
                {id:"120",show:true,name_hi:"120 एलईडी/मीटर",name_en:"120 LEDs/Meter"},
                {id:"240",show:true,name_hi:"240 एलईडी/मीटर",name_en:"240 LEDs/Meter"}
            ],
            brands:[],
            unit:"meter",
            unit_hi:"मीटर",
            unit_en:"Meter"
        },

        {
            id:"rope-light",
            show:true,
            name_hi:"रोप लाइट",
            name_en:"Rope Light",
            types:[],
            brands:[],
            unit:"meter",
            unit_hi:"मीटर",
            unit_en:"Meter"
        },

        {
            id:"led-profile",
            show:true,
            name_hi:"एलईडी प्रोफाइल चैनल",
            name_en:"LED Profile Channel",
            types:[
                {id:"10ft",show:true,name_hi:"10 फीट",name_en:"10ft"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"led-driver",
            show:true,
            name_hi:"एलईडी स्ट्रिप ड्राइवर",
            name_en:"LED Strip Driver",
            types:[
                {id:"5a",show:true,name_hi:"5 एम्पेयर",name_en:"5A"},
                {id:"10a",show:true,name_hi:"10 एम्पेयर",name_en:"10A"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"batten-holder",
            show:true,
            name_hi:"बैटन होल्डर",
            name_en:"Batten Holder",
            types:[
                {id:"normal",show:true,name_hi:"नॉर्मल",name_en:"Normal"},
                {id:"modular",show:true,name_hi:"मॉड्यूलर",name_en:"Modular"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"angle-holder",
            show:true,
            name_hi:"एंगल होल्डर",
            name_en:"Angle Holder",
            types:[
                {id:"normal",show:true,name_hi:"नॉर्मल",name_en:"Normal"},
                {id:"modular",show:true,name_hi:"मॉड्यूलर",name_en:"Modular"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"instant-glue",
            show:true,
            name_hi:"इंस्टेंट ग्लू",
            name_en:"Instant Glue",
            types:[],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"screw",
            show:true,
            name_hi:"पेंच",
            name_en:"Screw",
            types:[
                {id:"1",show:true,name_hi:'1"',name_en:'1"'},
                {id:"1.5",show:true,name_hi:'1.5"',name_en:'1.5"'},
                {id:"2",show:true,name_hi:'2"',name_en:'2"'},
                {id:"2.5",show:true,name_hi:'2.5"',name_en:'2.5"'},
                {id:"3",show:true,name_hi:'3"',name_en:'3"'}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"round-sheet",
            show:true,
            name_hi:"राउंड शीट",
            name_en:"Round Sheet",
            types:[
                {id:"pvc",show:true,name_hi:"पीवीसी",name_en:"PVC"},
                {id:"mica",show:true,name_hi:"माइका",name_en:"Mica"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"dp-switch",
            show:true,
            name_hi:"डीपी स्विच",
            name_en:"DP Switch",
            types:[
                {id:"16",show:true,name_hi:"16 एम्पेयर",name_en:"16A"},
                {id:"20",show:true,name_hi:"20 एम्पेयर",name_en:"20A"},
                {id:"25",show:true,name_hi:"25 एम्पेयर",name_en:"25A"},
                {id:"32",show:true,name_hi:"32 एम्पेयर",name_en:"32A"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"sp-mcb",
            show:true,
            name_hi:"एसपी एमसीबी",
            name_en:"SP MCB",
            types:[
                {id:"6",show:true,name_hi:"6 एम्पेयर",name_en:"6A"},
                {id:"10",show:true,name_hi:"10 एम्पेयर",name_en:"10A"},
                {id:"16",show:true,name_hi:"16 एम्पेयर",name_en:"16A"},
                {id:"20",show:true,name_hi:"20 एम्पेयर",name_en:"20A"},
                {id:"25",show:true,name_hi:"25 एम्पेयर",name_en:"25A"},
                {id:"32",show:true,name_hi:"32 एम्पेयर",name_en:"32A"},
                {id:"40",show:true,name_hi:"40 एम्पेयर",name_en:"40A"}
            ],
            brands:["Schneider","Havells","Legrand","L&T","Siemens","Polycab"],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"dp-mcb",
            show:true,
            name_hi:"डीपी एमसीबी",
            name_en:"DP MCB",
            types:[
                {id:"16",show:true,name_hi:"16 एम्पेयर",name_en:"16A"},
                {id:"25",show:true,name_hi:"25 एम्पेयर",name_en:"25A"},
                {id:"32",show:true,name_hi:"32 एम्पेयर",name_en:"32A"},
                {id:"40",show:true,name_hi:"40 एम्पेयर",name_en:"40A"},
                {id:"63",show:true,name_hi:"63 एम्पेयर",name_en:"63A"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"tpn-mcb",
            show:true,
            name_hi:"टीपीएन एमसीबी",
            name_en:"TPN MCB",
            types:[
                {id:"32",show:true,name_hi:"32 एम्पेयर",name_en:"32A"},
                {id:"40",show:true,name_hi:"40 एम्पेयर",name_en:"40A"},
                {id:"63",show:true,name_hi:"63 एम्पेयर",name_en:"63A"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"mcb-changeover",
            show:true,
            name_hi:"एमसीबी चेंजओवर",
            name_en:"MCB Changeover",
            types:[
                {id:"32",show:true,name_hi:"32 एम्पेयर",name_en:"32A"},
                {id:"40",show:true,name_hi:"40 एम्पेयर",name_en:"40A"},
                {id:"63",show:true,name_hi:"63 एम्पेयर",name_en:"63A"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"dp-isolator",
            show:true,
            name_hi:"डीपी आइसोलेटर",
            name_en:"DP Isolator",
            types:[
                {id:"40",show:true,name_hi:"40 एम्पेयर",name_en:"40A"},
                {id:"63",show:true,name_hi:"63 एम्पेयर",name_en:"63A"},
                {id:"100",show:true,name_hi:"100 एम्पेयर",name_en:"100A"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"tpn-isolator",
            show:true,
            name_hi:"टीपीएन आइसोलेटर",
            name_en:"TPN Isolator",
            types:[
                {id:"32",show:true,name_hi:"32 एम्पेयर",name_en:"32A"},
                {id:"40",show:true,name_hi:"40 एम्पेयर",name_en:"40A"},
                {id:"63",show:true,name_hi:"63 एम्पेयर",name_en:"63A"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"rccb",
            show:true,
            name_hi:"आरसीसीबी / आरसीडी",
            name_en:"RCCB / RCD",
            types:[
                {id:"25",show:true,name_hi:"25 एम्पेयर",name_en:"25A"},
                {id:"40",show:true,name_hi:"40 एम्पेयर",name_en:"40A"},
                {id:"63",show:true,name_hi:"63 एम्पेयर",name_en:"63A"}
            ],
            subTypes:[
                {id:"30ma",show:true,name_hi:"30mA",name_en:"30mA"}
            ],
            brands:["Schneider","Havells","Legrand","L&T","Siemens"],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"pin-copper-lug",
            show:true,
            name_hi:"पिन टाइप कॉपर लग",
            name_en:"Pin Type Copper Lug",
            types:[
                {id:"2.5",show:true,name_hi:"2.5 एमएम",name_en:"2.5mm"},
                {id:"4",show:true,name_hi:"4 एमएम",name_en:"4mm"},
                {id:"6",show:true,name_hi:"6 एमएम",name_en:"6mm"},
                {id:"10",show:true,name_hi:"10 एमएम",name_en:"10mm"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"pop-stage4",
            show:true,
            name_hi:"पीओपी",
            name_en:"POP",
            types:[],
            brands:[],
            unit:"kg",
            unit_hi:"किलो",
            unit_en:"Kg"
        },

        {
            id:"putty-stage4",
            show:true,
            name_hi:"पुट्टी वाला पत्ता",
            name_en:"Putty Blade / Patta",
            types:[],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        }

    ]
},

/* =========================================================
   FALSE CEILING WIRING
========================================================= */

{
    id: "false-ceiling",
    show: true,
    name_hi: "फॉल्स सीलिंग वायरिंग",
    name_en: "False Ceiling Wiring",
    icon: "🏠",

    materials: [

        {
            id:"fc-wire",
            show:true,
            name_hi:"तार",
            name_en:"Wire",

            types:[
                {id:"0.75",show:true,name_hi:"0.75 स्क्वायर एमएम",name_en:"0.75 Sqmm"},
                {id:"1",show:true,name_hi:"1 स्क्वायर एमएम",name_en:"1 Sqmm"},
                {id:"1.5",show:true,name_hi:"1.5 स्क्वायर एमएम",name_en:"1.5 Sqmm"},
                {id:"2.5",show:true,name_hi:"2.5 स्क्वायर एमएम",name_en:"2.5 Sqmm"},
                {id:"4",show:true,name_hi:"4 स्क्वायर एमएम",name_en:"4 Sqmm"},
                {id:"6",show:true,name_hi:"6 स्क्वायर एमएम",name_en:"6 Sqmm"},
                {id:"10",show:true,name_hi:"10 स्क्वायर एमएम",name_en:"10 Sqmm"}
            ],

            colors:[
                {id:"red",show:true,name_hi:"लाल",name_en:"Red"},
                {id:"black",show:true,name_hi:"काला",name_en:"Black"},
                {id:"yellow",show:true,name_hi:"पीला",name_en:"Yellow"},
                {id:"blue",show:true,name_hi:"नीला",name_en:"Blue"},
                {id:"green",show:true,name_hi:"हरा",name_en:"Green"},
                {id:"white",show:true,name_hi:"सफेद",name_en:"White"},
                {id:"grey",show:true,name_hi:"स्लेटी",name_en:"Grey"}
            ],

            brands:[
                "Polycab",
                "Finolex",
                "Havells",
                "RR Kabel",
                "KEI"
            ],

            unit:"meter",
            unit_hi:"मीटर",
            unit_en:"Meter"
        },

        {
            id:"fc-tape",
            show:true,
            name_hi:"बिजली वाला टेप",
            name_en:"Electrical Tape",
            types:[],
            colors:[
                {id:"red",show:true,name_hi:"लाल",name_en:"Red"},
                {id:"black",show:true,name_hi:"काला",name_en:"Black"},
                {id:"white",show:true,name_hi:"सफेद",name_en:"White"},
                {id:"green",show:true,name_hi:"हरा",name_en:"Green"},
                {id:"blue",show:true,name_hi:"नीला",name_en:"Blue"},
                {id:"yellow",show:true,name_hi:"पीला",name_en:"Yellow"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"fc-pipe",
            show:true,
            name_hi:"पाइप",
            name_en:"Pipe",
            types:[
                {id:"heavy",show:true,name_hi:"भारी",name_en:"Heavy"},
                {id:"medium",show:true,name_hi:"माध्यम",name_en:"Medium"},
                {id:"light",show:true,name_hi:"हल्का",name_en:"Light"}
            ],
            brands:["Polycab","AKG","Precision","Finolex","Supreme"],
            unit:"bundle",
            unit_hi:"बंडल",
            unit_en:"Bundle"
        },

        {
            id:"fc-long-bend",
            show:true,
            name_hi:"लॉन्ग बेंड",
            name_en:"Long Bend",
            types:[],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"fc-junction",
            show:true,
            name_hi:"जंक्शन बॉक्स 4वे (डिब्बी)",
            name_en:"Junction Box 4 Way (Dibby)",
            types:[],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"zip-tie",
            show:true,
            name_hi:"ज़िप टाई / केबल टाई",
            name_en:"Zip Tie / Cable Tie",
            types:[
                {id:"300mm",show:true,name_hi:"300 एमएम",name_en:"300mm"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"fc-flexible",
            show:true,
            name_hi:"फ्लेक्सिबल पाइप",
            name_en:"Flexible Pipe",
            types:[
                {id:"0.75",show:true,name_hi:'0.75"',name_en:'0.75"'},
                {id:"1",show:true,name_hi:'1"',name_en:'1"'}
            ],
            brands:[],
            unit:"meter",
            unit_hi:"मीटर",
            unit_en:"Meter"
        },

        {
            id:"saddle-clamp",
            show:true,
            name_hi:"सैडल क्लैंप",
            name_en:"Saddle Clamp",
            types:[
                {id:"25mm",show:true,name_hi:"25 एमएम",name_en:"25mm"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"cable-clip",
            show:true,
            name_hi:"केबल क्लिप",
            name_en:"Cable Clip",
            types:[
                {id:"25mm",show:true,name_hi:"25 एमएम",name_en:"25mm"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"fc-screw",
            show:true,
            name_hi:"पेंच",
            name_en:"Screw",
            types:[
                {id:"1",show:true,name_hi:'1"',name_en:'1"'},
                {id:"1.5",show:true,name_hi:'1.5"',name_en:'1.5"'}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"fc-fastener",
            show:true,
            name_hi:"फास्टनर",
            name_en:"Fastener",
            types:[
                {id:"m10",show:true,name_hi:"एम 10",name_en:"M10"},
                {id:"m12",show:true,name_hi:"एम 12",name_en:"M12"}
            ],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"fan-rod",
            show:true,
            name_hi:"फैन रॉड",
            name_en:"Fan Rod",
            types:[],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"fan-clamp",
            show:true,
            name_hi:"फैन क्लैम",
            name_en:"Fan Clamp",
            types:[],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"pvc-wall-plug",
            show:true,
            name_hi:"पीवीसी वॉल प्लग / गुल्ली / गिट्टी",
            name_en:"PVC Wall Plug / Gulli / Gitti",
            types:[],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        },

        {
            id:"washer",
            show:true,
            name_hi:"वॉशर",
            name_en:"Washer",
            types:[],
            brands:[],
            unit:"pcs",
            unit_hi:"पीस",
            unit_en:"Pcs"
        }

    ]
}

/* =========================================================
   END MATERIAL DATA
========================================================= */

];


/* =========================================================
   GLOBAL SETTINGS
========================================================= */

window.MATERIAL_SETTINGS = {

    /* Language */
    defaultLanguage: "hi",

    /* Show / Hide */
    allowStageToggle: true,
    allowMaterialToggle: true,
    allowTypeToggle: true,
    allowColorToggle: true,
    allowBrandToggle: true,

    /* Brand */
    allowBrandSkip: true,
    allowNonBrand: true,
    allowCustomBrand: true,

    /* Quantity */
    allowDecimalQty: true,

    /* Units */
    allowCustomUnit: true,

    /* Price */
    allowRateEdit: true,

    /* Final Estimate */
    allowFinalEdit: true,
    allowFinalAdd: true,
    allowFinalDelete: true,

    /* Navigation */
    nestedNavigation: true,
    backButtonEnabled: true,
    browserBackNavigation: true,

    /* Search */
    searchEnabled: true,

    /* Watermark */
    watermarkEnabled: true
};


/* =========================================================
   BRAND MASTER
   सभी materials में जरूरत के अनुसार उपयोग किया जा सकता है
========================================================= */

window.BRAND_MASTER = [

    {
        id: "polycab",
        show: true,
        name_hi: "पॉलीकैब",
        name_en: "Polycab"
    },

    {
        id: "havells",
        show: true,
        name_hi: "हैवेल्स",
        name_en: "Havells"
    },

    {
        id: "finolex",
        show: true,
        name_hi: "फिनोलेक्स",
        name_en: "Finolex"
    },

    {
        id: "rr-kabel",
        show: true,
        name_hi: "आरआर केबल",
        name_en: "RR Kabel"
    },

    {
        id: "kei",
        show: true,
        name_hi: "केईआई",
        name_en: "KEI"
    },

    {
        id: "anchor",
        show: true,
        name_hi: "एंकर",
        name_en: "Anchor"
    },

    {
        id: "legrand",
        show: true,
        name_hi: "लेग्रांड",
        name_en: "Legrand"
    },

    {
        id: "schneider",
        show: true,
        name_hi: "श्नाइडर",
        name_en: "Schneider"
    },

    {
        id: "gm",
        show: true,
        name_hi: "जीएम",
        name_en: "GM"
    },

    {
        id: "goldmedal",
        show: true,
        name_hi: "गोल्डमेडल",
        name_en: "Goldmedal"
    },

    {
        id: "siemens",
        show: true,
        name_hi: "सीमेंस",
        name_en: "Siemens"
    },

    {
        id: "lt",
        show: true,
        name_hi: "एल एंड टी",
        name_en: "L&T"
    },

    {
        id: "crompton",
        show: true,
        name_hi: "क्रॉम्पटन",
        name_en: "Crompton"
    },

    {
        id: "wipro",
        show: true,
        name_hi: "विप्रो",
        name_en: "Wipro"
    },

    {
        id: "philips",
        show: true,
        name_hi: "फिलिप्स",
        name_en: "Philips"
    },

    {
        id: "syska",
        show: true,
        name_hi: "सिस्का",
        name_en: "Syska"
    },

    {
        id: "supreme",
        show: true,
        name_hi: "सुप्रीम",
        name_en: "Supreme"
    },

    {
        id: "akg",
        show: true,
        name_hi: "एकेजी",
        name_en: "AKG"
    },

    {
        id: "precision",
        show: true,
        name_hi: "प्रिसीजन",
        name_en: "Precision"
    },

    {
        id: "local",
        show: true,
        name_hi: "लोकल / बिना ब्रांड",
        name_en: "Local / Non-Brand"
    }

];


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

/* Get stage */
window.getMaterialStage = function(stageId) {

    return window.MATERIAL_DATA.find(
        stage => stage.id === stageId
    );

};


/* Get material */
window.getMaterialItem = function(stageId, materialId) {

    const stage = window.getMaterialStage(stageId);

    if (!stage) return null;

    return stage.materials.find(
        material => material.id === materialId
    );

};


/* Get visible stages */
window.getVisibleMaterialStages = function() {

    return window.MATERIAL_DATA.filter(
        stage => stage.show !== false
    );

};


/* Get visible materials */
window.getVisibleMaterials = function(stageId) {

    const stage = window.getMaterialStage(stageId);

    if (!stage) return [];

    return stage.materials.filter(
        material => material.show !== false
    );

};


/* Get visible types */
window.getVisibleMaterialTypes = function(material) {

    if (!material || !material.types) {
        return [];
    }

    return material.types.filter(
        type => type.show !== false
    );

};


/* Get visible colors */
window.getVisibleMaterialColors = function(material) {

    if (!material || !material.colors) {
        return [];
    }

    return material.colors.filter(
        color => color.show !== false
    );

};


/* Get visible brands */
window.getVisibleBrands = function(material) {

    let brands = [];

    if (material && Array.isArray(material.brands)) {
        brands = material.brands;
    }

    return brands;
};


/* =========================================================
   END
========================================================= */
