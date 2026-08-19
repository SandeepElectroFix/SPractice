/* =========================================================
   SANDEEP ELECTROFIX
   MATERIAL ESTIMATE SYSTEM
   CORE ENGINE
   Version 1.0.0
========================================================= */


/* =========================================================
   GLOBAL STATE
========================================================= */

let currentLang =
    localStorage.getItem("materialEstimateLang") || "hi";

let currentStage = null;

let navigationStack = [];

let selectedMaterial = null;

let estimateItems = [];

let searchTimer = null;


/* =========================================================
   STAGE MENU
========================================================= */

const STAGES = [

    {
        id: "slab-conduit",

        name_hi: "Slab Conduit Installation",

        name_en: "Slab Conduit Installation",

        icon: "🏗️"
    },

    {
        id: "wall-conduit",

        name_hi: "Wall Conduit Installation",

        name_en: "Wall Conduit Installation",

        icon: "🧱"
    },

    {
        id: "wiring",

        name_hi: "Wiring Installation",

        name_en: "Wiring Installation",

        icon: "🔌"
    },

    {
        id: "final-fittings",

        name_hi: "Final Electrical Fittings",

        name_en: "Final Electrical Fittings",

        icon: "💡"
    },

    {
        id: "false-ceiling",

        name_hi: "False Ceiling Wiring Material",

        name_en: "False Ceiling Wiring Material",

        icon: "🏠"
    }

];


/* =========================================================
   TEMPORARY MATERIAL INDEX
   ---------------------------------------------------------
   IMPORTANT:
   Full catalogue Stage 1–5 will be added later.
========================================================= */

const MATERIAL_INDEX = [

    {
        id: "wire-075",

        stage: "wiring",

        material_hi: "Wire",

        material_en: "Wire",

        type_hi: "FR",

        type_en: "FR",

        subtype_hi: "0.75 Sqmm",

        subtype_en: "0.75 Sqmm",

        color: null,

        brand: []
    },


    {
        id: "wire-1",

        stage: "wiring",

        material_hi: "Wire",

        material_en: "Wire",

        type_hi: "FR",

        type_en: "FR",

        subtype_hi: "1 Sqmm",

        subtype_en: "1 Sqmm",

        color: null,

        brand: []
    },


    {
        id: "wire-15",

        stage: "wiring",

        material_hi: "Wire",

        material_en: "Wire",

        type_hi: "FR",

        type_en: "FR",

        subtype_hi: "1.5 Sqmm",

        subtype_en: "1.5 Sqmm",

        color: "Red",

        brand: []
    },


    {
        id: "wire-25",

        stage: "wiring",

        material_hi: "Wire",

        material_en: "Wire",

        type_hi: "FR",

        type_en: "FR",

        subtype_hi: "2.5 Sqmm",

        subtype_en: "2.5 Sqmm",

        color: "Red",

        brand: []
    },


    {
        id: "pipe-heavy",

        stage: "slab-conduit",

        material_hi: "Pipe",

        material_en: "Pipe",

        type_hi: "Heavy",

        type_en: "Heavy",

        subtype_hi: "",

        subtype_en: "",

        color: null,

        brand: []
    },


    {
        id: "long-bend",

        stage: "slab-conduit",

        material_hi: "Long Bend",

        material_en: "Long Bend",

        type_hi: "",

        type_en: "",

        subtype_hi: "",

        subtype_en: "",

        color: null,

        brand: []
    },


    {
        id: "junction-box",

        stage: "slab-conduit",

        material_hi: "Deep Junction Box",

        material_en: "Deep Junction Box",

        type_hi: "",

        type_en: "",

        subtype_hi: "",

        subtype_en: "",

        color: null,

        brand: []
    },


    {
        id: "electrical-tape",

        stage: "wiring",

        material_hi: "Electrical Tape",

        material_en: "Electrical Tape",

        type_hi: "",

        type_en: "",

        subtype_hi: "",

        subtype_en: "",

        color: null,

        brand: []
    }

];


