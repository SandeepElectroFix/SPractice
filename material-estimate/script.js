/* =========================================================
   SANDEEP ELECTROFIX
   PREMIUM MATERIAL ESTIMATE ENGINE
   VERSION 100.0
========================================================= */


/* =========================================================
   GLOBAL
========================================================= */

let currentLang =
    localStorage.getItem("sandeepMaterialLang") || "hi";


let currentStage = null;

let currentMaterial = null;

let currentType = null;

let currentSubType = null;

let selectedBrand = null;

let currentQty = 1;

let estimateItems = [];



/* =========================================================
   LANGUAGE DATA
========================================================= */

const UI_TEXT = {

    hi: {

        catalogue:
            "मटेरियल कैटलॉग",

        selectCategory:
            "आगे बढ़ने के लिए कैटेगरी चुनें",

        selectMaterial:
            "मटेरियल चुनें",

        selectType:
            "टाइप चुनें",

        selectSubType:
            "सब टाइप चुनें",

        quantity:
            "मात्रा",

        selectBrand:
            "ब्रांड चुनें",

        addEstimate:
            "एस्टिमेट में जोड़ें",

        explore:
            "Explore",

        allMaterials:
            "सभी मटेरियल",

        allMaterialsSub:
            "सभी आइटम देखें",

        finalEstimate:
            "फाइनल एस्टिमेट",

        noMaterials:
            "अभी कोई मटेरियल नहीं जोड़ा गया",

        startAdding:
            "अपने एस्टिमेट में मटेरियल जोड़ना शुरू करें",

        itemsAdded:
            "जोड़े गए आइटम",

        totalItems:
            "कुल आइटम",

        skip:
            "ब्रांड छोड़ें"

    },


    en: {

        catalogue:
            "MATERIAL CATALOGUE",

        selectCategory:
            "Select a category to continue",

        selectMaterial:
            "Select Material",

        selectType:
            "Select Type",

        selectSubType:
            "Select Sub Type",

        quantity:
            "Quantity",

        selectBrand:
            "Select Brand",

        addEstimate:
            "Add to Estimate",

        explore:
            "Explore",

        allMaterials:
            "ALL MATERIALS",

        allMaterialsSub:
            "VIEW ALL ITEMS",

        finalEstimate:
            "FINAL ESTIMATE",

        noMaterials:
            "No materials added yet",

        startAdding:
            "Start adding materials to your estimate",

        itemsAdded:
            "Items Added",

        totalItems:
            "Total Items",

        skip:
            "Skip Brand"

    }

};



/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (
            !window.MATERIAL_ESTIMATE_CONFIG
        ) {

            console.error(
                "MATERIAL_ESTIMATE_CONFIG not found"
            );

            return;

        }


        setupLanguage();

        setupSearch();

        renderStages();

        updateEstimate();

    }
);



/* =========================================================
   LANGUAGE
========================================================= */

function setLanguage(lang) {

    currentLang = lang;

    localStorage.setItem(
        "sandeepMaterialLang",
        lang
    );


    setupLanguage();


    if (!currentStage) {

        renderStages();

    } else {

        renderCurrentView();

    }

}


function setupLanguage() {

    const hi =
        document.getElementById("langHi");

    const en =
        document.getElementById("langEn");


    if (hi) {

        hi.classList.toggle(
            "active",
            currentLang === "hi"
        );

    }


    if (en) {

        en.classList.toggle(
            "active",
            currentLang === "en"
        );

    }


    const search =
        document.getElementById("searchInput");


    if (search) {

        search.placeholder =
            currentLang === "hi"
                ? "मटेरियल, टाइप, ब्रांड खोजें..."
                : "Search material, type, brand...";

    }


    document.getElementById(
        "pageTitle"
    ).textContent =
        currentStage
            ? getCurrentTitle()
            : UI_TEXT[currentLang].catalogue;


    document.getElementById(
        "pageSubtitle"
    ).textContent =
        currentStage
            ? UI_TEXT[currentLang].selectMaterial
            : UI_TEXT[currentLang].selectCategory;

}



/* =========================================================
   NAME HELPER
========================================================= */

