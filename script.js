/* =========================================================
   SANDEEP ELECTROFIX - CORE JAVASCRIPT ENGINE (V3.2)
   Reads directly from window.MASTER_CONFIG
   Supports: Area-based Center Modal & Quantity-based Services
========================================================= */

let currentLang = localStorage.getItem("sandeepLang") || "hi";
let selectedItemsMap = {};
let lastBackPressTime = 0;
let activeAreaContext = null; // Area Modal Context State

// Load Cart Persistence
try {
    const saved = localStorage.getItem("sandeepCart");
    if (saved) selectedItemsMap = JSON.parse(saved);
} catch (e) { selectedItemsMap = {}; }

// Customer Input Storage
function saveCustomerInputs() {
    const data = {
        name: document.getElementById("customerName")?.value || "",
        phone: document.getElementById("customerPhone")?.value || "",
        location: document.getElementById("customerLocation")?.value || "",
        message: document.getElementById("customerMessage")?.value || ""
    };
    localStorage.setItem("sandeepCustomer", JSON.stringify(data));
}

function restoreCustomerInputs() {
    try {
        const saved = localStorage.getItem("sandeepCustomer");
        if (saved) {
            const data = JSON.parse(saved);
            if (data.name && document.getElementById("customerName")) document.getElementById("customerName").value = data.name;
            if (data.phone && document.getElementById("customerPhone")) document.getElementById("customerPhone").value = data.phone;
            if (data.location && document.getElementById("customerLocation")) document.getElementById("customerLocation").value = data.location;
            if (data.message && document.getElementById("customerMessage")) document.getElementById("customerMessage").value = data.message;
        }
    } catch(e) {}
}

// 🔄 MASTER RESET FUNCTION (English + Light Mode)
function resetAllToDefault() {
    const confirmMsg = currentLang === "hi" 
        ? "क्या आप सभी चुनी गई सेवाओं, फॉर्म डेटा और सेटिंग्स को रीसेट करना चाहते हैं?" 
        : "Are you sure you want to reset all selected services, inputs, and settings to default?";
        
    if (!confirm(confirmMsg)) return;

    // 1. Clear Storage
    localStorage.removeItem("sandeepCart");
    localStorage.removeItem("sandeepCustomer");
    localStorage.removeItem("sandeepQuickLayout");
    localStorage.removeItem("sandeepServiceLayout");

    // 2. Reset Data
    selectedItemsMap = {};

    // 3. Clear Inputs
    if (document.getElementById("customerName")) document.getElementById("customerName").value = "";
    if (document.getElementById("customerPhone")) document.getElementById("customerPhone").value = "";
    if (document.getElementById("customerLocation")) document.getElementById("customerLocation").value = "";
    if (document.getElementById("customerMessage")) document.getElementById("customerMessage").value = "";

    const gpsBtn = document.getElementById("btnGpsDetect");
    const gpsBtnText = document.getElementById("gpsBtnText");
    if (gpsBtn) gpsBtn.classList.remove("active-loc");
    if (gpsBtnText) gpsBtnText.innerText = "GPS";

    // 4. Force Light Mode
    document.documentElement.classList.add("saved-light-theme");
    localStorage.setItem("sandeepTheme", "light");

    // 5. Reset Layouts
    applyQuickLayout("grid-2");
    applyServiceLayout("list");

    // 6. Force Language to English
    setLanguage("en");

    // 7. Toast Notification
    showExitToast("✅ Reset to English & Light Mode successfully");
}

