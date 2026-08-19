/* =========================================================
   SANDEEP ELECTROFIX
   MATERIAL ESTIMATE SYSTEM
   CORE JAVASCRIPT ENGINE
   Version 2.0.0
   ---------------------------------------------------------
   Features:
   • Stage-wise Material Menu
   • Search
   • Smart Option Dropdown
   • Editable Rate
   • Quantity
   • Colour-wise Wire Quantity
   • Item Total
   • Grand Total
   • Selected Item Counter
   • Persistent Selection During Filtering
========================================================= */

"use strict";

/* =========================================================
   CONFIG SAFETY
========================================================= */

const CONFIG =
    window.MATERIAL_ESTIMATE_CONFIG || {};

const MATERIALS =
    window.MATERIAL_ESTIMATE_MATERIALS || [];

const GENERAL =
    CONFIG.general || {};

const ESTIMATE =
    CONFIG.estimate || {};

const DISPLAY =
    CONFIG.display || {};

const MENUS =
    CONFIG.menus || [];

const COLORS =
    (CONFIG.colors || [])
        .filter(color => color.show !== false);


/* =========================================================
   APPLICATION STATE
========================================================= */

let currentMenu = "all";

let searchText = "";

/*
   Selected estimate data

   Example:

   estimateItems = {
       "stage2-gi-board": {
           selectedOption: "stage2-gi-board-2m",
           rate: 50,
           quantity: 4
       }
   }
*/

let estimateItems = {};

let clientInfo = {
    name: "",
    phone: ""
};


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeClientInfo();

        initializeMenus();

        initializeSearch();

        renderMaterials();

        updateGrandTotal();

        console.log(
            "Sandeep ElectroFix Material Estimate System Loaded"
        );

    }
);


/* =========================================================
   CLIENT INFORMATION
========================================================= */

function initializeClientInfo() {

    const nameInput =
        document.getElementById(
            "clientName"
        );

    const phoneInput =
        document.getElementById(
            "clientPhone"
        );


    if (nameInput) {

        nameInput.addEventListener(
            "input",
            event => {

                clientInfo.name =
                    event.target.value.trim();

            }
        );

    }


    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            event => {

                clientInfo.phone =
                    event.target.value.trim();

            }
        );

    }

}


/* =========================================================
   MENU SYSTEM
========================================================= */

function initializeMenus() {

    const container =
        document.getElementById(
            "categoryContainer"
        );


    if (!container) return;


    container.innerHTML = "";


    MENUS
        .filter(
            menu => menu.show !== false
        )
        .forEach(menu => {

            const button =
                document.createElement(
                    "button"
                );


            button.type = "button";

            button.className =
                "material-menu-button";


            if (
                menu.id === currentMenu
            ) {

                button.classList.add(
                    "active"
                );

            }


            button.dataset.menu =
                menu.id;


            button.innerHTML = `

                <span class="menu-icon">
                    ${menu.icon || "📦"}
                </span>

                <span class="menu-name">
                    ${escapeHTML(
                        menu.name ||
                        menu.id
                    )}
                </span>

            `;


            button.addEventListener(
                "click",
                () => {

                    currentMenu =
                        menu.id;


                    document
                        .querySelectorAll(
                            ".material-menu-button"
                        )
                        .forEach(btn =>
                            btn.classList.remove(
                                "active"
                            )
                        );


                    button.classList.add(
                        "active"
                    );


                    renderMaterials();

                }
            );


            container.appendChild(
                button
            );

        });

}


/* =========================================================
   SEARCH SYSTEM
========================================================= */

