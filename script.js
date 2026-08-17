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

function exists(id) {
    return !!$(id);
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
    return Array.isArray(getConfig().services)
        ? getConfig().services
        : [];
}

function getGallery() {
    return Array.isArray(getConfig().gallery)
        ? getConfig().gallery
        : [];
}

function getReviews() {
    return Array.isArray(getConfig().reviews)
        ? getConfig().reviews
        : [];
}

function getFAQ() {
    return Array.isArray(getConfig().faq)
        ? getConfig().faq
        : [];
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
   CART LOAD
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
        localStorage.setItem(
            "sandeepCustomer",
            JSON.stringify(data)
        );
    } catch (error) {
        console.warn("Customer storage failed:", error);
    }
}


function restoreCustomerInputs() {

    try {

        const saved =
            localStorage.getItem("sandeepCustomer");

        if (!saved) return;

        const data = JSON.parse(saved);

        if ($("customerName")) {
            $("customerName").value = data.name || "";
        }

        if ($("customerPhone")) {
            $("customerPhone").value = data.phone || "";
        }

        if ($("customerLocation")) {
            $("customerLocation").value =
                data.location || "";
        }

        if ($("customerMessage")) {
            $("customerMessage").value =
                data.message || "";
        }

    } catch (error) {
        console.warn("Customer restore failed:", error);
    }
}


/* =========================================================
   MASTER RESET
========================================================= */

function resetAllToDefault() {

    const confirmMsg =
        currentLang === "hi"
            ? "क्या आप सभी चुनी गई सेवाओं, फॉर्म डेटा और सेटिंग्स को रीसेट करना चाहते हैं?"
            : "Are you sure you want to reset all selected services, inputs and settings to default?";

    if (!confirm(confirmMsg)) return;

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

    if (gpsBtn) {
        gpsBtn.classList.remove("active-loc");
    }

    if (gpsBtnText) {
        gpsBtnText.innerText = "GPS";
    }

    document.documentElement.classList.add(
        "saved-light-theme"
    );

    localStorage.setItem(
        "sandeepTheme",
        "light"
    );

    applyQuickLayout("grid-2");
    applyServiceLayout("list");

    setLanguage("en");

    showExitToast(
        "✅ Reset to English & Light Mode successfully"
    );
}


/* =========================================================
   GPS — QUOTE LOCATION
========================================================= */

function getQuoteLiveLocation() {

    const locInput = $("customerLocation");
    const gpsBtn = $("btnGpsDetect");
    const gpsBtnText = $("gpsBtnText");

    if (!navigator.geolocation) {

        alert(
            currentLang === "hi"
                ? "आपके ब्राउज़र में GPS सपोर्ट नहीं है।"
                : "Geolocation is not supported by your browser."
        );

        return;
    }

    if (gpsBtnText) {
        gpsBtnText.innerText = "...";
    }

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const lat =
                position.coords.latitude.toFixed(5);

            const lng =
                position.coords.longitude.toFixed(5);

            const mapUrl =
                `https://maps.google.com/?q=${lat},${lng}`;

            if (locInput) {

                locInput.value =
                    `${lat}, ${lng} (${mapUrl})`;

                saveCustomerInputs();
            }

            if (gpsBtn) {
                gpsBtn.classList.add("active-loc");
            }

            if (gpsBtnText) {

                gpsBtnText.innerText =
                    currentLang === "hi"
                        ? "मिल गया ✓"
                        : "Fetched ✓";
            }
        },

        function() {

            alert(
                currentLang === "hi"
                    ? "लोकेशन की परमिशन नहीं मिली। कृपया हाथ से पता टाइप करें।"
                    : "Location permission denied. Please type address manually."
            );

            if (gpsBtnText) {
                gpsBtnText.innerText = "GPS";
            }
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
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

        el.style.display =
            show ? "" : "none";
    };

    toggle("heroSection", ctrl.showHero);
    toggle("discountSection", ctrl.showDiscount);
    toggle("quickAccessBar", ctrl.showQuickAccess);
    toggle("socialSection", ctrl.showSocialLinks);
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

    toggle("themeToggle", ctrl.showThemeToggle);
    toggle("languageSwitcher", ctrl.showLanguageSwitcher);

    toggle(
        "btnResetAll",
        ctrl.showResetBtn !== false
    );

    toggle("businessLogo", ctrl.showLogo);
    toggle("businessTagline", ctrl.showTagline);
    toggle("businessLocation", ctrl.showHeroLocation);

    toggle(
        "callBtn",
        ctrl.showHeroCallBtn
    );

    toggle(
        "whatsappBtn",
        ctrl.showHeroWhatsappBtn
    );

    toggle(
        "btnQuickCall",
        ctrl.showQuickCall
    );

    toggle(
        "btnQuickWhatsapp",
        ctrl.showQuickWhatsapp
    );

    toggle(
        "btnQuickEmail",
        ctrl.showQuickEmail
    );

    toggle(
        "btnQuickWebsite",
        ctrl.showQuickWebsite
    );

    toggle(
        "btnQuickMaps",
        ctrl.showQuickMaps
    );

    toggle(
        "btnQuickSaveContact",
        ctrl.showQuickSaveContact
    );

    toggle(
        "btnQuickShare",
        ctrl.showQuickShare
    );

    toggle(
        "btnQuickWork",
        ctrl.showQuickWork
    );

    toggle(
        "btnQuickCatalogue",
        ctrl.showQuickCatalogue
    );

    toggle(
        "btnFacebook",
        ctrl.showFacebook
    );

    toggle(
        "btnInstagram",
        ctrl.showInstagram
    );

    toggle(
        "btnYoutube",
        ctrl.showYoutube
    );

    toggle(
        "sendWhatsappBtn",
        ctrl.showQuoteWhatsappBtn
    );

    toggle(
        "downloadPdfBtn",
        ctrl.showQuotePdfBtn
    );

    /* =====================================================
       BUSINESS LINKS
    ===================================================== */

    if ($("btnFacebook") && biz.facebook) {
        $("btnFacebook").href = biz.facebook;
    }

    if ($("btnInstagram") && biz.instagram) {
        $("btnInstagram").href = biz.instagram;
    }

    if ($("btnYoutube") && biz.youtube) {
        $("btnYoutube").href = biz.youtube;
    }

    if ($("btnQuickEmail") && biz.email) {
        $("btnQuickEmail").href =
            `mailto:${biz.email}`;
    }

    if ($("btnQuickWebsite") && biz.website) {
        $("btnQuickWebsite").href =
            biz.website;
    }

    if ($("btnQuickMaps") && biz.googleMaps) {
        $("btnQuickMaps").href =
            biz.googleMaps;
    }

    if ($("callBtn") && biz.phone) {
        $("callBtn").href =
            `tel:${biz.phone}`;
    }

    if ($("btnQuickCall") && biz.phone) {
        $("btnQuickCall").href =
            `tel:${biz.phone}`;
    }

    if ($("whatsappBtn") && biz.whatsapp) {
        $("whatsappBtn").href =
            `https://wa.me/${biz.whatsapp}`;
    }

    if ($("btnQuickWhatsapp") && biz.whatsapp) {
        $("btnQuickWhatsapp").href =
            `https://wa.me/${biz.whatsapp}`;
    }
}


/* =========================================================
   THEME BUTTON
========================================================= */

function updateThemeButtonText() {

    const isLight =
        document.documentElement.classList.contains(
            "saved-light-theme"
        );

    const themeIcon = $("themeIcon");
    const themeText = $("themeText");

    if (!themeIcon || !themeText) return;

    themeIcon.innerText =
        isLight ? "🌙" : "☀️";

    themeText.innerText =
        isLight
            ? (
                currentLang === "hi"
                    ? "डार्क मोड"
                    : "Dark Mode"
            )
            : (
                currentLang === "hi"
                    ? "लाइट मोड"
                    : "Light Mode"
            );
}


/* =========================================================
   LANGUAGE
========================================================= */

