/* =========================================================
   SANDEEP ELECTROFIX - MASTER APP.JS
   Fixed "undefined", Bilingual, Qty (+/-), Smart Discount & PDF
========================================================= */

let currentLang = localStorage.getItem("sandeepLang") || "hi";
let selectedItemsMap = {}; // Format: { [itemId]: { name_en, name_hi, price, rate_en, rate_hi, category_en, category_hi, qty } }

const UI_TEXT = {
  en: {
    tagline: "Powering Your Trust",
    location: "📍 Lucknow, Uttar Pradesh",
    callNow: "📞 Call Now",
    whatsapp: "💬 WhatsApp",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    specialOffer: "🔥 SPECIAL OFFER",
    ourServices: "Our Services",
    selectedServices: "Selected Services",
    noSelection: "No services selected yet. Use + / − to add items.",
    subtotal: "Subtotal:",
    discount: "Discount",
    grandTotal: "Grand Total:",
    namePlaceholder: "Your Name *",
    phonePlaceholder: "Mobile Number *",
    notePlaceholder: "Site Address / Additional details...",
    sendWhatsApp: "💬 Send on WhatsApp",
    downloadPDF: "📄 Download PDF Estimate",
    faqHeading: "Frequently Asked Questions",
    estimateFor: "Estimate Request",
    alertMissing: "Please enter your Name and Mobile Number.",
    alertEmpty: "Please add at least one service using the + button."
  },
  hi: {
    tagline: "आपके विश्वास को रोशन करते हुए",
    location: "📍 लखनऊ, उत्तर प्रदेश",
    callNow: "📞 अभी कॉल करें",
    whatsapp: "💬 व्हाट्सएप करें",
    lightMode: "लाइट मोड",
    darkMode: "डार्क मोड",
    specialOffer: "🔥 विशेष ऑफर",
    ourServices: "हमारी सेवाएँ",
    selectedServices: "चुनी गई सेवाएँ",
    noSelection: "अभी तक कोई सेवा नहीं चुनी गई। + / − का उपयोग करें।",
    subtotal: "कुल राशि (सबटोटल):",
    discount: "विशेष छूट",
    grandTotal: "अंतिम कुल राशि:",
    namePlaceholder: "आपका नाम *",
    phonePlaceholder: "मोबाइल नंबर *",
    notePlaceholder: "पता / कार्य का विवरण...",
    sendWhatsApp: "💬 व्हाट्सएप पर भेजें",
    downloadPDF: "📄 पीडीएफ एस्टीमेट डाउनलोड करें",
    faqHeading: "अक्सर पूछे जाने वाले सवाल",
    estimateFor: "इलेक्ट्रिकल कार्य एस्टीमेट",
    alertMissing: "कृपया अपना नाम और मोबाइल नंबर दर्ज करें।",
    alertEmpty: "कृपया + बटन दबाकर कम से कम एक सेवा चुनें।"
  }
};

// 1. Single Clean DOM Initialization
document.addEventListener("DOMContentLoaded", () => {
  applyVisibilityControls();
  setLanguage(currentLang);

  // Language buttons event
  document.querySelectorAll(".language-btn").forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.getAttribute("data-lang")));
  });

  // Theme toggle event
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.documentElement.classList.toggle("saved-light-theme");
      const isLight = document.documentElement.classList.contains("saved-light-theme");
      localStorage.setItem("sandeepTheme", isLight ? "light" : "dark");
      updateThemeButtonText();
    });
  }

  // Restore Theme
  if (localStorage.getItem("sandeepTheme") === "light") {
    document.documentElement.classList.add("saved-light-theme");
  }
  updateThemeButtonText();

  setupQuickAccessLayoutSwitcher();
  setupServiceLayoutSwitcher();
  setupQuoteActions();
});

