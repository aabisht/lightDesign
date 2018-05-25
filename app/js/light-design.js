(function(window) {
    if (window.Package) {
        LD = {};
    } else {
        window.LD = {};
    }

    // Check for jQuery
    LD.jQueryLoaded = !!window.jQuery;
})(window);

if (typeof define === 'function' && define.amd) {
    define('LD', [], function() {
        return LD;
    });

    // Common JS
    } else if (typeof exports !== 'undefined' && !exports.nodeType) {
    if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
        exports = module.exports = LD;
    }
    exports.default = LD;
}