/* =========================================================
   SANDEEP ELECTROFIX
   ESTIMATE LIST
   APP ENGINE
   Version 4.0.0

   WORKS WITH:
   estimate-list.js

   FEATURES
   ---------------------------------------------------------
   ✓ Default Language = English
   ✓ English / Hindi
   ✓ Category Show / Hide
   ✓ Item Show / Hide
   ✓ Type Show / Hide
   ✓ Sub-Type Show / Hide
   ✓ Size Show / Hide
   ✓ Rating Show / Hide
   ✓ Colour Show / Hide
   ✓ Material Show / Hide
   ✓ Variety Show / Hide
   ✓ Wattage Show / Hide
   ✓ Sensitivity Show / Hide
   ✓ Curve Show / Hide
   ✓ Cable Size Show / Hide
   ✓ Unit Show / Hide
   ✓ Brand Show / Hide
   ✓ Show Everything
   ✓ Hide Everything
   ✓ Reset
   ✓ LocalStorage
   ✓ Search
   ✓ Hierarchical Manage Panel
========================================================= */


/* =========================================================
   1. GLOBAL STATE
========================================================= */

const ESTIMATE_APP = {

    language:
        window.ESTIMATE_LANGUAGE?.current ||
        window.ESTIMATE_LIST_CONFIG?.languageDefault ||
        "en",

    searchQuery: "",

    manageOpen: false,

    expanded: {},

    initialized: false

};


/* =========================================================
   2. DOM HELPERS
========================================================= */

function $(id) {

    return document.getElementById(id);

}


function createElement(
    tag,
    className = "",
    html = ""
) {

    const element =
        document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (html) {
        element.innerHTML = html;
    }

    return element;

}


/* =========================================================
   3. LANGUAGE ENGINE
========================================================= */

function getLanguage() {

    return ESTIMATE_APP.language === "hi"
        ? "hi"
        : "en";

}


function setLanguage(lang) {

    if (
        lang !== "en" &&
        lang !== "hi"
    ) {
        return;
    }

    ESTIMATE_APP.language =
        lang;

    localStorage.setItem(
        "sandeep_estimate_language",
        lang
    );

    if (
        window.ESTIMATE_LANGUAGE
    ) {

        window.ESTIMATE_LANGUAGE.current =
            lang;

    }

    renderApplication();

}


function getText(item) {

    if (!item) {
        return "";
    }

    const lang =
        getLanguage();

    return (
        item[lang] ||
        item.en ||
        item.hi ||
        ""
    );

}


function getNamedText(item) {

    if (!item) {
        return "";
    }

    const lang =
        getLanguage();

    if (lang === "hi") {

        return (
            item.name_hi ||
            item.hi ||
            item.name_en ||
            item.en ||
            item.id ||
            ""
        );

    }

    return (
        item.name_en ||
        item.en ||
        item.name_hi ||
        item.hi ||
        item.id ||
        ""
    );

}


/* =========================================================
   4. LANGUAGE BUTTON
========================================================= */

function updateLanguageButton() {

    const button =
        $("languageBtn");

    if (!button) {
        return;
    }

    button.textContent =
        getLanguage() === "en"
            ? "हिंदी"
            : "English";

}


/* =========================================================
   5. DATABASE
========================================================= */

function getDatabase() {

    if (
        !Array.isArray(
            window.ESTIMATE_LIST
        )
    ) {

        console.error(
            "ESTIMATE_LIST not found."
        );

        return [];

    }

    return window.ESTIMATE_LIST;

}


function getBrands() {

    if (
        !Array.isArray(
            window.ESTIMATE_BRANDS
        )
    ) {

        return [];

    }

    return window.ESTIMATE_BRANDS;

}


/* =========================================================
   6. NESTED ARRAY TYPES
========================================================= */

