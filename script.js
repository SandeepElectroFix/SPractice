/* =========================================================
   SANDEEP ELECTROFIX
   PROJECT 2 - DIGITAL CARD
   MASTER CONTROLLER
   VERSION 3.0
   ========================================================= */

"use strict";

const APP = window.CONFIG || {};
const FEATURES = APP.features || {};
const BUSINESS = APP.business || {};

function $(selector) { return document.querySelector(selector); }
function $$(selector) { return document.querySelectorAll(selector); }

function showToast(message) {
    const old = $(".toast");
    if (old) old.remove();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function setVisibility(element, show) {
    if (!element) return;
    element.style.display = show ? "" : "none";
}

function escapeHTML(str) {
    return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function escapeAttribute(str) { return escapeHTML(str); }

/* =========================================================
   HERO CONTROL
========================================================= */
function initializeHero() {
    const hero = $(".hero");
    if (!hero) return;
    setVisibility(hero, FEATURES.hero !== false);
    const h = FEATURES.heroItems || {};
    setVisibility(hero.querySelector(".hero-logo"), h.logo !== false);
    setVisibility(hero.querySelector(".tagline"), h.tagline !== false);
    setVisibility(hero.querySelector(".location"), h.location !== false);
    setVisibility(hero.querySelector(".call-btn"), h.callButton !== false);
    setVisibility(hero.querySelector(".whatsapp-btn"), h.whatsappButton !== false);
    setVisibility($("#themeToggle"), h.themeButton !== false && FEATURES.darkMode !== false);
    setVisibility($(".language-switcher"), h.languageSwitcher !== false && FEATURES.languageSwitcher !== false);
}

/* =========================================================
   QUICK ACCESS
========================================================= */
function initializeQuickAccess() {
    const section = $(".quick-actions");
    if (!section) return;
    setVisibility(section, FEATURES.quickAccess !== false);
    const items = FEATURES.quickAccessItems || {};
    section.querySelectorAll(".grid > a.card").forEach(card => {
        const text = card.innerText.trim().toLowerCase();
        let show = true;
        if (text.includes("material catalogue")) show = items.materialCatalogue !== false;
        else if (text === "call" || text.startsWith("call\n")) show = items.call !== false;
        else if (text.includes("whatsapp")) show = items.whatsapp !== false;
        else if (text.includes("website")) show = items.website !== false;
        else if (text.includes("google maps")) show = items.googleMaps !== false;
        else if (text.includes("facebook")) show = items.facebook !== false;
        else if (text.includes("instagram")) show = items.instagram !== false;
        else if (text.includes("youtube")) show = items.youtube !== false;
        else if (text.includes("email")) show = items.email !== false;
        else if (text.includes("save contact")) show = items.saveContact !== false;
        else if (text.includes("share")) show = items.share !== false;
        else if (text.includes("our work")) show = items.ourWork !== false;
        setVisibility(card, show);
    });
}

function initializeAbout() {
    setVisibility($(".about"), FEATURES.about !== false);
}

/* =========================================================
   SERVICES (ACCORDION / CLICK TO VIEW SUB-SERVICES)
========================================================= */
function loadServices() {
    const section = $("#services");
    const container = $("#serviceContainer");
    if (!section || !container) return;

    setVisibility(section, FEATURES.services !== false);
    if (FEATURES.services === false) return;

    const settings = FEATURES.serviceSettings || {};
    const services = Array.isArray(APP.services) ? APP.services : [];
    container.innerHTML = "";

    services.forEach(service => {
        if (service.show === false) return;

        const card = document.createElement("div");
        card.className = "service-card";
        card.style.cursor = "pointer";

        const hasSubItems = settings.showSubItems !== false && Array.isArray(service.items) && service.items.length > 0;

        let html = `
            <div class="service-header" style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <div class="service-icon">${service.icon || "⚡"}</div>
                    <h3 style="margin:0; font-size:16px;">${escapeHTML(service.title)}</h3>
                </div>
                ${hasSubItems ? '<span class="service-arrow" style="font-size:13px; color:#888; transition:transform 0.3s ease;">▼</span>' : ''}
            </div>
        `;

        if (settings.showDescription !== false && service.description) {
            html += `<p class="service-description" style="margin:6px 0 0 0; font-size:13px; color:#666;">${escapeHTML(service.description)}</p>`;
        }

        if (hasSubItems) {
            html += `
                <div class="service-items-wrapper" style="max-height:0; overflow:hidden; transition:max-height 0.35s ease-out;">
                    <div class="service-items" style="padding-top:10px; margin-top:10px; border-top:1px dashed rgba(0,0,0,0.15);">
            `;

            service.items.forEach(item => {
                if (item.show === false) return;
                html += `
                    <div class="service-item" style="display:flex; justify-content:space-between; align-items:center; padding:7px 0; border-bottom:1px solid rgba(0,0,0,0.04); font-size:13px;">
                        <div class="service-item-name">🔹 ${escapeHTML(item.title)}</div>
                `;

                if (settings.showPrices !== false && item.price !== undefined) {
                    html += `
                        <div class="service-price" style="font-weight:bold; color:#0052d4;">
                            ₹${Number(item.price).toLocaleString("en-IN")}
                    `;
                    if (settings.showUnits !== false && item.unit) {
                        html += `<small style="font-weight:normal; color:#777;"> / ${escapeHTML(item.unit)}</small>`;
                    }
                    html += `</div>`;
                }
                html += `</div>`;
            });

            html += `
                    </div>
                </div>
            `;
        }

        card.innerHTML = html;

        if (hasSubItems) {
            card.addEventListener("click", function () {
                const wrapper = card.querySelector(".service-items-wrapper");
                const arrow = card.querySelector(".service-arrow");
                const isOpen = card.classList.contains("active");

                $$(".service-card").forEach(c => {
                    c.classList.remove("active");
                    const w = c.querySelector(".service-items-wrapper");
                    const a = c.querySelector(".service-arrow");
                    if (w) w.style.maxHeight = null;
                    if (a) a.style.transform = "rotate(0deg)";
                });

                if (!isOpen) {
                    card.classList.add("active");
                    wrapper.style.maxHeight = wrapper.scrollHeight + "px";
                    if (arrow) arrow.style.transform = "rotate(180deg)";
                }
            });
        }

        container.appendChild(card);
    });
}

/* =========================================================
   GALLERY & LIGHTBOX
========================================================= */
function initializeGallery() {
    const section = $("#gallery");
    const container = $("#galleryContainer");
    if (!section || !container) return;
    setVisibility(section, FEATURES.gallery !== false);
    if (FEATURES.gallery === false) return;

    const gallery = Array.isArray(APP.gallery) ? APP.gallery : [];
    container.innerHTML = "";
    gallery.forEach(item => {
        if (item.show === false) return;
        const wrapper = document.createElement("div");
        wrapper.className = "gallery-item";
        wrapper.innerHTML = `
            <img src="${escapeAttribute(item.image)}" alt="${escapeAttribute(item.title || "Electrical Work")}" loading="lazy">
            ${item.title ? `<span>${escapeHTML(item.title)}</span>` : ""}
        `;
        const img = wrapper.querySelector("img");
        if (img) img.addEventListener("click", () => openLightbox(img.src, item.title));
        container.appendChild(wrapper);
    });
}

function openLightbox(src, title) {
    const lightbox = $("#lightbox");
    const image = $("#lightboxImage");
    if (!lightbox || !image) return;
    image.src = src;
    image.alt = title || "Sandeep ElectroFix Work";
    lightbox.classList.add("active");
    lightbox.style.display = "flex";
}

function closeLightbox() {
    const lightbox = $("#lightbox");
    if (!lightbox) return;
    lightbox.classList.remove("active");
    lightbox.style.display = "none";
}

function initializeLightbox() {
    const close = $("#closeLightbox");
    if (close) close.addEventListener("click", closeLightbox);
    const lightbox = $("#lightbox");
    if (lightbox) {
        lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
    }
}

/* =========================================================
   REVIEWS
========================================================= */
function loadReviews() {
    const section = $("#reviews");
    const container = $("#reviewContainer");
    if (!section || !container) return;
    setVisibility(section, FEATURES.reviews !== false);
    if (FEATURES.reviews === false) return;

    const reviews = Array.isArray(APP.reviews) ? APP.reviews : [];
    container.innerHTML = "";
    reviews.forEach(r => {
        if (r.show === false) return;
        const card = document.createElement("div");
        card.className = "review-card";
        const stars = "⭐".repeat(Math.max(0, Math.min(5, Number(r.rating) || 0)));
        card.innerHTML = `<div class="review-stars">${stars}</div><p>"${escapeHTML(r.text || "")}"</p><strong>${escapeHTML(r.name || "Customer")}</strong>`;
        container.appendChild(card);
    });
}

/* =========================================================
   GOOGLE MAPS
========================================================= */
function initializeGoogleMaps() {
    const section = $("#google-maps");
    if (!section) return;
    setVisibility(section, FEATURES.googleMaps !== false);
    if (FEATURES.googleMaps === false) return;
    section.querySelectorAll("a").forEach(link => {
        if (link.href.includes("maps.app.goo.gl")) link.href = BUSINESS.googleMaps || link.href;
    });
}

/* =========================================================
   QUOTE FORM & WHATSAPP
========================================================= */
function initializeQuoteForm() {
    const section = $("#contact-form");
    const btn = $("#sendQuoteBtn");
    if (!section) return;
    const q = APP.quote || {};
    const enabled = FEATURES.contactForm !== false && q.enabled !== false;
    setVisibility(section, enabled);
    if (!enabled || !btn) return;
    btn.addEventListener("click", sendQuote);
}

function sendQuote() {
    const name = $("#customerName")?.value.trim() || "";
    const phone = $("#customerPhone")?.value.trim() || "";
    const service = $("#serviceName")?.value.trim() || "";
    const message = $("#customerMessage")?.value.trim() || "";
    const location = $("#customerLocation")?.value.trim() || "";
    const total = $("#serviceTotal")?.value.trim() || "";
    const q = APP.quote || {};

    if (q.requireName && !name) { showToast("Please enter your name."); $("#customerName")?.focus(); return; }
    if (q.requirePhone && !phone) { showToast("Please enter your mobile number."); $("#customerPhone")?.focus(); return; }
    if (q.requireService && !service) { showToast("Please select a service."); $("#serviceName")?.focus(); return; }
    if (q.requireLocation && !location) { showToast("Please share your service location."); $("#customerLocation")?.focus(); return; }

    let text = `Hello ${BUSINESS.name || "Sandeep ElectroFix"},\n\nI would like to enquire about electrical service.\n\nName: ${name}\nMobile: ${phone}\nService: ${service}`;
    if (total) text += `\nEstimated Total: ₹${total}`;
    if (message) text += `\nWork Details: ${message}`;
    if (location) text += `\nService Location: ${location}`;
    text += "\n\nThank you.";

    const number = q.whatsappNumber || BUSINESS.whatsapp;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
}

/* =========================================================
   DISCOUNT CALCULATION
========================================================= */
function initializeDiscountCalculation() {
    const input = $("#serviceTotal");
    const box = $("#discountCalculation");
    if (!input || !box) return;
    input.addEventListener("input", calculateDiscount);
    calculateDiscount();
}

function calculateDiscount() {
    const input = $("#serviceTotal");
    const box = $("#discountCalculation");
    if (!input || !box) return;
    const total = Number(input.value);
    const d = APP.discount || {};
    if (!d.enabled || !total || total <= 0) { box.style.display = "none"; return; }

    const pct = Number(d.value) || 0;
    const disc = total * pct / 100;
    const final = total - disc;
    box.style.display = "block";

    if ($("#originalAmount")) $("#originalAmount").textContent = `₹${total.toLocaleString("en-IN")}`;
    if ($("#discountAmount")) $("#discountAmount").textContent = `- ₹${disc.toLocaleString("en-IN")}`;
    if ($("#finalAmount")) $("#finalAmount").textContent = `₹${final.toLocaleString("en-IN")}`;
    if ($("#quoteDiscountPercent")) $("#quoteDiscountPercent").textContent = pct;
}

function initializeDiscountSections() {
    const d = APP.discount || {};
    const main = $("#discount-offer");
    const sec = $("#discount-section");
    const enabled = FEATURES.offers !== false && FEATURES.discountOffer !== false && d.enabled !== false;
    setVisibility(main, enabled);
    setVisibility(sec, FEATURES.discountSection !== false && enabled);
    if (!enabled) return;

    if (main) {
        const t = main.querySelector(".discount-title"), m = main.querySelector(".discount-message"), v = main.querySelector(".discount-value"), val = main.querySelector(".discount-validity");
        if (t) t.textContent = d.title || "Special Discount";
        if (m) m.textContent = d.message || "";
        if (v) v.textContent = d.type === "percentage" ? `${d.value}% OFF` : `₹${d.value} OFF`;
        if (val) val.textContent = d.validUntil ? `Valid until ${d.validUntil}` : "Valid for limited time";
    }

    if ($("#discountTitle")) $("#discountTitle").textContent = d.title || "Special Discount";
    if ($("#discountPercentage")) $("#discountPercentage").textContent = d.value || 0;
    if ($("#discountMessage")) $("#discountMessage").textContent = d.message || "";
    if ($("#discountValidity")) $("#discountValidity").textContent = d.validUntil ? `Valid until ${d.validUntil}` : "Limited Time Offer";
}

/* =========================================================
   FAQ
========================================================= */
function initializeFAQ() {
    const section = $("#faq");
    const container = $("#faqContainer");
    if (!section || !container) return;
    setVisibility(section, FEATURES.faq !== false);
    if (FEATURES.faq === false) return;

    const faq = Array.isArray(APP.faq) ? APP.faq : [];
    container.innerHTML = "";
    faq.forEach(item => {
        if (item.show === false) return;
        const wrapper = document.createElement("div");
        wrapper.className = "faq-item";
        wrapper.innerHTML = `
            <button type="button" class="faq-question">
                <span>${escapeHTML(item.question)}</span>
                <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer"><p>${escapeHTML(item.answer)}</p></div>
        `;
        wrapper.querySelector(".faq-question").addEventListener("click", () => wrapper.classList.toggle("active"));
        container.appendChild(wrapper);
    });
}

/* =========================================================
   QR, CONTACT, LOCATION, FOOTER, NAV
========================================================= */
function initializeQR() {
    const s = $("#qr-section"), img = $("#cardQR"), btn = $("#downloadQR");
    if (!s) return;
    setVisibility(s, FEATURES.qrCode !== false);
    if (FEATURES.qrCode === false) return;
    if (img && BUSINESS.cardQR) img.src = BUSINESS.cardQR;
    if (btn && img) {
        btn.addEventListener("click", () => {
            const a = document.createElement("a");
            a.href = img.src;
            a.download = "Sandeep-ElectroFix-QR.png";
            document.body.appendChild(a);
            a.click();
            a.remove();
        });
    }
}

function initializeContact() {
    const s = $(".contact");
    if (!s) return;
    setVisibility(s, FEATURES.contact !== false);
    if (FEATURES.contact === false) return;
    s.querySelectorAll("a").forEach(link => {
        if (link.href.startsWith("tel:")) link.href = `tel:${BUSINESS.phone}`;
        if (link.href.includes("wa.me")) link.href = `https://wa.me/${BUSINESS.whatsapp}`;
    });
}

function initializeCurrentLocation() {
    const btn = $("#getLocationBtn"), inp = $("#customerLocation"), st = $("#locationStatus");
    if (!btn || !inp) return;
    btn.addEventListener("click", () => {
        if (!navigator.geolocation) { showToast("Location not supported."); return; }
        btn.disabled = true;
        btn.textContent = "📍 Getting Location...";
        if (st) st.textContent = "Please allow location access...";

        navigator.geolocation.getCurrentPosition(
            pos => {
                inp.value = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
                if (st) st.textContent = "✅ Location added.";
                btn.disabled = false;
                btn.textContent = "📍 Location Added";
                showToast("Current location added.");
            },
            err => {
                btn.disabled = false;
                btn.textContent = "📍 Use My Current Location";
                if (st) st.textContent = "❌ Unable to get location.";
                showToast("Unable to get location.");
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
    });
}

function initializeFooter() {
    const f = $("footer");
    setVisibility(f, FEATURES.footer !== false);
    if (!f) return;
    const y = f.querySelector("p");
    if (y) y.textContent = `© ${new Date().getFullYear()} ${BUSINESS.name}`;
}

function initializeBottomNavigation() {
    const nav = $(".mobile-bottom-nav");
    if (!nav) return;
    setVisibility(nav, FEATURES.bottomNavigation !== false);
    if (FEATURES.bottomNavigation === false) return;
    const items = FEATURES.bottomNavItems || {};
    nav.querySelectorAll(".bottom-nav-item").forEach(link => {
        const t = link.innerText.trim().toLowerCase();
        let show = true;
        if (t.includes("home")) show = items.home !== false;
        else if (t.includes("services")) show = items.services !== false;
        else if (t.includes("work")) show = items.work !== false;
        else if (t.includes("quote")) show = items.quote !== false;
        else if (t.includes("call")) show = items.call !== false;
        setVisibility(link, show);
    });
}

/* =========================================================
   THEME & LANGUAGE
========================================================= */
function initializeTheme() {
    const btn = $("#themeToggle");
    if (!btn) return;
    if (FEATURES.darkMode === false) { btn.style.display = "none"; return; }
    function update() {
        const isL = document.documentElement.classList.contains("saved-light-theme");
        btn.textContent = isL ? "🌙 Dark Mode" : "☀️ Light Mode";
    }
    btn.addEventListener("click", () => {
        const isL = document.documentElement.classList.toggle("saved-light-theme");
        try { localStorage.setItem("sandeepTheme", isL ? "light" : "dark"); } catch (e) {}
        update();
    });
    update();
}

const TRANSLATIONS = {
    en: { tagline: "Powering Your Trust", location: "📍 Lucknow, Uttar Pradesh", callNow: "📞 Call Now", whatsapp: "💬 WhatsApp", quickAccess: "Quick Access", about: "About", ourServices: "Our Services", ourWork: "Our Work", customerReviews: "Customer Reviews", visitUs: "📍 Visit Us", requestQuote: "Request a Quote", faq: "Frequently Asked Questions", scanSave: "📱 Scan & Save", contact: "Contact" },
    hi: { tagline: "आपके भरोसे की शक्ति", location: "📍 लखनऊ, उत्तर प्रदेश", callNow: "📞 अभी कॉल करें", whatsapp: "💬 WhatsApp", quickAccess: "त्वरित पहुँच", about: "हमारे बारे में", ourServices: "हमारी सेवाएँ", ourWork: "हमारा काम", customerReviews: "ग्राहक समीक्षा", visitUs: "📍 हमसे मिलें", requestQuote: "कोटेशन माँगें", faq: "अक्सर पूछे जाने वाले प्रश्न", scanSave: "📱 स्कैन करें और सेव करें", contact: "संपर्क" }
};

function initializeLanguage() {
    const btns = $$(".language-btn");
    if (!btns.length) return;
    btns.forEach(b => b.addEventListener("click", () => setLanguage(b.dataset.lang)));
    setLanguage("en");
}

function setLanguage(lang) {
    const d = TRANSLATIONS[lang] || TRANSLATIONS.en;
    $$("[data-i18n]").forEach(el => { if (d[el.dataset.i18n]) el.textContent = d[el.dataset.i18n]; });
    $$(".language-btn").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
    try { localStorage.setItem("sandeepLanguage", lang); } catch (e) {}
}

function initializeShare() {
    $$('.card[href="#"]').forEach(card => {
        if (!card.innerText.toLowerCase().includes("share")) return;
        card.addEventListener("click", async e => {
            e.preventDefault();
            const data = { title: BUSINESS.name, text: `Check out ${BUSINESS.name}`, url: BUSINESS.cardWebsite || window.location.href };
            try {
                if (navigator.share) await navigator.share(data);
                else if (navigator.clipboard) { await navigator.clipboard.writeText(data.url); showToast("Card link copied."); }
            } catch (err) {}
        });
    });
}

function initializeSaveContact() {
    $$(".card").forEach(card => {
        if (!card.innerText.toLowerCase().includes("save contact")) return;
        card.addEventListener("click", e => {
            e.preventDefault();
            const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${BUSINESS.owner || BUSINESS.name}\nORG:${BUSINESS.name}\nTEL:${BUSINESS.phone}\nEMAIL:${BUSINESS.email}\nADR:;;${BUSINESS.location};;;;\nURL:${BUSINESS.cardWebsite}\nEND:VCARD`;
            const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Sandeep-ElectroFix.vcf";
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
            showToast("Contact file created.");
        });
    });
}

function updateBusinessLinks() {
    $$("a").forEach(link => {
        const t = link.innerText.trim().toLowerCase();
        if (t.includes("call") && link.href.startsWith("tel:")) link.href = `tel:${BUSINESS.phone}`;
        if (t.includes("whatsapp")) link.href = `https://wa.me/${BUSINESS.whatsapp}`;
        if (t === "website") link.href = BUSINESS.website;
        if (t.includes("google maps")) link.href = BUSINESS.googleMaps;
        if (t.includes("facebook")) link.href = BUSINESS.facebook;
        if (t.includes("instagram")) link.href = BUSINESS.instagram;
        if (t.includes("youtube")) link.href = BUSINESS.youtube;
        if (t === "email") link.href = `mailto:${BUSINESS.email}`;
    });
}

function initializeApp() {
    initializeHero();
    initializeQuickAccess();
    initializeAbout();
    loadServices();
    initializeGallery();
    initializeLightbox();
    loadReviews();
    initializeGoogleMaps();
    initializeQuoteForm();
    initializeDiscountCalculation();
    initializeDiscountSections();
    initializeFAQ();
    initializeQR();
    initializeContact();
    initializeCurrentLocation();
    initializeFooter();
    initializeBottomNavigation();
    initializeTheme();
    initializeLanguage();
    initializeShare();
    initializeSaveContact();
    updateBusinessLinks();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
} else {
    initializeApp();
}
