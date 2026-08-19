/* =========================================================
   SANDEEP ELECTROFIX - MATERIAL ESTIMATE SYSTEM (v3.0)
   Built-in Fallbacks for Instant Material Display
========================================================= */

"use strict";

(function () {
    // 1. Fallback Menus agar config.js load na ho
    const DEFAULT_MENUS = [
        { id: "all", name: "All Materials", icon: "🛒" },
        { id: "stage-1", name: "Stage 1", icon: "🏗️" },
        { id: "stage-2", name: "Stage 2", icon: "🧱" },
        { id: "stage-3", name: "Stage 3", icon: "🔌" },
        { id: "stage-4", name: "Stage 4", icon: "💡" },
        { id: "stage-5", name: "Stage 5", icon: "🏠" }
    ];

    const STAGE_LABELS = {
        "stage-1": "Slab Conduit Installation",
        "stage-2": "Wall Conduit Installation",
        "stage-3": "Wiring Installation",
        "stage-4": "Final Electrical Fittings",
        "stage-5": "False Ceiling Wiring"
    };

    let currentMenu = "all";
    let searchText = "";
    let estimateItems = {};
    let activeGroupOptions = {};

    function getMenus() {
        return window.MATERIAL_ESTIMATE_CONFIG?.menus || DEFAULT_MENUS;
    }

    function getMaterials() {
        return window.MATERIAL_ESTIMATE_MATERIALS || [];
    }

    document.addEventListener("DOMContentLoaded", () => {
        initClientInfo();
        initMenus();
        initSearch();
        initSelections();
        renderMaterials();
        updateGrandTotal();
    });

    function initClientInfo() {
        const nameInput = document.getElementById("clientName");
        const phoneInput = document.getElementById("clientPhone");
        if (nameInput) {
            nameInput.value = localStorage.getItem("mat_client_name") || "";
            nameInput.addEventListener("input", (e) => localStorage.setItem("mat_client_name", e.target.value));
        }
        if (phoneInput) {
            phoneInput.value = localStorage.getItem("mat_client_phone") || "";
            phoneInput.addEventListener("input", (e) => localStorage.setItem("mat_client_phone", e.target.value));
        }
    }

    function initMenus() {
        const container = document.getElementById("categoryContainer");
        if (!container) return;
        container.innerHTML = "";

        getMenus().forEach(menu => {
            if (menu.show === false) return;
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = `material-menu-button ${menu.id === currentMenu ? "active" : ""}`;
            btn.innerHTML = `<span>${menu.icon || "📦"}</span> <span>${escapeHTML(menu.name)}</span>`;
            
            btn.addEventListener("click", () => {
                currentMenu = menu.id;
                document.querySelectorAll(".material-menu-button").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                renderMaterials();
            });
            container.appendChild(btn);
        });
    }

    function initSearch() {
        const searchInput = document.getElementById("materialSearch");
        const clearBtn = document.getElementById("clearSearch");

        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                searchText = e.target.value.trim().toLowerCase();
                renderMaterials();
            });
        }
        if (clearBtn) {
            clearBtn.addEventListener("click", () => {
                if (searchInput) searchInput.value = "";
                searchText = "";
                renderMaterials();
            });
        }
    }

    function getMaterialGroups() {
        const groups = {};
        getMaterials().forEach(mat => {
            const key = `${mat.stage}__${mat.name}`;
            if (!groups[key]) {
                groups[key] = { key, stage: mat.stage, name: mat.name, materials: [] };
            }
            groups[key].materials.push(mat);
        });
        return Object.values(groups);
    }

    function initSelections() {
        getMaterialGroups().forEach(group => {
            if (!activeGroupOptions[group.key]) {
                activeGroupOptions[group.key] = group.materials[0].id;
            }
        });
    }

    function getFilteredGroups() {
        return getMaterialGroups().filter(group => {
            const stageMatch = currentMenu === "all" || group.stage === currentMenu;
            if (!stageMatch) return false;
            if (!searchText) return true;
            const fullText = `${group.name} ${group.stage} ${group.materials.map(m => m.size || "").join(" ")}`.toLowerCase();
            return fullText.includes(searchText);
        });
    }

    function getSelectedMaterial(group) {
        const activeId = activeGroupOptions[group.key];
        return group.materials.find(m => m.id === activeId) || group.materials[0];
    }

    function renderMaterials() {
        const grid = document.getElementById("productsGrid");
        const counter = document.getElementById("productCounter");
        const noProducts = document.getElementById("noProducts");
        const filtered = getFilteredGroups();

        if (counter) counter.innerText = `${filtered.length} Materials`;
        if (!grid) return;
        grid.innerHTML = "";

        if (filtered.length === 0) {
            if (noProducts) noProducts.style.display = "block";
            return;
        }
        if (noProducts) noProducts.style.display = "none";

        filtered.forEach(group => {
            const material = getSelectedMaterial(group);
            const itemData = estimateItems[material.id] || { qty: 0, rate: material.rate || 0 };
            const subtotal = (itemData.qty || 0) * (itemData.rate || 0);

            const card = document.createElement("article");
            card.className = "estimate-material-card";
            card.dataset.group = group.key;

            let optionHtml = "";
            if (group.materials.length > 1) {
                optionHtml = `
                    <div class="estimate-option-row">
                        <label>Select Option</label>
                        <select class="material-option-select">
                            ${group.materials.map(m => `<option value="${m.id}" ${m.id === material.id ? "selected" : ""}>${escapeHTML(m.size || "Standard")}</option>`).join("")}
                        </select>
                    </div>
                `;
            } else if (material.size) {
                optionHtml = `<div class="estimate-option-row"><label>Size / Type</label><div class="material-single-option">${escapeHTML(material.size)}</div></div>`;
            }

            card.innerHTML = `
                <div class="estimate-card-header">
                    <div><h3>${escapeHTML(group.name)}</h3></div>
                    <span class="material-stage">${STAGE_LABELS[group.stage] || group.stage}</span>
                </div>
                ${optionHtml}
                <div class="estimate-rate-row">
                    <label>Rate</label>
                    <div class="rate-input-wrapper">
                        <span>₹</span>
                        <input type="number" class="material-rate" value="${itemData.rate}">
                    </div>
                </div>
                <div class="estimate-quantity-row">
                    <label>Quantity</label>
                    <input type="number" class="material-quantity" value="${itemData.qty || ''}" placeholder="Enter Qty">
                </div>
                <div class="estimate-item-total">
                    <span>Item Total</span>
                    <strong class="item-total-value">₹${formatMoney(subtotal)}</strong>
                </div>
            `;

            attachCardEvents(card, group, material);
            grid.appendChild(card);
        });
    }

    function attachCardEvents(card, group, material) {
        const select = card.querySelector(".material-option-select");
        if (select) {
            select.addEventListener("change", (e) => {
                activeGroupOptions[group.key] = e.target.value;
                renderMaterials();
                updateGrandTotal();
            });
        }

        const rateInput = card.querySelector(".material-rate");
        if (rateInput) {
            rateInput.addEventListener("input", (e) => {
                const val = parseFloat(e.target.value) || 0;
                if (!estimateItems[material.id]) estimateItems[material.id] = { qty: 0, rate: val };
                estimateItems[material.id].rate = val;
                updateCardTotal(card, material);
                updateGrandTotal();
            });
        }

        const qtyInput = card.querySelector(".material-quantity");
        if (qtyInput) {
            qtyInput.addEventListener("input", (e) => {
                const val = parseFloat(e.target.value) || 0;
                if (!estimateItems[material.id]) estimateItems[material.id] = { qty: 0, rate: material.rate || 0 };
                estimateItems[material.id].qty = val;
                if (val <= 0) delete estimateItems[material.id];
                updateCardTotal(card, material);
                updateGrandTotal();
            });
        }
    }

    function updateCardTotal(card, material) {
        const item = estimateItems[material.id];
        const total = (item?.qty || 0) * (item?.rate || 0);
        const totalEl = card.querySelector(".item-total-value");
        if (totalEl) totalEl.innerText = `₹${formatMoney(total)}`;
    }

    function updateGrandTotal() {
        let grandTotal = 0;
        let count = 0;

        getMaterialGroups().forEach(group => {
            const material = getSelectedMaterial(group);
            const item = estimateItems[material.id];
            if (item && item.qty > 0) {
                count++;
                grandTotal += (item.qty * item.rate);
            }
        });

        const grandTotalEl = document.getElementById("grandTotal");
        const grandItemsEl = document.getElementById("grandTotalItems");
        if (grandTotalEl) grandTotalEl.innerText = `₹${formatMoney(grandTotal)}`;
        if (grandItemsEl) grandItemsEl.innerText = `${count} Items`;
    }

    function formatMoney(num) {
        return Number(num || 0).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    }

    function escapeHTML(str) {
        return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
})();