function initializeSearch() {

    const searchInput =
        document.getElementById(
            "materialSearch"
        );

    const clearButton =
        document.getElementById(
            "clearSearch"
        );

    const resetButton =
        document.getElementById(
            "resetFilters"
        );


    /* ---------------------------------------------
       SEARCH
    --------------------------------------------- */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            event => {

                searchText =
                    event.target.value
                        .trim()
                        .toLowerCase();


                renderMaterials();

            }
        );

    }


    /* ---------------------------------------------
       CLEAR SEARCH
    --------------------------------------------- */

    if (clearButton) {

        clearButton.addEventListener(
            "click",
            () => {

                if (searchInput) {

                    searchInput.value = "";

                }


                searchText = "";

                renderMaterials();

            }
        );

    }


    /* ---------------------------------------------
       RESET FILTERS
    --------------------------------------------- */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            () => {

                currentMenu = "all";

                searchText = "";


                if (searchInput) {

                    searchInput.value = "";

                }


                initializeMenus();

                renderMaterials();

            }
        );

    }

}


/* =========================================================
   GROUP MATERIALS
   ---------------------------------------------------------
   Same material name + same stage = one card
   Multiple sizes/options = dropdown
========================================================= */

function getMaterialGroups() {

    const groups = {};

    MATERIALS.forEach(
        material => {

            const key =
                `${material.stage}__${material.name}`;

            if (!groups[key]) {

                groups[key] = {

                    key: key,

                    stage:
                        material.stage,

                    name:
                        material.name,

                    materials: []

                };

            }


            groups[key]
                .materials
                .push(material);

        }
    );


    return Object.values(groups);

}


/* =========================================================
   FILTER MATERIAL GROUPS
========================================================= */

function getFilteredMaterials() {

    const groups =
        getMaterialGroups();


    return groups.filter(
        group => {

            /* -----------------------------------------
               STAGE FILTER
            ----------------------------------------- */

            const menuMatch =
                currentMenu === "all" ||
                group.stage === currentMenu;


            if (!menuMatch) {

                return false;

            }


            /* -----------------------------------------
               SEARCH FILTER
            ----------------------------------------- */

            if (!searchText) {

                return true;

            }


            const searchableText = [

                group.name || "",

                group.stage || "",

                ...group.materials.map(
                    material =>
                        `${material.size || ""} ${
                            material.description || ""
                        }`
                )

            ]
                .join(" ")
                .toLowerCase();


            return searchableText.includes(
                searchText
            );

        }
    );

}


/* =========================================================
   RENDER MATERIALS
========================================================= */

function renderMaterials() {

    const grid =
        document.getElementById(
            "productsGrid"
        );

    const noProducts =
        document.getElementById(
            "noProducts"
        );

    const counter =
        document.getElementById(
            "productCounter"
        );


    if (!grid) return;


    const groups =
        getFilteredMaterials();


    grid.innerHTML = "";


    if (counter) {

        counter.textContent =
            `${groups.length} Materials`;

    }


    if (!groups.length) {

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


    groups.forEach(
        group => {

            grid.appendChild(
                createMaterialCard(
                    group
                )
            );

        }
    );

}


/* =========================================================
   MATERIAL CARD
========================================================= */

function createMaterialCard(group) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "estimate-material-card";


    const selectedMaterial =
        getSelectedMaterial(
            group
        );


    const item =
        getEstimateItem(
            selectedMaterial
        );


    const totalQty =
        calculateQuantity(
            selectedMaterial,
            item
        );


    const total =
        calculateItemTotal(
            selectedMaterial,
            item
        );


    const hasOptions =
        group.materials.length > 1;


    card.dataset.group =
        group.key;


    card.innerHTML = `

        <div class="estimate-card-header">

            <div>

                <h3>
                    ${escapeHTML(
                        group.name ||
                        "Material"
                    )}
                </h3>

            </div>

            <span class="material-stage">
                ${escapeHTML(
                    getStageName(
                        group.stage
                    )
                )}
            </span>

        </div>


        ${
            hasOptions
                ? createOptionDropdown(
                    group,
                    selectedMaterial
                )
                : createSingleOptionInfo(
                    selectedMaterial
                )
        }


        ${
            ESTIMATE.predefinedRate !== false
                ? createRateBox(
                    selectedMaterial,
                    item
                )
                : ""
        }


        ${
            selectedMaterial.colorWise &&
            ESTIMATE.colorWiseQuantity !== false

                ? createColorQuantityBoxes(
                    selectedMaterial,
                    item
                )

                : createNormalQuantityBox(
                    selectedMaterial,
                    item
                )
        }


        ${
            DISPLAY.showTotal !== false

                ? `

                    <div class="estimate-item-total">

                        <span>
                            Item Total
                        </span>

                        <strong
                            class="item-total-value"
                        >
                            ₹${formatMoney(
                                total
                            )}
                        </strong>

                    </div>

                  `

                : ""
        }

    `;


    attachCardEvents(
        card,
        group
    );


    return card;

}


