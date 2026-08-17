/* =========================================================
   SANDEEP ELECTROFIX - PROJECT 2.1
   CORE JAVASCRIPT ENGINE
   =========================================================
   ✅ Cart Persistence
   ✅ Customer Data Persistence
   ✅ Hindi / English
   ✅ Dark / Light Mode
   ✅ Services + Quantity
   ✅ Service Modal
   ✅ Gallery + Lightbox
   ✅ Reviews
   ✅ FAQ
   ✅ GPS
   ✅ WhatsApp Quote
   ✅ PDF Estimate
   ✅ Quick Layout
   ✅ Service Layout
   ✅ PWA Shortcuts
   ✅ Mobile Navbar
   ✅ Android Back Button
   ✅ ESC / Overlay Close
   ✅ Install App
   ✅ Master Reset
   ✅ Centralized History Handling
========================================================= */


/* =========================================================
   GLOBAL STATE
========================================================= */

let currentLang = localStorage.getItem("sandeepLang") || "hi";

let selectedItemsMap = {};

let lastBackPressTime = 0;

let currentOverlayState = null;


/* =========================================================
   CART RESTORE
========================================================= */

try {

    const savedCart = localStorage.getItem("sandeepCart");

    if (savedCart) {

        selectedItemsMap = JSON.parse(savedCart);

    }

} catch (error) {

    selectedItemsMap = {};

}


/* =========================================================
   SAFE ELEMENT HELPER
========================================================= */

function getEl(id) {

    return document.getElementById(id);

}


/* =========================================================
   CUSTOMER INPUT STORAGE
========================================================= */

function saveCustomerInputs() {

    const data = {

        name: getEl("customerName")?.value || "",

        phone: getEl("customerPhone")?.value || "",

        location: getEl("customerLocation")?.value || "",

        message: getEl("customerMessage")?.value || ""

    };

    localStorage.setItem(
        "sandeepCustomer",
        JSON.stringify(data)
    );

}


function restoreCustomerInputs() {

    try {

        const saved =
            localStorage.getItem("sandeepCustomer");

        if (!saved) return;

        const data = JSON.parse(saved);

        if (getEl("customerName"))
            getEl("customerName").value =
                data.name || "";

        if (getEl("customerPhone"))
            getEl("customerPhone").value =
                data.phone || "";

        if (getEl("customerLocation"))
            getEl("customerLocation").value =
                data.location || "";

        if (getEl("customerMessage"))
            getEl("customerMessage").value =
                data.message || "";

    } catch (error) {

        console.warn(
            "Customer data restore failed:",
            error
        );

    }

}


/* =========================================================
   MASTER RESET
========================================================= */

function resetAllToDefault(skipConfirm = false) {

    const confirmMsg =
        currentLang === "hi"

            ? "क्या आप सभी चुनी गई सेवाओं, फॉर्म डेटा और सेटिंग्स को रीसेट करना चाहते हैं?"

            : "Are you sure you want to reset all selected services, inputs and settings to default?";


    if (!skipConfirm) {

        if (!confirm(confirmMsg)) return;

    }


    /* -----------------------------
       Remove saved data
    ----------------------------- */

    localStorage.removeItem("sandeepCart");

    localStorage.removeItem("sandeepCustomer");

    localStorage.removeItem("sandeepQuickLayout");

    localStorage.removeItem("sandeepServiceLayout");


    /* -----------------------------
       Reset memory
    ----------------------------- */

    selectedItemsMap = {};


    /* -----------------------------
       Reset customer fields
    ----------------------------- */

    if (getEl("customerName"))
        getEl("customerName").value = "";

    if (getEl("customerPhone"))
        getEl("customerPhone").value = "";

    if (getEl("customerLocation"))
        getEl("customerLocation").value = "";

    if (getEl("customerMessage"))
        getEl("customerMessage").value = "";


    /* -----------------------------
       Reset GPS
    ----------------------------- */

    const gpsBtn = getEl("btnGpsDetect");

    const gpsBtnText = getEl("gpsBtnText");

    if (gpsBtn)
        gpsBtn.classList.remove("active-loc");

    if (gpsBtnText)
        gpsBtnText.innerText = "GPS";


    /* -----------------------------
       Reset Theme
    ----------------------------- */

    document.documentElement.classList.add(
        "saved-light-theme"
    );

    localStorage.setItem(
        "sandeepTheme",
        "light"
    );


    /* -----------------------------
       Reset Layout
    ----------------------------- */

    applyQuickLayout(
        "grid-2",
        false
    );

    applyServiceLayout(
        "list",
        false
    );


    /* -----------------------------
       Reset Language
    ----------------------------- */

    setLanguage("en");


    /* -----------------------------
       Update UI
    ----------------------------- */

    updateThemeButtonText();

    updateCalculations();

    renderServices();


    showExitToast(
        "✅ Reset to English & Light Mode successfully"
    );

}


/* =========================================================
   LIVE GPS LOCATION
========================================================= */

