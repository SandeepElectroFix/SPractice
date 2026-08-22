/* =========================================================
   SANDEEP ELECTROFIX
   ESTIMATE LIST APP ENGINE
========================================================= */

const ESTIMATE_APP = {
    language: window.ESTIMATE_LANGUAGE?.current || window.ESTIMATE_LIST_CONFIG?.languageDefault || "en",
    searchQuery: "",
    manageOpen: false,
    expanded: {},
    initialized: false
};

function $(id) { return document.getElementById(id); }

function createElement(tag, className = "", html = "") {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (html) element.innerHTML = html;
    return element;
}

function getLanguage() { return ESTIMATE_APP.language === "hi" ? "hi" : "en"; }

function setLanguage(lang) {
    if (lang !== "en" && lang !== "hi") return;
    ESTIMATE_APP.language = lang;
    localStorage.setItem("sandeep_estimate_language", lang);
    if (window.ESTIMATE_LANGUAGE) window.ESTIMATE_LANGUAGE.current = lang;
    renderApplication();
}

function getText(item) {
    if (!item) return "";
    const lang = getLanguage();
    return (item[lang] || item.en || item.hi || "");
}

function getNamedText(item) {
    if (!item) return "";
    const lang = getLanguage();
    if (lang === "hi") return (item.name_hi || item.hi || item.name_en || item.en || item.id || "");
    return (item.name_en || item.en || item.name_hi || item.hi || item.id || "");
}

function updateLanguageButton() {
    const button = $("languageBtn");
    if (button) button.textContent = getLanguage() === "en" ? "हिंदी" : "English";
}

function getDatabase() {
    if (!Array.isArray(window.ESTIMATE_LIST)) return [];
    return window.ESTIMATE_LIST;
}

function getBrands() {
    if (!Array.isArray(window.ESTIMATE_BRANDS)) return [];
    return window.ESTIMATE_BRANDS;
}

const NESTED_ARRAY_KEYS = ["types", "subTypes", "sizes", "ratings", "colours", "colors", "materials", "varieties", "wattages", "sensitivities", "curves", "cableSizes", "units", "brands"];

const KEY_LABELS = {
    types: { en: "Type", hi: "टाइप" },
    subTypes: { en: "Sub-Type", hi: "सब-टाइप" },
    sizes: { en: "Size", hi: "साइज़" },
    ratings: { en: "Rating", hi: "रेटिंग" },
    colours: { en: "Colour", hi: "रंग" },
    colors: { en: "Colour", hi: "रंग" },
    materials: { en: "Material", hi: "मटेरियल" },
    varieties: { en: "Variety", hi: "वैरायटी" },
    wattages: { en: "Wattage", hi: "वॉटेज" },
    sensitivities: { en: "Sensitivity", hi: "सेंसिटिविटी" },
    curves: { en: "Curve", hi: "कर्व" },
    cableSizes: { en: "Cable Size", hi: "केबल साइज़" },
    units: { en: "Unit", hi: "यूनिट" },
    brands: { en: "Brand", hi: "ब्रांड" }
};

function getKeyLabel(key) {
    const data = KEY_LABELS[key];
    if (!data) return key;
    return getLanguage() === "hi" ? data.hi : data.en;
}

function isVisible(item) { return (!item || item.show !== false); }

function showNestedObject(object) {
    if (!object || typeof object !== "object") return;
    Object.keys(object).forEach(key => {
        const value = object[key];
        if (!Array.isArray(value)) return;
        value.forEach(item => {
            if (!item || typeof item !== "object") return;
            item.show = true;
            showNestedObject(item);
        });
    });
}

function hideNestedObject(object) {
    if (!object || typeof object !== "object") return;
    Object.keys(object).forEach(key => {
        const value = object[key];
        if (!Array.isArray(value)) return;
        value.forEach(item => {
            if (!item || typeof item !== "object") return;
            item.show = false;
            hideNestedObject(item);
        });
    });
}

function saveSettings() {
    if (window.EstimateVisibility && typeof window.EstimateVisibility.save === "function") {
        window.EstimateVisibility.save();
    }
    try { localStorage.setItem("sandeep_estimate_brands", JSON.stringify(getBrands())); } catch (error) {}
}

