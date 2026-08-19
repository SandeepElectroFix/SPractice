/* =========================================================
   SANDEEP ELECTROFIX
   MATERIAL ESTIMATE SYSTEM
   CORE JAVASCRIPT ENGINE
   Version 1.0.0
========================================================= */

"use strict";

/* =========================================================
   CONFIG SAFETY
========================================================= */

const CONFIG = window.MATERIAL_ESTIMATE_CONFIG || {};
const MATERIALS = window.MATERIAL_ESTIMATE_MATERIALS || [];

const GENERAL = CONFIG.general || {};
const ESTIMATE = CONFIG.estimate || {};
const DISPLAY = CONFIG.display || {};
const MENUS = CONFIG.menus || [];
const COLORS = (CONFIG.colors || []).filter(c => c.show !== false);


/* =========================================================
   APPLICATION STATE
========================================================= */

let currentMenu = "all";
let searchText = "";

let estimateItems = {};

let clientInfo = {
    name: "",
    phone: ""
};


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeClientInfo();
    initializeMenus();
    initializeSearch();

    renderMaterials();

    updateGrandTotal();

    console.log(
        "Sandeep ElectroFix Material Estimate System Loaded"
    );

});


/* =========================================================
   CLIENT INFORMATION
========================================================= */

function initializeClientInfo() {

    const nameInput =
        document.getElementById("clientName");

    const phoneInput =
        document.getElementById("clientPhone");

    if (nameInput) {

        nameInput.addEventListener("input", e => {

            clientInfo.name =
                e.target.value.trim();

        });

    }

    if (phoneInput) {

        phoneInput.addEventListener("input", e => {

            clientInfo.phone =
                e.target.value.trim();

        });

    }

}


/* =========================================================
   MENU SYSTEM
========================================================= */

function initializeMenus() {

    const container =
        document.getElementById("categoryContainer");

    if (!container) return;

    container.innerHTML = "";

    MENUS
        .filter(menu => menu.show !== false)
        .forEach(menu => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "material-menu-button";

            if (menu.id === currentMenu) {

                button.classList.add("active");

            }

            button.dataset.menu =
                menu.id;

            button.innerHTML = `

                <span class="menu-icon">
                    ${menu.icon || "📦"}
                </span>

                <span class="menu-name">
                    ${menu.name || menu.id}
                </span>

            `;

            button.addEventListener("click", () => {

                currentMenu =
                    menu.id;

                document
                    .querySelectorAll(".material-menu-button")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                button.classList.add("active");

                renderMaterials();

            });

            container.appendChild(button);

        });

}


/* =========================================================
   SEARCH SYSTEM
========================================================= */

function initializeSearch() {

    const searchInput =
        document.getElementById("materialSearch");

    const clearButton =
        document.getElementById("clearSearch");

    if (searchInput) {

        searchInput.addEventListener("input", e => {

            searchText =
                e.target.value
                    .trim()
                    .toLowerCase();

            renderMaterials();

        });

    }

    if (clearButton) {

        clearButton.addEventListener("click", () => {

            if (searchInput) {

                searchInput.value = "";

            }

            searchText = "";

            renderMaterials();

        });

    }


    const resetButton =
        document.getElementById("resetFilters");

    if (resetButton) {

        resetButton.addEventListener("click", () => {

            currentMenu = "all";
            searchText = "";

            if (searchInput) {

                searchInput.value = "";

            }

            initializeMenus();
            renderMaterials();

        });

    }

}


/* =========================================================
   FILTER MATERIALS
========================================================= */

function getFilteredMaterials() {

    return MATERIALS.filter(material => {

        /* ---------------------------------------------
           MENU FILTER
        --------------------------------------------- */

        const menuMatch =
            currentMenu === "all" ||
            material.stage === currentMenu;


        if (!menuMatch) {

            return false;

        }


        /* ---------------------------------------------
           SEARCH FILTER
        --------------------------------------------- */

        if (!searchText) {

            return true;

        }


        const searchableText = [

            material.name || "",

            material.size || "",

            material.stage || "",

            material.description || ""

        ]
            .join(" ")
            .toLowerCase();


        return searchableText
            .includes(searchText);

    });

}


/* =========================================================
   RENDER MATERIALS
========================================================= */

function renderMaterials() {

    const grid =
        document.getElementById("productsGrid");

    const noProducts =
        document.getElementById("noProducts");

    const counter =
        document.getElementById("productCounter");


    if (!grid) return;


    const materials =
        getFilteredMaterials();


    grid.innerHTML = "";


    if (counter) {

        counter.textContent =
            `${materials.length} Materials`;

    }


    if (!materials.length) {

        if (noProducts) {

            noProducts.style.display =
                "block";

        }

        return;

    }


    if (noProducts) {

        noProducts.style.display =
            "none";

    }


    materials.forEach(material => {

        grid.appendChild(
            createMaterialCard(material)
        );

    });

}


