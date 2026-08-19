/* =========================================================
   SANDEEP ELECTROFIX - MATERIAL ESTIMATE ENGINE (v3.0)
   Self-Contained • Fast • Direct WhatsApp Export
========================================================= */

"use strict";

(function () {
    const STAGE_MENUS = [
        { id: "all", name: "All Items", icon: "🛒" },
        { id: "stage-1", name: "Stage 1", icon: "🏗️" },
        { id: "stage-2", name: "Stage 2", icon: "🧱" },
        { id: "stage-3", name: "Stage 3", icon: "🔌" },
        { id: "stage-4", name: "Stage 4", icon: "💡" },
        { id: "stage-5", name: "Stage 5", icon: "🏠" }
    ];

    const STAGE_NAMES = {
        "stage-1": "Slab Conduit",
        "stage-2": "Wall Conduit",
        "stage-3": "Wiring",
        "stage-4": "Fittings",
        "stage-5": "Ceiling"
    };

    // Master 125 Items Dataset
    const MATERIALS = [
        /* STAGE 1 */
        { id: "s1-pipe", stage: "stage-1", name: "PVC Conduit Pipe", size: "Heavy (25mm)", rate: 85 },
        { id: "s1-bend", stage: "stage-1", name: "Long Bend", size: "Heavy (25mm)", rate: 14 },
        { id: "s1-deep-box", stage: "stage-1", name: "Deep Junction Box", size: "Heavy", rate: 35 },
        { id: "s1-fan-box", stage: "stage-1", name: "Concealed Fan Box", size: "Heavy Duty", rate: 110 },
        { id: "s1-light-box", stage: "stage-1", name: "Concealed Light Box", size: "Heavy Duty", rate: 45 },
        { id: "s1-tape", stage: "stage-1", name: "PVC Cello Tape", size: '3"', rate: 60 },
        { id: "s1-solvent", stage: "stage-1", name: "Solvent Cement", size: "100ml", rate: 50 },
        { id: "s1-neel", stage: "stage-1", name: "Neel Powder", size: "Standard", rate: 20 },
        { id: "s1-wire", stage: "stage-1", name: "GI Binding Wire", size: "Standard", rate: 90 },
        { id: "s1-tie", stage: "stage-1", name: "Nylon Cable Tie", size: "200mm", rate: 120 },

        /* STAGE 2 */
        { id: "s2-gi-2m", stage: "stage-2", name: "GI Metal Board", size: "2 Module", rate: 45 },
        { id: "s2-gi-3m", stage: "stage-2", name: "GI Metal Board", size: "3 Module", rate: 55 },
        { id: "s2-gi-4m", stage: "stage-2", name: "GI Metal Board", size: "4 Module", rate: 70 },
        { id: "s2-gi-6m", stage: "stage-2", name: "GI Metal Board", size: "6 Module", rate: 95 },
        { id: "s2-gi-8ms", stage: "stage-2", name: "GI Metal Board", size: "8 Module Sq", rate: 120 },
        { id: "s2-gi-8mr", stage: "stage-2", name: "GI Metal Board", size: "8 Module Rect", rate: 120 },
        { id: "s2-gi-12m", stage: "stage-2", name: "GI Metal Board", size: "12 Module", rate: 155 },
        { id: "s2-gi-16m", stage: "stage-2", name: "GI Metal Board", size: "16 Module", rate: 190 },
        { id: "s2-gi-18m", stage: "stage-2", name: "GI Metal Board", size: "18 Module", rate: 220 },
        { id: "s2-pipe-h", stage: "stage-2", name: "Wall Conduit Pipe", size: "Heavy (20mm)", rate: 75 },
        { id: "s2-pipe-m", stage: "stage-2", name: "Wall Conduit Pipe", size: "Medium (20mm)", rate: 60 },
        { id: "s2-pipe-l", stage: "stage-2", name: "Wall Conduit Pipe", size: "Light (20mm)", rate: 45 },
        { id: "s2-jbox", stage: "stage-2", name: "Junction Box 4-Way", size: "Standard", rate: 25 },
        { id: "s2-bend", stage: "stage-2", name: "Wall Long Bend", size: "20mm", rate: 10 },
        { id: "s2-clip", stage: "stage-2", name: "Steel Pipe Clip", size: "25mm", rate: 3 },
        { id: "s2-mcb-box", stage: "stage-2", name: "MCB Distribution Box", size: "Double Door 8-Way", rate: 850 },

        /* STAGE 3 */
        { id: "s3-w075", stage: "stage-3", name: "FR Copper Wire", size: "0.75 Sq.mm", rate: 850 },
        { id: "s3-w10", stage: "stage-3", name: "FR Copper Wire", size: "1.0 Sq.mm", rate: 1150 },
        { id: "s3-w15", stage: "stage-3", name: "FR Copper Wire", size: "1.5 Sq.mm", rate: 1650 },
        { id: "s3-w25", stage: "stage-3", name: "FR Copper Wire", size: "2.5 Sq.mm", rate: 2650 },
        { id: "s3-w40", stage: "stage-3", name: "FR Copper Wire", size: "4.0 Sq.mm", rate: 4100 },
        { id: "s3-w60", stage: "stage-3", name: "FR Copper Wire", size: "6.0 Sq.mm", rate: 6200 },
        { id: "s3-w100", stage: "stage-3", name: "FR Copper Wire", size: "10.0 Sq.mm", rate: 10200 },
        { id: "s3-tape", stage: "stage-3", name: "Insulation Tape", size: "Standard", rate: 15 },
        { id: "s3-flex-75", stage: "stage-3", name: "Flexible PVC Pipe", size: '0.75"', rate: 350 },
        { id: "s3-flex-1", stage: "stage-3", name: "Flexible PVC Pipe", size: '1.0"', rate: 450 },
        { id: "s3-spring", stage: "stage-3", name: "Steel Wire Spring", size: "50ft", rate: 180 },
        { id: "s3-pop", stage: "stage-3", name: "POP Powder", size: "1kg", rate: 25 },
        { id: "s3-patta", stage: "stage-3", name: "Putty Blade", size: "Standard", rate: 40 },
        { id: "s3-fast-10", stage: "stage-3", name: "Anchor Fastener", size: "M10", rate: 35 },
        { id: "s3-fast-12", stage: "stage-3", name: "Anchor Fastener", size: "M12", rate: 45 },

        /* STAGE 4 */
        { id: "s4-plate-2m", stage: "stage-4", name: "Modular Plate & Frame", size: "2 Module", rate: 65 },
        { id: "s4-plate-3m", stage: "stage-4", name: "Modular Plate & Frame", size: "3 Module", rate: 80 },
        { id: "s4-plate-4m", stage: "stage-4", name: "Modular Plate & Frame", size: "4 Module", rate: 95 },
        { id: "s4-plate-6m", stage: "stage-4", name: "Modular Plate & Frame", size: "6 Module", rate: 130 },
        { id: "s4-plate-8ms", stage: "stage-4", name: "Modular Plate & Frame", size: "8 Module Sq", rate: 160 },
        { id: "s4-plate-8mr", stage: "stage-4", name: "Modular Plate & Frame", size: "8 Module Rect", rate: 160 },
        { id: "s4-plate-12m", stage: "stage-4", name: "Modular Plate & Frame", size: "12 Module", rate: 210 },
        { id: "s4-plate-16m", stage: "stage-4", name: "Modular Plate & Frame", size: "16 Module", rate: 250 },
        { id: "s4-plate-18m", stage: "stage-4", name: "Modular Plate & Frame", size: "18 Module", rate: 280 },
        { id: "s4-sw-6a", stage: "stage-4", name: "Modular Switch", size: "6A", rate: 38 },
        { id: "s4-sw-16a", stage: "stage-4", name: "Modular Switch", size: "16A Power", rate: 95 },
        { id: "s4-sk-6a", stage: "stage-4", name: "Modular Socket", size: "6A 3-Pin", rate: 75 },
        { id: "s4-sk-16a", stage: "stage-4", name: "Modular Socket", size: "16A Combined", rate: 135 },
        { id: "s4-reg-1m", stage: "stage-4", name: "Fan Regulator", size: "1 Module", rate: 220 },
        { id: "s4-reg-2m", stage: "stage-4", name: "Fan Regulator", size: "2 Module", rate: 320 },
        { id: "s4-mini-16", stage: "stage-4", name: "Modular Mini MCB", size: "16A", rate: 220 },
        { id: "s4-mini-25", stage: "stage-4", name: "Modular Mini MCB", size: "25A", rate: 220 },
        { id: "s4-mini-32", stage: "stage-4", name: "Modular Mini MCB", size: "32A", rate: 240 },
        { id: "s4-bell-sw", stage: "stage-4", name: "Bell Push Switch", size: "1 Module", rate: 55 },
        { id: "s4-led-9w", stage: "stage-4", name: "LED Bulb B22", size: "9 Watt", rate: 90 },
        { id: "s4-tube-20w", stage: "stage-4", name: "LED Batten Tube", size: "20 Watt (4ft)", rate: 220 },
        { id: "s4-panel-12w", stage: "stage-4", name: "Slim Panel Light", size: "12 Watt", rate: 260 },
        { id: "s4-cob-7w", stage: "stage-4", name: "COB Focus Light", size: "7 Watt", rate: 240 },
        { id: "s4-sp-mcb-16", stage: "stage-4", name: "SP MCB 10kA", size: "16A", rate: 185 },
        { id: "s4-sp-mcb-25", stage: "stage-4", name: "SP MCB 10kA", size: "25A", rate: 185 },
        { id: "s4-sp-mcb-32", stage: "stage-4", name: "SP MCB 10kA", size: "32A", rate: 195 },
        { id: "s4-dp-mcb-32", stage: "stage-4", name: "DP MCB Main", size: "32A", rate: 480 },
        { id: "s4-dp-mcb-63", stage: "stage-4", name: "DP MCB Main", size: "63A", rate: 620 },
        { id: "s4-rccb-40a", stage: "stage-4", name: "RCCB Shock Proof", size: "40A / 30mA", rate: 1950 },
        { id: "s4-rccb-63a", stage: "stage-4", name: "RCCB Shock Proof", size: "63A / 30mA", rate: 2350 },

        /* STAGE 5 */
        { id: "s5-pipe", stage: "stage-5", name: "Ceiling Rigid Pipe", size: "20mm Medium", rate: 60 },
        { id: "s5-flex-75", stage: "stage-5", name: "Ceiling Flexible Pipe", size: '0.75" Coil', rate: 350 },
        { id: "s5-flex-1", stage: "stage-5", name: "Ceiling Flexible Pipe", size: '1.0" Coil', rate: 450 },
        { id: "s5-tie", stage: "stage-5", name: "Zip / Cable Tie", size: "300mm Heavy", rate: 160 },
        { id: "s5-saddle", stage: "stage-5", name: "GI Saddle Clamp", size: "25mm", rate: 4 },
        { id: "s5-clip", stage: "stage-5", name: "Plastic Cable Clip", size: "25mm", rate: 45 },
        { id: "s5-screw-1", stage: "stage-5", name: "Drywall Screw", size: '1"', rate: 70 },
        { id: "s5-screw-15", stage: "stage-5", name: "Drywall Screw", size: '1.5"', rate: 85 },
        { id: "s5-fan-rod", stage: "stage-5", name: "Ceiling Fan Rod", size: "1.5ft Heavy", rate: 120 },
        { id: "s5-fan-clamp", stage: "stage-5", name: "Ceiling Fan Clamp", size: "Rubber Fitted", rate: 50 },
        { id: "s5-fast-10", stage: "stage-5", name: "Fan Fastener", size: "M10 Heavy", rate: 35 },
        { id: "s5-gitti", stage: "stage-5", name: "PVC Gulli / Gitti", size: "35mm", rate: 35 }
    ];

    let currentMenu = "all";
    let searchText = "";
    let cart = {};
    let activeGroupOptions = {};

    document.addEventListener("DOMContentLoaded", () => {
        initClient();
        initStagePills();
        initSearch();
        initDefaultOptions();
        renderMaterials();
        updateSummary();
    });

    function initClient() {
        const n = document.getElementById("clientName");
        const p = document.getElementById("clientPhone");
        if (n) {
            n.value = localStorage.getItem("se_c_name") || "";
            n.addEventListener("input", e => localStorage.setItem("se_c_name", e.target.value));
        }
        if (p) {
            p.value = localStorage.getItem("se_c_phone") || "";
            p.addEventListener("input", e => localStorage.setItem("se_c_phone", e.target.value));
        }
    }

    function initStagePills() {
        const wrap = document.getElementById("categoryContainer");
        if (!wrap) return;
        wrap.innerHTML = "";

        STAGE_MENUS.forEach(menu => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = `stage-pill ${menu.id === currentMenu ? "active" : ""}`;
            btn.innerHTML = `<span>${menu.icon}</span> <span>${menu.name}</span>`;
            btn.onclick = () => {
                currentMenu = menu.id;
                document.querySelectorAll(".stage-pill").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                renderMaterials();
            };
            wrap.appendChild(btn);
        });
    }

    function initSearch() {
        const s = document.getElementById("materialSearch");
        const c = document.getElementById("clearSearch");
        if (s) {
            s.addEventListener("input", e => {
                searchText = e.target.value.trim().toLowerCase();
                if (c) c.style.display = searchText ? "block" : "none";
                renderMaterials();
            });
        }
        if (c) {
            c.addEventListener("click", () => {
                if (s) s.value = "";
                searchText = "";
                c.style.display = "none";
                renderMaterials();
            });
        }
    }

    function getGroups() {
        const groups = {};
        MATERIALS.forEach(mat => {
            const key = `${mat.stage}__${mat.name}`;
            if (!groups[key]) groups[key] = { key, stage: mat.stage, name: mat.name, items: [] };
            groups[key].items.push(mat);
        });
        return Object.values(groups);
    }

    function initDefaultOptions() {
        getGroups().forEach(g => {
            if (!activeGroupOptions[g.key]) activeGroupOptions[g.key] = g.items[0].id;
        });
    }

    function renderMaterials() {
        const grid = document.getElementById("productsGrid");
        const counter = document.getElementById("productCounter");
        if (!grid) return;

        const groups = getGroups().filter(g => {
            const stageOk = currentMenu === "all" || g.stage === currentMenu;
            if (!stageOk) return false;
            if (!searchText) return true;
            return `${g.name} ${g.stage} ${g.items.map(i => i.size).join(" ")}`.toLowerCase().includes(searchText);
        });

        if (counter) counter.innerText = `${groups.length} Materials`;
        grid.innerHTML = "";

        if (groups.length === 0) {
            grid.innerHTML = `<div style="text-align:center; padding:50px 20px; color:#94a3b8; font-size:13px;">📦 कोई सामग्री नहीं मिली</div>`;
            return;
        }

        groups.forEach(g => {
            const currentId = activeGroupOptions[g.key] || g.items[0].id;
            const item = g.items.find(i => i.id === currentId) || g.items[0];
            const data = cart[item.id] || { qty: 0, rate: item.rate };
            const subtotal = (data.qty || 0) * (data.rate || 0);

            const card = document.createElement("article");
            card.className = `material-card ${data.qty > 0 ? "has-qty" : ""}`;

            let optHtml = "";
            if (g.items.length > 1) {
                optHtml = `
                    <div class="variant-wrap">
                        <select class="variant-select" data-group="${g.key}">
                            ${g.items.map(i => `<option value="${i.id}" ${i.id === item.id ? "selected" : ""}>${i.size || "Standard"}</option>`).join("")}
                        </select>
                    </div>
                `;
            } else if (item.size) {
                optHtml = `<span class="single-size-tag">${item.size}</span>`;
            }

            card.innerHTML = `
                <div class="mat-top-row">
                    <div class="mat-title-wrap">
                        <h3>${g.name}</h3>
                        ${optHtml}
                    </div>
                    <span class="stage-badge">${STAGE_NAMES[g.stage] || g.stage}</span>
                </div>

                <div class="mat-bottom-controls">
                    <div class="rate-box">
                        <span>₹</span>
                        <input type="number" class="rate-input" data-id="${item.id}" value="${data.rate}">
                    </div>

                    <div class="stepper-box">
                        <button type="button" class="btn-step" data-id="${item.id}" data-delta="-1">−</button>
                        <input type="number" class="qty-input" data-id="${item.id}" value="${data.qty || 0}" min="0">
                        <button type="button" class="btn-step plus" data-id="${item.id}" data-delta="1">+</button>
                    </div>
                </div>
            `;

            // Events
            const select = card.querySelector(".variant-select");
            if (select) {
                select.onchange = e => {
                    activeGroupOptions[g.key] = e.target.value;
                    renderMaterials();
                    updateSummary();
                };
            }

            const rIn = card.querySelector(".rate-input");
            if (rIn) {
                rIn.oninput = e => {
                    const val = parseFloat(e.target.value) || 0;
                    if (!cart[item.id]) cart[item.id] = { qty: 0, rate: val };
                    cart[item.id].rate = val;
                    updateSummary();
                };
            }

            card.querySelectorAll(".btn-step").forEach(btn => {
                btn.onclick = () => {
                    const delta = parseInt(btn.dataset.delta);
                    if (!cart[item.id]) cart[item.id] = { qty: 0, rate: item.rate };
                    cart[item.id].qty = Math.max(0, (cart[item.id].qty || 0) + delta);
                    card.querySelector(".qty-input").value = cart[item.id].qty;
                    card.classList.toggle("has-qty", cart[item.id].qty > 0);
                    updateSummary();
                };
            });

            const qIn = card.querySelector(".qty-input");
            if (qIn) {
                qIn.oninput = e => {
                    const val = Math.max(0, parseFloat(e.target.value) || 0);
                    if (!cart[item.id]) cart[item.id] = { qty: 0, rate: item.rate };
                    cart[item.id].qty = val;
                    card.classList.toggle("has-qty", val > 0);
                    updateSummary();
                };
            }

            grid.appendChild(card);
        });
    }

    function updateSummary() {
        let total = 0;
        let count = 0;

        Object.values(cart).forEach(item => {
            if (item.qty > 0) {
                count++;
                total += item.qty * item.rate;
            }
        });

        const totalEl = document.getElementById("grandTotal");
        const countEl = document.getElementById("grandTotalItems");
        if (totalEl) totalEl.innerText = `₹${total.toLocaleString("en-IN")}`;
        if (countEl) countEl.innerText = `${count} Items`;
    }

    function sendWhatsAppQuote() {
        const name = document.getElementById("clientName")?.value.trim() || "Customer";
        const phone = document.getElementById("clientPhone")?.value.trim() || "N/A";
        const activeItems = [];

        MATERIALS.forEach(m => {
            if (cart[m.id] && cart[m.id].qty > 0) {
                activeItems.push({
                    name: m.name,
                    size: m.size,
                    rate: cart[m.id].rate,
                    qty: cart[m.id].qty,
                    total: cart[m.id].qty * cart[m.id].rate
                });
            }
        });

        if (activeItems.length === 0) {
            showToast("⚠️ कृपया पहले कम से कम एक सामग्री जोड़ें!");
            return;
        }

        const grandTotal = activeItems.reduce((sum, i) => sum + i.total, 0);

        let msg = `⚡ *Sandeep ElectroFix - Material Estimate* ⚡\n\n`;
        msg += `👤 *Client:* ${name}\n`;
        msg += `📞 *Phone:* ${phone}\n\n`;
        msg += `📋 *ESTIMATED MATERIALS:*\n`;

        activeItems.forEach((i, idx) => {
            msg += `${idx + 1}. *${i.name}* ${i.size ? `(${i.size})` : ""}\n   └ ${i.qty} Qty × ₹${i.rate} = *₹${i.total.toLocaleString("en-IN")}*\n`;
        });

        msg += `\n═══════════════════════\n`;
        msg += `🏆 *GRAND TOTAL: ₹${grandTotal.toLocaleString("en-IN")}*\n`;
        msg += `═══════════════════════\n\n`;
        msg += `_Powering Your Trust • Sandeep ElectroFix_`;

        window.open(`https://wa.me/919026036445?text=${encodeURIComponent(msg)}`, "_blank");
    }

    function resetAll() {
        if (!confirm("क्या आप सभी सामग्री और इनपुट रीसेट करना चाहते हैं?")) return;
        cart = {};
        document.getElementById("clientName").value = "";
        document.getElementById("clientPhone").value = "";
        localStorage.removeItem("se_c_name");
        localStorage.removeItem("se_c_phone");
        renderMaterials();
        updateSummary();
        showToast("✅ Estimate Reset Successful");
    }

    function showToast(msg) {
        const t = document.getElementById("appToast");
        if (!t) return;
        t.innerText = msg;
        t.classList.add("show");
        setTimeout(() => t.classList.remove("show"), 2000);
    }

    window.EstimateApp = {
        sendWhatsAppQuote,
        resetAll
    };
})();
