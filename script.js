/* =========================================================
   SANDEEP ELECTROFIX
   PROJECT 2.1 — FINAL CORE JAVASCRIPT ENGINE
   VERSION: 2.1.0
   ========================================================= */

/* =========================================================
   GLOBAL STATE
========================================================= */
let currentLang = localStorage.getItem("sandeepLang") || "hi";
let selectedItemsMap = {};
let lastBackPressTime = 0;
let menuHistoryAdded = false;
let modalHistoryAdded = false;
let lightboxHistoryAdded = false;

/* =========================================================
   SAFE HELPERS
========================================================= */
function $(id) {
    return document.getElementById(id);
}

function safeText(id, text) {
    const el = $(id);
    if (el) el.innerText = text ?? "";
}

function safeHTML(id, html) {
    const el = $(id);
    if (el) el.innerHTML = html ?? "";
}

function safeValue(id, value) {
    const el = $(id);
    if (el) el.value = value ?? "";
}

function getConfig() {
    return window.MASTER_CONFIG || {};
}

function getControls() {
    return getConfig().controls || {};
}

function getBusiness() {
    return getConfig().business || {};
}

function getServices() {
    return Array.isArray(getConfig().services) ? getConfig().services : [];
}

function getGallery() {
    return Array.isArray(getConfig().gallery) ? getConfig().gallery : [];
}

function getReviews() {
    return Array.isArray(getConfig().reviews) ? getConfig().reviews : [];
}

function getFAQ() {
    return Array.isArray(getConfig().faq) ? getConfig().faq : [];
}

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* =========================================================
   CART RESTORE
========================================================= */
try {
    const savedCart = localStorage.getItem("sandeepCart");
    if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart && typeof parsedCart === "object") {
            selectedItemsMap = parsedCart;
        }
    }
} catch (error) {
    console.warn("Cart restore failed:", error);
    selectedItemsMap = {};
}

/* =========================================================
   CUSTOMER INPUT STORAGE
========================================================= */
function saveCustomerInputs() {
    const data = {
        name: $("customerName")?.value || "",
        phone: $("customerPhone")?.value || "",
        location: $("customerLocation")?.value || "",
        message: $("customerMessage")?.value || ""
    };
    try {
        localStorage.setItem("sandeepCustomer", JSON.stringify(data));
    } catch (error) {
        console.warn("Customer storage failed:", error);
    }
}

function restoreCustomerInputs() {
    try {
        const saved = localStorage.getItem("sandeepCustomer");
        if (!saved) return;
        const data = JSON.parse(saved);
        if ($("customerName")) $("customerName").value = data.name || "";
        if ($("customerPhone")) $("customerPhone").value = data.phone || "";
        if ($("customerLocation")) $("customerLocation").value = data.location || "";
        if ($("customerMessage")) $("customerMessage").value = data.message || "";
    } catch (error) {
        console.warn("Customer restore failed:", error);
    }
}

/* =========================================================
   2-STEP RESET APP SAFETY LOGIC
========================================================= */
function openResetModal() {
    if (window.closeProject21Menu) {
        window.closeProject21Menu();
    }
    const overlay = $("resetModalOverlay");
    const step1 = $("resetStep1");
    const step2 = $("resetStep2");
    if (overlay && step1 && step2) {
        step1.style.display = "block";
        step2.style.display = "none";
        overlay.style.display = "flex";
    }
}

function goToResetStep2() {
    const step1 = $("resetStep1");
    const step2 = $("resetStep2");
    if (step1 && step2) {
        step1.style.display = "none";
        step2.style.display = "block";
    }
}

function closeResetModal() {
    const overlay = $("resetModalOverlay");
    if (overlay) overlay.style.display = "none";
}