function getQuoteLiveLocation() {

    const locInput =
        getEl("customerLocation");

    const gpsBtn =
        getEl("btnGpsDetect");

    const gpsBtnText =
        getEl("gpsBtnText");


    if (!navigator.geolocation) {

        alert(

            currentLang === "hi"

                ? "आपके ब्राउज़र में GPS सपोर्ट नहीं है।"

                : "Geolocation is not supported by your browser."

        );

        return;

    }


    if (gpsBtnText)
        gpsBtnText.innerText = "...";


    navigator.geolocation.getCurrentPosition(

        function (position) {

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


            if (gpsBtn)
                gpsBtn.classList.add("active-loc");


            if (gpsBtnText) {

                gpsBtnText.innerText =

                    currentLang === "hi"

                        ? "मिल गया ✓"

                        : "Fetched ✓";

            }

        },


        function () {

            alert(

                currentLang === "hi"

                    ? "लोकेशन की परमिशन नहीं मिली। कृपया हाथ से पता टाइप करें।"

                    : "Location permission denied. Please type address manually."

            );


            if (gpsBtnText)
                gpsBtnText.innerText = "GPS";

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

    const cfg =
        window.MASTER_CONFIG;

    if (!cfg) return;


    const ctrl =
        cfg.controls || {};

    const biz =
        cfg.business || {};


    function toggle(id, show) {

        const el = getEl(id);

        if (!el) return;

        el.style.display =
            show ? "" : "none";

    }


    toggle(
        "heroSection",
        ctrl.showHero
    );

    toggle(
        "discountSection",
        ctrl.showDiscount
    );

    toggle(
        "quickAccessBar",
        ctrl.showQuickAccess
    );

    toggle(
        "socialSection",
        ctrl.showSocialLinks
    );

    toggle(
        "aboutSection",
        ctrl.showAbout
    );

    toggle(
        "locationSection",
        ctrl.showLocation
    );

    toggle(
        "servicesSection",
        ctrl.showServices
    );

    toggle(
        "gallerySection",
        ctrl.showGallery
    );

    toggle(
        "cardQRContainer",
        ctrl.showQR
    );

    toggle(
        "reviewsSection",
        ctrl.showReviews
    );

    toggle(
        "quoteFormSection",
        ctrl.showQuoteForm
    );

    toggle(
        "faqSection",
        ctrl.showFAQ
    );

    toggle(
        "footerSection",
        ctrl.showFooter
    );

    toggle(
        "mobileBottomNav",
        ctrl.showBottomNav
    );


    /* Top controls */

    toggle(
        "themeToggle",
        ctrl.showThemeToggle
    );

    toggle(
        "languageSwitcher",
        ctrl.showLanguageSwitcher
    );

    toggle(
        "btnResetAll",
        ctrl.showResetBtn !== false
    );


    /* Hero */

    toggle(
        "businessLogo",
        ctrl.showLogo
    );

    toggle(
        "businessTagline",
        ctrl.showTagline
    );

    toggle(
        "businessLocation",
        ctrl.showHeroLocation
    );

    toggle(
        "callBtn",
        ctrl.showHeroCallBtn
    );

    toggle(
        "whatsappBtn",
        ctrl.showHeroWhatsappBtn
    );


    /* Quick Access */

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


    /* Social */

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


    /* Quote */

    toggle(
        "sendWhatsappBtn",
        ctrl.showQuoteWhatsappBtn
    );

    toggle(
        "downloadPdfBtn",
        ctrl.showQuotePdfBtn
    );


    /* Business links */

    if (getEl("btnFacebook"))
        getEl("btnFacebook").href =
            biz.facebook || "#";


    if (getEl("btnInstagram"))
        getEl("btnInstagram").href =
            biz.instagram || "#";


    if (getEl("btnYoutube"))
        getEl("btnYoutube").href =
            biz.youtube || "#";


    if (getEl("btnQuickEmail"))
        getEl("btnQuickEmail").href =
            `mailto:${biz.email || ""}`;

}


/* =========================================================
   THEME BUTTON
========================================================= */

function updateThemeButtonText() {

    const isLight =
        document.documentElement
            .classList
            .contains("saved-light-theme");


    const themeIcon =
        getEl("themeIcon");

    const themeText =
        getEl("themeText");


    if (!themeIcon || !themeText)
        return;


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

    currentLang = lang;

    localStorage.setItem(
        "sandeepLang",
        currentLang
    );


    const cfg =
        window.MASTER_CONFIG;

    if (!cfg) return;


    const biz =
        cfg.business || {};

    const ctrl =
        cfg.controls || {};


    document
        .querySelectorAll(".language-btn")
        .forEach(function (button) {

            button.classList.toggle(
                "active",
                button.getAttribute("data-lang") === lang
            );

        });


    const isHi =
        lang === "hi";


    function setText(id, value) {

        const el = getEl(id);

        if (el)
            el.innerText = value;

    }


    /* Hero */

    setText(
        "businessTitle",
        biz.name || ""
    );


    setText(
        "businessTagline",
        isHi
            ? biz.tagline_hi
            : biz.tagline_en
    );


    setText(
        "businessLocation",
        isHi
            ? `📍 ${biz.location_hi}`
            : `📍 ${biz.location_en}`
    );


    setText(
        "callBtnText",
        isHi
            ? "📞 अभी कॉल करें"
            : "📞 Call Now"
    );


    setText(
        "whatsappBtnText",
        isHi
            ? "💬 व्हाट्सएप करें"
            : "💬 WhatsApp"
    );


    /* Discount */

    setText(
        "discountBadge",
        isHi
            ? "🔥 विशेष ऑफर"
            : "🔥 SPECIAL OFFER"
    );


    setText(
        "discountTitle",
        isHi
            ? "विशेष छूट"
            : "Special Discount"
    );


    setText(
        "discountPercentage",
        ctrl.discountPercent || 10
    );


    setText(
        "discountMessage",
        isHi

            ? `इलेक्ट्रिकल सेवाओं पर ${ctrl.discountPercent}% की भारी छूट पाएं`

            : `Get ${ctrl.discountPercent}% OFF on selected electrical services.`
    );


    setText(
        "discountValidity",
        isHi
            ? "⏳ सीमित समय के लिए"
            : "⏳ Limited Time Offer"
    );


    setText(
        "discountBtnText",
        isHi
            ? "⚡ छूट प्राप्त करें"
            : "⚡ Get Discount"
    );


    /* Quick Access */

    setText(
        "quickHeading",
        isHi
            ? "त्वरित सेवाएँ"
            : "Quick Access"
    );


    setText(
        "labelCall",
        isHi ? "कॉल करें" : "Call"
    );

    setText(
        "labelWhatsapp",
        isHi ? "व्हाट्सएप" : "WhatsApp"
    );

    setText(
        "labelEmail",
        isHi ? "ईमेल" : "Email"
    );

    setText(
        "labelWeb",
        isHi ? "वेबसाइट" : "Website"
    );

    setText(
        "labelMap",
        isHi ? "गूगल मैप्स" : "Google Maps"
    );

    setText(
        "labelSaveContact",
        isHi ? "नंबर सेव करें" : "Save Contact"
    );

    setText(
        "labelShare",
        isHi ? "शेयर करें" : "Share"
    );

    setText(
        "labelWork",
        isHi ? "हमारे कार्य" : "Our Work"
    );

    setText(
        "labelCatalogue",
        isHi ? "सामग्री सूची" : "Catalogue"
    );


    setText(
        "socialHeading",
        isHi
            ? "हमसे सोशल मीडिया पर जुड़ें"
            : "Connect on Social Media"
    );


    /* About */

    setText(
        "aboutHeading",
        isHi
            ? "हमारे बारे में"
            : "About Us"
    );


    const aboutText =
        getEl("aboutText");

    if (aboutText) {

        aboutText.innerHTML =

            isHi

                ? `<strong>${biz.name}</strong> में आपका स्वागत है। हम लखनऊ में पेशेवर इलेक्ट्रीशियन सेवाएँ प्रदान करते हैं, जिसमें हाउस वायरिंग, फॉल्स सीलिंग वायरिंग, एमसीबी और डीबी इंस्टॉलेशन, पंखा और लाइट फिटिंग, इन्वर्टर वायरिंग, फॉल्ट रिपेयर और मेंटेनेंस शामिल हैं।`

                : `Welcome to <strong>${biz.name}</strong>. We provide professional electrical services across Lucknow, including house wiring, false ceiling wiring, MCB & DB installation, fan and light fitting, inverter wiring, fault repair, and general maintenance.`;

    }


    /* Location */

    setText(
        "locHeading",
        isHi
            ? "📍 सेवा क्षेत्र एवं लोकेशन"
            : "📍 Service Location"
    );


    setText(
        "locDesc",
        isHi
            ? "पूरे लखनऊ और आसपास के क्षेत्रों में ऑन-साइट इलेक्ट्रीशियन सेवा उपलब्ध।"
            : "Providing on-site electrical services across Lucknow."
    );


    setText(
        "distBtnText",
        isHi
            ? "हमारे यहाँ से अपनी दूरी चेक करें"
            : "Check Your Distance from Us"
    );


    setText(
        "mapBtnText",
        isHi
            ? "गूगल मैप्स पर रास्ता देखें"
            : "Get Directions on Google Maps"
    );


    /* Services */

    setText(
        "servicesHeading",
        isHi
            ? "हमारी सेवाएँ"
            : "Our Services"
    );


    setText(
        "galleryHeading",
        isHi
            ? "हमारे द्वारा किए गए कार्य"
            : "Our Work"
    );


    setText(
        "qrHeading",
        isHi
            ? "क्यूआर कोड स्कैन करें"
            : "Scan QR Code"
    );


    setText(
        "qrDesc",
        isHi
            ? "हमारा डिजिटल कार्ड सेव करने या भुगतान के लिए यह क्यूआर कोड स्कैन करें।"
            : "Scan this QR code to quickly save our digital card or pay."
    );


    setText(
        "qrBtnText",
        isHi
            ? "📥 क्यूआर कोड डाउनलोड करें"
            : "📥 Download QR Code"
    );


    setText(
        "reviewsHeading",
        isHi
            ? "ग्राहकों की राय"
            : "Customer Reviews"
    );


    /* Quote */

    setText(
        "quoteHeading",
        isHi
            ? "कोटेशन व अनुमानित खर्च"
            : "Estimate & Quotation"
    );


    if (getEl("customerName"))
        getEl("customerName").placeholder =
            isHi
                ? "आपका नाम *"
                : "Your Name *";


    if (getEl("customerPhone"))
        getEl("customerPhone").placeholder =
            isHi
                ? "मोबाइल नंबर *"
                : "Mobile Number *";


    if (getEl("customerLocation"))
        getEl("customerLocation").placeholder =
            isHi
                ? "आपका पता / एरिया *"
                : "Your Address / Area *";


    if (getEl("customerMessage"))
        getEl("customerMessage").placeholder =
            isHi
                ? "कार्य का अतिरिक्त विवरण (वैकल्पिक)..."
                : "Additional work details (optional)...";


    /* Summary */

    const count =
        Object.values(selectedItemsMap)
            .reduce(
                (acc, item) =>
                    acc + item.qty,
                0
            );


    const summaryHeader =
        getEl("summaryHeader");


    if (summaryHeader) {

        summaryHeader.innerHTML =

            isHi

                ? `चुनी गई सेवाएँ (<span id="selectedCount">${count}</span>)`

                : `Selected Services (<span id="selectedCount">${count}</span>)`;

    }


    setText(
        "lblSubtotal",
        isHi ? "कुल राशि:" : "Subtotal:"
    );


    setText(
        "lblGrandTotal",
        isHi ? "अंतिम राशि:" : "Grand Total:"
    );


    setText(
        "discountLabel",
        isHi
            ? `विशेष छूट (${ctrl.discountPercent}% OFF):`
            : `Special Discount (${ctrl.discountPercent}% OFF):`
    );


    setText(
        "sendWhatsappBtn",
        isHi
            ? "💬 व्हाट्सएप पर भेजें"
            : "💬 Send on WhatsApp"
    );


    setText(
        "downloadPdfBtn",
        isHi
            ? "📄 पीडीएफ एस्टीमेट डाउनलोड करें"
            : "📄 Download PDF Estimate"
    );


    /* FAQ */

    setText(
        "faqHeading",
        isHi
            ? "अक्सर पूछे जाने वाले सवाल"
            : "Frequently Asked Questions"
    );


    /* Bottom Nav */

    setText(
        "navHome",
        isHi ? "होम" : "Home"
    );

    setText(
        "navServices",
        isHi ? "सेवाएं" : "Services"
    );

    setText(
        "navWork",
        isHi ? "कार्य" : "Work"
    );

    setText(
        "navQuote",
        isHi ? "कोट" : "Quote"
    );

    setText(
        "navCall",
        isHi ? "कॉल" : "Call"
    );


    setText(
        "resetBtnText",
        isHi ? "रीसेट" : "Reset"
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
        getEl("serviceContainer");

    const services =
        window.MASTER_CONFIG?.services;


    if (!container || !services)
        return;


    container.innerHTML = "";


    services.forEach(function (service, sIdx) {

        if (service.show === false)
            return;


        const title =
            currentLang === "hi"
                ? service.title_hi
                : service.title_en;


        let activeCount = 0;


        (service.subServices || [])
            .forEach(function (_, subIdx) {

                const item =
                    selectedItemsMap[
                        `${sIdx}_${subIdx}`
                    ];


                if (item?.qty > 0) {

                    activeCount += item.qty;

                }

            });


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
                data-service-index="${sIdx}"
            >

                <div class="service-title-wrap">

                    <span class="service-icon">
                        ${service.icon || ""}
                    </span>

                    <h3 class="service-title">
                        ${title}
                    </h3>

                </div>

                <span class="toggle-arrow">
                    ➔
                </span>

            </div>

        `;


        const header =
            card.querySelector(
                ".service-header"
            );


        if (header) {

            header.addEventListener(
                "click",
                function () {

                    openServiceModal(sIdx);

                }
            );

        }


        container.appendChild(card);

    });

}


/* =========================================================
   SERVICE MODAL
========================================================= */

function openServiceModal(sIdx) {

    const services =
        window.MASTER_CONFIG?.services;


    if (!services || !services[sIdx])
        return;


    const service =
        services[sIdx];


    const title =
        currentLang === "hi"
            ? service.title_hi
            : service.title_en;


    const desc =
        currentLang === "hi"
            ? service.desc_hi
            : service.desc_en;


    if (getEl("modalServiceIcon"))
        getEl("modalServiceIcon").innerText =
            service.icon || "";


    if (getEl("modalServiceTitle"))
        getEl("modalServiceTitle").innerText =
            title;


    if (getEl("modalServiceDesc"))
        getEl("modalServiceDesc").innerText =
            desc;


    const itemsContainer =
        getEl("modalItemsContainer");


    if (!itemsContainer)
        return;


    itemsContainer.innerHTML = "";


    (service.subServices || [])
        .forEach(function (sub, subIdx) {

            if (sub.show === false)
                return;


            const key =
                `${sIdx}_${subIdx}`;


            const qty =
                selectedItemsMap[key]?.qty || 0;


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
                    qty > 0
                        ? "has-qty"
                        : ""
                }`;


            row.id =
                `modal_row_${key}`;


            row.innerHTML = `

                <div class="sub-service-info">

                    <span class="sub-name">
                        ${name}
                    </span>

                    <span class="sub-rate">
                        ${rate}
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


            const minusBtn =
                row.querySelector(
                    '[data-action="minus"]'
                );


            const plusBtn =
                row.querySelector(
                    '[data-action="plus"]'
                );


            if (minusBtn) {

                minusBtn.addEventListener(
                    "click",
                    function () {

                        changeQtyModal(
                            sIdx,
                            subIdx,
                            -1
                        );

                    }
                );

            }


            if (plusBtn) {

                plusBtn.addEventListener(
                    "click",
                    function () {

                        changeQtyModal(
                            sIdx,
                            subIdx,
                            1
                        );

                    }
                );

            }


            itemsContainer.appendChild(row);

        });


    const overlay =
        getEl("serviceModalOverlay");


    if (!overlay)
        return;


    overlay.style.display = "flex";


    requestAnimationFrame(function () {

        overlay.classList.add("active");

    });


    document.body.classList.add(
        "modal-open"
    );


    document.body.style.overflow =
        "hidden";


    pushOverlayHistory(
        "serviceModal"
    );

}


/* =========================================================
   CHANGE MODAL QUANTITY
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
        selectedItemsMap[key]?.qty || 0;


    const qtyEl =
        getEl(`modal_qty_${key}`);


    const rowEl =
        getEl(`modal_row_${key}`);


    if (qtyEl)
        qtyEl.innerText =
            currentQty;


    if (rowEl)
        rowEl.classList.toggle(
            "has-qty",
            currentQty > 0
        );

}


/* =========================================================
   CLOSE SERVICE MODAL
========================================================= */

function closeServiceModal(
    fromHistory = false
) {

    const overlay =
        getEl("serviceModalOverlay");


    if (!overlay)
        return;


    const isOpen =
        overlay.classList.contains("active") ||
        overlay.style.display === "flex";


    if (!isOpen)
        return;


    overlay.classList.remove(
        "active"
    );


    setTimeout(function () {

        overlay.style.display =
            "none";

    }, 250);


    document.body.classList.remove(
        "modal-open"
    );


    document.body.style.overflow =
        "";


    if (
        !fromHistory &&
        currentOverlayState === "serviceModal"
    ) {

        currentOverlayState = null;

        history.back();

    }

}


/* =========================================================
   LIGHTBOX
========================================================= */

function openLightboxModal(src) {

    const box =
        getEl("lightbox");

    const img =
        getEl("lightboxImage");


    if (!box || !img)
        return;


    img.src = src;


    box.style.display =
        "flex";


    requestAnimationFrame(function () {

        box.classList.add("active");

    });


    pushOverlayHistory(
        "lightbox"
    );

}


/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightboxModal(
    fromHistory = false
) {

    const box =
        getEl("lightbox");


    if (!box)
        return;


    const isOpen =
        box.style.display === "flex";


    if (!isOpen)
        return;


    box.classList.remove(
        "active"
    );


    setTimeout(function () {

        box.style.display =
            "none";

    }, 200);


    if (
        !fromHistory &&
        currentOverlayState === "lightbox"
    ) {

        currentOverlayState = null;

        history.back();

    }

}


/* =========================================================
   CENTRAL HISTORY
========================================================= */

function pushOverlayHistory(type) {

    currentOverlayState = type;


    history.pushState(
        {
            project21Overlay: type
        },
        "",
        window.location.href
    );

}


/* =========================================================
   EXIT TOAST
========================================================= */

function showExitToast(msg) {

    let toast =
        getEl("appExitToast");


    if (!toast) {

        toast =
            document.createElement("div");


        toast.id =
            "appExitToast";


        Object.assign(
            toast.style,
            {

                position: "fixed",

                bottom: "85px",

                left: "50%",

                transform:
                    "translateX(-50%)",

                background:
                    "rgba(5, 8, 22, 0.95)",

                color:
                    "#f5c542",

                padding:
                    "10px 22px",

                borderRadius:
                    "30px",

                fontSize:
                    "13px",

                fontWeight:
                    "600",

                zIndex:
                    "9999999",

                boxShadow:
                    "0 8px 30px rgba(0,0,0,0.7)",

                border:
                    "1px solid rgba(245,197,66,0.5)",

                transition:
                    "opacity 0.3s ease",

                pointerEvents:
                    "none"

            }
        );


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
        setTimeout(function () {

            toast.style.opacity =
                "0";


            setTimeout(function () {

                toast.style.display =
                    "none";

            }, 300);

        }, 2000);

}


/* =========================================================
   QUANTITY ENGINE
========================================================= */

function changeQty(
    sIdx,
    subIdx,
    change
) {

    const services =
        window.MASTER_CONFIG?.services;


    if (
        !services ||
        !services[sIdx] ||
        !services[sIdx].subServices[subIdx]
    )
        return;


    const key =
        `${sIdx}_${subIdx}`;


    const sub =
        services[sIdx]
            .subServices[subIdx];


    if (!selectedItemsMap[key]) {

        selectedItemsMap[key] = {

            name_hi:
                sub.name_hi,

            name_en:
                sub.name_en,

            price:
                Number(sub.price) || 0,

            qty:
                0

        };

    }


    selectedItemsMap[key].qty +=
        change;


    if (
        selectedItemsMap[key].qty <= 0
    ) {

        delete selectedItemsMap[key];

    }


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
   DIRECT QUANTITY
========================================================= */

function changeQtyDirect(
    key,
    change
) {

    if (!selectedItemsMap[key])
        return;


    const parts =
        key.split("_");


    const sIdx =
        parseInt(parts[0], 10);


    const subIdx =
        parseInt(parts[1], 10);


    changeQty(
        sIdx,
        subIdx,
        change
    );

}


/* =========================================================
   REMOVE ITEM
========================================================= */

function removeItemDirect(key) {

    if (!selectedItemsMap[key])
        return;


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
        getEl("selectedCount");

    const listEl =
        getEl("selectedServicesList");

    const subtotalEl =
        getEl("calcSubtotal");

    const discRow =
        getEl("calcDiscountRow");

    const discEl =
        getEl("calcDiscount");

    const totalEl =
        getEl("calcGrandTotal");


    const ctrl =
        window.MASTER_CONFIG?.controls || {};


    const count =
        entries.reduce(
            function (acc, [, item]) {

                return acc +
                    Number(item.qty || 0);

            },
            0
        );


    if (countEl)
        countEl.innerText =
            count;


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


        if (subtotalEl)
            subtotalEl.innerText =
                "₹0";


        if (discRow)
            discRow.style.display =
                "none";


        if (totalEl)
            totalEl.innerText =
                "₹0";


        return;

    }


    if (listEl) {

        listEl.innerHTML =
            entries.map(
                function ([key, item]) {

                    const name =
                        currentLang === "hi"
                            ? item.name_hi
                            : item.name_en;


                    const price =
                        Number(item.price) || 0;


                    const qty =
                        Number(item.qty) || 0;


                    return `

                        <div class="summary-item-row">

                            <div class="summary-item-left">

                                <span class="summary-item-name">
                                    • ${name}
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
                                >
                                    +
                                </button>


                                <button
                                    type="button"
                                    class="summary-btn remove"
                                    onclick="removeItemDirect('${key}')"
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
            function (acc, [, item]) {

                return acc +
                    (
                        (Number(item.price) || 0) *
                        (Number(item.qty) || 0)
                    );

            },
            0
        );


    const isDiscountActive =
        ctrl.showDiscount &&
        Number(ctrl.discountPercent) > 0;


    const discount =
        isDiscountActive

            ? Math.round(
                subtotal *
                (
                    Number(ctrl.discountPercent) /
                    100
                )
            )

            : 0;


    const total =
        subtotal -
        discount;


    if (subtotalEl)
        subtotalEl.innerText =
            `₹${subtotal}`;


    if (discRow)
        discRow.style.display =
            isDiscountActive
                ? "flex"
                : "none";


    if (discEl)
        discEl.innerText =
            `-₹${discount}`;


    if (totalEl)
        totalEl.innerText =
            `₹${total}`;

}


/* =========================================================
   GALLERY
========================================================= */

function renderGallery() {

    const container =
        getEl("galleryContainer");


    const gallery =
        window.MASTER_CONFIG?.gallery;


    if (!container || !gallery)
        return;


    container.innerHTML = "";


    gallery
        .filter(
            g => g.show !== false
        )
        .forEach(function (g) {

            const title =
                currentLang === "hi"
                    ? g.title_hi
                    : g.title_en;


            const item =
                document.createElement("div");


            item.className =
                "gallery-item";


            item.innerHTML = `

                <img
                    src="${g.image}"
                    alt="${title || "Electrical Work"}"
                >

                <div class="gallery-title">
                    ${title || ""}
                </div>

            `;


            const image =
                item.querySelector("img");


            if (image) {

                image.addEventListener(
                    "error",
                    function () {

                        item.style.display =
                            "none";

                    }
                );

            }


            item.addEventListener(
                "click",
                function () {

                    openLightboxModal(
                        g.image
                    );

                }
            );


            container.appendChild(
                item
            );

        });

}


/* =========================================================
   REVIEWS
========================================================= */

function renderReviews() {

    const container =
        getEl("reviewContainer");


    const reviews =
        window.MASTER_CONFIG?.reviews;


    if (!container || !reviews)
        return;


    container.innerHTML =
        reviews
            .filter(
                r => r.show !== false
            )
            .map(
                function (r) {

                    const rating =
                        Math.min(
                            5,
                            Math.max(
                                0,
                                Number(r.rating) || 5
                            )
                        );


                    return `

                        <div
                            class="card review-card"
                            style="padding:12px; margin-bottom:8px;"
                        >

                            <div
                                style="color:#f5c542;"
                            >
                                ${"★".repeat(rating)}
                            </div>


                            <p
                                style="margin:4px 0; font-size:0.85rem;"
                            >
                                "${
                                    currentLang === "hi"
                                        ? r.text_hi
                                        : r.text_en
                                }"
                            </p>


                            <small
                                style="color:#aab4c8;"
                            >
                                — ${r.name}
                            </small>

                        </div>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   FAQ
========================================================= */

function renderFAQ() {

    const container =
        getEl("faqContainer");


    const faq =
        window.MASTER_CONFIG?.faq;


    if (!container || !faq)
        return;


    container.innerHTML = "";


    faq
        .filter(
            f => f.show !== false
        )
        .forEach(function (f) {

            const item =
                document.createElement("div");


            item.className =
                "faq-item";


            item.innerHTML = `

                <div class="faq-question">

                    <span>
                        ${
                            currentLang === "hi"
                                ? f.q_hi
                                : f.q_en
                        }
                    </span>

                    <span class="faq-icon">
                        +
                    </span>

                </div>


                <div class="faq-answer">

                    ${
                        currentLang === "hi"
                            ? f.a_hi
                            : f.a_en
                    }

                </div>

            `;


            item.addEventListener(
                "click",
                function () {

                    item.classList.toggle(
                        "active"
                    );

                }
            );


            container.appendChild(
                item
            );

        });

}


/* =========================================================
   QUICK LAYOUT
========================================================= */

function applyQuickLayout(
    layout,
    save = true
) {

    const container =
        getEl("quickGridContainer");


    if (container) {

        container.className =
            `grid layout-${layout}`;

    }


    document
        .querySelectorAll(
            "#quickLayoutBar .layout-btn"
        )
        .forEach(function (button) {

            button.classList.toggle(
                "active",
                button.getAttribute("data-ql") ===
                layout
            );

        });


    if (save) {

        localStorage.setItem(
            "sandeepQuickLayout",
            layout
        );

    }

}


/* =========================================================
   SERVICE LAYOUT
========================================================= */

function applyServiceLayout(
    layout,
    save = true
) {

    const container =
        getEl("serviceContainer");


    if (container) {

        container.className =
            `service-grid layout-${layout}`;

    }


    document
        .querySelectorAll(
            "#servicesLayoutBar .layout-btn"
        )
        .forEach(function (button) {

            button.classList.toggle(
                "active",
                button.getAttribute("data-sl") ===
                layout
            );

        });


    if (save) {

        localStorage.setItem(
            "sandeepServiceLayout",
            layout
        );

    }

}


/* =========================================================
   SAVE CONTACT
========================================================= */

function saveContactVCard() {

    const biz =
        window.MASTER_CONFIG?.business;


    if (!biz)
        return;


    const vCardData =

`BEGIN:VCARD
VERSION:3.0
FN:${biz.name} (${biz.owner})
ORG:${biz.name}
TEL;TYPE=CELL,VOICE:${biz.phone}
EMAIL:${biz.email}
URL:${biz.website}
ADR;TYPE=WORK:;;${biz.location_en};;;;
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
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement("a");


    link.href =
        url;


    link.download =
        `${biz.name.replace(
            /\s+/g,
            "_"
        )}.vcf`;


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    setTimeout(function () {

        URL.revokeObjectURL(
            url
        );

    }, 1000);

}


/* =========================================================
   WHATSAPP QUOTE
========================================================= */

function sendWhatsappQuote() {

    const name =
        getEl("customerName")
            ?.value
            .trim();


    const phone =
        getEl("customerPhone")
            ?.value
            .trim();


    const location =
        getEl("customerLocation")
            ?.value
            .trim();


    const note =
        getEl("customerMessage")
            ?.value
            .trim();


    const items =
        Object.values(
            selectedItemsMap
        );


    const ctrl =
        window.MASTER_CONFIG?.controls || {};


    const biz =
        window.MASTER_CONFIG?.business || {};


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


    if (items.length === 0) {

        alert(
            currentLang === "hi"
                ? "कृपया + बटन दबाकर कम से कम एक सेवा चुनें।"
                : "Please add at least one service."
        );

        return;

    }


    saveCustomerInputs();


    const subtotal =
        items.reduce(
            function (acc, item) {

                return acc +
                    (
                        Number(item.price) *
                        Number(item.qty)
                    );

            },
            0
        );


    const isDiscountActive =
        ctrl.showDiscount &&
        Number(ctrl.discountPercent) > 0;


    const discount =
        isDiscountActive

            ? Math.round(
                subtotal *
                (
                    Number(ctrl.discountPercent) /
                    100
                )
            )

            : 0;


    const total =
        subtotal -
        discount;


    let msg =
        `⚡ *${biz.name} - Estimate Request* ⚡\n\n`;


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
        function (item, index) {

            msg +=

                `${index + 1}. ${
                    currentLang === "hi"
                        ? item.name_hi
                        : item.name_en
                } [Qty: ${item.qty}] - ₹${
                    Number(item.price) *
                    Number(item.qty)
                }\n`;

        }
    );


    msg +=
        `\n💵 *Subtotal:* ₹${subtotal}\n`;


    if (isDiscountActive) {

        msg +=
            `🎁 *Discount (${ctrl.discountPercent}%):* -₹${discount}\n`;

    }


    msg +=
        `✅ *Grand Total:* ₹${total}\n\n`;


    msg +=
        `_Please confirm visit/booking._`;


    const whatsappNumber =
        String(
            biz.whatsapp || ""
        ).replace(
            /\D/g,
            ""
        );


    if (!whatsappNumber) {

        alert(
            "WhatsApp number is not configured."
        );

        return;

    }


    const url =
        `https://wa.me/${whatsappNumber}?text=${
            encodeURIComponent(msg)
        }`;


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

                ? "PDF library loading हो रही है। कृपया 2 सेकंड बाद फिर प्रयास करें।"

                : "PDF library is loading. Please try again in 2 seconds."
        );

        return;

    }


    const name =
        getEl("customerName")
            ?.value
            .trim() ||
        "Customer";


    const phone =
        getEl("customerPhone")
            ?.value
            .trim() ||
        "N/A";


    const location =
        getEl("customerLocation")
            ?.value
            .trim() ||
        "N/A";


    const note =
        getEl("customerMessage")
            ?.value
            .trim() ||
        "N/A";


    const items =
        Object.values(
            selectedItemsMap
        );


    const ctrl =
        window.MASTER_CONFIG?.controls || {};


    const biz =
        window.MASTER_CONFIG?.business || {};


    if (items.length === 0) {

        alert(
            currentLang === "hi"
                ? "कृपया पहले + से कोई सेवा जोड़ें।"
                : "Please add services first."
        );

        return;

    }


    saveCustomerInputs();


    const doc =
        new jsPDF();


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
        biz.name || "Sandeep ElectroFix",
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
        `Phone: ${biz.phone || ""} | Lucknow, UP`,
        14,
        25
    );


    doc.text(
        `Date: ${
            new Date()
                .toLocaleDateString(
                    "en-IN"
                )
        }`,
        160,
        25
    );


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
        `Client: ${name}  |  Phone: ${phone}`,
        14,
        53
    );


    doc.text(
        `Location: ${location}`,
        14,
        59
    );


    if (note !== "N/A") {

        doc.text(
            `Note: ${note}`,
            14,
            65
        );

    }


    const startTableY =
        note !== "N/A"
            ? 71
            : 65;


    const rows =
        items.map(
            function (item, index) {

                return [

                    index + 1,

                    item.name_en,

                    `Rs. ${item.price}`,

                    item.qty,

                    `Rs. ${
                        item.price *
                        item.qty
                    }`

                ];

            }
        );


    const subtotal =
        items.reduce(
            function (acc, item) {

                return acc +
                    (
                        Number(item.price) *
                        Number(item.qty)
                    );

            },
            0
        );


    const isDiscountActive =
        ctrl.showDiscount &&
        Number(ctrl.discountPercent) > 0;


    const discount =
        isDiscountActive

            ? Math.round(
                subtotal *
                (
                    Number(ctrl.discountPercent) /
                    100
                )
            )

            : 0;


    const total =
        subtotal -
        discount;


    if (
        typeof doc.autoTable ===
        "function"
    ) {

        doc.autoTable({

            startY:
                startTableY,

            head:
                [[
                    "#",
                    "Service Item",
                    "Rate",
                    "Qty",
                    "Total Amount"
                ]],

            body:
                rows,

            theme:
                "grid",

            headStyles:
                {
                    fillColor:
                        [5, 8, 22],

                    textColor:
                        [245, 197, 66]
                }

        });

    } else {

        let y =
            startTableY;


        rows.forEach(
            function (row) {

                doc.text(
                    `${row[0]}. ${row[1]} | ${row[2]} | Qty: ${row[3]} | ${row[4]}`,
                    14,
                    y
                );


                y += 6;

            }
        );

    }


    const finalY =
        doc.lastAutoTable
            ? doc.lastAutoTable.finalY + 8
            : startTableY +
              rows.length * 6 +
              8;


    doc.setFontSize(
        9.5
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
            `Discount (${ctrl.discountPercent}%): -Rs. ${discount}`,
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


    doc.save(
        `Estimate_${
            name.replace(
                /\s+/g,
                "_"
            )
        }.pdf`
    );

}


/* =========================================================
   DISTANCE / USER LOCATION
========================================================= */

function getUserLocation() {

    const status =
        getEl("locationStatus");


    if (!navigator.geolocation) {

        if (status)
            status.innerText =
                "Geolocation not supported.";

        return;

    }


    if (status)
        status.innerText =
            "Locating...";


    navigator.geolocation.getCurrentPosition(

        function (pos) {

            const R =
                6371;


            const targetLat =
                26.8467;


            const targetLng =
                80.9462;


            const dLat =
                (
                    pos.coords.latitude -
                    targetLat
                ) *
                (
                    Math.PI / 180
                );


            const dLon =
                (
                    pos.coords.longitude -
                    targetLng
                ) *
                (
                    Math.PI / 180
                );


            const a =

                Math.sin(dLat / 2) *
                Math.sin(dLat / 2)

                +

                Math.cos(
                    targetLat *
                    Math.PI / 180
                )

                *

                Math.cos(
                    pos.coords.latitude *
                    Math.PI / 180
                )

                *

                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);


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

                    `✅ ${
                        currentLang === "hi"
                            ? "आप हमारे केंद्र से लगभग"
                            : "You are approx"
                    } <strong>${dist} km</strong> ${
                        currentLang === "hi"
                            ? "दूर हैं।"
                            : "away from Lucknow center."
                    }`;

            }

        },


        function () {

            if (status)
                status.innerText =
                    "Location permission denied.";

        }

    );

}