/* =========================================================
   MATERIAL CARD
========================================================= */

function createMaterialCard(material) {

    const card =
        document.createElement("article");

    card.className =
        "estimate-material-card";


    const item =
        getEstimateItem(material);


    const totalQty =
        calculateQuantity(material, item);


    const total =
        calculateItemTotal(material, item);


    card.innerHTML = `

        <div class="estimate-card-header">

            <div>

                <h3>
                    ${escapeHTML(material.name || "Material")}
                </h3>

                ${
                    material.size
                        ? `
                            <div class="material-size">
                                ${escapeHTML(material.size)}
                            </div>
                          `
                        : ""
                }

            </div>

            <span class="material-stage">
                ${getStageName(material.stage)}
            </span>

        </div>


        ${
            ESTIMATE.predefinedRate !== false
                ? createRateBox(material, item)
                : ""
        }


        ${
            material.colorWise && ESTIMATE.colorWiseQuantity !== false
                ? createColorQuantityBoxes(material, item)
                : createNormalQuantityBox(material, item)
        }


        ${
            DISPLAY.showTotal !== false
                ? `
                    <div class="estimate-item-total">

                        <span>
                            Item Total
                        </span>

                        <strong id="total-${material.id}">
                            ₹${formatMoney(total)}
                        </strong>

                    </div>
                  `
                : ""
        }

    `;


    attachCardEvents(
        card,
        material
    );


    return card;

}


/* =========================================================
   RATE BOX
========================================================= */

function createRateBox(material, item) {

    const rate =
        Number(
            item.rate ??
            material.rate ??
            0
        );


    return `

        <div class="estimate-rate-row">

            <label>
                Rate
            </label>

            <div class="rate-input-wrapper">

                <span>₹</span>

                <input
                    type="number"
                    min="0"
                    step="0.01"
                    class="material-rate"
                    data-id="${material.id}"
                    value="${rate}"
                    ${
                        material.rateEditable === false ||
                        ESTIMATE.userCanChangeRate === false
                            ? "readonly"
                            : ""
                    }
                >

            </div>

        </div>

    `;

}


/* =========================================================
   NORMAL QUANTITY
========================================================= */

function createNormalQuantityBox(
    material,
    item
) {

    const quantity =
        Number(item.quantity || 0);


    return `

        <div class="estimate-quantity-row">

            <label>
                Quantity
            </label>

            <input
                type="number"
                min="0"
                step="0.01"
                class="material-quantity"
                data-id="${material.id}"
                value="${quantity}"
                placeholder="Enter Qty"
            >

        </div>

    `;

}


/* =========================================================
   COLOUR WISE QUANTITY
========================================================= */

function createColorQuantityBoxes(
    material,
    item
) {

    let html = `

        <div class="color-quantity-section">

            <div class="color-section-title">
                Colour Quantity
            </div>

            <div class="color-quantity-grid">
    `;


    COLORS.forEach(color => {

        const quantity =
            Number(
                item.colors?.[color.id] || 0
            );


        html += `

            <div class="color-quantity-item">

                <label>
                    ${escapeHTML(color.name)}
                </label>

                <input
                    type="number"
                    min="0"
                    step="0.01"
                    class="color-quantity"
                    data-id="${material.id}"
                    data-color="${color.id}"
                    value="${quantity}"
                    placeholder="0"
                >

            </div>

        `;

    });


    html += `

            </div>

            <div class="color-total-row">

                <span>
                    Total Qty
                </span>

                <strong>
                    ${calculateQuantity(material, item)}
                </strong>

            </div>

        </div>

    `;


    return html;

}


/* =========================================================
   ATTACH CARD EVENTS
========================================================= */