// 1-Click Live GPS Location Fetcher for Quote Form
function getQuoteLiveLocation() {
    const locInput = document.getElementById("customerLocation");
    const gpsBtn = document.getElementById("btnGpsDetect");
    const gpsBtnText = document.getElementById("gpsBtnText");

    if (!navigator.geolocation) {
        alert(currentLang === "hi" ? "आपके ब्राउज़र में GPS सपोर्ट नहीं है।" : "Geolocation is not supported by your browser.");
        return;
    }

    if (gpsBtnText) gpsBtnText.innerText = "...";

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude.toFixed(5);
            const lng = position.coords.longitude.toFixed(5);
            const mapUrl = `https://maps.google.com/?q=${lat},${lng}`;
            
            if (locInput) {
                locInput.value = `${lat}, ${lng} (${mapUrl})`;
                saveCustomerInputs();
            }
            if (gpsBtn) gpsBtn.classList.add("active-loc");
            if (gpsBtnText) gpsBtnText.innerText = currentLang === "hi" ? "मिल गया ✓" : "Fetched ✓";
        },
        () => {
            alert(currentLang === "hi" ? "लोकेशन की परमिशन नहीं मिली। कृपया हाथ से पता टाइप करें।" : "Location permission denied. Please type address manually.");
            if (gpsBtnText) gpsBtnText.innerText = "GPS";
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

// Show/Hide Elements based on MASTER_CONFIG
function applyVisibilityControls() {
    const ctrl = window.MASTER_CONFIG?.controls;
    const biz = window.MASTER_CONFIG?.business;
    if (!ctrl) return;

    const toggle = (id, show) => {
        const el = document.getElementById(id);
        if (el) el.style.display = show ? "" : "none";
    };

    // Main Sections
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

    // Hero Elements
    toggle("themeToggle", ctrl.showThemeToggle);
    toggle("languageSwitcher", ctrl.showLanguageSwitcher);
    toggle("btnResetAll", ctrl.showResetBtn !== false);
    toggle("businessLogo", ctrl.showLogo);
    toggle("businessTagline", ctrl.showTagline);
    toggle("businessLocation", ctrl.showHeroLocation);
    toggle("callBtn", ctrl.showHeroCallBtn);
    toggle("whatsappBtn", ctrl.showHeroWhatsappBtn);

    // Quick Access Buttons
    toggle("btnQuickCall", ctrl.showQuickCall);
    toggle("btnQuickWhatsapp", ctrl.showQuickWhatsapp);
    toggle("btnQuickEmail", ctrl.showQuickEmail);
    toggle("btnQuickWebsite", ctrl.showQuickWebsite);
    toggle("btnQuickMaps", ctrl.showQuickMaps);
    toggle("btnQuickSaveContact", ctrl.showQuickSaveContact);
    toggle("btnQuickShare", ctrl.showQuickShare);
    toggle("btnQuickWork", ctrl.showQuickWork);
    toggle("btnQuickCatalogue", ctrl.showQuickCatalogue);

    // Social Buttons
    toggle("btnFacebook", ctrl.showFacebook);
    toggle("btnInstagram", ctrl.showInstagram);
    toggle("btnYoutube", ctrl.showYoutube);

    // Sync URLs with Config
    if (biz) {
        if (document.getElementById("btnFacebook")) document.getElementById("btnFacebook").href = biz.facebook;
        if (document.getElementById("btnInstagram")) document.getElementById("btnInstagram").href = biz.instagram;
        if (document.getElementById("btnYoutube")) document.getElementById("btnYoutube").href = biz.youtube;
        if (document.getElementById("btnQuickEmail")) document.getElementById("btnQuickEmail").href = `mailto:${biz.email}`;
    }

    // Quote Buttons
    toggle("sendWhatsappBtn", ctrl.showQuoteWhatsappBtn);
    toggle("downloadPdfBtn", ctrl.showQuotePdfBtn);
}

/* =========================================================
   📱 NAVBAR SYSTEM
========================================================= */
function initializeNavbar() {
    if (document.getElementById("appNavbar")) return;

    const cfg = window.MASTER_CONFIG || {};
    const biz = cfg.business || {};

    const navbar = document.createElement("header");
    navbar.id = "appNavbar";
    navbar.className = "app-navbar";

    navbar.innerHTML = `
        <div class="app-nav-inner">
            <a href="#heroSection" class="app-brand" onclick="closeNavbarMenu()">
                <div class="app-logo-wrap">
                    <img id="appNavLogo" src="${biz.logo || 'assets/logo.png'}" alt="${biz.name || 'Sandeep ElectroFix'}" onerror="this.style.display='none'">
                </div>
                <div class="app-brand-text">
                    <span id="appBrandName">${biz.name || "Sandeep ElectroFix"}</span>
                    <small id="appBrandTagline">${currentLang === "hi" ? (biz.tagline_hi || "") : (biz.tagline_en || "")}</small>
                </div>
            </a>
            <button type="button" id="appMenuBtn" class="app-menu-btn" aria-label="Open Menu" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
        </div>

        <div id="appMenuOverlay" class="app-menu-overlay" onclick="closeNavbarMenu()"></div>

        <aside id="appSideMenu" class="app-side-menu" aria-hidden="true">
            <div class="app-menu-header">
                <div class="app-menu-brand">
                    <img src="${biz.logo || 'assets/logo.png'}" alt="${biz.name || 'Sandeep ElectroFix'}" onerror="this.style.display='none'">
                    <div>
                        <strong id="appMenuBrandName">${biz.name || "Sandeep ElectroFix"}</strong>
                        <small id="appMenuBrandLocation">⚡ Powering Your Trust</small>
                    </div>
                </div>
                <button type="button" class="app-menu-close" onclick="closeNavbarMenu()" aria-label="Close Menu">✕</button>
            </div>

            <nav class="app-menu-list">
                <button type="button" class="app-menu-item" onclick="appNavigate('heroSection')">
                    <span class="menu-item-icon">🏠</span><span id="appNavHome">Home</span><span class="menu-arrow">›</span>
                </button>
                <button type="button" class="app-menu-item" onclick="appNavigate('servicesSection')">
                    <span class="menu-item-icon">⚡</span><span id="appNavServices">Services</span><span class="menu-arrow">›</span>
                </button>
                <button type="button" class="app-menu-item" onclick="appNavigate('gallerySection')">
                    <span class="menu-item-icon">🖼️</span><span id="appNavWork">Our Work</span><span class="menu-arrow">›</span>
                </button>
                <button type="button" class="app-menu-item" onclick="appNavigate('quoteFormSection')">
                    <span class="menu-item-icon">🧾</span><span id="appNavQuote">Quote</span><span class="menu-arrow">›</span>
                </button>
                <button type="button" class="app-menu-item" onclick="appNavigate('aboutSection')">
                    <span class="menu-item-icon">ℹ️</span><span id="appNavAbout">About Us</span><span class="menu-arrow">›</span>
                </button>
                <button type="button" class="app-menu-item" onclick="appNavigate('locationSection')">
                    <span class="menu-item-icon">📍</span><span id="appNavLocation">Location</span><span class="menu-arrow">›</span>
                </button>
                <button type="button" class="app-menu-item" onclick="appNavigate('reviewsSection')">
                    <span class="menu-item-icon">⭐</span><span id="appNavReviews">Reviews</span><span class="menu-arrow">›</span>
                </button>
                <button type="button" class="app-menu-item" onclick="appNavigate('faqSection')">
                    <span class="menu-item-icon">❓</span><span id="appNavFAQ">FAQ</span><span class="menu-arrow">›</span>
                </button>
                <button type="button" class="app-menu-item" onclick="appNavigate('socialSection')">
                    <span class="menu-item-icon">📱</span><span id="appNavSocial">Social Media</span><span class="menu-arrow">›</span>
                </button>
                <button type="button" class="app-menu-item" onclick="appCall()">
                    <span class="menu-item-icon">📞</span><span id="appNavContact">Contact</span><span class="menu-arrow">›</span>
                </button>
            </nav>

            <div class="app-settings">
                <div class="app-settings-title">
                    <span>⚙️</span><span id="appSettingsTitle">App Settings</span>
                </div>
                <button type="button" id="appThemeBtn" class="app-setting-item" onclick="toggleAppTheme()">
                    <span class="setting-icon" id="appThemeIcon">🌙</span>
                    <span id="appThemeText">Dark Mode</span>
                    <span class="setting-arrow">›</span>
                </button>
                <button type="button" id="appLanguageBtn" class="app-setting-item" onclick="toggleAppLanguage()">
                    <span class="setting-icon">🌐</span>
                    <span id="appLanguageText">हिन्दी / English</span>
                    <span class="setting-arrow">›</span>
                </button>
                <button type="button" id="appResetBtn" class="app-setting-item app-reset-item" onclick="resetAppAction()">
                    <span class="setting-icon">🔄</span>
                    <span id="appResetText">Reset App</span>
                    <span class="setting-arrow">›</span>
                </button>
            </div>

            <div class="app-menu-footer">
                <span>${biz.name || "Sandeep ElectroFix"}</span>
                <small>Powering Your Trust</small>
            </div>
        </aside>
    `;

    document.body.prepend(navbar);

    const menuBtn = document.getElementById("appMenuBtn");
    const overlay = document.getElementById("appMenuOverlay");

    if (menuBtn) {
        menuBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            toggleNavbarMenu();
        });
    }

    if (overlay) {
        overlay.addEventListener("click", function () {
            closeNavbarMenu();
        });
    }

    updateNavbarLanguage();
    updateNavbarTheme();
}

function toggleNavbarMenu() {
    const btn = document.getElementById("appMenuBtn");
    const menu = document.getElementById("appSideMenu");
    const overlay = document.getElementById("appMenuOverlay");

    if (!btn || !menu) return;

    const isOpen = menu.classList.contains("active");

    if (isOpen) {
        closeNavbarMenu();
    } else {
        menu.classList.add("active");
        overlay?.classList.add("active");
        btn.classList.add("active");
        btn.setAttribute("aria-expanded", "true");
        menu.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        history.pushState({ isNavbarMenuOpen: true }, "");
    }
}

function closeNavbarMenu(isFromHistory = false) {
    const btn = document.getElementById("appMenuBtn");
    const menu = document.getElementById("appSideMenu");
    const overlay = document.getElementById("appMenuOverlay");
    const wasOpen = menu?.classList.contains("active");

    menu?.classList.remove("active");
    overlay?.classList.remove("active");
    btn?.classList.remove("active");
    btn?.setAttribute("aria-expanded", "false");
    menu?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (wasOpen && !isFromHistory && history.state && history.state.isNavbarMenuOpen) {
        history.back();
    }
}

function appNavigate(sectionId) {
    closeNavbarMenu();
    setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (!section) return;
        const navbar = document.getElementById("appNavbar");
        const offset = navbar ? navbar.offsetHeight + 10 : 78;
        const y = section.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }, 150);
}

