if (!window.send) {
    window.send = (name, payload) => {
        document.dispatchEvent(new CustomEvent(name, {
            detail: payload,
            bubbles: true
        }))
    }
}

if (!window.getNavigationHash) {
    window.getNavigationHash = () => {
        return window.location.hash.substr(1)
    }
}

if (!window.setLanguage) {
    window.setLanguage = (lang) => {
        localStorage.setItem('language', lang);
    }
}

if (!window.getLanguage) {
    window.getLanguage = () => {
        let lang = localStorage.getItem('language');
        if (!lang) {
            lang = navigator.language || navigator.userLanguage;
            lang = lang.substring(0, 2);
            if (lang !== 'de' && lang !== 'fr' && lang !== 'it') {
                lang = 'de';
            }
        }
        return lang;
    }
}