/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {

    hi: {

        materialEstimate:
            "Material Estimate",

        selectMaterial:
            "Material Catalogue",

        selectCategory:
            "Category चुनें",

        allMaterials:
            "All Materials",

        finalEstimate:
            "Final Estimate",

        estimateList:
            "Estimate List",

        noItems:
            "अभी कोई material add नहीं किया गया",

        subtotal:
            "Subtotal",

        discount:
            "Discount",

        labour:
            "Labour / Extra",

        grandTotal:
            "Grand Total",

        editItem:
            "Edit Item",

        searchPlaceholder:
            "सामग्री खोजें..."

    },


    en: {

        materialEstimate:
            "Material Estimate",

        selectMaterial:
            "Material Catalogue",

        selectCategory:
            "Select a category",

        allMaterials:
            "All Materials",

        finalEstimate:
            "Final Estimate",

        estimateList:
            "Estimate List",

        noItems:
            "No materials added yet",

        subtotal:
            "Subtotal",

        discount:
            "Discount",

        labour:
            "Labour / Extra",

        grandTotal:
            "Grand Total",

        editItem:
            "Edit Item",

        searchPlaceholder:
            "Search material..."

    }

};


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);


/* =========================================================
   INITIALIZE APP
========================================================= */

function initializeApp() {

    loadEstimate();

    setCurrentYear();

    initializeLanguage();

    renderStageMenu();

    initializeSearch();

    initializeAllMaterialsButton();

    initializePanelControls();

    initializeEstimateControls();

    updateLanguageUI();

    renderEstimate();

}


/* =========================================================
   YEAR
========================================================= */

function setCurrentYear() {

    const yearElement =
        document.getElementById("currentYear");

    if (!yearElement) return;

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   LANGUAGE
========================================================= */

function initializeLanguage() {

    const languageButtons =
        document.querySelectorAll(".lang-btn");

    languageButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const lang =
                    button.dataset.lang;

                if (!lang) return;

                currentLang = lang;

                localStorage.setItem(
                    "materialEstimateLang",
                    currentLang
                );

                updateLanguageUI();

                renderStageMenu();

                if (
                    currentStage !== null
                ) {

                    renderStageCatalogue(
                        currentStage
                    );

                }

                renderEstimate();

            }
        );

    });

}


/* =========================================================
   UPDATE LANGUAGE UI
========================================================= */

function updateLanguageUI() {

    document.documentElement.lang =
        currentLang === "hi"
            ? "hi"
            : "en";


    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;

            if (
                TRANSLATIONS[currentLang] &&
                TRANSLATIONS[currentLang][key]
            ) {

                element.textContent =
                    TRANSLATIONS[currentLang][key];

            }

        });


    const searchInput =
        document.getElementById(
            "materialSearch"
        );

    if (searchInput) {

        searchInput.placeholder =
            TRANSLATIONS[currentLang]
                .searchPlaceholder;

    }


    document
        .querySelectorAll(".lang-btn")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.lang ===
                    currentLang
            );

        });

}


/* =========================================================
   STAGE MENU
========================================================= */

function renderStageMenu() {

    const container =
        document.getElementById(
            "stageMenu"
        );

    if (!container) return;

    container.innerHTML = "";

    STAGES.forEach(stage => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "stage-btn";

        button.dataset.stage =
            stage.id;


        const name =
            currentLang === "hi"
                ? stage.name_hi
                : stage.name_en;


        button.innerHTML = `

            <span class="stage-icon">
                ${stage.icon}
            </span>

            <span class="stage-name">
                ${escapeHTML(name)}
            </span>

            <span class="stage-arrow">
                ›
            </span>

        `;


        button.addEventListener(
            "click",
            () => {

                openStage(
                    stage.id
                );

            }
        );


        container.appendChild(button);

    });

}


/* =========================================================
   OPEN STAGE
========================================================= */

function openStage(stageId) {

    const stage =
        STAGES.find(
            item =>
                item.id === stageId
        );

    if (!stage) return;

    currentStage =
        stageId;

    navigationStack = [];

    selectedMaterial = null;


    const title =
        currentLang === "hi"
            ? stage.name_hi
            : stage.name_en;


    setPanelTitle(
        title,
        currentLang === "hi"
            ? "Material चुनें"
            : "Select material"
    );


    showCataloguePanel();

    renderStageCatalogue(
        stageId
    );

}


/* =========================================================
   ALL MATERIALS
========================================================= */