function appCall() {
    closeNavbarMenu();
    const phone = window.MASTER_CONFIG?.business?.phone;
    if (phone) window.location.href = `tel:${phone}`;
}

function toggleAppTheme() {
    const root = document.documentElement;
    root.classList.toggle("saved-light-theme");
    const isLight = root.classList.contains("saved-light-theme");
    localStorage.setItem("sandeepTheme", isLight ? "light" : "dark");
    updateThemeButtonText();
    updateNavbarTheme();
}

function toggleAppLanguage() {
    const newLang = currentLang === "hi" ? "en" : "hi";
    setLanguage(newLang);
    updateNavbarLanguage();
}

function resetAppAction() {
    closeNavbarMenu();
    setTimeout(() => { resetAllToDefault(); }, 150);
}

function updateNavbarLanguage() {
    const isHi = currentLang === "hi";
    const cfg = window.MASTER_CONFIG || {};
    const biz = cfg.business || {};

    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    };

    setText("appBrandName", biz.name || "Sandeep ElectroFix");
    setText("appBrandTagline", isHi ? (biz.tagline_hi || "") : (biz.tagline_en || ""));
    setText("appMenuBrandName", biz.name || "Sandeep ElectroFix");
    setText("appMenuBrandLocation", "⚡ Powering Your Trust");

    setText("appNavHome", isHi ? "होम" : "Home");
    setText("appNavServices", isHi ? "सेवाएँ" : "Services");
    setText("appNavWork", isHi ? "हमारे कार्य" : "Our Work");
    setText("appNavQuote", isHi ? "कोटेशन" : "Quote");
    setText("appNavAbout", isHi ? "हमारे बारे में" : "About Us");
    setText("appNavLocation", isHi ? "लोकेशन" : "Location");
    setText("appNavReviews", isHi ? "ग्राहकों की राय" : "Reviews");
    setText("appNavFAQ", isHi ? "अक्सर पूछे जाने वाले सवाल" : "FAQ");
    setText("appNavSocial", isHi ? "सोशल मीडिया" : "Social Media");
    setText("appNavContact", isHi ? "संपर्क करें" : "Contact");

    setText("appSettingsTitle", isHi ? "ऐप सेटिंग्स" : "App Settings");
    setText("appLanguageText", isHi ? "भाषा बदलें (हिन्दी / English)" : "Change Language (English / हिन्दी)");
    setText("appResetText", isHi ? "ऐप रीसेट करें" : "Reset App");

    updateNavbarTheme();
}

function updateNavbarTheme() {
    const isLight = document.documentElement.classList.contains("saved-light-theme");
    const icon = document.getElementById("appThemeIcon");
    const text = document.getElementById("appThemeText");

    if (icon) icon.innerText = isLight ? "🌙" : "☀️";
    if (text) {
        text.innerText = isLight
            ? (currentLang === "hi" ? "डार्क मोड" : "Dark Mode")
            : (currentLang === "hi" ? "लाइट मोड" : "Light Mode");
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeNavbarMenu();
        closeAreaModal();
        closeServiceModal();
        closeLightboxModal();
    }
});

function updateThemeButtonText() {
    const isLight = document.documentElement.classList.contains("saved-light-theme");
    const themeIcon = document.getElementById("themeIcon");
    const themeText = document.getElementById("themeText");
    if (themeIcon && themeText) {
        themeIcon.innerText = isLight ? "🌙" : "☀️";
        themeText.innerText = isLight 
            ? (currentLang === "hi" ? "डार्क मोड" : "Dark Mode")
            : (currentLang === "hi" ? "लाइट मोड" : "Light Mode");
    }
}

