// ===========================================
// BADGES HANDLER
// Adds "Best Offer" and "Best Value" badges to offer boxes
// Also styles bundle headings with lines
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
    }
    
    // Add "Best Offer" badge to 2nd offer, "Best Value" to 3rd offer
    function addBadgesToOffers() {
        const offerLabels = document.querySelectorAll('.textual-button label');
        
        if (offerLabels.length > 1) {
            offerLabels[1].classList.add('best-offer');
            console.log('✅ Added "Best Offer" badge to offer #2');
        }
        
        if (offerLabels.length > 2) {
            offerLabels[2].classList.add('best-value');
            console.log('✅ Added "Best Value" badge to offer #3');
        }
    }
    
    // Style the bundle heading with decorative lines
    function addBundleHeadingStyle() {
        const optionContainers = document.querySelectorAll('.single-variants');
        
        optionContainers.forEach(container => {
            if (container.querySelector('.textual-buttons-container')) {
                const heading = container.querySelector('.option-name');
                if (heading) {
                    heading.classList.add('bundle-heading');
                    console.log('✅ Added bundle heading style');
                }
            }
        });
    }
})();