function initializeAllMaterialsButton() {

    const button =
        document.getElementById(
            "allMaterialsBtn"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        openAllMaterials
    );

}


function openAllMaterials() {

    currentStage = "all";

    navigationStack = [];

    selectedMaterial = null;


    setPanelTitle(
        currentLang === "hi"
            ? "All Materials"
            : "All Materials",

        currentLang === "hi"
            ? "सभी materials"
            : "All available materials"
    );


    showCataloguePanel();

    renderAllMaterials();

}


/* =========================================================
   RENDER STAGE CATALOGUE
========================================================= */

function renderStageCatalogue(
    stageId
) {

    const container =
        document.getElementById(
            "catalogueContent"
        );

    if (!container) return;


    const materials =
        MATERIAL_INDEX.filter(
            item =>
                item.stage === stageId
        );


    renderMaterialButtons(
        materials
    );

}


/* =========================================================
   RENDER ALL MATERIALS
========================================================= */

function renderAllMaterials() {

    const container =
        document.getElementById(
            "catalogueContent"
        );

    if (!container) return;

    renderMaterialButtons(
        MATERIAL_INDEX
    );

}


/* =========================================================
   MATERIAL BUTTONS
========================================================= */

function renderMaterialButtons(
    materials
) {

    const container =
        document.getElementById(
            "catalogueContent"
        );

    container.innerHTML = "";


    if (!materials.length) {

        container.innerHTML = `

            <div class="empty-estimate">

                <span>📦</span>

                <p>
                    ${
                        currentLang === "hi"
                            ? "इस category में अभी material नहीं है"
                            : "No materials available"
                    }
                </p>

            </div>

        `;

        return;

    }


    const grid =
        document.createElement("div");

    grid.className =
        "catalogue-grid";


    materials.forEach(material => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "catalogue-item";


        const name =
            currentLang === "hi"
                ? material.material_hi
                : material.material_en;


        let details = [];


        if (
            material.type_hi ||
            material.type_en
        ) {

            details.push(
                currentLang === "hi"
                    ? material.type_hi
                    : material.type_en
            );

        }


        if (
            material.subtype_hi ||
            material.subtype_en
        ) {

            details.push(
                currentLang === "hi"
                    ? material.subtype_hi
                    : material.subtype_en
            );

        }


        if (material.color) {

            details.push(
                material.color
            );

        }


        button.innerHTML = `

            <span>
                ${escapeHTML(name)}
            </span>

            ${
                details.length
                    ? `
                        <small>
                            ${escapeHTML(
                                details.join(" • ")
                            )}
                        </small>
                    `
                    : ""
            }

        `;


        button.addEventListener(
            "click",
            () => {

                selectMaterial(
                    material
                );

            }
        );


        grid.appendChild(button);

    });


    container.appendChild(grid);

}


/* =========================================================
   SELECT MATERIAL
========================================================= */

function selectMaterial(
    material
) {

    selectedMaterial =
        material;


    navigationStack.push(
        {
            type: "material",
            material: material
        }
    );


    openQuantityForm(
        material
    );

}


/* =========================================================
   QUANTITY FORM
   ---------------------------------------------------------
   Temporary form.
   Brand / type hierarchy will be expanded later.
========================================================= */

