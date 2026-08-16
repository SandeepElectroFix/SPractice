/* =========================================================
   SANDEEP ELECTROFIX - CORE JAVASCRIPT ENGINE
   Reads directly from window.MASTER_CONFIG
========================================================= */

let currentLang = localStorage.getItem("sandeepLang") || "hi";
let selectedItemsMap = {};

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
        message: document.getElementById("customerMessage")?.value || ""
    };
    localStorage.setItem("sandeepCustomer", JSON.stringify(data));
}

function restoreCustomerInputs() {
    try {
        const saved = localStorage.getItem("sandeepCustomer");
        if (saved) {
            const data = JSON.parse(saved);
            if (data.name) document.getElementById("customerName").value = data.name;
            if (data.phone) document.getElementById("customerPhone").value = data.phone;
            if (data.message) document.getElementById("customerMessage").value = data.message;
        }
    } catch(e) {}
}

// Show/Hide Elements based on MASTER_CONFIG
function applyVisibilityControls() {
    const ctrl = window.MASTER_CONFIG?.controls;
    if (!ctrl) return;

    const toggle = (id, show) => {
        const el = document.getElementById(id);
        if (el) el.style.display = show ? "" : "none";
    };

    // Main Sections
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

    // Hero Elements
    toggle("themeToggle", ctrl.showThemeToggle);
    toggle("languageSwitcher", ctrl.showLanguageSwitcher);
    toggle("businessLogo", ctrl.showLogo);
    toggle("businessTagline", ctrl.showTagline);
    toggle("businessLocation", ctrl.showHeroLocation);
    toggle("callBtn", ctrl.showHeroCallBtn);
    toggle("whatsappBtn", ctrl.showHeroWhatsappBtn);

    // Quick Access Buttons
    toggle("btnQuickCall", ctrl.showQuickCall);
    toggle("btnQuickWhatsapp", ctrl.showQuickWhatsapp);
    toggle("btnQuickWebsite", ctrl.showQuickWebsite);
    toggle("btnQuickMaps", ctrl.showQuickMaps);
    toggle("btnQuickShare", ctrl.showQuickShare);
    toggle("btnQuickWork", ctrl.showQuickWork);
    toggle("btnQuickCatalogue", ctrl.showQuickCatalogue);

    // Quote Buttons
    toggle("sendWhatsappBtn", ctrl.showQuoteWhatsappBtn);
    toggle("downloadPdfBtn", ctrl.showQuotePdfBtn);
}

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

    // Static Texts
    document.getElementById("businessTitle").innerText = biz.name;
    document.getElementById("businessTagline").innerText = isHi ? biz.tagline_hi : biz.tagline_en;
    document.getElementById("businessLocation").innerText = isHi ? `📍 ${biz.location_hi}` : `📍 ${biz.location_en}`;
    document.getElementById("callBtnText").innerText = isHi ? "📞 अभी कॉल करें" : "📞 Call Now";
    document.getElementById("whatsappBtnText").innerText = isHi ? "💬 व्हाट्सएप करें" : "💬 WhatsApp";

    // Discount Texts
    document.getElementById("discountBadge").innerText = isHi ? "🔥 विशेष ऑफर" : "🔥 SPECIAL OFFER";
    document.getElementById("discountTitle").innerText = isHi ? "विशेष छूट" : "Special Discount";
    document.getElementById("discountPercentage").innerText = ctrl.discountPercent || 10;
    document.getElementById("discountMessage").innerText = isHi 
        ? `इलेक्ट्रिकल सेवाओं पर ${ctrl.discountPercent}% की भारी छूट पाएं` 
        : `Get ${ctrl.discountPercent}% OFF on selected electrical services.`;
    document.getElementById("discountValidity").innerText = isHi ? "⏳ सीमित समय के लिए" : "⏳ Limited Time Offer";
    document.getElementById("discountBtnText").innerText = isHi ? "⚡ छूट प्राप्त करें" : "⚡ Get Discount";

    // Quick Access Labels
    document.getElementById("quickHeading").innerText = isHi ? "त्वरित सेवाएँ" : "Quick Access";
    document.getElementById("labelCall").innerText = isHi ? "कॉल करें" : "Call";
    document.getElementById("labelWhatsapp").innerText = isHi ? "व्हाट्सएप" : "WhatsApp";
    document.getElementById("labelWeb").innerText = isHi ? "वेबसाइट" : "Website";
    document.getElementById("labelMap").innerText = isHi ? "गूगल मैप्स" : "Google Maps";
    document.getElementById("labelShare").innerText = isHi ? "शेयर करें" : "Share";
    document.getElementById("labelWork").innerText = isHi ? "हमारे कार्य" : "Our Work";
    document.getElementById("labelCatalogue").innerText = isHi ? "सामग्री सूची" : "Catalogue";

    // About
    document.getElementById("aboutHeading").innerText = isHi ? "हमारे बारे में" : "About Us";
    document.getElementById("aboutText").innerHTML = isHi
        ? `<strong>${biz.name}</strong> में आपका स्वागत है। हम लखनऊ में पेशेवर इलेक्ट्रीशियन सेवाएँ प्रदान करते हैं, जिसमें हाउस वायरिंग, फॉल्स सीलिंग वायरिंग, एमसीबी और डीबी इंस्टॉलेशन, पंखा और लाइट फिटिंग, इन्वर्टर वायरिंग, फॉल्ट रिपेयर और मेंटेनेंस शामिल हैं।`
        : `Welcome to <strong>${biz.name}</strong>. We provide professional electrical services across Lucknow, including house wiring, false ceiling wiring, MCB & DB installation, fan and light fitting, inverter wiring, fault repair, and general maintenance.`;

    // Location
    document.getElementById("locHeading").innerText = isHi ? "📍 सेवा क्षेत्र एवं लोकेशन" : "📍 Service Location";
    document.getElementById("locDesc").innerText = isHi ? "पूरे लखनऊ और आसपास के क्षेत्रों में ऑन-साइट इलेक्ट्रीशियन सेवा उपलब्ध।" : "Providing on-site electrical services across Lucknow.";
    document.getElementById("distBtnText").innerText = isHi ? "हमारे यहाँ से अपनी दूरी चेक करें" : "Check Your Distance from Us";
    document.getElementById("mapBtnText").innerText = isHi ? "गूगल मैप्स पर रास्ता देखें" : "Get Directions on Google Maps";

    // Headers
    document.getElementById("servicesHeading").innerText = isHi ? "हमारी सेवाएँ" : "Our Services";
    document.getElementById("galleryHeading").innerText = isHi ? "हमारे द्वारा किए गए कार्य" : "Our Work";
    document.getElementById("qrHeading").innerText = isHi ? "क्यूआर कोड स्कैन करें" : "Scan QR Code";
    document.getElementById("qrDesc").innerText = isHi ? "हमारा डिजिटल कार्ड सेव करने या भुगतान के लिए यह क्यूआर कोड स्कैन करें।" : "Scan this QR code to quickly save our digital card or pay.";
    document.getElementById("qrBtnText").innerText = isHi ? "📥 क्यूआर कोड डाउनलोड करें" : "📥 Download QR Code";
    document.getElementById("reviewsHeading").innerText = isHi ? "ग्राहकों की राय" : "Customer Reviews";

    // Estimate
    document.getElementById("quoteHeading").innerText = isHi ? "कोटेशन व अनुमानित खर्च" : "Estimate & Quotation";
    document.getElementById("customerName").placeholder = isHi ? "आपका नाम *" : "Your Name *";
    document.getElementById("customerPhone").placeholder = isHi ? "मोबाइल नंबर *" : "Mobile Number *";
    document.getElementById("customerMessage").placeholder = isHi ? "पता / कार्य का विवरण..." : "Address / Work details...";
    document.getElementById("lblSubtotal").innerText = isHi ? "कुल राशि:" : "Subtotal:";
    document.getElementById("lblGrandTotal").innerText = isHi ? "अंतिम राशि:" : "Grand Total:";
    document.getElementById("discountLabel").innerText = isHi ? `विशेष छूट (${ctrl.discountPercent}% OFF):` : `Special Discount (${ctrl.discountPercent}% OFF):`;
    document.getElementById("sendWhatsappBtn").innerText = isHi ? "💬 व्हाट्सएप पर भेजें" : "💬 Send on WhatsApp";
    document.getElementById("downloadPdfBtn").innerText = isHi ? "📄 पीडीएफ एस्टीमेट डाउनलोड करें" : "📄 Download PDF Estimate";

    // FAQs & Bottom Nav
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
            if (selectedItemsMap[`${sIdx}_${subIdx}`]?.qty > 0) {
                activeCount += selectedItemsMap[`${sIdx}_${subIdx}`].qty;
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
        const qty = selectedItemsMap[key]?.qty || 0;
        const name = currentLang === "hi" ? sub.name_hi : sub.name_en;
        const rate = currentLang === "hi" ? sub.rate_hi : sub.rate_en;

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
    }).join("");

    const overlay = document.getElementById("serviceModalOverlay");
    overlay.style.display = "flex";
    setTimeout(() => overlay.classList.add("active"), 10);
    document.body.style.overflow = "hidden";
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

