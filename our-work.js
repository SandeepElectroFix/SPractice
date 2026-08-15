/* =========================================================
   SANDEEP ELECTROFIX
   OUR WORK - JAVASCRIPT
   Version 1.0.0
========================================================= */

const WHATSAPP_PHONE = "919026036445";

const projects = [
    {
        id: 1,
        title: "House Wiring",
        category: "Wiring",
        type: "image",
        media: "assets/gallery/work1.jpg",
        description: "Complete residential house wiring, pipe laying, and concealed box installations."
    },
    {
        id: 2,
        title: "False Ceiling Wiring",
        category: "Lighting",
        type: "image",
        media: "assets/gallery/work2.jpg",
        description: "Modern false ceiling light wiring, COB lights, strip lights and profile channel installation."
    },
    {
        id: 3,
        title: "DB Panel Installation",
        category: "Distribution",
        type: "image",
        media: "assets/gallery/work3.jpg",
        description: "Distribution board dressing, MCB, RCCB and load balancing setup for complete safety."
    },
    {
        id: 4,
        title: "Lighting Work",
        category: "Lighting",
        type: "image",
        media: "assets/gallery/work4.jpg",
        description: "Indoor and outdoor lighting installation, panel lights and decorative fixtures."
    },
    {
        id: 5,
        title: "Switch Board Work",
        category: "Installation",
        type: "image",
        media: "assets/gallery/work5.jpg",
        description: "Modular switchboard setup, power socket connection and neat wiring assembly."
    },
    {
        id: 6,
        title: "Electrical Repair",
        category: "Repair",
        type: "image",
        media: "assets/gallery/work6.jpg",
        description: "Short circuit fault finding, MCB trip fixing and domestic electrical maintenance."
    },
    {
        id: 7,
        title: "New Project",
        category: "Wiring",
        type: "image",
        media: "assets/gallery/work7.jpg",
        description: "Upcoming complete electrical wiring project execution in Lucknow."
    }
];

const categories = [
    { name: "All", icon: "⚡" },
    { name: "Wiring", icon: "🏠" },
    { name: "Lighting", icon: "💡" },
    { name: "Distribution", icon: "⚙️" },
    { name: "Installation", icon: "🔌" },
    { name: "Repair", icon: "🛠️" }
];

let selectedCategory = "All";
let searchKeyword = "";

document.addEventListener("DOMContentLoaded", () => {
    initCategories();
    renderWork();
    setupSearch();
    setupLightbox();
    setupBackButton();
});

function initCategories() {
    const container = document.getElementById("workCategoryContainer");
    if (!container) return;
    container.innerHTML = "";

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `work-category ${cat.name === selectedCategory ? "active" : ""}`;
        btn.innerHTML = `
            <span class="work-category-icon">${cat.icon}</span>
            <span class="work-category-name">${cat.name}</span>
        `;
        btn.addEventListener("click", () => {
            selectedCategory = cat.name;
            document.querySelectorAll(".work-category").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderWork();
        });
        container.appendChild(btn);
    });
}

function getFilteredProjects() {
    const q = searchKeyword.toLowerCase().trim();
    return projects.filter(item => {
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        if (!q) return matchesCategory;

        const content = `${item.title} ${item.category} ${item.description}`.toLowerCase();
        return matchesCategory && content.includes(q);
    });
}

function renderWork() {
    const grid = document.getElementById("workGrid");
    const counter = document.getElementById("workCounter");
    const noWork = document.getElementById("noWork");
    if (!grid) return;

    const filtered = getFilteredProjects();
    grid.innerHTML = "";

    if (counter) counter.textContent = `${filtered.length} Projects`;
    if (noWork) noWork.classList.toggle("show", filtered.length === 0);

    filtered.forEach(item => {
        const card = document.createElement("article");
        card.className = "work-card";

        card.innerHTML = `
            <div class="work-media">
                <img src="${item.media}" alt="${item.title}" loading="lazy" onerror="this.src='assets/logo.png'">
                <span class="work-media-type">${item.type === "video" ? "🎥 Video" : "📸 Photo"}</span>
                <span class="work-media-category">${item.category}</span>
            </div>
            <div class="work-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <button type="button" class="work-view-button">👁️ View Project</button>
            </div>
        `;

        card.querySelector(".work-media").addEventListener("click", () => openLightbox(item));
        card.querySelector(".work-view-button").addEventListener("click", () => openLightbox(item));

        grid.appendChild(card);
    });
}

function setupSearch() {
    const input = document.getElementById("workSearch");
    const clearBtn = document.getElementById("clearWorkSearch");
    const resetBtn = document.getElementById("resetWork");

    if (input) {
        input.addEventListener("input", () => {
            searchKeyword = input.value;
            renderWork();
            if (clearBtn) clearBtn.classList.toggle("show", searchKeyword.length > 0);
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            input.value = "";
            searchKeyword = "";
            clearBtn.classList.remove("show");
            renderWork();
            input.focus();
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            selectedCategory = "All";
            searchKeyword = "";
            if (input) input.value = "";
            if (clearBtn) clearBtn.classList.remove("show");
            initCategories();
            renderWork();
        });
    }
}

function setupLightbox() {
    const lightbox = document.getElementById("workLightbox");
    const closeBtn = document.getElementById("lightboxClose");
    const backdrop = lightbox ? lightbox.querySelector(".lightbox-backdrop") : null;

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (backdrop) backdrop.addEventListener("click", closeLightbox);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeLightbox();
    });
}

function openLightbox(item) {
    const lightbox = document.getElementById("workLightbox");
    const img = document.getElementById("lightboxImage");
    const vid = document.getElementById("lightboxVideo");
    const title = document.getElementById("lightboxTitle");
    const cat = document.getElementById("lightboxCategory");
    const desc = document.getElementById("lightboxDescription");
    const waBtn = document.getElementById("lightboxWhatsApp");

    if (!lightbox) return;

    if (title) title.textContent = item.title;
    if (cat) cat.textContent = item.category;
    if (desc) desc.textContent = item.description;

    if (item.type === "video") {
        if (img) img.style.display = "none";
        if (vid) {
            vid.style.display = "block";
            vid.src = item.media;
            vid.play();
        }
    } else {
        if (vid) {
            vid.pause();
            vid.style.display = "none";
        }
        if (img) {
            img.style.display = "block";
            img.src = item.media;
            img.alt = item.title;
        }
    }

    if (waBtn) {
        waBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`Hello Sandeep ElectroFix 👋\n\nI want to ask about this project:\n📸 Work: ${item.title}\n📂 Category: ${item.category}`)}`;
    }

    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    const lightbox = document.getElementById("workLightbox");
    const vid = document.getElementById("lightboxVideo");
    if (!lightbox) return;

    if (vid) {
        vid.pause();
        vid.src = "";
    }

    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function setupBackButton() {
    const btn = document.getElementById("backButton");
    if (btn) {
        btn.addEventListener("click", (e) => {
            if (window.history.length > 1) {
                e.preventDefault();
                window.history.back();
            }
        });
    }
}