/* =========================================================
   SHARE
========================================================= */

async function shareWebsite() {

    const title =
        window.MASTER_CONFIG
            ?.business
            ?.name ||
        "Sandeep ElectroFix";


    try {

        if (navigator.share) {

            await navigator.share({

                title:
                    title,

                url:
                    window.location.href

            });

        } else {

            await navigator.clipboard.writeText(
                window.location.href
            );


            alert(
                currentLang === "hi"
                    ? "लिंक कॉपी हो गया!"
                    : "Link copied!"
            );

        }

    } catch (error) {

        console.log(
            "Share cancelled:",
            error
        );

    }

}


/* =========================================================
   PWA SHORTCUT ACTION
========================================================= */

function handlePWAShortcutAction() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const action =
        params.get("pwaAction");


    if (!action)
        return;


    const ctrl =
        window.MASTER_CONFIG
            ?.controls
            ?.pwaShortcuts || {};


    const biz =
        window.MASTER_CONFIG
            ?.business || {};


    if (ctrl.enabled === false)
        return;


    if (action === "call") {

        if (ctrl.call === false)
            return;


        const phone =
            biz.phone ||
            "+919026036445";


        setTimeout(
            function () {

                window.location.href =
                    `tel:${phone}`;

            },
            300
        );


        return;

    }


    if (action === "whatsapp") {

        if (ctrl.whatsapp === false)
            return;


        const number =
            biz.whatsapp ||
            "919026036445";


        const message =

            currentLang === "hi"

                ? `नमस्ते ${
                    biz.name ||
                    "Sandeep ElectroFix"
                }, मुझे इलेक्ट्रिकल सर्विस की जानकारी चाहिए।`

                : `Hello ${
                    biz.name ||
                    "Sandeep ElectroFix"
                }, I need information about your electrical services.`;


        setTimeout(
            function () {

                window.location.href =

                    `https://wa.me/${number}?text=${
                        encodeURIComponent(
                            message
                        )
                    }`;

            },
            300
        );


        return;

    }


    if (action === "services") {

        if (ctrl.services === false)
            return;


        setTimeout(
            function () {

                const section =
                    getEl(
                        "servicesSection"
                    );


                if (section) {

                    section.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

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
   MOBILE NAVBAR
========================================================= */

function initProject21Navbar() {

    const menuBtn =
        getEl("navbarMenuBtn");

    const sideMenu =
        getEl("sideMenu");

    const overlay =
        getEl("navbarOverlay");

    const closeBtn =
        getEl("sideMenuClose");


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


    let menuHistoryAdded =
        false;


    /* ---------------------------------------------
       OPEN
    --------------------------------------------- */

    function openMenu() {

        if (menuIsOpen)
            return;


        menuIsOpen =
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
                    project21Menu:
                        true
                },

                "",

                window.location.href

            );


            menuHistoryAdded =
                true;

        }

    }


    /* ---------------------------------------------
       CLOSE
    --------------------------------------------- */

    function closeMenu(
        fromHistory = false
    ) {

        if (!menuIsOpen)
            return;


        menuIsOpen =
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
            !fromHistory &&
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


    /* ---------------------------------------------
       MENU BUTTON
    --------------------------------------------- */

    menuBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            if (menuIsOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        }
    );


    /* ---------------------------------------------
       CLOSE BUTTON
    --------------------------------------------- */

    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closeMenu();

            }
        );

    }


    /* ---------------------------------------------
       OVERLAY
    --------------------------------------------- */

    overlay.addEventListener(
        "click",
        function () {

            closeMenu();

        }
    );


    /* ---------------------------------------------
       MENU LINKS
    --------------------------------------------- */

    sideMenu
        .querySelectorAll(
            "a, button"
        )
        .forEach(
            function (item) {

                if (item === closeBtn)
                    return;


                /*
                 * Install / Theme / Reset
                 * have their own handlers.
                 */

                if (
                    item.id ===
                    "menuInstallApp" ||

                    item.id ===
                    "menuThemeToggle" ||

                    item.id ===
                    "menuResetApp"
                ) {

                    return;

                }


                item.addEventListener(
                    "click",
                    function () {

                        setTimeout(
                            function () {

                                closeMenu();

                            },
                            80
                        );

                    }
                );

            }
        );


    /* ---------------------------------------------
       INSTALL
    --------------------------------------------- */

    const installBtn =
        getEl("menuInstallApp");


    if (installBtn) {

        installBtn.addEventListener(
            "click",
            async function (event) {

                event.preventDefault();

                closeMenu();


                if (
                    typeof window.installApp ===
                    "function"
                ) {

                    try {

                        await window.installApp();

                    } catch (error) {

                        console.log(
                            error
                        );

                    }

                    return;

                }


                if (
                    window.deferredPrompt
                ) {

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

                    currentLang === "hi"

                        ? "Install option अभी उपलब्ध नहीं है।\n\nअगर App पहले से installed है, तो यह option काम नहीं करेगा।"

                        : "Install option is not currently available.\n\nIf the app is already installed, this option may not appear."

                );

            }
        );

    }


    /* ---------------------------------------------
       THEME
    --------------------------------------------- */

    const menuThemeBtn =
        getEl("menuThemeToggle");


    const originalThemeBtn =
        getEl("themeToggle");


    if (menuThemeBtn) {

        menuThemeBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closeMenu();


                if (originalThemeBtn) {

                    originalThemeBtn.click();

                } else if (
                    typeof window.toggleTheme ===
                    "function"
                ) {

                    window.toggleTheme();

                }

            }
        );

    }


    /* ---------------------------------------------
       RESET
    --------------------------------------------- */

    const resetBtn =
        getEl("menuResetApp");


    if (resetBtn) {

        resetBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closeMenu();


                setTimeout(
                    function () {

                        const firstConfirm =
                            confirm(

                                currentLang === "hi"

                                    ? "⚠️ Reset App?\n\nक्या आप App को Default Settings पर Reset करना चाहते हैं?"

                                    : "⚠️ Reset App?\n\nDo you want to reset the App to default settings?"

                            );


                        if (!firstConfirm)
                            return;


                        /*
                         * IMPORTANT:
                         * केवल ONE confirmation.
                         */

                        if (
                            typeof window.resetAllToDefault ===
                            "function"
                        ) {

                            window.resetAllToDefault(
                                true
                            );

                        } else {

                            localStorage.clear();

                            sessionStorage.clear();

                            location.reload();

                        }

                    },
                    150
                );

            }
        );

    }


    /* ---------------------------------------------
       EXPOSE CLOSE
    --------------------------------------------- */

    window.closeProject21Menu =
        function () {

            closeMenu();

        };


    /* ---------------------------------------------
       GLOBAL ESC
    --------------------------------------------- */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                menuIsOpen
            ) {

                closeMenu();

            }

        }
    );


    console.log(
        "✅ Project 2.1 Navbar Ready"
    );

}


