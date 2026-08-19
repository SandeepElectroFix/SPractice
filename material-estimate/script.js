/* =========================================================
   SANDEEP ELECTROFIX
   MATERIAL ESTIMATE SYSTEM
   CORE JAVASCRIPT ENGINE
   Version 3.0.0

   Supports:
   • Hindi / English
   • Stage / Category Menu
   • Material → Type → Sub Type
   • Colour Selection
   • Quantity
   • Unit
   • Brand AFTER Quantity
   • Non Brand / Local
   • Skip Brand
   • Search
   • Show / Hide
   • Final Estimate
   • Edit
   • Delete
   • Add More
   • Popup Back
   • Android / Browser Back
   • Local Storage
========================================================= */


/* =========================================================
   GLOBAL STATE
========================================================= */

let currentLang =
    localStorage.getItem("sandeepMaterialLang") || "hi";

let selectedItems = [];

let navigationStack = [];

let currentStage = null;

let currentMaterial = null;

let currentType = null;

let currentSubType = null;

let currentColour = null;

let currentQuantity = 1;

let currentUnit = "pcs";

let currentBrand = null;

let searchTimeout = null;


/* =========================================================
   SHORTCUTS
========================================================= */

const CONFIG =
    window.MATERIAL_ESTIMATE_CONFIG || {};

const GENERAL =
    CONFIG.general || {};


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeApplication();

});


/* =========================================================
   INITIALIZE APPLICATION
========================================================= */

function initializeApplication() {

    loadSavedEstimate();

    initializeLanguage();

    initializeYear();

    renderStageMenu();

    initializeSearch();

    initializeMainButtons();

    initializePanelButtons();

    initializeEstimateEvents();

    initializeBackButton();

    renderEstimate();

    applyLanguage();

}


/* =========================================================
   LANGUAGE
========================================================= */

function initializeLanguage() {

    document
        .querySelectorAll(".lang-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const lang =
                    button.dataset.lang || "hi";

                setLanguage(lang);

            });

        });

}


function setLanguage(lang) {

    currentLang =
        lang === "en" ? "en" : "hi";

    localStorage.setItem(
        "sandeepMaterialLang",
        currentLang
    );

    document
        .querySelectorAll(".lang-btn")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.lang === currentLang
            );

        });

    applyLanguage();

    renderStageMenu();

    if (!isPanelHidden()) {

        refreshCurrentPanel();

    }

    renderEstimate();

    updateSearchPlaceholder();

}


/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {

    materialEstimate: {
        hi: "सामग्री अनुमान",
        en: "Material Estimate"
    },

    selectMaterial: {
        hi: "सामग्री कैटलॉग",
        en: "Material Catalogue"
    },

    selectCategory: {
        hi: "सामग्री चुनने के लिए श्रेणी चुनें",
        en: "Select a category to continue"
    },

    allMaterials: {
        hi: "सभी सामग्री",
        en: "All Materials"
    },

    finalEstimate: {
        hi: "अंतिम अनुमान",
        en: "Final Estimate"
    },

    estimateList: {
        hi: "अनुमान सूची",
        en: "Estimate List"
    },

    noItems: {
        hi: "अभी कोई सामग्री नहीं जोड़ी गई",
        en: "No materials added yet"
    },

    subtotal: {
        hi: "उप-योग",
        en: "Subtotal"
    },

    discount: {
        hi: "छूट",
        en: "Discount"
    },

    labour: {
        hi: "लेबर / अतिरिक्त",
        en: "Labour / Extra"
    },

    grandTotal: {
        hi: "कुल राशि",
        en: "Grand Total"
    },

    editItem: {
        hi: "सामग्री संपादित करें",
        en: "Edit Item"
    },

    quantity: {
        hi: "मात्रा",
        en: "Quantity"
    },

    unit: {
        hi: "इकाई",
        en: "Unit"
    },

    brand: {
        hi: "ब्रांड",
        en: "Brand"
    },

    selectBrand: {
        hi: "ब्रांड चुनें",
        en: "Select Brand"
    },

    skipBrand: {
        hi: "ब्रांड छोड़ें",
        en: "Skip Brand"
    },

    localBrand: {
        hi: "बिना ब्रांड / लोकल",
        en: "Non Brand / Local"
    },

    addToEstimate: {
        hi: "अनुमान में जोड़ें",
        en: "Add to Estimate"
    },

    updateEstimate: {
        hi: "अनुमान अपडेट करें",
        en: "Update Estimate"
    },

    back: {
        hi: "पीछे",
        en: "Back"
    },

    close: {
        hi: "बंद करें",
        en: "Close"
    },

    delete: {
        hi: "हटाएं",
        en: "Delete"
    },

    edit: {
        hi: "बदलें",
        en: "Edit"
    },

    addMore: {
        hi: "और सामग्री जोड़ें",
        en: "Add More"
    },

    price: {
        hi: "दर",
        en: "Rate"
    },

    total: {
        hi: "कुल",
        en: "Total"
    },

    selected: {
        hi: "चयनित",
        en: "Selected"
    },

    all: {
        hi: "सभी",
        en: "All"
    },

    selectType: {
        hi: "प्रकार चुनें",
        en: "Select Type"
    },

    selectSubType: {
        hi: "उप-प्रकार चुनें",
        en: "Select Sub Type"
    },

    selectColour: {
        hi: "रंग चुनें",
        en: "Select Colour"
    }

};


/* =========================================================
   APPLY LANGUAGE
========================================================= */

function applyLanguage() {

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;

            if (
                TRANSLATIONS[key] &&
                TRANSLATIONS[key][currentLang]
            ) {

                element.textContent =
                    TRANSLATIONS[key][currentLang];

            }

        });

}


/* =========================================================
   GET NAME
========================================================= */

function getName(item) {

    if (!item) return "";

    if (currentLang === "en") {

        return (
            item.name_en ||
            item.name_hi ||
            ""
        );

    }

    return (
        item.name_hi ||
        item.name_en ||
        ""
    );

}


/* =========================================================
   GET TRANSLATION
========================================================= */

function t(key) {

    if (
        TRANSLATIONS[key] &&
        TRANSLATIONS[key][currentLang]
    ) {

        return TRANSLATIONS[key][currentLang];

    }

    return key;

}


/* =========================================================
   YEAR
========================================================= */