/* =========================================================
   OPTION DROPDOWN
========================================================= */

function createOptionDropdown(
    group,
    selectedMaterial
) {

    return `

        <div class="estimate-option-row">

            <label>
                Select Option
            </label>

            <select
                class="material-option-select"
            >

                ${group.materials
                    .map(
                        material => `

                            <option
                                value="${escapeHTML(
                                    material.id
                                )}"
                                ${
                                    material.id ===
                                    selectedMaterial.id
                                        ? "selected"
                                        : ""
                                }
                            >

                                ${escapeHTML(
                                    material.size ||
                                    "Standard"
                                )}

                            </option>

                        `
                    )
                    .join("")
                }

            </select>

        </div>

    `;

}


/* =========================================================
   SINGLE OPTION INFO
========================================================= */

function createSingleOptionInfo(
    material
) {

    if (!material.size) {

        return "";

    }


    return `

        <div class="estimate-option-row">

            <label>
                Size / Type
            </label>

            <div class="material-single-option">
                ${escapeHTML(
                    material.size
                )}
            </div>

        </div>

    `;

}


/* =========================================================
   RATE BOX
========================================================= */

function createRateBox(
    material,
    item
) {

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
        Number(
            item.quantity || 0
        );


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


    COLORS.forEach(
        color => {

            const quantity =
                Number(
                    item.colors?.[
                        color.id
                    ] || 0
                );


            html += `

                <div class="color-quantity-item">

                    <label>
                        ${escapeHTML(
                            color.name
                        )}
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

        }
    );


    html += `

            </div>

            <div class="color-total-row">

                <span>
                    Total Qty
                </span>

                <strong>
                    ${formatQuantity(
                        calculateQuantity(
                            material,
                            item
                        )
                    )}
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
    group
) {

    /* =====================================================
       OPTION CHANGE
    ===================================================== */

    const optionSelect =
        card.querySelector(
            ".material-option-select"
        );


    if (optionSelect) {

        optionSelect.addEventListener(
            "change",
            () => {

                const material =
                    group.materials.find(
                        item =>
                            item.id ===
                            optionSelect.value
                    );


                if (!material) return;


                /*
                   If this option has never
                   been selected before,
                   create its own estimate item.
                */

                getEstimateItem(
                    material
                );


                /*
                   Re-render only this card.
                */

                const newCard =
                    createMaterialCard(
                        group
                    );


                card.replaceWith(
                    newCard
                );


                updateGrandTotal();

            }
        );

    }


    /* =====================================================
       RATE
    ===================================================== */

    const rateInput =
        card.querySelector(
            ".material-rate"
        );


    if (rateInput) {

        rateInput.addEventListener(
            "input",
            () => {

                const material =
                    getSelectedMaterial(
                        group
                    );


                const item =
                    getEstimateItem(
                        material
                    );


                item.rate =
                    Number(
                        rateInput.value || 0
                    );


                updateCardTotal(
                    card,
                    material
                );


                updateGrandTotal();

            }
        );

    }


    /* =====================================================
       NORMAL QUANTITY
    ===================================================== */

    const quantityInput =
        card.querySelector(
            ".material-quantity"
        );


    if (quantityInput) {

        quantityInput.addEventListener(
            "input",
            () => {

                const material =
                    getSelectedMaterial(
                        group
                    );


                const item =
                    getEstimateItem(
                        material
                    );


                item.quantity =
                    Number(
                        quantityInput.value || 0
                    );


                updateCardTotal(
                    card,
                    material
                );


                updateGrandTotal();

            }
        );

    }


    /* =====================================================
       COLOUR QUANTITY
    ===================================================== */

    card
        .querySelectorAll(
            ".color-quantity"
        )
        .forEach(
            input => {

                input.addEventListener(
                    "input",
                    () => {

                        const material =
                            getSelectedMaterial(
                                group
                            );


                        const item =
                            getEstimateItem(
                                material
                            );


                        if (!item.colors) {

                            item.colors = {};

                        }


                        item.colors[
                            input.dataset.color
                        ] =
                            Number(
                                input.value || 0
                            );


                        updateCardTotal(
                            card,
                            material
                        );


                        updateGrandTotal();

                    }
                );

            }
        );

}


/* =========================================================
   GET SELECTED MATERIAL
========================================================= */

function getSelectedMaterial(
    group
) {

    /*
       Check if any option from this
       group already has quantity/rate.
    */

    const activeMaterial =
        group.materials.find(
            material =>
                estimateItems[
                    material.id
                ]
        );


    if (activeMaterial) {

        return activeMaterial;

    }


    /*
       Otherwise first option.
    */

    return group.materials[0];

}


/* =========================================================
   GET / CREATE ESTIMATE ITEM
========================================================= */

function getEstimateItem(
    material
) {

    if (!material) {

        return {

            rate: 0,

            quantity: 0,

            colors: {}

        };

    }


    if (
        !estimateItems[
            material.id
        ]
    ) {

        estimateItems[
            material.id
        ] = {

            rate:
                Number(
                    material.rate || 0
                ),

            quantity:
                0,

            colors: {}

        };

    }


    return estimateItems[
        material.id
    ];

}


/* =========================================================
   CALCULATE QUANTITY
========================================================= */

function calculateQuantity(
    material,
    item
) {

    if (
        material &&
        material.colorWise &&
        ESTIMATE.colorWiseQuantity !== false
    ) {

        return COLORS.reduce(
            (
                total,
                color
            ) => {

                return total +
                    Number(
                        item?.colors?.[
                            color.id
                        ] || 0
                    );

            },
            0
        );

    }


    return Number(
        item?.quantity || 0
    );

}


/* =========================================================
   CALCULATE ITEM TOTAL
========================================================= */

function calculateItemTotal(
    material,
    item
) {

    if (!material || !item) {

        return 0;

    }


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
        getEstimateItem(
            material
        );


    const total =
        calculateItemTotal(
            material,
            item
        );


    const totalElement =
        card.querySelector(
            ".item-total-value"
        );


    if (totalElement) {

        totalElement.textContent =
            `₹${formatMoney(
                total
            )}`;

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
            formatQuantity(
                calculateQuantity(
                    material,
                    item
                )
            );

    }

}


/* =========================================================
   GRAND TOTAL
========================================================= */

function updateGrandTotal() {

    let grandTotal = 0;

    let selectedCount = 0;


    MATERIALS.forEach(
        material => {

            const item =
                estimateItems[
                    material.id
                ];


            if (!item) {

                return;

            }


            const quantity =
                calculateQuantity(
                    material,
                    item
                );


            if (quantity > 0) {

                selectedCount++;

            }


            grandTotal +=
                calculateItemTotal(
                    material,
                    item
                );

        }
    );


    const totalElement =
        document.getElementById(
            "grandTotal"
        );


    if (totalElement) {

        totalElement.textContent =
            `₹${formatMoney(
                grandTotal
            )}`;

    }


    const qtyElement =
        document.getElementById(
            "grandTotalItems"
        );


    if (qtyElement) {

        qtyElement.textContent =
            `${selectedCount} Items`;

    }

}


/* =========================================================
   STAGE NAME
========================================================= */

function getStageName(
    stageId
) {

    const stage =
        MENUS.find(
            menu =>
                menu.id === stageId
        );


    if (!stage) {

        return stageId || "";

    }


    return stage.name ||
        stage.id;

}


/* =========================================================
   FORMAT QUANTITY
========================================================= */

function formatQuantity(
    quantity
) {

    return Number(
        quantity || 0
    )
        .toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }
        );

}


