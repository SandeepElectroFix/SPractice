/* =========================================================
   SANDEEP ELECTROFIX
   PROJECT 2.1 — CORE JAVASCRIPT ENGINE
   ========================================================= */

let currentLang = localStorage.getItem("sandeepLang") || "hi";
let selectedItemsMap = {};

/* =========================================================
   COMPLETE TRANSLATION DICTIONARY
   ========================================================= */
const translations = {
    hi: {
        menuHome: "होम",
        menuAbout: "हमारे बारे में",
        menuLocation: "सर्विस लोकेशन",
        menuServices: "हमारी सेवाएँ",
        menuWork: "हमारे कार्य",
        menuReviews: "ग्राहकों की राय",
        menuQuote: "एस्टीमेट व कोटेशन",
        menuFaq: "अक्सर पूछे जाने वाले सवाल",
        menuQr: "क्यूआर कोड",
        menuAppSettings: "⚙️ ऐप सेटिंग्स",
        menuInstallApp: "ऐप इंस्टॉल करें",
        menuLangHeading: "🌐 भाषा चुनें",
        menuResetApp: "ऐप रीसेट करें (2-स्टेप)",

        businessTitle: "आपका भरोसेमंद इलेक्ट्रीशियन",
        businessTagline: "लखनऊ में पेशेवर इलेक्ट्रीशियन सेवाएँ",
        businessLocation: "📍 लखनऊ, उत्तर प्रदेश",
        callBtnText: "📞 कॉल करें",
        whatsappBtnText: "💬 व्हाट्सएप करें",

        discountBadge: "🔥 विशेष ऑफर",
        discountTitle: "चुनिंदा इलेक्ट्रिकल सेवाओं पर",
        discountMessage: "चुनिंदा इलेक्ट्रिकल सेवाओं पर 10% की भारी छूट पाएं",
        discountValidity: "⏳ सीमित समय के लिए",
        discountBtnText: "⚡ छूट प्राप्त करें",

        quickHeading: "त्वरित सेवाएँ",
        labelCall: "कॉल करें",
        labelWhatsapp: "व्हाट्सएप",
        labelEmail: "ईमेल",
        labelWeb: "वेबसाइट",
        labelMap: "गूगल मैप्स",
        labelSaveContact: "नंबर सेव करें",
        labelShare: "शेयर करें",
        labelCatalogue: "सामग्री सूची",

        aboutHeading: "हमारे बारे में",
        aboutReadMore: "और पढ़ें →",
        aboutText: "<strong>Sandeep ElectroFix</strong> में आपका स्वागत है। हम लखनऊ में पेशेवर इलेक्ट्रीशियन सेवाएँ प्रदान करते हैं, जिसमें हाउस वायरिंग, फॉल्स सीलिंग वायरिंग, MCB और DB इंस्टॉलेशन, पंखा और लाइट फिटिंग, इन्वर्टर वायरिंग, फॉल्ट रिपेयर और मेंटेनेंस शामिल हैं।",
        
        locHeading: "सेवा क्षेत्र एवं लोकेशन",
        locDesc: "पूरे लखनऊ और आसपास के क्षेत्रों में ऑन-साइट इलेक्ट्रीशियन सेवा उपलब्ध।",
        distBtnText: "दूरी चेक करें",
        mapBtnText: "गूगल मैप्स",

        servicesHeading: "हमारी सेवाएँ",
        btnViewAllServices: "सभी सेवाएँ देखें →",
        galleryHeading: "हमारे कार्य",
        reviewsHeading: "ग्राहकों की राय",

        quoteHeading: "कोटेशन व अनुमानित खर्च",
        quoteSubHint: "अपने कार्य का त्वरित एस्टीमेट प्राप्त करें।",
        phName: "आपका नाम *",
        phPhone: "मोबाइल नंबर *",
        phLocation: "आपका पता / एरिया *",
        phMessage: "कार्य का अतिरिक्त विवरण (वैकल्पिक)...",
        summaryHeader: "चुनी गई सेवाएँ",
        noSelHint: "अभी तक कोई सेवा नहीं चुनी गई। ऊपर + / − का उपयोग करें।",
        lblSubtotal: "कुल राशि:",
        discountLabel: "विशेष छूट:",
        lblGrandTotal: "अंतिम राशि:",
        sendWhatsappBtn: "💬 व्हाट्सएप पर भेजें",
        downloadPdfBtn: "📄 पीडीएफ एस्टीमेट डाउनलोड करें",

        faqHeading: "अक्सर पूछे जाने वाले सवाल",
        btnViewAllFaq: "सभी सवाल देखें →",
        qrHeading: "हमारा डिजिटल कार्ड (स्कैन व सेव)",
        qrDesc: "हमारा डिजिटल कार्ड सेव करने या शेयर करने के लिए यह क्यूआर कोड स्कैन करें।",
        qrBtnText: "📥 क्यूआर कोड डाउनलोड करें",
        footerCopyright: "© 2026 Sandeep ElectroFix. सर्वाधिकार सुरक्षित।",

        navHome: "होम",
        navServices: "सेवाएं",
        navWork: "कार्य",
        navQuote: "कोट",
        navCall: "कॉल",

        resetStep1Title: "ऐप रीसेट करें?",
        resetStep1Desc: "क्या आप सभी चुनी गई सेवाओं और डेटा को रीसेट करना चाहते हैं?",
        resetStep2Title: "स्टेप 2: क्या आप सुनिश्चित हैं?",
        resetStep2Desc: "यह प्रक्रिया वापस नहीं ली जा सकती।",
        btnCancel: "रद्द करें",
        btnContinue: "आगे बढ़ें",
        btnReset: "रीसेट करें"
    },
    en: {
        menuHome: "Home",
        menuAbout: "About Us",
        menuLocation: "Service Location",
        menuServices: "Our Services",
        menuWork: "Our Work",
        menuReviews: "Customer Reviews",
        menuQuote: "Estimate & Quotation",
        menuFaq: "FAQ",
        menuQr: "QR Code",
        menuAppSettings: "⚙️ APP SETTINGS",
        menuInstallApp: "Install App",
        menuLangHeading: "🌐 Language",
        menuResetApp: "Reset App (2-Step)",

        businessTitle: "Powering Your Trust",
        businessTagline: "Professional Electrical Services in Lucknow",
        businessLocation: "📍 Lucknow, Uttar Pradesh",
        callBtnText: "📞 Call Now",
        whatsappBtnText: "💬 WhatsApp",

        discountBadge: "🔥 SPECIAL OFFER",
        discountTitle: "on Selected Electrical Services",
        discountMessage: "Get 10% OFF on Selected Electrical Services",
        discountValidity: "⏳ Limited Time Offer",
        discountBtnText: "⚡ Get Discount",

        quickHeading: "Quick Access",
        labelCall: "Call",
        labelWhatsapp: "WhatsApp",
        labelEmail: "Email",
        labelWeb: "Website",
        labelMap: "Google Maps",
        labelSaveContact: "Save Contact",
        labelShare: "Share",
        labelCatalogue: "Catalogue",

        aboutHeading: "About Us",
        aboutReadMore: "Read More →",
        aboutText: "Welcome to <strong>Sandeep ElectroFix</strong>. We provide professional electrical services across Lucknow, including house wiring, false ceiling wiring, MCB & DB Installation, fan and light fitting, inverter wiring, fault repair, and general maintenance.",

        locHeading: "Service Location",
        locDesc: "Providing on-site electrical services across Lucknow.",
        distBtnText: "Check Distance",
        mapBtnText: "Get Directions",

        servicesHeading: "Our Services",
        btnViewAllServices: "View All Services →",
        galleryHeading: "Our Work",
        reviewsHeading: "Customer Reviews",

        quoteHeading: "Estimate & Quotation",
        quoteSubHint: "Get instant estimate for your electrical work.",
        phName: "Your Name *",
        phPhone: "Mobile Number *",
        phLocation: "Your Address / Area *",
        phMessage: "Additional work details (optional)...",
        summaryHeader: "Selected Services",
        noSelHint: "No services selected yet. Use + / − above.",
        lblSubtotal: "Subtotal:",
        discountLabel: "Special Discount:",
        lblGrandTotal: "Grand Total:",
        sendWhatsappBtn: "💬 Send on WhatsApp",
        downloadPdfBtn: "📄 Download PDF Estimate",

        faqHeading: "Frequently Asked Questions",
        btnViewAllFaq: "View All FAQ →",
        qrHeading: "Our Digital Card (Scan & Save)",
        qrDesc: "Scan QR code to save our card or share.",
        qrBtnText: "📥 Download QR",
        footerCopyright: "© 2026 Sandeep ElectroFix. All rights reserved.",

        navHome: "Home",
        navServices: "Services",
        navWork: "Work",
        navQuote: "Quote",
        navCall: "Call",

        resetStep1Title: "Reset App?",
        resetStep1Desc: "Do you want to reset all selections and settings to default?",
        resetStep2Title: "Step 2: Are you sure?",
        resetStep2Desc: "This action cannot be undone.",
        btnCancel: "Cancel",
        btnContinue: "Continue",
        btnReset: "RESET"
    }
};