// 2. Language Switcher Function
function setLanguage(lang) {
  currentLang = (lang === "en") ? "en" : "hi";
  localStorage.setItem("sandeepLang", currentLang);

  document.querySelectorAll(".language-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === currentLang);
  });

  const t = UI_TEXT[currentLang];
  const cfg = window.CARD_CONFIG || {};

  const setElemText = (id, text) => {
    const el = document.getElementById(id);
    if (el && text) el.innerHTML = text;
  };
  const setElemPlaceholder = (id, text) => {
    const el = document.getElementById(id);
    if (el && text) el.placeholder = text;
  };

  setElemText("businessTagline", cfg.business?.[`tagline_${currentLang}`] || cfg.business?.tagline || t.tagline);
  setElemText("businessLocation", cfg.business?.[`location_${currentLang}`] || cfg.business?.location || t.location);
  setElemText("callBtnText", t.callNow);
  setElemText("whatsappBtnText", t.whatsapp);
  setElemText("servicesHeading", t.ourServices);
  setElemText("faqHeading", t.faqHeading);
  setElemText("sendWhatsappBtn", t.sendWhatsApp);
  setElemText("downloadPdfBtn", t.downloadPDF);

  setElemPlaceholder("customerName", t.namePlaceholder);
  setElemPlaceholder("customerPhone", t.phonePlaceholder);
  setElemPlaceholder("customerMessage", t.notePlaceholder);

  if (cfg.discount) {
    setElemText("discountTitle", cfg.discount[`title_${currentLang}`] || cfg.discount.title);
    setElemText("discountMessage", cfg.discount[`message_${currentLang}`] || cfg.discount.message);
    setElemText("discountValidity", cfg.discount[`validity_${currentLang}`] || cfg.discount.validityText);
  }

  updateThemeButtonText();
  loadServices();
  loadGallery();
  loadReviews();
  renderFAQ();
  updateCalculationUI();
}

function updateThemeButtonText() {
  const isLight = document.documentElement.classList.contains("saved-light-theme");
  const themeTextEl = document.getElementById("themeText");
  const themeIconEl = document.getElementById("themeIcon");
  if (themeTextEl && themeIconEl) {
    themeIconEl.innerText = isLight ? "🌙" : "☀️";
    themeTextEl.innerText = isLight ? UI_TEXT[currentLang].darkMode : UI_TEXT[currentLang].lightMode;
  }
}

// 3. Show / Hide Control Applier
function applyVisibilityControls() {
  const cfg = window.CARD_CONFIG;
  if (!cfg) return;
  const toggle = (id, condition) => {
    const el = document.getElementById(id);
    if (el) el.style.display = condition ? "" : "none";
  };

  if (cfg.features) {
    toggle("heroSection", cfg.features.heroSection);
    toggle("quickAccessBar", cfg.features.quickAccessBar);
    toggle("themeToggle", cfg.features.themeToggle);
    toggle("languageSwitcher", cfg.features.languageSwitch);
    toggle("discountSection", cfg.features.discountOffer && cfg.discount?.show !== false);
    toggle("servicesSection", cfg.features.servicesSection);
    toggle("gallerySection", cfg.features.gallerySection);
    toggle("reviewsSection", cfg.features.reviewsSection);
    toggle("quoteFormSection", cfg.features.quoteFormSection);
    toggle("faqSection", cfg.features.faqSection);
    toggle("locationSection", cfg.features.locationTracker);
    toggle("footerSection", cfg.features.footerSection);
    toggle("mobileBottomNav", cfg.features.mobileBottomNav);
  }

  if (cfg.business && cfg.business.showElements) {
    const el = cfg.business.showElements;
    toggle("businessLogo", el.logo);
    toggle("businessTagline", el.tagline);
    toggle("businessLocation", el.location);
    toggle("callBtn", el.phoneCall);
    toggle("whatsappBtn", el.whatsappChat);
    toggle("emailBtn", el.email);
    toggle("websiteBtn", el.website);
    toggle("mapsBtn", el.googleMaps);
    toggle("facebookBtn", el.facebook);
    toggle("instagramBtn", el.instagram);
    toggle("youtubeBtn", el.youtube);
    toggle("cardQRContainer", el.cardQR);
    toggle("saveContactBtn", el.saveContactBtn);
    toggle("shareBtn", el.shareBtn);
  }
}