/* =========================================================
   CENTRAL POPSTATE
   IMPORTANT:
   केवल एक popstate handler
========================================================= */

window.addEventListener(
    "popstate",
    function () {

        const lightbox =
            getEl("lightbox");


        const modal =
            getEl("serviceModalOverlay");


        /* ---------------------------------------------
           1. Navbar
           --------------------------------------------- */

        if (
            window.closeProject21Menu &&
            document.body.classList.contains(
                "menu-open"
            )
        ) {

            window.closeProject21Menu();

            return;

        }


        /* ---------------------------------------------
           2. Lightbox
           --------------------------------------------- */

        if (
            lightbox &&
            lightbox.style.display === "flex"
        ) {

            currentOverlayState =
                null;

            closeLightboxModal(
                true
            );

            return;

        }


        /* ---------------------------------------------
           3. Service Modal
           --------------------------------------------- */

        if (
            modal &&
            (
                modal.classList.contains(
                    "active"
                ) ||
                modal.style.display ===
                    "flex"
            )
        ) {

            currentOverlayState =
                null;

            closeServiceModal(
                true
            );

            return;

        }


        /* ---------------------------------------------
           4. Normal App Back
           --------------------------------------------- */

        const now =
            Date.now();


        if (
            now -
            lastBackPressTime <
            2000
        ) {

            /*
             * Allow browser/PWA to exit naturally.
             */

            return;

        }


        lastBackPressTime =
            now;


        history.pushState(
            {
                page:
                    "app"
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
   THEME INITIALIZATION
========================================================= */

function initializeTheme() {

    const savedTheme =
        localStorage.getItem(
            "sandeepTheme"
        );


    if (
        savedTheme === "light"
    ) {

        document.documentElement
            .classList
            .add(
                "saved-light-theme"
            );

    } else {

        document.documentElement
            .classList
            .remove(
                "saved-light-theme"
            );

    }


    const themeToggle =
        getEl("themeToggle");


    if (
        themeToggle &&
        !themeToggle.dataset.bound
    ) {

        themeToggle.dataset.bound =
            "true";


        themeToggle.addEventListener(
            "click",
            function () {

                document.documentElement
                    .classList
                    .toggle(
                        "saved-light-theme"
                    );


                const isLight =
                    document.documentElement
                        .classList
                        .contains(
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
   LAYOUT BUTTONS
========================================================= */

function initializeLayoutButtons() {

    document
        .querySelectorAll(
            "#quickLayoutBar .layout-btn"
        )
        .forEach(
            function (button) {

                if (button.dataset.bound)
                    return;


                button.dataset.bound =
                    "true";


                button.addEventListener(
                    "click",
                    function () {

                        const layout =
                            button.getAttribute(
                                "data-ql"
                            );


                        if (layout)
                            applyQuickLayout(
                                layout
                            );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            "#servicesLayoutBar .layout-btn"
        )
        .forEach(
            function (button) {

                if (button.dataset.bound)
                    return;


                button.dataset.bound =
                    "true";


                button.addEventListener(
                    "click",
                    function () {

                        const layout =
                            button.getAttribute(
                                "data-sl"
                            );


                        if (layout)
                            applyServiceLayout(
                                layout
                            );

                    }
                );

            }
        );

}


/* =========================================================
   CUSTOMER INPUT AUTO SAVE
========================================================= */

function initializeCustomerAutoSave() {

    [
        "customerName",
        "customerPhone",
        "customerLocation",
        "customerMessage"
    ]
        .forEach(
            function (id) {

                const input =
                    getEl(id);


                if (!input)
                    return;


                if (input.dataset.autosave)
                    return;


                input.dataset.autosave =
                    "true";


                input.addEventListener(
                    "input",
                    saveCustomerInputs
                );

            }
        );

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
            function (button) {

                if (button.dataset.bound)
                    return;


                button.dataset.bound =
                    "true";


                button.addEventListener(
                    "click",
                    function () {

                        const lang =
                            button.getAttribute(
                                "data-lang"
                            );


                        if (
                            lang === "hi" ||
                            lang === "en"
                        ) {

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
   OPTIONAL RESET BUTTON
========================================================= */

function initializeResetButton() {

    const resetBtn =
        getEl("btnResetAll");


    if (
        !resetBtn ||
        resetBtn.dataset.bound
    )
        return;


    resetBtn.dataset.bound =
        "true";


    resetBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            resetAllToDefault();

        }
    );

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
         * Base history state
         *
         * IMPORTANT:
         * केवल एक initial app state.
         */

        if (
            !history.state ||
            !history.state.project21Base
        ) {

            history.replaceState(

                {
                    project21Base:
                        true
                },

                "",

                window.location.href

            );

        }


        /* Theme */

        initializeTheme();


        /* Layout */

        const qLayout =
            localStorage.getItem(
                "sandeepQuickLayout"
            ) ||
            "grid-2";


        applyQuickLayout(
            qLayout,
            false
        );


        const sLayout =
            localStorage.getItem(
                "sandeepServiceLayout"
            ) ||
            "list";


        applyServiceLayout(
            sLayout,
            false
        );


        /* Customer */

        restoreCustomerInputs();

        initializeCustomerAutoSave();


        /* Language */

        initializeLanguageButtons();

        setLanguage(
            currentLang
        );


        /* Layout buttons */

        initializeLayoutButtons();


        /* Reset */

        initializeResetButton();


        /* Navbar */

        initProject21Navbar();


        /* PWA */

        handlePWAShortcutAction();


        /* Prevent horizontal overflow */

        document.documentElement.style.overflowX =
            "hidden";


        console.log(
            "⚡ Sandeep ElectroFix Project 2.1 Engine Ready"
        );

    }
);


/* =========================================================
   GLOBAL EXPORTS
   HTML onclick compatibility
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

window.sendWhatsappQuote =
    sendWhatsappQuote;

window.downloadEstimatePDF =
    downloadEstimatePDF;

window.getUserLocation =
    getUserLocation;

window.shareWebsite =
    shareWebsite;

window.saveContactVCard =
    saveContactVCard;

window.applyQuickLayout =
    applyQuickLayout;

window.applyServiceLayout =
    applyServiceLayout;

window.updateCalculations =
    updateCalculations;


/* =========================================================
   END
========================================================= */