const NESTED_ARRAY_KEYS = [

    "types",

    "subTypes",

    "sizes",

    "ratings",

    "colours",

    "colors",

    "materials",

    "varieties",

    "wattages",

    "sensitivities",

    "curves",

    "cableSizes",

    "units",

    "brands"

];


/* =========================================================
   7. HUMAN LABELS
========================================================= */

const KEY_LABELS = {

    types: {
        en: "Type",
        hi: "टाइप"
    },

    subTypes: {
        en: "Sub-Type",
        hi: "सब-टाइप"
    },

    sizes: {
        en: "Size",
        hi: "साइज़"
    },

    ratings: {
        en: "Rating",
        hi: "रेटिंग"
    },

    colours: {
        en: "Colour",
        hi: "रंग"
    },

    colors: {
        en: "Colour",
        hi: "रंग"
    },

    materials: {
        en: "Material",
        hi: "मटेरियल"
    },

    varieties: {
        en: "Variety",
        hi: "वैरायटी"
    },

    wattages: {
        en: "Wattage",
        hi: "वॉटेज"
    },

    sensitivities: {
        en: "Sensitivity",
        hi: "सेंसिटिविटी"
    },

    curves: {
        en: "Curve",
        hi: "कर्व"
    },

    cableSizes: {
        en: "Cable Size",
        hi: "केबल साइज़"
    },

    units: {
        en: "Unit",
        hi: "यूनिट"
    },

    brands: {
        en: "Brand",
        hi: "ब्रांड"
    }

};


function getKeyLabel(key) {

    const data =
        KEY_LABELS[key];

    if (!data) {
        return key;
    }

    return getLanguage() === "hi"
        ? data.hi
        : data.en;

}


/* =========================================================
   8. ID GENERATOR
========================================================= */

function makePathId(
    parentPath,
    key,
    item,
    index
) {

    return [

        parentPath || "root",

        key,

        item?.id ||
        item?.name_en ||
        item?.en ||
        index

    ].join("__");

}


/* =========================================================
   9. VISIBILITY
========================================================= */

function isVisible(item) {

    return (
        !item ||
        item.show !== false
    );

}


function setVisible(
    item,
    value
) {

    if (!item) {
        return;
    }

    item.show =
        Boolean(value);

}


/* =========================================================
   10. RECURSIVE SHOW
========================================================= */

function showNestedObject(
    object
) {

    if (
        !object ||
        typeof object !== "object"
    ) {
        return;
    }


    Object.keys(object)
        .forEach(key => {

            const value =
                object[key];

            if (
                !Array.isArray(value)
            ) {
                return;
            }


            value.forEach(item => {

                if (
                    !item ||
                    typeof item !== "object"
                ) {
                    return;
                }


                item.show = true;

                showNestedObject(
                    item
                );

            });

        });

}


/* =========================================================
   11. RECURSIVE HIDE
========================================================= */

function hideNestedObject(
    object
) {

    if (
        !object ||
        typeof object !== "object"
    ) {
        return;
    }


    Object.keys(object)
        .forEach(key => {

            const value =
                object[key];

            if (
                !Array.isArray(value)
            ) {
                return;
            }


            value.forEach(item => {

                if (
                    !item ||
                    typeof item !== "object"
                ) {
                    return;
                }


                item.show = false;

                hideNestedObject(
                    item
                );

            });

        });

}


/* =========================================================
   12. SAVE
========================================================= */

function saveSettings() {

    if (
        window.EstimateVisibility &&
        typeof
        window.EstimateVisibility.save ===
        "function"
    ) {

        window.EstimateVisibility.save();

    }

    /*
     * Save brands separately.
     */

    try {

        localStorage.setItem(

            "sandeep_estimate_brands",

            JSON.stringify(
                getBrands()
            )

        );

    } catch (error) {

        console.warn(
            "Brand settings save error:",
            error
        );

    }

}


/* =========================================================
   13. LOAD
========================================================= */

