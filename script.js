/* =========================================
SANDEEP ELECTROFIX - COMPLETE JAVASCRIPT
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
    materialCatalogue: "Material Catalogue",
    call: "Call",
    website: "Website",
    maps: "Google Maps",
    email: "Email",
    saveContact: "Save Contact",
    ourWorkNav: "Our Work",
    aboutHeading: "About Us",
    aboutText: "Welcome to <strong>Sandeep ElectroFix</strong>. We provide professional electrical services in Lucknow, including house wiring, false ceiling wiring, MCB & DB installation, fan and light fitting, inverter wiring, fault finding, repair, maintenance and electrical upgrades.",
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
    materialCatalogue: "सामग्री सूची",
    call: "कॉल करें",
    website: "वेबसाइट",
    maps: "गूगल मैप्स",
    email: "ईमेल",
    saveContact: "नंबर सेव करें",
    ourWorkNav: "हमारे कार्य",
    aboutHeading: "हमारे बारे में",
    aboutText: "<strong>संदीप इलेक्ट्रोफिक्स</strong> में आपका स्वागत है। हम लखनऊ में पेशेवर इलेक्ट्रीशियन सेवाएँ प्रदान करते हैं, जिसमें हाउस वायरिंग, फॉल्स सीलिंग वायरिंग, एमसीबी और डीबी इंस्टॉलेशन, पंखा और लाइट फिटिंग, इन्वर्टर वायरिंग, फॉल्ट रिपेयर और मेंटेनेंस शामिल हैं।",
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

// 2. Change Language Function
function setLanguage(lang) {
  const currentLang = translations[lang] ? lang : "en";
  const t = translations[currentLang];

  // Update innerHTML / text
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      el.innerHTML = t[key];
    }
  });

  // Update input placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key]) {
      el.placeholder = t[key];
    }
  });

  // Update button active state
  document.querySelectorAll(".language-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === currentLang);
  });

  localStorage.setItem("sandeepLang", currentLang);
  updateThemeButtonText();
}

// 3. Theme Toggle & Sync
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

// 4. Initialization on DOM Load
document.addEventListener("DOMContentLoaded", () => {
  // Theme setup
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.documentElement.classList.toggle("saved-light-theme");
      const isLight = document.documentElement.classList.contains("saved-light-theme");
      localStorage.setItem("sandeepTheme", isLight ? "light" : "dark");
      updateThemeButtonText();
    });
  }

  // Language setup
  document.querySelectorAll(".language-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      setLanguage(btn.getAttribute("data-lang"));
    });
  });

  const savedLang = localStorage.getItem("sandeepLang") || "en";
  setLanguage(savedLang);

  // Load Data
  loadServices();
  loadGallery();
  loadReviews();
  loadFAQ();
  setupQuoteCalculation();
});

// 5. Dynamic Data Loaders
async function loadServices() {
  const container = document.getElementById("serviceContainer");
  if (!container) return;
  try {
    const res = await fetch("data/services.json");
    const data = await res.json();
    container.innerHTML = data.map(s => `
      <div class="service-card">
        <span class="service-icon">${s.icon}</span>
        <strong>${s.name}</strong>
      </div>
    `).join("");
  } catch (e) {
    console.log("Services loaded from fallback");
  }
}

async function loadGallery() {
  const container = document.getElementById("galleryContainer");
  if (!container) return;
  try {
    const res = await fetch("data/gallery.json");
    const data = await res.json();
    container.innerHTML = data.map(g => `
      <img src="${g.image}" alt="${g.title}" onclick="openLightbox('${g.image}')" onerror="this.style.display='none'">
    `).join("");
  } catch (e) {
    console.log("Gallery fallback");
  }
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

async function loadReviews() {
  const container = document.getElementById("reviewContainer");
  if (!container) return;
  try {
    const res = await fetch("data/reviews.json");
    const data = await res.json();
    container.innerHTML = data.map(r => `
      <div class="card" style="text-align:left; padding:15px;">
        <div style="color:var(--gold); font-size:1.1rem;">${r.rating}</div>
        <p style="margin:6px 0; font-size:0.85rem;">"${r.review}"</p>
        <small style="color:var(--muted);">${r.name} - ${r.date}</small>
      </div>
    `).join("");
  } catch (e) {
    console.log("Reviews fallback");
  }
}

async function loadFAQ() {
  const container = document.getElementById("faqContainer");
  if (!container) return;
  try {
    const res = await fetch("data/faq.json");
    const data = await res.json();
    container.innerHTML = data.map((f, i) => `
      <div class="faq-item">
        <button class="faq-question" onclick="toggleFaq(${i})">
          <span>${f.question}</span>
          <span>+</span>
        </button>
        <div class="faq-answer" id="faq-ans-${i}">${f.answer}</div>
      </div>
    `).join("");
  } catch (e) {
    console.log("FAQ fallback");
  }
}

function toggleFaq(index) {
  const item = document.querySelectorAll(".faq-item")[index];
  if (item) item.classList.toggle("active");
}

// 6. WhatsApp Quote & Discount Handler
function setupQuoteCalculation() {
  const totalInput = document.getElementById("serviceTotal");
  const calcBox = document.getElementById("discountCalculation");
  const sendBtn = document.getElementById("sendQuoteBtn");

  totalInput?.addEventListener("input", () => {
    const val = parseFloat(totalInput.value);
    if (!isNaN(val) && val > 0) {
      const discount = val * 0.10;
      const finalPrice = val - discount;
      calcBox.style.display = "block";
      calcBox.innerHTML = `
        <div><span>Original Price:</span> <strong>₹${val.toFixed(2)}</strong></div>
        <div><span>Discount (10% OFF):</span> <strong>-₹${discount.toFixed(2)}</strong></div>
        <div class="final-price"><span>Net Payable:</span> <strong>₹${finalPrice.toFixed(2)}</strong></div>
      `;
    } else {
      calcBox.style.display = "none";
    }
  });

  sendBtn?.addEventListener("click", () => {
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const service = document.getElementById("serviceName").value;
    const total = document.getElementById("serviceTotal").value.trim();
    const msg = document.getElementById("customerMessage").value.trim();

    if (!name || !phone) {
      alert("Please provide your Name and Mobile Number.");
      return;
    }

    let text = `⚡ *Sandeep ElectroFix Enquiry* ⚡\n\n`;
    text += `👤 *Name:* ${name}\n`;
    text += `📞 *Phone:* ${phone}\n`;
    if (service) text += `🛠️ *Service:* ${service}\n`;
    if (total) {
      const val = parseFloat(total);
      const discount = val * 0.10;
      const finalPrice = val - discount;
      text += `💰 *Est. Amount:* ₹${val}\n`;
      text += `🎁 *Discount Applied (10%):* ₹${discount}\n`;
      text += `✅ *Final Quote:* ₹${finalPrice}\n`;
    }
    if (msg) text += `📝 *Message:* ${msg}\n`;

    window.open(`https://wa.me/919026036445?text=${encodeURIComponent(text)}`, "_blank");
  });
}
