/* =========================================================
   SANDEEP ELECTROFIX
   MATERIAL CATALOGUE - JAVASCRIPT
   Version 2.0.0
========================================================= */

const WHATSAPP_NUMBER = "919026036445";

const materials = [
    /* =====================================================
       WIRES & CABLES
    ===================================================== */
    {
        id: 1,
        name: "FR PVC Wire",
        category: "Wires",
        size: "1.5 sq.mm",
        price: "Price on Request",
        image: "assets/materials/wire-1-5sqmm.jpg",
        icon: "🔌",
        description: "FR PVC insulated copper wire suitable for residential lighting and general electrical wiring.",
        specifications: [
            "Size: 1.5 sq.mm",
            "Copper conductor",
            "FR PVC insulation",
            "Suitable for lighting circuits",
            "Available in multiple colours"
        ]
    },
    {
        id: 2,
        name: "FR PVC Wire",
        category: "Wires",
        size: "2.5 sq.mm",
        price: "Price on Request",
        image: "assets/materials/wire-2-5sqmm.jpg",
        icon: "🔌",
        description: "FR PVC insulated copper wire commonly used for socket and general power circuits.",
        specifications: [
            "Size: 2.5 sq.mm",
            "Copper conductor",
            "FR PVC insulation",
            "Suitable for power circuits",
            "Multiple colours available"
        ]
    },
    {
        id: 3,
        name: "FR PVC Wire",
        category: "Wires",
        size: "4 sq.mm",
        price: "Price on Request",
        image: "assets/materials/wire-4sqmm.jpg",
        icon: "🔌",
        description: "Copper electrical wire suitable for higher-load domestic and commercial circuits.",
        specifications: [
            "Size: 4 sq.mm",
            "Copper conductor",
            "FR PVC insulation",
            "Suitable for higher-load circuits",
            "Multiple colours available"
        ]
    },
    {
        id: 4,
        name: "FR PVC Wire",
        category: "Wires",
        size: "6 sq.mm",
        price: "Price on Request",
        image: "assets/materials/wire-6sqmm.jpg",
        icon: "🔌",
        description: "Heavy-size FR PVC insulated copper wire for suitable higher-load electrical applications.",
        specifications: [
            "Size: 6 sq.mm",
            "Copper conductor",
            "FR PVC insulation",
            "Suitable for higher-load wiring",
            "Multiple colours available"
        ]
    },
    {
        id: 5,
        name: "Flexible Wire",
        category: "Wires",
        size: "1.0 sq.mm",
        price: "Price on Request",
        image: "assets/materials/flexible-wire-1sqmm.jpg",
        icon: "〰️",
        description: "Flexible insulated wire for suitable electrical connections and equipment wiring.",
        specifications: [
            "Size: 1.0 sq.mm",
            "Flexible conductor",
            "PVC insulation",
            "Easy to route",
            "Suitable for electrical connections"
        ]
    },
    {
        id: 6,
        name: "Flexible Wire",
        category: "Wires",
        size: "1.5 sq.mm",
        price: "Price on Request",
        image: "assets/materials/flexible-wire-1-5sqmm.jpg",
        icon: "〰️",
        description: "Flexible electrical wire suitable for equipment and general connection applications.",
        specifications: [
            "Size: 1.5 sq.mm",
            "Flexible conductor",
            "PVC insulation",
            "Easy installation",
            "Multiple colours available"
        ]
    },
    {
        id: 7,
        name: "Flexible Wire",
        category: "Wires",
        size: "2.5 sq.mm",
        price: "Price on Request",
        image: "assets/materials/flexible-wire-2-5sqmm.jpg",
        icon: "〰️",
        description: "Flexible electrical wire for suitable power connection and equipment wiring applications.",
        specifications: [
            "Size: 2.5 sq.mm",
            "Flexible conductor",
            "PVC insulation",
            "Suitable for power connections",
            "Multiple colours available"
        ]
    },

    /* =====================================================
       CONDUIT
    ===================================================== */
    {
        id: 8,
        name: "PVC Conduit Pipe",
        category: "Conduit",
        size: "20mm",
        price: "Price on Request",
        image: "assets/materials/conduit-20mm.jpg",
        icon: "🧰",
        description: "PVC conduit pipe for protecting electrical wires in concealed and surface wiring installations.",
        specifications: [
            "Diameter: 20mm",
            "PVC construction",
            "Suitable for electrical wiring",
            "Concealed and surface installation",
            "Lightweight and easy to install"
        ]
    },
    {
        id: 9,
        name: "PVC Conduit Pipe",
        category: "Conduit",
        size: "25mm",
        price: "Price on Request",
        image: "assets/materials/conduit-25mm.jpg",
        icon: "🧰",
        description: "25mm PVC conduit for electrical wiring installations requiring additional cable space.",
        specifications: [
            "Diameter: 25mm",
            "PVC construction",
            "Suitable for concealed wiring",
            "Suitable for multiple cables",
            "Easy installation"
        ]
    },
    {
        id: 10,
        name: "PVC Conduit Pipe",
        category: "Conduit",
        size: "32mm",
        price: "Price on Request",
        image: "assets/materials/conduit-32mm.jpg",
        icon: "🧰",
        description: "32mm PVC conduit pipe for suitable electrical wiring applications requiring larger conduit capacity.",
        specifications: [
            "Diameter: 32mm",
            "PVC construction",
            "Suitable for electrical wiring",
            "Higher cable capacity",
            "Suitable for concealed installation"
        ]
    },
    {
        id: 11,
        name: "Flexible Conduit Pipe",
        category: "Conduit",
        size: "20mm",
        price: "Price on Request",
        image: "assets/materials/flexible-conduit-20mm.jpg",
        icon: "🧰",
        description: "Flexible conduit for routing and protecting electrical cables where flexible installation is required.",
        specifications: [
            "Size: 20mm",
            "Flexible construction",
            "Cable protection",
            "Easy routing",
            "Suitable for electrical installations"
        ]
    },
    {
        id: 12,
        name: "Junction Box",
        category: "Conduit",
        size: "20mm",
        price: "Price on Request",
        image: "assets/materials/junction-box-20mm.jpg",
        icon: "📦",
        description: "Electrical junction box for suitable conduit connections and wire routing.",
        specifications: [
            "Size: 20mm system",
            "Electrical junction application",
            "Suitable for conduit wiring",
            "Compact design",
            "Easy installation"
        ]
    },
    {
        id: 13,
        name: "Junction Box",
        category: "Conduit",
        size: "25mm",
        price: "Price on Request",
        image: "assets/materials/junction-box-25mm.jpg",
        icon: "📦",
        description: "Junction box suitable for 25mm conduit wiring installations.",
        specifications: [
            "Size: 25mm system",
            "Electrical junction application",
            "Suitable for conduit wiring",
            "Durable construction",
            "Easy installation"
        ]
    },

    /* =====================================================
       ACCESSORIES
    ===================================================== */
    {
        id: 14,
        name: "PVC Saddle",
        category: "Accessories",
        size: "20mm",
        price: "Price on Request",
        image: "assets/materials/saddle-20mm.jpg",
        icon: "🔩",
        description: "PVC saddle clamp for securing electrical conduit pipe to walls and surfaces.",
        specifications: [
            "Size: 20mm",
            "PVC construction",
            "For conduit fixing",
            "Suitable for wall installation",
            "Easy fitting"
        ]
    },
    {
        id: 15,
        name: "PVC Saddle",
        category: "Accessories",
        size: "25mm",
        price: "Price on Request",
        image: "assets/materials/saddle-25mm.jpg",
        icon: "🔩",
        description: "25mm PVC saddle clamp for securing conduit pipes during electrical installation.",
        specifications: [
            "Size: 25mm",
            "PVC construction",
            "For 25mm conduit",
            "Suitable for wall fixing",
            "Easy installation"
        ]
    },
    {
        id: 16,
        name: "PVC Saddle",
        category: "Accessories",
        size: "32mm",
        price: "Price on Request",
        image: "assets/materials/saddle-32mm.jpg",
        icon: "🔩",
        description: "32mm PVC saddle clamp for suitable larger conduit installation.",
        specifications: [
            "Size: 32mm",
            "PVC construction",
            "For conduit fixing",
            "Suitable for larger conduit",
            "Easy installation"
        ]
    },
    {
        id: 17,
        name: "Cable Tie",
        category: "Accessories",
        size: "100mm",
        price: "Price on Request",
        image: "assets/materials/cable-tie-100mm.jpg",
        icon: "🔗",
        description: "Cable tie for bundling and organizing electrical wires and cables.",
        specifications: [
            "Length: 100mm",
            "For cable management",
            "Easy locking mechanism",
            "Suitable for electrical work",
            "Multiple pieces available"
        ]
    },
    {
        id: 18,
        name: "Cable Tie",
        category: "Accessories",
        size: "200mm",
        price: "Price on Request",
        image: "assets/materials/cable-tie-200mm.jpg",
        icon: "🔗",
        description: "Longer cable tie for bundling larger groups of wires and cables.",
        specifications: [
            "Length: 200mm",
            "For cable management",
            "Strong locking mechanism",
            "Suitable for electrical work",
            "Multiple pieces available"
        ]
    },

    /* =====================================================
       SWITCHES & SOCKETS
    ===================================================== */
    {
        id: 19,
        name: "Modular Switch",
        category: "Switches",
        size: "6A",
        price: "Price on Request",
        image: "assets/materials/modular-switch-6a.jpg",
        icon: "🔘",
        description: "6A modular switch for suitable lighting and general electrical circuits.",
        specifications: [
            "Current rating: 6A",
            "Modular design",
            "Suitable for lighting circuits",
            "Easy installation",
            "Available in different finishes"
        ]
    },
    {
        id: 20,
        name: "Modular Switch",
        category: "Switches",
        size: "16A",
        price: "Price on Request",
        image: "assets/materials/modular-switch-16a.jpg",
        icon: "🔘",
        description: "16A modular switch for suitable higher-current domestic applications.",
        specifications: [
            "Current rating: 16A",
            "Modular design",
            "Suitable for power circuits",
            "Easy installation",
            "Available in different finishes"
        ]
    },
    {
        id: 21,
        name: "Modular Socket",
        category: "Switches",
        size: "6A",
        price: "Price on Request",
        image: "assets/materials/socket-6a.jpg",
        icon: "🔌",
        description: "6A modular socket for suitable household electrical connections.",
        specifications: [
            "Current rating: 6A",
            "Modular design",
            "Suitable for general appliances",
            "Easy installation",
            "Indoor electrical use"
        ]
    },
    {
        id: 22,
        name: "Modular Socket",
        category: "Switches",
        size: "16A",
        price: "Price on Request",
        image: "assets/materials/socket-16a.jpg",
        icon: "🔌",
        description: "16A modular socket for suitable higher-power domestic appliances.",
        specifications: [
            "Current rating: 16A",
            "Modular design",
            "Suitable for power appliances",
            "Easy installation",
            "Indoor electrical use"
        ]
    },
    {
        id: 23,
        name: "Heavy-Duty Socket",
        category: "Switches",
        size: "16A",
        price: "Price on Request",
        image: "assets/materials/heavy-duty-socket-16a.jpg",
        icon: "🔌",
        description: "Heavy-duty 16A socket for suitable high-power appliance connections.",
        specifications: [
            "Current rating: 16A",
            "Heavy-duty design",
            "Suitable for high-power appliances",
            "Durable construction",
            "Indoor electrical use"
        ]
    },
    {
        id: 24,
        name: "Fan Regulator",
        category: "Switches",
        size: "Modular",
        price: "Price on Request",
        image: "assets/materials/fan-regulator.jpg",
        icon: "🌀",
        description: "Modular fan regulator for suitable ceiling fan speed control.",
        specifications: [
            "Modular design",
            "Fan speed control",
            "Suitable for compatible fans",
            "Easy installation",
            "Indoor use"
        ]
    },
    {
        id: 25,
        name: "Bell Push",
        category: "Switches",
        size: "Modular",
        price: "Price on Request",
        image: "assets/materials/bell-push.jpg",
        icon: "🔔",
        description: "Modular bell push switch for suitable doorbell applications.",
        specifications: [
            "Modular design",
            "Momentary operation",
            "Suitable for doorbell circuits",
            "Easy installation",
            "Indoor use"
        ]
    },
    {
        id: 26,
        name: "Ceiling Rose",
        category: "Switches",
        size: "Standard",
        price: "Price on Request",
        image: "assets/materials/ceiling-rose.jpg",
        icon: "💡",
        description: "Ceiling rose for suitable ceiling light and fan electrical connections.",
        specifications: [
            "Standard size",
            "Ceiling connection accessory",
            "Suitable for lighting applications",
            "Easy installation",
            "Electrical accessory"
        ]
    },

    /* =====================================================
       PROTECTION & DISTRIBUTION
    ===================================================== */
    {
        id: 27,
        name: "SP MCB",
        category: "Protection",
        size: "Single Pole",
        price: "Price on Request",
        image: "assets/materials/sp-mcb.jpg",
        icon: "🛡️",
        description: "Single-pole miniature circuit breaker for suitable circuit protection applications.",
        specifications: [
            "Single Pole",
            "Overcurrent protection",
            "Short-circuit protection",
            "DIN rail compatible models",
            "Select rating according to circuit design"
        ]
    },
    {
        id: 28,
        name: "DP MCB",
        category: "Protection",
        size: "Double Pole",
        price: "Price on Request",
        image: "assets/materials/dp-mcb.jpg",
        icon: "🛡️",
        description: "Double-pole MCB for suitable circuit isolation and protection applications.",
        specifications: [
            "Double Pole",
            "Circuit protection",
            "Suitable for distribution boards",
            "DIN rail compatible models",
            "Select rating according to circuit design"
        ]
    },
    {
        id: 29,
        name: "TP MCB",
        category: "Protection",
        size: "Triple Pole",
        price: "Price on Request",
        image: "assets/materials/tp-mcb.jpg",
        icon: "🛡️",
        description: "Triple-pole MCB for suitable three-phase circuit protection applications.",
        specifications: [
            "Triple Pole",
            "Three-phase applications",
            "Overcurrent protection",
            "Distribution board installation",
            "Select rating according to circuit design"
        ]
    },
    {
        id: 30,
        name: "RCCB",
        category: "Protection",
        size: "2 Pole / 4 Pole",
        price: "Price on Request",
        image: "assets/materials/rccb.jpg",
        icon: "🛡️",
        description: "Residual current circuit breaker for suitable earth-leakage protection applications.",
        specifications: [
            "Available in 2P / 4P variants",
            "Residual current protection",
            "Suitable for distribution boards",
            "DIN rail installation",
            "Rating and sensitivity as required"
        ]
    },
    {
        id: 31,
        name: "RCBO",
        category: "Protection",
        size: "Single / Double Pole",
        price: "Price on Request",
        image: "assets/materials/rcbo.jpg",
        icon: "🛡️",
        description: "RCBO combines suitable overcurrent and residual-current protection in one device.",
        specifications: [
            "Overcurrent protection",
            "Residual-current protection",
            "Compact protection solution",
            "DIN rail installation",
            "Select rating according to circuit design"
        ]
    },
    {
        id: 32,
        name: "Distribution Box",
        category: "Protection",
        size: "4 Way",
        price: "Price on Request",
        image: "assets/materials/db-4way.jpg",
        icon: "📦",
        description: "4-way distribution box for suitable residential electrical distribution installations.",
        specifications: [
            "4 Way",
            "MCB/Protection device mounting",
            "Suitable for residential wiring",
            "Wall-mounted installation",
            "Compact design"
        ]
    },
    {
        id: 33,
        name: "Distribution Box",
        category: "Protection",
        size: "8 Way",
        price: "Price on Request",
        image: "assets/materials/db-8way.jpg",
        icon: "📦",
        description: "8-way distribution box for suitable residential and small commercial electrical installations.",
        specifications: [
            "8 Way",
            "Protection device mounting",
            "Suitable for distribution circuits",
            "Wall-mounted installation",
            "Compact design"
        ]
    },
    {
        id: 34,
        name: "Distribution Box",
        category: "Protection",
        size: "12 Way",
        price: "Price on Request",
        image: "assets/materials/db-12way.jpg",
        icon: "📦",
        description: "12-way distribution box for suitable larger residential or commercial distribution installations.",
        specifications: [
            "12 Way",
            "Protection device mounting",
            "Suitable for multiple circuits",
            "Wall-mounted installation",
            "Suitable for larger distribution requirements"
        ]
    },

    /* =====================================================
       LIGHTING
    ===================================================== */
    {
        id: 35,
        name: "LED Bulb",
        category: "Lighting",
        size: "Multiple Wattages",
        price: "Price on Request",
        image: "assets/materials/led-bulb.jpg",
        icon: "💡",
        description: "LED bulb for suitable energy-efficient residential and commercial lighting.",
        specifications: [
            "Multiple wattages available",
            "LED technology",
            "Energy efficient",
            "Suitable for general lighting",
            "Different colour temperatures available"
        ]
    },
    {
        id: 36,
        name: "LED Panel Light",
        category: "Lighting",
        size: "Multiple Sizes",
        price: "Price on Request",
        image: "assets/materials/led-panel.jpg",
        icon: "💡",
        description: "LED panel light for suitable ceiling lighting applications.",
        specifications: [
            "Multiple sizes available",
            "LED technology",
            "Ceiling installation",
            "Suitable for indoor lighting",
            "Multiple wattages available"
        ]
    },
    {
        id: 37,
        name: "LED Batten",
        category: "Lighting",
        size: "Multiple Lengths",
        price: "Price on Request",
        image: "assets/materials/led-batten.jpg",
        icon: "💡",
        description: "LED batten light for suitable residential, shop and office lighting.",
        specifications: [
            "Multiple lengths available",
            "LED technology",
            "Surface installation",
            "Suitable for indoor lighting",
            "Multiple wattages available"
        ]
    },
    {
        id: 38,
        name: "Ceiling Light",
        category: "Lighting",
        size: "Multiple Designs",
        price: "Price on Request",
        image: "assets/materials/ceiling-light.jpg",
        icon: "💡",
        description: "Ceiling light fitting for suitable decorative and general indoor lighting.",
        specifications: [
            "Multiple designs",
            "Indoor lighting",
            "Ceiling installation",
            "Multiple wattages available",
            "Suitable for residential applications"
        ]
    },
    {
        id: 39,
        name: "Lamp Holder",
        category: "Lighting",
        size: "Standard",
        price: "Price on Request",
        image: "assets/materials/holder.jpg",
        icon: "💡",
        description: "Lamp holder for suitable bulb mounting and electrical connection applications.",
        specifications: [
            "Standard lamp holder",
            "Bulb connection",
            "Suitable for compatible lamps",
            "Electrical accessory",
            "Easy installation"
        ]
    },
    {
        id: 40,
        name: "Batten Holder",
        category: "Lighting",
        size: "Standard",
        price: "Price on Request",
        image: "assets/materials/batten-holder.jpg",
        icon: "💡",
        description: "Batten holder for suitable surface-mounted bulb installation.",
        specifications: [
            "Standard size",
            "Surface mounting",
            "Bulb connection",
            "Electrical accessory",
            "Easy installation"
        ]
    }
];

