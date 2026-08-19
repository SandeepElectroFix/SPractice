/* =========================================================
   SANDEEP ELECTROFIX - ALL-IN-ONE MATERIAL ESTIMATE ENGINE
   (Includes 125 Materials Data + Auto Cache-Buster)
========================================================= */

"use strict";

(function () {
    // 1. Service Worker Cache Clearer (Fixes caching issue automatically)
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            for (let registration of registrations) {
                registration.unregister();
            }
        });
    }

    // 2. STAGE MENUS
    const MENUS = [
        { id: "all", name: "All Materials", icon: "🛒" },
        { id: "stage-1", name: "Stage 1", icon: "🏗️" },
        { id: "stage-2", name: "Stage 2", icon: "🧱" },
        { id: "stage-3", name: "Stage 3", icon: "🔌" },
        { id: "stage-4", name: "Stage 4", icon: "💡" },
        { id: "stage-5", name: "Stage 5", icon: "🏠" }
    ];

    const STAGE_NAMES = {
        "stage-1": "Slab Conduit",
        "stage-2": "Wall Conduit",
        "stage-3": "Wiring Work",
        "stage-4": "Final Fittings",
        "stage-5": "False Ceiling"
    };

    // 3. MASTER DATASET (All 125 Materials Embedded Directly)
    const MATERIALS = [
        /* STAGE 1 – SLAB CONDUIT */
        { id: "stage1-pipe-heavy", stage: "stage-1", name: "PVC Conduit Pipe", size: "Heavy (25mm)", rate: 85 },
        { id: "stage1-long-bend-heavy", stage: "stage-1", name: "Long Bend", size: "Heavy (25mm)", rate: 14 },
        { id: "stage1-deep-junction-box", stage: "stage-1", name: "Deep Junction Box", size: "Heavy", rate: 35 },
        { id: "stage1-fan-box", stage: "stage-1", name: "Concealed Fan Box", size: "Heavy Duty", rate: 110 },
        { id: "stage1-light-box", stage: "stage-1", name: "Concealed Light Box", size: "Heavy Duty", rate: 45 },
        { id: "stage1-tape-3inch", stage: "stage-1", name: "Pvc Cello Tape", size: '3"', rate: 60 },
        { id: "stage1-solvent-cement", stage: "stage-1", name: "Solvent Cement", size: "100ml", rate: 50 },
        { id: "stage1-neel-powder", stage: "stage-1", name: "Neel Powder", size: "Standard", rate: 20 },
        { id: "stage1-binding-wire", stage: "stage-1", name: "GI Binding Wire", size: "Standard", rate: 90 },
        { id: "stage1-cable-tie", stage: "stage-1", name: "Nylon Cable Tie", size: "200mm", rate: 120 },

        /* STAGE 2 – WALL CONDUIT */
        { id: "stage2-gi-board-2m", stage: "stage-2", name: "GI Metal Board", size: "2 Module", rate: 45 },
        { id: "stage2-gi-board-3m", stage: "stage-2", name: "GI Metal Board", size: "3 Module", rate: 55 },
        { id: "stage2-gi-board-4m", stage: "stage-2", name: "GI Metal Board", size: "4 Module", rate: 70 },
        { id: "stage2-gi-board-6m", stage: "stage-2", name: "GI Metal Board", size: "6 Module", rate: 95 },
        { id: "stage2-gi-board-8m-square", stage: "stage-2", name: "GI Metal Board", size: "8 Module Square", rate: 120 },
        { id: "stage2-gi-board-8m-rectangular", stage: "stage-2", name: "GI Metal Board", size: "8 Module Rectangular", rate: 120 },
        { id: "stage2-gi-board-12m", stage: "stage-2", name: "GI Metal Board", size: "12 Module", rate: 155 },
        { id: "stage2-gi-board-16m", stage: "stage-2", name: "GI Metal Board", size: "16 Module", rate: 190 },
        { id: "stage2-gi-board-18m", stage: "stage-2", name: "GI Metal Board", size: "18 Module", rate: 220 },
        { id: "stage2-pipe-heavy", stage: "stage-2", name: "Wall Conduit Pipe", size: "Heavy (20mm)", rate: 75 },
        { id: "stage2-pipe-medium", stage: "stage-2", name: "Wall Conduit Pipe", size: "Medium (20mm)", rate: 60 },
        { id: "stage2-pipe-light", stage: "stage-2", name: "Wall Conduit Pipe", size: "Light (20mm)", rate: 45 },
        { id: "stage2-junction-box-4way", stage: "stage-2", name: "Junction Box", size: "4 Way (Dibby)", rate: 25 },
        { id: "stage2-long-bend", stage: "stage-2", name: "Wall Long Bend", size: "20mm", rate: 10 },
        { id: "stage2-tape-3inch", stage: "stage-2", name: "Cello Tape", size: '3"', rate: 60 },
        { id: "stage2-clip-25mm", stage: "stage-2", name: "Steel Pipe Clip", size: "25mm", rate: 3 },
        { id: "stage2-mcb-box-double-door", stage: "stage-2", name: "MCB Distribution Box", size: "Double Door (8-Way)", rate: 850 },

        /* STAGE 3 – WIRING */
        { id: "stage3-wire-075", stage: "stage-3", name: "FR Copper Wire", size: "0.75 Sq.mm", rate: 850 },
        { id: "stage3-wire-1", stage: "stage-3", name: "FR Copper Wire", size: "1.0 Sq.mm", rate: 1150 },
        { id: "stage3-wire-15", stage: "stage-3", name: "FR Copper Wire", size: "1.5 Sq.mm", rate: 1650 },
        { id: "stage3-wire-25", stage: "stage-3", name: "FR Copper Wire", size: "2.5 Sq.mm", rate: 2650 },
        { id: "stage3-wire-4", stage: "stage-3", name: "FR Copper Wire", size: "4.0 Sq.mm", rate: 4100 },
        { id: "stage3-wire-6", stage: "stage-3", name: "FR Copper Wire", size: "6.0 Sq.mm", rate: 6200 },
        { id: "stage3-wire-10", stage: "stage-3", name: "FR Copper Wire", size: "10.0 Sq.mm", rate: 10200 },
        { id: "stage3-electrical-tape", stage: "stage-3", name: "Insulation Tape", size: "Standard", rate: 15 },
        { id: "stage3-flexible-pipe-075", stage: "stage-3", name: "Flexible PVC Pipe", size: '0.75"', rate: 350 },
        { id: "stage3-flexible-pipe-1", stage: "stage-3", name: "Flexible PVC Pipe", size: '1.0"', rate: 450 },
        { id: "stage3-steel-spring-wire", stage: "stage-3", name: "Wiring Steel Pulling Wire", size: "50ft", rate: 180 },
        { id: "stage3-pop", stage: "stage-3", name: "Plaster of Paris (POP)", size: "1kg", rate: 25 },
        { id: "stage3-putty-blade", stage: "stage-3", name: "Putty Blade / Patta", size: "Standard", rate: 40 },
        { id: "stage3-fastener-m10", stage: "stage-3", name: "Anchor Fastener", size: "M10", rate: 35 },
        { id: "stage3-fastener-m12", stage: "stage-3", name: "Anchor Fastener", size: "M12", rate: 45 },

        /* STAGE 4 – FINAL FITTINGS */
        { id: "stage4-modular-sheet-2m", stage: "stage-4", name: "Modular Plate & Frame", size: "2 Module", rate: 65 },
        { id: "stage4-modular-sheet-3m", stage: "stage-4", name: "Modular Plate & Frame", size: "3 Module", rate: 80 },
        { id: "stage4-modular-sheet-4m", stage: "stage-4", name: "Modular Plate & Frame", size: "4 Module", rate: 95 },
        { id: "stage4-modular-sheet-6m", stage: "stage-4", name: "Modular Plate & Frame", size: "6 Module", rate: 130 },
        { id: "stage4-modular-sheet-8m-square", stage: "stage-4", name: "Modular Plate & Frame", size: "8 Module Square", rate: 160 },
        { id: "stage4-modular-sheet-8m-rectangular", stage: "stage-4", name: "Modular Plate & Frame", size: "8 Module Rectangular", rate: 160 },
        { id: "stage4-modular-sheet-12m", stage: "stage-4", name: "Modular Plate & Frame", size: "12 Module", rate: 210 },
        { id: "stage4-modular-sheet-16m", stage: "stage-4", name: "Modular Plate & Frame", size: "16 Module", rate: 250 },
        { id: "stage4-modular-sheet-18m", stage: "stage-4", name: "Modular Plate & Frame", size: "18 Module", rate: 280 },
        { id: "stage4-switch-6a", stage: "stage-4", name: "Modular Switch", size: "6A", rate: 38 },
        { id: "stage4-switch-16a", stage: "stage-4", name: "Modular Switch", size: "16A (Power)", rate: 95 },
        { id: "stage4-socket-6a", stage: "stage-4", name: "Modular Socket", size: "6A 3-Pin", rate: 75 },
        { id: "stage4-socket-16a", stage: "stage-4", name: "Modular Socket", size: "16A Combined", rate: 135 },
        { id: "stage4-mini-mcb-6a", stage: "stage-4", name: "Modular Mini MCB", size: "6A", rate: 220 },
        { id: "stage4-mini-mcb-10a", stage: "stage-4", name: "Modular Mini MCB", size: "10A", rate: 220 },
        { id: "stage4-mini-mcb-16a", stage: "stage-4", name: "Modular Mini MCB", size: "16A", rate: 220 },
        { id: "stage4-mini-mcb-20a", stage: "stage-4", name: "Modular Mini MCB", size: "20A", rate: 220 },
        { id: "stage4-mini-mcb-25a", stage: "stage-4", name: "Modular Mini MCB", size: "25A", rate: 220 },
        { id: "stage4-mini-mcb-32a", stage: "stage-4", name: "Modular Mini MCB", size: "32A", rate: 240 },
        { id: "stage4-fan-regulator-1m", stage: "stage-4", name: "Fan Regulator", size: "1 Module Step", rate: 220 },
        { id: "stage4-fan-regulator-2m", stage: "stage-4", name: "Fan Regulator", size: "2 Module Step", rate: 320 },
        { id: "stage4-2way-switch-6a", stage: "stage-4", name: "2-Way Switch", size: "6A", rate: 65 },
        { id: "stage4-2way-switch-16a", stage: "stage-4", name: "2-Way Switch", size: "16A", rate: 120 },
        { id: "stage4-bell-push-1m", stage: "stage-4", name: "Bell Push Switch", size: "1 Module", rate: 55 },
        { id: "stage4-bell-push-2m", stage: "stage-4", name: "Bell Push Switch", size: "2 Module with Indicator", rate: 110 },
        { id: "stage4-neon-indicator", stage: "stage-4", name: "Neon Indicator", size: "1 Module", rate: 45 },
        { id: "stage4-blank-plate", stage: "stage-4", name: "Blank Plate / Dummy", size: "1 Module", rate: 18 },
        { id: "stage4-fan-sheet-pvc", stage: "stage-4", name: "Fan Sheet Cover", size: "PVC Round", rate: 35 },
        { id: "stage4-fan-sheet-mica", stage: "stage-4", name: "Fan Sheet Cover", size: "Mica Cut", rate: 45 },
        { id: "stage4-door-bell", stage: "stage-4", name: "Ding Dong Door Bell", size: "Stereo / 220V", rate: 180 },
        { id: "stage4-ceiling-rose", stage: "stage-4", name: "Ceiling Rose", size: "2 Plate", rate: 35 },
        { id: "stage4-led-bulb", stage: "stage-4", name: "LED Bulb B22", size: "9 Watt", rate: 90 },
        { id: "stage4-led-tube-light", stage: "stage-4", name: "LED Batten Tube Light", size: "20 Watt (4ft)", rate: 220 },
        { id: "stage4-foot-light", stage: "stage-4", name: "Modular Foot Light", size: "3 Module LED", rate: 280 },
        { id: "stage4-up-down-light", stage: "stage-4", name: "Exterior Up Down Light", size: "2-Way Architectural", rate: 450 },
        { id: "stage4-panel-light", stage: "stage-4", name: "Slim LED Panel Light", size: "12 Watt Round/Sq", rate: 260 },
        { id: "stage4-surface-light", stage: "stage-4", name: "Surface LED Light", size: "12 Watt Cylindrical", rate: 320 },
        { id: "stage4-cob-light", stage: "stage-4", name: "COB Focus Light", size: "7 Watt Concealed", rate: 240 },
        { id: "stage4-cob-spot-light", stage: "stage-4", name: "COB Spot Light", size: "3 Watt Deep Spot", rate: 160 },
        { id: "stage4-down-light-warm", stage: "stage-4", name: "COB Downlight", size: "Warm White (3000K)", rate: 230 },
        { id: "stage4-down-light-natural", stage: "stage-4", name: "COB Downlight", size: "Natural White (4000K)", rate: 230 },
        { id: "stage4-down-light-cool", stage: "stage-4", name: "COB Downlight", size: "Cool Day White (6500K)", rate: 230 },
        { id: "stage4-strip-light-60", stage: "stage-4", name: "LED Strip / Rope", size: "60 LEDs/Mtr (5M Roll)", rate: 280 },
        { id: "stage4-strip-light-120", stage: "stage-4", name: "LED Strip / Rope", size: "120 LEDs/Mtr (5M Roll)", rate: 420 },
        { id: "stage4-strip-light-240", stage: "stage-4", name: "LED Strip / Rope", size: "240 LEDs/Mtr (5M Roll)", rate: 650 },
        { id: "stage4-rope-light", stage: "stage-4", name: "Heavy Driverless Rope Light", size: "50 Meter Coil", rate: 2200 },
        { id: "stage4-led-profile-channel", stage: "stage-4", name: "Aluminum Profile Channel", size: "10ft Slim/Milky", rate: 180 },
        { id: "stage4-led-strip-driver-5a", stage: "stage-4", name: "LED Strip Power Supply", size: "12V 5A (Metal)", rate: 320 },
        { id: "stage4-led-strip-driver-10a", stage: "stage-4", name: "LED Strip Power Supply", size: "12V 10A (Metal)", rate: 550 },
        { id: "stage4-batten-holder-normal", stage: "stage-4", name: "Batten Bulb Holder", size: "Normal B22", rate: 30 },
        { id: "stage4-batten-holder-modular", stage: "stage-4", name: "Batten Bulb Holder", size: "Modular Type", rate: 55 },
        { id: "stage4-angle-holder-normal", stage: "stage-4", name: "Angle Bulb Holder", size: "Normal B22", rate: 30 },
        { id: "stage4-angle-holder-modular", stage: "stage-4", name: "Angle Bulb Holder", size: "Modular Type", rate: 55 },
        { id: "stage4-instant-glue", stage: "stage-4", name: "Instant Adhesive Glue", size: "Standard", rate: 10 },
        { id: "stage4-araldite-glue", stage: "stage-4", name: "Araldite Epoxy Glue", size: "Small Set", rate: 60 },
        { id: "stage4-screw-1inch", stage: "stage-4", name: "Gypsum Drywall Screw", size: '1"', rate: 70 },
        { id: "stage4-screw-15inch", stage: "stage-4", name: "Gypsum Drywall Screw", size: '1.5"', rate: 85 },
        { id: "stage4-screw-2inch", stage: "stage-4", name: "Gypsum Drywall Screw", size: '2"', rate: 110 },
        { id: "stage4-screw-25inch", stage: "stage-4", name: "Gypsum Drywall Screw", size: '2.5"', rate: 130 },
        { id: "stage4-screw-3inch", stage: "stage-4", name: "Gypsum Drywall Screw", size: '3"', rate: 150 },
        { id: "stage4-round-sheet-pvc", stage: "stage-4", name: "Round Ceiling Sheet", size: "PVC Base", rate: 25 },
        { id: "stage4-round-sheet-mica", stage: "stage-4", name: "Round Ceiling Sheet", size: "Mica Base", rate: 35 },
        { id: "stage4-electrical-tape-red", stage: "stage-4", name: "Insulation Tape", size: "Red", rate: 15 },
        { id: "stage4-electrical-tape-black", stage: "stage-4", name: "Insulation Tape", size: "Black", rate: 15 },
        { id: "stage4-electrical-tape-white", stage: "stage-4", name: "Insulation Tape", size: "White", rate: 15 },
        { id: "stage4-electrical-tape-green", stage: "stage-4", name: "Insulation Tape", size: "Green", rate: 15 },
        { id: "stage4-electrical-tape-blue", stage: "stage-4", name: "Insulation Tape", size: "Blue", rate: 15 },
        { id: "stage4-electrical-tape-yellow", stage: "stage-4", name: "Insulation Tape", size: "Yellow", rate: 15 },
        { id: "stage4-dp-switch-16a", stage: "stage-4", name: "Modular DP Switch", size: "16A Geyser/AC", rate: 240 },
        { id: "stage4-dp-switch-20a", stage: "stage-4", name: "Modular DP Switch", size: "20A", rate: 260 },
        { id: "stage4-dp-switch-25a", stage: "stage-4", name: "Modular DP Switch", size: "25A", rate: 290 },
        { id: "stage4-dp-switch-32a", stage: "stage-4", name: "Modular DP Switch", size: "32A with Indicator", rate: 340 },
        { id: "stage4-sp-mcb-10a", stage: "stage-4", name: "Single Pole MCB (10kA)", size: "10A", rate: 185 },
        { id: "stage4-sp-mcb-16a", stage: "stage-4", name: "Single Pole MCB (10kA)", size: "16A", rate: 185 },
        { id: "stage4-sp-mcb-20a", stage: "stage-4", name: "Single Pole MCB (10kA)", size: "20A", rate: 185 },
        { id: "stage4-sp-mcb-25a", stage: "stage-4", name: "Single Pole MCB (10kA)", size: "25A", rate: 185 },
        { id: "stage4-sp-mcb-32a", stage: "stage-4", name: "Single Pole MCB (10kA)", size: "32A", rate: 195 },
        { id: "stage4-sp-mcb-40a", stage: "stage-4", name: "Single Pole MCB (10kA)", size: "40A", rate: 240 },
        { id: "stage4-dp-mcb-16a", stage: "stage-4", name: "Double Pole MCB", size: "16A", rate: 450 },
        { id: "stage4-dp-mcb-25a", stage: "stage-4", name: "Double Pole MCB", size: "25A", rate: 450 },
        { id: "stage4-dp-mcb-32a", stage: "stage-4", name: "Double Pole MCB", size: "32A", rate: 480 },
        { id: "stage4-dp-mcb-40a", stage: "stage-4", name: "Double Pole MCB", size: "40A", rate: 540 },
        { id: "stage4-dp-mcb-63a", stage: "stage-4", name: "Double Pole MCB", size: "63A Main", rate: 620 },
        { id: "stage4-tpn-mcb-32a", stage: "stage-4", name: "TPN 3-Phase MCB", size: "32A", rate: 1150 },
        { id: "stage4-tpn-mcb-40a", stage: "stage-4", name: "TPN 3-Phase MCB", size: "40A", rate: 1250 },
        { id: "stage4-tpn-mcb-63a", stage: "stage-4", name: "TPN 3-Phase MCB", size: "63A", rate: 1450 },
        { id: "stage4-mcb-changeover-32a", stage: "stage-4", name: "Manual MCB Changeover", size: "DP 32A", rate: 750 },
        { id: "stage4-mcb-changeover-40a", stage: "stage-4", name: "Manual MCB Changeover", size: "DP 40A", rate: 850 },
        { id: "stage4-mcb-changeover-63a", stage: "stage-4", name: "Manual MCB Changeover", size: "DP 63A", rate: 1150 },
        { id: "stage4-dp-isolator-40a", stage: "stage-4", name: "DP Main Isolator", size: "40A", rate: 340 },
        { id: "stage4-dp-isolator-63a", stage: "stage-4", name: "DP Main Isolator", size: "63A", rate: 390 },
        { id: "stage4-dp-isolator-100a", stage: "stage-4", name: "DP Main Isolator", size: "100A", rate: 580 },
        { id: "stage4-tpn-isolator-32a", stage: "stage-4", name: "TPN 3-Phase Isolator", size: "32A", rate: 720 },
        { id: "stage4-tpn-isolator-40a", stage: "stage-4", name: "TPN 3-Phase Isolator", size: "40A", rate: 790 },
        { id: "stage4-tpn-isolator-63a", stage: "stage-4", name: "TPN 3-Phase Isolator", size: "63A", rate: 890 },
        { id: "stage4-rccb-25a-30ma", stage: "stage-4", name: "RCCB Shock Proof", size: "25A / 30mA", rate: 1750 },
        { id: "stage4-rccb-40a-30ma", stage: "stage-4", name: "RCCB Shock Proof", size: "40A / 30mA", rate: 1950 },
        { id: "stage4-rccb-63a-30ma", stage: "stage-4", name: "RCCB Shock Proof", size: "63A / 30mA", rate: 2350 },
        { id: "stage4-kitkat-32a-415v", stage: "stage-4", name: "Kit Kat Fuse", size: "32A / 415V", rate: 220 },
        { id: "stage4-kitkat-63a-415v", stage: "stage-4", name: "Kit Kat Fuse", size: "63A / 415V", rate: 380 },
        { id: "stage4-kitkat-100a-415v", stage: "stage-4", name: "Kit Kat Fuse", size: "100A / 415V", rate: 580 },
        { id: "stage4-copper-lug-25", stage: "stage-4", name: "Pin Type Copper Lug", size: "2.5mm", rate: 4 },
        { id: "stage4-copper-lug-4", stage: "stage-4", name: "Pin Type Copper Lug", size: "4.0mm", rate: 6 },
        { id: "stage4-copper-lug-6", stage: "stage-4", name: "Pin Type Copper Lug", size: "6.0mm", rate: 8 },
        { id: "stage4-copper-lug-10", stage: "stage-4", name: "Pin Type Copper Lug", size: "10.0mm", rate: 14 },
        { id: "stage4-pop", stage: "stage-4", name: "Plaster of Paris (POP)", size: "1kg", rate: 25 },
        { id: "stage4-putty-blade", stage: "stage-4", name: "Putty Blade / Patta", size: "Standard", rate: 40 },

        /* STAGE 5 – FALSE CEILING */
        { id: "stage5-wire-075", stage: "stage-5", name: "Ceiling FR Wire", size: "0.75 Sq.mm", rate: 850 },
        { id: "stage5-wire-1", stage: "stage-5", name: "Ceiling FR Wire", size: "1.0 Sq.mm", rate: 1150 },
        { id: "stage5-wire-15", stage: "stage-5", name: "Ceiling FR Wire", size: "1.5 Sq.mm", rate: 1650 },
        { id: "stage5-wire-25", stage: "stage-5", name: "Ceiling FR Wire", size: "2.5 Sq.mm", rate: 2650 },
        { id: "stage5-wire-4", stage: "stage-5", name: "Ceiling FR Wire", size: "4.0 Sq.mm", rate: 4100 },
        { id: "stage5-wire-6", stage: "stage-5", name: "Ceiling FR Wire", size: "6.0 Sq.mm", rate: 6200 },
        { id: "stage5-wire-10", stage: "stage-5", name: "Ceiling FR Wire", size: "10.0 Sq.mm", rate: 10200 },
        { id: "stage5-electrical-tape", stage: "stage-5", name: "Insulation Tape", size: "Heavy Duty", rate: 15 },
        { id: "stage5-pipe", stage: "stage-5", name: "Ceiling Rigid Pipe", size: "20mm Medium", rate: 60 },
        { id: "stage5-long-bend", stage: "stage-5", name: "Ceiling Pipe Bend", size: "20mm", rate: 10 },
        { id: "stage5-junction-box-4way", stage: "stage-5", name: "Junction Box", size: "4 Way (Dibby)", rate: 25 },
        { id: "stage5-zip-tie-300mm", stage: "stage-5", name: "Zip / Cable Tie", size: "300mm Heavy", rate: 160 },
        { id: "stage5-flexible-pipe-075", stage: "stage-5", name: "Flexible Pipe", size: '0.75" Coil', rate: 350 },
        { id: "stage5-flexible-pipe-1", stage: "stage-5", name: "Flexible Pipe", size: '1.0" Coil', rate: 450 },
        { id: "stage5-saddle-clamp-25mm", stage: "stage-5", name: "GI Saddle Clamp", size: "25mm", rate: 4 },
        { id: "stage5-cable-clip-25mm", stage: "stage-5", name: "Plastic Cable Clip", size: "25mm with Nail", rate: 45 },
        { id: "stage5-screw-1inch", stage: "stage-5", name: "Self Tapping Screw", size: '1"', rate: 70 },
        { id: "stage5-screw-15inch", stage: "stage-5", name: "Self Tapping Screw", size: '1.5"', rate: 85 },
        { id: "stage5-fastener-m10", stage: "stage-5", name: "Fan Fastener Heavy", size: "M10", rate: 35 },
        { id: "stage5-fastener-m12", stage: "stage-5", name: "Fan Fastener Heavy", size: "M12", rate: 45 },
        { id: "stage5-fan-rod", stage: "stage-5", name: "Ceiling Fan Rod", size: "1.5ft Heavy", rate: 120 },
        { id: "stage5-fan-clamp", stage: "stage-5", name: "Ceiling Fan Shackle Clamp", size: "Standard with Rubber", rate: 50 },
        { id: "stage5-pvc-wall-plug", stage: "stage-5", name: "PVC Gulli / Gitti", size: "35mm", rate: 35 },
        { id: "stage5-washer", stage: "stage-5", name: "GI Flat Washer", size: "Heavy", rate: 2 },
        { id: "stage5-chain", stage: "stage-5", name: "Heavy Chandelier Chain", size: "1 Meter", rate: 90 }
    ];

    let currentMenu = "all";
    let searchText = "";
    let estimateItems = {};
    let activeGroupOptions = {};

    function startEngine() {
        initClient();
        initCategoryButtons();
        initSearchBox();
        initOptionsDefault();
        renderAllMaterials();
        updateGrandEstimateTotal();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", startEngine);
    } else {
        startEngine();
    }

    function initClient() {
        const n = document.getElementById("clientName");
        const p = document.getElementById("clientPhone");
        if (n) {
            n.value = localStorage.getItem("s_c_n") || "";
            n.addEventListener("input", e => localStorage.setItem("s_c_n", e.target.value));
        }
        if (p) {
            p.value = localStorage.getItem("s_c_p") || "";
            p.addEventListener("input", e => localStorage.setItem("s_c_p", e.target.value));
        }
    }

    function initCategoryButtons() {
        const c = document.getElementById("categoryContainer") || document.getElementById("materialCategories");
        if (!c) return;
        c.innerHTML = "";

        MENUS.forEach(m => {
            const b = document.createElement("button");
            b.type = "button";
            b.className = `material-menu-button ${m.id === currentMenu ? "active" : ""}`;
            b.innerHTML = `<span>${m.icon}</span> <span>${m.name}</span>`;
            b.onclick = () => {
                currentMenu = m.id;
                document.querySelectorAll(".material-menu-button").forEach(x => x.classList.remove("active"));
                b.classList.add("active");
                renderAllMaterials();
            };
            c.appendChild(b);
        });
    }

    function initSearchBox() {
        const s = document.getElementById("materialSearch");
        if (s) {
            s.addEventListener("input", e => {
                searchText = e.target.value.trim().toLowerCase();
                renderAllMaterials();
            });
        }
    }

    function getGroups() {
        const groups = {};
        MATERIALS.forEach(item => {
            const key = `${item.stage}__${item.name}`;
            if (!groups[key]) groups[key] = { key, stage: item.stage, name: item.name, items: [] };
            groups[key].items.push(item);
        });
        return Object.values(groups);
    }

    function initOptionsDefault() {
        getGroups().forEach(g => {
            if (!activeGroupOptions[g.key]) activeGroupOptions[g.key] = g.items[0].id;
        });
    }

    function renderAllMaterials() {
        const grid = document.getElementById("productsGrid") || document.getElementById("materialsGrid");
        const count = document.getElementById("productCounter") || document.getElementById("materialResultCount");
        if (!grid) return;

        const groups = getGroups().filter(g => {
            const matchStage = currentMenu === "all" || g.stage === currentMenu;
            if (!matchStage) return false;
            if (!searchText) return true;
            return `${g.name} ${g.stage} ${g.items.map(i => i.size).join(" ")}`.toLowerCase().includes(searchText);
        });

        if (count) count.innerText = `${groups.length} Materials`;
        grid.innerHTML = "";

        if (groups.length === 0) {
            grid.innerHTML = `<div style="text-align:center;padding:40px;color:#888;grid-column:1/-1;">📦 No materials found</div>`;
            return;
        }

        groups.forEach(g => {
            const selId = activeGroupOptions[g.key] || g.items[0].id;
            const currentItem = g.items.find(i => i.id === selId) || g.items[0];
            const data = estimateItems[currentItem.id] || { qty: 0, rate: currentItem.rate };
            const itemTotal = (data.qty || 0) * (data.rate || 0);

            const card = document.createElement("article");
            card.className = "estimate-material-card";
            card.dataset.group = g.key;

            let optHtml = "";
            if (g.items.length > 1) {
                optHtml = `
                    <div class="estimate-option-row">
                        <label>Select Option</label>
                        <select class="material-option-select">
                            ${g.items.map(i => `<option value="${i.id}" ${i.id === currentItem.id ? "selected" : ""}>${i.size || "Standard"}</option>`).join("")}
                        </select>
                    </div>
                `;
            } else if (currentItem.size) {
                optHtml = `<div class="estimate-option-row"><label>Size / Type</label><div class="material-single-option">${currentItem.size}</div></div>`;
            }

            card.innerHTML = `
                <div class="estimate-card-header">
                    <div><h3>${g.name}</h3></div>
                    <span class="material-stage">${STAGE_NAMES[g.stage] || g.stage}</span>
                </div>
                ${optHtml}
                <div class="estimate-rate-row">
                    <label>Rate</label>
                    <div class="rate-input-wrapper">
                        <span>₹</span>
                        <input type="number" class="material-rate" value="${data.rate}">
                    </div>
                </div>
                <div class="estimate-quantity-row">
                    <label>Quantity</label>
                    <input type="number" class="material-quantity" value="${data.qty || ''}" placeholder="Enter Qty">
                </div>
                <div class="estimate-item-total">
                    <span>Item Total</span>
                    <strong class="item-total-value">₹${itemTotal.toLocaleString("en-IN")}</strong>
                </div>
            `;

            // Events
            const sel = card.querySelector(".material-option-select");
            if (sel) {
                sel.onchange = e => {
                    activeGroupOptions[g.key] = e.target.value;
                    renderAllMaterials();
                    updateGrandEstimateTotal();
                };
            }

            const rIn = card.querySelector(".material-rate");
            if (rIn) {
                rIn.oninput = e => {
                    const val = parseFloat(e.target.value) || 0;
                    if (!estimateItems[currentItem.id]) estimateItems[currentItem.id] = { qty: 0, rate: val };
                    estimateItems[currentItem.id].rate = val;
                    card.querySelector(".item-total-value").innerText = `₹${((estimateItems[currentItem.id].qty || 0) * val).toLocaleString("en-IN")}`;
                    updateGrandEstimateTotal();
                };
            }

            const qIn = card.querySelector(".material-quantity");
            if (qIn) {
                qIn.oninput = e => {
                    const val = parseFloat(e.target.value) || 0;
                    if (!estimateItems[currentItem.id]) estimateItems[currentItem.id] = { qty: 0, rate: currentItem.rate };
                    estimateItems[currentItem.id].qty = val;
                    card.querySelector(".item-total-value").innerText = `₹${(val * (estimateItems[currentItem.id].rate || 0)).toLocaleString("en-IN")}`;
                    updateGrandEstimateTotal();
                };
            }

            grid.appendChild(card);
        });
    }

    function updateGrandEstimateTotal() {
        let total = 0;
        let count = 0;

        Object.values(estimateItems).forEach(item => {
            if (item.qty > 0) {
                count++;
                total += (item.qty * (item.rate || 0));
            }
        });

        const t = document.getElementById("grandTotal") || document.getElementById("materialCartTotal");
        const c = document.getElementById("grandTotalItems") || document.getElementById("materialCartCount");
        if (t) t.innerText = `₹${total.toLocaleString("en-IN")}`;
        if (c) c.innerText = `${count} Items`;
    }
})();