function loadSettings() {

    /*
     * Main material settings
     */

    if (
        window.EstimateVisibility &&
        typeof
        window.EstimateVisibility.load ===
        "function"
    ) {

        window.EstimateVisibility.load();

    }


    /*
     * Brand settings
     */

    try {

        const savedBrands =
            localStorage.getItem(
                "sandeep_estimate_brands"
            );

        if (savedBrands) {

            const parsed =
                JSON.parse(
                    savedBrands
                );

            if (
                Array.isArray(parsed)
            ) {

                window.ESTIMATE_BRANDS =
                    parsed;

            }

        }

    } catch (error) {

        console.warn(
            "Brand settings load error:",
            error
        );

    }

}


/* =========================================================
   14. SHOW EVERYTHING
========================================================= */

function showEverything() {

    const database =
        getDatabase();


    database.forEach(
        category => {

            category.show =
                true;

            showNestedObject(
                category
            );

        }
    );


    getBrands()
        .forEach(
            brand => {

                brand.show =
                    true;

            }
        );


    saveSettings();

    renderApplication();

}


/* =========================================================
   15. HIDE EVERYTHING
========================================================= */

function hideEverything() {

    const database =
        getDatabase();


    database.forEach(
        category => {

            category.show =
                false;

            hideNestedObject(
                category
            );

        }
    );


    getBrands()
        .forEach(
            brand => {

                brand.show =
                    false;

            }
        );


    saveSettings();

    renderApplication();

}


/* =========================================================
   16. RESET EVERYTHING
========================================================= */

function resetEverything() {

    const message =
        getLanguage() === "hi"

            ? "क्या आप सभी Show / Hide settings reset करना चाहते हैं?"

            : "Reset all Show / Hide settings?";


    if (
        !window.confirm(message)
    ) {

        return;

    }


    if (
        window.EstimateVisibility &&
        typeof
        window.EstimateVisibility.reset ===
        "function"
    ) {

        window.EstimateVisibility.reset();

        return;

    }


    localStorage.removeItem(
        window.ESTIMATE_LIST_CONFIG?.storageKey ||
        "sandeep_estimate_list_settings"
    );

    localStorage.removeItem(
        "sandeep_estimate_brands"
    );

    location.reload();

}


/* =========================================================
   17. CATEGORY DISPLAY
========================================================= */

function renderCategories() {

    const container =
        $("categoryContainer");

    if (!container) {
        return;
    }


    container.innerHTML = "";


    const database =
        getDatabase();


    const query =
        ESTIMATE_APP.searchQuery
            .toLowerCase()
            .trim();


    let found =
        false;


    database.forEach(
        (category, categoryIndex) => {

            if (
                !isVisible(category)
            ) {

                return;

            }


            const visibleItems =
                getVisibleItemsForSearch(
                    category,
                    query
                );


            if (
                query &&
                visibleItems.length === 0
            ) {

                return;

            }


            found = true;


            const categoryCard =
                createElement(
                    "div",
                    "category-card"
                );


            const title =
                createElement(
                    "div",
                    "category-title"
                );


                        title.innerHTML = `
                <div style="font-size: 35px; margin-bottom: 10px; text-shadow: 0 0 15px currentColor;">
                    ${category.icon || "📦"}
                </div>
                <div style="font-weight: 700; font-size: 14px; text-transform: uppercase;">
                    ${escapeHTML(getNamedText(category))}
                </div>
                <div style="font-size: 10px; color: #0ea5e9; margin-top: 4px;">INSTALLATION</div>
                <button style="margin-top: 15px; background: transparent; border: 1px solid rgba(255,255,255,0.2); border-radius: 20px; padding: 5px 15px; color: white;">Explore ➔</button>
            `;



            title.addEventListener(
                "click",
                () => {

                    toggleExpanded(
                        "category",
                        category.id
                    );

                    renderCategories();

                }
            );


            categoryCard.appendChild(
                title
            );


            if (
                isExpanded(
                    "category",
                    category.id
                )
            ) {

                const itemsContainer =
                    createElement(
                        "div",
                        "category-items"
                    );


                visibleItems.forEach(
                    item => {

                        if (
                            !isVisible(item)
                        ) {

                            return;

                        }


                        const materialCard =
                            createElement(
                                "div",
                                "material-card"
                            );


                        materialCard.innerHTML = `

                            <h3>
                                ${escapeHTML(
                                    getNamedText(item)
                                )}
                            </h3>

                            <p>
                                ${getItemSummary(
                                    item
                                )}
                            </p>

                        `;


                        itemsContainer.appendChild(
                            materialCard
                        );

                    }
                );


                categoryCard.appendChild(
                    itemsContainer
                );

            }


            container.appendChild(
                categoryCard
            );

        }
    );


    if (!found) {

        const empty =
            createElement(
                "div",
                "empty-state"
            );


        empty.innerHTML = `

            <div style="
                text-align:center;
                padding:40px 20px;
                color:#94a3b8;
            ">

                <div style="
                    font-size:40px;
                    margin-bottom:10px;
                ">
                    🔍
                </div>

                <div>
                    ${
                        getLanguage() === "hi"
                        ? "कोई सामग्री नहीं मिली"
                        : "No material found"
                    }
                </div>

            </div>

        `;


        container.appendChild(
            empty
        );

    }

}