function openQuantityForm(
    material
) {

    const container =
        document.getElementById(
            "catalogueContent"
        );


    const name =
        currentLang === "hi"
            ? material.material_hi
            : material.material_en;


    const type =
        currentLang === "hi"
            ? material.type_hi
            : material.type_en;


    const subtype =
        currentLang === "hi"
            ? material.subtype_hi
            : material.subtype_en;


    setPanelTitle(
        name,
        currentLang === "hi"
            ? "Quantity और Rate"
            : "Quantity and Rate"
    );


    container.innerHTML = `

        <div class="form-group">

            <label class="form-label">
                ${
                    currentLang === "hi"
                        ? "Material"
                        : "Material"
                }
            </label>

            <div class="form-input"
                 style="display:flex;align-items:center;">

                ${escapeHTML(name)}

            </div>

        </div>


        ${
            type
                ? `
                    <div class="form-group">

                        <label class="form-label">
                            Type
                        </label>

                        <div class="form-input"
                             style="display:flex;align-items:center;">

                            ${escapeHTML(type)}

                        </div>

                    </div>
                `
                : ""
        }


        ${
            subtype
                ? `
                    <div class="form-group">

                        <label class="form-label">
                            ${
                                currentLang === "hi"
                                    ? "Size / Sub Type"
                                    : "Size / Sub Type"
                            }
                        </label>

                        <div class="form-input"
                             style="display:flex;align-items:center;">

                            ${escapeHTML(subtype)}

                        </div>

                    </div>
                `
                : ""
        }


        <div class="form-group">

            <label class="form-label">

                ${
                    currentLang === "hi"
                        ? "Quantity"
                        : "Quantity"
                }

            </label>

            <input
                id="newItemQty"
                class="form-input"
                type="number"
                min="0"
                step="0.01"
                value="1"
            >

        </div>


        <div class="form-group">

            <label class="form-label">

                ${
                    currentLang === "hi"
                        ? "Rate"
                        : "Rate"
                }

            </label>

            <input
                id="newItemRate"
                class="form-input"
                type="number"
                min="0"
                step="0.01"
                value="0"
            >

        </div>


        <button
            type="button"
            class="primary-btn"
            id="addMaterialBtn"
        >

            ${
                currentLang === "hi"
                    ? "＋ Estimate में Add करें"
                    : "＋ Add to Estimate"
            }

        </button>

    `;


    const addButton =
        document.getElementById(
            "addMaterialBtn"
        );


    addButton.addEventListener(
        "click",
        addSelectedMaterialToEstimate
    );

}


/* =========================================================
   ADD MATERIAL TO ESTIMATE
========================================================= */

function addSelectedMaterialToEstimate() {

    if (!selectedMaterial) return;


    const qtyInput =
        document.getElementById(
            "newItemQty"
        );


    const rateInput =
        document.getElementById(
            "newItemRate"
        );


    const qty =
        Number(
            qtyInput?.value || 0
        );


    const rate =
        Number(
            rateInput?.value || 0
        );


    if (qty <= 0) {

        alert(
            currentLang === "hi"
                ? "कृपया Quantity डालें।"
                : "Please enter quantity."
        );

        return;

    }


    const item = {

        id:
            Date.now().toString(),

        materialId:
            selectedMaterial.id,

        material_hi:
            selectedMaterial.material_hi,

        material_en:
            selectedMaterial.material_en,

        type_hi:
            selectedMaterial.type_hi,

        type_en:
            selectedMaterial.type_en,

        subtype_hi:
            selectedMaterial.subtype_hi,

        subtype_en:
            selectedMaterial.subtype_en,

        color:
            selectedMaterial.color,

        brand:
            null,

        brandType:
            "skip",

        qty:
            qty,

        rate:
            rate,

        amount:
            qty * rate

    };


    estimateItems.push(
        item
    );


    saveEstimate();

    renderEstimate();

    closeCataloguePanel();

}


/* =========================================================
   ESTIMATE RENDER
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


    if (!list) return;


    if (count) {

        count.textContent =
            estimateItems.length;

    }


    if (!estimateItems.length) {

        list.innerHTML = `

            <div
                id="emptyEstimate"
                class="empty-estimate"
            >

                <span>📋</span>

                <p>

                    ${
                        currentLang === "hi"
                            ? "अभी कोई material add नहीं किया गया"
                            : "No materials added yet"
                    }

                </p>

            </div>

        `;


        totals?.classList.add(
            "hidden"
        );

        return;

    }


    totals?.classList.remove(
        "hidden"
    );


    let html = `

        <table
            class="estimate-table"
        >

            <thead>

                <tr>

                    <th style="width:7%">
                        Sr.
                    </th>

                    <th style="width:36%">
                        ${
                            currentLang === "hi"
                                ? "Material"
                                : "Material"
                        }
                    </th>

                    <th style="width:12%">
                        Qty
                    </th>

                    <th style="width:15%">
                        Rate
                    </th>

                    <th style="width:18%">
                        Amount
                    </th>

                    <th style="width:12%">
                        ✏️
                    </th>

                </tr>

            </thead>

            <tbody>

    `;


    estimateItems.forEach(
        (item, index) => {

            const name =
                currentLang === "hi"
                    ? item.material_hi
                    : item.material_en;


            const details =
                buildItemDetails(
                    item
                );


            html += `

                <tr>

                    <td>
                        ${index + 1}
                    </td>

                    <td>

                        <strong>
                            ${escapeHTML(name)}
                        </strong>

                        ${
                            details
                                ? `
                                    <span
                                        class="item-details"
                                    >
                                        ${escapeHTML(details)}
                                    </span>
                                `
                                : ""
                        }

                    </td>

                    <td>
                        ${formatNumber(item.qty)}
                    </td>

                    <td>
                        ₹${formatMoney(item.rate)}
                    </td>

                    <td>
                        <strong>
                            ₹${formatMoney(item.amount)}
                        </strong>
                    </td>

                    <td>

                        <div
                            class="estimate-actions"
                        >

                            <button
                                type="button"
                                class="icon-btn"
                                onclick="editEstimateItem('${item.id}')"
                                title="Edit"
                            >
                                ✏️
                            </button>

                            <button
                                type="button"
                                class="icon-btn delete"
                                onclick="deleteEstimateItem('${item.id}')"
                                title="Delete"
                            >
                                🗑️
                            </button>

                        </div>

                    </td>

                </tr>

            `;

        }
    );


    html += `

            </tbody>

        </table>

    `;


    list.innerHTML =
        html;


    updateTotals();

}


/* =========================================================
   BUILD ITEM DETAILS
========================================================= */