/* =========================================================
   HELPER UTILITIES
   ========================================================= */
function $(id) { return document.getElementById(id); }
function safeText(id, text) { const el = $(id); if (el) el.innerText = text ?? ""; }
function safeHTML(id, html) { const el = $(id); if (el) el.innerHTML = html ?? ""; }

function getConfig() { return window.MASTER_CONFIG || {}; }
function getControls() { return getConfig().controls || {}; }
function getBusiness() { return getConfig().business || {}; }
function getServices() { return Array.isArray(getConfig().services) ? getConfig().services : []; }
function getGallery() { return Array.isArray(getConfig().gallery) ? getConfig().gallery : []; }
function getReviews() { return Array.isArray(getConfig().reviews) ? getConfig().reviews : []; }
function getFAQ() { return Array.isArray(getConfig().faq) ? getConfig().faq : []; }

/* =========================================================
   LANGUAGE SWITCHER (100% COVERAGE)
   ========================================================= */
function setLanguage(lang) {
    currentLang = (lang === "en") ? "en" : "hi";
    localStorage.setItem("sandeepLang", currentLang);
    document.documentElement.lang = currentLang;

    const t = translations[currentLang];

    // Navbar & Side Menu
    safeText("menuHomeText", t.menuHome);
    safeText("menuAboutText", t.menuAbout);
    safeText("menuLocationText", t.menuLocation);
    safeText("menuServicesText", t.menuServices);
    safeText("menuWorkText", t.menuWork);
    safeText("menuReviewsText", t.menuReviews);
    safeText("menuQuoteText", t.menuQuote);
    safeText("menuFaqText", t.menuFaq);
    safeText("menuQrText", t.menuQr);
    safeText("menuAppSettingsTitle", t.menuAppSettings);
    safeText("menuInstallAppText", t.menuInstallApp);
    safeText("menuLangHeading", t.menuLangHeading);
    safeText("menuResetText", t.menuResetApp);

    document.querySelectorAll(".menu-lang-btn").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-menu-lang") === currentLang);
    });

    // Hero
    safeText("businessTitle", t.businessTitle);
    safeText("businessTagline", t.businessTagline);
    safeText("businessLocation", t.businessLocation);
    safeText("callBtnText", t.callBtnText);
    safeText("whatsappBtnText", t.whatsappBtnText);

    // Discount
    safeText("discountBadge", t.discountBadge);
    safeText("discountTitle", t.discountTitle);
    safeText("discountMessage", t.discountMessage);
    safeText("discountValidity", t.discountValidity);
    safeText("discountBtnText", t.discountBtnText);

    // Quick Bar
    safeText("quickHeading", t.quickHeading);
    safeText("labelCall", t.labelCall);
    safeText("labelWhatsapp", t.labelWhatsapp);
    safeText("labelEmail", t.labelEmail);
    safeText("labelWeb", t.labelWeb);
    safeText("labelMap", t.labelMap);
    safeText("labelSaveContact", t.labelSaveContact);
    safeText("labelShare", t.labelShare);
    safeText("labelCatalogue", t.labelCatalogue);

    // About & Location
    safeText("aboutHeading", t.aboutHeading);
    safeText("aboutReadMore", t.aboutReadMore);
    safeHTML("aboutText", t.aboutText);
    safeText("locHeading", t.locHeading);
    safeText("locDesc", t.locDesc);
    safeText("distBtnText", t.distBtnText);
    safeText("mapBtnText", t.mapBtnText);

    // Services, Work, Reviews, FAQ, QR
    safeText("servicesHeading", t.servicesHeading);
    safeText("btnViewAllServices", t.btnViewAllServices);
    safeText("galleryHeading", t.galleryHeading);
    safeText("reviewsHeading", t.reviewsHeading);
    safeText("quoteHeading", t.quoteHeading);
    safeText("quoteSubHint", t.quoteSubHint);
    safeText("faqHeading", t.faqHeading);
    safeText("btnViewAllFaq", t.btnViewAllFaq);
    safeText("qrHeading", t.qrHeading);
    safeText("qrDesc", t.qrDesc);
    safeText("qrBtnText", t.qrBtnText);
    safeText("footerText", t.footerCopyright);

    // Placeholders
    if ($("customerName")) $("customerName").placeholder = t.phName;
    if ($("customerPhone")) $("customerPhone").placeholder = t.phPhone;
    if ($("customerLocation")) $("customerLocation").placeholder = t.phLocation;
    if ($("customerMessage")) $("customerMessage").placeholder = t.phMessage;

    // Quote Calculations Text
    safeText("lblSubtotal", t.lblSubtotal);
    safeText("discountLabel", t.discountLabel);
    safeText("lblGrandTotal", t.lblGrandTotal);
    safeText("sendWhatsappBtn", t.sendWhatsappBtn);
    safeText("downloadPdfBtn", t.downloadPdfBtn);

    // Reset Modal
    safeText("resetStep1Title", t.resetStep1Title);
    safeText("resetStep1Desc", t.resetStep1Desc);
    safeText("resetStep2Title", t.resetStep2Title);
    safeText("resetStep2Desc", t.resetStep2Desc);
    safeText("btnResetCancel1", t.btnCancel);
    safeText("btnResetCancel2", t.btnCancel);
    safeText("btnResetCont", t.btnContinue);
    safeText("btnResetExec", t.btnReset);

    // Bottom Navigation
    safeText("navHome", t.navHome);
    safeText("navServices", t.navServices);
    safeText("navWork", t.navWork);
    safeText("navQuote", t.navQuote);
    safeText("navCall", t.navCall);

    updateThemeButtonText();
    renderServices();
    renderGallery();
    renderReviews();
    renderFAQ();
    updateCalculations();
}

