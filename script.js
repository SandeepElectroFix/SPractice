/* =========================================================
   SANDEEP ELECTROFIX
   SMART DIGITAL CARD JAVASCRIPT
   Version 3.0.0
========================================================= */

(function () {
    "use strict";

    const config = window.CARD_CONFIG || {};
    const business = config.business || {};
    const features = config.features || {};

    let currentLang = "en";

    /* =====================================================
       TRANSLATIONS (ENGLISH & HINDI)
    ===================================================== */
    const translations = {
        en: {
            tagline: "Powering Your Trust",
            location: "📍 Lucknow, Uttar Pradesh",
            callNow: "📞 Call Now",
            whatsapp: "💬 WhatsApp",
            quickAccess: "Quick Access",
            about: "About",
            ourServices: "Our Services",
            ourWork: "Our Work",
            customerReviews: "Customer Reviews",
            requestQuote: "Request a Quote",
            faq: "Frequently Asked Questions",
            viewRates: "▼ View Rates & Details",
            hideRates: "▲ Hide Rates"
        },
        hi: {
            tagline: "विश्वास ही हमारी पहचान",
            location: "📍 लखनऊ, उत्तर प्रदेश",
            callNow: "📞 अभी कॉल करें",
            whatsapp: "💬 व्हाट्सएप करें",
            quickAccess: "त्वरित सेवाएँ",
            about: "हमारे बारे में",
            ourServices: "हमारी सेवाएँ",
            ourWork: "हमारे प्रोजेक्ट्स",
            customerReviews: "ग्राहकों की राय",
            requestQuote: "कोटेशन प्राप्त करें",
            faq: "अक्सर पूछे जाने वाले सवाल",
            viewRates: "▼ रेट और विवरण देखें",
            hideRates: "▲ विवरण छुपाएं"
        }
    };

    /* =====================================================
       DOM READY
    ===================================================== */
    document.addEventListener("DOMContentLoaded", function () {
        initTheme();
        initLanguage();
        initServices();
        initGallery();
        initReviews();
        initFAQ();
        initQuoteCalculator();
        initPWA();
    });

    /* =====================================================
       THEME CONTROLLER
    ===================================================== */
    function initTheme() {
        const toggleBtn = document.getElementById("themeToggle");
        if (!toggleBtn) return;

        const isLight = document.documentElement.classList.contains("saved-light-theme");
        toggleBtn.textContent = isLight ? "🌙 Dark Mode" : "☀️ Light Mode";

        toggleBtn.addEventListener("click", function () {
            const currentLight = document.documentElement.classList.toggle("saved-light-theme");
            toggleBtn.textContent = currentLight ? "🌙 Dark Mode" : "☀️ Light Mode";
            try {
                localStorage.setItem("sandeepTheme", currentLight ? "light" : "dark");
            } catch (e) {}
        });
    }

    /* =====================================================
       LANGUAGE CONTROLLER
    ===================================================== */
    function initLanguage() {
        const langBtns = document.querySelectorAll(".language-btn");
        langBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                currentLang = this.getAttribute("data-lang");
                langBtns.forEach(b => b.classList.remove("active"));
                this.classList.add("active");
                applyLanguage(currentLang);
            });
        });
    }

    function applyLanguage(lang) {
        const data = translations[lang] || translations.en;
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (data[key]) el.textContent = data[key];
        });
    }

    /* =====================================================
       SERVICES & ACCORDION DROPDOWN
    ===================================================== */
    function initServices() {
        const container = document.getElementById("serviceContainer");
        const selectBox = document.getElementById("serviceName");
        if (!container || !config.services) return;

        container.innerHTML = "";
        if (selectBox) selectBox.innerHTML = '<option value="">Select Service</option>';

        config.services.forEach((service, index) => {
            if (!service.show) return;

            // Populate Form Dropdown
            if (selectBox) {
                const opt = document.createElement("option");
                opt.value = service.title;
                opt.textContent = service.title;
                selectBox.appendChild(opt);
            }

            // Create Service Card
            const card = document.createElement("div");
            card.className = "service-card";
            card.id = `service-${service.id}`;

            let subServicesHTML = "";
            if (service.subServices && service.subServices.length > 0) {
                subServicesHTML = `
                    <div class="service-details" style="display:none; margin-top:12px; padding-top:10px; border-top:1px dashed var(--card-border);">
                        <ul style="list-style:none; padding:0; margin:0 0 10px 0;">
                            ${service.subServices.map(sub => `
                                <li style="display:flex; justify-content:space-between; font-size:0.82rem; margin:6px 0; color:var(--muted);">
                                    <span>• ${sub.name}</span>
                                    <strong style="color:var(--gold-light);">${sub.rate}</strong>
                                </li>
                            `).join("")}
                        </ul>
                    </div>
                `;
            }

            card.innerHTML = `
                <div class="service-header" style="cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <span class="service-icon">${service.icon || "⚡"}</span>
                        <div>
                            <strong style="font-size:0.95rem; color:var(--text);">${service.title}</strong>
                            <p style="font-size:0.8rem; color:var(--muted); margin-top:2px;">${service.description}</p>
                        </div>
                    </div>
                    <span class="accordion-arrow" style="font-size:0.85rem; color:var(--blue-light); margin-left:8px;">▼</span>
                </div>
                ${subServicesHTML}
            `;

            // Toggle Click
            const header = card.querySelector(".service-header");
            const details = card.querySelector(".service-details");
            const arrow = card.querySelector(".accordion-arrow");

            if (header && details) {
                header.addEventListener("click", function () {
                    const isOpen = details.style.display === "block";
                    details.style.display = isOpen ? "none" : "block";
                    arrow.textContent = isOpen ? "▼" : "▲";
                    card.classList.toggle("active", !isOpen);
                });
            }

            container.appendChild(card);
        });
    }

    /* =====================================================
       GALLERY & LIGHTBOX
    ===================================================== */
    function initGallery() {
        const container = document.getElementById("galleryContainer");
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightboxImage");
        const closeBtn = document.getElementById("closeLightbox");

        if (!container || !config.gallery) return;
        container.innerHTML = "";

        config.gallery.forEach(item => {
            if (!item.show) return;
            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.title;
            img.loading = "lazy";
            img.addEventListener("click", function () {
                if (lightbox && lightboxImg) {
                    lightboxImg.src = item.image;
                    lightbox.style.display = "flex";
                }
            });
            container.appendChild(img);
        });

        if (closeBtn && lightbox) {
            closeBtn.addEventListener("click", () => lightbox.style.display = "none");
            lightbox.addEventListener("click", (e) => {
                if (e.target === lightbox) lightbox.style.display = "none";
            });
        }
    }

    /* =====================================================
       REVIEWS
    ===================================================== */
    function initReviews() {
        const container = document.getElementById("reviewContainer");
        if (!container || !config.reviews) return;
        container.innerHTML = "";

        config.reviews.forEach(rev => {
            if (!rev.show) return;
            const card = document.createElement("div");
            card.className = "review-card";
            card.innerHTML = `
                <div style="color:var(--gold); font-size:0.9rem; margin-bottom:4px;">★★★★★</div>
                <p style="font-size:0.85rem; margin-bottom:6px;">"${rev.text}"</p>
                <strong style="font-size:0.8rem;">- ${rev.name}</strong>
            `;
            container.appendChild(card);
        });
    }

    /* =====================================================
       FAQ ACCORDION
    ===================================================== */
    function initFAQ() {
        const container = document.getElementById("faqContainer");
        if (!container || !config.faq) return;
        container.innerHTML = "";

        config.faq.forEach(item => {
            if (!item.show) return;
            const box = document.createElement("div");
            box.className = "faq-item";
            box.innerHTML = `
                <button type="button" class="faq-question">
                    <span>${item.question}</span>
                    <span style="color:var(--gold);">+</span>
                </button>
                <div class="faq-answer">
                    <p>${item.answer}</p>
                </div>
            `;
            box.querySelector(".faq-question").addEventListener("click", function () {
                box.classList.toggle("active");
                const sym = box.querySelector(".faq-question span:last-child");
                sym.textContent = box.classList.contains("active") ? "−" : "+";
            });
            container.appendChild(box);
        });
    }

    /* =====================================================
       QUOTE & DISCOUNT CALCULATOR
    ===================================================== */
    function initQuoteCalculator() {
        const totalInput = document.getElementById("serviceTotal");
        const calcBox = document.getElementById("discountCalculation");
        const sendBtn = document.getElementById("sendQuoteBtn");

        const discountPercent = config.discount && config.discount.enabled ? config.discount.percentage : 0;

        function updateCalc() {
            const val = parseFloat(totalInput.value);
            if (!val || val <= 0 || discountPercent <= 0) {
                if (calcBox) calcBox.style.display = "none";
                return;
            }
            const discountAmt = Math.round((val * discountPercent) / 100);
            const finalAmt = Math.round(val - discountAmt);

            if (calcBox) {
                calcBox.style.display = "block";
                calcBox.innerHTML = `
                    <div><span>Subtotal:</span><strong>₹${val}</strong></div>
                    <div><span>Discount (${discountPercent}% OFF):</span><strong>- ₹${discountAmt}</strong></div>
                    <div class="final-price"><span>Final Estimated Price:</span><strong>₹${finalAmt}</strong></div>
                `;
            }
        }

        if (totalInput) totalInput.addEventListener("input", updateCalc);

        if (sendBtn) {
            sendBtn.addEventListener("click", function () {
                const name = document.getElementById("customerName")?.value.trim() || "Customer";
                const phone = document.getElementById("customerPhone")?.value.trim() || "Not Provided";
                const service = document.getElementById("serviceName")?.value || "General Service";
                const total = document.getElementById("serviceTotal")?.value || "";
                const msg = document.getElementById("customerMessage")?.value.trim() || "Need service.";

                let quoteDetails = `👤 Name: ${name}\n📞 Phone: ${phone}\n⚡ Service: ${service}\n📝 Requirement: ${msg}`;
                if (total && discountPercent > 0) {
                    const dAmt = Math.round((parseFloat(total) * discountPercent) / 100);
                    const fAmt = Math.round(parseFloat(total) - dAmt);
                    quoteDetails += `\n\n💰 Estimated Total: ₹${total}\n🔥 Discount: ₹${dAmt} (${discountPercent}% OFF)\n✅ Final Payable: ₹${fAmt}`;
                }

                const waURL = `https://wa.me/${business.whatsapp || "919026036445"}?text=${encodeURIComponent(`Hello Sandeep ElectroFix 👋\n\nI want to request a quote:\n\n${quoteDetails}`)}`;
                window.open(waURL, "_blank", "noopener,noreferrer");
            });
        }
    }

    /* =====================================================
       SERVICE WORKER REGISTRATION (PWA)
    ===================================================== */
    function initPWA() {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", function () {
                navigator.serviceWorker.register("./sw.js")
                    .then(() => console.log("⚡ Service Worker Registered"))
                    .catch(err => console.log("SW registration failed", err));
            });
        }
    }

})();