function getName(item) {

    if (!item) return "";

    return currentLang === "en"

        ? (
            item.name_en ||
            item.name_hi ||
            ""
        )

        : (
            item.name_hi ||
            item.name_en ||
            ""
        );

}



/* =========================================================
   STAGE RENDER
========================================================= */

function renderStages() {

    currentStage = null;

    currentMaterial = null;

    currentType = null;

    currentSubType = null;


    updateHeading(
        UI_TEXT[currentLang].catalogue,
        UI_TEXT[currentLang].selectCategory
    );


    updateBreadcrumb();


    const area =
        document.getElementById(
            "catalogArea"
        );


    area.innerHTML = "";


    const stages =
        window.MATERIAL_ESTIMATE_CONFIG
            .getStages();


    stages.forEach(
        function (stage) {

            const card =
                createCard({

                    icon:
                        stage.icon || "⚡",

                    title:
                        getName(stage),

                    subtitle:
                        currentLang === "hi"
                            ? stage.short_hi
                            : stage.short_en,

                    action:
                        UI_TEXT[currentLang].explore,

                    onclick:
                        function () {

                            openStage(stage);

                        }

                });


            area.appendChild(card);

        }
    );


    /* ALL MATERIALS */

    const allCard =
        createCard({

            icon:
                "📦",

            title:
                UI_TEXT[currentLang].allMaterials,

            subtitle:
                UI_TEXT[currentLang].allMaterialsSub,

            action:
                UI_TEXT[currentLang].explore,

            onclick:
                function () {

                    showAllMaterials();

                }

        });


    area.appendChild(allCard);

}



/* =========================================================
   CREATE CARD
========================================================= */

function createCard(options) {

    const card =
        document.createElement(
            "div"
        );


    card.className =
        "catalog-card";


    card.innerHTML = `

        <div class="card-icon">

            ${options.icon || "⚡"}

        </div>


        <div class="card-title">

            ${escapeHtml(
                options.title
            )}

        </div>


        <div class="card-subtitle">

            ${escapeHtml(
                options.subtitle || ""
            )}

        </div>


        <div class="card-action">

            ${escapeHtml(
                options.action || "Explore"
            )}

            <span class="arrow">
                →
            </span>

        </div>

    `;


    card.addEventListener(
        "click",
        options.onclick
    );


    return card;

}



/* =========================================================
   OPEN STAGE
========================================================= */

function openStage(stage) {

    currentStage = stage;

    currentMaterial = null;

    currentType = null;

    currentSubType = null;


    renderMaterials(stage);

}



/* =========================================================
   MATERIAL RENDER
========================================================= */

function renderMaterials(stage) {

    updateHeading(
        getName(stage),
        UI_TEXT[currentLang].selectMaterial
    );


    updateBreadcrumb();


    const area =
        document.getElementById(
            "catalogArea"
        );


    area.innerHTML = "";


    const materials =
        (stage.materials || [])
            .filter(
                material =>
                    material.show !== false
            );


    materials.forEach(
        function (material) {

            const card =
                createCard({

                    icon:
                        material.icon || "🔌",

                    title:
                        getName(material),

                    subtitle:
                        material.unit || "",

                    action:
                        UI_TEXT[currentLang].explore,

                    onclick:
                        function () {

                            openMaterial(
                                material
                            );

                        }

                });


            area.appendChild(card);

        }
    );

}



/* =========================================================
   OPEN MATERIAL
========================================================= */

function openMaterial(material) {

    currentMaterial =
        material;

    currentType = null;

    currentSubType = null;


    if (
        hasTypes(material)
    ) {

        renderTypes(material);

    } else {

        openQuantityBrand();

    }

}



/* =========================================================
   TYPE CHECK
========================================================= */

function hasTypes(material) {

    return (
        material &&
        Array.isArray(
            material.types
        ) &&
        material.types.length > 0
    );

}



/* =========================================================
   TYPE RENDER
========================================================= */