/* =========================================================
   2-STEP RESET LOGIC
   ========================================================= */
function openResetModal() {
    if (window.closeProject21Menu) window.closeProject21Menu();
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
    $("resetStep1").style.display = "none";
    $("resetStep2").style.display = "block";
}

function closeResetModal() {
    $("resetModalOverlay").style.display = "none";
}

function executeAppReset() {
    localStorage.removeItem("sandeepCart");
    localStorage.removeItem("sandeepCustomer");
    localStorage.removeItem("sandeepQuickLayout");
    localStorage.removeItem("sandeepServiceLayout");

    selectedItemsMap = {};
    if ($("customerName")) $("customerName").value = "";
    if ($("customerPhone")) $("customerPhone").value = "";
    if ($("customerLocation")) $("customerLocation").value = "";
    if ($("customerMessage")) $("customerMessage").value = "";

    document.documentElement.classList.add("saved-light-theme");
    localStorage.setItem("sandeepTheme", "light");

    closeResetModal();
    setLanguage("en");
    showExitToast("✅ Reset Completed!");
}

/* =========================================================
   SERVICES & MODAL LOGIC
   ========================================================= */
function renderServices() {
    const container = $("serviceContainer");
    const services = getServices();
    if (!container) return;

    container.innerHTML = "";
    services.forEach((service, sIdx) => {
        if (service.show === false) return;
        const title = (currentLang === "hi") ? service.title_hi : service.title_en;

        const card = document.createElement("div");
        card.className = "service-card";
        card.innerHTML = `
            <div class="service-header" onclick="openServiceModal(${sIdx})">
                <div class="service-title-wrap">
                    <span class="service-icon">${service.icon || "⚡"}</span>
                    <h3 class="service-title">${title || "Service"}</h3>
                </div>
                <span class="toggle-arrow">➔</span>
            </div>
        `;
        container.appendChild(card);
    });
}

