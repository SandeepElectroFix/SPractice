/* =========================================
SANDEEP ELECTROFIX - COMPLETE JAVASCRIPT
========================================= */

// 1. Full Translation Dictionary (English & Hindi)
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
    navCall: "Call",
    faqs: [
      {
        question: "Do you provide complete house wiring services?",
        answer: "Yes, we provide full house wiring for new homes, conduit piping, modular switch fitting, and renovation wiring."
      },
      {
        question: "Do you handle emergency short circuits & fault finding?",
        answer: "Yes, our team quickly diagnoses MCB tripping, electrical line faults, short circuits, and restores power safely."
      },
      {
        question: "Is installation available for lights, fans, and appliances?",
        answer: "Yes, we install false ceiling lights, chandeliers, profile lights, ceiling fans, switchboards, and inverters."
      },
      {
        question: "How can I calculate or get a work estimate?",
        answer: "You can use our WhatsApp Quote form below or directly call us for an instant estimate with special discounts."
      },
      {
        question: "Which areas in Lucknow do you cover?",
        answer: "Sandeep ElectroFix provides fast on-site electrician services across all locations in Lucknow, Uttar Pradesh."
      }
    ]
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
    navCall: "कॉल",
    faqs: [
      {
        question: "क्या आप नए मकान की पूरी हाउस वायरिंग करते हैं?",
        answer: "हाँ, नए मकान की अंडरग्राउंड पाइपिंग, कन्सिल्ड वायरिंग, मॉड्यूलर स्विच बोर्ड और रिनोवेशन का पूरा काम किया जाता है।"
      },
      {
        question: "क्या शॉर्ट सर्किट और लाइन फॉल्ट की रिपेयरिंग होती है?",
        answer: "हाँ, एमसीबी ट्रिपिंग, शॉर्ट सर्किट, पावर लीकेज और लाइन फॉल्ट को तुरंत टेस्ट करके सही किया जाता है।"
      },
      {
        question: "पंखा, लाइट, झूमर और इन्वर्टर फिटिंग की सुविधा है?",
        answer: "हाँ, फॉल्स सीलिंग लाइट्स, प्रोफाइल लाइट, सीलिंग फैन, स्विच बोर्ड और इन्वर्टर वायरिंग का काम किया जाता है।"
      },
      {
        question: "काम का खर्च या एस्टीमेट कैसे पता करें?",
        answer: "आप नीचे दिए गए कोटेशन फॉर्म से अनुमानित रेट देख सकते हैं या सीधे कॉल करके जानकारी ले सकते हैं।"
      },
      {
        question: "क्या आप पूरे लखनऊ में अपनी सेवा देते हैं?",
        answer: "हाँ, संदीप इलेक्ट्रोफिक्स पूरे लखनऊ और आसपास के सभी इलाकों में ऑन-साइट इलेक्ट्रिशियन सेवा देता है।"
      }
    ]
  }
};

// 2. Change Language Function
function setLanguage(lang) {
  const currentLang = translations[lang] ? lang : "en";
  const t = translations[currentLang];

  // Update text with data-i18n
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
  renderFAQ(currentLang);
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

  // Layout Switchers Setup
  setupQuickAccessLayoutSwitcher();
  setupServiceLayoutSwitcher();

  // Dynamic Content Loaders
  loadServices();
  loadGallery();
  loadReviews();
  setupQuoteCalculation();
});

// 5. Quick Access Layout Switcher
function setupQuickAccessLayoutSwitcher() {
  const container = document.getElementById("quickGridContainer");
  const buttons = document.querySelectorAll("[data-quick-layout]");
  if (!container || !buttons.length) return;

  function applyQuickLayout(layoutName) {
    container.className = `grid layout-${layoutName}`;
    buttons.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-quick-layout") === layoutName);
    });
    localStorage.setItem("sandeepQuickLayout", layoutName);
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      applyQuickLayout(btn.getAttribute("data-quick-layout"));
    });
  });

  const savedLayout = localStorage.getItem("sandeepQuickLayout") || "grid-2";
  applyQuickLayout(savedLayout);
}

// 6. Services Layout Switcher
function setupServiceLayoutSwitcher() {
  const container = document.getElementById("serviceContainer");
  const buttons = document.querySelectorAll("[data-service-layout]");
  if (!container || !buttons.length) return;

  function applyServiceLayout(layoutName) {
    container.className = `service-grid layout-${layoutName}`;
    buttons.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-service-layout") === layoutName);
    });
    localStorage.setItem("sandeepServiceLayout", layoutName);
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      applyServiceLayout(btn.getAttribute("data-service-layout"));
    });
  });

  const savedLayout = localStorage.getItem("sandeepServiceLayout") || "grid-2";
  applyServiceLayout(savedLayout);
}

// 7. Dynamic Loaders
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
    console.log("Services loaded");
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
    console.log("Gallery loaded");
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
    console.log("Reviews loaded");
  }
}

// 8. Bilingual FAQ Renderer
function renderFAQ(lang) {
  const container = document.getElementById("faqContainer");
  if (!container) return;
  const faqList = translations[lang].faqs;
  container.innerHTML = faqList.map((f, i) => `
    <div class="faq-item">
      <button class="faq-question" onclick="toggleFaq(${i})">
        <span>${f.question}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer">${f.answer}</div>
    </div>
  `).join("");
}

function toggleFaq(index) {
  const items = document.querySelectorAll(".faq-item");
  if (items[index]) {
    items[index].classList.toggle("active");
  }
}

// 9. Share Functionality
function shareWebsite() {
  if (navigator.share) {
    navigator.share({
      title: 'Sandeep ElectroFix - Electrician Services',
      text: 'Professional Electrical Services in Lucknow. House wiring, Repair, Fitting & Maintenance.',
      url: window.location.href
    }).catch((error) => console.log('Share canceled', error));
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert('Website link copied to clipboard!');
  }
}

// 10. WhatsApp Quote & Discount Handler
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