/* =========================================================
   LANGUAGE AND RENDERING
========================================================= */
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("sandeepLang", currentLang);

    document.querySelectorAll(".language-btn").forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });

    const isHi = lang === "hi";
    const cfg = window.MASTER_CONFIG;
    const biz = cfg.business;
    const ctrl = cfg.controls;

    if (document.getElementById("resetBtnText")) document.getElementById("resetBtnText").innerText = isHi ? "रीसेट" : "Reset";

    document.getElementById("businessTitle").innerText = biz.name;
    document.getElementById("businessTagline").innerText = isHi ? biz.tagline_hi : biz.tagline_en;
    document.getElementById("businessLocation").innerText = isHi ? `📍 ${biz.location_hi}` : `📍 ${biz.location_en}`;
    document.getElementById("callBtnText").innerText = isHi ? "📞 अभी कॉल करें" : "📞 Call Now";
    document.getElementById("whatsappBtnText").innerText = isHi ? "💬 व्हाट्सएप करें" : "💬 WhatsApp";

    document.getElementById("discountBadge").innerText = isHi ? "🔥 विशेष ऑफर" : "🔥 SPECIAL OFFER";
    document.getElementById("discountTitle").innerText = isHi ? "विशेष छूट" : "Special Discount";
    document.getElementById("discountPercentage").innerText = ctrl.discountPercent || 10;
    document.getElementById("discountMessage").innerText = isHi 
        ? `इलेक्ट्रिकल सेवाओं पर ${ctrl.discountPercent}% की भारी छूट पाएं` 
        : `Get ${ctrl.discountPercent}% OFF on selected electrical services.`;
    document.getElementById("discountValidity").innerText = isHi ? "⏳ सीमित समय के लिए" : "⏳ Limited Time Offer";
    document.getElementById("discountBtnText").innerText = isHi ? "⚡ छूट प्राप्त करें" : "⚡ Get Discount";

    document.getElementById("quickHeading").innerText = isHi ? "त्वरित सेवाएँ" : "Quick Access";
    document.getElementById("labelCall").innerText = isHi ? "कॉल करें" : "Call";
    document.getElementById("labelWhatsapp").innerText = isHi ? "व्हाट्सएप" : "WhatsApp";
    document.getElementById("labelEmail").innerText = isHi ? "ईमेल" : "Email";
    document.getElementById("labelWeb").innerText = isHi ? "वेबसाइट" : "Website";
    document.getElementById("labelMap").innerText = isHi ? "गूगल मैप्स" : "Google Maps";
    document.getElementById("labelSaveContact").innerText = isHi ? "नंबर सेव करें" : "Save Contact";
    document.getElementById("labelShare").innerText = isHi ? "शेयर करें" : "Share";
    document.getElementById("labelWork").innerText = isHi ? "हमारे कार्य" : "Our Work";
    document.getElementById("labelCatalogue").innerText = isHi ? "सामग्री सूची" : "Catalogue";
    document.getElementById("socialHeading").innerText = isHi ? "हमसे सोशल मीडिया पर जुड़ें" : "Connect on Social Media";

    document.getElementById("aboutHeading").innerText = isHi ? "हमारे बारे में" : "About Us";
    document.getElementById("aboutText").innerHTML = isHi
        ? `<strong>${biz.name}</strong> में आपका स्वागत है। हम लखनऊ में पेशेवर इलेक्ट्रीशियन सेवाएँ प्रदान करते हैं, जिसमें हाउस वायरिंग, फॉल्स सीलिंग वायरिंग, एमसीबी और डीबी इंस्टॉलेशन, पंखा और लाइट फिटिंग, इन्वर्टर वायरिंग, फॉल्ट रिपेयर और मेंटेनेंस शामिल हैं।`
        : `Welcome to <strong>${biz.name}</strong>. We provide professional electrical services across Lucknow, including house wiring, false ceiling wiring, MCB & DB installation, fan and light fitting, inverter wiring, fault repair, and general maintenance.`;

    document.getElementById("locHeading").innerText = isHi ? "📍 सेवा क्षेत्र एवं लोकेशन" : "📍 Service Location";
    document.getElementById("locDesc").innerText = isHi ? "पूरे लखनऊ और आसपास के क्षेत्रों में ऑन-साइट इलेक्ट्रीशियन सेवा उपलब्ध।" : "Providing on-site electrical services across Lucknow.";
    document.getElementById("distBtnText").innerText = isHi ? "हमारे यहाँ से अपनी दूरी चेक करें" : "Check Your Distance from Us";
    document.getElementById("mapBtnText").innerText = isHi ? "गूगल मैप्स पर रास्ता देखें" : "Get Directions on Google Maps";

    document.getElementById("servicesHeading").innerText = isHi ? "हमारी सेवाएँ" : "Our Services";
    document.getElementById("galleryHeading").innerText = isHi ? "हमारे द्वारा किए गए कार्य" : "Our Work";
    document.getElementById("qrHeading").innerText = isHi ? "क्यूआर कोड स्कैन करें" : "Scan QR Code";
    document.getElementById("qrDesc").innerText = isHi ? "हमारा डिजिटल कार्ड सेव करने या भुगतान के लिए यह क्यूआर कोड स्कैन करें।" : "Scan this QR code to quickly save our digital card or pay.";
    document.getElementById("qrBtnText").innerText = isHi ? "📥 क्यूआर कोड डाउनलोड करें" : "📥 Download QR Code";
    document.getElementById("reviewsHeading").innerText = isHi ? "ग्राहकों की राय" : "Customer Reviews";

    document.getElementById("quoteHeading").innerText = isHi ? "कोटेशन व अनुमानित खर्च" : "Estimate & Quotation";
    if (document.getElementById("customerName")) document.getElementById("customerName").placeholder = isHi ? "आपका नाम *" : "Your Name *";
    if (document.getElementById("customerPhone")) document.getElementById("customerPhone").placeholder = isHi ? "मोबाइल नंबर *" : "Mobile Number *";
    if (document.getElementById("customerLocation")) document.getElementById("customerLocation").placeholder = isHi ? "आपका पता / एरिया *" : "Your Address / Area *";
    if (document.getElementById("customerMessage")) document.getElementById("customerMessage").placeholder = isHi ? "कार्य का अतिरिक्त विवरण (वैकल्पिक)..." : "Additional work details (optional)...";

    document.getElementById("lblSubtotal").innerText = isHi ? "कुल राशि:" : "Subtotal:";
    document.getElementById("lblGrandTotal").innerText = isHi ? "अंतिम राशि:" : "Grand Total:";
    document.getElementById("discountLabel").innerText = isHi ? `विशेष छूट (${ctrl.discountPercent}% OFF):` : `Special Discount (${ctrl.discountPercent}% OFF):`;
    document.getElementById("sendWhatsappBtn").innerText = isHi ? "💬 व्हाट्सएप पर भेजें" : "💬 Send on WhatsApp";
    document.getElementById("downloadPdfBtn").innerText = isHi ? "📄 पीडीएफ एस्टीमेट डाउनलोड करें" : "📄 Download PDF Estimate";

    document.getElementById("faqHeading").innerText = isHi ? "अक्सर पूछे जाने वाले सवाल" : "Frequently Asked Questions";
    document.getElementById("navHome").innerText = isHi ? "होम" : "Home";
    document.getElementById("navServices").innerText = isHi ? "सेवाएं" : "Services";
    document.getElementById("navWork").innerText = isHi ? "कार्य" : "Work";
    document.getElementById("navQuote").innerText = isHi ? "कोट" : "Quote";
    document.getElementById("navCall").innerText = isHi ? "कॉल" : "Call";

    updateThemeButtonText();
    applyVisibilityControls();
    renderServices();
    renderGallery();
    renderReviews();
    renderFAQ();
    updateCalculations();
    updateNavbarLanguage();
    updateNavbarTheme();
}

function renderServices() {
    const container = document.getElementById("serviceContainer");
    if (!container || !window.MASTER_CONFIG?.services) return;
    container.innerHTML = "";

    window.MASTER_CONFIG.services.forEach((service, sIdx) => {
        if (service.show === false) return;

        const title = currentLang === "hi" ? service.title_hi : service.title_en;
        let activeCount = 0;
        service.subServices.forEach((_, subIdx) => {
            if (selectedItemsMap[`${sIdx}_${subIdx}`]) {
                activeCount += 1;
            }
        });

        const card = document.createElement("div");
        card.className = `service-card ${activeCount > 0 ? 'has-active-items' : ''}`;
        card.innerHTML = `
            <div class="service-header" onclick="openServiceModal(${sIdx})">
                <div class="service-title-wrap">
                    <span class="service-icon">${service.icon}</span>
                    <h3 class="service-title">${title}</h3>
                </div>
                <span class="toggle-arrow">➔</span>
            </div>
        `;
        container.appendChild(card);
    });
}

/* =========================================================
   MODAL 1: MAIN SERVICE LIST MODAL
========================================================= */
function openServiceModal(sIdx) {
    const service = window.MASTER_CONFIG.services[sIdx];
    const title = currentLang === "hi" ? service.title_hi : service.title_en;
    const desc = currentLang === "hi" ? service.desc_hi : service.desc_en;

    document.getElementById("modalServiceIcon").innerText = service.icon;
    document.getElementById("modalServiceTitle").innerText = title;
    document.getElementById("modalServiceDesc").innerText = desc;

    const itemsContainer = document.getElementById("modalItemsContainer");
    itemsContainer.innerHTML = service.subServices.filter(sub => sub.show !== false).map((sub, subIdx) => {
        const key = `${sIdx}_${subIdx}`;
        const item = selectedItemsMap[key];
        const isAreaBased = (sub.rate_en && sub.rate_en.includes('/ sq.ft.')) || (sub.rate_hi && sub.rate_hi.includes('वर्ग फीट'));
        const name = currentLang === "hi" ? sub.name_hi : sub.name_en;
        const rate = currentLang === "hi" ? sub.rate_hi : sub.rate_en;

        if (isAreaBased) {
            // AREA BASED ROW (Tap to open popup)
            const hasArea = item && item.type === 'area';
            const badge = hasArea
                ? `<span class="area-badge" style="background:#e0f2fe; color:#0369a1; padding:3px 8px; border-radius:12px; font-size:0.8rem; font-weight:700;">${item.area} sq.ft. = ₹${item.total.toLocaleString('en-IN')}</span>`
                : `<span class="area-badge-tap" style="color:#64748b; font-size:0.8rem; font-weight:600;">👆 टैप करें</span>`;

            return `
                <div class="sub-service-item ${hasArea ? 'has-qty' : ''}" id="modal_row_${key}" onclick="openAreaModal(${sIdx}, ${subIdx})" style="cursor:pointer;">
                    <div class="sub-service-info">
                        <span class="sub-name">${name}</span>
                        <span class="sub-rate">${rate}</span>
                    </div>
                    <div class="area-action-display">
                        ${badge}
                    </div>
                </div>
            `;
        } else {
            // QUANTITY BASED ROW (+ / -)
            const qty = item?.qty || 0;
            return `
                <div class="sub-service-item ${qty > 0 ? 'has-qty' : ''}" id="modal_row_${key}">
                    <div class="sub-service-info">
                        <span class="sub-name">${name}</span>
                        <span class="sub-rate">${rate}</span>
                    </div>
                    <div class="qty-control">
                        <button type="button" class="qty-btn minus-btn" onclick="changeQtyModal(${sIdx}, ${subIdx}, -1)">−</button>
                        <span class="qty-val" id="modal_qty_${key}">${qty}</span>
                        <button type="button" class="qty-btn plus-btn" onclick="changeQtyModal(${sIdx}, ${subIdx}, 1)">+</button>
                    </div>
                </div>
            `;
        }
    }).join("");

    const overlay = document.getElementById("serviceModalOverlay");
    overlay.style.display = "flex";
    setTimeout(() => overlay.classList.add("active"), 10);
    document.body.style.overflow = "hidden";

    history.pushState({ isModalOpen: true }, "");
}

