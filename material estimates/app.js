/* =========================================================
   SANDEEP ELECTROFIX
   ESTIMATE LIST APP ENGINE
========================================================= */


/* =========================================================
   LANGUAGE
========================================================= */

let currentLanguage =
    localStorage.getItem(
        "sandeep_estimate_language"
    ) || "en";


/* =========================================================
   DOM
========================================================= */

const categoryContainer =
    document.getElementById(
        "categoryContainer"
    );

const manageSection =
    document.getElementById(
        "manageSection"
    );

const estimateSection =
    document.getElementById(
        "estimateSection"
    );

const manageTree =
    document.getElementById(
        "manageTree"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );


/* =========================================================
   TEXT
========================================================= */

function text(item) {

    if (!item) return "";

    return currentLanguage === "hi"

        ? (
            item.hi ||
            item.en ||
            ""
        )

        : (
            item.en ||
            item.hi ||
            ""
        );

}


/* =========================================================
   RENDER CATEGORIES
========================================================= */

function renderCategories(
    data = window.ESTIMATE_LIST
) {

    categoryContainer.innerHTML = "";

    data
        .filter(
            category =>
                category.show !== false
        )
        .forEach(
            category => {

                const card =
                    document.createElement(
                        "div"
                    );

                card.className =
                    "category-card";


                const title =
                    document.createElement(
                        "div"
                    );

                title.className =
                    "category-title";


                title.innerHTML = `

                    <div class="category-name">

                        <span>
                            ${category.icon || "📦"}
                        </span>

                        <span>
                            ${text({
                                en: category.name_en,
                                hi: category.name_hi
                            })}
                        </span>

                    </div>

                    <span>
                        ›
                    </span>

                `;


                const items =
                    document.createElement(
                        "div"
                    );

                items.className =
                    "category-items";


                (
                    category.items || []
                )
                    .filter(
                        item =>
                            item.show !== false
                    )
                    .forEach(
                        item => {

                            const material =
                                document.createElement(
                                    "div"
                                );

                            material.className =
                                "material-card";


                            material.innerHTML = `

                                <h3>

                                    ${text({
                                        en: item.name_en,
                                        hi: item.name_hi
                                    })}

                                </h3>

                                <p>
                                    Tap to continue
                                </p>

                            `;


                            items.appendChild(
                                material
                            );

                        }
                    );


                card.appendChild(title);

                card.appendChild(items);

                categoryContainer.appendChild(
                    card
                );

            }
        );

}


/* =========================================================
   MANAGEMENT TREE
========================================================= */

function renderManageTree() {

    manageTree.innerHTML = "";

    window.ESTIMATE_LIST
        .forEach(
            category => {

                const wrapper =
                    document.createElement(
                        "div"
                    );

                wrapper.className =
                    "tree-category";


                /* CATEGORY */

                const categoryRow =
                    createToggleRow(

                        category.name_en,

                        category.name_hi,

                        category.show !== false,

                        value => {

                            category.show =
                                value;

                            EstimateVisibility.save();

                            renderCategories();

                        }

                    );


                wrapper.appendChild(
                    categoryRow
                );


                /* MATERIALS */

                const children =
                    document.createElement(
                        "div"
                    );

                children.className =
                    "tree-children";


                (
                    category.items || []
                )
                    .forEach(
                        item => {

                            const itemRow =
                                createToggleRow(

                                    item.name_en,

                                    item.name_hi,

                                    item.show !== false,

                                    value => {

                                        item.show =
                                            value;

                                        EstimateVisibility.save();

                                        renderCategories();

                                    }

                                );


                            children.appendChild(
                                itemRow
                            );


                            /*
                             * NESTED DATA
                             */

                            renderNestedControls(
                                item,
                                children
                            );

                        }
                    );


                wrapper.appendChild(
                    children
                );

                manageTree.appendChild(
                    wrapper
                );

            }
        );

}


/* =========================================================
   CREATE TOGGLE
========================================================= */

function createToggleRow(
    english,
    hindi,
    checked,
    callback
) {

    const row =
        document.createElement(
            "div"
        );

    row.className =
        "tree-row";


    const label =
        document.createElement(
            "div"
        );

    label.className =
        "tree-label";


    label.innerHTML = `

        <span>
            ${currentLanguage === "hi"
                ? hindi
                : english}
        </span>

    `;


    const toggle =
        document.createElement(
            "label"
        );

    toggle.className =
        "toggle";


    const input =
        document.createElement(
            "input"
        );

    input.type =
        "checkbox";

    input.checked =
        checked;


    const slider =
        document.createElement(
            "span"
        );

    slider.className =
        "slider";


    input.addEventListener(
        "change",
        () => {

            callback(
                input.checked
            );

        }
    );


    toggle.appendChild(input);

    toggle.appendChild(slider);

    row.appendChild(label);

    row.appendChild(toggle);

    return row;

}


