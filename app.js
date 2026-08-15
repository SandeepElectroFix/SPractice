/* =========================================
SANDEEP ELECTROFIX - APP.JS (Full Bilingual Support)
========================================= */

let currentLang = localStorage.getItem("sandeepLang") || "hi";
let selectedItemsMap = {}; // { [itemId]: { name_en, name_hi, price, rate_en, rate_hi, category_en, category_hi, qty } }

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

document.addEventListener("DOMContentLoaded", () => {
  applyVisibilityControls();
  setLanguage(currentLang);

  document.querySelectorAll(".language-btn").forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.getAttribute("data-lang")));
  });

  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.documentElement.classList.toggle("saved-light-theme");
      const isLight = document.documentElement.classList.contains("saved-light-theme");
      localStorage.setItem("sandeepTheme", isLight ? "light" : "dark");
      updateThemeButtonText();
    });
  }

  setupQuoteActions();
});

function setLanguage(lang) {
  currentLang = lang === "en" ? "en" : "hi";
  localStorage.setItem("sandeepLang", currentLang);

  document.querySelectorAll(".language-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === currentLang);
  });

  const t = UI_TEXT[currentLang];
  const cfg = window.CARD_CONFIG;

  // Static UI updates
  const setElemText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = text;
  };
  const setElemPlaceholder = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.placeholder = text;
  };

  setElemText("businessTagline", cfg?.business?.[`tagline_${currentLang}`] || t.tagline);
  setElemText("businessLocation", cfg?.business?.[`location_${currentLang}`] || t.location);
  setElemText("callBtnText", t.callNow);
  setElemText("whatsappBtnText", t.whatsapp);
  setElemText("servicesHeading", t.ourServices);
  setElemText("faqHeading", t.faqHeading);
  setElemText("sendWhatsappBtn", t.sendWhatsApp);
  setElemText("downloadPdfBtn", t.downloadPDF);

  setElemPlaceholder("customerName", t.namePlaceholder);
  setElemPlaceholder("customerPhone", t.phonePlaceholder);
  setElemPlaceholder("customerMessage", t.notePlaceholder);

  // Discount text
  if (cfg?.discount) {
    setElemText("discountTitle", cfg.discount[`title_${currentLang}`]);
    setElemText("discountMessage", cfg.discount[`message_${currentLang}`]);
    setElemText("discountValidity", cfg.discount[`validity_${currentLang}`]);
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

function applyVisibilityControls() {
  const cfg = window.CARD_CONFIG;
  if (!cfg) return;
  const toggle = (id, condition) => {
    const el = document.getElementById(id);
    if (el) el.style.display = condition ? "" : "none";
  };

  if (cfg.features) {
    toggle("heroSection", cfg.features.heroSection);
    toggle("discountSection", cfg.features.discountOffer && cfg.discount?.show);
    toggle("servicesSection", cfg.features.servicesSection);
    toggle("gallerySection", cfg.features.gallerySection);
    toggle("reviewsSection", cfg.features.reviewsSection);
    toggle("quoteFormSection", cfg.features.quoteFormSection);
    toggle("faqSection", cfg.features.faqSection);
  }
}

function loadServices() {
  const container = document.getElementById("serviceContainer");
  if (!container || !window.CARD_CONFIG) return;

  const services = window.CARD_CONFIG.services || [];
  container.innerHTML = "";

  services.forEach((service, sIndex) => {
    if (service.show === false) return;

    const visibleSub = (service.subServices || []).filter(sub => sub.show !== false);
    const subListHtml = visibleSub.map((sub, subIndex) => {
      const itemId = `item_${sIndex}_${subIndex}`;
      const savedQty = selectedItemsMap[itemId]?.qty || 0;
      const subName = sub[`name_${currentLang}`] || sub.name_en;
      const subRate = sub[`rate_${currentLang}`] || sub.rate_en;

      return `
        <div class="sub-service-item ${savedQty > 0 ? 'has-qty' : ''}" id="row_${itemId}">
          <div class="sub-service-info">
            <span class="sub-name">${subName}</span>
            <span class="sub-rate">${subRate}</span>
          </div>
          <div class="qty-control">
            <button type="button" class="qty-btn minus-btn" onclick="updateQty('${itemId}', -1, ${sub.price}, '${sIndex}', '${subIndex}')">−</button>
            <span class="qty-val" id="qty_${itemId}">${savedQty}</span>
            <button type="button" class="qty-btn plus-btn" onclick="updateQty('${itemId}', 1, ${sub.price}, '${sIndex}', '${subIndex}')">+</button>
          </div>
        </div>
      `;
    }).join("");

    const title = service[`title_${currentLang}`] || service.title_en;
    const desc = service[`desc_${currentLang}`] || service.desc_en;

    const card = document.createElement("div");
    card.className = "service-card";
    card.innerHTML = `
      <div class="service-header" onclick="this.parentElement.classList.toggle('open')">
        <div class="service-title-wrap">
          <span class="service-icon">${service.icon}</span>
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

function updateQty(itemId, change, price, sIndex, subIndex) {
  const service = window.CARD_CONFIG.services[sIndex];
  const sub = service.subServices[subIndex];

  if (!selectedItemsMap[itemId]) {
    selectedItemsMap[itemId] = {
      name_en: sub.name_en,
      name_hi: sub.name_hi,
      category_en: service.title_en,
      category_hi: service.title_hi,
      rate_en: sub.rate_en,
      rate_hi: sub.rate_hi,
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
    subtotalEl.innerText = "₹0";
    if (discountRow) discountRow.style.display = "none";
    grandTotalEl.innerText = "₹0";
    return;
  }

  listContainer.innerHTML = items.map(item => `
    <div class="summary-item">
      <span>• ${item[`name_${currentLang}`]} × <strong>${item.qty}</strong></span>
      <strong>₹${item.price * item.qty}</strong>
    </div>
  `).join("");

  const subtotal = items.reduce((sum, itm) => sum + (itm.price * itm.qty), 0);
  subtotalEl.innerText = `₹${subtotal}`;

  const discountCfg = window.CARD_CONFIG?.discount || {};
  const isDiscountActive = discountCfg.show === true && discountCfg.percentage > 0;

  let discountAmount = 0;
  if (isDiscountActive) {
    discountAmount = Math.round(subtotal * (discountCfg.percentage / 100));
    if (discountRow) {
      discountRow.style.display = "flex";
      discountLabel.innerText = `${t.discount} (${discountCfg.percentage}% OFF):`;
      discountEl.innerText = `-₹${discountAmount}`;
    }
  } else {
    if (discountRow) discountRow.style.display = "none";
  }

  const grandTotal = subtotal - discountAmount;
  grandTotalEl.innerText = `₹${grandTotal}`;
}

function setupQuoteActions() {
  document.getElementById("sendWhatsappBtn")?.addEventListener("click", sendWhatsappQuote);
  document.getElementById("downloadPdfBtn")?.addEventListener("click", generateEstimatePDF);
}

function sendWhatsappQuote() {
  const t = UI_TEXT[currentLang];
  const name = document.getElementById("customerName")?.value.trim();
  const phone = document.getElementById("customerPhone")?.value.trim();
  const note = document.getElementById("customerMessage")?.value.trim();
  const items = Object.values(selectedItemsMap);

  if (!name || !phone) {
    alert(t.alertMissing);
    return;
  }
  if (items.length === 0) {
    alert(t.alertEmpty);
    return;
  }

  const subtotal = items.reduce((sum, itm) => sum + (itm.price * itm.qty), 0);
  const discountCfg = window.CARD_CONFIG?.discount || {};
  const isDiscountActive = discountCfg.show === true && discountCfg.percentage > 0;
  const discountAmount = isDiscountActive ? Math.round(subtotal * (discountCfg.percentage / 100)) : 0;
  const grandTotal = subtotal - discountAmount;

  let text = `⚡ *${window.CARD_CONFIG?.business?.name || "Sandeep ElectroFix"} - ${t.estimateFor}* ⚡\n\n`;
  text += `👤 *${currentLang === 'en' ? 'Customer' : 'ग्राहक'}:* ${name}\n`;
  text += `📞 *${currentLang === 'en' ? 'Mobile' : 'मोबाइल'}:* ${phone}\n`;
  if (note) text += `📍 *${currentLang === 'en' ? 'Site / Note' : 'पता / नोट'}:* ${note}\n`;
  text += `\n📋 *${currentLang === 'en' ? 'Selected Services' : 'चुनी गई सेवाएँ'}:*\n`;

  items.forEach((item, i) => {
    const sName = item[`name_${currentLang}`];
    const sRate = item[`rate_${currentLang}`];
    text += `${i + 1}. ${sName} [Qty: ${item.qty}] — ₹${item.price * item.qty} (${sRate})\n`;
  });

  text += `\n💵 *${currentLang === 'en' ? 'Subtotal' : 'सबटोटल'}:* ₹${subtotal}\n`;
  if (isDiscountActive) {
    text += `🎁 *${currentLang === 'en' ? 'Discount' : 'छूट'} (${discountCfg.percentage}%):* -₹${discountAmount}\n`;
  }
  text += `✅ *${currentLang === 'en' ? 'Grand Total' : 'अंतिम राशि'}:* ₹${grandTotal}\n`;

  const waNumber = window.CARD_CONFIG?.quote?.whatsappNumber || "919026036445";
  window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, "_blank");
}

function generateEstimatePDF() {
  const { jsPDF } = window.jspdf;
  if (!jsPDF) {
    alert("PDF library error.");
    return;
  }

  const t = UI_TEXT[currentLang];
  const name = document.getElementById("customerName")?.value.trim() || "Customer";
  const phone = document.getElementById("customerPhone")?.value.trim() || "N/A";
  const note = document.getElementById("customerMessage")?.value.trim() || "N/A";
  const items = Object.values(selectedItemsMap);

  if (items.length === 0) {
    alert(t.alertEmpty);
    return;
  }

  const doc = new jsPDF();
  const biz = window.CARD_CONFIG?.business || {};
  const discountCfg = window.CARD_CONFIG?.discount || {};

  doc.setFillColor(5, 8, 22);
  doc.rect(0, 0, 210, 40, "F");

  doc.setTextColor(245, 197, 66);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(biz.name || "Sandeep ElectroFix", 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.text(`Phone: ${biz.phone} | Lucknow, UP`, 14, 28);
  doc.text(`Date: ${new Date().toLocaleDateString("en-IN")}`, 160, 28);

  doc.setTextColor(16, 24, 39);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("ESTIMATE SUMMARY", 14, 52);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Client: ${name}`, 14, 60);
  doc.text(`Phone: ${phone}`, 14, 66);
  doc.text(`Address / Note: ${note}`, 14, 72);

  const tableRows = items.map((item, index) => [
    index + 1,
    item.name_en,
    `Rs. ${item.price}`,
    item.qty,
    `Rs. ${item.price * item.qty}`
  ]);

  const subtotal = items.reduce((sum, itm) => sum + (itm.price * itm.qty), 0);
  const isDiscountActive = discountCfg.show === true && discountCfg.percentage > 0;
  const discountAmount = isDiscountActive ? Math.round(subtotal * (discountCfg.percentage / 100)) : 0;
  const grandTotal = subtotal - discountAmount;

  doc.autoTable({
    startY: 80,
    head: [["#", "Service Item", "Rate", "Qty", "Total Amount"]],
    body: tableRows,
    theme: "grid",
    headStyles: { fillColor: [5, 8, 22], textColor: [245, 197, 66], fontStyle: "bold" },
    styles: { fontSize: 9, cellPadding: 4 }
  });

  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(10);
  doc.text(`Subtotal: Rs. ${subtotal}`, 140, finalY);
  let nextY = finalY + 6;

  if (isDiscountActive) {
    doc.setTextColor(37, 211, 102);
    doc.text(`Discount (${discountCfg.percentage}%): -Rs. ${discountAmount}`, 140, nextY);
    nextY += 6;
  }

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(16, 24, 39);
  doc.text(`Grand Total: Rs. ${grandTotal}`, 140, nextY);

  doc.save(`Estimate_${name.replace(/\s+/g, "_")}.pdf`);
}

function loadGallery() {
  const container = document.getElementById("galleryContainer");
  if (!container || !window.CARD_CONFIG) return;
  const galleryItems = (window.CARD_CONFIG.gallery || []).filter(item => item.show !== false);
  container.innerHTML = galleryItems.map(g => `
    <div class="gallery-item"><img src="${g.image}" alt="${g[`title_${currentLang}`]}"><div class="gallery-title">${g[`title_${currentLang}`]}</div></div>
  `).join("");
}

function loadReviews() {
  const container = document.getElementById("reviewContainer");
  if (!container || !window.CARD_CONFIG) return;
  const reviewItems = (window.CARD_CONFIG.reviews || []).filter(item => item.show !== false);
  container.innerHTML = reviewItems.map(r => `
    <div class="card review-card" style="padding:12px; margin-bottom:8px;">
      <div style="color:#f59e0b;">${"★".repeat(r.rating || 5)}</div>
      <p style="margin:4px 0; font-size:0.85rem;">"${r[`text_${currentLang}`]}"</p>
      <small style="color:#888;">— ${r.name}</small>
    </div>
  `).join("");
}

function renderFAQ() {
  const container = document.getElementById("faqContainer");
  if (!container || !window.CARD_CONFIG) return;
  const faqList = (window.CARD_CONFIG.faq || []).filter(f => f.show !== false);
  container.innerHTML = faqList.map((f, i) => `
    <div class="faq-item" onclick="this.classList.toggle('active')">
      <div class="faq-question"><span>${f[`question_${currentLang}`]}</span><span class="faq-icon">+</span></div>
      <div class="faq-answer">${f[`answer_${currentLang}`]}</div>
    </div>
  `).join("");
}