/* =========================================================
   MATERIAL CATALOGUE ENGINE - STABLE FIX
   Version 2.2.0
   Persistent Category + Search
========================================================= */

const categories = [
    { name: "All", icon: "🛒" },
    { name: "Wires", icon: "🧵" },
    { name: "Conduit", icon: "🔌" },
    { name: "Switches", icon: "💡" },
    { name: "Protection", icon: "🛡️" },
    { name: "Lighting", icon: "💡" },
    { name: "Accessories", icon: "🔩" }
];


/* =========================================================
   PERSISTENT FILTER STATE
========================================================= */

let selectedCategory =
    localStorage.getItem("sandeepCatalogueCategory") || "All";

let searchText =
    localStorage.getItem("sandeepCatalogueSearch") || "";


/* =========================================================
   INITIALIZE
========================================================= */

function initMaterialCatalogue() {

    console.log(
        "Sandeep ElectroFix Material Catalogue:",
        materials.length,
        "materials loaded"
    );

    createCategories();
    renderProducts();
    setupSearch();
    setupSearchToggle();
    setupModal();
    setupBackButton();
    setupResetButton();

}


/* =========================================================
   SAFE DOM READY
========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initMaterialCatalogue,
        { once: true }
    );

} else {

    initMaterialCatalogue();

}


/* =========================================================
   CATEGORIES
========================================================= */

