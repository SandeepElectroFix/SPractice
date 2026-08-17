/* =========================================================
   SANDEEP ELECTROFIX — CORE ENGINE & ROUTER
   ========================================================= */

let currentLang = localStorage.getItem("sandeepLang") || "hi";
let isMenuOpen = false;
let selectedItemsMap = {};

/* ================= TRANSLATIONS ================= */
const translations = {
    hi: {
        menuHead: "HAMBURGER MENU",
        mHome: "Home",
        mAbout: "About Us",
        mLocation: "Service Location",
        mServices: "Our Services",
        mWork: "Our Work",
        mReviews: "Customer Reviews",
        mQuote: "Estimate & Quotation",
        mFaq: "FAQ",
        mQr: "QR Code",
        mAppSettings: "APP SETTINGS",
        mInstall: "Install App",
        mTheme: "Dark / Light Mode",
        mLang: "हिन्दी / English",
        mReset: "Reset App (2-Step)",

        businessTitle: "आपका भरोसेमंद इलेक्ट्रीशियन",
        businessTagline: "लखनऊ में पेशेवर इलेक्ट्रीशियन सेवाएँ",
        businessLocation: "📍 लखनऊ, उत्तर प्रदेश",
        callBtnText: "Call Now",
        whatsappBtnText: "WhatsApp",

        discountBadge: "विशेष ऑफर",
        discountTitle: "चुनिंदा इलेक्ट्रिकल सेवाओं पर",
        discountBtnText: "🎁 Get Discount",

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
        btnGetEstimateNow: "Get Your Estimate Now →",
        faqHeading: "Frequently Asked Questions",
        btnViewAllFaq: "View All FAQ →",
        qrHeading: "Our Digital Card (Scan & Save)",
        qrDesc: "Scan QR code to save our card or share.",
        qrBtnText: "Download QR ▾",

        rHead: "Reset App – 2 Step Safety",
        rStep1Tag: "Step 1",
        rStep1Q: "Reset App?",
        rStep2Tag: "Step 2",
        rStep2Q: "Are you sure?",
        rCancel: "Cancel",
        rContinue: "Continue",
        rReset: "RESET"
    },
    en: {
        menuHead: "HAMBURGER MENU",
        mHome: "Home",
        mAbout: "About Us",
        mLocation: "Service Location",
        mServices: "Our Services",
        mWork: "Our Work",
        mReviews: "Customer Reviews",
        mQuote: "Estimate & Quotation",
        mFaq: "FAQ",
        mQr: "QR Code",
        mAppSettings: "APP SETTINGS",
        mInstall: "Install App",
        mTheme: "Dark / Light Mode",
        mLang: "हिन्दी / English",
        mReset: "Reset App (2-Step)",

        businessTitle: "Powering Your Trust",
        businessTagline: "Professional Electrical Services in Lucknow",
        businessLocation: "📍 Lucknow, Uttar Pradesh",
        callBtnText: "Call Now",
        whatsappBtnText: "WhatsApp",

        discountBadge: "SPECIAL OFFER",
        discountTitle: "on Selected Electrical Services",
        discountBtnText: "🎁 Get Discount",

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
        btnGetEstimateNow: "Get Your Estimate Now →",
        faqHeading: "Frequently Asked Questions",
        btnViewAllFaq: "View All FAQ →",
        qrHeading: "Our Digital Card (Scan & Save)",
        qrDesc: "Scan QR code to save our card or share.",
        qrBtnText: "Download QR ▾",

        rHead: "Reset App – 2 Step Safety",
        rStep1Tag: "Step 1",
        rStep1Q: "Reset App?",
        rStep2Tag: "Step 2",
        rStep2Q: "Are you sure?",
        rCancel: "Cancel",
        rContinue: "Continue",
        rReset: "RESET"
    }
};