// 4. Services Loader (100% Fixed - No Undefined)
function loadServices() {
  const container = document.getElementById("serviceContainer");
  if (!container || !window.CARD_CONFIG) return;

  const services = window.CARD_CONFIG.services || [];
  container.innerHTML = "";

  services.forEach((service, sIndex) => {
    if (service.show === false) return;

    // Direct language check with fallbacks
    const title = service[`title_${currentLang}`] || service.title || service.title_en || service.name || "Electrical Service";
    const desc = service[`desc_${currentLang}`] || service.description || service.desc_en || "";

    const subList = service.subServices || service.items || [];
    const visibleSub = subList.filter(sub => sub.show !== false);

    const subListHtml = visibleSub.map((sub, subIndex) => {
      const itemId = `item_${sIndex}_${subIndex}`;
      const savedQty = selectedItemsMap[itemId]?.qty || 0;

      const subName = sub[`name_${currentLang}`] || sub.name_en || sub.title || sub.name || "Service Item";
      const subRate = sub[`rate_${currentLang}`] || sub.rate_en || (sub.price && sub.unit ? `₹${sub.price} / ${sub.unit}` : sub.rate) || `₹${sub.price || 0}`;
      const numPrice = sub.price || (parseInt(subRate.toString().match(/\d+/)?.[0], 10) || 0);

      return `
        <div class="sub-service-item ${savedQty > 0 ? 'has-qty' : ''}" id="row_${itemId}">
          <div class="sub-service-info">
            <span class="sub-name">${subName}</span>
            <span class="sub-rate">${subRate}</span>
          </div>
          <div class="qty-control">
            <button type="button" class="qty-btn minus-btn" onclick="updateQty('${itemId}', -1, ${numPrice}, ${sIndex}, ${subIndex})">−</button>
            <span class="qty-val" id="qty_${itemId}">${savedQty}</span>
            <button type="button" class="qty-btn plus-btn" onclick="updateQty('${itemId}', 1, ${numPrice}, ${sIndex}, ${subIndex})">+</button>
          </div>
        </div>
      `;
    }).join("");

    const card = document.createElement("div");
    card.className = "service-card";
    card.innerHTML = `
      <div class="service-header" onclick="this.parentElement.classList.toggle('open')">
        <div class="service-title-wrap">
          <span class="service-icon">${service.icon || "⚡"}</span>
          <h3 class="service-title">${title}</h3>
        </div>
        <span class="toggle-arrow">▼</span>
      </div>
      <div class="service-body">
        ${desc ? `<p class="service-desc">${desc}</p>` : ""}
        <div class="sub-services-list">${subListHtml}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

// 5. Quantity Management (+ / -)
function updateQty(itemId, change, price, sIndex, subIndex) {
  const service = window.CARD_CONFIG.services[sIndex];
  const subList = service.subServices || service.items || [];
  const sub = subList[subIndex];

  if (!selectedItemsMap[itemId]) {
    selectedItemsMap[itemId] = {
      name_en: sub.name_en || sub.title || sub.name || "Item",
      name_hi: sub.name_hi || sub.title || sub.name || "Item",
      category_en: service.title_en || service.title || "Service",
      category_hi: service.title_hi || service.title || "Service",
      rate_en: sub.rate_en || sub.rate || `₹${price}`,
      rate_hi: sub.rate_hi || sub.rate || `₹${price}`,
      price: price,
      qty: 0
    };
  }

  selectedItemsMap[itemId].qty += change;

  if (selectedItemsMap[itemId].qty <= 0) {
    delete selectedItemsMap[itemId];
  }

  const currentQty = selectedItemsMap[itemId]?.qty || 0;
  const qtyEl = document.getElementById(`qty_${itemId}`);
  const rowEl = document.getElementById(`row_${itemId}`);

  if (qtyEl) qtyEl.innerText = currentQty;
  if (rowEl) rowEl.classList.toggle("has-qty", currentQty > 0);

  updateCalculationUI();
}

// 6. Live Calculation Update
function updateCalculationUI() {
  const t = UI_TEXT[currentLang];
  const listContainer = document.getElementById("selectedServicesList");
  const countEl = document.getElementById("selectedCount");
  const subtotalEl = document.getElementById("calcSubtotal");
  const discountRow = document.getElementById("calcDiscountRow");
  const discountEl = document.getElementById("calcDiscount");
  const grandTotalEl = document.getElementById("calcGrandTotal");
  const discountLabel = document.getElementById("discountLabel");

  if (!listContainer) return;

  const items = Object.values(selectedItemsMap);
  const totalCount = items.reduce((sum, itm) => sum + itm.qty, 0);

  if (countEl) countEl.innerText = totalCount;

  if (items.length === 0) {
    listContainer.innerHTML = `<p class="no-selection-hint">${t.noSelection}</p>`;
    if (subtotalEl) subtotalEl.innerText = "₹0";
    if (discountRow) discountRow.style.display = "none";
    if (grandTotalEl) grandTotalEl.innerText = "₹0";
    return;
  }

  listContainer.innerHTML = items.map(item => `
    <div class="summary-item">
      <span>• ${item[`name_${currentLang}`] || item.name_en} × <strong>${item.qty}</strong></span>
      <strong>₹${item.price * item.qty}</strong>
    </div>
  `).join("");

  const subtotal = items.reduce((sum, itm) => sum + (itm.price * itm.qty), 0);
  if (subtotalEl) subtotalEl.innerText = `₹${subtotal}`;

  const discountCfg = window.CARD_CONFIG?.discount || {};
  const isDiscountActive = discountCfg.show !== false && discountCfg.percentage > 0;

  let discountAmount = 0;
  if (isDiscountActive) {
    discountAmount = Math.round(subtotal * (discountCfg.percentage / 100));
    if (discountRow) {
      discountRow.style.display = "flex";
      if (discountLabel) discountLabel.innerText = `${t.discount} (${discountCfg.percentage}% OFF):`;
      if (discountEl) discountEl.innerText = `-₹${discountAmount}`;
    }
  } else {
    if (discountRow) discountRow.style.display = "none";
  }

  const grandTotal = subtotal - discountAmount;
  if (grandTotalEl) grandTotalEl.innerText = `₹${grandTotal}`;
}

// 7. Actions: WhatsApp & PDF
function setupQuoteActions() {
  document.getElementById("sendWhatsappBtn")?.addEventListener("click", () => {
    const t = UI_TEXT[currentLang];
    const name = document.getElementById("customerName")?.value.trim();
    const phone = document.getElementById("customerPhone")?.value.trim();
    const note = document.getElementById("customerMessage")?.value.trim();
    const items = Object.values(selectedItemsMap);

    if (!name || !phone) return alert(t.alertMissing);
    if (items.length === 0) return alert(t.alertEmpty);

    const subtotal = items.reduce((sum, itm) => sum + (itm.price * itm.qty), 0);
    const discountCfg = window.CARD_CONFIG?.discount || {};
    const isDiscountActive = discountCfg.show !== false && discountCfg.percentage > 0;
    const discountAmount = isDiscountActive ? Math.round(subtotal * (discountCfg.percentage / 100)) : 0;
    const grandTotal = subtotal - discountAmount;

    let text = `⚡ *${window.CARD_CONFIG?.business?.name || "Sandeep ElectroFix"} - ${t.estimateFor}* ⚡\n\n`;
    text += `👤 *Name:* ${name}\n`;
    text += `📞 *Phone:* ${phone}\n`;
    if (note) text += `📍 *Address/Note:* ${note}\n`;
    text += `\n📋 *Selected Services:*\n`;

    items.forEach((item, i) => {
      const sName = item[`name_${currentLang}`] || item.name_en;
      const sRate = item[`rate_${currentLang}`] || item.rate_en;
      text += `${i + 1}. ${sName} [Qty: ${item.qty}] — ₹${item.price * item.qty} (${sRate})\n`;
    });

    text += `\n💵 *Subtotal:* ₹${subtotal}\n`;
    if (isDiscountActive) text += `🎁 *Discount (${discountCfg.percentage}%):* -₹${discountAmount}\n`;
    text += `✅ *Grand Total:* ₹${grandTotal}\n\n`;
    text += `_Please confirm my visit / booking._`;

    const waNumber = window.CARD_CONFIG?.quote?.whatsappNumber || window.CARD_CONFIG?.business?.whatsapp || "919026036445";
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, "_blank");
  });

  document.getElementById("downloadPdfBtn")?.addEventListener("click", () => {
    const { jsPDF } = window.jspdf || {};
    if (!jsPDF) return alert("PDF library loading. Please check internet connection.");

    const t = UI_TEXT[currentLang];
    const name = document.getElementById("customerName")?.value.trim() || "Customer";
    const phone = document.getElementById("customerPhone")?.value.trim() || "N/A";
    const note = document.getElementById("customerMessage")?.value.trim() || "N/A";
    const items = Object.values(selectedItemsMap);

    if (items.length === 0) return alert(t.alertEmpty);

    const doc = new jsPDF();
    const biz = window.CARD_CONFIG?.business || {};
    const discountCfg = window.CARD_CONFIG?.discount || {};

    doc.setFillColor(5, 8, 22);
    doc.rect(0, 0, 210, 38, "F");

    doc.setTextColor(245, 197, 66);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(biz.name || "Sandeep ElectroFix", 14, 18);

    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "normal");
    doc.text(`Phone: ${biz.phone || "+91 9026036445"} | Lucknow, UP`, 14, 26);
    doc.text(`Date: ${new Date().toLocaleDateString("en-IN")}`, 160, 26);

    doc.setTextColor(16, 24, 39);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("CUSTOMER & ESTIMATE DETAILS", 14, 48);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${name}  |  Phone: ${phone}`, 14, 55);
    doc.text(`Note / Address: ${note}`, 14, 61);

    const tableRows = items.map((item, index) => [
      index + 1,
      item.name_en || item.name_hi,
      `Rs. ${item.price}`,
      item.qty,
      `Rs. ${item.price * item.qty}`
    ]);

    const subtotal = items.reduce((sum, itm) => sum + (itm.price * itm.qty), 0);
    const isDiscountActive = discountCfg.show !== false && discountCfg.percentage > 0;
    const discountAmount = isDiscountActive ? Math.round(subtotal * (discountCfg.percentage / 100)) : 0;
    const grandTotal = subtotal - discountAmount;

    doc.autoTable({
      startY: 68,
      head: [["#", "Service Item", "Rate", "Qty", "Total Amount"]],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: [5, 8, 22], textColor: [245, 197, 66], fontStyle: "bold" },
      styles: { fontSize: 8.5, cellPadding: 3.5 }
    });

    const finalY = doc.lastAutoTable.finalY + 8;
    doc.setFontSize(9.5);
    doc.text(`Subtotal: Rs. ${subtotal}`, 140, finalY);
    let nextY = finalY + 5;

    if (isDiscountActive) {
      doc.setTextColor(37, 211, 102);
      doc.text(`Discount (${discountCfg.percentage}%): -Rs. ${discountAmount}`, 140, nextY);
      nextY += 5;
    }

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(16, 24, 39);
    doc.text(`Grand Total: Rs. ${grandTotal}`, 140, nextY);

    doc.save(`Estimate_${name.replace(/\s+/g, "_")}.pdf`);
  });
}

