/* =========================================
SANDEEP ELECTROFIX - COMPLETE JAVASCRIPT
Version 3.2 - Fully Connected with CARD_CONFIG
========================================= */

// 1. Translation Dictionary (English & Hindi)
const translations = {
  en: {
    tagline: "Powering Your Trust",
    location: "📍 Lucknow, Uttar Pradesh",
    callNow: "📞 Call Now",
    whatsapp: "💬 WhatsApp",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    specialOffer: "🔥 SPECIAL OFFER",
    discountTitle: "Special Discount",
    discountMessage: "Get 10% OFF on Electrical Services",
    discountValidity: "⏳ Limited Time Offer",
    getDiscountBtn: "⚡ Get Discount",
    quickAccess: "Quick Access",
    call: "Call",
    website: "Website",
    maps: "Google Maps",
    email: "Email",
    saveContact: "Save Contact",
    share: "Share",
    ourWorkNav: "Our Work",
    materialCatalogue: "Material Catalogue",
    aboutHeading: "About Us",
    aboutText: "Welcome to <strong>Sandeep ElectroFix</strong>. We provide professional electrical services in Lucknow, including house wiring, false ceiling wiring, MCB & DB installation, fan and light fitting, inverter wiring, fault finding, repair, maintenance and electrical upgrades.",
    locationTitle: "📍 Service Location",
    locationDesc: "Providing professional electrical services across Lucknow, Uttar Pradesh.",
    checkDistanceBtn: "Check Your Distance from Us",
    openMapsBtn: "Get Directions on Google Maps",
    scanQRTitle: "Scan QR Code",
    scanQRDesc: "Scan this QR code to quickly save our digital card or pay via UPI.",
    downloadQR: "📥 Download QR Code",
    ourServices: "Our Services",
    ourWork: "Our Work",
    customerReviews: "Customer Reviews",
    requestQuote: "Request a Quote",
    inputName: "Your Name",
    inputPhone: "Mobile Number",
    selectServiceDefault: "Select Service",
    inputTotal: "Estimated Total Amount (₹)",
    inputMessage: "Describe your electrical work...",
    sendQuoteBtn: "💬 Send Enquiry on WhatsApp",
    faqHeading: "Frequently Asked Questions",
    navHome: "Home",
    navServices: "Services",
    navWork: "Work",
    navQuote: "Quote",
    navCall: "Call"
  },
  hi: {
    tagline: "आपके विश्वास को रोशन करते हुए",
    location: "📍 लखनऊ, उत्तर प्रदेश",
    callNow: "📞 अभी कॉल करें",
    whatsapp: "💬 व्हाट्सएप करें",
    lightMode: "लाइट मोड",
    darkMode: "डार्क मोड",
    specialOffer: "🔥 विशेष ऑफर",
    discountTitle: "विशेष छूट",
    discountMessage: "इलेक्ट्रिकल सेवाओं पर 10% की भारी छूट पाएं",
    discountValidity: "⏳ सीमित समय के लिए",
    getDiscountBtn: "⚡ छूट प्राप्त करें",
    quickAccess: "त्वरित सेवाएँ",
    call: "कॉल करें",
    website: "वेबसाइट",
    maps: "गूगल मैप्स",
    email: "ईमेल",
    saveContact: "नंबर सेव करें",
    share: "शेयर करें",
    ourWorkNav: "हमारे कार्य",
    materialCatalogue: "सामग्री सूची",
    aboutHeading: "हमारे बारे में",
    aboutText: "<strong>संदीप इलेक्ट्रोफिक्स</strong> में आपका स्वागत है। हम लखनऊ में पेशेवर इलेक्ट्रीशियन सेवाएँ प्रदान करते हैं, जिसमें हाउस वायरिंग, फॉल्स सीलिंग वायरिंग, एमसीबी और डीबी इंस्टॉलेशन, पंखा और लाइट फिटिंग, इन्वर्टर वायरिंग, फॉल्ट रिपेयर और मेंटेनेंस शामिल हैं।",
    locationTitle: "📍 सेवा क्षेत्र एवं लोकेशन",
    locationDesc: "पूरे लखनऊ और आसपास के क्षेत्रों में ऑन-साइट इलेक्ट्रीशियन सेवा उपलब्ध।",
    checkDistanceBtn: "हमारे यहाँ से अपनी दूरी चेक करें",
    openMapsBtn: "गूगल मैप्स पर रास्ता देखें",
    scanQRTitle: "क्यूआर कोड स्कैन करें",
    scanQRDesc: "हमारा डिजिटल कार्ड सेव करने या भुगतान के लिए यह क्यूआर कोड स्कैन करें।",
    downloadQR: "📥 क्यूआर कोड डाउनलोड करें",
    ourServices: "हमारी सेवाएँ",
    ourWork: "हमारे द्वारा किए गए कार्य",
    customerReviews: "ग्राहकों की राय",
    requestQuote: "कोटेशन प्राप्त करें",
    inputName: "आपका नाम",
    inputPhone: "मोबाइल नंबर",
    selectServiceDefault: "सेवा चुनें",
    inputTotal: "अनुमानित कुल राशि (₹)",
    inputMessage: "अपने इलेक्ट्रिकल कार्य के बारे में बताएं...",
    sendQuoteBtn: "💬 व्हाट्सएप पर जानकारी भेजें",
    faqHeading: "अक्सर पूछे जाने वाले सवाल",
    navHome: "होम",
    navServices: "सेवाएं",
    navWork: "कार्य",
    navQuote: "कोट",
    navCall: "कॉल"
  }
};