function changeQtyModal(sIdx, subIdx, change) {
    changeQty(sIdx, subIdx, change);
    const key = `${sIdx}_${subIdx}`;
    const currentQty = selectedItemsMap[key]?.qty || 0;
    
    const mQty = document.getElementById(`modal_qty_${key}`);
    const mRow = document.getElementById(`modal_row_${key}`);
    if (mQty) mQty.innerText = currentQty;
    if (mRow) mRow.classList.toggle("has-qty", currentQty > 0);
}

function closeServiceModal(isFromHistory = false) {
    const overlay = document.getElementById("serviceModalOverlay");
    if (overlay && overlay.style.display === "flex") {
        overlay.classList.remove("active");
        setTimeout(() => {
            overlay.style.display = "none";
            document.body.style.overflow = "";
            renderServices();
        }, 300);

        if (!isFromHistory && history.state && history.state.isModalOpen) {
            history.back();
        }
    }
}

/* =========================================================
   MODAL 2: CENTER POPUP FOR AREA-BASED SUB-SERVICES
   (Area input only, Approx rate, Live estimate, Delete)
========================================================= */
function openAreaModal(sIdx, subIdx) {
    const service = window.MASTER_CONFIG.services[sIdx];
    const sub = service.subServices[subIdx];
    const key = `${sIdx}_${subIdx}`;
    const name = currentLang === "hi" ? sub.name_hi : sub.name_en;
    const rateStr = currentLang === "hi" ? sub.rate_hi : sub.rate_en;

    activeAreaContext = {
        key: key,
        sIdx: sIdx,
        subIdx: subIdx,
        name_hi: sub.name_hi,
        name_en: sub.name_en,
        price: sub.price,
        rateStr: rateStr
    };

    const modalIcon = document.getElementById("areaModalIcon");
    const modalTitle = document.getElementById("areaModalTitle");
    const rateDisplay = document.getElementById("areaModalRateDisplay");
    const areaInput = document.getElementById("areaSqftInput");
    const deleteBtn = document.getElementById("btnDeleteAreaService");

    if (modalIcon) modalIcon.innerText = service.icon || "🏠";
    if (modalTitle) modalTitle.innerText = name;
    if (rateDisplay) rateDisplay.innerText = rateStr;

    const existing = selectedItemsMap[key];
    if (existing && existing.type === 'area') {
        if (areaInput) areaInput.value = existing.area;
        if (deleteBtn) deleteBtn.style.display = "block";
    } else {
        if (areaInput) areaInput.value = "";
        if (deleteBtn) deleteBtn.style.display = "none";
    }

    updateAreaLiveEstimate();

    const overlay = document.getElementById("areaCalcModalOverlay");
    if (overlay) overlay.style.display = "flex";

    history.pushState({ isAreaModalOpen: true }, "");
}

function updateAreaLiveEstimate() {
    if (!activeAreaContext) return;
    const areaInput = document.getElementById("areaSqftInput");
    const area = parseFloat(areaInput?.value) || 0;
    const total = area * activeAreaContext.price;

    const liveDisplay = document.getElementById("areaModalLiveAmount");
    if (liveDisplay) {
        liveDisplay.innerText = `₹${total.toLocaleString('en-IN')}`;
    }
}

function saveAreaSubService() {
    if (!activeAreaContext) return;
    const areaInput = document.getElementById("areaSqftInput");
    const area = parseFloat(areaInput?.value) || 0;

    if (area <= 0) {
        alert(currentLang === 'hi' ? 'कृपया सही एरिया (Area in sq. ft.) दर्ज करें।' : 'Please enter a valid area in sq. ft.');
        return;
    }

    const calculatedTotal = area * activeAreaContext.price;

    selectedItemsMap[activeAreaContext.key] = {
        type: 'area',
        name_hi: activeAreaContext.name_hi,
        name_en: activeAreaContext.name_en,
        price: activeAreaContext.price,
        rateStr: activeAreaContext.rateStr,
        area: area,
        qty: 1,
        total: calculatedTotal
    };

    localStorage.setItem("sandeepCart", JSON.stringify(selectedItemsMap));
    closeAreaModal();
    updateCalculations();
    
    // Refresh parent service modal if open
    if (activeAreaContext.sIdx !== undefined) {
        openServiceModal(activeAreaContext.sIdx);
    }
}

function deleteAreaSubService() {
    if (!activeAreaContext) return;
    delete selectedItemsMap[activeAreaContext.key];
    localStorage.setItem("sandeepCart", JSON.stringify(selectedItemsMap));
    closeAreaModal();
    updateCalculations();

    if (activeAreaContext.sIdx !== undefined) {
        openServiceModal(activeAreaContext.sIdx);
    }
}

function closeAreaModal(isFromHistory = false) {
    const overlay = document.getElementById("areaCalcModalOverlay");
    if (overlay && overlay.style.display === "flex") {
        overlay.style.display = "none";
        activeAreaContext = null;

        if (!isFromHistory && history.state && history.state.isAreaModalOpen) {
            history.back();
        }
    }
}

/* =========================================================
   LIGHTBOX & TOAST
========================================================= */
function openLightboxModal(src) {
    const box = document.getElementById("lightbox");
    const img = document.getElementById("lightboxImage");
    if (box && img) {
        img.src = src;
        box.style.display = "flex";
        history.pushState({ isLightboxOpen: true }, "");
    }
}

function closeLightboxModal(isFromHistory = false) {
    const box = document.getElementById("lightbox");
    if (box && box.style.display === "flex") {
        box.style.display = "none";
        if (!isFromHistory && history.state && history.state.isLightboxOpen) {
            history.back();
        }
    }
}