function buildItemDetails(
    item
) {

    const details = [];


    if (item.type_hi) {

        details.push(
            currentLang === "hi"
                ? item.type_hi
                : item.type_en
        );

    }


    if (item.subtype_hi) {

        details.push(
            currentLang === "hi"
                ? item.subtype_hi
                : item.subtype_en
        );

    }


    if (item.color) {

        details.push(
            item.color
        );

    }


    if (
        item.brand &&
        item.brandType !== "skip"
    ) {

        details.push(
            item.brand
        );

    }


    return details.join(
        " • "
    );

}


/* =========================================================
   EDIT ITEM
========================================================= */

function editEstimateItem(
    itemId
) {

    const item =
        estimateItems.find(
            element =>
                element.id === itemId
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


    content.innerHTML = `

        <div class="form-group">

            <label class="form-label">
                Material
            </label>

            <input
                class="form-input"
                value="${escapeAttribute(
                    item.material_en
                )}"
                disabled
            >

        </div>


        <div class="form-group">

            <label class="form-label">
                Quantity
            </label>

            <input
                id="editQty"
                class="form-input"
                type="number"
                min="0"
                step="0.01"
                value="${item.qty}"
            >

        </div>


        <div class="form-group">

            <label class="form-label">
                Rate
            </label>

            <input
                id="editRate"
                class="form-input"
                type="number"
                min="0"
                step="0.01"
                value="${item.rate}"
            >

        </div>


        <button
            type="button"
            class="primary-btn"
            id="saveEditedItem"
        >
            ${
                currentLang === "hi"
                    ? "Save Changes"
                    : "Save Changes"
            }
        </button>

    `;


    modal.classList.remove(
        "hidden"
    );


    document
        .getElementById(
            "saveEditedItem"
        )
        .addEventListener(
            "click",
            () => {

                const qty =
                    Number(
                        document
                            .getElementById(
                                "editQty"
                            )
                            .value
                    );


                const rate =
                    Number(
                        document
                            .getElementById(
                                "editRate"
                            )
                            .value
                    );


                if (qty <= 0) {

                    alert(
                        "Quantity must be greater than 0."
                    );

                    return;

                }


                item.qty =
                    qty;

                item.rate =
                    rate;

                item.amount =
                    qty * rate;


                saveEstimate();

                renderEstimate();

                closeEditModal();

            }
        );

}


/* =========================================================
   DELETE ITEM
========================================================= */

function deleteEstimateItem(
    itemId
) {

    const confirmed =
        confirm(
            currentLang === "hi"
                ? "क्या आप यह item हटाना चाहते हैं?"
                : "Do you want to remove this item?"
        );


    if (!confirmed) return;


    estimateItems =
        estimateItems.filter(
            item =>
                item.id !== itemId
        );


    saveEstimate();

    renderEstimate();

}


/* =========================================================
   ESTIMATE CONTROLS
========================================================= */

function initializeEstimateControls() {

    const discount =
        document.getElementById(
            "discountInput"
        );


    const labour =
        document.getElementById(
            "labourInput"
        );


    discount?.addEventListener(
        "input",
        updateTotals
    );


    labour?.addEventListener(
        "input",
        updateTotals
    );

}


/* =========================================================
   UPDATE TOTALS
========================================================= */

function updateTotals() {

    const subtotal =
        estimateItems.reduce(
            (
                total,
                item
            ) => {

                return total +
                    Number(
                        item.amount || 0
                    );

            },
            0
        );


    const discount =
        Number(
            document
                .getElementById(
                    "discountInput"
                )
                ?.value || 0
        );


    const labour =
        Number(
            document
                .getElementById(
                    "labourInput"
                )
                ?.value || 0
        );


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


    const grandElement =
        document.getElementById(
            "grandTotalAmount"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            `₹${formatMoney(subtotal)}`;

    }


    if (grandElement) {

        grandElement.textContent =
            `₹${formatMoney(grandTotal)}`;

    }

}


/* =========================================================
   PANEL CONTROLS
========================================================= */

function initializePanelControls() {

    document
        .getElementById("closePanel")
        ?.addEventListener(
            "click",
            closeCataloguePanel
        );


    document
        .getElementById("backBtn")
        ?.addEventListener(
            "click",
            goBack
        );


    document
        .getElementById("closeEditModal")
        ?.addEventListener(
            "click",
            closeEditModal
        );


    document
        .getElementById("editModal")
        ?.addEventListener(
            "click",
            event => {

                if (
                    event.target.id ===
                    "editModal"
                ) {

                    closeEditModal();

                }

            }
        );

}


/* =========================================================
   SHOW PANEL
========================================================= */

function showCataloguePanel() {

    document
        .getElementById(
            "cataloguePanel"
        )
        ?.classList.remove(
            "hidden"
        );

    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CLOSE PANEL
========================================================= */

function closeCataloguePanel() {

    document
        .getElementById(
            "cataloguePanel"
        )
        ?.classList.add(
            "hidden"
        );

    document.body.style.overflow =
        "";

    currentStage =
        null;

    navigationStack = [];

    selectedMaterial =
        null;

}


/* =========================================================
   BACK
========================================================= */

function goBack() {

    if (
        navigationStack.length >
        0
    ) {

        navigationStack.pop();

    }


    if (
        navigationStack.length === 0
    ) {

        if (
            currentStage === "all"
        ) {

            renderAllMaterials();

        } else if (
            currentStage
        ) {

            renderStageCatalogue(
                currentStage
            );

        }

        return;

    }


    const previous =
        navigationStack[
            navigationStack.length - 1
        ];


    if (
        previous.type ===
        "material"
    ) {

        openQuantityForm(
            previous.material
        );

    }

}


/* =========================================================
   PANEL TITLE
========================================================= */

function setPanelTitle(
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
            title;

    }


    if (subtitleElement) {

        subtitleElement.textContent =
            subtitle;

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


    const clearButton =
        document.getElementById(
            "clearSearch"
        );


    if (!input) return;


    input.addEventListener(
        "input",
        () => {

            clearTimeout(
                searchTimer
            );


            const query =
                input.value
                    .trim()
                    .toLowerCase();


            clearButton?.classList.toggle(
                "visible",
                query.length > 0
            );


            searchTimer =
                setTimeout(
                    () => {

                        performSearch(
                            query
                        );

                    },
                    120
                );

        }
    );


    clearButton?.addEventListener(
        "click",
        () => {

            input.value = "";

            clearButton.classList.remove(
                "visible"
            );

            hideSearchResults();

            input.focus();

        }
    );

}


/* =========================================================
   SEARCH FUNCTION
========================================================= */

function performSearch(
    query
) {

    if (!query) {

        hideSearchResults();

        return;

    }


    const results =
        MATERIAL_INDEX.filter(
            material =>
                materialMatchesQuery(
                    material,
                    query
                )
        );


    renderSearchResults(
        results
    );

}


/* =========================================================
   SEARCH MATCH
========================================================= */

function materialMatchesQuery(
    material,
    query
) {

    const searchable = [

        material.material_hi,

        material.material_en,

        material.type_hi,

        material.type_en,

        material.subtype_hi,

        material.subtype_en,

        material.color,

        getStageName(
            material.stage,
            "hi"
        ),

        getStageName(
            material.stage,
            "en"
        )

    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();


    return searchable.includes(
        query
    );

}


/* =========================================================
   SEARCH RESULTS UI
========================================================= */

function renderSearchResults(
    results
) {

    const container =
        document.getElementById(
            "searchResults"
        );


    if (!container) return;


    if (!results.length) {

        container.innerHTML = `

            <div class="search-result-item">

                <div class="search-result-title">

                    ${
                        currentLang === "hi"
                            ? "Material नहीं मिला"
                            : "No material found"
                    }

                </div>

            </div>

        `;

        container.classList.remove(
            "hidden"
        );

        return;

    }


    container.innerHTML =
        results
            .map(
                material => {

                    const name =
                        currentLang === "hi"
                            ? material.material_hi
                            : material.material_en;


                    const meta =
                        [
                            material.type_hi,
                            material.subtype_hi,
                            material.color
                        ]
                            .filter(Boolean)
                            .join(
                                " • "
                            );


                    return `

                        <button
                            type="button"
                            class="search-result-item"
                            data-material-id="${material.id}"
                        >

                            <div
                                class="search-result-title"
                            >
                                ${escapeHTML(name)}
                            </div>

                            <div
                                class="search-result-meta"
                            >
                                ${escapeHTML(meta)}
                            </div>

                        </button>

                    `;

                }
            )
            .join("");


    container
        .querySelectorAll(
            "[data-material-id]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const material =
                        MATERIAL_INDEX.find(
                            item =>
                                item.id ===
                                button.dataset.materialId
                        );


                    if (!material) return;


                    hideSearchResults();


                    document
                        .getElementById(
                            "materialSearch"
                        )
                        ?.blur();


                    currentStage =
                        material.stage;


                    navigationStack =
                        [];


                    showCataloguePanel();


                    selectMaterial(
                        material
                    );

                }
            );

        });


    container.classList.remove(
        "hidden"
    );

}