function initializeYear() {

    const year =
        document.getElementById("currentYear");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   STAGE MENU
========================================================= */

function renderStageMenu() {

    const container =
        document.getElementById("stageMenu");

    if (!container) return;

    container.innerHTML = "";

    const stages =
        typeof CONFIG.getStages === "function"
            ? CONFIG.getStages()
            : CONFIG.stages || [];

    stages.forEach((stage, index) => {

        if (stage.show === false) return;

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "stage-button material-menu-button";

        button.dataset.stageId =
            stage.id;

        button.innerHTML = `

            <span class="menu-icon">
                ${stage.icon || "⚡"}
            </span>

            <span class="menu-text">

                <strong>
                    ${escapeHtml(
                        currentLang === "en"
                            ? (
                                stage.short_en ||
                                stage.name_en
                            )
                            : (
                                stage.short_hi ||
                                stage.name_hi
                            )
                    )}
                </strong>

                <small>
                    ${escapeHtml(
                        currentLang === "en"
                            ? stage.name_en
                            : stage.name_hi
                    )}
                </small>

            </span>

            <span class="menu-arrow">
                ›
            </span>

        `;

        button.addEventListener(
            "click",
            () => openStage(stage)
        );

        container.appendChild(button);

    });

}


/* =========================================================
   OPEN STAGE
========================================================= */

function openStage(stage) {

    if (!stage) return;

    currentStage = stage;

    navigationStack = [
        {
            level: "stage",
            stage: stage
        }
    ];

    openCataloguePanel();

    renderMaterialList(stage);

}


/* =========================================================
   MATERIAL LIST
========================================================= */

function renderMaterialList(stage) {

    if (!stage) return;

    const title =
        currentLang === "en"
            ? stage.name_en
            : stage.name_hi;

    setPanelHeader(
        title,
        currentLang === "en"
            ? "Select material"
            : "सामग्री चुनें"
    );

    const materials =
        (stage.materials || [])
            .filter(item => item.show !== false);

    renderCards(
        materials,
        "material"
    );

}


/* =========================================================
   RENDER CARDS
========================================================= */

function renderCards(items, level) {

    const container =
        document.getElementById(
            "catalogueContent"
        );

    if (!container) return;

    container.innerHTML = "";

    if (!items || !items.length) {

        container.innerHTML = `

            <div class="catalogue-empty">

                <span>📦</span>

                <p>
                    ${
                        currentLang === "en"
                            ? "No items available"
                            : "कोई सामग्री उपलब्ध नहीं"
                    }
                </p>

            </div>

        `;

        return;

    }


    const grid =
        document.createElement("div");

    grid.className =
        "catalogue-card-grid";


    items.forEach(item => {

        if (!item || item.show === false) {
            return;
        }

        const card =
            document.createElement("button");

        card.type = "button";

        card.className =
            "catalogue-card";


        const icon =
            item.icon || "📦";


        const name =
            getName(item);


        let extra = "";


        if (level === "material") {

            const typeCount =
                Array.isArray(item.types)
                    ? item.types.filter(
                        type =>
                            typeof type === "object"
                                ? type.show !== false
                                : true
                    ).length
                    : 0;

            if (typeCount) {

                extra = `

                    <small>
                        ${
                            currentLang === "en"
                                ? `${typeCount} options`
                                : `${typeCount} विकल्प`
                        }
                    </small>

                `;

            } else {

                extra = `

                    <small>
                        ${escapeHtml(
                            formatUnit(item.unit)
                        )}
                    </small>

                `;

            }

        }


        if (level === "type") {

            extra = `

                <small>
                    ${escapeHtml(
                        formatUnit(
                            currentMaterial?.unit
                        )
                    )}
                </small>

            `;

        }


        card.innerHTML = `

            <span class="catalogue-card-icon">
                ${icon}
            </span>

            <span class="catalogue-card-body">

                <strong>
                    ${escapeHtml(name)}
                </strong>

                ${extra}

            </span>

            <span class="catalogue-card-arrow">
                ›
            </span>

        `;


        card.addEventListener(
            "click",
            () => handleCardSelection(
                item,
                level
            )
        );


        grid.appendChild(card);

    });


    container.appendChild(grid);

}


/* =========================================================
   CARD SELECTION
========================================================= */

function handleCardSelection(item, level) {

    if (!item) return;


    if (level === "material") {

        selectMaterial(item);

        return;

    }


    if (level === "type") {

        selectType(item);

        return;

    }


    if (level === "subtype") {

        selectSubType(item);

        return;

    }


    if (level === "colour") {

        selectColour(item);

        return;

    }

}


/* =========================================================
   SELECT MATERIAL
========================================================= */

function selectMaterial(material) {

    currentMaterial =
        material;

    currentType = null;

    currentSubType = null;

    currentColour = null;

    currentQuantity = 1;

    currentBrand = null;

    currentUnit =
        material.unit ||
        GENERAL.defaultUnit ||
        "pcs";


    navigationStack.push({

        level: "material",

        material: material,

        stage: currentStage

    });


    if (
        CONFIG.hasTypes &&
        CONFIG.hasTypes(material)
    ) {

        renderTypeList(material);

        return;

    }


    /*
       यदि Type नहीं है तो सीधे Colour/Quantity पर
    */

    openQuantityStep();

}


/* =========================================================
   TYPE LIST
========================================================= */

function renderTypeList(material) {

    const types =
        (material.types || [])
            .filter(type => {

                if (
                    typeof type === "object"
                ) {

                    return type.show !== false;

                }

                return true;

            })
            .map(type => {

                if (
                    typeof type === "string"
                ) {

                    return {

                        id: slugify(type),

                        name_hi: type,

                        name_en: type,

                        show: true

                    };

                }

                return type;

            });


    setPanelHeader(
        getName(material),
        currentLang === "en"
            ? "Select type"
            : "प्रकार चुनें"
    );


    renderCards(
        types,
        "type"
    );

}


/* =========================================================
   SELECT TYPE
========================================================= */

function selectType(type) {

    currentType = type;

    currentSubType = null;

    currentColour = null;

    currentQuantity = 1;

    currentBrand = null;


    navigationStack.push({

        level: "type",

        type: type

    });


    /*
       Future Sub Type support
    */

    if (
        type &&
        Array.isArray(type.subTypes) &&
        type.subTypes.length
    ) {

        renderSubTypeList(type);

        return;

    }


    /*
       Colour
    */

    if (
        currentMaterial &&
        currentMaterial.colourMode
    ) {

        renderColourList();

        return;

    }


    openQuantityStep();

}


/* =========================================================
   SUB TYPE LIST
========================================================= */

function renderSubTypeList(type) {

    const subTypes =
        (type.subTypes || [])
            .filter(
                item => item.show !== false
            );


    setPanelHeader(
        getName(currentMaterial),
        currentLang === "en"
            ? "Select sub type"
            : "उप-प्रकार चुनें"
    );


    renderCards(
        subTypes,
        "subtype"
    );

}


/* =========================================================
   SELECT SUB TYPE
========================================================= */

function selectSubType(subType) {

    currentSubType =
        subType;

    navigationStack.push({

        level: "subtype",

        subtype: subType

    });


    if (
        currentMaterial &&
        currentMaterial.colourMode
    ) {

        renderColourList();

        return;

    }


    openQuantityStep();

}


/* =========================================================
   COLOUR LIST
========================================================= */

function renderColourList() {

    if (!currentMaterial) {

        openQuantityStep();

        return;

    }


    let colours = [];


    if (
        typeof CONFIG.getColours === "function"
    ) {

        colours =
            CONFIG.getColours(
                currentMaterial
            );

    }


    if (!colours.length) {

        openQuantityStep();

        return;

    }


    setPanelHeader(
        getName(currentMaterial),
        currentLang === "en"
            ? "Select colour"
            : "रंग चुनें"
    );


    renderCards(
        colours,
        "colour"
    );

}


/* =========================================================
   SELECT COLOUR
========================================================= */

function selectColour(colour) {

    currentColour =
        colour;

    navigationStack.push({

        level: "colour",

        colour: colour

    });


    openQuantityStep();

}


/* =========================================================
   QUANTITY STEP
========================================================= */

function openQuantityStep() {

    const container =
        document.getElementById(
            "catalogueContent"
        );

    if (!container) return;


    setPanelHeader(
        getName(currentMaterial),
        currentLang === "en"
            ? "Enter quantity"
            : "मात्रा दर्ज करें"
    );


    const unit =
        currentMaterial?.unit ||
        GENERAL.defaultUnit ||
        "pcs";


    currentUnit =
        unit;


    container.innerHTML = `

        <div class="quantity-step">

            <div class="selection-summary">

                <div class="summary-icon">
                    ${currentMaterial?.icon || "📦"}
                </div>

                <div>

                    <strong>
                        ${escapeHtml(
                            getName(currentMaterial)
                        )}
                    </strong>

                    ${
                        currentType
                            ? `
                                <small>
                                    ${escapeHtml(
                                        getName(currentType)
                                    )}
                                </small>
                              `
                            : ""
                    }

                    ${
                        currentSubType
                            ? `
                                <small>
                                    ${escapeHtml(
                                        getName(
                                            currentSubType
                                        )
                                    )}
                                </small>
                              `
                            : ""
                    }

                    ${
                        currentColour
                            ? `
                                <small>
                                    ${
                                        currentLang === "en"
                                            ? "Colour: "
                                            : "रंग: "
                                    }
                                    ${escapeHtml(
                                        getName(
                                            currentColour
                                        )
                                    )}
                                </small>
                              `
                            : ""
                    }

                </div>

            </div>


            <label class="quantity-label">

                <span>
                    ${t("quantity")}
                </span>

                <span>
                    ${escapeHtml(
                        formatUnit(unit)
                    )}
                </span>

            </label>


            <div class="quantity-control">

                <button
                    type="button"
                    class="qty-minus"
                    id="qtyMinus"
                >
                    −
                </button>


                <input
                    type="number"
                    id="materialQty"
                    value="${currentQuantity}"
                    min="0.01"
                    step="0.01"
                    inputmode="decimal"
                >


                <button
                    type="button"
                    class="qty-plus"
                    id="qtyPlus"
                >
                    +
                </button>

            </div>


            <div class="unit-display">

                <span>
                    ${t("unit")}
                </span>

                <strong>
                    ${escapeHtml(
                        formatUnit(unit)
                    )}
                </strong>

            </div>


            <button
                type="button"
                id="continueToBrand"
                class="primary-action"
            >

                ${t("selectBrand")}

                <span>›</span>

            </button>

        </div>

    `;


    const qtyInput =
        document.getElementById(
            "materialQty"
        );


    const minus =
        document.getElementById(
            "qtyMinus"
        );


    const plus =
        document.getElementById(
            "qtyPlus"
        );


    const continueButton =
        document.getElementById(
            "continueToBrand"
        );


    if (minus) {

        minus.addEventListener(
            "click",
            () => {

                let value =
                    parseFloat(
                        qtyInput.value
                    ) || 1;

                value =
                    Math.max(
                        0.01,
                        value - 1
                    );

                qtyInput.value =
                    removeTrailingZeros(
                        value
                    );

            }
        );

    }


    if (plus) {

        plus.addEventListener(
            "click",
            () => {

                let value =
                    parseFloat(
                        qtyInput.value
                    ) || 0;

                value += 1;

                qtyInput.value =
                    removeTrailingZeros(
                        value
                    );

            }
        );

    }


    if (qtyInput) {

        qtyInput.addEventListener(
            "input",
            () => {

                currentQuantity =
                    parseFloat(
                        qtyInput.value
                    ) || 0;

            }
        );

    }


    if (continueButton) {

        continueButton.addEventListener(
            "click",
            () => {

                const quantity =
                    parseFloat(
                        qtyInput.value
                    );


                if (
                    !quantity ||
                    quantity <= 0
                ) {

                    showMessage(
                        currentLang === "en"
                            ? "Please enter quantity"
                            : "कृपया मात्रा दर्ज करें"
                    );

                    qtyInput.focus();

                    return;

                }


                currentQuantity =
                    quantity;


                openBrandStep();

            }
        );

    }

}


/* =========================================================
   BRAND STEP
   BRAND IS ALWAYS AFTER QUANTITY
========================================================= */

function openBrandStep() {

    const container =
        document.getElementById(
            "catalogueContent"
        );

    if (!container) return;


    setPanelHeader(
        getName(currentMaterial),
        currentLang === "en"
            ? "Select brand"
            : "ब्रांड चुनें"
    );


    let brands = [];


    if (
        typeof CONFIG.getBrands === "function"
    ) {

        brands =
            CONFIG.getBrands(
                currentMaterial
            );

    }


    container.innerHTML = `

        <div class="brand-step">

            <div class="brand-title">

                <span>
                    🏷️
                </span>

                <div>

                    <strong>
                        ${t("brand")}
                    </strong>

                    <small>
                        ${
                            currentLang === "en"
                                ? "Optional"
                                : "वैकल्पिक"
                        }
                    </small>

                </div>

            </div>


            <div
                class="brand-grid"
                id="brandGrid"
            ></div>


            <button
                type="button"
                id="saveWithoutBrand"
                class="skip-brand-button"
            >
                ${t("skipBrand")}
            </button>

        </div>

    `;


    const grid =
        document.getElementById(
            "brandGrid"
        );


    brands.forEach(brand => {

        if (
            !brand ||
            brand.show === false
        ) return;


        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "brand-card";


        button.innerHTML = `

            <span class="brand-icon">
                🏷️
            </span>

            <span>
                ${escapeHtml(
                    getName(brand)
                )}
            </span>

        `;


        button.addEventListener(
            "click",
            () => {

                currentBrand =
                    brand;

                addCurrentItem();

            }
        );


        grid.appendChild(button);

    });


    const skipButton =
        document.getElementById(
            "saveWithoutBrand"
        );


    if (skipButton) {

        skipButton.addEventListener(
            "click",
            () => {

                currentBrand = {

                    id: "skip",

                    name_hi: "ब्रांड नहीं चुना",

                    name_en: "Brand Skipped",

                    isSkip: true

                };

                addCurrentItem();

            }
        );

    }

}


/* =========================================================
   ADD CURRENT ITEM
========================================================= */

function addCurrentItem() {

    if (!currentMaterial) return;


    const item = {

        id: generateItemId(),

        materialId:
            currentMaterial.id,

        stageId:
            currentStage?.id || null,

        material: {

            name_hi:
                currentMaterial.name_hi,

            name_en:
                currentMaterial.name_en

        },

        type: currentType
            ? cloneSimpleObject(
                currentType
            )
            : null,

        subType: currentSubType
            ? cloneSimpleObject(
                currentSubType
            )
            : null,

        colour: currentColour
            ? cloneSimpleObject(
                currentColour
            )
            : null,

        quantity:
            Number(currentQuantity) || 1,

        unit:
            currentUnit ||
            currentMaterial.unit ||
            "pcs",

        brand: currentBrand
            ? cloneSimpleObject(
                currentBrand
            )
            : null,

        rate:
            getDefaultRate(
                currentMaterial
            ),

        total:
            0,

        createdAt:
            Date.now()

    };


    item.total =
        calculateItemTotal(item);


    selectedItems.push(item);


    saveEstimate();


    renderEstimate();


    showMessage(
        currentLang === "en"
            ? "Material added to estimate"
            : "सामग्री अनुमान में जोड़ दी गई"
    );


    resetSelection();


    closeCataloguePanel();

}


/* =========================================================
   DEFAULT RATE
========================================================= */

function getDefaultRate(material) {

    if (!material) return 0;


    if (
        typeof material.price === "number"
    ) {

        return material.price;

    }


    return 0;

}


/* =========================================================
   CALCULATE ITEM TOTAL
========================================================= */

function calculateItemTotal(item) {

    const quantity =
        Number(item.quantity) || 0;

    const rate =
        Number(item.rate) || 0;

    return quantity * rate;

}


/* =========================================================
   RESET SELECTION
========================================================= */

function resetSelection() {

    currentStage = null;

    currentMaterial = null;

    currentType = null;

    currentSubType = null;

    currentColour = null;

    currentQuantity = 1;

    currentUnit =
        GENERAL.defaultUnit || "pcs";

    currentBrand = null;

    navigationStack = [];

}


/* =========================================================
   ESTIMATE
========================================================= */

function renderEstimate() {

    const list =
        document.getElementById(
            "estimateList"
        );

    const count =
        document.getElementById(
            "estimateCount"
        );

    const totals =
        document.getElementById(
            "estimateTotals"
        );

    const empty =
        document.getElementById(
            "emptyEstimate"
        );


    if (!list) return;


    list
        .querySelectorAll(
            ".estimate-item"
        )
        .forEach(item => item.remove());


    if (!selectedItems.length) {

        if (empty) {

            empty.classList.remove(
                "hidden"
            );

        }

        if (count) {

            count.textContent = "0";

        }

        if (totals) {

            totals.classList.add(
                "hidden"
            );

        }

        updateTotals();

        return;

    }


    if (empty) {

        empty.classList.add(
            "hidden"
        );

    }


    if (count) {

        count.textContent =
            selectedItems.length;

    }


    selectedItems.forEach(
        (item, index) => {

            const row =
                createEstimateRow(
                    item,
                    index
                );

            list.appendChild(row);

        }
    );


    if (totals) {

        totals.classList.remove(
            "hidden"
        );

    }


    updateTotals();

}


/* =========================================================
   CREATE ESTIMATE ROW
========================================================= */

function createEstimateRow(item, index) {

    const row =
        document.createElement("div");

    row.className =
        "estimate-item";


    row.dataset.itemId =
        item.id;


    const materialName =
        currentLang === "en"
            ? item.material.name_en
            : item.material.name_hi;


    const typeName =
        item.type
            ? getName(item.type)
            : "";


    const subTypeName =
        item.subType
            ? getName(item.subType)
            : "";


    const colourName =
        item.colour
            ? getName(item.colour)
            : "";


    const brandName =
        getBrandDisplayName(
            item.brand
        );


    const details = [

        typeName,

        subTypeName,

        colourName
            ? (
                currentLang === "en"
                    ? "Colour: "
                    : "रंग: "
              ) + colourName
            : "",

        brandName
            ? (
                currentLang === "en"
                    ? "Brand: "
                    : "ब्रांड: "
              ) + brandName
            : ""

    ].filter(Boolean);


    row.innerHTML = `

        <div class="estimate-number">
            ${index + 1}
        </div>


        <div class="estimate-main">

            <div class="estimate-material-name">

                <strong>
                    ${escapeHtml(
                        materialName
                    )}
                </strong>

                ${
                    details.length
                        ? `
                            <small>
                                ${details
                                    .map(
                                        escapeHtml
                                    )
                                    .join(
                                        " • "
                                    )}
                            </small>
                          `
                        : ""
                }

            </div>


            <div class="estimate-qty">

                <span>
                    ${formatNumber(
                        item.quantity
                    )}
                </span>

                <small>
                    ${escapeHtml(
                        formatUnit(
                            item.unit
                        )
                    )}
                </small>

            </div>


            <div class="estimate-rate">

                ${
                    item.rate
                        ? formatCurrency(
                            item.rate
                        )
                        : "—"
                }

            </div>


            <div class="estimate-total">

                ${formatCurrency(
                    item.total
                )}

            </div>


            <div class="estimate-actions">

                <button
                    type="button"
                    class="estimate-edit"
                    title="${t("edit")}"
                    aria-label="${t("edit")}"
                >
                    ✏️
                </button>

                <button
                    type="button"
                    class="estimate-delete"
                    title="${t("delete")}"
                    aria-label="${t("delete")}"
                >
                    🗑️
                </button>

            </div>

        </div>

    `;


    const editButton =
        row.querySelector(
            ".estimate-edit"
        );


    const deleteButton =
        row.querySelector(
            ".estimate-delete"
        );


    if (editButton) {

        editButton.addEventListener(
            "click",
            () => openEditModal(item.id)
        );

    }


    if (deleteButton) {

        deleteButton.addEventListener(
            "click",
            () => deleteEstimateItem(
                item.id
            )
        );

    }


    return row;

}


/* =========================================================
   BRAND DISPLAY
========================================================= */

function getBrandDisplayName(brand) {

    if (!brand) return "";

    if (
        brand.isSkip ||
        brand.id === "skip"
    ) {

        return "";

    }


    return getName(brand);

}


/* =========================================================
   EDIT MODAL
========================================================= */

function openEditModal(itemId) {

    const item =
        selectedItems.find(
            selected =>
                selected.id === itemId
        );


    if (!item) return;


    const modal =
        document.getElementById(
            "editModal"
        );

    const content =
        document.getElementById(
            "editModalContent"
        );


    if (!modal || !content) return;


    const materialName =
        currentLang === "en"
            ? item.material.name_en
            : item.material.name_hi;


    content.innerHTML = `

        <div class="edit-form">

            <div class="edit-item-title">

                <span>
                    📦
                </span>

                <strong>
                    ${escapeHtml(
                        materialName
                    )}
                </strong>

            </div>


            ${
                item.type
                    ? `
                        <div class="edit-field">

                            <label>
                                ${t("selectType")}
                            </label>

                            <select id="editType">

                                ${buildTypeOptions(
                                    item
                                )}

                            </select>

                        </div>
                      `
                    : ""
            }


            ${
                item.colour
                    ? `
                        <div class="edit-field">

                            <label>
                                ${t("selectColour")}
                            </label>

                            <select id="editColour">

                                ${buildColourOptions(
                                    item
                                )}

                            </select>

                        </div>
                      `
                    : ""
            }


            <div class="edit-field">

                <label>
                    ${t("quantity")}
                </label>

                <input
                    type="number"
                    id="editQuantity"
                    min="0.01"
                    step="0.01"
                    value="${item.quantity}"
                >

            </div>


            <div class="edit-field">

                <label>
                    ${t("unit")}
                </label>

                <input
                    type="text"
                    id="editUnit"
                    value="${escapeAttribute(
                        item.unit || "pcs"
                    )}"
                >

            </div>


            <div class="edit-field">

                <label>
                    ${t("price")}
                </label>

                <input
                    type="number"
                    id="editRate"
                    min="0"
                    step="0.01"
                    value="${item.rate || 0}"
                >

            </div>


            <div class="edit-field">

                <label>
                    ${t("brand")}
                </label>

                <select id="editBrand">

                    ${buildBrandOptions(
                        item
                    )}

                </select>

            </div>


            <div class="edit-modal-actions">

                <button
                    type="button"
                    id="cancelEdit"
                    class="secondary-action"
                >
                    ${t("close")}
                </button>


                <button
                    type="button"
                    id="saveEdit"
                    class="primary-action"
                >
                    ${t("updateEstimate")}
                </button>

            </div>

        </div>

    `;


    modal.classList.remove(
        "hidden"
    );


    const cancel =
        document.getElementById(
            "cancelEdit"
        );


    const save =
        document.getElementById(
            "saveEdit"
        );


    if (cancel) {

        cancel.addEventListener(
            "click",
            closeEditModal
        );

    }


    if (save) {

        save.addEventListener(
            "click",
            () => saveEditedItem(
                itemId
            )
        );

    }


    /*
       Outside click
    */

    modal.onclick = event => {

        if (
            event.target === modal
        ) {

            closeEditModal();

        }

    };

}


/* =========================================================
   BUILD TYPE OPTIONS
========================================================= */

function buildTypeOptions(item) {

    const found =
        CONFIG.findMaterial
            ? CONFIG.findMaterial(
                item.materialId
            )
            : null;


    const material =
        found?.material;


    if (
        !material ||
        !Array.isArray(
            material.types
        )
    ) {

        return "";

    }


    return material.types
        .filter(type => {

            if (
                typeof type === "object"
            ) {

                return type.show !== false;

            }

            return true;

        })
        .map(type => {

            const obj =
                typeof type === "string"
                    ? {
                        id: slugify(type),
                        name_hi: type,
                        name_en: type
                    }
                    : type;


            const selected =
                item.type &&
                item.type.id === obj.id
                    ? "selected"
                    : "";


            return `

                <option
                    value="${escapeAttribute(
                        obj.id
                    )}"
                    ${selected}
                >
                    ${escapeHtml(
                        getName(obj)
                    )}
                </option>

            `;

        })
        .join("");

}


/* =========================================================
   BUILD COLOUR OPTIONS
========================================================= */

function buildColourOptions(item) {

    const found =
        CONFIG.findMaterial
            ? CONFIG.findMaterial(
                item.materialId
            )
            : null;


    const material =
        found?.material;


    if (!material) return "";


    const colours =
        CONFIG.getColours
            ? CONFIG.getColours(
                material
            )
            : [];


    return colours
        .map(colour => {

            const selected =
                item.colour &&
                item.colour.id === colour.id
                    ? "selected"
                    : "";


            return `

                <option
                    value="${escapeAttribute(
                        colour.id
                    )}"
                    ${selected}
                >
                    ${escapeHtml(
                        getName(colour)
                    )}
                </option>

            `;

        })
        .join("");

}


/* =========================================================
   BUILD BRAND OPTIONS
========================================================= */

function buildBrandOptions(item) {

    const found =
        CONFIG.findMaterial
            ? CONFIG.findMaterial(
                item.materialId
            )
            : null;


    const material =
        found?.material;


    const brands =
        CONFIG.getBrands
            ? CONFIG.getBrands(
                material
            )
            : [];


    let html = `

        <option value="">
            ${escapeHtml(
                t("skipBrand")
            )}
        </option>

    `;


    brands.forEach(brand => {

        if (
            brand.isSkip ||
            brand.id === "skip"
        ) return;


        const selected =
            item.brand &&
            item.brand.id === brand.id
                ? "selected"
                : "";


        html += `

            <option
                value="${escapeAttribute(
                    brand.id
                )}"
                ${selected}
            >
                ${escapeHtml(
                    getName(brand)
                )}
            </option>

        `;

    });


    return html;

}


/* =========================================================
   SAVE EDITED ITEM
========================================================= */

function saveEditedItem(itemId) {

    const item =
        selectedItems.find(
            selected =>
                selected.id === itemId
        );


    if (!item) return;


    const quantityInput =
        document.getElementById(
            "editQuantity"
        );


    const unitInput =
        document.getElementById(
            "editUnit"
        );


    const rateInput =
        document.getElementById(
            "editRate"
        );


    const typeInput =
        document.getElementById(
            "editType"
        );


    const colourInput =
        document.getElementById(
            "editColour"
        );


    const brandInput =
        document.getElementById(
            "editBrand"
        );


    const quantity =
        parseFloat(
            quantityInput?.value
        );


    if (
        !quantity ||
        quantity <= 0
    ) {

        showMessage(
            currentLang === "en"
                ? "Invalid quantity"
                : "मात्रा सही नहीं है"
        );

        return;

    }


    item.quantity =
        quantity;


    item.unit =
        unitInput?.value.trim() ||
        "pcs";


    item.rate =
        parseFloat(
            rateInput?.value
        ) || 0;


    /*
       Update type
    */

    if (
        typeInput &&
        item.type
    ) {

        const found =
            CONFIG.findMaterial(
                item.materialId
            );


        const types =
            found?.material?.types ||
            [];


        const selectedType =
            types.find(type => {

                if (
                    typeof type === "string"
                ) {

                    return (
                        slugify(type) ===
                        typeInput.value
                    );

                }

                return (
                    type.id ===
                    typeInput.value
                );

            });


        if (selectedType) {

            item.type =
                typeof selectedType === "string"
                    ? {
                        id: slugify(
                            selectedType
                        ),
                        name_hi:
                            selectedType,
                        name_en:
                            selectedType
                    }
                    : cloneSimpleObject(
                        selectedType
                    );

        }

    }


    /*
       Update colour
    */

    if (
        colourInput &&
        item.colour
    ) {

        const found =
            CONFIG.findMaterial(
                item.materialId
            );


        const colours =
            CONFIG.getColours
                ? CONFIG.getColours(
                    found?.material
                )
                : [];


        const selectedColour =
            colours.find(
                colour =>
                    colour.id ===
                    colourInput.value
            );


        if (selectedColour) {

            item.colour =
                cloneSimpleObject(
                    selectedColour
                );

        }

    }


    /*
       Update brand
    */

    if (brandInput) {

        const found =
            CONFIG.findMaterial(
                item.materialId
            );


        const brands =
            CONFIG.getBrands
                ? CONFIG.getBrands(
                    found?.material
                )
                : [];


        if (
            !brandInput.value
        ) {

            item.brand = null;

        } else {

            const selectedBrand =
                brands.find(
                    brand =>
                        brand.id ===
                        brandInput.value
                );


            if (selectedBrand) {

                item.brand =
                    cloneSimpleObject(
                        selectedBrand
                    );

            }

        }

    }


    item.total =
        calculateItemTotal(
            item
        );


    saveEstimate();

    renderEstimate();

    closeEditModal();


    showMessage(
        currentLang === "en"
            ? "Estimate updated"
            : "अनुमान अपडेट हो गया"
    );

}


/* =========================================================
   DELETE ITEM
========================================================= */

function deleteEstimateItem(itemId) {

    const index =
        selectedItems.findIndex(
            item =>
                item.id === itemId
        );


    if (index === -1) return;


    const confirmed =
        window.confirm(

            currentLang === "en"
                ? "Remove this material from estimate?"
                : "क्या इस सामग्री को अनुमान से हटाना है?"

        );


    if (!confirmed) return;


    selectedItems.splice(
        index,
        1
    );


    saveEstimate();

    renderEstimate();

}


/* =========================================================
   ESTIMATE TOTALS
========================================================= */

function updateTotals() {

    let subtotal = 0;


    selectedItems.forEach(item => {

        subtotal +=
            Number(item.total) || 0;

    });


    const discountInput =
        document.getElementById(
            "discountInput"
        );


    const labourInput =
        document.getElementById(
            "labourInput"
        );


    const discount =
        parseFloat(
            discountInput?.value
        ) || 0;


    const labour =
        parseFloat(
            labourInput?.value
        ) || 0;


    const grandTotal =
        Math.max(
            0,
            subtotal -
            discount +
            labour
        );


    const subtotalElement =
        document.getElementById(
            "subtotalAmount"
        );


    const grandTotalElement =
        document.getElementById(
            "grandTotalAmount"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            formatCurrency(
                subtotal
            );

    }


    if (grandTotalElement) {

        grandTotalElement.textContent =
            formatCurrency(
                grandTotal
            );

    }


    saveEstimateTotals(
        discount,
        labour
    );

}


/* =========================================================
   ESTIMATE EVENTS
========================================================= */

function initializeEstimateEvents() {

    const discount =
        document.getElementById(
            "discountInput"
        );


    const labour =
        document.getElementById(
            "labourInput"
        );


    const savedTotals =
        loadEstimateTotals();


    if (discount) {

        discount.value =
            savedTotals.discount || 0;


        discount.addEventListener(
            "input",
            updateTotals
        );

    }


    if (labour) {

        labour.value =
            savedTotals.labour || 0;


        labour.addEventListener(
            "input",
            updateTotals
        );

    }

}


/* =========================================================
   PANEL BUTTONS
========================================================= */

function initializePanelButtons() {

    const backButton =
        document.getElementById(
            "backBtn"
        );


    const closeButton =
        document.getElementById(
            "closePanel"
        );


    const closeEdit =
        document.getElementById(
            "closeEditModal"
        );


    if (backButton) {

        backButton.addEventListener(
            "click",
            handlePanelBack
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeCataloguePanel
        );

    }


    if (closeEdit) {

        closeEdit.addEventListener(
            "click",
            closeEditModal
        );

    }

}


/* =========================================================
   PANEL OPEN
========================================================= */

function openCataloguePanel() {

    const panel =
        document.getElementById(
            "cataloguePanel"
        );


    if (!panel) return;


    panel.classList.remove(
        "hidden"
    );


    document.body.classList.add(
        "catalogue-open"
    );

}


/* =========================================================
   PANEL CLOSE
========================================================= */

function closeCataloguePanel() {

    const panel =
        document.getElementById(
            "cataloguePanel"
        );


    if (!panel) return;


    panel.classList.add(
        "hidden"
    );


    document.body.classList.remove(
        "catalogue-open"
    );


    resetSelection();

}


/* =========================================================
   PANEL HIDDEN CHECK
========================================================= */

function isPanelHidden() {

    const panel =
        document.getElementById(
            "cataloguePanel"
        );


    return (
        !panel ||
        panel.classList.contains(
            "hidden"
        )
    );

}


/* =========================================================
   PANEL HEADER
========================================================= */

function setPanelHeader(
    title,
    subtitle
) {

    const titleElement =
        document.getElementById(
            "panelTitle"
        );


    const subtitleElement =
        document.getElementById(
            "panelSubtitle"
        );


    if (titleElement) {

        titleElement.textContent =
            title || "";

    }


    if (subtitleElement) {

        subtitleElement.textContent =
            subtitle || "";

    }

}


/* =========================================================
   REFRESH CURRENT PANEL
========================================================= */

function refreshCurrentPanel() {

    if (!navigationStack.length) {

        if (currentStage) {

            renderMaterialList(
                currentStage
            );

        }

        return;

    }


    const last =
        navigationStack[
            navigationStack.length - 1
        ];


    if (!last) return;


    if (
        last.level === "stage"
    ) {

        renderMaterialList(
            last.stage
        );

        return;

    }


    if (
        last.level === "material"
    ) {

        if (
            currentMaterial &&
            CONFIG.hasTypes &&
            CONFIG.hasTypes(
                currentMaterial
            )
        ) {

            renderTypeList(
                currentMaterial
            );

        } else {

            openQuantityStep();

        }

        return;

    }


    if (
        last.level === "type"
    ) {

        if (
            currentType &&
            Array.isArray(
                currentType.subTypes
            ) &&
            currentType.subTypes.length
        ) {

            renderSubTypeList(
                currentType
            );

        } else if (
            currentMaterial?.colourMode
        ) {

            renderColourList();

        } else {

            openQuantityStep();

        }

        return;

    }


    if (
        last.level === "subtype"
    ) {

        if (
            currentMaterial?.colourMode
        ) {

            renderColourList();

        } else {

            openQuantityStep();

        }

        return;

    }


    if (
        last.level === "colour"
    ) {

        openQuantityStep();

    }

}


/* =========================================================
   BACK NAVIGATION
========================================================= */

function handlePanelBack() {

    if (
        navigationStack.length <= 1
    ) {

        closeCataloguePanel();

        return;

    }


    navigationStack.pop();


    const previous =
        navigationStack[
            navigationStack.length - 1
        ];


    if (!previous) {

        closeCataloguePanel();

        return;

    }


    /*
       Stage
    */

    if (
        previous.level === "stage"
    ) {

        currentMaterial = null;

        currentType = null;

        currentSubType = null;

        currentColour = null;

        currentBrand = null;


        renderMaterialList(
            previous.stage
        );

        return;

    }


    /*
       Material
    */

    if (
        previous.level === "material"
    ) {

        currentType = null;

        currentSubType = null;

        currentColour = null;

        currentBrand = null;


        renderTypeList(
            currentMaterial
        );

        return;

    }


    /*
       Type
    */

    if (
        previous.level === "type"
    ) {

        currentSubType = null;

        currentColour = null;

        currentBrand = null;


        if (
            currentType &&
            Array.isArray(
                currentType.subTypes
            ) &&
            currentType.subTypes.length
        ) {

            renderSubTypeList(
                currentType
            );

        } else {

            renderTypeList(
                currentMaterial
            );

        }

        return;

    }


    /*
       Sub Type
    */

    if (
        previous.level === "subtype"
    ) {

        currentColour = null;

        currentBrand = null;

        renderSubTypeList(
            currentType
        );

        return;

    }


    /*
       Colour
    */

    if (
        previous.level === "colour"
    ) {

        currentColour = null;

        currentBrand = null;

        renderColourList();

        return;

    }

}


/* =========================================================
   ANDROID / BROWSER BACK BUTTON
========================================================= */

function initializeBackButton() {

    /*
       Browser history state डालते हैं।
       इससे Android back पहले app navigation handle करेगा।
    */

    try {

        if (
            !history.state ||
            !history.state.sandeepMaterialApp
        ) {

            history.pushState(
                {
                    sandeepMaterialApp: true
                },
                "",
                window.location.href
            );

        }


        window.addEventListener(
            "popstate",
            () => {

                /*
                   Edit Modal open
                */

                const editModal =
                    document.getElementById(
                        "editModal"
                    );


                if (
                    editModal &&
                    !editModal.classList.contains(
                        "hidden"
                    )
                ) {

                    closeEditModal();

                    pushAppHistory();

                    return;

                }


                /*
                   Catalogue open
                */

                if (
                    !isPanelHidden()
                ) {

                    handlePanelBack();

                    pushAppHistory();

                    return;

                }


                /*
                   App level पर वापस browser से बाहर जाने
                   की बजाय state फिर से डाल देते हैं।
                */

                pushAppHistory();

            }
        );

    } catch (error) {

        console.warn(
            "Back navigation initialization failed:",
            error
        );

    }

}


/* =========================================================
   PUSH HISTORY
========================================================= */

function pushAppHistory() {

    try {

        history.pushState(
            {
                sandeepMaterialApp: true,
                time: Date.now()
            },
            "",
            window.location.href
        );

    } catch (error) {

        console.warn(
            "History state failed:",
            error
        );

    }

}


/* =========================================================
   SEARCH
========================================================= */

function initializeSearch() {

    const input =
        document.getElementById(
            "materialSearch"
        );


    const clear =
        document.getElementById(
            "clearSearch"
        );


    if (!input) return;


    input.addEventListener(
        "input",
        () => {

            clearTimeout(
                searchTimeout
            );


            searchTimeout =
                setTimeout(
                    () => {

                        performSearch(
                            input.value.trim()
                        );

                    },
                    120
                );

        }
    );


    if (clear) {

        clear.addEventListener(
            "click",
            () => {

                input.value = "";

                performSearch("");

                input.focus();

            }
        );

    }


    updateSearchPlaceholder();

}


/* =========================================================
   SEARCH PLACEHOLDER
========================================================= */

function updateSearchPlaceholder() {

    const input =
        document.getElementById(
            "materialSearch"
        );


    if (!input) return;


    input.placeholder =
        currentLang === "en"
            ? (
                input.dataset.placeholderEn ||
                "Search material..."
              )
            : (
                input.dataset.placeholderHi ||
                "सामग्री खोजें..."
              );

}


/* =========================================================
   SEARCH
========================================================= */

function performSearch(query) {

    const results =
        document.getElementById(
            "searchResults"
        );


    if (!results) return;


    if (!query) {

        results.innerHTML = "";

        results.classList.add(
            "hidden"
        );

        return;

    }


    const materials =
        typeof CONFIG.getAllMaterials ===
        "function"
            ? CONFIG.getAllMaterials()
            : [];


    const search =
        query.toLowerCase();


    const matches =
        materials.filter(material => {

            const text = [

                material.name_hi,

                material.name_en,

                material.id,

                ...(Array.isArray(
                    material.types
                )
                    ? material.types.map(
                        type =>
                            typeof type ===
                            "string"
                                ? type
                                : (
                                    type.name_hi +
                                    " " +
                                    type.name_en
                                )
                    )
                    : [])

            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();


            return text.includes(
                search
            );

        });


    results.innerHTML = "";


    if (!matches.length) {

        results.innerHTML = `

            <div class="search-empty">

                🔍

                <span>
                    ${
                        currentLang === "en"
                            ? "No material found"
                            : "सामग्री नहीं मिली"
                    }
                </span>

            </div>

        `;

        results.classList.remove(
            "hidden"
        );

        return;

    }


    matches
        .slice(0, 20)
        .forEach(material => {

            const result =
                document.createElement(
                    "button"
                );


            result.type = "button";

            result.className =
                "search-result-item";


            result.innerHTML = `

                <span class="search-result-icon">
                    ${material.icon || "📦"}
                </span>

                <span class="search-result-text">

                    <strong>
                        ${escapeHtml(
                            getName(material)
                        )}
                    </strong>

                    <small>
                        ${escapeHtml(
                            currentLang === "en"
                                ? material.stageNameEn
                                : material.stageNameHi
                        )}
                    </small>

                </span>

                <span>
                    ›
                </span>

            `;


            result.addEventListener(
                "click",
                () => {

                    openSearchMaterial(
                        material
                    );

                    results.classList.add(
                        "hidden"
                    );

                    const input =
                        document.getElementById(
                            "materialSearch"
                        );

                    if (input) {

                        input.blur();

                    }

                }
            );


            results.appendChild(
                result
            );

        });


    results.classList.remove(
        "hidden"
    );

}


/* =========================================================
   OPEN SEARCH MATERIAL
========================================================= */

function openSearchMaterial(
    material
) {

    const found =
        CONFIG.findMaterial
            ? CONFIG.findMaterial(
                material.id
            )
            : null;


    if (!found) return;


    currentStage =
        found.stage;


    currentMaterial =
        null;

    currentType =
        null;

    currentSubType =
        null;

    currentColour =
        null;

    currentBrand =
        null;


    navigationStack = [

        {
            level: "stage",
            stage: found.stage
        }

    ];


    openCataloguePanel();


    /*
       Direct material selection
    */

    selectMaterial(
        found.material
    );

}


/* =========================================================
   ALL MATERIALS
========================================================= */

function initializeMainButtons() {

    const allButton =
        document.getElementById(
            "allMaterialsBtn"
        );


    if (allButton) {

        allButton.addEventListener(
            "click",
            openAllMaterials
        );

    }


    /*
       Search outside click
    */

    document.addEventListener(
        "click",
        event => {

            const results =
                document.getElementById(
                    "searchResults"
                );


            const input =
                document.getElementById(
                    "materialSearch"
                );


            if (
                results &&
                input &&
                !results.contains(
                    event.target
                ) &&
                !input.contains(
                    event.target
                )
            ) {

                results.classList.add(
                    "hidden"
                );

            }

        }
    );

}


/* =========================================================
   OPEN ALL MATERIALS
========================================================= */

function openAllMaterials() {

    const materials =
        typeof CONFIG.getAllMaterials ===
        "function"
            ? CONFIG.getAllMaterials()
            : [];


    currentStage = {

        id: "all",

        name_hi: "सभी सामग्री",

        name_en: "All Materials",

        icon: "📦",

        show: true,

        materials: materials

    };


    navigationStack = [

        {
            level: "stage",
            stage: currentStage
        }

    ];


    openCataloguePanel();


    setPanelHeader(
        currentLang === "en"
            ? "All Materials"
            : "सभी सामग्री",
        currentLang === "en"
            ? "Select material"
            : "सामग्री चुनें"
    );


    renderCards(
        materials,
        "material"
    );

}


/* =========================================================
   EDIT MODAL CLOSE
========================================================= */

function closeEditModal() {

    const modal =
        document.getElementById(
            "editModal"
        );


    if (!modal) return;


    modal.classList.add(
        "hidden"
    );

}


/* =========================================================
   STORAGE
========================================================= */

function saveEstimate() {

    try {

        localStorage.setItem(
            "sandeepMaterialEstimate",
            JSON.stringify(
                selectedItems
            )
        );

    } catch (error) {

        console.warn(
            "Estimate save failed:",
            error
        );

    }

}


/* =========================================================
   LOAD ESTIMATE
========================================================= */

function loadSavedEstimate() {

    try {

        const saved =
            localStorage.getItem(
                "sandeepMaterialEstimate"
            );


        if (!saved) {

            selectedItems = [];

            return;

        }


        const parsed =
            JSON.parse(saved);


        if (
            Array.isArray(parsed)
        ) {

            selectedItems =
                parsed;

        } else {

            selectedItems = [];

        }

    } catch (error) {

        console.warn(
            "Estimate load failed:",
            error
        );

        selectedItems = [];

    }

}


/* =========================================================
   TOTAL STORAGE
========================================================= */

function saveEstimateTotals(
    discount,
    labour
) {

    try {

        localStorage.setItem(

            "sandeepMaterialEstimateTotals",

            JSON.stringify({

                discount:
                    Number(discount) || 0,

                labour:
                    Number(labour) || 0

            })

        );

    } catch (error) {

        console.warn(
            "Totals save failed:",
            error
        );

    }

}


/* =========================================================
   LOAD TOTALS
========================================================= */

function loadEstimateTotals() {

    try {

        const saved =
            localStorage.getItem(
                "sandeepMaterialEstimateTotals"
            );


        if (!saved) {

            return {

                discount: 0,

                labour: 0

            };

        }


        const data =
            JSON.parse(saved);


        return {

            discount:
                Number(
                    data.discount
                ) || 0,

            labour:
                Number(
                    data.labour
                ) || 0

        };

    } catch {

        return {

            discount: 0,

            labour: 0

        };

    }

}


/* =========================================================
   FORMAT UNIT
========================================================= */

function formatUnit(unit) {

    if (!unit) return "pcs";


    const units = {

        pcs: {
            hi: "पीस",
            en: "pcs"
        },

        "pcs/box": {
            hi: "पीस / बॉक्स",
            en: "pcs / box"
        },

        "pcs/bundle": {
            hi: "पीस / बंडल",
            en: "pcs / bundle"
        },

        meter: {
            hi: "मीटर",
            en: "meter"
        },

        kg: {
            hi: "किलो",
            en: "kg"
        },

        box: {
            hi: "बॉक्स",
            en: "box"
        },

        bundle: {
            hi: "बंडल",
            en: "bundle"
        },

        feet: {
            hi: "फीट",
            en: "feet"
        }

    };


    if (units[unit]) {

        return units[unit][
            currentLang
        ];

    }


    return unit;

}


/* =========================================================
   FORMAT NUMBER
========================================================= */

function formatNumber(value) {

    const number =
        Number(value) || 0;


    if (
        Number.isInteger(
            number
        )
    ) {

        return String(number);

    }


    return number
        .toFixed(2)
        .replace(
            /\.?0+$/,
            ""
        );

}


/* =========================================================
   FORMAT CURRENCY
========================================================= */

function formatCurrency(value) {

    const number =
        Number(value) || 0;


    return "₹" +
        number.toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

}


/* =========================================================
   REMOVE TRAILING ZERO
========================================================= */

function removeTrailingZeros(
    value
) {

    return Number(value);

}


/* =========================================================
   GENERATE ITEM ID
========================================================= */

function generateItemId() {

    return (

        Date.now().toString(36) +

        Math.random()
            .toString(36)
            .substring(2, 8)

    );

}


/* =========================================================
   SLUGIFY
========================================================= */

function slugify(text) {

    return String(text || "")
        .toLowerCase()
        .trim()
        .replace(
            /[^a-z0-9\u0900-\u097f]+/gi,
            "_"
        )
        .replace(
            /^_+|_+$/g,
            ""
        );

}


/* =========================================================
   CLONE SIMPLE OBJECT
========================================================= */

function cloneSimpleObject(
    object
) {

    if (!object) return null;


    return {

        ...object

    };

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

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
   ESCAPE ATTRIBUTE
========================================================= */

function escapeAttribute(
    value
) {

    return escapeHtml(
        value
    );

}


/* =========================================================
   SHOW MESSAGE
========================================================= */

function showMessage(
    message
) {

    /*
       Existing toast हो तो उसका इस्तेमाल करें।
       नहीं तो temporary toast बनाएं।
    */

    let toast =
        document.getElementById(
            "materialToast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id =
            "materialToast";

        toast.className =
            "material-toast";


        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toast._timeout
    );


    toast._timeout =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


/* =========================================================
   GLOBAL API
   आगे PDF / PRINT / SHARE में काम आएगा
========================================================= */

window.SandeepMaterialEstimate = {

    getItems: function () {

        return selectedItems;

    },


    getSubtotal: function () {

        return selectedItems.reduce(
            (sum, item) =>
                sum +
                (
                    Number(item.total) ||
                    0
                ),
            0
        );

    },


    getTotals: function () {

        const saved =
            loadEstimateTotals();


        const subtotal =
            this.getSubtotal();


        const grandTotal =
            Math.max(
                0,
                subtotal -
                saved.discount +
                saved.labour
            );


        return {

            subtotal,

            discount:
                saved.discount,

            labour:
                saved.labour,

            grandTotal

        };

    },


    clearEstimate: function () {

        selectedItems = [];

        saveEstimate();

        renderEstimate();

    },


    addItem: function (item) {

        if (!item) return;


        item.id =
            item.id ||
            generateItemId();


        item.quantity =
            Number(
                item.quantity
            ) || 1;


        item.rate =
            Number(
                item.rate
            ) || 0;


        item.total =
            calculateItemTotal(
                item
            );


        selectedItems.push(
            item
        );


        saveEstimate();

        renderEstimate();

    },


    refresh: function () {

        renderEstimate();

    }

};


/* =========================================================
   FINAL INITIALIZATION LOG
========================================================= */

console.log(
    "%c SANDEEP ELECTROFIX MATERIAL ESTIMATE ",
    "font-weight:bold;font-size:14px;"
);

console.log(
    "Hindi + English Material Engine Ready"
);

console.log(
    "Items:",
    selectedItems.length
);