function showExitToast(msg) {
    let toast = document.getElementById("appExitToast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "appExitToast";
        toast.style.position = "fixed";
        toast.style.bottom = "85px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.background = "rgba(5, 8, 22, 0.95)";
        toast.style.color = "#f5c542";
        toast.style.padding = "10px 22px";
        toast.style.borderRadius = "30px";
        toast.style.fontSize = "13px";
        toast.style.fontWeight = "600";
        toast.style.zIndex = "9999999";
        toast.style.boxShadow = "0 8px 30px rgba(0,0,0,0.7)";
        toast.style.border = "1px solid rgba(245, 197, 66, 0.5)";
        toast.style.transition = "opacity 0.3s ease";
        toast.style.pointerEvents = "none";
        document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.style.opacity = "1";
    toast.style.display = "block";
    clearTimeout(window.exitToastTimer);
    window.exitToastTimer = setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => { toast.style.display = "none"; }, 300);
    }, 2000);
}

/* =========================================================
   🔙 SMART BACK BUTTON SYSTEM
========================================================= */
window.addEventListener("popstate", () => {
    // 1. Area Calculation Modal
    const areaOverlay = document.getElementById("areaCalcModalOverlay");
    if (areaOverlay && areaOverlay.style.display === "flex") {
        closeAreaModal(true);
        return;
    }

    // 2. Side Navbar Menu
    const navbarMenu = document.getElementById("appSideMenu");
    if (navbarMenu && navbarMenu.classList.contains("active")) {
        closeNavbarMenu(true);
        return;
    }

    // 3. Lightbox
    const lightbox = document.getElementById("lightbox");
    if (lightbox && lightbox.style.display === "flex") {
        closeLightboxModal(true);
        return;
    }

    // 4. Main Service Modal
    const modalOverlay = document.getElementById("serviceModalOverlay");
    if (modalOverlay && (modalOverlay.classList.contains("active") || modalOverlay.style.display === "flex")) {
        closeServiceModal(true);
        return;
    }

    // 5. Exit App / Double Back
    const currentTime = Date.now();
    if (currentTime - lastBackPressTime < 2000) {
        history.back();
    } else {
        lastBackPressTime = currentTime;
        history.pushState({ page: "app" }, "");
        const msg = currentLang === "hi"
            ? "ऐप बंद करने के लिए दोबारा Back दबाएं"
            : "Press Back again to exit app";
        showExitToast(msg);
    }
});

/* =========================================================
   QUANTITY & CART CALCULATIONS
========================================================= */
function changeQty(sIdx, subIdx, change) {
    const key = `${sIdx}_${subIdx}`;
    const sub = window.MASTER_CONFIG.services[sIdx].subServices[subIdx];

    if (!selectedItemsMap[key]) {
        selectedItemsMap[key] = {
            type: 'qty',
            name_hi: sub.name_hi,
            name_en: sub.name_en,
            price: sub.price,
            qty: 0,
            total: 0
        };
    }

    selectedItemsMap[key].qty += change;
    selectedItemsMap[key].total = selectedItemsMap[key].qty * selectedItemsMap[key].price;

    if (selectedItemsMap[key].qty <= 0) {
        delete selectedItemsMap[key];
    }

    localStorage.setItem("sandeepCart", JSON.stringify(selectedItemsMap));
    updateCalculations();
}

function changeQtyDirect(key, change) {
    if (!selectedItemsMap[key]) return;
    const parts = key.split('_');
    const sIdx = parseInt(parts[0]);
    const subIdx = parseInt(parts[1]);

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
    const countEl = document.getElementById("selectedCount");
    const listEl = document.getElementById("selectedServicesList");
    const subtotalEl = document.getElementById("calcSubtotal");
    const discRow = document.getElementById("calcDiscountRow");
    const discEl = document.getElementById("calcDiscount");
    const totalEl = document.getElementById("calcGrandTotal");
    const ctrl = window.MASTER_CONFIG?.controls;

    if (countEl) countEl.innerText = entries.length;

    if (entries.length === 0) {
        if (listEl) listEl.innerHTML = `<p class="no-selection-hint">${currentLang === 'hi' ? 'अभी तक कोई सेवा नहीं चुनी गई। ऊपर सेवाओं पर टैप करके चुनें।' : 'No services selected yet. Tap services above to add.'}</p>`;
        if (subtotalEl) subtotalEl.innerText = "₹0";
        if (discRow) discRow.style.display = "none";
        if (totalEl) totalEl.innerText = "₹0";
        return;
    }

    if (listEl) {
        listEl.innerHTML = entries.map(([key, itm]) => {
            const name = currentLang === 'hi' ? itm.name_hi : itm.name_en;
            const parts = key.split('_');
            const sIdx = parseInt(parts[0]);
            const subIdx = parseInt(parts[1]);

            if (itm.type === 'area') {
                return `
                    <div class="summary-item-row" style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #f1f5f9;">
                        <div class="summary-item-left">
                            <span class="summary-item-name" style="font-weight:700; color:#0f172a;">• ${name}</span><br>
                            <span class="summary-item-price" style="font-size:0.85rem; color:#64748b;">${itm.area} sq.ft. × ₹${itm.price}/sq.ft.</span>
                        </div>
                        <div class="summary-qty-actions" style="display:flex; align-items:center; gap:8px;">
                            <strong style="color:#0ea5e9; font-size:1rem; margin-right:4px;">₹${itm.total.toLocaleString('en-IN')}</strong>
                            <button type="button" class="summary-btn edit" onclick="openAreaModal(${sIdx}, ${subIdx})" title="एरिया बदलें" style="padding:4px 8px; border-radius:6px; border:1px solid #cbd5e1; background:#f8fafc; font-size:0.8rem; cursor:pointer;">✏️</button>
                            <button type="button" class="summary-btn remove" onclick="removeItemDirect('${key}')" title="हटाएं" style="padding:4px 8px; border-radius:6px; border:1px solid #fca5a5; background:#fee2e2; color:#dc2626; font-size:0.8rem; cursor:pointer;">🗑️</button>
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div class="summary-item-row" style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #f1f5f9;">
                        <div class="summary-item-left">
                            <span class="summary-item-name" style="font-weight:700; color:#0f172a;">• ${name}</span><br>
                            <span class="summary-item-price" style="font-size:0.85rem; color:#64748b;">₹${itm.price} × ${itm.qty} = ₹${itm.total.toLocaleString('en-IN')}</span>
                        </div>
                        <div class="summary-qty-actions" style="display:flex; align-items:center; gap:6px;">
                            <button type="button" class="summary-btn minus" onclick="changeQtyDirect('${key}', -1)" title="कम करें" style="width:26px; height:26px; border-radius:50%; border:1px solid #cbd5e1; background:#f8fafc; cursor:pointer;">−</button>
                            <span class="summary-qty-val" style="font-weight:700; min-width:18px; text-align:center;">${itm.qty}</span>
                            <button type="button" class="summary-btn plus" onclick="changeQtyDirect('${key}', 1)" title="बढ़ाएं" style="width:26px; height:26px; border-radius:50%; border:none; background:#0ea5e9; color:#fff; cursor:pointer;">+</button>
                            <button type="button" class="summary-btn remove" onclick="removeItemDirect('${key}')" title="हटाएं" style="margin-left:4px; padding:2px 6px; border-radius:6px; border:1px solid #fca5a5; background:#fee2e2; color:#dc2626; cursor:pointer;">🗑️</button>
                        </div>
                    </div>
                `;
            }
        }).join("");
    }

    const subtotal = entries.reduce((acc, [_, itm]) => acc + (itm.total || 0), 0);
    const isDiscountActive = ctrl?.showDiscount && (ctrl?.discountPercent > 0);
    const discount = isDiscountActive ? Math.round(subtotal * (ctrl.discountPercent / 100)) : 0;
    const total = subtotal - discount;

    if (subtotalEl) subtotalEl.innerText = `₹${subtotal.toLocaleString('en-IN')}`;
    if (discRow) discRow.style.display = isDiscountActive ? "flex" : "none";
    if (discEl) discEl.innerText = `-₹${discount.toLocaleString('en-IN')}`;
    if (totalEl) totalEl.innerText = `₹${total.toLocaleString('en-IN')}`;
}