/* =========================================================
   NESTED CONTROLS
========================================================= */

function renderNestedControls(
    item,
    container,
    level = 1
) {

    const nestedKeys = [

        "types",
        "subTypes",
        "sizes",
        "ratings",
        "colours",
        "materials",
        "cableSizes",
        "wattages",
        "sensitivities",
        "curves",
        "units"

    ];


    nestedKeys.forEach(
        key => {

            if (
                !Array.isArray(
                    item[key]
                )
            ) {

                return;

            }


            item[key]
                .forEach(
                    child => {

                        const row =
                            createToggleRow(

                                child.en ||
                                child.name_en ||
                                child.id,

                                child.hi ||
                                child.name_hi ||
                                child.id,

                                child.show !== false,

                                value => {

                                    child.show =
                                        value;

                                    EstimateVisibility.save();

                                    renderCategories();

                                }

                            );


                        row.style.paddingLeft =
                            `${12 + level * 14}px`;


                        container.appendChild(
                            row
                        );


                        renderNestedControls(
                            child,
                            container,
                            level + 1
                        );

                    }
                );

        }
    );

}


/* =========================================================
   MANAGE OPEN
========================================================= */

function openManage() {

    estimateSection.classList.add(
        "hidden"
    );

    manageSection.classList.remove(
        "hidden"
    );

    renderManageTree();

}


/* =========================================================
   MANAGE CLOSE
========================================================= */

function closeManage() {

    manageSection.classList.add(
        "hidden"
    );

    estimateSection.classList.remove(
        "hidden"
    );

    renderCategories();

}


/* =========================================================
   LANGUAGE
========================================================= */

function toggleLanguage() {

    currentLanguage =
        currentLanguage === "en"
            ? "hi"
            : "en";


    localStorage.setItem(
        "sandeep_estimate_language",
        currentLanguage
    );


    renderCategories();

    renderManageTree();


    document.getElementById(
        "languageBtn"
    ).textContent =

        currentLanguage === "en"
            ? "हिंदी"
            : "English";

}


/* =========================================================
   SHOW ALL
========================================================= */

function showEverything() {

    EstimateVisibility.showAll();

    renderCategories();

    renderManageTree();

}


/* =========================================================
   HIDE ALL
========================================================= */

function hideEverything() {

    EstimateVisibility.hideAll();

    renderCategories();

    renderManageTree();

}


/* =========================================================
   RESET
========================================================= */

function resetEverything() {

    const confirmReset =
        confirm(
            "Reset all Show / Hide settings?"
        );


    if (!confirmReset) return;


    EstimateVisibility.reset();

}


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
    "input",
    function () {

        const query =
            this.value
                .toLowerCase()
                .trim();


        if (!query) {

            renderCategories();

            return;

        }


        const results =
            EstimateSearch.search(
                query
            );


        categoryContainer.innerHTML = "";


        results.forEach(
            result => {

                const card =
                    document.createElement(
                        "div"
                    );

                card.className =
                    "material-card";


                card.innerHTML = `

                    <h3>

                        ${text({
                            en:
                                result.item.name_en,
                            hi:
                                result.item.name_hi
                        })}

                    </h3>

                    <p>

                        ${text({
                            en:
                                result.category.name_en,
                            hi:
                                result.category.name_hi
                        })}

                    </p>

                `;


                categoryContainer.appendChild(
                    card
                );

            }
        );

    }
);


/* =========================================================
   EVENTS
========================================================= */

document.getElementById(
    "manageBtn"
).addEventListener(
    "click",
    openManage
);


document.getElementById(
    "closeManageBtn"
).addEventListener(
    "click",
    closeManage
);


document.getElementById(
    "languageBtn"
).addEventListener(
    "click",
    toggleLanguage
);


document.getElementById(
    "showAllBtn"
).addEventListener(
    "click",
    showEverything
);


document.getElementById(
    "hideAllBtn"
).addEventListener(
    "click",
    hideEverything
);


document.getElementById(
    "resetBtn"
).addEventListener(
    "click",
    resetEverything
);


/* =========================================================
   YEAR
========================================================= */

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();


/* =========================================================
   INITIALIZE
========================================================= */

renderCategories();
