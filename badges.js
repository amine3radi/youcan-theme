document.addEventListener('DOMContentLoaded', function() {
    // A short delay to ensure the 'Add to Cart' button is on the page
    setTimeout(function() {
        
        // Find the main "Buy" button section
        const addToCartSection = document.querySelector('.add-to-cart-section');
        
        // Only run the code if we find the button and haven't already added the badges
        if (addToCartSection && !document.getElementById('trust-badges-container')) {
            
            // --- 1. Define Your Badges Here ---
            // You can find more icons online, just copy and paste their image URLs here.
            const badgeImages = [
                // Visa
                'https://raw.githubusercontent.com/amine3radi/card-badges-cod/70225cac4926414edb57c995873b61d5a2956756/payment.svg',
                // Mastercard
                'https://raw.githubusercontent.com/amine3radi/card-badges-cod/c4947426cfb41cbfc86091a9615e136b894d0dd4/return%20product.svg',
                // Mada (for Saudi Arabia)
                'https://www.svgrepo.com/show/352446/shipping-fast.svg',
                // Apple Pay
                'https://raw.githubusercontent.com/amine3radi/card-badges-cod/ccce0c0f04f9692926a932d3e3a75f64c35eb19e/cash-on-delivery.svg'
            ];
            
            // --- 2. Build the HTML for the badges ---
            const newBadgesContainer = document.createElement('div');
            newBadgesContainer.id = 'trust-badges-container';
            
            let badgesHTML = '';
            badgeImages.forEach(url => {
                badgesHTML += `<img src="${url}" alt="Payment Method">`;
            });
            
            newBadgesContainer.innerHTML = badgesHTML;
            
            // --- 3. Insert the new badges container right before the 'Buy' button section ---
            addToCartSection.parentNode.insertBefore(newBadgesContainer, addToCartSection.nextSibling);
        }
        
    }, 100); // A safe 500ms delay
});