// 2. Language Switcher Function
function setLanguage(lang) {
  const currentLang = translations[lang] ? lang : "en";
  const t = translations[currentLang];

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.innerHTML = t[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key]) el.placeholder = t[key];
  });

  document.querySelectorAll(".language-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === currentLang);
  });

  localStorage.setItem("sandeepLang", currentLang);
  updateThemeButtonText();
  renderFAQ();
}

// 3. Theme Toggle & UI Update
function updateThemeButtonText() {
  const isLight = document.documentElement.classList.contains("saved-light-theme");
  const currentLang = localStorage.getItem("sandeepLang") || "en";
  const themeTextEl = document.getElementById("themeText");
  const themeIconEl = document.getElementById("themeIcon");

  if (themeTextEl && themeIconEl) {
    if (isLight) {
      themeIconEl.innerText = "🌙";
      themeTextEl.innerText = translations[currentLang].darkMode;
    } else {
      themeIconEl.innerText = "☀️";
      themeTextEl.innerText = translations[currentLang].lightMode;
    }
  }
}

// 4. Initialization
document.addEventListener("DOMContentLoaded", () => {
  applyVisibilityControls();

  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.documentElement.classList.toggle("saved-light-theme");
      const isLight = document.documentElement.classList.contains("saved-light-theme");
      localStorage.setItem("sandeepTheme", isLight ? "light" : "dark");
      updateThemeButtonText();
    });
  }

  document.querySelectorAll(".language-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      setLanguage(btn.getAttribute("data-lang"));
    });
  });

  const savedLang = localStorage.getItem("sandeepLang") || "en";
  setLanguage(savedLang);

  setupQuickAccessLayoutSwitcher();
  setupServiceLayoutSwitcher();

  loadServices();
  loadGallery();
  loadReviews();
  renderFAQ();
  setupQuoteCalculation();
});

// 5. Apply Global Feature & Element Toggles
function applyVisibilityControls() {
  const config = window.CARD_CONFIG;
  if (!config) return;

  const toggleElem = (id, condition) => {
    const el = document.getElementById(id);
    if (el) el.style.display = condition ? "" : "none";
  };

  // Main Section Visibility
  if (config.features) {
    toggleElem("heroSection", config.features.heroSection);
    toggleElem("quickAccessBar", config.features.quickAccessBar);
    toggleElem("themeToggle", config.features.themeToggle);
    toggleElem("languageSwitcher", config.features.languageSwitch);
    toggleElem("discountSection", config.features.discountOffer);
    toggleElem("servicesSection", config.features.servicesSection);
    toggleElem("gallerySection", config.features.gallerySection);
    toggleElem("reviewsSection", config.features.reviewsSection);
    toggleElem("quoteFormSection", config.features.quoteFormSection);
    toggleElem("faqSection", config.features.faqSection);
    toggleElem("locationSection", config.features.locationTracker);
    toggleElem("footerSection", config.features.footerSection);
    toggleElem("mobileBottomNav", config.features.mobileBottomNav);
  }

  // Business Elements & Quick Action Toggles
  if (config.business && config.business.showElements) {
    const el = config.business.showElements;
    toggleElem("businessLogo", el.logo);
    toggleElem("businessTagline", el.tagline);
    toggleElem("businessLocation", el.location);
    toggleElem("callBtn", el.phoneCall);
    toggleElem("whatsappBtn", el.whatsappChat);
    toggleElem("emailBtn", el.email);
    toggleElem("websiteBtn", el.website);
    toggleElem("mapsBtn", el.googleMaps);
    toggleElem("facebookBtn", el.facebook);
    toggleElem("instagramBtn", el.instagram);
    toggleElem("youtubeBtn", el.youtube);
    toggleElem("cardQRContainer", el.cardQR);
    toggleElem("saveContactBtn", el.saveContactBtn);
    toggleElem("shareBtn", el.shareBtn);
  }
}