/* =========================================================
   MONEY FORMAT
========================================================= */

function formatMoney(
    amount
) {

    return Number(
        amount || 0
    )
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

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   PUBLIC API
========================================================= */

window.MaterialEstimate = {

    /* ---------------------------------------------
       GET ALL ITEMS
    --------------------------------------------- */

    getItems() {

        return estimateItems;

    },


    /* ---------------------------------------------
       GET GRAND TOTAL
    --------------------------------------------- */

    getGrandTotal() {

        return MATERIALS.reduce(
            (
                total,
                material
            ) => {

                const item =
                    estimateItems[
                        material.id
                    ];


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


    /* ---------------------------------------------
       GET SELECTED MATERIALS ONLY
    --------------------------------------------- */

    getSelectedItems() {

        return MATERIALS
            .filter(
                material => {

                    const item =
                        estimateItems[
                            material.id
                        ];


                    if (!item) {

                        return false;

                    }


                    return (
                        calculateQuantity(
                            material,
                            item
                        ) > 0
                    );

                }
            )
            .map(
                material => {

                    const item =
                        estimateItems[
                            material.id
                        ];


                    return {

                        id:
                            material.id,

                        stage:
                            material.stage,

                        name:
                            material.name,

                        size:
                            material.size,

                        rate:
                            Number(
                                item.rate ||
                                material.rate ||
                                0
                            ),

                        quantity:
                            calculateQuantity(
                                material,
                                item
                            ),

                        colors:
                            item.colors || {},

                        total:
                            calculateItemTotal(
                                material,
                                item
                            )

                    };

                }
            );

    },


    /* ---------------------------------------------
       GET CLIENT INFO
    --------------------------------------------- */

    getClientInfo() {

        return clientInfo;

    },


    /* ---------------------------------------------
       CLEAR ESTIMATE
    --------------------------------------------- */

    clearEstimate() {

        estimateItems = {};

        renderMaterials();

        updateGrandTotal();

    },


    /* ---------------------------------------------
       REFRESH
    --------------------------------------------- */

    refresh() {

        renderMaterials();

        updateGrandTotal();

    },


    /* ---------------------------------------------
       SET RATE
    --------------------------------------------- */

    setRate(
        materialId,
        rate
    ) {

        const material =
            MATERIALS.find(
                item =>
                    item.id ===
                    materialId
            );


        if (!material) {

            return false;

        }


        const item =
            getEstimateItem(
                material
            );


        item.rate =
            Number(
                rate || 0
            );


        renderMaterials();

        updateGrandTotal();


        return true;

    }

};


/* =========================================================
   DEBUG INFORMATION
========================================================= */

console.log(
    "Material Groups:",
    getMaterialGroups().length
);

console.log(
    "Total Materials:",
    MATERIALS.length
);

console.log(
    "Stage 1:",
    MATERIALS.filter(
        material =>
            material.stage === "stage-1"
    ).length
);

console.log(
    "Stage 2:",
    MATERIALS.filter(
        material =>
            material.stage === "stage-2"
    ).length
);

console.log(
    "Stage 3:",
    MATERIALS.filter(
        material =>
            material.stage === "stage-3"
    ).length
);

console.log(
    "Stage 4:",
    MATERIALS.filter(
        material =>
            material.stage === "stage-4"
    ).length
);

console.log(
    "Stage 5:",
    MATERIALS.filter(
        material =>
            material.stage === "stage-5"
    ).length
);