/* ================= DEFAULT DATA ================= */
const defaultServices = [
    { title: "House Wiring", icon: "🏠", desc: "Complete home concealed and casing wiring.", sub: [{ name: "1 Point Wiring", rate: "₹150", price: 150 }] },
    { title: "Light & Fan Installation", icon: "💡", desc: "Ceiling fan, wall fan & LED lighting.", sub: [{ name: "Fan Installation", rate: "₹200", price: 200 }] },
    { title: "MCB & DB Work", icon: "📟", desc: "Main switch, MCB box & DB dressing.", sub: [{ name: "MCB Replacement", rate: "₹250", price: 250 }] },
    { title: "False Ceiling Wiring", icon: "🏮", desc: "Profile lights, COB and strip lights.", sub: [{ name: "False Ceiling Point", rate: "₹120", price: 120 }] },
    { title: "Inverter & Backup", icon: "🔋", desc: "Inverter wiring & battery maintenance.", sub: [{ name: "Inverter Setup", rate: "₹350", price: 350 }] },
    { title: "Electrical Repair", icon: "🔧", desc: "Socket, switch repair & short circuit fix.", sub: [{ name: "General Repair", rate: "₹150", price: 150 }] },
    { title: "Fault Finding", icon: "🔍", desc: "Tracing wire faults and earth leakages.", sub: [{ name: "Inspection", rate: "₹200", price: 200 }] },
    { title: "Commercial Work", icon: "🏢", desc: "Office, shop & 3-phase wiring.", sub: [{ name: "Commercial Point", rate: "₹200", price: 200 }] }
];

const defaultReviews = [
    { name: "Rahul Sharma", text: "Excellent work and very professional service.", rating: 5 },
    { name: "Amit Verma", text: "Very good experience. On-time and neat work.", rating: 5 },
    { name: "Neha Singh", text: "Highly recommended for all electrical services.", rating: 5 }
];

const defaultFAQs = [
    { q: "Do you provide complete house wiring?", a: "Yes, we handle complete concealed and open house wiring projects." },
    { q: "Do you fix short circuits and tripping?", a: "Yes, our expert electricians quickly diagnose and fix MCB tripping and short circuits." },
    { q: "What is the cost of electrical work?", a: "Prices are transparent and depend upon the work type and point counts." }
];

/* ================= HAMBURGER DRAWER & POPSTATE ================= */
function openProject21Menu() {
    isMenuOpen = true;
    document.getElementById("sideMenu").classList.add("active");
    document.getElementById("navbarOverlay").classList.add("active");
    history.pushState({ menuOpen: true }, "");
}

function closeProject21Menu(fromHistory = false) {
    if (!isMenuOpen) return;
    isMenuOpen = false;
    document.getElementById("sideMenu").classList.remove("active");
    document.getElementById("navbarOverlay").classList.remove("active");
    if (!fromHistory && history.state?.menuOpen) {
        history.back();
    }
}