function closeServiceModal() {
    const overlay = document.getElementById("serviceModalOverlay");
    if (overlay) {
        overlay.classList.remove("active");
        setTimeout(() => {
            overlay.style.display = "none";
            document.body.style.overflow = "";
            renderServices();
        }, 300);
    }
}

function changeQty(sIdx, subIdx, change) {
    const key = `${sIdx}_${subIdx}`;
    const sub = window.MASTER_CONFIG.services[sIdx].subServices[subIdx];

    if (!selectedItemsMap[key]) {
        selectedItemsMap[key] = {
            name_hi: sub.name_hi,
            name_en: sub.name_en,
            price: sub.price,
            qty: 0
        };
    }

    selectedItemsMap[key].qty += change;
    if (selectedItemsMap[key].qty <= 0) delete selectedItemsMap[key];

    localStorage.setItem("sandeepCart", JSON.stringify(selectedItemsMap));
    updateCalculations();
}

function updateCalculations() {
    const items = Object.values(selectedItemsMap);
    const countEl = document.getElementById("selectedCount");
    const listEl = document.getElementById("selectedServicesList");
    const subtotalEl = document.getElementById("calcSubtotal");
    const discRow = document.getElementById("calcDiscountRow");
    const discEl = document.getElementById("calcDiscount");
    const totalEl = document.getElementById("calcGrandTotal");
    const ctrl = window.MASTER_CONFIG?.controls;

    const count = items.reduce((acc, itm) => acc + itm.qty, 0);
    if (countEl) countEl.innerText = count;

    if (items.length === 0) {
        if (listEl) listEl.innerHTML = `<p class="no-selection-hint">${currentLang === 'hi' ? 'अभी तक कोई सेवा नहीं चुनी गई। ऊपर + / − का उपयोग करें।' : 'No services selected yet. Use + / − above.'}</p>`;
        if (subtotalEl) subtotalEl.innerText = "₹0";
        if (discRow) discRow.style.display = "none";
        if (totalEl) totalEl.innerText = "₹0";
        return;
    }

    if (listEl) {
        listEl.innerHTML = items.map(itm => `
            <div class="summary-item">
                <span>• ${currentLang === 'hi' ? itm.name_hi : itm.name_en} × <strong>${itm.qty}</strong></span>
                <strong>₹${itm.price * itm.qty}</strong>
            </div>
        `).join("");
    }

    const subtotal = items.reduce((acc, itm) => acc + (itm.price * itm.qty), 0);
    const isDiscountActive = ctrl.showDiscount && (ctrl.discountPercent > 0);
    const discount = isDiscountActive ? Math.round(subtotal * (ctrl.discountPercent / 100)) : 0;
    const total = subtotal - discount;

    if (subtotalEl) subtotalEl.innerText = `₹${subtotal}`;
    if (discRow) discRow.style.display = isDiscountActive ? "flex" : "none";
    if (discEl) discEl.innerText = `-₹${discount}`;
    if (totalEl) totalEl.innerText = `₹${total}`;
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

function openLightboxModal(src) {
    const box = document.getElementById("lightbox");
    const img = document.getElementById("lightboxImage");
    if (box && img) {
        img.src = src;
        box.style.display = "flex";
    }
}

function closeLightboxModal() {
    const box = document.getElementById("lightbox");
    if (box) box.style.display = "none";
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

function sendWhatsappQuote() {
    const name = document.getElementById("customerName")?.value.trim();
    const phone = document.getElementById("customerPhone")?.value.trim();
    const note = document.getElementById("customerMessage")?.value.trim();
    const items = Object.values(selectedItemsMap);
    const ctrl = window.MASTER_CONFIG?.controls;
    const biz = window.MASTER_CONFIG?.business;

    if (!name || !phone) return alert(currentLang === 'hi' ? "कृपया अपना नाम और मोबाइल नंबर दर्ज करें।" : "Please enter Name and Phone.");
    if (items.length === 0) return alert(currentLang === 'hi' ? "कृपया + बटन दबाकर कम से कम एक सेवा चुनें।" : "Please add at least one service.");

    const subtotal = items.reduce((acc, itm) => acc + (itm.price * itm.qty), 0);
    const isDiscountActive = ctrl.showDiscount && (ctrl.discountPercent > 0);
    const discount = isDiscountActive ? Math.round(subtotal * (ctrl.discountPercent / 100)) : 0;
    const total = subtotal - discount;

    let msg = `⚡ *${biz.name} - Estimate Request* ⚡\n\n`;
    msg += `👤 *${currentLang === 'hi' ? 'नाम' : 'Name'}:* ${name}\n`;
    msg += `📞 *${currentLang === 'hi' ? 'फोन' : 'Phone'}:* ${phone}\n`;
    if (note) msg += `📍 *${currentLang === 'hi' ? 'पता/नोट' : 'Address/Note'}:* ${note}\n`;
    msg += `\n📋 *${currentLang === 'hi' ? 'चुनी गई सेवाएँ' : 'Selected Services'}:*\n`;

    items.forEach((itm, i) => {
        msg += `${i+1}. ${currentLang === 'hi' ? itm.name_hi : itm.name_en} [Qty: ${itm.qty}] - ₹${itm.price * itm.qty}\n`;
    });

    msg += `\n💵 *Subtotal:* ₹${subtotal}\n`;
    if (isDiscountActive) msg += `🎁 *Discount (${ctrl.discountPercent}%):* -₹${discount}\n`;
    msg += `✅ *Grand Total:* ₹${total}\n\n`;
    msg += `_Please confirm visit/booking._`;

    window.open(`https://wa.me/${biz.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
}

function downloadEstimatePDF() {
    const { jsPDF } = window.jspdf || {};
    if (!jsPDF) return alert("PDF library is loading, please try in 2 seconds.");

    const name = document.getElementById("customerName")?.value.trim() || "Customer";
    const phone = document.getElementById("customerPhone")?.value.trim() || "N/A";
    const note = document.getElementById("customerMessage")?.value.trim() || "N/A";
    const items = Object.values(selectedItemsMap);
    const ctrl = window.MASTER_CONFIG?.controls;
    const biz = window.MASTER_CONFIG?.business;

    if (items.length === 0) return alert(currentLang === 'hi' ? "कृपया पहले + से कोई सेवा जोड़ें।" : "Please add services first.");

    const doc = new jsPDF();
    doc.setFillColor(5, 8, 22);
    doc.rect(0, 0, 210, 36, "F");

    doc.setTextColor(245, 197, 66);
    doc.setFontSize(18);
    doc.text(biz.name, 14, 16);

    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(`Phone: ${biz.phone} | Lucknow, UP`, 14, 25);
    doc.text(`Date: ${new Date().toLocaleDateString("en-IN")}`, 160, 25);

    doc.setTextColor(16, 24, 39);
    doc.setFontSize(11);
    doc.text("CUSTOMER ESTIMATE", 14, 46);

    doc.setFontSize(9);
    doc.text(`Client: ${name}  |  Phone: ${phone}`, 14, 53);
    doc.text(`Address / Note: ${note}`, 14, 59);

    const rows = items.map((itm, i) => [i + 1, itm.name_en, `Rs. ${itm.price}`, itm.qty, `Rs. ${itm.price * itm.qty}`]);
    const subtotal = items.reduce((acc, itm) => acc + (itm.price * itm.qty), 0);
    const isDiscountActive = ctrl.showDiscount && (ctrl.discountPercent > 0);
    const discount = isDiscountActive ? Math.round(subtotal * (ctrl.discountPercent / 100)) : 0;
    const total = subtotal - discount;

    doc.autoTable({
        startY: 65,
        head: [["#", "Service Item", "Rate", "Qty", "Total Amount"]],
        body: rows,
        theme: "grid",
        headStyles: { fillColor: [5, 8, 22], textColor: [245, 197, 66] }
    });

    const finalY = doc.lastAutoTable.finalY + 8;
    doc.setFontSize(9.5);
    doc.text(`Subtotal: Rs. ${subtotal}`, 140, finalY);
    let nextY = finalY + 5;
    if (isDiscountActive) {
        doc.setTextColor(37, 211, 102);
        doc.text(`Discount (${ctrl.discountPercent}%): -Rs. ${discount}`, 140, nextY);
        nextY += 5;
    }
    doc.setFontSize(11);
    doc.setTextColor(16, 24, 39);
    doc.text(`Grand Total: Rs. ${total}`, 140, nextY);

    doc.save(`Estimate_${name.replace(/\s+/g, "_")}.pdf`);
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
    const savedTheme = localStorage.getItem("sandeepTheme");
    if (savedTheme === "light") document.documentElement.classList.add("saved-light-theme");

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