function loadSettings() {
    if (window.EstimateVisibility && typeof window.EstimateVisibility.load === "function") {
        window.EstimateVisibility.load();
    }
    try {
        const savedBrands = localStorage.getItem("sandeep_estimate_brands");
        if (savedBrands) {
            const parsed = JSON.parse(savedBrands);
            if (Array.isArray(parsed)) window.ESTIMATE_BRANDS = parsed;
        }
    } catch (error) {}
}

function showEverything() {
    getDatabase().forEach(category => { category.show = true; showNestedObject(category); });
    getBrands().forEach(brand => { brand.show = true; });
    saveSettings();
    renderApplication();
}

function hideEverything() {
    getDatabase().forEach(category => { category.show = false; hideNestedObject(category); });
    getBrands().forEach(brand => { brand.show = false; });
    saveSettings();
    renderApplication();
}

function resetEverything() {
    const message = getLanguage() === "hi" ? "क्या आप सभी Show / Hide settings reset करना चाहते हैं?" : "Reset all Show / Hide settings?";
    if (!window.confirm(message)) return;
    if (window.EstimateVisibility && typeof window.EstimateVisibility.reset === "function") {
        window.EstimateVisibility.reset();
        return;
    }
    localStorage.removeItem(window.ESTIMATE_LIST_CONFIG?.storageKey || "sandeep_estimate_list_settings");
    localStorage.removeItem("sandeep_estimate_brands");
    location.reload();
}

function renderCategories() {
    const container = $("categoryContainer");
    if (!container) return;
    container.innerHTML = "";

    const database = getDatabase();
    const query = ESTIMATE_APP.searchQuery.toLowerCase().trim();
    let found = false;

    database.forEach((category) => {
        if (!isVisible(category)) return;

        const visibleItems = getVisibleItemsForSearch(category, query);
        if (query && visibleItems.length === 0) return;
        found = true;

        const categoryCard = createElement("div", "category-card");
        const title = createElement("div", "category-title");

        // NEW NEON THEME CARD HTML & CLICK LOGIC
        title.innerHTML = `
            <div style="font-size: 35px; margin-bottom: 10px; text-shadow: 0 0 15px currentColor; pointer-events: none;">
                ${category.icon || "📦"}
            </div>
            <div style="font-weight: 700; font-size: 14px; text-transform: uppercase; pointer-events: none;">
                ${escapeHTML(getNamedText(category))}
            </div>
            <div style="font-size: 10px; color: #0ea5e9; margin-top: 4px; pointer-events: none;">INSTALLATION</div>
            <button style="margin-top: 15px; background: transparent; border: 1px solid rgba(255,255,255,0.2); border-radius: 20px; padding: 5px 15px; color: white; cursor: pointer;">Explore ➔</button>
        `;

        title.addEventListener("click", () => {
            toggleExpanded("category", category.id);
            renderCategories();
        });

        categoryCard.appendChild(title);

        if (isExpanded("category", category.id)) {
            const itemsContainer = createElement("div", "category-items");
            visibleItems.forEach(item => {
                if (!isVisible(item)) return;
                const materialCard = createElement("div", "material-card");
                materialCard.innerHTML = `
                    <h3>${escapeHTML(getNamedText(item))}</h3>
                    <p>${getItemSummary(item)}</p>
                `;
                itemsContainer.appendChild(materialCard);
            });
            categoryCard.appendChild(itemsContainer);
        }

        container.appendChild(categoryCard);
    });

    if (!found) {
        const empty = createElement("div", "empty-state");
        empty.innerHTML = `
            <div style="text-align:center; padding:40px 20px; color:#94a3b8;">
                <div style="font-size:40px; margin-bottom:10px;">🔍</div>
                <div>${getLanguage() === "hi" ? "कोई सामग्री नहीं मिली" : "No material found"}</div>
            </div>
        `;
        container.appendChild(empty);
    }
}

function getVisibleItemsForSearch(category, query) {
    const items = Array.isArray(category.items) ? category.items : [];
    if (!query) return items.filter(item => isVisible(item));
    return items.filter(item => {
        if (!isVisible(item)) return false;
        return objectContainsSearch(item, query);
    });
}