function createCategories() {

    const container =
        document.getElementById("categoryContainer");

    if (!container) return;

    container.innerHTML = "";

    categories.forEach(category => {

        const button =
            document.createElement("button");

        button.type = "button";
        button.className = "category-item";

        if (category.name === selectedCategory) {

            button.classList.add("active");

        }

        button.innerHTML = `
            <span>${category.icon}</span>
            <span>${category.name}</span>
        `;


        button.addEventListener(
            "click",
            function () {

                selectedCategory =
                    category.name;


                /* SAVE CATEGORY */

                localStorage.setItem(
                    "sandeepCatalogueCategory",
                    selectedCategory
                );


                document
                    .querySelectorAll(".category-item")
                    .forEach(item =>
                        item.classList.remove("active")
                    );


                button.classList.add("active");

                renderProducts();

            }
        );


        container.appendChild(button);

    });

}


/* =========================================================
   FILTER
========================================================= */

function getFilteredProducts() {

    const query =
        searchText.toLowerCase().trim();


    return materials.filter(product => {

        const categoryMatch =
            selectedCategory === "All" ||
            product.category === selectedCategory;


        if (!query) {

            return categoryMatch;

        }


        const searchableText = [

            product.name,
            product.category,
            product.size,
            product.description,

            ...(Array.isArray(product.specifications)
                ? product.specifications
                : [])

        ]
            .join(" ")
            .toLowerCase();


        return (
            categoryMatch &&
            searchableText.includes(query)
        );

    });

}