// 6. Quick Access Layout Switcher
function setupQuickAccessLayoutSwitcher() {
  const container = document.getElementById("quickGridContainer");
  const buttons = document.querySelectorAll("#quickLayoutBar .layout-btn");
  if (!container || !buttons.length) return;

  function applyQuickLayout(layoutName) {
    container.classList.remove("layout-grid-2", "layout-carousel", "layout-list", "layout-grid-3");
    container.classList.add(`layout-${layoutName}`);

    buttons.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-quick-layout") === layoutName);
    });

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

// 7. Services Layout Switcher
function setupServiceLayoutSwitcher() {
  const container = document.getElementById("serviceContainer");
  const buttons = document.querySelectorAll("#servicesLayoutBar .layout-btn");
  if (!container || !buttons.length) return;

  function applyServiceLayout(layoutName) {
    container.classList.remove("layout-grid-2", "layout-carousel", "layout-list", "layout-grid-3");
    container.classList.add(`layout-${layoutName}`);

    buttons.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-service-layout") === layoutName);
    });

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

// 8. Services Loader (Reads from CARD_CONFIG & handles Open/Close Toggle)
function loadServices() {
  const container = document.getElementById("serviceContainer");
  const serviceSelect = document.getElementById("serviceName");
  if (!container || !window.CARD_CONFIG) return;

  const services = window.CARD_CONFIG.services || [];
  const settings = window.CARD_CONFIG.serviceSettings || {
    showCategoryDescription: true,
    showSubItems: true,
    showPrices: true
  };

  container.innerHTML = "";
  if (serviceSelect) {
    serviceSelect.innerHTML = `<option value="">Select Service</option>`;
  }

  services.forEach((service, index) => {
    if (service.show === false) return;

    // Populate Quote dropdown
    if (serviceSelect) {
      const opt = document.createElement("option");
      opt.value = service.title;
      opt.textContent = service.title;
      serviceSelect.appendChild(opt);
    }

    // Filter sub-services
    const visibleSubServices = (service.subServices || []).filter(sub => sub.show !== false);

    const subListHtml = (settings.showSubItems && visibleSubServices.length > 0)
      ? `
        <div class="sub-services-list">
          ${visibleSubServices.map(sub => `
            <div class="sub-service-item">
              <span class="sub-name">• ${sub.name}</span>
              ${settings.showPrices ? `<span class="sub-rate">${sub.rate}</span>` : ""}
            </div>
          `).join("")}
        </div>
      `
      : "";

    const descHtml = (settings.showCategoryDescription && service.description)
      ? `<p class="service-desc">${service.description}</p>`
      : "";

    const card = document.createElement("div");
    card.className = "service-card";
    card.id = `service-${service.id || index}`;
    card.innerHTML = `
      <div class="service-header" onclick="toggleServiceDetails(this)">
        <div class="service-title-wrap">
          <span class="service-icon">${service.icon}</span>
          <h3 class="service-title">${service.title}</h3>
        </div>
        <span class="toggle-arrow">▼</span>
      </div>
      <div class="service-body">
        ${descHtml}
        ${subListHtml}
      </div>
    `;

    container.appendChild(card);
  });
}

// Function to toggle accordion open/close
function toggleServiceDetails(headerElement) {
  const card = headerElement.closest(".service-card");
  if (card) {
    card.classList.toggle("open");
  }
}

// 9. Gallery Loader
function loadGallery() {
  const container = document.getElementById("galleryContainer");
  if (!container || !window.CARD_CONFIG) return;

  const galleryItems = (window.CARD_CONFIG.gallery || []).filter(item => item.show !== false);
  container.innerHTML = galleryItems.map(g => `
    <div class="gallery-item">
      <img src="${g.image}" alt="${g.title}" onclick="openLightbox('${g.image}')" onerror="this.parentElement.style.display='none'">
      <div class="gallery-title">${g.title}</div>
    </div>
  `).join("");
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

// 10. Reviews Loader
function loadReviews() {
  const container = document.getElementById("reviewContainer");
  if (!container || !window.CARD_CONFIG) return;

  const reviewItems = (window.CARD_CONFIG.reviews || []).filter(item => item.show !== false);
  container.innerHTML = reviewItems.map(r => `
    <div class="card review-card" style="text-align:left; padding:15px; margin-bottom:10px;">
      <div style="color:#f59e0b; font-size:1.1rem;">${"★".repeat(r.rating || 5)}</div>
      <p style="margin:6px 0; font-size:0.9rem;">"${r.text}"</p>
      <small style="color:#888;">— ${r.name}</small>
    </div>
  `).join("");
}

// 11. GPS Distance Calculator
function getUserLocation() {
  const status = document.getElementById("locationStatus");
  if (!navigator.geolocation) {
    status.innerText = "Geolocation is not supported by your browser.";
    return;
  }
  status.innerText = "Locating your distance...";
  
  const shopLat = 26.8467;
  const shopLon = 80.9462;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;
      
      const R = 6371;
      const dLat = (userLat - shopLat) * (Math.PI / 180);
      const dLon = (userLon - shopLon) * (Math.PI / 180);
      const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(shopLat * (Math.PI / 180)) * Math.cos(userLat * (Math.PI / 180)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = (R * c).toFixed(1);

      status.innerHTML = `✅ You are approx <strong>${distance} km</strong> away from our service hub in Lucknow.`;
    },
    () => {
      status.innerText = "Location permission denied or unavailable.";
    }
  );
}

