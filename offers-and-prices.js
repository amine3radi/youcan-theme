document.addEventListener('DOMContentLoaded', function() {
    // A delay to ensure all product information is loaded by the theme
    setTimeout(function() {
        // --- PART 1: ADD BADGES (No changes needed here) ---
        const offerLabels = document.querySelectorAll('.textual-button label');
        if (offerLabels.length > 1) {
            offerLabels[1].classList.add('best-offer');
        }
        if (offerLabels.length > 2) {
            offerLabels[2].classList.add('best-value');
        }

        // --- PART 2: ADD PRICES (CORRECTED VERSION) ---

        // Get currency from the page using a more specific selector
        const currencyElement = document.querySelector('.single-price .after .currency');
        const currency = currencyElement ? currencyElement.textContent.trim() : 'ريال سعودي';
        
        const variantInputs = document.querySelectorAll('.single-variant [type=radio]');
        let originallySelected = document.querySelector('.single-variant [type=radio]:checked') || (variantInputs.length > 0 ? variantInputs[0] : null);
        
        let variantPrices = [];
        let currentIndex = 0;
        
        function getPriceForVariant(input, index) {
            if (!input) return; // Stop if there's no input
            
            input.checked = true;
            input.dispatchEvent(new Event('change', { bubbles: true }));
            
            // Wait for the theme to update the price in the DOM
            setTimeout(function() {
                // --- THIS IS THE CRITICAL FIX ---
                // Use the specific ".after .value" selector for the current price
                const currentPriceNode = document.querySelector('.single-price .after .value');
                const currentPrice = currentPriceNode ? currentPriceNode.textContent.trim() : '';

                // The selector for the "before" price was already correct
                const beforePriceNode = document.querySelector('.single-price .before .value');
                const beforePrice = beforePriceNode ? beforePriceNode.textContent.trim() : '';
                
                variantPrices[index] = { current: currentPrice, before: beforePrice };
                
                console.log(`Variant ${index + 1}: Current=${currentPrice}, Before=${beforePrice}`);
                
                currentIndex++;
                
                if (currentIndex < variantInputs.length) {
                    getPriceForVariant(variantInputs[currentIndex], currentIndex);
                } else {
                    addPricesToLabels();
                    
                    // Restore the original selection
                    setTimeout(function() {
                        if (originallySelected) {
                            originallySelected.checked = true;
                            originallySelected.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    }, 200);
                }
            }, 500); // Using a slightly safer 500ms delay
        }
        
        function addPricesToLabels() {
            variantInputs.forEach(function(input, index) {
                const label = document.querySelector(`label[for="${input.id}"]`);
                const priceData = variantPrices[index];
                
                if (label && priceData && priceData.current && !label.querySelector('.offer-price-container')) {
                    const priceContainer = document.createElement('div');
                    priceContainer.className = 'offer-price-container';
                    
                    let priceHTML = `<span class="current-price">${priceData.current} ${currency}</span>`;
                    
                    if (priceData.before) {
                        priceHTML += `<span class="before-price">${priceData.before} ${currency}</span>`;
                    }
                    
                    priceContainer.innerHTML = priceHTML;
                    label.appendChild(priceContainer);
                }
            });
        }
        
        if (variantInputs.length > 0) {
            getPriceForVariant(variantInputs[0], 0);
        }

    }, 1000); // Initial delay before starting
});
