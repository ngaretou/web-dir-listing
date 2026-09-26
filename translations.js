/**
 * Multi-lingual translations dictionary for res.sng.al directory theme.
 * To add a new language, simply add a new key (e.g. es, de, it) with its _name.
 * The language dropdown will automatically populate all available languages!
 * Unicode escape sequences are used for accented characters to prevent
 * character-encoding mismatches across different server headers.
 */
var rootScope = (typeof window !== "undefined") ? window : (typeof global !== "undefined" ? global : this);

rootScope.DIR_TRANSLATIONS = {
    en: {
        _name: "English",
        pageTitle: "Resources",
        home: "Home",
        searchPlaceholder: "Filter files...",
        loading: "Loading resources...",
        noFiles: "No files found in this directory.",
        folderBadge: "Folder",
        parentDir: "Parent Directory",
        upBadge: "Up",
        download: "Download",
        footerText: "\u00A9 2026 \u2014 Foundational LLC \u2014 res.sng.al"
    },
    fr: {
        _name: "Fran\u00E7ais",
        pageTitle: "Ressources",
        home: "Accueil",
        searchPlaceholder: "Filtrer les fichiers...",
        loading: "Chargement des ressources...",
        noFiles: "Aucun fichier trouv\u00E9 dans ce dossier.",
        folderBadge: "Dossier",
        parentDir: "Dossier parent",
        upBadge: "Retour",
        download: "T\u00E9l\u00E9charger",
        footerText: "\u00A9 2026 \u2014 Foundational LLC \u2014 res.sng.al"
    }
};

/**
 * Get active language code.
 * Priority: 1. saved in localStorage, 2. browser language (navigator.language), 3. fallback 'en'
 */
rootScope.getDirectoryLanguage = function() {
    var saved = null;
    try {
        if (typeof localStorage !== "undefined" && localStorage && typeof localStorage.getItem === "function") {
            saved = localStorage.getItem("lang");
        }
    } catch (e) {}

    if (saved && rootScope.DIR_TRANSLATIONS[saved]) {
        return saved;
    }
    var navLang = (typeof navigator !== "undefined" && (navigator.language || navigator.userLanguage) || "en").substring(0, 2).toLowerCase();
    if (rootScope.DIR_TRANSLATIONS[navLang]) {
        return navLang;
    }
    return "en";
};

/**
 * Directory listing configuration.
 * - DIR_SUBFOLDER: Subfolder path (e.g. "/downloads" or "/tools/resources").
 *                  Leave as empty string "" if running at domain root (e.g. https://res.sng.al/).
 */
rootScope.DIR_SUBFOLDER = "";

rootScope.DIR_CONFIG = {
    subfolder: (typeof rootScope.DIR_SUBFOLDER === "string") ? rootScope.DIR_SUBFOLDER : ""
};

/**
 * Helper to get normalized base path (leading slash, no trailing slash, or empty string for root).
 */
rootScope.getDirectoryBase = function() {
    var sub = rootScope.DIR_SUBFOLDER || (rootScope.DIR_CONFIG && rootScope.DIR_CONFIG.subfolder) || "";
    if (typeof sub === "string" && sub !== "") {
        if (sub === "/") return "";
        return (sub.charAt(0) !== "/" ? "/" + sub : sub).replace(/\/+$/, "");
    }
    return (typeof window !== "undefined" && window.DIR_AUTO_BASE) || "";
};