function renderTypes(material) {

    updateHeading(
        getName(material),
        UI_TEXT[currentLang].selectType
    );


    updateBreadcrumb();


    const area =
        document.getElementById(
            "catalogArea"
        );


    area.innerHTML = "";


    const types =
        material.types.filter(
            type =>
                type.show !== false
        );


    types.forEach(
        function (type) {

            const card =
                createCard({

                    icon:
                        material.icon || "🔌",

                    title:
                        getName(type),

                    subtitle:
                        getName(material),

                    action:
                        UI_TEXT[currentLang].explore,

                    onclick:
                        function () {

                            openType(
                                type
                            );

                        }

                });


            area.appendChild(card);

        }
    );

}



/* =========================================================
   OPEN TYPE
========================================================= */

function openType(type) {

    currentType =
        type;


    if (
        type &&
        Array.isArray(
            type.subTypes
        ) &&
        type.subTypes.length
    ) {

        renderSubTypes(type);

    } else {

        openQuantityBrand();

    }

}



/* =========================================================
   SUB TYPE
========================================================= */

function renderSubTypes(type) {

    updateHeading(
        getName(type),
        UI_TEXT[currentLang].selectSubType
    );


    updateBreadcrumb();


    const area =
        document.getElementById(
            "catalogArea"
        );


    area.innerHTML = "";


    type.subTypes
        .filter(
            sub =>
                sub.show !== false
        )
        .forEach(
            function (subType) {

                const card =
                    createCard({

                        icon:
                            currentMaterial.icon ||
                            "🔌",

                        title:
                            getName(subType),

                        subtitle:
                            getName(type),

                        action:
                            UI_TEXT[currentLang].explore,

                        onclick:
                            function () {

                                currentSubType =
                                    subType;

                                openQuantityBrand();

                            }

                    });


                area.appendChild(card);

            }
        );

}



/* =========================================================
   QUANTITY + BRAND
========================================================= */

function openQuantityBrand() {

    const modal =
        document.getElementById(
            "itemModal"
        );


    const content =
        document.getElementById(
            "modalContent"
        );


    currentQty = 1;

    selectedBrand = null;


    const material =
        currentMaterial;


    const type =
        currentType;


    const subType =
        currentSubType;


    const brands =
        window.MATERIAL_ESTIMATE_CONFIG
            .getBrands(material);


    const colours =
        window.MATERIAL_ESTIMATE_CONFIG
            .getColours(material);


    content.innerHTML = `

        <div class="modal-title">

            <div class="big-icon">

                ${material.icon || "🔌"}

            </div>

            <h3>

                ${escapeHtml(
                    getName(material)
                )}

            </h3>

            ${
                type
                ? `
                    <p>
                        ${escapeHtml(
                            getName(type)
                        )}
                    </p>
                `
                : ""
            }

            ${
                subType
                ? `
                    <p>
                        ${escapeHtml(
                            getName(subType)
                        )}
                    </p>
                `
                : ""
            }

        </div>


        ${
            colours.length
            ? `
                <div class="brand-section">

                    <h4>
                        ${
                            currentLang === "hi"
                                ? "कलर चुनें"
                                : "Select Colour"
                        }
                    </h4>

                    <div class="brand-grid">

                        ${
                            colours
                                .map(
                                    colour => `

                                        <button
                                            class="brand-button"
                                            onclick="selectColour('${colour.id}')">

                                            ${
                                                currentLang === "hi"
                                                    ? colour.name_hi
                                                    : colour.name_en
                                            }

                                        </button>

                                    `
                                )
                                .join("")
                        }

                    </div>

                </div>
            `
            : ""
        }


        <div class="qty-box">

            <div class="qty-label">

                ${UI_TEXT[currentLang].quantity}

                ${
                    material.unit
                    ? `
                        <span>
                            (${material.unit})
                        </span>
                    `
                    : ""
                }

            </div>


            <div class="qty-control">

                <button
                    onclick="changeQty(-1)">

                    −

                </button>


                <input
                    id="qtyInput"
                    type="number"
                    min="1"
                    value="1"
                    onchange="setQty(this.value)">


                <button
                    onclick="changeQty(1)">

                    +

                </button>

            </div>

        </div>


        <div class="brand-section">

            <h4>
                ${UI_TEXT[currentLang].selectBrand}
            </h4>


            <div class="brand-grid">

                ${
                    brands
                        .map(
                            brand => `

                                <button
                                    class="brand-button"
                                    onclick="selectBrand('${brand.id}')">

                                    ${
                                        currentLang === "hi"
                                            ? brand.name_hi
                                            : brand.name_en
                                    }

                                </button>

                            `
                        )
                        .join("")
                }

            </div>

        </div>


        <button
            class="add-estimate-btn"
            onclick="addEstimate()">

            ${UI_TEXT[currentLang].addEstimate}

            &nbsp; →

        </button>

    `;


    modal.classList.remove(
        "hidden"
    );

}



