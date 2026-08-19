/* =========================================================
   SANDEEP ELECTROFIX - MATERIALS PAGE ENGINE (v2.0.0)
========================================================= */

"use strict";

(function () {
    const STAGE_MENUS = [
        { id: "all", name: "All Materials", icon: "🛒" },
        { id: "stage-1", name: "Stage 1", icon: "🏗️" },
        { id: "stage-2", name: "Stage 2", icon: "🧱" },
        { id: "stage-3", name: "Stage 3", icon: "🔌" },
        { id: "stage-4", name: "Stage 4", icon: "💡" },
        { id: "stage-5", name: "Stage 5", icon: "🏠" }
    ];

    const STAGE_ICONS = {
        "stage-1": "🏗️",
        "stage-2": "🧱",
        "stage-3": "🔌",
        "stage-4": "💡",
        "stage-5": "🏠"
    };

    let currentMenu = "all";
    let searchQuery = "";
    let materialCart = {}; // { [id]: { id, name, size, stage, rate, qty } }

    const dom = {
        cartCount: document.getElementById("materialCartCount"),
        openCartBtn: document.getElementById("openMaterialCart"),
        closeCartBtn: document.getElementById("closeMaterialCart"),
        cartDrawer: document.getElementById("materialCartDrawer"),
        cartOverlay: document.getElementById("materialCartOverlay"),
        cartItems: document.getElementById("materialCartItems"),
        cartTotal: document.getElementById("materialCartTotal"),
        clearCartBtn: document.getElementById("clearMaterialCart"),
        openEstimateBtn: document.getElementById("openMaterialEstimate"),
        estimateModal: document.getElementById("materialEstimateModal"),
        closeEstimateBtn: document.getElementById("closeMaterialEstimate"),
        estimateTableBody: document.getElementById("estimateTableBody"),
        estimateGrandTotal: document.getElementById("estimateGrandTotal"),
        search: document.getElementById("materialSearch"),
        clearSearch: document.getElementById("clearMaterialSearch"),
        categories: document.getElementById("materialCategories"),
        resultCount: document.getElementById("materialResultCount"),
        grid: document.getElementById("materialsGrid"),
        toast: document.getElementById("materialToast")
    };

    document.addEventListener("DOMContentLoaded", () => {
        loadSavedCart();
        initCategoryButtons();
        initSearchControls();
        initDrawerModalEvents();
        renderCatalogue();
        updateCartStateUI();
    });

    function initCategoryButtons() {
        if (!dom.categories) return;
        dom.categories.innerHTML = "";

        STAGE_MENUS.forEach((menu) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = `material-category-btn ${menu.id === currentMenu ? "active" : ""}`;
            btn.innerHTML = `${menu.icon} ${escapeHTML(menu.name)}`;
            btn.addEventListener("click", () => {
                currentMenu = menu.id;
                document.querySelectorAll(".material-category-btn").forEach(el => el.classList.remove("active"));
                btn.classList.add("active");
                renderCatalogue();
            });
            dom.categories.appendChild(btn);
        });
    }

    function initSearchControls() {
        if (dom.search) {
            dom.search.addEventListener("input", (e) => {
                searchQuery = e.target.value.trim().toLowerCase();
                if (dom.clearSearch) {
                    dom.clearSearch.style.display = searchQuery.length > 0 ? "flex" : "none";
                }
                renderCatalogue();
            });
        }

        if (dom.clearSearch) {
            dom.clearSearch.style.display = "none";
            dom.clearSearch.addEventListener("click", () => {
                if (dom.search) dom.search.value = "";
                searchQuery = "";
                dom.clearSearch.style.display = "none";
                renderCatalogue();
            });
        }
    }

    function getFilteredList() {
        const list = window.MATERIAL_ESTIMATE_MATERIALS || [];
        return list.filter(item => {
            const matchesStage = currentMenu === "all" || item.stage === currentMenu;
            const matchesSearch = !searchQuery ||
                item.name.toLowerCase().includes(searchQuery) ||
                (item.size && item.size.toLowerCase().includes(searchQuery)) ||
                item.stage.toLowerCase().includes(searchQuery);
            return matchesStage && matchesSearch;
        });
    }

    function renderCatalogue() {
        if (!dom.grid) return;
        const filtered = getFilteredList();

        if (dom.resultCount) {
            dom.resultCount.innerText = `${filtered.length} Materials Found`;
        }

        if (filtered.length === 0) {
            dom.grid.innerHTML = `
                <div class="materials-empty">
                    <div class="materials-empty-icon">🔍</div>
                    <h3>सामग्री नहीं मिली (No Materials Found)</h3>
                    <p>कृपया कोई अन्य नाम या श्रेणी चुनकर देखें।</p>
                </div>
            `;
            return;
        }

        dom.grid.innerHTML = filtered.map(item => {
            const inCart = materialCart[item.id];
            const qty = inCart ? inCart.qty : 0;
            const icon = STAGE_ICONS[item.stage] || "📦";
            const rate = Number(item.rate) || 0;

            return `
                <article class="material-card" id="card_${escapeHTML(item.id)}">
                    <div class="material-card-top">
                        <div class="material-icon">${icon}</div>
                        <span class="material-category-label">${escapeHTML(item.stage.toUpperCase())}</span>
                    </div>

                    <h3 class="material-name">${escapeHTML(item.name)}</h3>
                    <p class="material-description">${item.size ? escapeHTML(item.size) : "Standard Fitting Item"}</p>
                    ${item.size ? `<span class="material-size">${escapeHTML(item.size)}</span>` : ""}

                    <div class="material-price-row">
                        <span class="material-price">₹${formatMoney(rate)}</span>
                        <span class="material-unit">${item.unit ? "per " + escapeHTML(item.unit) : "per unit"}</span>
                    </div>

                    <div class="material-quantity">
                        <button type="button" class="material-qty-btn" onclick="window.MaterialApp.stepQty('${item.id}', -1)" aria-label="Minus">−</button>
                        <span class="material-qty-value" id="qty_val_${escapeHTML(item.id)}">${qty}</span>
                        <button type="button" class="material-qty-btn" onclick="window.MaterialApp.stepQty('${item.id}', 1)" aria-label="Plus">+</button>
                    </div>

                    <button type="button" 
                            class="material-add-btn ${qty > 0 ? "added" : ""}" 
                            id="add_btn_${escapeHTML(item.id)}"
                            onclick="window.MaterialApp.toggleAdd('${item.id}')">
                        ${qty > 0 ? "✓ In Cart" : "+ Add to Estimate"}
                    </button>
                </article>
            `;
        }).join("");
    }

    function stepQty(id, delta) {
        const item = (window.MATERIAL_ESTIMATE_MATERIALS || []).find(m => m.id === id);
        if (!item) return;

        if (!materialCart[id]) {
            materialCart[id] = { ...item, qty: 0 };
        }

        materialCart[id].qty += delta;

        if (materialCart[id].qty <= 0) {
            delete materialCart[id];
            showToast("Item cart se hataya gaya");
        }

        saveCart();
        updateCartStateUI();
        syncCardDOM(id);
    }

    function toggleAdd(id) {
        const item = (window.MATERIAL_ESTIMATE_MATERIALS || []).find(m => m.id === id);
        if (!item) return;

        if (!materialCart[id] || materialCart[id].qty === 0) {
            materialCart[id] = { ...item, qty: 1 };
            showToast(`✅ Added: ${item.name}`);
        } else {
            delete materialCart[id];
            showToast(`🗑️ Removed: ${item.name}`);
        }

        saveCart();
        updateCartStateUI();
        syncCardDOM(id);
    }

    function syncCardDOM(id) {
        const qty = materialCart[id]?.qty || 0;
        const valEl = document.getElementById(`qty_val_${id}`);
        const btnEl = document.getElementById(`add_btn_${id}`);

        if (valEl) valEl.innerText = qty;
        if (btnEl) {
            btnEl.classList.toggle("added", qty > 0);
            btnEl.innerText = qty > 0 ? "✓ In Cart" : "+ Add to Estimate";
        }
    }

    function removeItem(id) {
        if (materialCart[id]) {
            delete materialCart[id];
            saveCart();
            updateCartStateUI();
            syncCardDOM(id);
            showToast("Item cart se hataya gaya");
        }
    }

    function clearCart() {
        if (Object.keys(materialCart).length === 0) return;
        if (!confirm("क्या आप कार्ट की सभी सामग्रियां हटाना चाहते हैं?")) return;

        materialCart = {};
        saveCart();
        updateCartStateUI();
        renderCatalogue();
        showToast("Cart empty kar diya gaya");
    }

    function saveCart() {
        try {
            localStorage.setItem("sandeep_material_cart", JSON.stringify(materialCart));
        } catch (e) {}
    }

    function loadSavedCart() {
        try {
            const saved = localStorage.getItem("sandeep_material_cart");
            if (saved) materialCart = JSON.parse(saved);
        } catch (e) {
            materialCart = {};
        }
    }

    function updateCartStateUI() {
        const items = Object.values(materialCart);
        const totalQtyCount = items.reduce((sum, item) => sum + item.qty, 0);
        const grandSum = items.reduce((sum, item) => sum + (item.qty * (Number(item.rate) || 0)), 0);

        if (dom.cartCount) dom.cartCount.innerText = totalQtyCount;
        if (dom.cartTotal) dom.cartTotal.innerText = `₹${formatMoney(grandSum)}`;

        if (!dom.cartItems) return;

        if (items.length === 0) {
            dom.cartItems.innerHTML = `
                <div class="cart-empty">
                    <div class="cart-empty-icon">🛒</div>
                    <strong>Cart खाली है</strong>
                    <small>Materials add करने के लिए Add button का उपयोग करें।</small>
                </div>
            `;
            return;
        }

        dom.cartItems.innerHTML = items.map(item => {
            const rate = Number(item.rate) || 0;
            const total = item.qty * rate;

            return `
                <div class="cart-item">
                    <div class="cart-item-top">
                        <div>
                            <div class="cart-item-name">${escapeHTML(item.name)}</div>
                            <small style="color:var(--material-muted); font-size:10px;">${item.size ? escapeHTML(item.size) + ' • ' : ''}₹${formatMoney(rate)} each</small>
                        </div>
                        <div class="cart-item-price">₹${formatMoney(total)}</div>
                    </div>

                    <div class="cart-item-bottom">
                        <div class="cart-item-qty">
                            <button type="button" onclick="window.MaterialApp.stepQty('${item.id}', -1)">−</button>
                            <span style="color:#ffffff; font-weight:700; font-size:12px; min-width:18px; text-align:center;">${item.qty}</span>
                            <button type="button" onclick="window.MaterialApp.stepQty('${item.id}', 1)">+</button>
                        </div>
                        <button type="button" class="cart-item-remove" onclick="window.MaterialApp.removeItem('${item.id}')">हटाएं ✕</button>
                    </div>
                </div>
            `;
        }).join("");
    }

    function initDrawerModalEvents() {
        if (dom.openCartBtn) dom.openCartBtn.addEventListener("click", openCart);
        if (dom.closeCartBtn) dom.closeCartBtn.addEventListener("click", closeCart);
        if (dom.cartOverlay) dom.cartOverlay.addEventListener("click", () => {
            closeCart();
            closeEstimateModal();
        });
        if (dom.clearCartBtn) dom.clearCartBtn.addEventListener("click", clearCart);

        if (dom.openEstimateBtn) {
            dom.openEstimateBtn.addEventListener("click", () => {
                closeCart();
                openEstimateModal();
            });
        }
        if (dom.closeEstimateBtn) dom.closeEstimateBtn.addEventListener("click", closeEstimateModal);
    }

    function openCart() {
        if (dom.cartDrawer) dom.cartDrawer.classList.add("active");
        if (dom.cartOverlay) dom.cartOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeCart() {
        if (dom.cartDrawer) dom.cartDrawer.classList.remove("active");
        if (dom.cartOverlay && !dom.estimateModal?.classList.contains("active")) {
            dom.cartOverlay.classList.remove("active");
        }
        document.body.style.overflow = "";
    }

    function openEstimateModal() {
        const items = Object.values(materialCart);
        if (items.length === 0) {
            alert("कृपया पहले कम से कम एक सामग्री जोड़ें।");
            return;
        }

        let total = 0;
        if (dom.estimateTableBody) {
            dom.estimateTableBody.innerHTML = items.map(item => {
                const rate = Number(item.rate) || 0;
                const subtotal = item.qty * rate;
                total += subtotal;

                return `
                    <tr>
                        <td>
                            <strong>${escapeHTML(item.name)}</strong>
                            ${item.size ? `<br><small style="color:var(--material-muted); font-size:10px;">${escapeHTML(item.size)}</small>` : ""}
                        </td>
                        <td>${item.qty} ${item.unit ? `<small>${escapeHTML(item.unit)}</small>` : ""}</td>
                        <td>₹${formatMoney(rate)}</td>
                        <td><strong>₹${formatMoney(subtotal)}</strong></td>
                    </tr>
                `;
            }).join("");
        }

        if (dom.estimateGrandTotal) {
            dom.estimateGrandTotal.innerText = `₹${formatMoney(total)}`;
        }

        if (dom.estimateModal) dom.estimateModal.classList.add("active");
        if (dom.cartOverlay) dom.cartOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeEstimateModal() {
        if (dom.estimateModal) dom.estimateModal.classList.remove("active");
        if (dom.cartOverlay) dom.cartOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    function showToast(message) {
        if (!dom.toast) return;
        dom.toast.innerText = message;
        dom.toast.classList.add("show");
        clearTimeout(window._matToastTimer);
        window._matToastTimer = setTimeout(() => {
            dom.toast.classList.remove("show");
        }, 2000);
    }

    function formatMoney(n) {
        return Number(n || 0).toLocaleString("en-IN", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    }

    function escapeHTML(s) {
        return String(s || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeCart();
            closeEstimateModal();
        }
    });

    window.MaterialApp = {
        stepQty,
        toggleAdd,
        removeItem,
        openCart,
        closeCart,
        openEstimateModal,
        closeEstimateModal
    };
})();