// 8. Layout Switchers
function setupQuickAccessLayoutSwitcher() {
  const container = document.getElementById("quickGridContainer");
  const buttons = document.querySelectorAll("#quickLayoutBar .layout-btn");
  if (!container || !buttons.length) return;

  function applyQuickLayout(layoutName) {
    container.classList.remove("layout-grid-2", "layout-carousel", "layout-list", "layout-grid-3");
    container.classList.add(`layout-${layoutName}`);
    buttons.forEach(btn => btn.classList.toggle("active", btn.getAttribute("data-quick-layout") === layoutName));
    localStorage.setItem("sandeepQuickLayout", layoutName);
  }

  buttons.forEach(btn => {
    btn.onclick = function() {
      const layout = this.getAttribute("data-quick-layout");
      if (layout) applyQuickLayout(layout);
    };
  });

  const savedLayout = localStorage.getItem("sandeepQuickLayout") || "grid-2";
  applyQuickLayout(savedLayout);
}

function setupServiceLayoutSwitcher() {
  const container = document.getElementById("serviceContainer");
  const buttons = document.querySelectorAll("#servicesLayoutBar .layout-btn");
  if (!container || !buttons.length) return;

  function applyServiceLayout(layoutName) {
    container.classList.remove("layout-grid-2", "layout-carousel", "layout-list", "layout-grid-3");
    container.classList.add(`layout-${layoutName}`);
    buttons.forEach(btn => btn.classList.toggle("active", btn.getAttribute("data-service-layout") === layoutName));
    localStorage.setItem("sandeepServiceLayout", layoutName);
  }

  buttons.forEach(btn => {
    btn.onclick = function() {
      const layout = this.getAttribute("data-service-layout");
      if (layout) applyServiceLayout(layout);
    };
  });

  const savedLayout = localStorage.getItem("sandeepServiceLayout") || "grid-2";
  applyServiceLayout(savedLayout);
}