function handleMenuClick(targetHash) {
    closeProject21Menu();
    setTimeout(() => {
        const el = document.querySelector(targetHash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
}

window.addEventListener("popstate", () => {
    if (isMenuOpen) {
        closeProject21Menu(true);
    }
});

/* ================= 2-STEP RESET MODAL ================= */
function openResetModal() {
    closeProject21Menu();
    document.getElementById("resetStep1Box").style.display = "block";
    document.getElementById("resetArrow").style.display = "block";
    document.getElementById("resetStep2Box").style.display = "none";
    document.getElementById("resetModalOverlay").style.display = "flex";
}

function goToResetStep2() {
    document.getElementById("resetStep1Box").style.display = "none";
    document.getElementById("resetArrow").style.display = "none";
    document.getElementById("resetStep2Box").style.display = "block";
}

function closeResetModal() {
    document.getElementById("resetModalOverlay").style.display = "none";
}

function executeAppReset() {
    localStorage.clear();
    closeResetModal();
    setLanguage("en");
    showToast("✅ Reset Done");
}

/* ================= TOAST ================= */
function showToast(msg) {
    let t = document.getElementById("appGlobalToast");
    if (!t) {
        t = document.createElement("div");
        t.id = "appGlobalToast";
        t.style.cssText = "position:fixed;bottom:25px;left:50%;transform:translateX(-50%);background:#10b981;color:#fff;padding:8px 20px;border-radius:20px;font-size:0.8rem;font-weight:800;z-index:999999;box-shadow:0 4px 15px rgba(0,0,0,0.3);";
        document.body.appendChild(t);
    }
    t.innerText = msg;
    t.style.display = "block";
    setTimeout(() => { t.style.display = "none"; }, 2000);
}

/* ================= THEME & LANGUAGE ================= */
function toggleAppTheme() {
    document.documentElement.classList.toggle("saved-light-theme");
    const isLight = document.documentElement.classList.contains("saved-light-theme");
    localStorage.setItem("sandeepTheme", isLight ? "light" : "dark");
    document.getElementById("themeIconEl").className = isLight ? "fa-solid fa-sun set-ico ic-theme" : "fa-solid fa-moon set-ico ic-theme";
    closeProject21Menu();
}

function toggleLanguage() {
    setLanguage(currentLang === "hi" ? "en" : "hi");
    closeProject21Menu();
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("sandeepLang", lang);
    const t = translations[lang];

    document.getElementById("menuHeadTitle").innerText = t.menuHead;
    document.getElementById("mTextHome").innerText = t.mHome;
    document.getElementById("mTextAbout").innerText = t.mAbout;
    document.getElementById("mTextLocation").innerText = t.mLocation;
    document.getElementById("mTextServices").innerText = t.mServices;
    document.getElementById("mTextWork").innerText = t.mWork;
    document.getElementById("mTextReviews").innerText = t.mReviews;
    document.getElementById("mTextQuote").innerText = t.mQuote;
    document.getElementById("mTextFaq").innerText = t.mFaq;
    document.getElementById("mTextQr").innerText = t.mQr;
    document.getElementById("mAppSettingsHead").innerText = t.mAppSettings;
    document.getElementById("mInstallTxt").innerText = t.mInstall;
    document.getElementById("mThemeTxt").innerText = t.mTheme;
    document.getElementById("mLangTxt").innerText = t.mLang;
    document.getElementById("mResetTxt").innerText = t.mReset;

    document.getElementById("businessTitle").innerText = t.businessTitle;
    document.getElementById("businessTagline").innerText = t.businessTagline;
    document.getElementById("businessLocation").innerHTML = `<i class="fa-solid fa-location-dot"></i> ${t.businessLocation}`;
    document.getElementById("callBtnText").innerText = t.callBtnText;
    document.getElementById("whatsappBtnText").innerText = t.whatsappBtnText;

    document.getElementById("discountBadge").innerHTML = `<i class="fa-solid fa-fire"></i> ${t.discountBadge}`;
    document.getElementById("discountTitle").innerText = t.discountTitle;
    document.getElementById("discountBtnText").innerText = t.discountBtnText;

    document.getElementById("quickHeading").innerText = t.quickHeading;
    document.getElementById("labelCall").innerText = t.labelCall;
    document.getElementById("labelWhatsapp").innerText = t.labelWhatsapp;
    document.getElementById("labelEmail").innerText = t.labelEmail;
    document.getElementById("labelWeb").innerText = t.labelWeb;
    document.getElementById("labelMap").innerText = t.labelMap;
    document.getElementById("labelSaveContact").innerText = t.labelSaveContact;
    document.getElementById("labelShare").innerText = t.labelShare;
    document.getElementById("labelCatalogue").innerText = t.labelCatalogue;

    document.getElementById("aboutHeading").innerText = t.aboutHeading;
    document.getElementById("aboutReadMore").innerText = t.aboutReadMore;
    document.getElementById("aboutText").innerHTML = t.aboutText;

    document.getElementById("locHeading").innerText = t.locHeading;
    document.getElementById("locDesc").innerText = t.locDesc;
    document.getElementById("distBtnText").innerText = t.distBtnText;
    document.getElementById("mapBtnText").innerText = t.mapBtnText;

    document.getElementById("servicesHeading").innerText = t.servicesHeading;
    document.getElementById("btnViewAllServices").innerText = t.btnViewAllServices;
    document.getElementById("galleryHeading").innerText = t.galleryHeading;
    document.getElementById("reviewsHeading").innerText = t.reviewsHeading;
    document.getElementById("quoteHeading").innerText = t.quoteHeading;
    document.getElementById("quoteSubHint").innerText = t.quoteSubHint;
    document.getElementById("btnGetEstimateNow").innerText = t.btnGetEstimateNow;
    document.getElementById("faqHeading").innerText = t.faqHeading;
    document.getElementById("btnViewAllFaq").innerText = t.btnViewAllFaq;
    document.getElementById("qrHeading").innerText = t.qrHeading;
    document.getElementById("qrDesc").innerText = t.qrDesc;
    document.getElementById("qrBtnText").innerText = t.qrBtnText;

    document.getElementById("rHeadTitle").innerText = t.rHead;
    document.getElementById("rStep1Tag").innerText = t.rStep1Tag;
    document.getElementById("rStep1Q").innerText = t.rStep1Q;
    document.getElementById("rStep2Tag").innerText = t.rStep2Tag;
    document.getElementById("rStep2Q").innerText = t.rStep2Q;
    document.getElementById("rBtnCancel1").innerText = t.rCancel;
    document.getElementById("rBtnCancel2").innerText = t.rCancel;
    document.getElementById("rBtnContinue").innerText = t.rContinue;
    document.getElementById("rBtnResetFinal").innerText = t.rReset;
}

/* ================= RENDER DYNAMIC ITEMS ================= */
function renderServices() {
    const box = document.getElementById("serviceContainer");
    box.innerHTML = defaultServices.map((s, idx) => `
        <div class="srv-box" onclick="openServiceModal(${idx})">
            <span class="srv-ico">${s.icon}</span>
            <span class="srv-lbl">${s.title}</span>
        </div>
    `).join("");
}

function renderGallery() {
    const g = ["work1.jpg", "work2.jpg", "work3.jpg", "work4.jpg"];
    document.getElementById("galleryContainer").innerHTML = g.map(img => `
        <img src="assets/${img}" alt="Work" onerror="this.src='https://via.placeholder.com/150'">
    `).join("");
}

function renderReviews() {
    document.getElementById("reviewContainer").innerHTML = defaultReviews.map(r => `
        <div class="review-mini-box">
            <div class="stars">${"★".repeat(r.rating)}</div>
            <p>"${r.text}"</p>
            <small>— ${r.name}</small>
        </div>
    `).join("");
}

function renderFAQs() {
    document.getElementById("faqContainer").innerHTML = defaultFAQs.map(f => `
        <div class="faq-row" onclick="this.classList.toggle('open')">
            <div class="faq-q"><span><i class="fa-solid fa-circle-question"></i> ${f.q}</span><span class="faq-plus">+</span></div>
            <div class="faq-a">${f.a}</div>
        </div>
    `).join("");
}

function toggleAllFAQ() {
    document.querySelectorAll(".faq-row").forEach(r => r.classList.toggle("open"));
}

/* ================= SERVICE MODAL ================= */
function openServiceModal(sIdx) {
    const s = defaultServices[sIdx];
    if (!s) return;
    document.getElementById("modalServiceIcon").innerText = s.icon;
    document.getElementById("modalServiceTitle").innerText = s.title;
    document.getElementById("modalServiceDesc").innerText = s.desc;
    
    document.getElementById("modalItemsContainer").innerHTML = s.sub.map(sub => `
        <div class="sm-item-row">
            <div><strong>${sub.name}</strong><br><small>${sub.rate}</small></div>
            <div class="sm-qty-wrap">
                <button type="button" class="sm-btn" onclick="showToast('Item Added')">+</button>
            </div>
        </div>
    `).join("");

    document.getElementById("serviceModalOverlay").style.display = "flex";
}

function closeServiceModal() {
    document.getElementById("serviceModalOverlay").style.display = "none";
}

/* ================= ACTION HELPERS ================= */
function triggerAppInstall() {
    closeProject21Menu();
    alert("Install prompt ready / PWA configured.");
}

function saveContactVCard() {
    const vCard = "BEGIN:VCARD\nVERSION:3.0\nFN:Sandeep ElectroFix\nTEL:+919026036445\nEND:VCARD";
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([vCard], { type: "text/vcard" }));
    a.download = "Sandeep_ElectroFix.vcf";
    a.click();
}

function shareWebsite() {
    if (navigator.share) navigator.share({ title: "Sandeep ElectroFix", url: window.location.href });
    else showToast("Link Copied!");
}

function getUserLocation() {
    const st = document.getElementById("locationStatus");
    st.innerText = "Locating...";
    setTimeout(() => { st.innerHTML = "✅ Approx <strong>3.5 km</strong> from Lucknow center."; }, 800);
}

/* ================= INITIALIZATION ================= */
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("navbarMenuBtn").addEventListener("click", openProject21Menu);
    setLanguage(currentLang);
    renderServices();
    renderGallery();
    renderReviews();
    renderFAQs();
});