function objectContainsSearch(object, query) {
    if (!object || typeof object !== "object") return false;
    const ownText = [object.id, object.name_en, object.name_hi, object.en, object.hi].filter(Boolean).join(" ").toLowerCase();
    if (ownText.includes(query)) return true;
    for (const key of Object.keys(object)) {
        const value = object[key];
        if (!Array.isArray(value)) continue;
        for (const child of value) {
            if (child && child.show !== false && objectContainsSearch(child, query)) return true;
        }
    }
    return false;
}

function getItemSummary(item) {
    const groups = [];
    NESTED_ARRAY_KEYS.forEach(key => {
        if (!Array.isArray(item[key])) return;
        const visible = item[key].filter(child => isVisible(child));
        if (visible.length) groups.push(`${getKeyLabel(key)}: ${visible.length}`);
    });
    if (!groups.length) return getLanguage() === "hi" ? "उपलब्ध" : "Available";
    return groups.join(" • ");
}

function expandKey(type, id) { return `${type}__${id}`; }
function isExpanded(type, id) { return (ESTIMATE_APP.expanded[expandKey(type, id)] !== false); }
function toggleExpanded(type, id) { ESTIMATE_APP.expanded[expandKey(type, id)] = !isExpanded(type, id); }

function openManagePanel() {
    ESTIMATE_APP.manageOpen = true;
    if ($("estimateSection")) $("estimateSection").classList.add("hidden");
    if ($("manageSection")) $("manageSection").classList.remove("hidden");
    renderManagePanel();
}

function closeManagePanel() {
    ESTIMATE_APP.manageOpen = false;
    if ($("manageSection")) $("manageSection").classList.add("hidden");
    if ($("estimateSection")) $("estimateSection").classList.remove("hidden");
    renderCategories();
}

function renderManagePanel() {
    const tree = $("manageTree");
    if (!tree) return;
    tree.innerHTML = "";
    getDatabase().forEach((category, index) => { tree.appendChild(createManageCategory(category, index)); });
    if (window.ESTIMATE_LIST_CONFIG?.enableBrand) { tree.appendChild(createBrandSection()); }
}

function createManageCategory(category, categoryIndex) {
    const wrapper = createElement("div", "tree-category");
    const header = createManageRow({
        label: getNamedText(category),
        icon: category.icon || "📦",
        checked: isVisible(category),
        level: 0,
        onChange: value => {
            category.show = value;
            if (!value) hideNestedObject(category);
            saveSettings(); renderCategories(); renderManagePanel();
        }
    });
    wrapper.appendChild(header);
    const items = Array.isArray(category.items) ? category.items : [];
    const children = createElement("div", "tree-children");
    items.forEach((item, itemIndex) => { children.appendChild(createManageItem(item, category, itemIndex, 1)); });
    wrapper.appendChild(children);
    return wrapper;
}

function createManageItem(item, parent, itemIndex, level) {
    const wrapper = createElement("div", "manage-nested-wrapper");
    const row = createManageRow({
        label: getNamedText(item),
        icon: "▸",
        checked: isVisible(item),
        level,
        onChange: value => {
            item.show = value;
            if (!value) hideNestedObject(item);
            saveSettings(); renderCategories(); renderManagePanel();
        }
    });
    wrapper.appendChild(row);
    NESTED_ARRAY_KEYS.forEach(key => {
        const array = item[key];
        if (!Array.isArray(array) || !array.length) return;
        const group = createElement("div", "tree-children");
        const groupTitle = createElement("div", "tree-group-title");
        groupTitle.innerHTML = `<span>${escapeHTML(getKeyLabel(key))}</span>`;
        group.appendChild(groupTitle);
        array.forEach((child, childIndex) => {
            group.appendChild(createNestedManageItem(child, item, key, childIndex, level + 1));
        });
        wrapper.appendChild(group);
    });
    return wrapper;
}