function renderGallery() {
    const container = document.getElementById("galleryContainer");
    if (!container || !window.MASTER_CONFIG?.gallery) return;
    container.innerHTML = window.MASTER_CONFIG.gallery.filter(g => g.show !== false).map(g => {
        const title = currentLang === "hi" ? g.title_hi : g.title_en;
        return `
            <div class="gallery-item" onclick="openLightboxModal('${g.image}')">
                <img src="${g.image}" alt="${title}" onerror="this.parentElement.style.display='none'">
                <div class="gallery-title">${title}</div>
            </div>
        `;
    }).join("");
}

function renderReviews() {
    const container = document.getElementById("reviewContainer");
    if (!container || !window.MASTER_CONFIG?.reviews) return;
    container.innerHTML = window.MASTER_CONFIG.reviews.filter(r => r.show !== false).map(r => `
        <div class="card review-card" style="padding:12px; margin-bottom:8px;">
            <div style="color:#f5c542;">${"★".repeat(r.rating || 5)}</div>
            <p style="margin:4px 0; font-size:0.85rem;">"${currentLang === 'hi' ? r.text_hi : r.text_en}"</p>
            <small style="color:#aab4c8;">— ${r.name}</small>
        </div>
    `).join("");
}

function renderFAQ() {
    const container = document.getElementById("faqContainer");
    if (!container || !window.MASTER_CONFIG?.faq) return;
    container.innerHTML = window.MASTER_CONFIG.faq.filter(f => f.show !== false).map(f => `
        <div class="faq-item" onclick="this.classList.toggle('active')">
            <div class="faq-question"><span>${currentLang === 'hi' ? f.q_hi : f.q_en}</span><span class="faq-icon">+</span></div>
            <div class="faq-answer">${currentLang === 'hi' ? f.a_hi : f.a_en}</div>
        </div>
    `).join("");
}

function applyQuickLayout(layout) {
    const container = document.getElementById("quickGridContainer");
    if (container) container.className = `grid layout-${layout}`;
    document.querySelectorAll("#quickLayoutBar .layout-btn").forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-ql") === layout);
    });
    localStorage.setItem("sandeepQuickLayout", layout);
}

function applyServiceLayout(layout) {
    const container = document.getElementById("serviceContainer");
    if (container) container.className = `service-grid layout-${layout}`;
    document.querySelectorAll("#servicesLayoutBar .layout-btn").forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-sl") === layout);
    });
    localStorage.setItem("sandeepServiceLayout", layout);
}

function saveContactVCard() {
    const biz = window.MASTER_CONFIG?.business;
    if (!biz) return;

    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${biz.name} (${biz.owner})
ORG:${biz.name}
TEL;TYPE=CELL,VOICE:${biz.phone}
EMAIL:${biz.email}
URL:${biz.website}
ADR;TYPE=WORK:;;${biz.location_en};;;;
END:VCARD`;

    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${biz.name.replace(/\s+/g, "_")}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/* =========================================================
   WHATSAPP QUOTE
========================================================= */
function sendWhatsappQuote() {
    const name = document.getElementById("customerName")?.value.trim();
    const phone = document.getElementById("customerPhone")?.value.trim();
    const location = document.getElementById("customerLocation")?.value.trim();
    const note = document.getElementById("customerMessage")?.value.trim();
    const items = Object.values(selectedItemsMap);
    const ctrl = window.MASTER_CONFIG?.controls;
    const biz = window.MASTER_CONFIG?.business;

    if (!name || !phone) return alert(currentLang === 'hi' ? "कृपया अपना नाम और मोबाइल नंबर दर्ज करें।" : "Please enter Name and Phone.");
    if (!location) return alert(currentLang === 'hi' ? "कृपया अपना पता या लोकेशन दर्ज करें।" : "Please provide your address/location.");
    if (items.length === 0) return alert(currentLang === 'hi' ? "कृपया कम से कम एक सेवा जोड़ें।" : "Please add at least one service.");

    const subtotal = items.reduce((acc, itm) => acc + (itm.total || 0), 0);
    const isDiscountActive = ctrl?.showDiscount && (ctrl?.discountPercent > 0);
    const discount = isDiscountActive ? Math.round(subtotal * (ctrl.discountPercent / 100)) : 0;
    const total = subtotal - discount;

    let msg = `⚡ *${biz.name} - Estimate Request* ⚡\n\n`;
    msg += `👤 *${currentLang === 'hi' ? 'नाम' : 'Name'}:* ${name}\n`;
    msg += `📞 *${currentLang === 'hi' ? 'फोन' : 'Phone'}:* ${phone}\n`;
    msg += `📍 *${currentLang === 'hi' ? 'पता / लोकेशन' : 'Location'}:* ${location}\n`;
    if (note) msg += `📝 *${currentLang === 'hi' ? 'अतिरिक्त नोट' : 'Note'}:* ${note}\n`;
    msg += `\n📋 *${currentLang === 'hi' ? 'चुनी गई सेवाएँ' : 'Selected Services'}:*\n`;

    items.forEach((itm, i) => {
        const itemTitle = currentLang === 'hi' ? itm.name_hi : itm.name_en;
        if (itm.type === 'area') {
            msg += `${i+1}. ${itemTitle} (${itm.area} sq.ft. × ₹${itm.price}) = ₹${itm.total.toLocaleString('en-IN')}\n`;
        } else {
            msg += `${i+1}. ${itemTitle} [Qty: ${itm.qty}] = ₹${itm.total.toLocaleString('en-IN')}\n`;
        }
    });

    msg += `\n💵 *Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n`;
    if (isDiscountActive) msg += `🎁 *Discount (${ctrl.discountPercent}%):* -₹${discount.toLocaleString('en-IN')}\n`;
    msg += `✅ *Grand Total:* ₹${total.toLocaleString('en-IN')}\n\n`;
    msg += `_Please confirm visit/booking._`;

    window.open(`https://wa.me/${biz.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
}

