// ===========================================
// CHECKOUT FORM MODIFICATIONS
// Fixes phone input keyboard
// ===========================================

(function() {
    'use strict';
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        fixPhoneInputKeyboard();
    }
    
    function fixPhoneInputKeyboard() {
        const phoneInput = document.querySelector('input[name="phone"]');
        
        if (phoneInput) {
            phoneInput.setAttribute('type', 'tel');
            phoneInput.setAttribute('inputmode', 'decimal');
        }
    }
})();