function executeAppReset() {
    try {
        localStorage.removeItem("sandeepCart");
        localStorage.removeItem("sandeepCustomer");
        localStorage.removeItem("sandeepQuickLayout");
        localStorage.removeItem("sandeepServiceLayout");
    } catch (error) {
        console.warn("Reset storage error:", error);
    }

    selectedItemsMap = {};

    safeValue("customerName", "");
    safeValue("customerPhone", "");
    safeValue("customerLocation", "");
    safeValue("customerMessage", "");

    const gpsBtn = $("btnGpsDetect");
    const gpsBtnText = $("gpsBtnText");
    if (gpsBtn) gpsBtn.classList.remove("active-loc");
    if (gpsBtnText) gpsBtnText.innerText = "GPS";

    document.documentElement.classList.add("saved-light-theme");
    localStorage.setItem("sandeepTheme", "light");

    applyQuickLayout("grid-2");
    applyServiceLayout("grid-2");

    setLanguage("en");
    closeResetModal();

    showExitToast("✅ App reset done successfully!");
}

/* =========================================================
   GPS — QUOTE LOCATION
========================================================= */
function getQuoteLiveLocation() {
    const locInput = $("customerLocation");
    const gpsBtn = $("btnGpsDetect");
    const gpsBtnText = $("gpsBtnText");

    if (!navigator.geolocation) {
        alert(currentLang === "hi" ? "आपके ब्राउज़र में GPS सपोर्ट नहीं है।" : "Geolocation is not supported by your browser.");
        return;
    }

    if (gpsBtnText) gpsBtnText.innerText = "...";

    navigator.geolocation.getCurrentPosition(
        function(position) {
            const lat = position.coords.latitude.toFixed(5);
            const lng = position.coords.longitude.toFixed(5);
            const mapUrl = `https://maps.google.com/?q=${lat},${lng}`;

            if (locInput) {
                locInput.value = `${lat}, ${lng} (${mapUrl})`;
                saveCustomerInputs();
            }
            if (gpsBtn) gpsBtn.classList.add("active-loc");
            if (gpsBtnText) {
                gpsBtnText.innerText = currentLang === "hi" ? "मिल गया ✓" : "Fetched ✓";
            }
        },
        function() {
            alert(currentLang === "hi" ? "लोकेशन की परमिशन नहीं मिली। कृपया हाथ से पता लिखें।" : "Location permission denied. Please type address manually.");
            if (gpsBtnText) gpsBtnText.innerText = "GPS";
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

/* =========================================================
   VISIBILITY CONTROLS
========================================================= */
function applyVisibilityControls() {
    const ctrl = getControls();
    const biz = getBusiness();

    const toggle = function(id, show) {
        const el = $(id);
        if (!el) return;
        el.style.display = show ? "" : "none";
    };

    toggle("heroSection", ctrl.showHero);
    toggle("discountSection", ctrl.showDiscount);
    toggle("quickAccessBar", ctrl.showQuickAccess);
    toggle("aboutSection", ctrl.showAbout);
    toggle("locationSection", ctrl.showLocation);
    toggle("servicesSection", ctrl.showServices);
    toggle("gallerySection", ctrl.showGallery);
    toggle("cardQRContainer", ctrl.showQR);
    toggle("reviewsSection", ctrl.showReviews);
    toggle("quoteFormSection", ctrl.showQuoteForm);
    toggle("faqSection", ctrl.showFAQ);
    toggle("footerSection", ctrl.showFooter);
    toggle("mobileBottomNav", ctrl.showBottomNav);

    // Business Links Binding
    if ($("btnFacebook") && biz.facebook) $("btnFacebook").href = biz.facebook;
    if ($("btnInstagram") && biz.instagram) $("btnInstagram").href = biz.instagram;
    if ($("btnYoutube") && biz.youtube) $("btnYoutube").href = biz.youtube;
    if ($("btnQuickEmail") && biz.email) $("btnQuickEmail").href = `mailto:${biz.email}`;
    if ($("btnQuickWebsite") && biz.website) $("btnQuickWebsite").href = biz.website;
    if ($("btnQuickMaps") && biz.googleMaps) $("btnQuickMaps").href = biz.googleMaps;
    if ($("btnDirectionsMap") && biz.googleMaps) $("btnDirectionsMap").href = biz.googleMaps;
    if ($("callBtn") && biz.phone) $("callBtn").href = `tel:${biz.phone}`;
    if ($("btnQuickCall") && biz.phone) $("btnQuickCall").href = `tel:${biz.phone}`;
    if ($("whatsappBtn") && biz.whatsapp) $("whatsappBtn").href = `https://wa.me/${biz.whatsapp}`;
    if ($("btnQuickWhatsapp") && biz.whatsapp) $("btnQuickWhatsapp").href = `https://wa.me/${biz.whatsapp}`;
}

/* =========================================================
   LANGUAGE TOGGLE
========================================================= */
function setLanguage(lang) {
    currentLang = lang === "en" ? "en" : "hi";
    localStorage.setItem("sandeepLang", currentLang);

    document.querySelectorAll(".menu-lang-btn").forEach(function(button) {
        button.classList.toggle("active", button.getAttribute("data-menu-lang") === currentLang);
    });

    const isHi = currentLang === "hi";
    const cfg = getConfig();
    const biz = cfg.business || {};
    const ctrl = cfg.controls || {};

    // Header Texts
    safeText("businessTitle", isHi ? "आपका भरोसेमंद इलेक्ट्रीशियन" : "Powering Your Trust");
    safeText("businessTagline", isHi ? "लखनऊ में पेशेवर इलेक्ट्रीशियन सेवाएँ" : "Professional Electrical Services in Lucknow");
    safeText("businessLocation", isHi ? `📍 ${biz.location_hi || "लखनऊ, उत्तर प्रदेश"}` : `📍 ${biz.location_en || "Lucknow, Uttar Pradesh"}`);
    safeText("callBtnText", isHi ? "कॉल करें" : "Call Now");
    safeText("whatsappBtnText", isHi ? "व्हाट्सएप" : "WhatsApp");

    // Discount
    const discountPercent = Number(ctrl.discountPercent || 10);
    safeText("discountBadge", isHi ? "🔥 विशेष ऑफर" : "🔥 SPECIAL OFFER");
    safeText("discountTitle", isHi ? "चुनिंदा इलेक्ट्रिकल सेवाओं पर" : "on Selected Electrical Services");
    safeText("discountPercentage", discountPercent);
    safeText("discountValidity", isHi ? "⏳ सीमित समय के लिए" : "⏳ Limited Time Offer");
    safeText("discountBtnText", isHi ? "⚡ छूट प्राप्त करें" : "⚡ Get Discount");

    // Headings
    safeText("quickHeading", isHi ? "त्वरित सेवाएँ" : "Quick Access");
    safeText("aboutHeading", isHi ? "हमारे बारे में" : "About Us");
    safeText("locHeading", isHi ? "सेवा क्षेत्र एवं लोकेशन" : "Service Location");
    safeText("locDesc", isHi ? "पूरे लखनऊ में ऑन-साइट इलेक्ट्रीशियन सेवा उपलब्ध।" : "Providing on-site electrical services across Lucknow.");
    safeText("distBtnText", isHi ? "दूरी चेक करें" : "Check Distance");
    safeText("mapBtnText", isHi ? "गूगल मैप्स" : "Get Directions");
    safeText("servicesHeading", isHi ? "हमारी सेवाएँ" : "Our Services");
    safeText("galleryHeading", isHi ? "हमारे कार्य" : "Our Work");
    safeText("reviewsHeading", isHi ? "ग्राहकों की राय" : "Customer Reviews");
    safeText("quoteHeading", isHi ? "कोटेशन व अनुमानित खर्च" : "Estimate & Quotation");
    safeText("faqHeading", isHi ? "अक्सर पूछे जाने वाले सवाल" : "Frequently Asked Questions");
    safeText("qrHeading", isHi ? "डिजिटल कार्ड (स्कैन व सेव)" : "Our Digital Card (Scan & Save)");
    safeText("qrDesc", isHi ? "कार्ड सेव करने के लिए QR कोड स्कैन करें।" : "Scan QR code to save our card or share.");
    safeText("qrBtnText", isHi ? "📥 क्यूआर डाउनलोड करें" : "📥 Download QR");

    // Quick labels
    safeText("labelCall", isHi ? "कॉल करें" : "Call");
    safeText("labelWhatsapp", isHi ? "व्हाट्सएप" : "WhatsApp");
    safeText("labelEmail", isHi ? "ईमेल" : "Email");
    safeText("labelWeb", isHi ? "वेबसाइट" : "Website");
    safeText("labelMap", isHi ? "गूगल मैप्स" : "Google Maps");
    safeText("labelSaveContact", isHi ? "नंबर सेव करें" : "Save Contact");
    safeText("labelShare", isHi ? "शेयर करें" : "Share");
    safeText("labelCatalogue", isHi ? "सामग्री सूची" : "Catalogue");

    // About Text
    safeHTML(
        "aboutText",
        isHi
            ? `<strong>${escapeHTML(biz.name || "Sandeep ElectroFix")}</strong> में आपका स्वागत है। हम पूरे लखनऊ में पेशेवर इलेक्ट्रीशियन सेवाएँ प्रदान करते हैं, जिसमें हाउस वायरिंग, फॉल्स सीलिंग वायरिंग, MCB और DB इंस्टॉलेशन, पंखा-लाइट फिटिंग, इन्वर्टर वायरिंग और मेंटेनेंस शामिल हैं।`
            : `Welcome to <strong>${escapeHTML(biz.name || "Sandeep ElectroFix")}</strong>. We provide professional electrical services across Lucknow, including house wiring, false ceiling wiring, MCB & DB Installation, fan and light fitting, inverter wiring, fault repair, and general maintenance.`
    );

    updateThemeButtonText();
    applyVisibilityControls();
    renderServices();
    renderGallery();
    renderReviews();
    renderFAQ();
    updateCalculations();
}

/* =========================================================
   THEME BUTTON
========================================================= */
function updateThemeButtonText() {
    const isLight = document.documentElement.classList.contains("saved-light-theme");
    const themeIcon = $("menuThemeIcon");
    const themeText = $("menuThemeText");
    if (!themeIcon || !themeText) return;

    themeIcon.innerText = isLight ? "🌙" : "☀️";
    themeText.innerText = isLight ? (currentLang === "hi" ? "डार्क मोड" : "Dark Mode") : (currentLang === "hi" ? "लाइट मोड" : "Light Mode");
}

/* =========================================================
   SERVICES RENDER
========================================================= */
function renderServices() {
    const container = $("serviceContainer");
    const services = getServices();
    if (!container) return;

    if (!services.length) {
        container.innerHTML = `<p class="no-selection-hint">${currentLang === "hi" ? "कोई सेवा उपलब्ध नहीं है।" : "No services available."}</p>`;
        return;
    }

    container.innerHTML = "";
    services.forEach(function(service, sIdx) {
        if (service.show === false) return;
        const title = currentLang === "hi" ? service.title_hi : service.title_en;

        let activeCount = 0;
        const subServices = Array.isArray(service.subServices) ? service.subServices : [];
        subServices.forEach(function(_, subIdx) {
            const item = selectedItemsMap[`${sIdx}_${subIdx}`];
            if (item) activeCount += Number(item.qty || 0);
        });

        const card = document.createElement("div");
        card.className = `service-card ${activeCount > 0 ? "has-active-items" : ""}`;
        card.innerHTML = `
            <div class="service-header" role="button" tabindex="0">
                <div class="service-title-wrap">
                    <span class="service-icon">${escapeHTML(service.icon || "⚡")}</span>
                    <h3 class="service-title">${escapeHTML(title || "Service")}</h3>
                </div>
                <span class="toggle-arrow">➔</span>
            </div>
        `;

        const header = card.querySelector(".service-header");
        if (header) {
            header.addEventListener("click", () => openServiceModal(sIdx));
        }
        container.appendChild(card);
    });
}

/* =========================================================
   SERVICE MODAL
========================================================= */
function openServiceModal(sIdx) {
    const services = getServices();
    const service = services[sIdx];
    if (!service) return;

    const title = currentLang === "hi" ? service.title_hi : service.title_en;
    const desc = currentLang === "hi" ? service.desc_hi : service.desc_en;

    safeText("modalServiceIcon", service.icon || "⚡");
    safeText("modalServiceTitle", title || "Service");
    safeText("modalServiceDesc", desc || "");

    const itemsContainer = $("modalItemsContainer");
    if (!itemsContainer) return;

    const subServices = Array.isArray(service.subServices) ? service.subServices : [];
    itemsContainer.innerHTML = "";

    subServices.forEach(function(sub, subIdx) {
        if (sub.show === false) return;
        const key = `${sIdx}_${subIdx}`;
        const selected = selectedItemsMap[key];
        const qty = selected ? Number(selected.qty || 0) : 0;
        const name = currentLang === "hi" ? sub.name_hi : sub.name_en;
        const rate = currentLang === "hi" ? sub.rate_hi : sub.rate_en;

        const row = document.createElement("div");
        row.className = `sub-service-item ${qty > 0 ? "has-qty" : ""}`;
        row.id = `modal_row_${key}`;
        row.innerHTML = `
            <div class="sub-service-info">
                <span class="sub-name">${escapeHTML(name || "Service")}</span>
                <span class="sub-rate">${escapeHTML(rate || "")}</span>
            </div>
            <div class="qty-control">
                <button type="button" class="qty-btn minus-btn" onclick="changeQtyModal(${sIdx}, ${subIdx}, -1)">−</button>
                <span class="qty-val" id="modal_qty_${key}">${qty}</span>
                <button type="button" class="qty-btn plus-btn" onclick="changeQtyModal(${sIdx}, ${subIdx}, 1)">+</button>
            </div>
        `;
        itemsContainer.appendChild(row);
    });

    const overlay = $("serviceModalOverlay");
    if (overlay) {
        overlay.style.display = "flex";
        requestAnimationFrame(() => overlay.classList.add("active"));
        document.body.style.overflow = "hidden";
    }
}

function changeQtyModal(sIdx, subIdx, change) {
    changeQty(sIdx, subIdx, change);
    const key = `${sIdx}_${subIdx}`;
    const currentQty = selectedItemsMap[key] ? Number(selectedItemsMap[key].qty || 0) : 0;

    const mQty = $(`modal_qty_${key}`);
    const mRow = $(`modal_row_${key}`);
    if (mQty) mQty.innerText = currentQty;
    if (mRow) mRow.classList.toggle("has-qty", currentQty > 0);
}

function closeServiceModal() {
    const overlay = $("serviceModalOverlay");
    if (!overlay) return;
    overlay.classList.remove("active");
    setTimeout(() => {
        overlay.style.display = "none";
        document.body.style.overflow = "";
        renderServices();
    }, 250);
}

/* =========================================================
   CART & CALCULATIONS
========================================================= */
function changeQty(sIdx, subIdx, change) {
    const service = getServices()[sIdx];
    if (!service) return;
    const sub = Array.isArray(service.subServices) ? service.subServices[subIdx] : null;
    if (!sub) return;

    const key = `${sIdx}_${subIdx}`;
    if (!selectedItemsMap[key]) {
        selectedItemsMap[key] = {
            name_hi: sub.name_hi || "",
            name_en: sub.name_en || "",
            price: Number(sub.price || 0),
            qty: 0
        };
    }

    selectedItemsMap[key].qty += Number(change || 0);
    if (selectedItemsMap[key].qty <= 0) delete selectedItemsMap[key];

    try {
        localStorage.setItem("sandeepCart", JSON.stringify(selectedItemsMap));
    } catch (e) {
        console.warn(e);
    }
    updateCalculations();
}

function changeQtyDirect(key, change) {
    if (!selectedItemsMap[key]) return;
    const [sIdx, subIdx] = key.split("_").map(Number);
    changeQty(sIdx, subIdx, change);
    renderServices();
}

function removeItemDirect(key) {
    if (!selectedItemsMap[key]) return;
    delete selectedItemsMap[key];
    localStorage.setItem("sandeepCart", JSON.stringify(selectedItemsMap));
    updateCalculations();
    renderServices();
}

function updateCalculations() {
    const entries = Object.entries(selectedItemsMap);
    const countEl = $("selectedCount");
    const listEl = $("selectedServicesList");
    const subtotalEl = $("calcSubtotal");
    const discRow = $("calcDiscountRow");
    const discEl = $("calcDiscount");
    const totalEl = $("calcGrandTotal");
    const ctrl = getControls();

    const count = entries.reduce((t, [, i]) => t + Number(i.qty || 0), 0);
    if (countEl) countEl.innerText = count;

    if (entries.length === 0) {
        if (listEl) listEl.innerHTML = `<p class="no-selection-hint">${currentLang === "hi" ? "अभी तक कोई सेवा नहीं चुनी गई।" : "No services selected yet."}</p>`;
        if (subtotalEl) subtotalEl.innerText = "₹0";
        if (discRow) discRow.style.display = "none";
        if (totalEl) totalEl.innerText = "₹0";
        return;
    }

    if (listEl) {
        listEl.innerHTML = entries.map(([key, item]) => `
            <div class="summary-item-row">
                <div class="summary-item-left">
                    <span class="summary-item-name">• ${escapeHTML(currentLang === "hi" ? item.name_hi : item.name_en)}</span>
                    <span class="summary-item-price">₹${item.price * item.qty} (₹${item.price} × ${item.qty})</span>
                </div>
                <div class="summary-qty-actions">
                    <button type="button" class="summary-btn minus" onclick="changeQtyDirect('${key}', -1)">−</button>
                    <span class="summary-qty-val">${item.qty}</span>
                    <button type="button" class="summary-btn plus" onclick="changeQtyDirect('${key}', 1)">+</button>
                    <button type="button" class="summary-btn remove" onclick="removeItemDirect('${key}')">🗑️</button>
                </div>
            </div>
        `).join("");
    }

    const subtotal = entries.reduce((t, [, i]) => t + (Number(i.price || 0) * Number(i.qty || 0)), 0);
    const discountPercent = Number(ctrl.discountPercent || 10);
    const isDiscountActive = ctrl.showDiscount !== false && discountPercent > 0;
    const discount = isDiscountActive ? Math.round(subtotal * (discountPercent / 100)) : 0;
    const total = subtotal - discount;

    if (subtotalEl) subtotalEl.innerText = `₹${subtotal}`;
    if (discRow) discRow.style.display = isDiscountActive ? "flex" : "none";
    if (discEl) discEl.innerText = `-₹${discount}`;
    if (totalEl) totalEl.innerText = `₹${total}`;
}

/* =========================================================
   GALLERY, REVIEWS, FAQ
========================================================= */
function renderGallery() {
    const container = $("galleryContainer");
    if (!container) return;
    const gallery = getGallery().filter(i => i.show !== false);
    if (!gallery.length) return;

    container.innerHTML = "";
    gallery.forEach(item => {
        const div = document.createElement("div");
        div.className = "gallery-item";
        div.innerHTML = `<img src="${escapeHTML(item.image || "")}" alt="Work" loading="lazy">`;
        div.querySelector("img")?.addEventListener("click", () => openLightboxModal(item.image));
        container.appendChild(div);
    });
}

function openLightboxModal(src) {
    const box = $("lightbox");
    const img = $("lightboxImage");
    if (!box || !img || !src) return;
    img.src = src;
    box.style.display = "flex";
    requestAnimationFrame(() => box.classList.add("active"));
}

function closeLightboxModal() {
    const box = $("lightbox");
    if (!box) return;
    box.classList.remove("active");
    box.style.display = "none";
}

function renderReviews() {
    const container = $("reviewContainer");
    if (!container) return;
    const reviews = getReviews().filter(r => r.show !== false);
    if (!reviews.length) return;

    container.innerHTML = reviews.map(r => `
        <div class="card review-card" style="padding:12px;">
            <div style="color:#f5c542;">${"★".repeat(Math.min(5, Number(r.rating || 5)))}</div>
            <p style="margin:4px 0;font-size:.85rem;">"${escapeHTML(currentLang === "hi" ? r.text_hi : r.text_en)}"</p>
            <small style="color:#aab4c8;">— ${escapeHTML(r.name || "Customer")}</small>
        </div>
    `).join("");
}

function renderFAQ() {
    const container = $("faqContainer");
    if (!container) return;
    const faq = getFAQ().filter(f => f.show !== false);
    if (!faq.length) return;

    container.innerHTML = faq.map(item => `
        <div class="faq-item" onclick="this.classList.toggle('active')">
            <div class="faq-question">
                <span>${escapeHTML(currentLang === "hi" ? item.q_hi : item.q_en)}</span>
                <span class="faq-icon">+</span>
            </div>
            <div class="faq-answer">${escapeHTML(currentLang === "hi" ? item.a_hi : item.a_en)}</div>
        </div>
    `).join("");
}

/* =========================================================
   LAYOUT SWITCHERS
========================================================= */
function applyQuickLayout(layout) {
    const container = $("quickGridContainer");
    if (container) container.className = `grid layout-${layout}`;
    localStorage.setItem("sandeepQuickLayout", layout);
}

function applyServiceLayout(layout) {
    const container = $("serviceContainer");
    if (container) container.className = `service-grid layout-${layout}`;
    localStorage.setItem("sandeepServiceLayout", layout);
}

/* =========================================================
   DISTANCE & VCARD & SHARE
========================================================= */
function getUserLocation() {
    const status = $("locationStatus");
    if (!navigator.geolocation) return;
    if (status) status.innerText = currentLang === "hi" ? "लोकेशन खोजी जा रही है..." : "Locating...";

    navigator.geolocation.getCurrentPosition(
        function(pos) {
            const bizLat = 26.8467, bizLng = 80.9462;
            const uLat = pos.coords.latitude, uLng = pos.coords.longitude;
            const R = 6371;
            const dLat = (uLat - bizLat) * (Math.PI / 180);
            const dLon = (uLng - bizLng) * (Math.PI / 180);
            const a = Math.sin(dLat / 2)**2 + Math.cos(bizLat * Math.PI / 180) * Math.cos(uLat * Math.PI / 180) * Math.sin(dLon / 2)**2;
            const dist = (R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))).toFixed(1);

            if (status) {
                status.innerHTML = currentLang === "hi"
                    ? `✅ आप हमारे केंद्र से लगभग <strong>${dist} km</strong> दूरी पर हैं।`
                    : `✅ Approx <strong>${dist} km</strong> away from Lucknow center.`;
            }
        },
        function() {
            if (status) status.innerText = currentLang === "hi" ? "लोकेशन परमिशन नहीं मिली।" : "Location permission denied.";
        }
    );
}

function saveContactVCard() {
    const biz = getBusiness();
    const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${biz.name || "Sandeep ElectroFix"}\nTEL;TYPE=CELL,VOICE:${biz.phone || ""}\nEMAIL:${biz.email || ""}\nURL:${biz.website || ""}\nEND:VCARD`;
    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Sandeep_ElectroFix.vcf";
    link.click();
}

async function shareWebsite() {
    if (navigator.share) {
        await navigator.share({ title: "Sandeep ElectroFix", url: window.location.href });
    } else {
        navigator.clipboard.writeText(window.location.href);
        showExitToast("✅ Link copied!");
    }
}

function showExitToast(msg) {
    let toast = $("appExitToast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "appExitToast";
        toast.style.cssText = "position:fixed;bottom:85px;left:50%;transform:translateX(-50%);background:rgba(5,8,22,0.95);color:#f5c542;padding:10px 22px;border-radius:30px;font-size:13px;font-weight:600;z-index:9999999;border:1px solid rgba(245,197,66,0.5);";
        document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.style.display = "block";
    setTimeout(() => { toast.style.display = "none"; }, 2500);
}

/* =========================================================
   WHATSAPP & PDF EXPORT
========================================================= */
function sendWhatsappQuote() {
    const name = $("customerName")?.value.trim();
    const phone = $("customerPhone")?.value.trim();
    const location = $("customerLocation")?.value.trim();
    const items = Object.values(selectedItemsMap);
    const biz = getBusiness();

    if (!name || !phone || !location || !items.length) {
        alert(currentLang === "hi" ? "कृपया नाम, फोन, पता भरें व कम से कम एक सेवा चुनें।" : "Please fill Name, Phone, Location and select services.");
        return;
    }

    let msg = `⚡ *${biz.name || "Sandeep ElectroFix"} - Quotation Request* ⚡\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📍 Location: ${location}\n\n📋 *Services:*\n`;
    items.forEach((i, idx) => { msg += `${idx + 1}. ${i.name_en || i.name_hi} [Qty: ${i.qty}] - ₹${i.price * i.qty}\n`; });
    msg += `\n💵 Grand Total: ${$("calcGrandTotal")?.innerText || "₹0"}`;

    const url = `https://wa.me/${String(biz.whatsapp || biz.phone || "919026036445").replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
}

function downloadEstimatePDF() {
    const jsPDF = window.jspdf?.jsPDF;
    if (!jsPDF) {
        alert("PDF Library Loading... please retry in 2 seconds.");
        return;
    }
    const doc = new jsPDF();
    const name = $("customerName")?.value.trim() || "Customer";
    const items = Object.values(selectedItemsMap);

    if (!items.length) {
        alert("Please add services first.");
        return;
    }

    doc.text("Sandeep ElectroFix - Estimate", 14, 15);
    doc.text(`Customer: ${name}`, 14, 25);
    doc.text(`Total Amount: ${$("calcGrandTotal")?.innerText || "₹0"}`, 14, 35);
    doc.save(`Estimate_${name}.pdf`);
}

/* =========================================================
   NAVBAR & SIDE MENU
========================================================= */
function initializeProject21Navbar() {
    const menuBtn = $("navbarMenuBtn");
    const sideMenu = $("sideMenu");
    const overlay = $("navbarOverlay");
    const closeBtn = $("sideMenuClose");

    function toggleMenu(open) {
        sideMenu?.classList.toggle("active", open);
        overlay?.classList.toggle("active", open);
        menuBtn?.classList.toggle("active", open);
        document.body.classList.toggle("menu-open", open);
    }

    menuBtn?.addEventListener("click", () => toggleMenu(true));
    closeBtn?.addEventListener("click", () => toggleMenu(false));
    overlay?.addEventListener("click", () => toggleMenu(false));
    sideMenu?.querySelectorAll("a")?.forEach(a => a.addEventListener("click", () => toggleMenu(false)));

    $("menuThemeToggle")?.addEventListener("click", () => {
        document.documentElement.classList.toggle("saved-light-theme");
        const isLight = document.documentElement.classList.contains("saved-light-theme");
        localStorage.setItem("sandeepTheme", isLight ? "light" : "dark");
        updateThemeButtonText();
    });
}

/* =========================================================
   INIT
========================================================= */
document.addEventListener("DOMContentLoaded", function() {
    initializeProject21Navbar();
    restoreCustomerInputs();
    setLanguage(currentLang);
    updateCalculations();
});

// Window Bindings for HTML onclick access
window.setLanguage = setLanguage;
window.openResetModal = openResetModal;
window.goToResetStep2 = goToResetStep2;
window.closeResetModal = closeResetModal;
window.executeAppReset = executeAppReset;
window.getQuoteLiveLocation = getQuoteLiveLocation;
window.openServiceModal = openServiceModal;
window.closeServiceModal = closeServiceModal;
window.changeQtyModal = changeQtyModal;
window.changeQtyDirect = changeQtyDirect;
window.removeItemDirect = removeItemDirect;
window.openLightboxModal = openLightboxModal;
window.closeLightboxModal = closeLightboxModal;
window.applyQuickLayout = applyQuickLayout;
window.applyServiceLayout = applyServiceLayout;
window.saveContactVCard = saveContactVCard;
window.shareWebsite = shareWebsite;
window.sendWhatsappQuote = sendWhatsappQuote;
window.downloadEstimatePDF = downloadEstimatePDF;
window.getUserLocation = getUserLocation;
window.saveCustomerInputs = saveCustomerInputs;