/* =========================================================
   QUANTITY
========================================================= */

function changeQty(amount) {

    currentQty =
        Math.max(
            1,
            Number(currentQty) +
            Number(amount)
        );


    const input =
        document.getElementById(
            "qtyInput"
        );


    if (input) {

        input.value =
            currentQty;

    }

}


function setQty(value) {

    currentQty =
        Math.max(
            1,
            Number(value) || 1
        );

}



/* =========================================================
   BRAND
========================================================= */

function selectBrand(id) {

    selectedBrand =
        id;


    document
        .querySelectorAll(
            ".brand-button"
        )
        .forEach(
            button => {

                button.style.borderColor =
                    "";

            }
        );


    event.currentTarget.style.borderColor =
        "#ffd447";

}



/* =========================================================
   COLOUR
========================================================= */

let selectedColour = null;


function selectColour(id) {

    selectedColour =
        id;


    event.currentTarget.style.borderColor =
        "#00f5a0";

}



/* =========================================================
   ADD ESTIMATE
========================================================= */

function addEstimate() {

    if (!currentMaterial) {

        return;

    }


    const config =
        window.MATERIAL_ESTIMATE_CONFIG;


    const brand =
        selectedBrand
            ? config.defaultBrands.find(
                b => b.id === selectedBrand
            )
            : null;


    const colour =
        selectedColour
            ? config.colours.find(
                c => c.id === selectedColour
            )
            : null;


    const item = {

        id:
            Date.now(),

        stage:
            currentStage
                ? getName(currentStage)
                : "",

        material:
            getName(currentMaterial),

        type:
            currentType
                ? getName(currentType)
                : "",

        subType:
            currentSubType
                ? getName(currentSubType)
                : "",

        quantity:
            currentQty,

        unit:
            currentMaterial.unit ||
            config.general.defaultUnit,

        brand:
            brand
                ? getName(brand)
                : "",

        colour:
            colour
                ? getName(colour)
                : ""

    };


    estimateItems.push(
        item
    );


    updateEstimate();

    closeModal();

    selectedBrand = null;

    selectedColour = null;

}



/* =========================================================
   UPDATE ESTIMATE
========================================================= */

function updateEstimate() {

    const count =
        document.getElementById(
            "itemCount"
        );


    count.textContent =
        estimateItems.length;


    const list =
        document.getElementById(
            "estimateList"
        );


    const bottom =
        document.getElementById(
            "estimateBottom"
        );


    const totalQty =
        document.getElementById(
            "totalQty"
        );


    if (!estimateItems.length) {

        list.innerHTML = `

            <div class="empty-estimate">

                <div class="empty-icon">
                    📋
                </div>

                <h3>
                    ${UI_TEXT[currentLang].noMaterials}
                </h3>

                <p>
                    ${UI_TEXT[currentLang].startAdding}
                </p>

            </div>

        `;


        bottom.classList.add(
            "hidden"
        );


        return;

    }


    bottom.classList.remove(
        "hidden"
    );


    let total = 0;


    list.innerHTML =
        estimateItems
            .map(
                function (item) {

                    total +=
                        Number(
                            item.quantity
                        );


                    let details = [];


                    if (item.stage)
                        details.push(
                            item.stage
                        );


                    if (item.type)
                        details.push(
                            item.type
                        );


                    if (item.subType)
                        details.push(
                            item.subType
                        );


                    if (item.brand)
                        details.push(
                            item.brand
                        );


                    if (item.colour)
                        details.push(
                            item.colour
                        );


                    return `

                        <div
                            class="estimate-item">

                            <div>

                                <div class="estimate-name">

                                    ${escapeHtml(
                                        item.material
                                    )}

                                </div>


                                <div class="estimate-details">

                                    ${escapeHtml(
                                        details.join(
                                            " • "
                                        )
                                    )}

                                </div>

                            </div>


                            <div class="estimate-qty">

                                ${item.quantity}
                                ${escapeHtml(
                                    item.unit
                                )}

                            </div>


                            <button
                                class="remove-item"
                                onclick="removeEstimate(${item.id})">

                                ×

                            </button>

                        </div>

                    `;

                }
            )
            .join("");


    totalQty.textContent =
        total;

}