/* =========================================================
   IMAGE FALLBACK
========================================================= */

function createProductImage(product) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "product-image";


    const img =
        document.createElement("img");

    img.src =
        product.image || "";

    img.alt =
        `${product.name} ${product.size}`;

    img.loading = "lazy";


    const placeholder =
        document.createElement("div");

    placeholder.className =
        "product-image-placeholder";

    placeholder.style.display = "none";
    placeholder.style.width = "100%";
    placeholder.style.height = "100%";
    placeholder.style.alignItems = "center";
    placeholder.style.justifyContent = "center";
    placeholder.style.fontSize = "40px";

    placeholder.textContent =
        product.icon || "📦";


    img.onerror = function () {

        this.style.display = "none";

        placeholder.style.display = "flex";

    };


    if (!product.image) {

        img.style.display = "none";

        placeholder.style.display = "flex";

    }


    wrapper.appendChild(img);

    wrapper.appendChild(placeholder);


    const category =
        document.createElement("span");

    category.className =
        "product-category";

    category.textContent =
        product.category;


    wrapper.appendChild(category);


    return wrapper;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    const container =
        document.getElementById("productsGrid");

    if (!container) return;


    const filtered =
        getFilteredProducts();


    container.innerHTML = "";


    filtered.forEach(product => {

        const card =
            document.createElement("article");

        card.className =
            "product-card";


        /* =================================================
           IMAGE
        ================================================= */

        const imageArea =
            createProductImage(product);

        card.appendChild(imageArea);


        /* =================================================
           INFO
        ================================================= */

        const info =
            document.createElement("div");

        info.className =
            "product-info";


        const title =
            document.createElement("h3");

        title.textContent =
            product.name;


        const size =
            document.createElement("div");

        size.className =
            "product-size";

        size.textContent =
            product.size;


        const price =
            document.createElement("div");

        price.className =
            "product-price";

        price.textContent =
            product.price;


        /* =================================================
           ACTIONS
        ================================================= */

        const actions =
            document.createElement("div");

        actions.className =
            "product-actions";


        const detailsBtn =
            document.createElement("button");

        detailsBtn.type = "button";

        detailsBtn.className =
            "product-details-btn";

        detailsBtn.textContent =
            "👁️ Details";


        detailsBtn.addEventListener(
            "click",
            () => openProductModal(product.id)
        );


        const whatsappBtn =
            document.createElement("button");

        whatsappBtn.type = "button";

        whatsappBtn.className =
            "product-whatsapp-btn";

        whatsappBtn.textContent =
            "💬 Enquire";


        whatsappBtn.addEventListener(
            "click",
            () => sendWhatsAppEnquiry(product)
        );


        actions.appendChild(detailsBtn);

        actions.appendChild(whatsappBtn);


        info.appendChild(title);

        info.appendChild(size);

        info.appendChild(price);

        info.appendChild(actions);


        card.appendChild(info);

        container.appendChild(card);

    });


    /* =================================================
       COUNTER
    ================================================= */

    const counter =
        document.getElementById("productCounter");


    if (counter) {

        counter.textContent =
            `${filtered.length} Materials`;

    }


    /* =================================================
       NO PRODUCTS
    ================================================= */

    const noProducts =
        document.getElementById("noProducts");


    if (noProducts) {

        noProducts.classList.toggle(
            "show",
            filtered.length === 0
        );

    }

}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

    const input =
        document.getElementById("materialSearch");

    const clearBtn =
        document.getElementById("clearSearch");


    if (!input) return;


    /* =====================================================
       RESTORE SEARCH AFTER REFRESH
    ===================================================== */

    input.value =
        searchText;


    if (clearBtn) {

        clearBtn.classList.toggle(
            "show",
            searchText.length > 0
        );

    }


    /* =====================================================
       SEARCH INPUT
    ===================================================== */

    input.addEventListener(
        "input",
        function () {

            searchText =
                input.value.trim();


            /* SAVE SEARCH */

            localStorage.setItem(
                "sandeepCatalogueSearch",
                searchText
            );


            renderProducts();


            if (clearBtn) {

                clearBtn.classList.toggle(
                    "show",
                    searchText.length > 0
                );

            }

        }
    );


    /* =====================================================
       CLEAR SEARCH
    ===================================================== */

    if (clearBtn) {

        clearBtn.addEventListener(
            "click",
            function () {

                input.value = "";

                searchText = "";


                /* REMOVE SAVED SEARCH */

                localStorage.removeItem(
                    "sandeepCatalogueSearch"
                );


                clearBtn.classList.remove(
                    "show"
                );


                renderProducts();

                input.focus();

            }
        );

    }

}


