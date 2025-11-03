// ===========================================
// OFFERS AND PRICES HANDLER
// Adds prices to each offer box dynamically
// ===========================================

(function() {
    'use strict';
    
    // Wait for page to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        // Wait a bit longer to ensure all elements are loaded
        setTimeout(addPricesToOffers, 1000);
    }
    
    function addPricesToOffers() {
        console.log('🔄 Starting to add prices to offers...');
        
        // Get currency from the page
        const currency = document.querySelector('.single-product .single-price .currency')?.textContent || 'ریال سعودی';
        
        // Get all variant radio inputs
        const variantInputs = document.querySelectorAll('.single-variant [type=radio]');
        
        if (variantInputs.length === 0) {
            console.log('❌ No variant inputs found');
            return;
        }
        
        console.log(`✅ Found ${variantInputs.length} variants`);
        
        // Remember which one was originally selected
        let originallySelected = document.querySelector('.single-variant [type=radio]:checked');
        if (!originallySelected && variantInputs.length > 0) {
            originallySelected = variantInputs[0];
        }
        
        // Store prices for each variant
        let variantPrices = [];
        let currentIndex = 0;
        
        // Function to get price for a variant
        function getPriceForVariant(input, index) {
            // Select this variant
            input.checked = true;
            input.dispatchEvent(new Event('change', { bubbles: true }));
            
            // Wait for price to update
            setTimeout(function() {
                // Get the current displayed price
                const currentPrice = document.querySelector('.single-product .single-price .value')?.textContent || '';
                const beforePrice = document.querySelector('.single-product .before.currency-value .value')?.textContent || '';
                
                // Store the price data
                variantPrices[index] = {
                    current: currentPrice,
                    before: beforePrice
                };
                
                console.log(`Variant ${index + 1}: Current=${currentPrice}, Before=${beforePrice}`);
                
                currentIndex++;
                
                // Process next variant or finish
                if (currentIndex < variantInputs.length) {
                    getPriceForVariant(variantInputs[currentIndex], currentIndex);
                } else {
                    // All variants processed, add prices to labels
                    addPricesToLabels();
                    
                    // Restore original selection
                    setTimeout(function() {
                        if (originallySelected) {
                            originallySelected.checked = true;
                            originallySelected.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    }, 200);
                }
            }, 400);
        }
        
        // Function to add prices to all labels at once
        function addPricesToLabels() {
            variantInputs.forEach(function(input, index) {
                const label = document.querySelector(`label[for="${input.id}"]`);
                
                if (label && !label.querySelector('.offer-price-container') && variantPrices[index]) {
                    const priceContainer = document.createElement('div');
                    priceContainer.className = 'offer-price-container';
                    
                    const currentPriceEl = document.createElement('span');
                    currentPriceEl.className = 'current-price';
                    currentPriceEl.innerHTML = `${variantPrices[index].current} ${currency}`;
                    priceContainer.appendChild(currentPriceEl);
                    
                    if (variantPrices[index].before) {
                        const beforePriceEl = document.createElement('span');
                        beforePriceEl.className = 'before-price';
                        beforePriceEl.innerHTML = `${variantPrices[index].before} ${currency}`;
                        priceContainer.appendChild(beforePriceEl);
                    }
                    
                    label.appendChild(priceContainer);
                    console.log(`✅ Added price to variant ${index + 1}`);
                }
            });
            
            console.log('✅ All prices added successfully');
        }
        
        // Start processing from the first variant
        if (variantInputs.length > 0) {
            getPriceForVariant(variantInputs[0], 0);
        }
    }
})();
