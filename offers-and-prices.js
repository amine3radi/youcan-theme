// ===========================================
// OFFERS, BADGES & PRICES HANDLER
// Adds badges to offers and displays prices
// ===========================================

(function() {
    'use strict';
    
    // Wait for page to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        addBadgesToOffers();
        addBundleHeadingStyle();
        // Note: Prices are handled by offers.js from GitHub
    }
    
    // Add "Best Offer" and "Best Value" badges
    function addBadgesToOffers() {
        const offerLabels = document.querySelectorAll('.textual-button label');
        
        if (offerLabels.length > 1) {
            offerLabels[1].classList.add('best-offer');
        }
        
        if (offerLabels.length > 2) {
            offerLabels[2].classList.add('best-value');
        }
    }
    
    // Style the bundle heading with lines
    function addBundleHeadingStyle() {
        const optionContainers = document.querySelectorAll('.single-variants');
        
        optionContainers.forEach(container => {
            if (container.querySelector('.textual-buttons-container')) {
                const heading = container.querySelector('.option-name');
                if (heading) {
                    heading.classList.add('bundle-heading');
                }
            }
        });
    }
})();