function attachCardEvents(
    card,
    material
) {

    /* ---------------------------------------------
       RATE
    --------------------------------------------- */

    const rateInput =
        card.querySelector(".material-rate");


    if (rateInput) {

        rateInput.addEventListener(
            "input",
            () => {

                const item =
                    getEstimateItem(material);

                item.rate =
                    Number(rateInput.value || 0);

                updateCardTotal(
                    card,
                    material
                );

                updateGrandTotal();

            }
        );

    }


    /* ---------------------------------------------
       NORMAL QUANTITY
    --------------------------------------------- */

    const quantityInput =
        card.querySelector(".material-quantity");


    if (quantityInput) {

        quantityInput.addEventListener(
            "input",
            () => {

                const item =
                    getEstimateItem(material);

                item.quantity =
                    Number(quantityInput.value || 0);

                updateCardTotal(
                    card,
                    material
                );

                updateGrandTotal();

            }
        );

    }


    /* ---------------------------------------------
       COLOUR QUANTITY
    --------------------------------------------- */

    card
        .querySelectorAll(".color-quantity")
        .forEach(input => {

            input.addEventListener(
                "input",
                () => {

                    const item =
                        getEstimateItem(material);


                    if (!item.colors) {

                        item.colors = {};

                    }


                    item.colors[
                        input.dataset.color
                    ] =
                        Number(input.value || 0);


                    updateCardTotal(
                        card,
                        material
                    );

                    updateGrandTotal();

                }
            );

        });

}


/* =========================================================
   GET / CREATE ESTIMATE ITEM
========================================================= */

function getEstimateItem(material) {

    if (!estimateItems[material.id]) {

        estimateItems[material.id] = {

            rate:
                Number(material.rate || 0),

            quantity:
                0,

            colors: {}

        };

    }

    return estimateItems[material.id];

}


/* =========================================================
   CALCULATE QUANTITY
========================================================= */

function calculateQuantity(
    material,
    item
) {

    if (
        material.colorWise &&
        ESTIMATE.colorWiseQuantity !== false
    ) {

        return COLORS.reduce(
            (total, color) => {

                return total +
                    Number(
                        item.colors?.[color.id] || 0
                    );

            },
            0
        );

    }


    return Number(
        item.quantity || 0
    );

}


/* =========================================================
   CALCULATE ITEM TOTAL
========================================================= */

function calculateItemTotal(
    material,
    item
) {

    const quantity =
        calculateQuantity(
            material,
            item
        );


    const rate =
        Number(
            item.rate ??
            material.rate ??
            0
        );


    return quantity * rate;

}


/* =========================================================
   UPDATE CARD TOTAL
========================================================= */

function updateCardTotal(
    card,
    material
) {

    const item =
        getEstimateItem(material);


    const total =
        calculateItemTotal(
            material,
            item
        );


    const totalElement =
        card.querySelector(
            `#total-${material.id}`
        );


    if (totalElement) {

        totalElement.textContent =
            `₹${formatMoney(total)}`;

    }


    const colorTotal =
        card.querySelector(
            ".color-total-row strong"
        );


    if (
        colorTotal &&
        material.colorWise
    ) {

        colorTotal.textContent =
            calculateQuantity(
                material,
                item
            );

    }

}


/* =========================================================
   GRAND TOTAL
========================================================= */

function updateGrandTotal() {

    let grandTotal = 0;


    MATERIALS.forEach(material => {

        const item =
            estimateItems[material.id];


        if (!item) return;


        grandTotal +=
            calculateItemTotal(
                material,
                item
            );

    });


    const totalElement =
        document.getElementById(
            "grandTotal"
        );


    if (totalElement) {

        totalElement.textContent =
            `₹${formatMoney(grandTotal)}`;

    }


    const qtyElement =
        document.getElementById(
            "grandTotalItems"
        );


    if (qtyElement) {

        let selectedCount = 0;


        MATERIALS.forEach(material => {

            const item =
                estimateItems[material.id];


            if (!item) return;


            const qty =
                calculateQuantity(
                    material,
                    item
                );


            if (qty > 0) {

                selectedCount++;

            }

        });


        qtyElement.textContent =
            `${selectedCount} Items`;

    }

}


/* =========================================================
   STAGE NAME
========================================================= */

function getStageName(stageId) {

    const stage =
        MENUS.find(
            menu => menu.id === stageId
        );


    if (!stage) {

        return "";

    }


    return stage.name ||
        stage.id;

}


/* =========================================================
   MONEY FORMAT
========================================================= */

function formatMoney(amount) {

    return Number(amount || 0)
        .toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }
        );

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   PUBLIC API
========================================================= */

window.MaterialEstimate = {

    getItems() {

        return estimateItems;

    },


    getGrandTotal() {

        return MATERIALS.reduce(
            (total, material) => {

                const item =
                    estimateItems[material.id];

                if (!item) {

                    return total;

                }


                return total +
                    calculateItemTotal(
                        material,
                        item
                    );

            },
            0
        );

    },


    clearEstimate() {

        estimateItems = {};

        renderMaterials();

        updateGrandTotal();

    },


    getClientInfo() {

        return clientInfo;

    }

};