/* =========================================================
   REMOVE ESTIMATE
========================================================= */

function removeEstimate(id) {

    estimateItems =
        estimateItems.filter(
            item =>
                item.id !== id
        );


    updateEstimate();

}



/* =========================================================
   ALL MATERIALS
========================================================= */

function showAllMaterials() {

    currentStage = null;

    currentMaterial = null;

    currentType = null;

    currentSubType = null;


    updateHeading(
        UI_TEXT[currentLang].allMaterials,
        UI_TEXT[currentLang].selectMaterial
    );


    updateBreadcrumb();


    const area =
        document.getElementById(
            "catalogArea"
        );


    area.innerHTML = "";


    const materials =
        window.MATERIAL_ESTIMATE_CONFIG
            .getAllMaterials();


    materials.forEach(
        function (material) {

            const card =
                createCard({

                    icon:
                        material.icon || "🔌",

                    title:
                        getName(material),

                    subtitle:
                        getName({
                            name_hi:
                                material.stageNameHi,

                            name_en:
                                material.stageNameEn
                        }),

                    action:
                        UI_TEXT[currentLang].explore,

                    onclick:
                        function () {

                            currentStage =
                                window.MATERIAL_ESTIMATE_CONFIG
                                    .stages
                                    .find(
                                        stage =>
                                            stage.id ===
                                            material.stageId
                                    );


                            openMaterial(
                                material
                            );

                        }

                });


            area.appendChild(card);

        }
    );

}



/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

    const input =
        document.getElementById(
            "searchInput"
        );


    input.addEventListener(
        "input",
        function () {

            const query =
                this.value
                    .trim()
                    .toLowerCase();


            if (!query) {

                if (currentStage) {

                    renderMaterials(
                        currentStage
                    );

                } else {

                    renderStages();

                }

                return;

            }


            performSearch(
                query
            );

        }
    );

}


function performSearch(query) {

    const area =
        document.getElementById(
            "catalogArea"
        );


    area.innerHTML = "";


    const results = [];


    const config =
        window.MATERIAL_ESTIMATE_CONFIG;


    config.stages.forEach(
        function (stage) {

            if (
                stage.show === false
            ) return;


            (stage.materials || [])
                .forEach(
                    function (material) {

                        if (
                            material.show === false
                        ) return;


                        const materialText =
                            (

                                material.name_hi +
                                " " +
                                material.name_en

                            ).toLowerCase();


                        if (
                            materialText
                                .includes(query)
                        ) {

                            results.push({
                                stage,
                                material
                            });

                            return;

                        }


                        (
                            material.types ||
                            []
                        ).forEach(
                            function (type) {

                                const text =
                                    (

                                        type.name_hi +
                                        " " +
                                        type.name_en

                                    ).toLowerCase();


                                if (
                                    text.includes(
                                        query
                                    )
                                ) {

                                    results.push({
                                        stage,
                                        material
                                    });

                                }

                            }
                        );

                    }
                );

        }
    );


    updateHeading(
        currentLang === "hi"
            ? "खोज परिणाम"
            : "SEARCH RESULTS",
        currentLang === "hi"
            ? `${results.length} आइटम मिले`
            : `${results.length} items found`
    );


    results.forEach(
        function (result) {

            const card =
                createCard({

                    icon:
                        result.material.icon ||
                        "🔌",

                    title:
                        getName(
                            result.material
                        ),

                    subtitle:
                        getName(
                            result.stage
                        ),

                    action:
                        UI_TEXT[currentLang].explore,

                    onclick:
                        function () {

                            currentStage =
                                result.stage;

                            openMaterial(
                                result.material
                            );

                        }

                });


            area.appendChild(card);

        }
    );


    if (!results.length) {

        area.innerHTML = `

            <div
                style="
                    grid-column:1/-1;
                    text-align:center;
                    padding:60px 20px;
                    color:#9ca8b9;
                ">

                <div
                    style="
                        font-size:60px;
                        margin-bottom:15px;
                    ">

                    🔍

                </div>

                <h3>

                    ${
                        currentLang === "hi"
                            ? "कोई परिणाम नहीं मिला"
                            : "No results found"
                    }

                </h3>

            </div>

        `;

    }

}