/* =========================================================
   SEARCH TOGGLE
========================================================= */

function setupSearchToggle() {

    const toggle =
        document.getElementById("searchToggle");

    const panel =
        document.getElementById("searchPanel");


    if (!toggle || !panel) return;


    toggle.addEventListener(
        "click",
        () => {

            panel.classList.toggle(
                "show"
            );

        }
    );

}


/* =========================================================
   RESET
========================================================= */

function setupResetButton() {

    const button =
        document.getElementById("resetFilters");


    if (!button) return;


    button.addEventListener(
        "click",
        function () {

            selectedCategory = "All";

            searchText = "";


            /* REMOVE SAVED CATEGORY */

            localStorage.removeItem(
                "sandeepCatalogueCategory"
            );


            /* REMOVE SAVED SEARCH */

            localStorage.removeItem(
                "sandeepCatalogueSearch"
            );


            const input =
                document.getElementById(
                    "materialSearch"
                );


            if (input) {

                input.value = "";

            }


            createCategories();

            renderProducts();

        }
    );

}


/* =========================================================
   MODAL
========================================================= */

function setupModal() {

    const modal =
        document.getElementById("productModal");

    const closeBtn =
        document.getElementById("modalClose");

    const backdrop =
        document.querySelector(
            ".modal-backdrop"
        );


    if (!modal) return;


    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            closeProductModal
        );

    }


    if (backdrop) {

        backdrop.addEventListener(
            "click",
            closeProductModal
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeProductModal();

            }

        }
    );

}