// 12. FAQ Renderer (Reads directly from CARD_CONFIG)
function renderFAQ() {
  const container = document.getElementById("faqContainer");
  if (!container || !window.CARD_CONFIG) return;

  const faqList = (window.CARD_CONFIG.faq || []).filter(f => f.show !== false);
  container.innerHTML = faqList.map((f, i) => `
    <div class="faq-item" id="faq-item-${i}">
      <button class="faq-question" onclick="toggleFaq(${i})">
        <span>${f.question}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer">${f.answer}</div>
    </div>
  `).join("");
}

function toggleFaq(index) {
  const item = document.getElementById(`faq-item-${index}`);
  if (item) item.classList.toggle("active");
}

// 13. Share Website
function shareWebsite() {
  if (navigator.share) {
    navigator.share({
      title: window.CARD_CONFIG?.business?.name || 'Sandeep ElectroFix',
      text: 'Professional Electrical Services in Lucknow. House wiring, Repair, Fitting & Maintenance.',
      url: window.location.href
    }).catch((error) => console.log('Share canceled', error));
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert('Website link copied to clipboard!');
  }
}

// 14. WhatsApp Quote & Calculation
function setupQuoteCalculation() {
  const totalInput = document.getElementById("serviceTotal");
  const calcBox = document.getElementById("discountCalculation");
  const sendBtn = document.getElementById("sendQuoteBtn");

  const discountPercent = window.CARD_CONFIG?.discount?.percentage || 10;

  totalInput?.addEventListener("input", () => {
    const val = parseFloat(totalInput.value);
    if (!isNaN(val) && val > 0) {
      const discount = val * (discountPercent / 100);
      const finalPrice = val - discount;
      calcBox.style.display = "block";
      calcBox.innerHTML = `
        <div><span>Original Price:</span> <strong>₹${val.toFixed(2)}</strong></div>
        <div><span>Discount (${discountPercent}% OFF):</span> <strong>-₹${discount.toFixed(2)}</strong></div>
        <div class="final-price"><span>Net Payable:</span> <strong>₹${finalPrice.toFixed(2)}</strong></div>
      `;
    } else {
      calcBox.style.display = "none";
    }
  });

  sendBtn?.addEventListener("click", () => {
    const name = document.getElementById("customerName")?.value.trim() || "";
    const phone = document.getElementById("customerPhone")?.value.trim() || "";
    const service = document.getElementById("serviceName")?.value || "";
    const total = document.getElementById("serviceTotal")?.value.trim() || "";
    const msg = document.getElementById("customerMessage")?.value.trim() || "";

    const quoteCfg = window.CARD_CONFIG?.quote || {};

    if (quoteCfg.requireName && !name) {
      alert("Please provide your Name.");
      return;
    }
    if (quoteCfg.requirePhone && !phone) {
      alert("Please provide your Mobile Number.");
      return;
    }
    if (quoteCfg.requireService && !service) {
      alert("Please select a Service.");
      return;
    }

    let text = `⚡ *${window.CARD_CONFIG?.business?.name || "Sandeep ElectroFix"} Enquiry* ⚡\n\n`;
    text += `👤 *Name:* ${name}\n`;
    text += `📞 *Phone:* ${phone}\n`;
    if (service) text += `🛠️ *Service:* ${service}\n`;
    if (total) {
      const val = parseFloat(total);
      const discount = val * (discountPercent / 100);
      const finalPrice = val - discount;
      text += `💰 *Est. Amount:* ₹${val}\n`;
      text += `🎁 *Discount Applied (${discountPercent}%):* ₹${discount}\n`;
      text += `✅ *Final Quote:* ₹${finalPrice}\n`;
    }
    if (msg) text += `📝 *Message:* ${msg}\n`;

    const waNum = quoteCfg.whatsappNumber || window.CARD_CONFIG?.business?.whatsapp || "919026036445";
    window.open(`https://wa.me/${waNum}?text=${encodeURIComponent(text)}`, "_blank");
  });
}