/* =========================================================
   CLEAR SEARCH
========================================================= */

function clearSearch() {

    const input =
        document.getElementById(
            "searchInput"
        );


    input.value =
        "";


    if (currentStage) {

        renderMaterials(
            currentStage
        );

    } else {

        renderStages();

    }

}



/* =========================================================
   HEADING
========================================================= */

function updateHeading(
    title,
    subtitle
) {

    document.getElementById(
        "pageTitle"
    ).textContent =
        title;


    document.getElementById(
        "pageSubtitle"
    ).textContent =
        subtitle;

}



/* =========================================================
   CURRENT TITLE
========================================================= */

function getCurrentTitle() {

    if (currentMaterial) {

        return getName(
            currentMaterial
        );

    }


    if (currentStage) {

        return getName(
            currentStage
        );

    }


    return UI_TEXT[currentLang].catalogue;

}



/* =========================================================
   BREADCRUMB
========================================================= */

function updateBreadcrumb() {

    const breadcrumb =
        document.getElementById(
            "breadcrumb"
        );


    const parts = [];


    if (currentStage) {

        parts.push(
            getName(
                currentStage
            )
        );

    }


    if (currentMaterial) {

        parts.push(
            getName(
                currentMaterial
            )
        );

    }


    if (currentType) {

        parts.push(
            getName(
                currentType
            )
        );

    }


    if (currentSubType) {

        parts.push(
            getName(
                currentSubType
            )
        );

    }


    breadcrumb.innerHTML =
        parts
            .map(
                part =>
                    `<span>${escapeHtml(part)}</span>`
            )
            .join(
                "  ›  "
            );

}



/* =========================================================
   CURRENT VIEW
========================================================= */

function renderCurrentView() {

    if (currentStage && !currentMaterial) {

        renderMaterials(
            currentStage
        );

        return;

    }


    if (currentMaterial && !currentType) {

        if (
            hasTypes(
                currentMaterial
            )
        ) {

            renderTypes(
                currentMaterial
            );

        } else {

            openQuantityBrand();

        }

        return;

    }


    if (currentType) {

        if (
            currentType.subTypes &&
            currentType.subTypes.length
        ) {

            renderSubTypes(
                currentType
            );

        } else {

            openQuantityBrand();

        }

    }

}



/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal() {

    document
        .getElementById(
            "itemModal"
        )
        .classList.add(
            "hidden"
        );

}



/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    return String(
        value || ""
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
   MODAL OUTSIDE CLICK
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById(
                "itemModal"
            );


        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);



/* =========================================================
   BACK BUTTON SUPPORT
========================================================= */

window.goBackCatalog =
    function () {

        if (currentType) {

            currentType = null;

            currentSubType = null;

            renderTypes(
                currentMaterial
            );

            return;

        }


        if (currentMaterial) {

            currentMaterial = null;

            currentType = null;

            currentSubType = null;

            renderMaterials(
                currentStage
            );

            return;

        }


        if (currentStage) {

            currentStage = null;

            renderStages();

            return;

        }

    };



/* =========================================================
   READY
========================================================= */

console.log(
    "SANDEEP ELECTROFIX Premium Material Estimate UI Loaded"
);