/* =========================================================
   18. SEARCH ITEMS
========================================================= */

function getVisibleItemsForSearch(
    category,
    query
) {

    const items =
        Array.isArray(category.items)
            ? category.items
            : [];


    if (!query) {

        return items.filter(
            item =>
                isVisible(item)
        );

    }


    return items.filter(
        item => {

            if (
                !isVisible(item)
            ) {

                return false;

            }


            return objectContainsSearch(
                item,
                query
            );

        }
    );

}


/* =========================================================
   19. RECURSIVE SEARCH
========================================================= */

function objectContainsSearch(
    object,
    query
) {

    if (
        !object ||
        typeof object !== "object"
    ) {

        return false;

    }


    const ownText = [

        object.id,

        object.name_en,

        object.name_hi,

        object.en,

        object.hi

    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();


    if (
        ownText.includes(query)
    ) {

        return true;

    }


    for (
        const key of Object.keys(object)
    ) {

        const value =
            object[key];


        if (
            !Array.isArray(value)
        ) {

            continue;

        }


        for (
            const child of value
        ) {

            if (
                child &&
                child.show !== false &&
                objectContainsSearch(
                    child,
                    query
                )
            ) {

                return true;

            }

        }

    }


    return false;

}


/* =========================================================
   20. ITEM SUMMARY
========================================================= */

function getItemSummary(item) {

    const groups = [];


    NESTED_ARRAY_KEYS.forEach(
        key => {

            if (
                !Array.isArray(
                    item[key]
                )
            ) {

                return;

            }


            const visible =
                item[key].filter(
                    child =>
                        isVisible(child)
                );


            if (
                visible.length
            ) {

                groups.push(
                    `${getKeyLabel(key)}: ${visible.length}`
                );

            }

        }
    );


    if (!groups.length) {

        return getLanguage() === "hi"
            ? "उपलब्ध"
            : "Available";

    }


    return groups.join(" • ");

}


/* =========================================================
   21. EXPAND / COLLAPSE
========================================================= */

function expandKey(
    type,
    id
) {

    return `${type}__${id}`;

}


function isExpanded(
    type,
    id
) {

    const key =
        expandKey(
            type,
            id
        );


    return (
        ESTIMATE_APP.expanded[key] !==
        false
    );

}


function toggleExpanded(
    type,
    id
) {

    const key =
        expandKey(
            type,
            id
        );


    ESTIMATE_APP.expanded[key] =
        !isExpanded(
            type,
            id
        );

}


/* =========================================================
   22. MANAGE PANEL
========================================================= */

function openManagePanel() {

    ESTIMATE_APP.manageOpen =
        true;


    const estimateSection =
        $("estimateSection");

    const manageSection =
        $("manageSection");


    if (estimateSection) {

        estimateSection.classList.add(
            "hidden"
        );

    }


    if (manageSection) {

        manageSection.classList.remove(
            "hidden"
        );

    }


    renderManagePanel();

}


function closeManagePanel() {

    ESTIMATE_APP.manageOpen =
        false;


    const estimateSection =
        $("estimateSection");

    const manageSection =
        $("manageSection");


    if (manageSection) {

        manageSection.classList.add(
            "hidden"
        );

    }


    if (estimateSection) {

        estimateSection.classList.remove(
            "hidden"
        );

    }


    renderCategories();

}


/* =========================================================
   23. MANAGE PANEL RENDER
========================================================= */

function renderManagePanel() {

    const tree =
        $("manageTree");

    if (!tree) {
        return;
    }


    tree.innerHTML = "";


    const database =
        getDatabase();


    /*
     * CATEGORIES
     */

    database.forEach(
        (category, index) => {

            tree.appendChild(

                createManageCategory(
                    category,
                    index
                )

            );

        }
    );


    /*
     * BRANDS
     */

    if (
        window.ESTIMATE_LIST_CONFIG
            ?.enableBrand
    ) {

        tree.appendChild(
            createBrandSection()
        );

    }

}


/* =========================================================
   24. CATEGORY MANAGE
========================================================= */

function createManageCategory(
    category,
    categoryIndex
) {

    const wrapper =
        createElement(
            "div",
            "tree-category"
        );


    /*
     * CATEGORY HEADER
     */

    const header =
        createManageRow({

            label:
                getNamedText(category),

            icon:
                category.icon || "📦",

            checked:
                isVisible(category),

            level: 0,

            onChange:
                value => {

                    category.show =
                        value;


                    /*
                     * Parent OFF
                     * children also OFF
                     */

                    if (!value) {

                        hideNestedObject(
                            category
                        );

                    }


                    saveSettings();

                    renderCategories();

                    renderManagePanel();

                }

        });


    wrapper.appendChild(
        header
    );


    /*
     * ITEMS
     */

    const items =
        Array.isArray(
            category.items
        )
            ? category.items
            : [];


    const children =
        createElement(
            "div",
            "tree-children"
        );


    items.forEach(
        (item, itemIndex) => {

            children.appendChild(

                createManageItem(
                    item,
                    category,
                    itemIndex,
                    1
                )

            );

        }
    );


    wrapper.appendChild(
        children
    );


    return wrapper;

}


/* =========================================================
   25. ITEM MANAGE
========================================================= */

function createManageItem(
    item,
    parent,
    itemIndex,
    level
) {

    const wrapper =
        createElement(
            "div",
            "manage-nested-wrapper"
        );


    /*
     * ITEM ROW
     */

    const row =
        createManageRow({

            label:
                getNamedText(item),

            icon:
                "▸",

            checked:
                isVisible(item),

            level,

            onChange:
                value => {

                    item.show =
                        value;


                    if (!value) {

                        hideNestedObject(
                            item
                        );

                    }


                    saveSettings();

                    renderCategories();

                    renderManagePanel();

                }

        });


    wrapper.appendChild(
        row
    );


    /*
     * ALL NESTED ARRAYS
     */

    NESTED_ARRAY_KEYS
        .forEach(key => {

            const array =
                item[key];


            if (
                !Array.isArray(array) ||
                !array.length
            ) {

                return;

            }


            const group =
                createElement(
                    "div",
                    "tree-children"
                );


            /*
             * GROUP TITLE
             */

            const groupTitle =
                createElement(
                    "div",
                    "tree-group-title"
                );


            groupTitle.innerHTML = `

                <span>
                    ${escapeHTML(
                        getKeyLabel(key)
                    )}
                </span>

            `;


            group.appendChild(
                groupTitle
            );


            /*
             * CHILDREN
             */

            array.forEach(
                (child, childIndex) => {

                    group.appendChild(

                        createNestedManageItem(
                            child,
                            item,
                            key,
                            childIndex,
                            level + 1
                        )

                    );

                }
            );


            wrapper.appendChild(
                group
            );

        });


    return wrapper;

}


/* =========================================================
   26. NESTED MANAGE ITEM
========================================================= */

function createNestedManageItem(
    item,
    parent,
    parentKey,
    index,
    level
) {

    const wrapper =
        createElement(
            "div",
            "nested-control"
        );


    const row =
        createManageRow({

            label:
                getNamedText(item),

            icon:
                "•",

            checked:
                isVisible(item),

            level,

            onChange:
                value => {

                    item.show =
                        value;


                    if (!value) {

                        hideNestedObject(
                            item
                        );

                    }


                    saveSettings();

                    renderCategories();

                    renderManagePanel();

                }

        });


    wrapper.appendChild(
        row
    );


    /*
     * RECURSIVE CHILD ARRAYS
     */

    NESTED_ARRAY_KEYS
        .forEach(key => {

            const array =
                item[key];


            if (
                !Array.isArray(array) ||
                !array.length
            ) {

                return;

            }


            const group =
                createElement(
                    "div",
                    "tree-children"
                );


            const groupTitle =
                createElement(
                    "div",
                    "tree-group-title"
                );


            groupTitle.innerHTML = `

                <span>
                    ${escapeHTML(
                        getKeyLabel(key)
                    )}
                </span>

            `;


            group.appendChild(
                groupTitle
            );


            array.forEach(
                (child, childIndex) => {

                    group.appendChild(

                        createNestedManageItem(
                            child,
                            item,
                            key,
                            childIndex,
                            level + 1
                        )

                    );

                }
            );


            wrapper.appendChild(
                group
            );

        });


    return wrapper;

}


/* =========================================================
   27. MANAGE ROW
========================================================= */

function createManageRow({
    label,
    icon,
    checked,
    level = 0,
    onChange
}) {

    const row =
        createElement(
            "div",
            "tree-row"
        );


    row.style.paddingLeft =
        `${12 + (level * 16)}px`;


    const labelBox =
        createElement(
            "div",
            "tree-label"
        );


    labelBox.innerHTML = `

        <span>
            ${icon || "•"}
        </span>

        <span>
            ${escapeHTML(
                label
            )}
        </span>

    `;


    const toggle =
        createElement(
            "label",
            "toggle"
        );


    const input =
        createElement(
            "input"
        );


    input.type =
        "checkbox";

    input.checked =
        checked;


    const slider =
        createElement(
            "span",
            "slider"
        );


    input.addEventListener(
        "change",
        () => {

            onChange(
                input.checked
            );

        }
    );


    toggle.appendChild(
        input
    );

    toggle.appendChild(
        slider
    );


    row.appendChild(
        labelBox
    );

    row.appendChild(
        toggle
    );


    return row;

}


/* =========================================================
   28. BRAND SECTION
========================================================= */

function createBrandSection() {

    const wrapper =
        createElement(
            "div",
            "tree-category"
        );


    const header =
        createElement(
            "div",
            "tree-row"
        );


    header.innerHTML = `

        <div class="tree-label">

            <span>
                🏷️
            </span>

            <strong>
                ${
                    getLanguage() === "hi"
                    ? "ब्रांड"
                    : "Brands"
                }
            </strong>

        </div>

    `;


    wrapper.appendChild(
        header
    );


    const children =
        createElement(
            "div",
            "tree-children"
        );


    getBrands()
        .forEach(
            brand => {

                const row =
                    createManageRow({

                        label:
                            getNamedText(
                                brand
                            ),

                        icon:
                            "🏷️",

                        checked:
                            isVisible(
                                brand
                            ),

                        level: 1,

                        onChange:
                            value => {

                                brand.show =
                                    value;

                                saveSettings();

                                renderManagePanel();

                            }

                    });


                children.appendChild(
                    row
                );

            }
        );


    wrapper.appendChild(
        children
    );


    return wrapper;

}


/* =========================================================
   29. SEARCH
========================================================= */

function handleSearch(
    value
) {

    ESTIMATE_APP.searchQuery =
        String(
            value || ""
        );


    renderCategories();

}


/* =========================================================
   30. SEARCH INPUT
========================================================= */

function initializeSearch() {

    const input =
        $("searchInput");


    if (!input) {
        return;
    }


    input.addEventListener(
        "input",
        event => {

            handleSearch(
                event.target.value
            );

        }
    );

}


/* =========================================================
   31. MAIN BUTTONS
========================================================= */

function initializeButtons() {

    const manageBtn =
        $("manageBtn");

    const closeManageBtn =
        $("closeManageBtn");

    const languageBtn =
        $("languageBtn");

    const showAllBtn =
        $("showAllBtn");

    const hideAllBtn =
        $("hideAllBtn");

    const resetBtn =
        $("resetBtn");


    if (manageBtn) {

        manageBtn.addEventListener(
            "click",
            openManagePanel
        );

    }


    if (closeManageBtn) {

        closeManageBtn.addEventListener(
            "click",
            closeManagePanel
        );

    }


    if (languageBtn) {

        languageBtn.addEventListener(
            "click",
            () => {

                setLanguage(
                    getLanguage() === "en"
                        ? "hi"
                        : "en"
                );

            }
        );

    }


    if (showAllBtn) {

        showAllBtn.addEventListener(
            "click",
            showEverything
        );

    }


    if (hideAllBtn) {

        hideAllBtn.addEventListener(
            "click",
            hideEverything
        );

    }


    if (resetBtn) {

        resetBtn.addEventListener(
            "click",
            resetEverything
        );

    }

}


/* =========================================================
   32. BACK BUTTON
========================================================= */

function initializeBackButton() {

    window.addEventListener(
        "popstate",
        () => {

            if (
                ESTIMATE_APP.manageOpen
            ) {

                closeManagePanel();

            }

        }
    );

}


/* =========================================================
   33. ESC KEY
========================================================= */

function initializeKeyboard() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                ESTIMATE_APP.manageOpen
            ) {

                closeManagePanel();

            }

        }
    );

}


