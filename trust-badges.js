// ===========================================
// TRUST BADGES & PAYMENT ICONS
// Adds payment/security badges above buy button
// ===========================================

(function() {
    'use strict';
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        setTimeout(addTrustBadges, 100);
    }
    
    function addTrustBadges() {
        const addToCartSection = document.querySelector('.add-to-cart-section');
        
        if (addToCartSection && !document.getElementById('trust-badges-container')) {
            const badgeImages = [
                'https://raw.githubusercontent.com/amine3radi/card-badges-cod/70225cac4926414edb57c995873b61d5a2956756/payment.svg',
                'https://raw.githubusercontent.com/amine3radi/card-badges-cod/c4947426cfb41cbfc86091a9615e136b894d0dd4/return%20product.svg',
                'https://www.svgrepo.com/show/352446/shipping-fast.svg',
                'https://raw.githubusercontent.com/amine3radi/card-badges-cod/ccce0c0f04f9692926a932d3e3a75f64c35eb19e/cash-on-delivery.svg'
            ];
            
            const container = document.createElement('div');
            container.id = 'trust-badges-container';
            
            badgeImages.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                img.alt = 'Payment Method';
                container.appendChild(img);
            });
            
            addToCartSection.parentNode.insertBefore(container, addToCartSection.nextSibling);
        }
    }
})();