// 9. Gallery, Reviews & FAQ Loaders
function loadGallery() {
  const container = document.getElementById("galleryContainer");
  if (!container || !window.CARD_CONFIG) return;
  const galleryItems = (window.CARD_CONFIG.gallery || []).filter(item => item.show !== false);
  container.innerHTML = galleryItems.map(g => {
    const title = g[`title_${currentLang}`] || g.title_en || g.title || "";
    return `
      <div class="gallery-item">
        <img src="${g.image}" alt="${title}" onclick="openLightbox('${g.image}')" onerror="this.parentElement.style.display='none'">
        <div class="gallery-title">${title}</div>
      </div>
    `;
  }).join("");
}

function openLightbox(src) {
  const box = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImage");
  if (box && img) {
    img.src = src;
    box.style.display = "flex";
  }
}

document.getElementById("closeLightbox")?.addEventListener("click", () => {
  document.getElementById("lightbox").style.display = "none";
});

function loadReviews() {
  const container = document.getElementById("reviewContainer");
  if (!container || !window.CARD_CONFIG) return;
  const reviewItems = (window.CARD_CONFIG.reviews || []).filter(item => item.show !== false);
  container.innerHTML = reviewItems.map(r => {
    const text = r[`text_${currentLang}`] || r.text_en || r.text || "";
    return `
      <div class="card review-card" style="padding:12px; margin-bottom:8px;">
        <div style="color:#f59e0b;">${"★".repeat(r.rating || 5)}</div>
        <p style="margin:4px 0; font-size:0.85rem;">"${text}"</p>
        <small style="color:#888;">— ${r.name}</small>
      </div>
    `;
  }).join("");
}

function renderFAQ() {
  const container = document.getElementById("faqContainer");
  if (!container || !window.CARD_CONFIG) return;
  const faqList = (window.CARD_CONFIG.faq || []).filter(f => f.show !== false);
  container.innerHTML = faqList.map((f, i) => {
    const q = f[`question_${currentLang}`] || f.question_en || f.question || "";
    const a = f[`answer_${currentLang}`] || f.answer_en || f.answer || "";
    return `
      <div class="faq-item" onclick="this.classList.toggle('active')">
        <div class="faq-question"><span>${q}</span><span class="faq-icon">+</span></div>
        <div class="faq-answer">${a}</div>
      </div>
    `;
  }).join("");
}