function setLanguage(lang) {

    currentLang =
        lang === "en" ? "en" : "hi";

    localStorage.setItem(
        "sandeepLang",
        currentLang
    );

    document
        .querySelectorAll(".language-btn")
        .forEach(function(button) {

            button.classList.toggle(
                "active",
                button.getAttribute("data-lang") ===
                currentLang
            );

        });

    const isHi =
        currentLang === "hi";

    const cfg = getConfig();
    const biz = cfg.business || {};
    const ctrl = cfg.controls || {};

    /* =====================================================
       HEADER
    ===================================================== */

    safeText(
        "resetBtnText",
        isHi ? "रीसेट" : "Reset"
    );

    safeText(
        "businessTitle",
        biz.name || "Sandeep ElectroFix"
    );

    safeText(
        "businessTagline",
        isHi
            ? (biz.tagline_hi || "")
            : (biz.tagline_en || "")
    );

    safeText(
        "businessLocation",
        isHi
            ? `📍 ${biz.location_hi || ""}`
            : `📍 ${biz.location_en || ""}`
    );

    safeText(
        "callBtnText",
        isHi
            ? "📞 अभी कॉल करें"
            : "📞 Call Now"
    );

    safeText(
        "whatsappBtnText",
        isHi
            ? "💬 व्हाट्सएप करें"
            : "💬 WhatsApp"
    );

    /* =====================================================
       DISCOUNT
    ===================================================== */

    const discountPercent =
        Number(ctrl.discountPercent || 0);

    safeText(
        "discountBadge",
        isHi
            ? "🔥 विशेष ऑफर"
            : "🔥 SPECIAL OFFER"
    );

    safeText(
        "discountTitle",
        isHi
            ? "विशेष छूट"
            : "Special Discount"
    );

    safeText(
        "discountPercentage",
        discountPercent
    );

    safeText(
        "discountMessage",
        isHi
            ? `इलेक्ट्रिकल सेवाओं पर ${discountPercent}% की भारी छूट पाएं`
            : `Get ${discountPercent}% OFF on selected electrical services.`
    );

    safeText(
        "discountValidity",
        isHi
            ? "⏳ सीमित समय के लिए"
            : "⏳ Limited Time Offer"
    );

    safeText(
        "discountBtnText",
        isHi
            ? "⚡ छूट प्राप्त करें"
            : "⚡ Get Discount"
    );

    /* =====================================================
       QUICK ACCESS
    ===================================================== */

    safeText(
        "quickHeading",
        isHi ? "त्वरित सेवाएँ" : "Quick Access"
    );

    safeText(
        "labelCall",
        isHi ? "कॉल करें" : "Call"
    );

    safeText(
        "labelWhatsapp",
        isHi ? "व्हाट्सएप" : "WhatsApp"
    );

    safeText(
        "labelEmail",
        isHi ? "ईमेल" : "Email"
    );

    safeText(
        "labelWeb",
        isHi ? "वेबसाइट" : "Website"
    );

    safeText(
        "labelMap",
        isHi ? "गूगल मैप्स" : "Google Maps"
    );

    safeText(
        "labelSaveContact",
        isHi ? "नंबर सेव करें" : "Save Contact"
    );

    safeText(
        "labelShare",
        isHi ? "शेयर करें" : "Share"
    );

    safeText(
        "labelWork",
        isHi ? "हमारे कार्य" : "Our Work"
    );

    safeText(
        "labelCatalogue",
        isHi ? "सामग्री सूची" : "Catalogue"
    );

    safeText(
        "socialHeading",
        isHi
            ? "हमसे सोशल मीडिया पर जुड़ें"
            : "Connect on Social Media"
    );

    /* =====================================================
       ABOUT
    ===================================================== */

    safeText(
        "aboutHeading",
        isHi ? "हमारे बारे में" : "About Us"
    );

    safeHTML(
        "aboutText",
        isHi
            ? `<strong>${escapeHTML(biz.name || "Sandeep ElectroFix")}</strong> में आपका स्वागत है। हम लखनऊ में पेशेवर इलेक्ट्रीशियन सेवाएँ प्रदान करते हैं, जिसमें हाउस वायरिंग, फॉल्स सीलिंग वायरिंग, एमसीबी और डीबी इंस्टॉलेशन, पंखा और लाइट फिटिंग, इन्वर्टर वायरिंग, फॉल्ट रिपेयर और मेंटेनेंस शामिल हैं।`
            : `Welcome to <strong>${escapeHTML(biz.name || "Sandeep ElectroFix")}</strong>. We provide professional electrical services across Lucknow, including house wiring, false ceiling wiring, MCB & DB installation, fan and light fitting, inverter wiring, fault repair, and general maintenance.`
    );

    /* =====================================================
       LOCATION
    ===================================================== */

    safeText(
        "locHeading",
        isHi
            ? "📍 सेवा क्षेत्र एवं लोकेशन"
            : "📍 Service Location"
    );

    safeText(
        "locDesc",
        isHi
            ? "पूरे लखनऊ और आसपास के क्षेत्रों में ऑन-साइट इलेक्ट्रीशियन सेवा उपलब्ध।"
            : "Providing on-site electrical services across Lucknow."
    );

    safeText(
        "distBtnText",
        isHi
            ? "हमारे यहाँ से अपनी दूरी चेक करें"
            : "Check Your Distance from Us"
    );

    safeText(
        "mapBtnText",
        isHi
            ? "गूगल मैप्स पर रास्ता देखें"
            : "Get Directions on Google Maps"
    );

    /* =====================================================
       SERVICES
    ===================================================== */

    safeText(
        "servicesHeading",
        isHi ? "हमारी सेवाएँ" : "Our Services"
    );

    /* =====================================================
       GALLERY
    ===================================================== */

    safeText(
        "galleryHeading",
        isHi
            ? "हमारे द्वारा किए गए कार्य"
            : "Our Work"
    );

    /* =====================================================
       QR
    ===================================================== */

    safeText(
        "qrHeading",
        isHi
            ? "क्यूआर कोड स्कैन करें"
            : "Scan QR Code"
    );

    safeText(
        "qrDesc",
        isHi
            ? "हमारा डिजिटल कार्ड सेव करने या भुगतान के लिए यह क्यूआर कोड स्कैन करें।"
            : "Scan this QR code to quickly save our digital card or pay."
    );

    safeText(
        "qrBtnText",
        isHi
            ? "📥 क्यूआर कोड डाउनलोड करें"
            : "📥 Download QR Code"
    );

    /* =====================================================
       REVIEWS
    ===================================================== */

    safeText(
        "reviewsHeading",
        isHi
            ? "ग्राहकों की राय"
            : "Customer Reviews"
    );

    /* =====================================================
       QUOTE
    ===================================================== */

    safeText(
        "quoteHeading",
        isHi
            ? "कोटेशन व अनुमानित खर्च"
            : "Estimate & Quotation"
    );

    if ($("customerName")) {
        $("customerName").placeholder =
            isHi
                ? "आपका नाम *"
                : "Your Name *";
    }

    if ($("customerPhone")) {
        $("customerPhone").placeholder =
            isHi
                ? "मोबाइल नंबर *"
                : "Mobile Number *";
    }

    if ($("customerLocation")) {
        $("customerLocation").placeholder =
            isHi
                ? "आपका पता / एरिया *"
                : "Your Address / Area *";
    }

    if ($("customerMessage")) {
        $("customerMessage").placeholder =
            isHi
                ? "कार्य का अतिरिक्त विवरण (वैकल्पिक)..."
                : "Additional work details (optional)...";
    }

    const count =
        Object.values(selectedItemsMap)
            .reduce(
                (acc, item) =>
                    acc + Number(item.qty || 0),
                0
            );

    if ($("summaryHeader")) {

        $("summaryHeader").innerHTML =
            isHi
                ? `चुनी गई सेवाएँ (<span id="selectedCount">${count}</span>)`
                : `Selected Services (<span id="selectedCount">${count}</span>)`;
    }

    safeText(
        "lblSubtotal",
        isHi ? "कुल राशि:" : "Subtotal:"
    );

    safeText(
        "lblGrandTotal",
        isHi ? "अंतिम राशि:" : "Grand Total:"
    );

    safeText(
        "discountLabel",
        isHi
            ? `विशेष छूट (${discountPercent}% OFF):`
            : `Special Discount (${discountPercent}% OFF):`
    );

    safeText(
        "sendWhatsappBtn",
        isHi
            ? "💬 व्हाट्सएप पर भेजें"
            : "💬 Send on WhatsApp"
    );

    safeText(
        "downloadPdfBtn",
        isHi
            ? "📄 पीडीएफ एस्टीमेट डाउनलोड करें"
            : "📄 Download PDF Estimate"
    );

    /* =====================================================
       FAQ
    ===================================================== */

    safeText(
        "faqHeading",
        isHi
            ? "अक्सर पूछे जाने वाले सवाल"
            : "Frequently Asked Questions"
    );

    /* =====================================================
       BOTTOM NAV
    ===================================================== */

    safeText(
        "navHome",
        isHi ? "होम" : "Home"
    );

    safeText(
        "navServices",
        isHi ? "सेवाएं" : "Services"
    );

    safeText(
        "navWork",
        isHi ? "कार्य" : "Work"
    );

    safeText(
        "navQuote",
        isHi ? "कोट" : "Quote"
    );

    safeText(
        "navCall",
        isHi ? "कॉल" : "Call"
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
   SERVICES
========================================================= */

function renderServices() {

    const container =
        $("serviceContainer");

    const services =
        getServices();

    if (!container) {
        console.warn(
            "serviceContainer not found."
        );
        return;
    }

    if (!services.length) {

        container.innerHTML =
            `<p class="no-selection-hint">
                ${currentLang === "hi"
                    ? "कोई सेवा उपलब्ध नहीं है।"
                    : "No services available."}
             </p>`;

        return;
    }

    container.innerHTML = "";

    services.forEach(
        function(service, sIdx) {

            if (service.show === false) return;

            const title =
                currentLang === "hi"
                    ? service.title_hi
                    : service.title_en;

            let activeCount = 0;

            const subServices =
                Array.isArray(service.subServices)
                    ? service.subServices
                    : [];

            subServices.forEach(
                function(_, subIdx) {

                    const item =
                        selectedItemsMap[
                            `${sIdx}_${subIdx}`
                        ];

                    if (item) {
                        activeCount +=
                            Number(item.qty || 0);
                    }
                }
            );

            const card =
                document.createElement("div");

            card.className =
                `service-card ${
                    activeCount > 0
                        ? "has-active-items"
                        : ""
                }`;

            card.innerHTML = `
                <div
                    class="service-header"
                    role="button"
                    tabindex="0"
                    data-service-index="${sIdx}"
                >
                    <div class="service-title-wrap">

                        <span class="service-icon">
                            ${escapeHTML(service.icon || "⚡")}
                        </span>

                        <h3 class="service-title">
                            ${escapeHTML(title || "Service")}
                        </h3>

                    </div>

                    <span class="toggle-arrow">
                        ➔
                    </span>

                </div>
            `;

            const header =
                card.querySelector(".service-header");

            if (header) {

                header.addEventListener(
                    "click",
                    function() {
                        openServiceModal(sIdx);
                    }
                );

                header.addEventListener(
                    "keydown",
                    function(event) {

                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();

                            openServiceModal(sIdx);
                        }
                    }
                );
            }

            container.appendChild(card);
        }
    );
}


/* =========================================================
   SERVICE MODAL
========================================================= */

function openServiceModal(sIdx) {

    const services = getServices();
    const service = services[sIdx];

    if (!service) return;

    const title =
        currentLang === "hi"
            ? service.title_hi
            : service.title_en;

    const desc =
        currentLang === "hi"
            ? service.desc_hi
            : service.desc_en;

    safeText(
        "modalServiceIcon",
        service.icon || "⚡"
    );

    safeText(
        "modalServiceTitle",
        title || "Service"
    );

    safeText(
        "modalServiceDesc",
        desc || ""
    );

    const itemsContainer =
        $("modalItemsContainer");

    if (!itemsContainer) {
        console.warn(
            "modalItemsContainer not found."
        );
        return;
    }

    const subServices =
        Array.isArray(service.subServices)
            ? service.subServices
            : [];

    itemsContainer.innerHTML = "";

    subServices.forEach(
        function(sub, subIdx) {

            if (sub.show === false) return;

            const key =
                `${sIdx}_${subIdx}`;

            const selected =
                selectedItemsMap[key];

            const qty =
                selected
                    ? Number(selected.qty || 0)
                    : 0;

            const name =
                currentLang === "hi"
                    ? sub.name_hi
                    : sub.name_en;

            const rate =
                currentLang === "hi"
                    ? sub.rate_hi
                    : sub.rate_en;

            const row =
                document.createElement("div");

            row.className =
                `sub-service-item ${
                    qty > 0 ? "has-qty" : ""
                }`;

            row.id =
                `modal_row_${key}`;

            row.innerHTML = `

                <div class="sub-service-info">

                    <span class="sub-name">
                        ${escapeHTML(name || "Service")}
                    </span>

                    <span class="sub-rate">
                        ${escapeHTML(rate || "")}
                    </span>

                </div>

                <div class="qty-control">

                    <button
                        type="button"
                        class="qty-btn minus-btn"
                        data-action="minus"
                    >
                        −
                    </button>

                    <span
                        class="qty-val"
                        id="modal_qty_${key}"
                    >
                        ${qty}
                    </span>

                    <button
                        type="button"
                        class="qty-btn plus-btn"
                        data-action="plus"
                    >
                        +
                    </button>

                </div>
            `;

            const minus =
                row.querySelector(
                    '[data-action="minus"]'
                );

            const plus =
                row.querySelector(
                    '[data-action="plus"]'
                );

            if (minus) {

                minus.addEventListener(
                    "click",
                    function(event) {

                        event.preventDefault();
                        event.stopPropagation();

                        changeQtyModal(
                            sIdx,
                            subIdx,
                            -1
                        );
                    }
                );
            }

            if (plus) {

                plus.addEventListener(
                    "click",
                    function(event) {

                        event.preventDefault();
                        event.stopPropagation();

                        changeQtyModal(
                            sIdx,
                            subIdx,
                            1
                        );
                    }
                );
            }

            itemsContainer.appendChild(row);
        }
    );

    const overlay =
        $("serviceModalOverlay");

    if (!overlay) return;

    overlay.style.display = "flex";

    requestAnimationFrame(
        function() {
            overlay.classList.add("active");
        }
    );

    document.body.style.overflow = "hidden";

    if (!modalHistoryAdded) {

        history.pushState(
            {
                project21Modal: true
            },
            "",
            window.location.href
        );

        modalHistoryAdded = true;
    }
}


/* =========================================================
   MODAL QUANTITY
========================================================= */

function changeQtyModal(
    sIdx,
    subIdx,
    change
) {

    changeQty(
        sIdx,
        subIdx,
        change
    );

    const key =
        `${sIdx}_${subIdx}`;

    const currentQty =
        selectedItemsMap[key]
            ? Number(selectedItemsMap[key].qty || 0)
            : 0;

    const mQty =
        $(`modal_qty_${key}`);

    const mRow =
        $(`modal_row_${key}`);

    if (mQty) {
        mQty.innerText =
            currentQty;
    }

    if (mRow) {

        mRow.classList.toggle(
            "has-qty",
            currentQty > 0
        );
    }
}


/* =========================================================
   CLOSE SERVICE MODAL
========================================================= */

function closeServiceModal(
    isFromHistory = false
) {

    const overlay =
        $("serviceModalOverlay");

    if (!overlay) return;

    const isOpen =
        overlay.style.display === "flex" ||
        overlay.classList.contains("active");

    if (!isOpen) return;

    overlay.classList.remove("active");

    setTimeout(
        function() {

            overlay.style.display = "none";

            document.body.style.overflow = "";

            renderServices();

        },
        250
    );

    if (
        !isFromHistory &&
        modalHistoryAdded
    ) {

        modalHistoryAdded = false;

        history.back();

    } else if (isFromHistory) {

        modalHistoryAdded = false;
    }
}


/* =========================================================
   LIGHTBOX
========================================================= */

function openLightboxModal(src) {

    const box =
        $("lightbox");

    const img =
        $("lightboxImage");

    if (!box || !img || !src) return;

    img.src = src;

    box.style.display = "flex";

    requestAnimationFrame(
        function() {
            box.classList.add("active");
        }
    );

    document.body.style.overflow = "hidden";

    if (!lightboxHistoryAdded) {

        history.pushState(
            {
                project21Lightbox: true
            },
            "",
            window.location.href
        );

        lightboxHistoryAdded = true;
    }
}


function closeLightboxModal(
    isFromHistory = false
) {

    const box =
        $("lightbox");

    if (!box) return;

    box.classList.remove("active");

    box.style.display = "none";

    document.body.style.overflow = "";

    if (
        !isFromHistory &&
        lightboxHistoryAdded
    ) {

        lightboxHistoryAdded = false;

        history.back();

    } else if (isFromHistory) {

        lightboxHistoryAdded = false;
    }
}


/* =========================================================
   EXIT TOAST
========================================================= */

function showExitToast(msg) {

    let toast =
        $("appExitToast");

    if (!toast) {

        toast =
            document.createElement("div");

        toast.id =
            "appExitToast";

        toast.style.position =
            "fixed";

        toast.style.bottom =
            "85px";

        toast.style.left =
            "50%";

        toast.style.transform =
            "translateX(-50%)";

        toast.style.background =
            "rgba(5,8,22,0.95)";

        toast.style.color =
            "#f5c542";

        toast.style.padding =
            "10px 22px";

        toast.style.borderRadius =
            "30px";

        toast.style.fontSize =
            "13px";

        toast.style.fontWeight =
            "600";

        toast.style.zIndex =
            "9999999";

        toast.style.boxShadow =
            "0 8px 30px rgba(0,0,0,0.7)";

        toast.style.border =
            "1px solid rgba(245,197,66,0.5)";

        toast.style.transition =
            "opacity .3s ease";

        toast.style.pointerEvents =
            "none";

        document.body.appendChild(
            toast
        );
    }

    toast.innerText =
        msg;

    toast.style.opacity =
        "1";

    toast.style.display =
        "block";

    clearTimeout(
        window.exitToastTimer
    );

    window.exitToastTimer =
        setTimeout(
            function() {

                toast.style.opacity =
                    "0";

                setTimeout(
                    function() {

                        toast.style.display =
                            "none";

                    },
                    300
                );

            },
            2000
        );
}


/* =========================================================
   CART QUANTITY
========================================================= */

function changeQty(
    sIdx,
    subIdx,
    change
) {

    const services =
        getServices();

    const service =
        services[sIdx];

    if (!service) return;

    const sub =
        Array.isArray(service.subServices)
            ? service.subServices[subIdx]
            : null;

    if (!sub) return;

    const key =
        `${sIdx}_${subIdx}`;

    if (!selectedItemsMap[key]) {

        selectedItemsMap[key] = {

            name_hi:
                sub.name_hi || "",

            name_en:
                sub.name_en || "",

            price:
                Number(sub.price || 0),

            qty: 0
        };
    }

    selectedItemsMap[key].qty +=
        Number(change || 0);

    if (
        selectedItemsMap[key].qty <= 0
    ) {

        delete selectedItemsMap[key];
    }

    try {

        localStorage.setItem(
            "sandeepCart",
            JSON.stringify(
                selectedItemsMap
            )
        );

    } catch (error) {

        console.warn(
            "Cart save failed:",
            error
        );
    }

    updateCalculations();
}


function changeQtyDirect(
    key,
    change
) {

    if (!selectedItemsMap[key]) return;

    const parts =
        key.split("_");

    const sIdx =
        parseInt(parts[0], 10);

    const subIdx =
        parseInt(parts[1], 10);

    if (
        Number.isNaN(sIdx) ||
        Number.isNaN(subIdx)
    ) return;

    changeQty(
        sIdx,
        subIdx,
        change
    );

    renderServices();
}


function removeItemDirect(key) {

    if (!selectedItemsMap[key]) return;

    delete selectedItemsMap[key];

    localStorage.setItem(
        "sandeepCart",
        JSON.stringify(
            selectedItemsMap
        )
    );

    updateCalculations();
    renderServices();
}


/* =========================================================
   CALCULATIONS
========================================================= */

function updateCalculations() {

    const entries =
        Object.entries(
            selectedItemsMap
        );

    const countEl =
        $("selectedCount");

    const listEl =
        $("selectedServicesList");

    const subtotalEl =
        $("calcSubtotal");

    const discRow =
        $("calcDiscountRow");

    const discEl =
        $("calcDiscount");

    const totalEl =
        $("calcGrandTotal");

    const ctrl =
        getControls();

    const count =
        entries.reduce(
            function(total, [, item]) {

                return total +
                    Number(item.qty || 0);

            },
            0
        );

    if (countEl) {
        countEl.innerText =
            count;
    }

    if (entries.length === 0) {

        if (listEl) {

            listEl.innerHTML =
                `<p class="no-selection-hint">
                    ${
                        currentLang === "hi"
                            ? "अभी तक कोई सेवा नहीं चुनी गई। ऊपर + / − का उपयोग करें।"
                            : "No services selected yet. Use + / − above."
                    }
                 </p>`;
        }

        if (subtotalEl) {
            subtotalEl.innerText =
                "₹0";
        }

        if (discRow) {
            discRow.style.display =
                "none";
        }

        if (discEl) {
            discEl.innerText =
                "-₹0";
        }

        if (totalEl) {
            totalEl.innerText =
                "₹0";
        }

        return;
    }

    if (listEl) {

        listEl.innerHTML =
            entries.map(
                function([key, item]) {

                    const name =
                        currentLang === "hi"
                            ? item.name_hi
                            : item.name_en;

                    const price =
                        Number(item.price || 0);

                    const qty =
                        Number(item.qty || 0);

                    return `
                        <div class="summary-item-row">

                            <div class="summary-item-left">

                                <span class="summary-item-name">
                                    • ${escapeHTML(name)}
                                </span>

                                <span class="summary-item-price">
                                    ₹${price * qty}
                                    (₹${price} × ${qty})
                                </span>

                            </div>

                            <div class="summary-qty-actions">

                                <button
                                    type="button"
                                    class="summary-btn minus"
                                    onclick="changeQtyDirect('${key}', -1)"
                                    title="कम करें"
                                >
                                    −
                                </button>

                                <span class="summary-qty-val">
                                    ${qty}
                                </span>

                                <button
                                    type="button"
                                    class="summary-btn plus"
                                    onclick="changeQtyDirect('${key}', 1)"
                                    title="बढ़ाएं"
                                >
                                    +
                                </button>

                                <button
                                    type="button"
                                    class="summary-btn remove"
                                    onclick="removeItemDirect('${key}')"
                                    title="हटाएं"
                                >
                                    🗑️
                                </button>

                            </div>

                        </div>
                    `;
                }
            ).join("");
    }

    const subtotal =
        entries.reduce(
            function(total, [, item]) {

                return total +
                    (
                        Number(item.price || 0) *
                        Number(item.qty || 0)
                    );

            },
            0
        );

    const discountPercent =
        Number(
            ctrl.discountPercent || 0
        );

    const isDiscountActive =
        ctrl.showDiscount === true &&
        discountPercent > 0;

    const discount =
        isDiscountActive
            ? Math.round(
                subtotal *
                (
                    discountPercent / 100
                )
            )
            : 0;

    const total =
        subtotal - discount;

    if (subtotalEl) {
        subtotalEl.innerText =
            `₹${subtotal}`;
    }

    if (discRow) {

        discRow.style.display =
            isDiscountActive
                ? "flex"
                : "none";
    }

    if (discEl) {

        discEl.innerText =
            `-₹${discount}`;
    }

    if (totalEl) {

        totalEl.innerText =
            `₹${total}`;
    }
}


/* =========================================================
   GALLERY
========================================================= */

function renderGallery() {

    const container =
        $("galleryContainer");

    if (!container) return;

    const gallery =
        getGallery().filter(
            function(item) {
                return item.show !== false;
            }
        );

    if (!gallery.length) {

        container.innerHTML =
            `<p class="no-selection-hint">
                ${
                    currentLang === "hi"
                        ? "अभी कोई कार्य फोटो उपलब्ध नहीं है।"
                        : "No work photos available."
                }
             </p>`;

        return;
    }

    container.innerHTML = "";

    gallery.forEach(
        function(item) {

            const title =
                currentLang === "hi"
                    ? item.title_hi
                    : item.title_en;

            const galleryItem =
                document.createElement("div");

            galleryItem.className =
                "gallery-item";

            galleryItem.innerHTML = `

                <img
                    src="${escapeHTML(item.image || "")}"
                    alt="${escapeHTML(title || "Our Work")}"
                    loading="lazy"
                >

                <div class="gallery-title">
                    ${escapeHTML(title || "")}
                </div>
            `;

            const img =
                galleryItem.querySelector("img");

            if (img) {

                img.addEventListener(
                    "error",
                    function() {

                        galleryItem.style.display =
                            "none";
                    }
                );

                img.addEventListener(
                    "click",
                    function() {

                        openLightboxModal(
                            item.image
                        );
                    }
                );
            }

            container.appendChild(
                galleryItem
            );
        }
    );
}


/* =========================================================
   REVIEWS
========================================================= */

function renderReviews() {

    const container =
        $("reviewContainer");

    if (!container) return;

    const reviews =
        getReviews().filter(
            function(review) {
                return review.show !== false;
            }
        );

    if (!reviews.length) {

        container.innerHTML =
            `<p class="no-selection-hint">
                ${
                    currentLang === "hi"
                        ? "अभी कोई समीक्षा उपलब्ध नहीं है।"
                        : "No reviews available."
                }
             </p>`;

        return;
    }

    container.innerHTML =
        reviews.map(
            function(review) {

                const rating =
                    Math.max(
                        0,
                        Math.min(
                            5,
                            Number(
                                review.rating || 5
                            )
                        )
                    );

                return `
                    <div
                        class="card review-card"
                        style="padding:12px;margin-bottom:8px;"
                    >

                        <div
                            style="color:#f5c542;"
                        >
                            ${"★".repeat(rating)}
                        </div>

                        <p
                            style="margin:4px 0;font-size:.85rem;"
                        >
                            "${escapeHTML(
                                currentLang === "hi"
                                    ? review.text_hi
                                    : review.text_en
                            )}"
                        </p>

                        <small
                            style="color:#aab4c8;"
                        >
                            — ${escapeHTML(
                                review.name || "Customer"
                            )}
                        </small>

                    </div>
                `;
            }
        ).join("");
}


/* =========================================================
   FAQ
========================================================= */

function renderFAQ() {

    const container =
        $("faqContainer");

    if (!container) return;

    const faq =
        getFAQ().filter(
            function(item) {
                return item.show !== false;
            }
        );

    if (!faq.length) {

        container.innerHTML =
            `<p class="no-selection-hint">
                ${
                    currentLang === "hi"
                        ? "अभी कोई FAQ उपलब्ध नहीं है।"
                        : "No FAQ available."
                }
             </p>`;

        return;
    }

    container.innerHTML = "";

    faq.forEach(
        function(item) {

            const question =
                currentLang === "hi"
                    ? item.q_hi
                    : item.q_en;

            const answer =
                currentLang === "hi"
                    ? item.a_hi
                    : item.a_en;

            const faqItem =
                document.createElement("div");

            faqItem.className =
                "faq-item";

            faqItem.innerHTML = `

                <div class="faq-question">

                    <span>
                        ${escapeHTML(
                            question || "Question"
                        )}
                    </span>

                    <span class="faq-icon">
                        +
                    </span>

                </div>

                <div class="faq-answer">
                    ${escapeHTML(
                        answer || ""
                    )}
                </div>
            `;

            faqItem.addEventListener(
                "click",
                function() {

                    faqItem.classList.toggle(
                        "active"
                    );
                }
            );

            container.appendChild(
                faqItem
            );
        }
    );
}


/* =========================================================
   QUICK LAYOUT
========================================================= */

function applyQuickLayout(layout) {

    const allowed = [
        "grid-2",
        "slider",
        "list",
        "mini"
    ];

    if (!allowed.includes(layout)) {
        layout = "grid-2";
    }

    const container =
        $("quickGridContainer");

    if (container) {

        container.className =
            `grid layout-${layout}`;
    }

    document
        .querySelectorAll(
            "#quickLayoutBar .layout-btn"
        )
        .forEach(
            function(button) {

                button.classList.toggle(
                    "active",
                    button.getAttribute(
                        "data-ql"
                    ) === layout
                );
            }
        );

    localStorage.setItem(
        "sandeepQuickLayout",
        layout
    );
}


/* =========================================================
   SERVICE LAYOUT
========================================================= */

function applyServiceLayout(layout) {

    const allowed = [
        "list",
        "grid",
        "slider",
        "mini"
    ];

    if (!allowed.includes(layout)) {
        layout = "list";
    }

    const container =
        $("serviceContainer");

    if (container) {

        container.className =
            `service-grid layout-${layout}`;
    }

    document
        .querySelectorAll(
            "#servicesLayoutBar .layout-btn"
        )
        .forEach(
            function(button) {

                button.classList.toggle(
                    "active",
                    button.getAttribute(
                        "data-sl"
                    ) === layout
                );
            }
        );

    localStorage.setItem(
        "sandeepServiceLayout",
        layout
    );
}


/* =========================================================
   LAYOUT BUTTON INITIALIZATION
========================================================= */

function initializeLayoutButtons() {

    document
        .querySelectorAll(
            "#quickLayoutBar .layout-btn"
        )
        .forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function() {

                        const layout =
                            button.getAttribute(
                                "data-ql"
                            );

                        if (layout) {
                            applyQuickLayout(
                                layout
                            );
                        }
                    }
                );
            }
        );

    document
        .querySelectorAll(
            "#servicesLayoutBar .layout-btn"
        )
        .forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function() {

                        const layout =
                            button.getAttribute(
                                "data-sl"
                            );

                        if (layout) {
                            applyServiceLayout(
                                layout
                            );
                        }
                    }
                );
            }
        );
}