/* =========================================================
   📄 PDF ESTIMATE GENERATION (Area + Quantity Support)
========================================================= */
function downloadEstimatePDF() {
    const { jsPDF } = window.jspdf || {};
    if (!jsPDF) {
        return alert("PDF library is loading, please try in 2 seconds.");
    }

    const name = document.getElementById("customerName")?.value.trim() || "Customer";
    const phone = document.getElementById("customerPhone")?.value.trim() || "N/A";
    const location = document.getElementById("customerLocation")?.value.trim() || "N/A";
    const note = document.getElementById("customerMessage")?.value.trim() || "N/A";

    const items = Object.values(selectedItemsMap);
    const ctrl = window.MASTER_CONFIG?.controls || {};
    const biz = window.MASTER_CONFIG?.business || {};

    if (items.length === 0) {
        return alert(
            currentLang === "hi"
                ? "कृपया पहले कोई सेवा जोड़ें।"
                : "Please add services first."
        );
    }

    const now = new Date();
    const dateText = now.toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" });
    const timeText = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
    const website = biz.cardWebsite || biz.website || "https://sandeepelectrofix.github.io/SPractice/";

    const doc = new jsPDF();

    // HEADER
    doc.setFillColor(5, 8, 22);
    doc.rect(0, 0, 210, 42, "F");

    const logoPath = "assets/logo.png";
    const logoImage = new Image();

    logoImage.onload = function () {
        try {
            doc.addImage(logoImage, "PNG", 10, 6, 25, 25);
        } catch (e) {
            console.warn("Logo could not be added:", e);
        }
        createEstimatePDFContent();
    };

    logoImage.onerror = function () {
        createEstimatePDFContent();
    };

    logoImage.src = logoPath;

    function createEstimatePDFContent() {
        doc.setTextColor(245, 197, 66);
        doc.setFontSize(18);
        doc.text(biz.name || "Sandeep ElectroFix", 40, 16);

        doc.setFontSize(9);
        doc.setTextColor(255, 255, 255);
        doc.text(`Phone: ${biz.phone || "N/A"} | Lucknow, UP`, 40, 24);

        doc.text(`Date: ${dateText}`, 140, 17);
        doc.text(`Time: ${timeText}`, 140, 24);

        doc.setTextColor(100, 200, 255);
        doc.setFontSize(8);
        doc.textWithLink(website, 40, 32, { url: website });

        doc.setTextColor(16, 24, 39);
        doc.setFontSize(11);
        doc.text("CUSTOMER ESTIMATE", 14, 52);

        doc.setFontSize(9);
        doc.text(`Client: ${name}  |  Phone: ${phone}`, 14, 59);
        doc.text(`Location: ${location}`, 14, 65);

        if (note !== "N/A") {
            doc.text(`Note: ${note}`, 14, 71);
        }

        const startTableY = note !== "N/A" ? 77 : 71;

        // TABLE ROWS (Area & Qty breakdown)
        const rows = items.map((itm, i) => {
            const price = Number(itm.price) || 0;
            const amount = Number(itm.total) || (price * (itm.qty || 1));
            const measureUnit = itm.type === 'area' ? `${itm.area} sq.ft.` : `${itm.qty} Qty`;
            const rateLabel = itm.type === 'area' ? `Rs. ${price} / sq.ft.` : `Rs. ${price}`;

            return [
                i + 1,
                itm.name_en || itm.name_hi || "Service",
                rateLabel,
                measureUnit,
                `Rs. ${amount.toLocaleString('en-IN')}`
            ];
        });

        const subtotal = items.reduce((acc, itm) => acc + (Number(itm.total) || 0), 0);
        const isDiscountActive = ctrl.showDiscount && Number(ctrl.discountPercent) > 0;
        const discount = isDiscountActive ? Math.round(subtotal * (Number(ctrl.discountPercent) / 100)) : 0;
        const total = subtotal - discount;

        doc.autoTable({
            startY: startTableY,
            head: [["#", "Service Item", "Rate", "Area / Qty", "Total Amount"]],
            body: rows,
            theme: "grid",
            headStyles: { fillColor: [5, 8, 22], textColor: [245, 197, 66] },
            styles: { fontSize: 9 },
            margin: { left: 14, right: 14 }
        });

        const finalY = doc.lastAutoTable.finalY + 8;

        doc.setFontSize(9.5);
        doc.setTextColor(16, 24, 39);
        doc.text(`Subtotal: Rs. ${subtotal.toLocaleString('en-IN')}`, 135, finalY);

        let nextY = finalY + 5;

        if (isDiscountActive) {
            doc.setTextColor(37, 211, 102);
            doc.text(`Discount (${ctrl.discountPercent}%): -Rs. ${discount.toLocaleString('en-IN')}`, 135, nextY);
            nextY += 5;
        }

        doc.setFontSize(11);
        doc.setTextColor(16, 24, 39);
        doc.text(`Grand Total: Rs. ${total.toLocaleString('en-IN')}`, 135, nextY);

        const pageHeight = doc.internal.pageSize.getHeight();
        doc.setDrawColor(220, 220, 220);
        doc.line(14, pageHeight - 20, 196, pageHeight - 20);

        doc.setFontSize(8);
        doc.setTextColor(90, 90, 90);
        doc.text("Thank you for choosing Sandeep ElectroFix", 14, pageHeight - 13);

        doc.setTextColor(14, 130, 200);
        doc.textWithLink(website, 14, pageHeight - 7, { url: website });

        const safeName = name.replace(/[^\w\s-]/g, "").replace(/\s+/g, "_");
        doc.save(`Estimate_${safeName || "Customer"}.pdf`);
    }
}

function getUserLocation() {
    const status = document.getElementById("locationStatus");
    if (!navigator.geolocation) {
        if (status) status.innerText = "Geolocation not supported.";
        return;
    }
    if (status) status.innerText = "Locating...";
    
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const R = 6371;
            const dLat = (pos.coords.latitude - 26.8467) * (Math.PI / 180);
            const dLon = (pos.coords.longitude - 80.9462) * (Math.PI / 180);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(26.8467 * (Math.PI / 180)) * Math.cos(pos.coords.latitude * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const dist = (R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))).toFixed(1);
            if (status) status.innerHTML = `✅ ${currentLang === 'hi' ? 'आप हमारे केंद्र से लगभग' : 'You are approx'} <strong>${dist} km</strong> ${currentLang === 'hi' ? 'दूर हैं।' : 'away from Lucknow center.'}`;
        },
        () => { if (status) status.innerText = "Location permission denied."; }
    );
}

function shareWebsite() {
    if (navigator.share) {
        navigator.share({ title: window.MASTER_CONFIG?.business?.name, url: window.location.href });
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
    }
}

// App Initialization
document.addEventListener("DOMContentLoaded", () => {
    initializeNavbar();

    history.replaceState({ page: "app" }, "", window.location.href);

    const savedTheme = localStorage.getItem("sandeepTheme");
    if (savedTheme === "light") {
        document.documentElement.classList.add("saved-light-theme");
    } else {
        document.documentElement.classList.remove("saved-light-theme");
    }

    document.getElementById("themeToggle")?.addEventListener("click", () => {
        document.documentElement.classList.toggle("saved-light-theme");
        const isLight = document.documentElement.classList.contains("saved-light-theme");
        localStorage.setItem("sandeepTheme", isLight ? "light" : "dark");
        updateThemeButtonText();
    });

    const qLayout = localStorage.getItem("sandeepQuickLayout") || "grid-2";
    applyQuickLayout(qLayout);

    const sLayout = localStorage.getItem("sandeepServiceLayout") || "list";
    applyServiceLayout(sLayout);

    restoreCustomerInputs();
    setLanguage(currentLang);
});