/* =========================================================
   34. RENDER APPLICATION
========================================================= */

function renderApplication() {

    updateLanguageButton();

    renderCategories();


    if (
        ESTIMATE_APP.manageOpen
    ) {

        renderManagePanel();

    }

}


/* =========================================================
   35. YEAR
========================================================= */

function initializeYear() {

    const year =
        $("year");


    if (year) {

        year.textContent =
            new Date()
                .getFullYear();

    }

}


/* =========================================================
   36. HTML ESCAPE
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
   37. INITIALIZE
========================================================= */

function initializeEstimateApp() {

    if (
        ESTIMATE_APP.initialized
    ) {

        return;

    }


    /*
     * Load saved settings
     */

    loadSettings();


    /*
     * Load saved language
     */

    ESTIMATE_APP.language =
        localStorage.getItem(
            "sandeep_estimate_language"
        ) ||

        window.ESTIMATE_LIST_CONFIG
            ?.languageDefault ||

        "en";


    /*
     * Initialize UI
     */

    initializeSearch();

    initializeButtons();

    initializeBackButton();

    initializeKeyboard();

    initializeYear();

    renderApplication();


    ESTIMATE_APP.initialized =
        true;

}


/* =========================================================
   38. DOM READY
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeEstimateApp
    );

} else {

    initializeEstimateApp();

}


/* =========================================================
   END OF APP.JS
========================================================= */