/* =========================================================
   SAVE CONTACT
========================================================= */

function saveContactVCard() {

    const biz =
        getBusiness();

    if (!biz) return;

    const vCardData =
`BEGIN:VCARD
VERSION:3.0
FN:${biz.name || "Sandeep ElectroFix"} (${biz.owner || ""})
ORG:${biz.name || "Sandeep ElectroFix"}
TEL;TYPE=CELL,VOICE:${biz.phone || ""}
EMAIL:${biz.email || ""}
URL:${biz.website || ""}
ADR;TYPE=WORK:;;${biz.location_en || ""};;;;
END:VCARD`;

    const blob =
        new Blob(
            [vCardData],
            {
                type:
                    "text/vcard;charset=utf-8"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        `${(
            biz.name ||
            "Sandeep_ElectroFix"
        ).replace(
            /\s+/g,
            "_"
        )}.vcf`;

    document.body.appendChild(
        link
    );

    link.click();

    document.body.removeChild(
        link
    );

    setTimeout(
        function() {
            URL.revokeObjectURL(url);
        },
        1000
    );
}


/* =========================================================
   SHARE WEBSITE
========================================================= */

async function shareWebsite() {

    const biz =
        getBusiness();

    try {

        if (navigator.share) {

            await navigator.share({

                title:
                    biz.name ||
                    "Sandeep ElectroFix",

                text:
                    currentLang === "hi"
                        ? "Sandeep ElectroFix - Electrical Services"
                        : "Sandeep ElectroFix - Electrical Services",

                url:
                    window.location.href
            });

            return;
        }

        if (
            navigator.clipboard &&
            navigator.clipboard.writeText
        ) {

            await navigator.clipboard.writeText(
                window.location.href
            );

            showExitToast(
                currentLang === "hi"
                    ? "✅ लिंक कॉपी हो गया"
                    : "✅ Link copied"
            );

            return;
        }

        alert(
            window.location.href
        );

    } catch (error) {

        console.log(
            "Share cancelled:",
            error
        );
    }
}


/* =========================================================
   WHATSAPP QUOTE
========================================================= */

function sendWhatsappQuote() {

    const name =
        $("customerName")?.value.trim();

    const phone =
        $("customerPhone")?.value.trim();

    const location =
        $("customerLocation")?.value.trim();

    const note =
        $("customerMessage")?.value.trim();

    const items =
        Object.values(
            selectedItemsMap
        );

    const ctrl =
        getControls();

    const biz =
        getBusiness();

    if (!name) {

        alert(
            currentLang === "hi"
                ? "कृपया अपना नाम दर्ज करें।"
                : "Please enter your name."
        );

        return;
    }

    if (!phone) {

        alert(
            currentLang === "hi"
                ? "कृपया अपना मोबाइल नंबर दर्ज करें।"
                : "Please enter your mobile number."
        );

        return;
    }

    if (!location) {

        alert(
            currentLang === "hi"
                ? "कृपया अपना पता या लोकेशन दर्ज करें।"
                : "Please provide your address/location."
        );

        return;
    }

    if (!items.length) {

        alert(
            currentLang === "hi"
                ? "कृपया + बटन दबाकर कम से कम एक सेवा चुनें।"
                : "Please add at least one service."
        );

        return;
    }

    const subtotal =
        items.reduce(
            function(total, item) {

                return total +
                    (
                        Number(item.price || 0) *
                        Number(item.qty || 0)
                    );

            },
            0
        );

    const discountPercent =
        Number(
            ctrl.discountPercent || 0
        );

    const isDiscountActive =
        ctrl.showDiscount === true &&
        discountPercent > 0;

    const discount =
        isDiscountActive
            ? Math.round(
                subtotal *
                (
                    discountPercent / 100
                )
            )
            : 0;

    const total =
        subtotal - discount;

    let msg =
        `⚡ *${biz.name || "Sandeep ElectroFix"} - Estimate Request* ⚡\n\n`;

    msg +=
        `👤 *${
            currentLang === "hi"
                ? "नाम"
                : "Name"
        }:* ${name}\n`;

    msg +=
        `📞 *${
            currentLang === "hi"
                ? "फोन"
                : "Phone"
        }:* ${phone}\n`;

    msg +=
        `📍 *${
            currentLang === "hi"
                ? "पता / लोकेशन"
                : "Location"
        }:* ${location}\n`;

    if (note) {

        msg +=
            `📝 *${
                currentLang === "hi"
                    ? "अतिरिक्त नोट"
                    : "Note"
            }:* ${note}\n`;
    }

    msg +=
        `\n📋 *${
            currentLang === "hi"
                ? "चुनी गई सेवाएँ"
                : "Selected Services"
        }:*\n`;

    items.forEach(
        function(item, index) {

            const itemName =
                currentLang === "hi"
                    ? item.name_hi
                    : item.name_en;

            const qty =
                Number(item.qty || 0);

            const price =
                Number(item.price || 0);

            msg +=
                `${index + 1}. ${itemName} [Qty: ${qty}] - ₹${price * qty}\n`;
        }
    );

    msg +=
        `\n💵 *Subtotal:* ₹${subtotal}\n`;

    if (isDiscountActive) {

        msg +=
            `🎁 *Discount (${discountPercent}%):* -₹${discount}\n`;
    }

    msg +=
        `✅ *Grand Total:* ₹${total}\n\n`;

    msg +=
        `_Please confirm visit/booking._`;

    const whatsapp =
        biz.whatsapp ||
        biz.phone ||
        "";

    if (!whatsapp) {

        alert(
            "WhatsApp number is not configured."
        );

        return;
    }

    const url =
        `https://wa.me/${String(whatsapp).replace(
            /\D/g,
            ""
        )}?text=${encodeURIComponent(msg)}`;

    window.open(
        url,
        "_blank",
        "noopener"
    );
}


/* =========================================================
   PDF ESTIMATE
========================================================= */

function downloadEstimatePDF() {

    const jsPDF =
        window.jspdf?.jsPDF;

    if (!jsPDF) {

        alert(
            currentLang === "hi"
                ? "PDF library अभी load हो रही है। कृपया 2 सेकंड बाद फिर कोशिश करें।"
                : "PDF library is loading. Please try again in 2 seconds."
        );

        return;
    }

    const name =
        $("customerName")?.value.trim() ||
        "Customer";

    const phone =
        $("customerPhone")?.value.trim() ||
        "N/A";

    const location =
        $("customerLocation")?.value.trim() ||
        "N/A";

    const note =
        $("customerMessage")?.value.trim() ||
        "N/A";

    const items =
        Object.values(
            selectedItemsMap
        );

    const ctrl =
        getControls();

    const biz =
        getBusiness();

    if (!items.length) {

        alert(
            currentLang === "hi"
                ? "कृपया पहले + से कोई सेवा जोड़ें।"
                : "Please add services first."
        );

        return;
    }

    const doc =
        new jsPDF();

    /* =====================================================
       HEADER
    ===================================================== */

    doc.setFillColor(
        5,
        8,
        22
    );

    doc.rect(
        0,
        0,
        210,
        36,
        "F"
    );

    doc.setTextColor(
        245,
        197,
        66
    );

    doc.setFontSize(
        18
    );

    doc.text(
        biz.name ||
            "Sandeep ElectroFix",
        14,
        16
    );

    doc.setFontSize(
        10
    );

    doc.setTextColor(
        255,
        255,
        255
    );

    doc.text(
        `Phone: ${biz.phone || ""} | ${biz.location_en || "Lucknow, UP"}`,
        14,
        25
    );

    doc.text(
        `Date: ${new Date().toLocaleDateString("en-IN")}`,
        160,
        25
    );

    /* =====================================================
       CUSTOMER
    ===================================================== */

    doc.setTextColor(
        16,
        24,
        39
    );

    doc.setFontSize(
        11
    );

    doc.text(
        "CUSTOMER ESTIMATE",
        14,
        46
    );

    doc.setFontSize(
        9
    );

    doc.text(
        `Client: ${name} | Phone: ${phone}`,
        14,
        53
    );

    const locationText =
        `Location: ${location}`;

    const locationLines =
        doc.splitTextToSize(
            locationText,
            180
        );

    doc.text(
        locationLines,
        14,
        59
    );

    let startTableY =
        59 +
        (
            locationLines.length *
            4
        ) +
        4;

    if (note !== "N/A") {

        const noteLines =
            doc.splitTextToSize(
                `Note: ${note}`,
                180
            );

        doc.text(
            noteLines,
            14,
            startTableY
        );

        startTableY +=
            (
                noteLines.length *
                4
            ) +
            5;
    }

    /* =====================================================
       TABLE
    ===================================================== */

    const rows =
        items.map(
            function(item, index) {

                return [
                    index + 1,

                    item.name_en ||
                        item.name_hi ||
                        "Service",

                    `Rs. ${Number(
                        item.price || 0
                    )}`,

                    Number(
                        item.qty || 0
                    ),

                    `Rs. ${
                        Number(
                            item.price || 0
                        ) *
                        Number(
                            item.qty || 0
                        )
                    }`
                ];
            }
        );

    const subtotal =
        items.reduce(
            function(total, item) {

                return total +
                    (
                        Number(item.price || 0) *
                        Number(item.qty || 0)
                    );

            },
            0
        );

    const discountPercent =
        Number(
            ctrl.discountPercent || 0
        );

    const isDiscountActive =
        ctrl.showDiscount === true &&
        discountPercent > 0;

    const discount =
        isDiscountActive
            ? Math.round(
                subtotal *
                (
                    discountPercent / 100
                )
            )
            : 0;

    const total =
        subtotal - discount;

    if (
        typeof doc.autoTable ===
        "function"
    ) {

        doc.autoTable({

            startY: startTableY,

            head: [
                [
                    "#",
                    "Service Item",
                    "Rate",
                    "Qty",
                    "Total Amount"
                ]
            ],

            body: rows,

            theme: "grid",

            headStyles: {
                fillColor: [
                    5,
                    8,
                    22
                ],

                textColor: [
                    245,
                    197,
                    66
                ]
            }
        });

    } else {

        let y =
            startTableY;

        doc.setFontSize(
            8
        );

        rows.forEach(
            function(row) {

                doc.text(
                    `${row[0]}. ${row[1]} | ${row[2]} | Qty ${row[3]} | ${row[4]}`,
                    14,
                    y
                );

                y += 6;
            }
        );

        doc.lastAutoTable = {
            finalY: y
        };
    }

    const finalY =
        (
            doc.lastAutoTable?.finalY ||
            startTableY + 20
        ) + 8;

    doc.setFontSize(
        9.5
    );

    doc.setTextColor(
        16,
        24,
        39
    );

    doc.text(
        `Subtotal: Rs. ${subtotal}`,
        140,
        finalY
    );

    let nextY =
        finalY + 5;

    if (isDiscountActive) {

        doc.setTextColor(
            37,
            211,
            102
        );

        doc.text(
            `Discount (${discountPercent}%): -Rs. ${discount}`,
            140,
            nextY
        );

        nextY += 5;
    }

    doc.setFontSize(
        11
    );

    doc.setTextColor(
        16,
        24,
        39
    );

    doc.text(
        `Grand Total: Rs. ${total}`,
        140,
        nextY
    );

    const fileName =
        `Estimate_${name
            .replace(
                /[^a-zA-Z0-9_-]/g,
                "_"
            )}.pdf`;

    doc.save(
        fileName
    );
}


/* =========================================================
   DISTANCE CHECK
========================================================= */

function getUserLocation() {

    const status =
        $("locationStatus");

    if (!navigator.geolocation) {

        if (status) {

            status.innerText =
                "Geolocation not supported.";
        }

        return;
    }

    if (status) {
        status.innerText =
            currentLang === "hi"
                ? "लोकेशन खोजी जा रही है..."
                : "Locating...";
    }

    navigator.geolocation.getCurrentPosition(

        function(pos) {

            /*
             * Lucknow approximate center
             */

            const businessLat =
                26.8467;

            const businessLng =
                80.9462;

            const userLat =
                pos.coords.latitude;

            const userLng =
                pos.coords.longitude;

            const R =
                6371;

            const dLat =
                (
                    userLat -
                    businessLat
                ) *
                (
                    Math.PI / 180
                );

            const dLon =
                (
                    userLng -
                    businessLng
                ) *
                (
                    Math.PI / 180
                );

            const a =
                Math.sin(dLat / 2) ** 2 +
                Math.cos(
                    businessLat *
                    Math.PI /
                    180
                ) *
                Math.cos(
                    userLat *
                    Math.PI /
                    180
                ) *
                Math.sin(dLon / 2) ** 2;

            const dist =
                (
                    R *
                    (
                        2 *
                        Math.atan2(
                            Math.sqrt(a),
                            Math.sqrt(1 - a)
                        )
                    )
                ).toFixed(1);

            if (status) {

                status.innerHTML =
                    currentLang === "hi"
                        ? `✅ आप हमारे केंद्र से लगभग <strong>${dist} km</strong> दूर हैं।`
                        : `✅ You are approx <strong>${dist} km</strong> away from Lucknow center.`;
            }
        },

        function() {

            if (status) {

                status.innerText =
                    currentLang === "hi"
                        ? "लोकेशन परमिशन नहीं मिली।"
                        : "Location permission denied.";
            }
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
        }
    );
}


/* =========================================================
   PWA SHORTCUT
========================================================= */

function handlePWAShortcutAction() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const action =
        params.get(
            "pwaAction"
        );

    if (!action) return;

    const ctrl =
        getControls().pwaShortcuts || {};

    const biz =
        getBusiness();

    if (ctrl.enabled === false) {
        return;
    }

    /* =====================================================
       CALL
    ===================================================== */

    if (action === "call") {

        if (ctrl.call === false) {
            return;
        }

        const phone =
            biz.phone ||
            "+919026036445";

        setTimeout(
            function() {

                window.location.href =
                    `tel:${phone}`;

            },
            300
        );

        return;
    }

    /* =====================================================
       WHATSAPP
    ===================================================== */

    if (action === "whatsapp") {

        if (ctrl.whatsapp === false) {
            return;
        }

        const whatsappNumber =
            biz.whatsapp ||
            "919026036445";

        const message =
            currentLang === "hi"
                ? `नमस्ते ${biz.name || "Sandeep ElectroFix"}, मुझे इलेक्ट्रिकल सर्विस की जानकारी चाहिए।`
                : `Hello ${biz.name || "Sandeep ElectroFix"}, I need information about your electrical services.`;

        setTimeout(
            function() {

                window.location.href =
                    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        message
                    )}`;

            },
            300
        );

        return;
    }

    /* =====================================================
       SERVICES
    ===================================================== */

    if (action === "services") {

        if (ctrl.services === false) {
            return;
        }

        setTimeout(
            function() {

                const servicesSection =
                    $("servicesSection");

                if (servicesSection) {

                    servicesSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                } else {

                    window.location.hash =
                        "servicesSection";
                }

            },
            300
        );
    }
}


/* =========================================================
   QR DOWNLOAD
========================================================= */

function initializeQR() {

    const qrImage =
        $("cardQR");

    const downloadBtn =
        $("qrBtnText");

    if (!qrImage || !downloadBtn) {
        return;
    }

    downloadBtn.style.cursor =
        "pointer";

    downloadBtn.addEventListener(
        "click",
        async function(event) {

            event.preventDefault();

            try {

                const response =
                    await fetch(
                        qrImage.src
                    );

                const blob =
                    await response.blob();

                const url =
                    URL.createObjectURL(
                        blob
                    );

                const link =
                    document.createElement("a");

                link.href =
                    url;

                link.download =
                    "Sandeep_ElectroFix_QR.png";

                document.body.appendChild(
                    link
                );

                link.click();

                document.body.removeChild(
                    link
                );

                setTimeout(
                    function() {
                        URL.revokeObjectURL(
                            url
                        );
                    },
                    1000
                );

            } catch (error) {

                /*
                 * Fallback for GitHub Pages /
                 * cross-origin situations
                 */

                const link =
                    document.createElement("a");

                link.href =
                    qrImage.src;

                link.download =
                    "Sandeep_ElectroFix_QR.png";

                link.target =
                    "_blank";

                document.body.appendChild(
                    link
                );

                link.click();

                document.body.removeChild(
                    link
                );
            }
        }
    );
}


/* =========================================================
   INPUT AUTO SAVE
========================================================= */

function initializeCustomerAutoSave() {

    [
        "customerName",
        "customerPhone",
        "customerLocation",
        "customerMessage"
    ].forEach(
        function(id) {

            const el =
                $(id);

            if (!el) return;

            el.addEventListener(
                "input",
                saveCustomerInputs
            );
        }
    );
}


/* =========================================================
   BASIC BUTTONS
========================================================= */

function initializeBasicButtons() {

    /* =====================================================
       GPS
    ===================================================== */

    const gpsBtn =
        $("btnGpsDetect");

    if (gpsBtn) {

        gpsBtn.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                getQuoteLiveLocation();
            }
        );
    }

    /* =====================================================
       SAVE CONTACT
    ===================================================== */

    const saveBtn =
        $("btnQuickSaveContact");

    if (saveBtn) {

        saveBtn.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                saveContactVCard();
            }
        );
    }

    /* =====================================================
       SHARE
    ===================================================== */

    const shareBtn =
        $("btnQuickShare");

    if (shareBtn) {

        shareBtn.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                shareWebsite();
            }
        );
    }

    /* =====================================================
       WHATSAPP QUOTE
    ===================================================== */

    const whatsappQuote =
        $("sendWhatsappBtn");

    if (whatsappQuote) {

        whatsappQuote.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                sendWhatsappQuote();
            }
        );
    }

    /* =====================================================
       PDF
    ===================================================== */

    const pdfBtn =
        $("downloadPdfBtn");

    if (pdfBtn) {

        pdfBtn.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                downloadEstimatePDF();
            }
        );
    }

    /* =====================================================
       DISTANCE
    ===================================================== */

    const distanceBtn =
        $("distanceBtn");

    if (distanceBtn) {

        distanceBtn.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                getUserLocation();
            }
        );
    }
}


/* =========================================================
   THEME INITIALIZATION
========================================================= */

function initializeTheme() {

    const savedTheme =
        localStorage.getItem(
            "sandeepTheme"
        );

    if (savedTheme === "light") {

        document.documentElement.classList.add(
            "saved-light-theme"
        );

    } else {

        document.documentElement.classList.remove(
            "saved-light-theme"
        );
    }

    const themeToggle =
        $("themeToggle");

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                document.documentElement.classList.toggle(
                    "saved-light-theme"
                );

                const isLight =
                    document.documentElement.classList.contains(
                        "saved-light-theme"
                    );

                localStorage.setItem(
                    "sandeepTheme",
                    isLight
                        ? "light"
                        : "dark"
                );

                updateThemeButtonText();
            }
        );
    }

    updateThemeButtonText();
}


/* =========================================================
   LANGUAGE BUTTONS
========================================================= */

function initializeLanguageButtons() {

    document
        .querySelectorAll(
            ".language-btn"
        )
        .forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function(event) {

                        event.preventDefault();

                        const lang =
                            button.getAttribute(
                                "data-lang"
                            );

                        if (lang) {
                            setLanguage(
                                lang
                            );
                        }
                    }
                );
            }
        );
}


/* =========================================================
   MODAL / LIGHTBOX CLOSE BUTTONS
========================================================= */

function initializeModalButtons() {

    const modalClose =
        $("serviceModalClose");

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            function() {

                closeServiceModal();
            }
        );
    }

    const modalOverlay =
        $("serviceModalOverlay");

    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            function(event) {

                if (
                    event.target ===
                    modalOverlay
                ) {

                    closeServiceModal();
                }
            }
        );
    }

    const lightboxClose =
        $("lightboxClose");

    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            function() {

                closeLightboxModal();
            }
        );
    }

    const lightbox =
        $("lightbox");

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            function(event) {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightboxModal();
                }
            }
        );
    }
}


/* =========================================================
   GLOBAL POPSTATE
========================================================= */

window.addEventListener(
    "popstate",
    function() {

        /* =================================================
           LIGHTBOX
        ================================================= */

        const lightbox =
            $("lightbox");

        const isLightboxOpen =
            lightbox &&
            (
                lightbox.style.display === "flex" ||
                lightbox.classList.contains("active")
            );

        if (isLightboxOpen) {

            closeLightboxModal(
                true
            );

            return;
        }

        /* =================================================
           SERVICE MODAL
        ================================================= */

        const modalOverlay =
            $("serviceModalOverlay");

        const isModalOpen =
            modalOverlay &&
            (
                modalOverlay.style.display === "flex" ||
                modalOverlay.classList.contains("active")
            );

        if (isModalOpen) {

            closeServiceModal(
                true
            );

            return;
        }

        /* =================================================
           SIDE MENU
        ================================================= */

        if (
            window.project21MenuIsOpen &&
            typeof window.closeProject21Menu ===
                "function"
        ) {

            window.closeProject21Menu(
                true
            );

            return;
        }

        /* =================================================
           EXIT PROTECTION
        ================================================= */

        const currentTime =
            Date.now();

        if (
            currentTime -
            lastBackPressTime <
            2000
        ) {

            /*
             * Allow actual browser/app exit
             */

            lastBackPressTime = 0;

            return;
        }

        lastBackPressTime =
            currentTime;

        history.pushState(
            {
                page: "app"
            },
            "",
            window.location.href
        );

        showExitToast(
            currentLang === "hi"
                ? "ऐप बंद करने के लिए दोबारा Back दबाएं"
                : "Press Back again to exit app"
        );
    }
);


/* =========================================================
   PROJECT 2.1 MOBILE NAVBAR
========================================================= */

function initializeProject21Navbar() {

    const menuBtn =
        $("navbarMenuBtn");

    const sideMenu =
        $("sideMenu");

    const overlay =
        $("navbarOverlay");

    const closeBtn =
        $("sideMenuClose");

    if (
        !menuBtn ||
        !sideMenu ||
        !overlay
    ) {

        console.warn(
            "Project 2.1 Navbar elements missing."
        );

        return;
    }

    let menuIsOpen =
        false;

    function openMenu() {

        if (menuIsOpen) return;

        menuIsOpen =
            true;

        window.project21MenuIsOpen =
            true;

        sideMenu.classList.add(
            "active"
        );

        overlay.classList.add(
            "active"
        );

        menuBtn.classList.add(
            "active"
        );

        document.body.classList.add(
            "menu-open"
        );

        menuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

        menuBtn.setAttribute(
            "aria-label",
            "Close Menu"
        );

        if (!menuHistoryAdded) {

            history.pushState(
                {
                    project21Menu: true
                },
                "",
                window.location.href
            );

            menuHistoryAdded =
                true;
        }
    }


    function closeMenu(
        fromPopState = false
    ) {

        if (!menuIsOpen) return;

        menuIsOpen =
            false;

        window.project21MenuIsOpen =
            false;

        sideMenu.classList.remove(
            "active"
        );

        overlay.classList.remove(
            "active"
        );

        menuBtn.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "menu-open"
        );

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        menuBtn.setAttribute(
            "aria-label",
            "Open Menu"
        );

        if (
            !fromPopState &&
            menuHistoryAdded
        ) {

            menuHistoryAdded =
                false;

            history.back();

        } else {

            menuHistoryAdded =
                false;
        }
    }


    window.closeProject21Menu =
        closeMenu;


    /* =====================================================
       HAMBURGER
    ===================================================== */

    menuBtn.addEventListener(
        "click",
        function(event) {

            event.preventDefault();
            event.stopPropagation();

            if (menuIsOpen) {

                closeMenu();

            } else {

                openMenu();
            }
        }
    );


    /* =====================================================
       CLOSE
    ===================================================== */

    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                closeMenu();
            }
        );
    }


    /* =====================================================
       OVERLAY
    ===================================================== */

    overlay.addEventListener(
        "click",
        function() {

            closeMenu();
        }
    );


    /* =====================================================
       MENU LINKS
    ===================================================== */

    sideMenu
        .querySelectorAll(
            "a, button"
        )
        .forEach(
            function(item) {

                if (
                    item === closeBtn
                ) return;

                /*
                 * Theme / Reset / Install buttons
                 * have their own logic.
                 */

                if (
                    item.id ===
                        "menuThemeToggle" ||
                    item.id ===
                        "menuResetApp" ||
                    item.id ===
                        "menuInstallApp"
                ) {
                    return;
                }

                item.addEventListener(
                    "click",
                    function() {

                        setTimeout(
                            function() {
                                closeMenu();
                            },
                            100
                        );
                    }
                );
            }
        );


    /* =====================================================
       ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Escape" &&
                menuIsOpen
            ) {

                closeMenu();
            }
        }
    );


    /* =====================================================
       INSTALL APP
    ===================================================== */

    const installBtn =
        $("menuInstallApp");

    if (installBtn) {

        installBtn.addEventListener(
            "click",
            async function(event) {

                event.preventDefault();

                closeMenu();

                await new Promise(
                    function(resolve) {
                        setTimeout(
                            resolve,
                            100
                        );
                    }
                );

                if (
                    typeof window.installApp ===
                    "function"
                ) {

                    try {

                        await window.installApp();

                    } catch (error) {

                        console.log(
                            "Install error:",
                            error
                        );
                    }

                    return;
                }

                if (window.deferredPrompt) {

                    try {

                        window.deferredPrompt.prompt();

                        await window.deferredPrompt
                            .userChoice;

                    } catch (error) {

                        console.log(
                            error
                        );
                    }

                    window.deferredPrompt =
                        null;

                    return;
                }

                alert(
                    "Install option अभी उपलब्ध नहीं है।\n\n" +
                    "अगर App पहले से installed है, तो यह option उपलब्ध नहीं होगा।"
                );
            }
        );
    }


    /* =====================================================
       THEME
    ===================================================== */

    const menuThemeBtn =
        $("menuThemeToggle");

    if (menuThemeBtn) {

        menuThemeBtn.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                closeMenu();

                const originalThemeBtn =
                    $("themeToggle");

                if (originalThemeBtn) {

                    originalThemeBtn.click();

                } else {

                    document.documentElement.classList.toggle(
                        "saved-light-theme"
                    );

                    const isLight =
                        document.documentElement.classList.contains(
                            "saved-light-theme"
                        );

                    localStorage.setItem(
                        "sandeepTheme",
                        isLight
                            ? "light"
                            : "dark"
                    );

                    updateThemeButtonText();
                }
            }
        );
    }


    /* =====================================================
       RESET
    ===================================================== */

    const resetBtn =
        $("menuResetApp");

    if (resetBtn) {

        resetBtn.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                closeMenu();

                setTimeout(
                    function() {

                        /*
                         * resetAllToDefault()
                         * already has confirmation.
                         * इसलिए double confirmation नहीं।
                         */

                        resetAllToDefault();

                    },
                    100
                );
            }
        );
    }

    console.log(
        "✅ Project 2.1 Navbar Ready"
    );
}


/* =========================================================
   FIX: QUICK ACTION LINKS
========================================================= */

function initializeQuickActions() {

    const biz =
        getBusiness();

    /* =====================================================
       WORK
    ===================================================== */

    const workBtn =
        $("btnQuickWork");

    if (workBtn) {

        workBtn.addEventListener(
            "click",
            function(event) {

                /*
                 * अगर href already configured है,
                 * उसे browser handle करने दें।
                 */

                if (
                    !workBtn.getAttribute("href")
                ) {

                    event.preventDefault();

                    $("gallerySection")
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });
                }
            }
        );
    }


    /* =====================================================
       CATALOGUE
    ===================================================== */

    const catalogueBtn =
        $("btnQuickCatalogue");

    if (
        catalogueBtn &&
        !catalogueBtn.getAttribute("href")
    ) {

        catalogueBtn.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                showExitToast(
                    currentLang === "hi"
                        ? "📋 Catalogue जल्द उपलब्ध होगा"
                        : "📋 Catalogue coming soon"
                );
            }
        );
    }


    /* =====================================================
       MAP
    ===================================================== */

    if (
        $("btnQuickMaps") &&
        biz.googleMaps
    ) {

        $("btnQuickMaps").href =
            biz.googleMaps;
    }
}


/* =========================================================
   SERVICE / GALLERY IMAGE SAFE LOAD
========================================================= */

function initializeGlobalImageFallback() {

    document
        .querySelectorAll(
            "img"
        )
        .forEach(
            function(img) {

                img.addEventListener(
                    "error",
                    function() {

                        /*
                         * Do not break entire layout.
                         */

                        img.classList.add(
                            "image-load-error"
                        );
                    }
                );
            }
        );
}


/* =========================================================
   PWA INSTALL EVENT
========================================================= */

window.deferredPrompt =
    window.deferredPrompt || null;

window.addEventListener(
    "beforeinstallprompt",
    function(event) {

        event.preventDefault();

        window.deferredPrompt =
            event;

        console.log(
            "✅ PWA install prompt ready"
        );
    }
);


/* =========================================================
   APP INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "⚡ Sandeep ElectroFix Project 2.1 Initializing..."
        );

        /* =================================================
           BASE HISTORY
        ================================================= */

        if (
            !history.state ||
            !history.state.page
        ) {

            history.replaceState(
                {
                    page: "app"
                },
                "",
                window.location.href
            );
        }

        /* =================================================
           THEME
        ================================================= */

        initializeTheme();

        /* =================================================
           LAYOUT
        ================================================= */

        const qLayout =
            localStorage.getItem(
                "sandeepQuickLayout"
            ) ||
            "grid-2";

        const sLayout =
            localStorage.getItem(
                "sandeepServiceLayout"
            ) ||
            "list";

        applyQuickLayout(
            qLayout
        );

        applyServiceLayout(
            sLayout
        );

        /* =================================================
           RESTORE INPUTS
        ================================================= */

        restoreCustomerInputs();

        /* =================================================
           LANGUAGE
        ================================================= */

        setLanguage(
            currentLang
        );

        /* =================================================
           BUTTONS
        ================================================= */

        initializeLanguageButtons();

        initializeLayoutButtons();

        initializeCustomerAutoSave();

        initializeBasicButtons();

        initializeModalButtons();

        initializeQuickActions();

        initializeQR();

        initializeGlobalImageFallback();

        /* =================================================
           NAVBAR
        ================================================= */

        initializeProject21Navbar();

        /* =================================================
           PWA SHORTCUT
        ================================================= */

        handlePWAShortcutAction();

        /* =================================================
           FINAL CALCULATION
        ================================================= */

        updateCalculations();

        /* =================================================
           FINAL VISIBILITY
        ================================================= */

        applyVisibilityControls();

        console.log(
            "✅ Sandeep ElectroFix Project 2.1 Ready"
        );
    }
);


/* =========================================================
   GLOBAL FUNCTIONS
   HTML onclick / external access compatibility
========================================================= */

window.setLanguage =
    setLanguage;

window.resetAllToDefault =
    resetAllToDefault;

window.getQuoteLiveLocation =
    getQuoteLiveLocation;

window.openServiceModal =
    openServiceModal;

window.closeServiceModal =
    closeServiceModal;

window.changeQtyModal =
    changeQtyModal;

window.changeQty =
    changeQty;

window.changeQtyDirect =
    changeQtyDirect;

window.removeItemDirect =
    removeItemDirect;

window.openLightboxModal =
    openLightboxModal;

window.closeLightboxModal =
    closeLightboxModal;

window.applyQuickLayout =
    applyQuickLayout;

window.applyServiceLayout =
    applyServiceLayout;

window.saveContactVCard =
    saveContactVCard;

window.shareWebsite =
    shareWebsite;

window.sendWhatsappQuote =
    sendWhatsappQuote;

window.downloadEstimatePDF =
    downloadEstimatePDF;

window.getUserLocation =
    getUserLocation;

window.handlePWAShortcutAction =
    handlePWAShortcutAction;

window.showExitToast =
    showExitToast;


/* =========================================================
   END
========================================================= */

console.log(
    "⚡ Sandeep ElectroFix — script.js loaded"
);