function createNestedManageItem(item, parent, parentKey, index, level) {
    const wrapper = createElement("div", "nested-control");
    const row = createManageRow({
        label: getNamedText(item),
        icon: "•",
        checked: isVisible(item),
        level,
        onChange: value => {
            item.show = value;
            if (!value) hideNestedObject(item);
            saveSettings(); renderCategories(); renderManagePanel();
        }
    });
    wrapper.appendChild(row);
    NESTED_ARRAY_KEYS.forEach(key => {
        const array = item[key];
        if (!Array.isArray(array) || !array.length) return;
        const group = createElement("div", "tree-children");
        const groupTitle = createElement("div", "tree-group-title");
        groupTitle.innerHTML = `<span>${escapeHTML(getKeyLabel(key))}</span>`;
        group.appendChild(groupTitle);
        array.forEach((child, childIndex) => {
            group.appendChild(createNestedManageItem(child, item, key, childIndex, level + 1));
        });
        wrapper.appendChild(group);
    });
    return wrapper;
}

function createManageRow({ label, icon, checked, level = 0, onChange }) {
    const row = createElement("div", "tree-row");
    row.style.paddingLeft = `${12 + (level * 16)}px`;
    const labelBox = createElement("div", "tree-label");
    labelBox.innerHTML = `<span>${icon || "•"}</span><span>${escapeHTML(label)}</span>`;
    const toggle = createElement("label", "toggle");
    const input = createElement("input");
    input.type = "checkbox"; input.checked = checked;
    const slider = createElement("span", "slider");
    input.addEventListener("change", () => { onChange(input.checked); });
    toggle.appendChild(input); toggle.appendChild(slider);
    row.appendChild(labelBox); row.appendChild(toggle);
    return row;
}

function createBrandSection() {
    const wrapper = createElement("div", "tree-category");
    const header = createElement("div", "tree-row");
    header.innerHTML = `<div class="tree-label"><span>🏷️</span><strong>${getLanguage() === "hi" ? "ब्रांड" : "Brands"}</strong></div>`;
    wrapper.appendChild(header);
    const children = createElement("div", "tree-children");
    getBrands().forEach(brand => {
        const row = createManageRow({
            label: getNamedText(brand),
            icon: "🏷️",
            checked: isVisible(brand),
            level: 1,
            onChange: value => { brand.show = value; saveSettings(); renderManagePanel(); }
        });
        children.appendChild(row);
    });
    wrapper.appendChild(children);
    return wrapper;
}

function handleSearch(value) { ESTIMATE_APP.searchQuery = String(value || ""); renderCategories(); }

function initializeSearch() {
    const input = $("searchInput");
    if (input) input.addEventListener("input", event => { handleSearch(event.target.value); });
}

function initializeButtons() {
    if ($("manageBtn")) $("manageBtn").addEventListener("click", openManagePanel);
    if ($("closeManageBtn")) $("closeManageBtn").addEventListener("click", closeManagePanel);
    if ($("languageBtn")) $("languageBtn").addEventListener("click", () => { setLanguage(getLanguage() === "en" ? "hi" : "en"); });
    if ($("showAllBtn")) $("showAllBtn").addEventListener("click", showEverything);
    if ($("hideAllBtn")) $("hideAllBtn").addEventListener("click", hideEverything);
    if ($("resetBtn")) $("resetBtn").addEventListener("click", resetEverything);
}

function initializeBackButton() {
    window.addEventListener("popstate", () => { if (ESTIMATE_APP.manageOpen) closeManagePanel(); });
}

function initializeKeyboard() {
    document.addEventListener("keydown", event => { if (event.key === "Escape" && ESTIMATE_APP.manageOpen) closeManagePanel(); });
}

function renderApplication() {
    updateLanguageButton();
    renderCategories();
    if (ESTIMATE_APP.manageOpen) renderManagePanel();
}

function escapeHTML(value) {
    return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function initializeEstimateApp() {
    if (ESTIMATE_APP.initialized) return;
    loadSettings();
    ESTIMATE_APP.language = localStorage.getItem("sandeep_estimate_language") || window.ESTIMATE_LIST_CONFIG?.languageDefault || "en";
    initializeSearch(); initializeButtons(); initializeBackButton(); initializeKeyboard();
    renderApplication();
    ESTIMATE_APP.initialized = true;
}

if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", initializeEstimateApp); } 
else { initializeEstimateApp(); }
