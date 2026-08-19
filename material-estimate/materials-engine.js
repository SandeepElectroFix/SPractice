/* =========================================================
   SANDEEP ELECTROFIX
   ADVANCED MATERIAL ESTIMATE SYSTEM
   MATERIAL ENGINE
   Version 1.0.0

   Works with:
   materials.js

   FEATURES
   ✓ Hindi / English
   ✓ Stage Menu
   ✓ Search
   ✓ Material → Type → Sub Type → Color
   ✓ Qty
   ✓ Unit
   ✓ Brand
   ✓ Local / Non Brand
   ✓ Skip Brand
   ✓ Add / Edit / Delete
   ✓ Final Estimate
   ✓ Android Back
   ✓ Browser Back
   ✓ Popup Back Arrow
   ✓ LocalStorage
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       GLOBAL STATE
    ===================================================== */

    const APP = {

        root: null,

        lang: localStorage.getItem("sandeepLang") || "hi",

        currentStage: null,

        currentMaterial: null,

        currentType: null,

        currentSubType: null,

        currentColor: null,

        navigation: [],

        estimate: [],

        editingId: null,

        searchText: "",

        storageKey: "sandeep_material_estimate",

        historyEnabled: false

    };


    /* =====================================================
       LANGUAGE
    ===================================================== */

    function text(hi, en) {

        return APP.lang === "en" ? en : hi;

    }


    function getName(item) {

        if (!item) return "";

        return APP.lang === "en"
            ? (item.name_en || item.name_hi || "")
            : (item.name_hi || item.name_en || "");

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    function init() {

        APP.root = document.getElementById("materialEstimateApp");

        if (!APP.root) {

            console.warn(
                "materialEstimateApp not found."
            );

            return;

        }


        loadEstimate();

        renderMain();

        setupBrowserBack();

        APP.historyEnabled = true;

    }


    /* =====================================================
       STORAGE
    ===================================================== */

    function saveEstimate() {

        try {

            localStorage.setItem(
                APP.storageKey,
                JSON.stringify(APP.estimate)
            );

        } catch (error) {

            console.error(
                "Material estimate save error:",
                error
            );

        }

    }


    function loadEstimate() {

        try {

            const saved =
                localStorage.getItem(APP.storageKey);

            APP.estimate =
                saved ? JSON.parse(saved) : [];

            if (!Array.isArray(APP.estimate)) {

                APP.estimate = [];

            }

        } catch (error) {

            APP.estimate = [];

        }

    }


    /* =====================================================
       SAFE ESCAPE
    ===================================================== */

    function escapeHTML(value) {

        if (value === null || value === undefined) {

            return "";

        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       GET STAGES
    ===================================================== */

    function getStages() {

        return window.MATERIAL_STAGES || [];

    }


    /* =====================================================
       MAIN SCREEN
    ===================================================== */

    function renderMain() {

        APP.navigation = [];

        APP.currentStage = null;
        APP.currentMaterial = null;
        APP.currentType = null;
        APP.currentSubType = null;
        APP.currentColor = null;

        APP.root.innerHTML = `

            <div class="me-app">

                <div class="me-header">

                    <div class="me-brand">

                        <div class="me-brand-title">
                            ${text(
                                "सामग्री अनुमान प्रणाली",
                                "Material Estimate System"
                            )}
                        </div>

                        <div class="me-brand-subtitle">
                            Sandeep ElectroFix
                        </div>

                    </div>

                </div>


                <div class="me-search-wrap">

                    <span class="me-search-icon">⌕</span>

                    <input
                        type="search"
                        id="meSearch"
                        class="me-search"
                        placeholder="${text(
                            "सामग्री खोजें...",
                            "Search material..."
                        )}"
                        autocomplete="off"
                    >

                    <button
                        type="button"
                        class="me-search-clear"
                        id="meSearchClear"
                        aria-label="Clear"
                    >
                        ×
                    </button>

                </div>


                <div
                    id="meSearchResults"
                    class="me-search-results"
                    hidden
                ></div>


                <div class="me-stage-menu">

                    ${getStages()
                        .filter(stage => stage.show !== false)
                        .map((stage, index) => `

                            <button
                                type="button"
                                class="me-stage-btn"
                                data-stage-index="${index}"
                            >

                                ${escapeHTML(getName(stage))}

                            </button>

                        `)
                        .join("")}

                    <button
                        type="button"
                        class="me-stage-btn me-all-btn"
                        data-all-materials="true"
                    >
                        ${text(
                            "सभी सामग्री",
                            "All Material"
                        )}
                    </button>

                </div>


                <div
                    id="me-content"
                    class="me-content"
                >

                    ${renderWelcome()}

                </div>


                <div class="me-estimate-section">

                    ${renderEstimate()}

                </div>

            </div>

        `;


        bindMainEvents();

    }


    /* =====================================================
       WELCOME
    ===================================================== */

    function renderWelcome() {

        return `

            <div class="me-welcome">

                <div class="me-welcome-icon">
                    ⚡
                </div>

                <h3>
                    ${text(
                        "सामग्री चुनें",
                        "Select Material"
                    )}
                </h3>

                <p>
                    ${text(
                        "ऊपर से किसी चरण का चयन करें या सामग्री खोजें।",
                        "Select a stage above or search for a material."
                    )}
                </p>

            </div>

        `;

    }


    /* =====================================================
       MAIN EVENTS
    ===================================================== */

    function bindMainEvents() {

        const stageButtons =
            APP.root.querySelectorAll(
                "[data-stage-index]"
            );


        stageButtons.forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            this.dataset.stageIndex
                        );

                    openStage(
                        getStages()[index]
                    );

                }
            );

        });


        const allButton =
            APP.root.querySelector(
                "[data-all-materials]"
            );


        if (allButton) {

            allButton.addEventListener(
                "click",
                openAllMaterials
            );

        }


        const search =
            APP.root.querySelector("#meSearch");


        if (search) {

            search.addEventListener(
                "input",
                function () {

                    APP.searchText =
                        this.value.trim();

                    searchMaterials(
                        APP.searchText
                    );

                }
            );

        }


        const clear =
            APP.root.querySelector(
                "#meSearchClear"
            );


        if (clear) {

            clear.addEventListener(
                "click",
                clearSearch
            );

        }

    }


    /* =====================================================
       OPEN STAGE
    ===================================================== */

    function openStage(stage) {

        if (!stage) return;

        APP.currentStage = stage;

        APP.currentMaterial = null;
        APP.currentType = null;
        APP.currentSubType = null;
        APP.currentColor = null;

        APP.navigation = [
            {
                level: "stage",
                value: stage
            }
        ];

        renderMaterialList(stage);

    }


    /* =====================================================
       MATERIAL LIST
    ===================================================== */

    function renderMaterialList(stage) {

        const content =
            APP.root.querySelector("#me-content");

        if (!content) return;


        const materials =
            (stage.materials || [])
                .filter(item => item.show !== false);


        content.innerHTML = `

            <div class="me-panel">

                <div class="me-panel-head">

                    <button
                        type="button"
                        class="me-back-btn"
                        data-back
                    >
                        ←
                    </button>

                    <div>

                        <div class="me-panel-title">
                            ${escapeHTML(
                                getName(stage)
                            )}
                        </div>

                        <div class="me-panel-count">
                            ${materials.length}
                            ${text(
                                "सामग्री",
                                "Materials"
                            )}
                        </div>

                    </div>

                </div>


                <div class="me-material-grid">

                    ${materials.map(
                        (material, index) => `

                            <button
                                type="button"
                                class="me-material-card"
                                data-material-index="${index}"
                            >

                                <span class="me-material-icon">
                                    ▣
                                </span>

                                <span class="me-material-name">

                                    ${escapeHTML(
                                        getName(material)
                                    )}

                                </span>

                                ${
                                    material.types &&
                                    material.types.length
                                    ? `
                                        <span class="me-has-child">
                                            ›
                                        </span>
                                    `
                                    : ""
                                }

                            </button>

                        `
                    ).join("")}

                </div>

            </div>

        `;


        const back =
            content.querySelector("[data-back]");


        if (back) {

            back.addEventListener(
                "click",
                goBack
            );

        }


        content
            .querySelectorAll(
                "[data-material-index]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.materialIndex
                            );

                        openMaterial(
                            materials[index]
                        );

                    }
                );

            });

    }


    /* =====================================================
       OPEN MATERIAL
    ===================================================== */

    function openMaterial(material) {

        if (!material) return;

        APP.currentMaterial = material;

        APP.currentType = null;
        APP.currentSubType = null;
        APP.currentColor = null;


        APP.navigation.push({

            level: "material",
            value: material

        });


        const types =
            (material.types || [])
                .filter(item => item.show !== false);


        if (!types.length) {

            openEntryPopup();

            return;

        }


        renderTypes(material);

    }


    /* =====================================================
       TYPE LIST
    ===================================================== */

    function renderTypes(material) {

        const content =
            APP.root.querySelector("#me-content");

        if (!content) return;


        const types =
            (material.types || [])
                .filter(item => item.show !== false);


        content.innerHTML = `

            <div class="me-panel">

                <div class="me-panel-head">

                    <button
                        type="button"
                        class="me-back-btn"
                        data-back
                    >
                        ←
                    </button>

                    <div>

                        <div class="me-breadcrumb">
                            ${escapeHTML(
                                getName(
                                    APP.currentStage
                                )
                            )}
                        </div>

                        <div class="me-panel-title">
                            ${escapeHTML(
                                getName(material)
                            )}
                        </div>

                    </div>

                </div>


                <div class="me-option-list">

                    ${types.map(
                        (type, index) => `

                            <button
                                type="button"
                                class="me-option-row"
                                data-type-index="${index}"
                            >

                                <span>
                                    ${escapeHTML(
                                        getName(type)
                                    )}
                                </span>

                                <span>
                                    ›
                                </span>

                            </button>

                        `
                    ).join("")}

                </div>

            </div>

        `;


        const back =
            content.querySelector("[data-back]");


        if (back) {

            back.addEventListener(
                "click",
                goBack
            );

        }


        content
            .querySelectorAll(
                "[data-type-index]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.typeIndex
                            );

                        openType(
                            types[index]
                        );

                    }
                );

            });

    }


    /* =====================================================
       OPEN TYPE
    ===================================================== */

    function openType(type) {

        if (!type) return;

        APP.currentType = type;

        APP.currentSubType = null;
        APP.currentColor = null;


        APP.navigation.push({

            level: "type",
            value: type

        });


        const subTypes =
            (type.subTypes || [])
                .filter(item => item.show !== false);


        if (!subTypes.length) {

            if (
                type.colors &&
                type.colors.length
            ) {

                renderColors(type.colors);

            } else {

                openEntryPopup();

            }

            return;

        }


        renderSubTypes(type);

    }


    /* =====================================================
       SUB TYPE LIST
    ===================================================== */

    function renderSubTypes(type) {

        const content =
            APP.root.querySelector("#me-content");

        if (!content) return;


        const subTypes =
            (type.subTypes || [])
                .filter(item => item.show !== false);


        content.innerHTML = `

            <div class="me-panel">

                <div class="me-panel-head">

                    <button
                        type="button"
                        class="me-back-btn"
                        data-back
                    >
                        ←
                    </button>

                    <div>

                        <div class="me-breadcrumb">
                            ${escapeHTML(
                                getName(
                                    APP.currentMaterial
                                )
                            )}
                        </div>

                        <div class="me-panel-title">
                            ${escapeHTML(
                                getName(type)
                            )}
                        </div>

                    </div>

                </div>


                <div class="me-option-list">

                    ${subTypes.map(
                        (subType, index) => `

                            <button
                                type="button"
                                class="me-option-row"
                                data-subtype-index="${index}"
                            >

                                <span>
                                    ${escapeHTML(
                                        getName(subType)
                                    )}
                                </span>

                                <span>
                                    ›
                                </span>

                            </button>

                        `
                    ).join("")}

                </div>

            </div>

        `;


        const back =
            content.querySelector("[data-back]");


        if (back) {

            back.addEventListener(
                "click",
                goBack
            );

        }


        content
            .querySelectorAll(
                "[data-subtype-index]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.subtypeIndex
                            );

                        openSubType(
                            subTypes[index]
                        );

                    }
                );

            });

    }


    /* =====================================================
       OPEN SUB TYPE
    ===================================================== */

    function openSubType(subType) {

        if (!subType) return;

        APP.currentSubType = subType;

        APP.currentColor = null;


        APP.navigation.push({

            level: "subType",
            value: subType

        });


        const colors =
            (subType.colors || [])
                .filter(item => item.show !== false);


        if (colors.length) {

            renderColors(colors);

        } else {

            openEntryPopup();

        }

    }


    /* =====================================================
       COLOR LIST
    ===================================================== */

    function renderColors(colors) {

        const content =
            APP.root.querySelector("#me-content");

        if (!content) return;


        content.innerHTML = `

            <div class="me-panel">

                <div class="me-panel-head">

                    <button
                        type="button"
                        class="me-back-btn"
                        data-back
                    >
                        ←
                    </button>

                    <div>

                        <div class="me-breadcrumb">
                            ${escapeHTML(
                                getName(
                                    APP.currentSubType ||
                                    APP.currentType
                                )
                            )}
                        </div>

                        <div class="me-panel-title">
                            ${text(
                                "रंग चुनें",
                                "Select Color"
                            )}
                        </div>

                    </div>

                </div>


                <div class="me-color-grid">

                    ${colors.map(
                        (color, index) => `

                            <button
                                type="button"
                                class="me-color-btn"
                                data-color-index="${index}"
                            >

                                <span
                                    class="me-color-dot me-color-${escapeHTML(
                                        color.id
                                    )}"
                                ></span>

                                <span>
                                    ${escapeHTML(
                                        getName(color)
                                    )}
                                </span>

                            </button>

                        `
                    ).join("")}

                </div>

            </div>

        `;


        const back =
            content.querySelector("[data-back]");


        if (back) {

            back.addEventListener(
                "click",
                goBack
            );

        }


        content
            .querySelectorAll(
                "[data-color-index]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.colorIndex
                            );

                        APP.currentColor =
                            colors[index];


                        APP.navigation.push({

                            level: "color",
                            value: colors[index]

                        });


                        openEntryPopup();

                    }
                );

            });

    }


    /* =====================================================
       ENTRY POPUP
    ===================================================== */

    function openEntryPopup(existing = null) {

        const isEdit = !!existing;

        APP.editingId =
            existing ? existing.id : null;


        const material =
            existing
                ? findMaterialById(existing.materialId)
                : APP.currentMaterial;


        const type =
            existing
                ? findTypeById(
                    material,
                    existing.typeId
                )
                : APP.currentType;


        const subType =
            existing
                ? findSubTypeById(
                    type,
                    existing.subTypeId
                )
                : APP.currentSubType;


        const color =
            existing
                ? findColorById(
                    subType || type,
                    existing.colorId
                )
                : APP.currentColor;


        const unitOptions =
            material &&
            material.unit &&
            material.unit.options
                ? material.unit.options
                    .filter(unit => unit.show !== false)
                : [];


        const defaultUnit =
            existing
                ? existing.unitId
                : (
                    unitOptions[0]
                        ? unitOptions[0].id
                        : ""
                );


        const popup =
            document.createElement("div");


        popup.className =
            "me-popup-overlay";


        popup.innerHTML = `

            <div class="me-popup">

                <div class="me-popup-header">

                    <button
                        type="button"
                        class="me-popup-back"
                        id="mePopupBack"
                    >
                        ←
                    </button>

                    <div class="me-popup-title">

                        ${isEdit
                            ? text(
                                "सामग्री संपादित करें",
                                "Edit Material"
                            )
                            : text(
                                "सामग्री जोड़ें",
                                "Add Material"
                            )}

                    </div>

                    <button
                        type="button"
                        class="me-popup-close"
                        id="mePopupClose"
                    >
                        ×
                    </button>

                </div>


                <div class="me-selection-summary">

                    ${material
                        ? `<span>
                            ${escapeHTML(
                                getName(material)
                            )}
                           </span>`
                        : ""}

                    ${type
                        ? `<span>
                            ${escapeHTML(
                                getName(type)
                            )}
                           </span>`
                        : ""}

                    ${subType
                        ? `<span>
                            ${escapeHTML(
                                getName(subType)
                            )}
                           </span>`
                        : ""}

                    ${color
                        ? `<span>
                            ${escapeHTML(
                                getName(color)
                            )}
                           </span>`
                        : ""}

                </div>


                <div class="me-form">


                    <label class="me-label">

                        ${text(
                            "मात्रा",
                            "Quantity"
                        )}

                        <input
                            type="number"
                            id="meQty"
                            class="me-input"
                            min="0"
                            step="0.01"
                            value="${existing
                                ? escapeHTML(existing.qty)
                                : "1"}"
                        >

                    </label>


                    <label class="me-label">

                        ${text(
                            "इकाई",
                            "Unit"
                        )}

                        <select
                            id="meUnit"
                            class="me-select"
                        >

                            ${unitOptions.map(
                                unit => `

                                    <option
                                        value="${escapeHTML(
                                            unit.id
                                        )}"
                                        ${
                                            unit.id ===
                                            defaultUnit
                                            ? "selected"
                                            : ""
                                        }
                                    >
                                        ${escapeHTML(
                                            getName(unit)
                                        )}
                                    </option>

                                `
                            ).join("")}

                        </select>

                    </label>


                    <label class="me-label">

                        ${text(
                            "ब्रांड",
                            "Brand"
                        )}

                        <select
                            id="meBrand"
                            class="me-select"
                        >

                            <option value="">
                                ${text(
                                    "ब्रांड चुनें",
                                    "Select Brand"
                                )}
                            </option>

                            <option value="__local__">
                                ${text(
                                    "लोकल / बिना ब्रांड",
                                    "Local / Non Brand"
                                )}
                            </option>

                            <option value="__skip__">
                                ${text(
                                    "ब्रांड छोड़ें",
                                    "Skip Brand"
                                )}
                            </option>

                        </select>

                    </label>


                    <div
                        id="meCustomBrandWrap"
                        class="me-custom-brand-wrap"
                    >

                        <label class="me-label">

                            ${text(
                                "अपना ब्रांड नाम",
                                "Custom Brand Name"
                            )}

                            <input
                                type="text"
                                id="meCustomBrand"
                                class="me-input"
                                placeholder="${text(
                                    "ब्रांड नाम लिखें",
                                    "Enter brand name"
                                )}"
                            >

                        </label>

                    </div>


                    <label class="me-label">

                        ${text(
                            "रेट",
                            "Rate"
                        )}

                        <input
                            type="number"
                            id="meRate"
                            class="me-input"
                            min="0"
                            step="0.01"
                            value="${existing
                                ? escapeHTML(existing.rate)
                                : ""}"
                            placeholder="₹ 0.00"
                        >

                    </label>


                    <div class="me-form-actions">

                        <button
                            type="button"
                            class="me-cancel-btn"
                            id="meCancel"
                        >
                            ${text(
                                "रद्द करें",
                                "Cancel"
                            )}
                        </button>

                        <button
                            type="button"
                            class="me-add-btn"
                            id="meSaveItem"
                        >
                            ${
                                isEdit
                                ? text(
                                    "सेव करें",
                                    "Save Changes"
                                )
                                : text(
                                    "सामग्री जोड़ें",
                                    "Add Material"
                                )
                            }
                        </button>

                    </div>

                </div>

            </div>

        `;


        document.body.appendChild(popup);


        /* -----------------------------------------------
           BRAND CUSTOM ENTRY
        ------------------------------------------------ */

        const brandSelect =
            popup.querySelector("#meBrand");

        const customWrap =
            popup.querySelector(
                "#meCustomBrandWrap"
            );


        function updateCustomBrand() {

            if (!customWrap) return;

            customWrap.style.display =
                brandSelect.value === ""
                    ? "block"
                    : "none";

        }


        brandSelect.addEventListener(
            "change",
            updateCustomBrand
        );


        updateCustomBrand();


        if (existing) {

            brandSelect.value =
                existing.brandType || "";

            const customBrand =
                popup.querySelector(
                    "#meCustomBrand"
                );

            if (customBrand) {

                customBrand.value =
                    existing.brandName || "";

            }

            updateCustomBrand();

        }


        /* -----------------------------------------------
           CLOSE
        ------------------------------------------------ */

        popup.querySelector(
            "#mePopupClose"
        ).addEventListener(
            "click",
            closePopup
        );


        popup.querySelector(
            "#meCancel"
        ).addEventListener(
            "click",
            closePopup
        );


        /* -----------------------------------------------
           BACK
        ------------------------------------------------ */

        popup.querySelector(
            "#mePopupBack"
        ).addEventListener(
            "click",
            function () {

                closePopup();

                goBack();

            }
        );


        /* -----------------------------------------------
           SAVE
        ------------------------------------------------ */

        popup.querySelector(
            "#meSaveItem"
        ).addEventListener(
            "click",
            function () {

                saveEntry(
                    popup,
                    existing
                );

            }
        );


        /* -----------------------------------------------
           OUTSIDE CLICK
        ------------------------------------------------ */

        popup.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === popup
                ) {

                    closePopup();

                }

            }
        );

    }


    /* =====================================================
       SAVE ENTRY
    ===================================================== */

    function saveEntry(popup, existing) {

        const qty =
            Number(
                popup.querySelector(
                    "#meQty"
                ).value
            );


        const unitId =
            popup.querySelector(
                "#meUnit"
            ).value;


        const brandType =
            popup.querySelector(
                "#meBrand"
            ).value;


        const customBrand =
            popup.querySelector(
                "#meCustomBrand"
            ).value.trim();


        const rate =
            Number(
                popup.querySelector(
                    "#meRate"
                ).value
            ) || 0;


        if (
            !qty ||
            qty <= 0
        ) {

            alert(
                text(
                    "कृपया मात्रा दर्ज करें।",
                    "Please enter quantity."
                )
            );

            return;

        }


        let brandName = "";


        if (brandType === "__local__") {

            brandName =
                text(
                    "लोकल / बिना ब्रांड",
                    "Local / Non Brand"
                );

        } else if (brandType === "__skip__") {

            brandName =
                text(
                    "ब्रांड नहीं चुना",
                    "Brand Skipped"
                );

        } else if (customBrand) {

            brandName = customBrand;

        } else {

            brandName =
                text(
                    "ब्रांड नहीं चुना",
                    "Brand Skipped"
                );

        }


        const material =
            existing
                ? findMaterialById(
                    existing.materialId
                )
                : APP.currentMaterial;


        const type =
            existing
                ? findTypeById(
                    material,
                    existing.typeId
                )
                : APP.currentType;


        const subType =
            existing
                ? findSubTypeById(
                    type,
                    existing.subTypeId
                )
                : APP.currentSubType;


        const color =
            existing
                ? findColorById(
                    subType || type,
                    existing.colorId
                )
                : APP.currentColor;


        const unit =
            material &&
            material.unit &&
            material.unit.options
                ? material.unit.options.find(
                    item =>
                        item.id === unitId
                )
                : null;


        const item = {

            id: existing
                ? existing.id
                : (
                    "ME-" +
                    Date.now() +
                    "-" +
                    Math.random()
                        .toString(36)
                        .substring(2, 8)
                ),

            materialId:
                material
                    ? material.id
                    : "",

            materialHi:
                material
                    ? material.name_hi
                    : "",

            materialEn:
                material
                    ? material.name_en
                    : "",


            typeId:
                type
                    ? type.id
                    : "",

            typeHi:
                type
                    ? type.name_hi
                    : "",

            typeEn:
                type
                    ? type.name_en
                    : "",


            subTypeId:
                subType
                    ? subType.id
                    : "",

            subTypeHi:
                subType
                    ? subType.name_hi
                    : "",

            subTypeEn:
                subType
                    ? subType.name_en
                    : "",


            colorId:
                color
                    ? color.id
                    : "",

            colorHi:
                color
                    ? color.name_hi
                    : "",

            colorEn:
                color
                    ? color.name_en
                    : "",


            qty,

            unitId,

            unitHi:
                unit
                    ? unit.name_hi
                    : "",

            unitEn:
                unit
                    ? unit.name_en
                    : "",


            brandType,

            brandName,

            rate,

            amount:
                qty * rate,

            updatedAt:
                new Date().toISOString()

        };


        if (existing) {

            const index =
                APP.estimate.findIndex(
                    item =>
                        item.id === existing.id
                );


            if (index !== -1) {

                APP.estimate[index] =
                    item;

            }

        } else {

            APP.estimate.push(item);

        }


        saveEstimate();

        closePopup();

        renderEstimate();

    }


    /* =====================================================
       CLOSE POPUP
    ===================================================== */

    function closePopup() {

        const popup =
            document.querySelector(
                ".me-popup-overlay"
            );


        if (popup) {

            popup.remove();

        }

    }


    /* =====================================================
       FINAL ESTIMATE
    ===================================================== */

    function renderEstimate() {

        const section =
            APP.root.querySelector(
                ".me-estimate-section"
            );


        if (!section) return;


        if (!APP.estimate.length) {

            section.innerHTML = `

                <div class="me-estimate-empty">

                    <span>📋</span>

                    <div>

                        <strong>
                            ${text(
                                "फाइनल अनुमान",
                                "Final Estimate"
                            )}
                        </strong>

                        <small>
                            ${text(
                                "अभी कोई सामग्री नहीं जोड़ी गई है।",
                                "No material added yet."
                            )}
                        </small>

                    </div>

                </div>

            `;

            return;

        }


        const total =
            APP.estimate.reduce(
                (
                    sum,
                    item
                ) =>
                    sum +
                    (
                        Number(item.amount) ||
                        0
                    ),
                0
            );


        section.innerHTML = `

            <div class="me-estimate">

                <div class="me-estimate-head">

                    <div>

                        <h3>
                            ${text(
                                "फाइनल अनुमान",
                                "Final Estimate"
                            )}
                        </h3>

                        <span>
                            ${APP.estimate.length}
                            ${text(
                                "आइटम",
                                "Items"
                            )}
                        </span>

                    </div>

                    <button
                        type="button"
                        class="me-clear-all"
                        id="meClearAll"
                    >
                        ${text(
                            "सभी हटाएँ",
                            "Clear All"
                        )}
                    </button>

                </div>


                <div class="me-estimate-list">

                    ${APP.estimate.map(
                        (item, index) =>
                            renderEstimateItem(
                                item,
                                index
                            )
                    ).join("")}

                </div>


                <div class="me-estimate-total">

                    <span>
                        ${text(
                            "कुल अनुमान",
                            "Grand Total"
                        )}
                    </span>

                    <strong>
                        ₹${formatMoney(total)}
                    </strong>

                </div>

            </div>

        `;


        section
            .querySelectorAll(
                "[data-edit-id]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        editItem(
                            this.dataset.editId
                        );

                    }
                );

            });


        section
            .querySelectorAll(
                "[data-delete-id]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        deleteItem(
                            this.dataset.deleteId
                        );

                    }
                );

            });


        const clear =
            section.querySelector(
                "#meClearAll"
            );


        if (clear) {

            clear.addEventListener(
                "click",
                clearAll
            );

        }

    }


    /* =====================================================
       ESTIMATE ITEM
    ===================================================== */

    function renderEstimateItem(
        item,
        index
    ) {

        const material =
            APP.lang === "en"
                ? item.materialEn
                : item.materialHi;


        const type =
            APP.lang === "en"
                ? item.typeEn
                : item.typeHi;


        const subType =
            APP.lang === "en"
                ? item.subTypeEn
                : item.subTypeHi;


        const color =
            APP.lang === "en"
                ? item.colorEn
                : item.colorHi;


        const unit =
            APP.lang === "en"
                ? item.unitEn
                : item.unitHi;


        const parts = [

            material,
            type,
            subType,
            color

        ].filter(Boolean);


        return `

            <div class="me-estimate-item">

                <div class="me-item-number">
                    ${index + 1}
                </div>


                <div class="me-item-info">

                    <div class="me-item-name">
                        ${escapeHTML(
                            parts.join(" - ")
                        )}
                    </div>

                    <div class="me-item-meta">

                        <span>
                            ${text(
                                "मात्रा",
                                "Qty"
                            )}:
                            ${escapeHTML(item.qty)}
                        </span>

                        <span>
                            ${escapeHTML(unit)}
                        </span>

                        <span>
                            ${escapeHTML(
                                item.brandName
                            )}
                        </span>

                    </div>

                </div>


                <div class="me-item-price">

                    <strong>
                        ₹${formatMoney(
                            item.amount
                        )}
                    </strong>

                    <small>
                        ₹${formatMoney(
                            item.rate
                        )}/${escapeHTML(unit)}
                    </small>

                </div>


                <div class="me-item-actions">

                    <button
                        type="button"
                        data-edit-id="${escapeHTML(
                            item.id
                        )}"
                        title="${text(
                            "संपादित करें",
                            "Edit"
                        )}"
                    >
                        ✏
                    </button>

                    <button
                        type="button"
                        data-delete-id="${escapeHTML(
                            item.id
                        )}"
                        title="${text(
                            "हटाएँ",
                            "Delete"
                        )}"
                    >
                        🗑
                    </button>

                </div>

            </div>

        `;

    }


    /* =====================================================
       EDIT ITEM
    ===================================================== */

    function editItem(id) {

        const item =
            APP.estimate.find(
                entry =>
                    entry.id === id
            );


        if (!item) return;


        const material =
            findMaterialById(
                item.materialId
            );


        if (!material) return;


        APP.currentMaterial =
            material;


        APP.currentType =
            findTypeById(
                material,
                item.typeId
            );


        APP.currentSubType =
            findSubTypeById(
                APP.currentType,
                item.subTypeId
            );


        APP.currentColor =
            findColorById(
                APP.currentSubType ||
                APP.currentType,
                item.colorId
            );


        openEntryPopup(item);

    }


    /* =====================================================
       DELETE ITEM
    ===================================================== */

    function deleteItem(id) {

        const item =
            APP.estimate.find(
                entry =>
                    entry.id === id
            );


        if (!item) return;


        const ok =
            confirm(
                text(
                    "क्या आप यह सामग्री हटाना चाहते हैं?",
                    "Do you want to delete this material?"
                )
            );


        if (!ok) return;


        APP.estimate =
            APP.estimate.filter(
                entry =>
                    entry.id !== id
            );


        saveEstimate();

        renderEstimate();

    }


    /* =====================================================
       CLEAR ALL
    ===================================================== */

    function clearAll() {

        if (!APP.estimate.length) return;


        const ok =
            confirm(
                text(
                    "क्या आप सभी सामग्री हटाना चाहते हैं?",
                    "Do you want to clear all materials?"
                )
            );


        if (!ok) return;


        APP.estimate = [];

        saveEstimate();

        renderEstimate();

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    function searchMaterials(query) {

        const results =
            APP.root.querySelector(
                "#meSearchResults"
            );


        if (!results) return;


        if (!query) {

            results.hidden = true;

            results.innerHTML = "";

            return;

        }


        const q =
            query.toLowerCase();


        const found = [];


        getStages()
            .filter(
                stage =>
                    stage.show !== false
            )
            .forEach(stage => {

                (stage.materials || [])
                    .filter(
                        material =>
                            material.show !== false
                    )
                    .forEach(material => {

                        const materialText =
                            [

                                material.name_hi,

                                material.name_en,

                                stage.name_hi,

                                stage.name_en

                            ]
                            .join(" ")
                            .toLowerCase();


                        if (
                            materialText.includes(q)
                        ) {

                            found.push({

                                stage,

                                material

                            });

                        }


                        (
                            material.types ||
                            []
                        )
                        .filter(
                            type =>
                                type.show !== false
                        )
                        .forEach(type => {

                            const typeText =
                                [
                                    material.name_hi,
                                    material.name_en,
                                    type.name_hi,
                                    type.name_en
                                ]
                                .join(" ")
                                .toLowerCase();


                            if (
                                typeText.includes(q)
                            ) {

                                found.push({

                                    stage,

                                    material,

                                    type

                                });

                            }


                            (
                                type.subTypes ||
                                []
                            )
                            .filter(
                                sub =>
                                    sub.show !== false
                            )
                            .forEach(sub => {

                                const subText =
                                    [
                                        material.name_hi,
                                        material.name_en,
                                        type.name_hi,
                                        type.name_en,
                                        sub.name_hi,
                                        sub.name_en
                                    ]
                                    .join(" ")
                                    .toLowerCase();


                                if (
                                    subText.includes(q)
                                ) {

                                    found.push({

                                        stage,

                                        material,

                                        type,

                                        sub

                                    });

                                }

                            });

                        });

                    });

            });


        const unique = [];


        found.forEach(result => {

            const key = [

                result.stage.id,

                result.material.id,

                result.type
                    ? result.type.id
                    : "",

                result.sub
                    ? result.sub.id
                    : ""

            ].join("|");


            if (
                !unique.some(
                    item =>
                        item.key === key
                )
            ) {

                unique.push({

                    key,

                    ...result

                });

            }

        });


        if (!unique.length) {

            results.innerHTML = `

                <div class="me-no-results">

                    ${text(
                        "कोई सामग्री नहीं मिली।",
                        "No material found."
                    )}

                </div>

            `;

            results.hidden = false;

            return;

        }


        results.innerHTML = unique
            .slice(0, 30)
            .map(
                result => {

                    const path = [

                        getName(
                            result.material
                        ),

                        result.type
                            ? getName(
                                result.type
                            )
                            : "",

                        result.sub
                            ? getName(
                                result.sub
                            )
                            : ""

                    ].filter(Boolean);


                    return `

                        <button
                            type="button"
                            class="me-search-result"
                            data-search-key="${escapeHTML(
                                result.key
                            )}"
                        >

                            <strong>
                                ${escapeHTML(
                                    path.join(" → ")
                                )}
                            </strong>

                            <small>
                                ${escapeHTML(
                                    getName(
                                        result.stage
                                    )
                                )}
                            </small>

                        </button>

                    `;

                }
            )
            .join("");


        results.hidden = false;


        results
            .querySelectorAll(
                "[data-search-key]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        const key =
                            this.dataset.searchKey;


                        const result =
                            unique.find(
                                item =>
                                    item.key === key
                            );


                        if (result) {

                            openSearchResult(
                                result
                            );

                        }

                    }
                );

            });

    }


    /* =====================================================
       OPEN SEARCH RESULT
    ===================================================== */

    function openSearchResult(result) {

        clearSearch();


        APP.currentStage =
            result.stage;


        APP.currentMaterial =
            result.material;


        APP.currentType =
            result.type || null;


        APP.currentSubType =
            result.sub || null;


        APP.currentColor = null;


        APP.navigation = [

            {
                level: "stage",
                value: result.stage
            },

            {
                level: "material",
                value: result.material
            }

        ];


        if (result.type) {

            APP.navigation.push({

                level: "type",
                value: result.type

            });

        }


        if (result.sub) {

            APP.navigation.push({

                level: "subType",
                value: result.sub

            });

        }


        const colors =
            result.sub &&
            result.sub.colors
                ? result.sub.colors
                : (
                    result.type &&
                    result.type.colors
                        ? result.type.colors
                        : []
                );


        if (colors.length) {

            renderColors(
                colors.filter(
                    color =>
                        color.show !== false
                )
            );

        } else {

            openEntryPopup();

        }

    }


    /* =====================================================
       ALL MATERIALS
    ===================================================== */

    function openAllMaterials() {

        APP.navigation = [

            {
                level: "all",
                value: true

            }

        ];


        const all = [];


        getStages()
            .filter(
                stage =>
                    stage.show !== false
            )
            .forEach(stage => {

                (stage.materials || [])
                    .filter(
                        material =>
                            material.show !== false
                    )
                    .forEach(material => {

                        all.push({

                            material,

                            stage

                        });

                    });

            });


        const content =
            APP.root.querySelector(
                "#me-content"
            );


        if (!content) return;


        content.innerHTML = `

            <div class="me-panel">

                <div class="me-panel-head">

                    <button
                        type="button"
                        class="me-back-btn"
                        data-back
                    >
                        ←
                    </button>

                    <div>

                        <div class="me-panel-title">
                            ${text(
                                "सभी सामग्री",
                                "All Materials"
                            )}
                        </div>

                        <div class="me-panel-count">
                            ${all.length}
                        </div>

                    </div>

                </div>


                <div class="me-material-grid">

                    ${all.map(
                        (entry, index) => `

                            <button
                                type="button"
                                class="me-material-card"
                                data-all-index="${index}"
                            >

                                <span class="me-material-icon">
                                    ▣
                                </span>

                                <span class="me-material-name">

                                    ${escapeHTML(
                                        getName(
                                            entry.material
                                        )
                                    )}

                                    <small>
                                        ${escapeHTML(
                                            getName(
                                                entry.stage
                                            )
                                        )}
                                    </small>

                                </span>

                                <span>
                                    ›
                                </span>

                            </button>

                        `
                    ).join("")}

                </div>

            </div>

        `;


        const back =
            content.querySelector(
                "[data-back]"
            );


        if (back) {

            back.addEventListener(
                "click",
                goBack
            );

        }


        content
            .querySelectorAll(
                "[data-all-index]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.allIndex
                            );


                        const entry =
                            all[index];


                        APP.currentStage =
                            entry.stage;


                        APP.currentMaterial =
                            entry.material;


                        APP.navigation.push({

                            level: "material",
                            value: entry.material

                        });


                        const types =
                            (
                                entry.material.types ||
                                []
                            )
                            .filter(
                                type =>
                                    type.show !== false
                            );


                        if (types.length) {

                            renderTypes(
                                entry.material
                            );

                        } else {

                            openEntryPopup();

                        }

                    }
                );

            });

    }


    /* =====================================================
       CLEAR SEARCH
    ===================================================== */

    function clearSearch() {

        APP.searchText = "";


        const search =
            APP.root.querySelector(
                "#meSearch"
            );


        if (search) {

            search.value = "";

        }


        const results =
            APP.root.querySelector(
                "#meSearchResults"
            );


        if (results) {

            results.hidden = true;

            results.innerHTML = "";

        }

    }


    /* =====================================================
       BACK NAVIGATION
    ===================================================== */

    function goBack() {

        const popup =
            document.querySelector(
                ".me-popup-overlay"
            );


        if (popup) {

            popup.remove();

            return;

        }


        if (
            APP.navigation.length <= 1
        ) {

            renderMain();

            return;

        }


        APP.navigation.pop();


        const current =
            APP.navigation[
                APP.navigation.length - 1
            ];


        if (!current) {

            renderMain();

            return;

        }


        switch (current.level) {

            case "stage":

                APP.currentStage =
                    current.value;

                APP.currentMaterial = null;
                APP.currentType = null;
                APP.currentSubType = null;
                APP.currentColor = null;

                renderMaterialList(
                    APP.currentStage
                );

                break;


            case "material":

                APP.currentMaterial =
                    current.value;

                APP.currentType = null;
                APP.currentSubType = null;
                APP.currentColor = null;

                renderTypes(
                    APP.currentMaterial
                );

                break;


            case "type":

                APP.currentType =
                    current.value;

                APP.currentSubType = null;
                APP.currentColor = null;

                const subs =
                    (
                        APP.currentType
                            .subTypes ||
                        []
                    )
                    .filter(
                        sub =>
                            sub.show !== false
                    );


                if (subs.length) {

                    renderSubTypes(
                        APP.currentType
                    );

                } else {

                    openEntryPopup();

                }

                break;


            case "subType":

                APP.currentSubType =
                    current.value;

                APP.currentColor = null;

                const colors =
                    (
                        APP.currentSubType
                            .colors ||
                        []
                    )
                    .filter(
                        color =>
                            color.show !== false
                    );


                if (colors.length) {

                    renderColors(colors);

                } else {

                    openEntryPopup();

                }

                break;


            case "all":

                renderMain();

                break;


            default:

                renderMain();

        }

    }


    /* =====================================================
       ANDROID / BROWSER BACK
    ===================================================== */

    function setupBrowserBack() {

        if (
            window.__sandeepMaterialBackSetup
        ) {

            return;

        }


        window.__sandeepMaterialBackSetup =
            true;


        window.addEventListener(
            "popstate",
            function () {

                if (
                    document.querySelector(
                        ".me-popup-overlay"
                    )
                ) {

                    closePopup();

                    history.pushState(
                        {
                            material: true
                        },
                        "",
                        window.location.href
                    );

                    return;

                }


                if (
                    APP.navigation.length > 1
                ) {

                    goBack();

                    history.pushState(
                        {
                            material: true
                        },
                        "",
                        window.location.href
                    );

                }

            }
        );


        history.pushState(
            {
                material: true
            },
            "",
            window.location.href
        );

    }


    /* =====================================================
       FIND MATERIAL
    ===================================================== */

    function findMaterialById(id) {

        if (!id) return null;


        for (
            const stage
            of getStages()
        ) {

            const material =
                (
                    stage.materials ||
                    []
                ).find(
                    item =>
                        item.id === id
                );


            if (material) {

                return material;

            }

        }


        return null;

    }


    /* =====================================================
       FIND TYPE
    ===================================================== */

    function findTypeById(
        material,
        id
    ) {

        if (
            !material ||
            !id
        ) return null;


        return (
            material.types ||
            []
        ).find(
            item =>
                item.id === id
        ) || null;

    }


    /* =====================================================
       FIND SUB TYPE
    ===================================================== */

    function findSubTypeById(
        type,
        id
    ) {

        if (
            !type ||
            !id
        ) return null;


        return (
            type.subTypes ||
            []
        ).find(
            item =>
                item.id === id
        ) || null;

    }


    /* =====================================================
       FIND COLOR
    ===================================================== */

    function findColorById(
        parent,
        id
    ) {

        if (
            !parent ||
            !id
        ) return null;


        return (
            parent.colors ||
            []
        ).find(
            item =>
                item.id === id
        ) || null;

    }


    /* =====================================================
       MONEY
    ===================================================== */

    function formatMoney(value) {

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


    /* =====================================================
       LANGUAGE UPDATE
    ===================================================== */

    window.updateMaterialLanguage =
        function (lang) {

            if (
                lang !== "hi" &&
                lang !== "en"
            ) {

                return;

            }


            APP.lang = lang;

            localStorage.setItem(
                "sandeepLang",
                lang
            );


            renderMain();

        };


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.SandeepMaterialEstimate = {

        init,

        openStage,

        openAllMaterials,

        openEntryPopup,

        renderEstimate,

        goBack,

        clearAll,

        getEstimate: function () {

            return APP.estimate;

        },

        addItem: function (item) {

            APP.estimate.push(item);

            saveEstimate();

            renderEstimate();

        },

        removeItem: function (id) {

            deleteItem(id);

        },

        clearSearch,

        getState: function () {

            return {

                lang: APP.lang,

                navigation:
                    APP.navigation,

                estimate:
                    APP.estimate,

                currentStage:
                    APP.currentStage,

                currentMaterial:
                    APP.currentMaterial

            };

        }

    };


    /* =====================================================
       AUTO INIT
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }


})();