/* =========================================================
   HIDE SEARCH
========================================================= */

function hideSearchResults() {

    document
        .getElementById(
            "searchResults"
        )
        ?.classList.add(
            "hidden"
        );

}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function saveEstimate() {

    try {

        localStorage.setItem(
            "sandeepMaterialEstimate",
            JSON.stringify(
                estimateItems
            )
        );

    } catch (error) {

        console.error(
            "Estimate save error:",
            error
        );

    }

}


function loadEstimate() {

    try {

        const saved =
            localStorage.getItem(
                "sandeepMaterialEstimate"
            );


        if (!saved) {

            estimateItems = [];

            return;

        }


        const parsed =
            JSON.parse(saved);


        if (
            Array.isArray(parsed)
        ) {

            estimateItems =
                parsed;

        } else {

            estimateItems = [];

        }

    } catch (error) {

        console.error(
            "Estimate load error:",
            error
        );

        estimateItems = [];

    }

}


/* =========================================================
   CLOSE EDIT MODAL
========================================================= */

function closeEditModal() {

    document
        .getElementById(
            "editModal"
        )
        ?.classList.add(
            "hidden"
        );

}


/* =========================================================
   HELPERS
========================================================= */

function getStageName(
    stageId,
    lang
) {

    const stage =
        STAGES.find(
            item =>
                item.id === stageId
        );


    if (!stage) return "";


    return lang === "hi"
        ? stage.name_hi
        : stage.name_en;

}


function formatMoney(
    value
) {

    return Number(
        value || 0
    ).toLocaleString(
        "en-IN",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );

}


function formatNumber(
    value
) {

    return Number(
        value || 0
    ).toLocaleString(
        "en-IN",
        {
            maximumFractionDigits: 2
        }
    );

}


function escapeHTML(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
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


function escapeAttribute(
    value
) {

    return escapeHTML(
        value
    );

}


/* =========================================================
   GLOBAL ACCESS
   ---------------------------------------------------------
   Needed by inline estimate buttons.
========================================================= */

window.editEstimateItem =
    editEstimateItem;

window.deleteEstimateItem =
    deleteEstimateItem;


/* =========================================================
   END
========================================================= */