/* =========================================================
   OPEN PRODUCT MODAL
========================================================= */

function openProductModal(id) {

    const product =
        materials.find(
            item =>
                item.id === Number(id)
        );


    if (!product) return;


    const modal =
        document.getElementById(
            "productModal"
        );


    const img =
        document.getElementById(
            "modalProductImage"
        );


    const tag =
        document.getElementById(
            "modalProductTag"
        );


    const title =
        document.getElementById(
            "modalProductTitle"
        );


    const size =
        document.getElementById(
            "modalProductSize"
        );


    const price =
        document.getElementById(
            "modalProductPrice"
        );


    const desc =
        document.getElementById(
            "modalProductDescription"
        );


    const specs =
        document.getElementById(
            "modalSpecifications"
        );


    const whatsapp =
        document.getElementById(
            "modalWhatsapp"
        );


    /* =====================================================
       IMAGE
    ===================================================== */

    if (img) {

        img.style.display =
            "block";


        img.src =
            product.image || "";


        img.alt =
            `${product.name} ${product.size}`;


        img.onerror =
            function () {

                this.onerror = null;

                this.style.display =
                    "none";

            };

    }


    /* =====================================================
       TEXT
    ===================================================== */

    if (tag) {

        tag.textContent =
            product.category;

    }


    if (title) {

        title.textContent =
            product.name;

    }


    if (size) {

        size.textContent =
            product.size;

    }


    if (price) {

        price.textContent =
            product.price;

    }


    if (desc) {

        desc.textContent =
            product.description;

    }


    /* =====================================================
       SPECIFICATIONS
    ===================================================== */

    if (specs) {

        specs.innerHTML = "";


        const list =
            Array.isArray(
                product.specifications
            )
                ? product.specifications
                : [];


        list.forEach(spec => {

            const li =
                document.createElement("li");


            li.textContent =
                spec;


            specs.appendChild(li);

        });

    }


    /* =====================================================
       WHATSAPP
    ===================================================== */

    if (whatsapp) {

        const message =
            `Hello Sandeep ElectroFix 👋

I want to enquire about:

🛒 Item: ${product.name}
📏 Size: ${product.size}
📂 Category: ${product.category}`;


        whatsapp.href =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


        whatsapp.target =
            "_blank";


        whatsapp.rel =
            "noopener noreferrer";

    }


    /* =====================================================
       SHOW MODAL
    ===================================================== */

    if (modal) {

        modal.classList.add("show");

        document.body.style.overflow =
            "hidden";

    }

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeProductModal() {

    const modal =
        document.getElementById(
            "productModal"
        );


    if (!modal) return;


    modal.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   WHATSAPP ENQUIRY
========================================================= */

function sendWhatsAppEnquiry(product) {

    const message =
        `Hello Sandeep ElectroFix 👋

I want to enquire about:

🛒 Item: ${product.name}
📏 Size: ${product.size}
📂 Category: ${product.category}`;


    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   BACK BUTTON
========================================================= */

function setupBackButton() {

    const button =
        document.getElementById(
            "backButton"
        );


    if (!button) return;


    button.addEventListener(
        "click",
        function (event) {

            if (window.history.length > 1) {

                event.preventDefault();

                window.history.back();

            }

        }
    );

}


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "Sandeep ElectroFix Catalogue Engine Loaded:",
    materials.length,
    "materials"
);