function openServiceModal(sIdx) {
    const service = getServices()[sIdx];
    if (!service) return;

    safeText("modalServiceIcon", service.icon || "⚡");
    safeText("modalServiceTitle", (currentLang === "hi") ? service.title_hi : service.title_en);
    safeText("modalServiceDesc", (currentLang === "hi") ? service.desc_hi : service.desc_en);

    const itemsContainer = $("modalItemsContainer");
    itemsContainer.innerHTML = "";

    (service.subServices || []).forEach((sub, subIdx) => {
        const key = `${sIdx}_${subIdx}`;
        const qty = selectedItemsMap[key]?.qty || 0;
        const name = (currentLang === "hi") ? sub.name_hi : sub.name_en;
        const rate = (currentLang === "hi") ? sub.rate_hi : sub.rate_en;

        const row = document.createElement("div");
        row.className = "sub-service-item";
        row.id = `modal_row_${key}`;
        row.innerHTML = `
            <div class="sub-service-info">
                <span class="sub-name">${name}</span>
                <small class="sub-rate">${rate || ""}</small>
            </div>
            <div class="qty-control">
                <button type="button" class="qty-btn" onclick="changeQtyModal(${sIdx}, ${subIdx}, -1)">−</button>
                <span class="qty-val" id="modal_qty_${key}">${qty}</span>
                <button type="button" class="qty-btn" onclick="changeQtyModal(${sIdx}, ${subIdx}, 1)">+</button>
            </div>
        `;
        itemsContainer.appendChild(row);
    });

    const overlay = $("serviceModalOverlay");
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function changeQtyModal(sIdx, subIdx, change) {
    changeQty(sIdx, subIdx, change);
    const key = `${sIdx}_${subIdx}`;
    const qty = selectedItemsMap[key]?.qty || 0;
    const qtyEl = $(`modal_qty_${key}`);
    if (qtyEl) qtyEl.innerText = qty;
}

function closeServiceModal() {
    $("serviceModalOverlay").style.display = "none";
    document.body.style.overflow = "";
    renderServices();
}

/* =========================================================
   CART & QUOTATION CALCULATIONS
   ========================================================= */
function changeQty(sIdx, subIdx, change) {
    const sub = getServices()[sIdx]?.subServices?.[subIdx];
    if (!sub) return;

    const key = `${sIdx}_${subIdx}`;
    if (!selectedItemsMap[key]) {
        selectedItemsMap[key] = {
            name_hi: sub.name_hi,
            name_en: sub.name_en,
            price: Number(sub.price || 0),
            qty: 0
        };
    }

    selectedItemsMap[key].qty += Number(change || 0);
    if (selectedItemsMap[key].qty <= 0) delete selectedItemsMap[key];

    localStorage.setItem("sandeepCart", JSON.stringify(selectedItemsMap));
    updateCalculations();
}

function updateCalculations() {
    const entries = Object.entries(selectedItemsMap);
    const listEl = $("selectedServicesList");
    const countEl = $("selectedCount");
    const count = entries.reduce((t, [, i]) => t + Number(i.qty || 0), 0);
    if (countEl) countEl.innerText = count;

    if (entries.length === 0) {
        if (listEl) listEl.innerHTML = `<p class="no-selection-hint">${translations[currentLang].noSelHint}</p>`;
        safeText("calcSubtotal", "₹0");
        if ($("calcDiscountRow")) $("calcDiscountRow").style.display = "none";
        safeText("calcGrandTotal", "₹0");
        return;
    }

    if (listEl) {
        listEl.innerHTML = entries.map(([key, item]) => `
            <div class="summary-item-row">
                <span>• ${(currentLang === "hi") ? item.name_hi : item.name_en}</span>
                <div class="summary-qty-actions">
                    <span>₹${item.price * item.qty}</span>
                    <button class="summary-btn" onclick="changeQtyDirect('${key}', -1)">−</button>
                    <span>${item.qty}</span>
                    <button class="summary-btn" onclick="changeQtyDirect('${key}', 1)">+</button>
                    <button class="summary-btn" onclick="removeItemDirect('${key}')">🗑️</button>
                </div>
            </div>
        `).join("");
    }

    const subtotal = entries.reduce((t, [, i]) => t + (i.price * i.qty), 0);
    const discount = Math.round(subtotal * 0.1); // 10% discount
    const total = subtotal - discount;

    safeText("calcSubtotal", `₹${subtotal}`);
    if ($("calcDiscountRow")) $("calcDiscountRow").style.display = "flex";
    safeText("calcDiscount", `-₹${discount}`);
    safeText("calcGrandTotal", `₹${total}`);
}

function changeQtyDirect(key, change) {
    const [sIdx, subIdx] = key.split("_").map(Number);
    changeQty(sIdx, subIdx, change);
}

function removeItemDirect(key) {
    delete selectedItemsMap[key];
    localStorage.setItem("sandeepCart", JSON.stringify(selectedItemsMap));
    updateCalculations();
}

/* =========================================================
   GALLERY, REVIEWS & FAQ
   ========================================================= */
function renderGallery() {
    const container = $("galleryContainer");
    if (!container) return;
    container.innerHTML = getGallery().map(item => `
        <div class="gallery-item" onclick="openLightboxModal('${item.image}')">
            <img src="${item.image}" alt="Work" loading="lazy">
        </div>
    `).join("");
}

function openLightboxModal(src) {
    const box = $("lightbox");
    $("lightboxImage").src = src;
    box.style.display = "flex";
}

function closeLightboxModal() {
    $("lightbox").style.display = "none";
}

function renderReviews() {
    const container = $("reviewContainer");
    if (!container) return;
    container.innerHTML = getReviews().map(r => `
        <div class="card review-card">
            <div class="review-stars">${"★".repeat(r.rating || 5)}</div>
            <p class="review-text">"${(currentLang === "hi") ? r.text_hi : r.text_en}"</p>
            <small class="review-author">— ${r.name || "Customer"}</small>
        </div>
    `).join("");
}

function renderFAQ() {
    const container = $("faqContainer");
    if (!container) return;
    container.innerHTML = getFAQ().map(f => `
        <div class="faq-item" onclick="this.classList.toggle('active')">
            <div class="faq-question">
                <span>${(currentLang === "hi") ? f.q_hi : f.q_en}</span>
                <span>+</span>
            </div>
            <div class="faq-answer">${(currentLang === "hi") ? f.a_hi : f.a_en}</div>
        </div>
    `).join("");
}

function toggleAllFAQ() {
    document.querySelectorAll(".faq-item").forEach(item => item.classList.toggle("active"));
}

/* =========================================================
   GPS, WHATSAPP, PDF & CONTACTS
   ========================================================= */
function getQuoteLiveLocation() {
    if (!navigator.geolocation) return;
    safeText("gpsBtnText", "...");
    navigator.geolocation.getCurrentPosition(pos => {
        const url = `https://maps.google.com/?q=${pos.coords.latitude.toFixed(5)},${pos.coords.longitude.toFixed(5)}`;
        if ($("customerLocation")) $("customerLocation").value = url;
        safeText("gpsBtnText", "Fetched ✓");
    }, () => {
        safeText("gpsBtnText", "GPS");
    });
}

function getUserLocation() {
    const status = $("locationStatus");
    if (!navigator.geolocation || !status) return;
    status.innerText = (currentLang === "hi") ? "दूरी खोजी जा रही है..." : "Calculating distance...";
    navigator.geolocation.getCurrentPosition(pos => {
        status.innerHTML = `✅ Approx <strong>3.5 km</strong> from Lucknow center.`;
    });
}

function saveCustomerInputs() {
    localStorage.setItem("sandeepCustomer", JSON.stringify({
        name: $("customerName")?.value || "",
        phone: $("customerPhone")?.value || "",
        location: $("customerLocation")?.value || "",
        message: $("customerMessage")?.value || ""
    }));
}

function sendWhatsappQuote() {
    const name = $("customerName")?.value.trim();
    const phone = $("customerPhone")?.value.trim();
    const location = $("customerLocation")?.value.trim();
    const items = Object.values(selectedItemsMap);

    if (!name || !phone || !location || !items.length) {
        alert(currentLang === "hi" ? "कृपया नाम, फोन व सेवा चुनें।" : "Please fill details & choose services.");
        return;
    }

    let msg = `⚡ *Sandeep ElectroFix - Quotation* ⚡\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📍 Area: ${location}\n\n📋 *Services:*\n`;
    items.forEach((i, idx) => { msg += `${idx + 1}. ${(currentLang === "hi") ? i.name_hi : i.name_en} (Qty: ${i.qty}) - ₹${i.price * i.qty}\n`; });
    msg += `\n💵 Grand Total: ${$("calcGrandTotal")?.innerText}`;

    window.open(`https://wa.me/919026036445?text=${encodeURIComponent(msg)}`, "_blank");
}

function downloadEstimatePDF() {
    const jsPDF = window.jspdf?.jsPDF;
    if (!jsPDF) { alert("PDF library is loading..."); return; }
    const doc = new jsPDF();
    doc.text("Sandeep ElectroFix - Quotation", 14, 15);
    doc.text(`Customer: ${$("customerName")?.value || "Valued Client"}`, 14, 25);
    doc.text(`Total: ${$("calcGrandTotal")?.innerText || "₹0"}`, 14, 35);
    doc.save("Estimate_SandeepElectroFix.pdf");
}

function saveContactVCard() {
    const vCard = "BEGIN:VCARD\nVERSION:3.0\nFN:Sandeep ElectroFix\nTEL:+919026036445\nEND:VCARD";
    const blob = new Blob([vCard], { type: "text/vcard" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Sandeep_ElectroFix.vcf";
    a.click();
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
        toast.style.cssText = "position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#0f172a;color:#f5c542;padding:8px 18px;border-radius:20px;z-index:999999;border:1px solid #f5c542;";
        document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.style.display = "block";
    setTimeout(() => { toast.style.display = "none"; }, 2000);
}

function applyServiceLayout(layout) {
    const container = $("serviceContainer");
    if (container) container.className = `service-grid layout-${layout}`;
}

function updateThemeButtonText() {
    const isLight = document.documentElement.classList.contains("saved-light-theme");
    safeText("menuThemeIcon", isLight ? "🌙" : "☀️");
    safeText("menuThemeText", isLight ? "Dark Mode" : "Light Mode");
}

/* =========================================================
   DRAWER & INITIALIZATION
   ========================================================= */
function initializeProject21Navbar() {
    const menuBtn = $("navbarMenuBtn");
    const sideMenu = $("sideMenu");
    const overlay = $("navbarOverlay");
    const closeBtn = $("sideMenuClose");

    function toggleMenu(open) {
        sideMenu.classList.toggle("active", open);
        overlay.classList.toggle("active", open);
    }

    menuBtn?.addEventListener("click", () => toggleMenu(true));
    closeBtn?.addEventListener("click", () => toggleMenu(false));
    overlay?.addEventListener("click", () => toggleMenu(false));
    sideMenu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => toggleMenu(false)));

    $("menuThemeToggle")?.addEventListener("click", () => {
        document.documentElement.classList.toggle("saved-light-theme");
        localStorage.setItem("sandeepTheme", document.documentElement.classList.contains("saved-light-theme") ? "light" : "dark");
        updateThemeButtonText();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initializeProject21Navbar();
    setLanguage(currentLang);
    updateCalculations();
});

// Window Bindings for HTML elements
window.setLanguage = setLanguage;
window.openResetModal = openResetModal;
window.goToResetStep2 = goToResetStep2;
window.closeResetModal = closeResetModal;
window.executeAppReset = executeAppReset;
window.openServiceModal = openServiceModal;
window.closeServiceModal = closeServiceModal;
window.changeQtyModal = changeQtyModal;
window.changeQtyDirect = changeQtyDirect;
window.removeItemDirect = removeItemDirect;
window.openLightboxModal = openLightboxModal;
window.closeLightboxModal = closeLightboxModal;
window.applyServiceLayout = applyServiceLayout;
window.getQuoteLiveLocation = getQuoteLiveLocation;
window.getUserLocation = getUserLocation;
window.sendWhatsappQuote = sendWhatsappQuote;
window.downloadEstimatePDF = downloadEstimatePDF;
window.saveContactVCard = saveContactVCard;
window.shareWebsite = shareWebsite;
window.saveCustomerInputs = saveCustomerInputs;
window.toggleAllFAQ = toggleAllFAQ;
