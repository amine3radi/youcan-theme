document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        // --- PART 1: ADD BADGES ---
        const offerLabels = document.querySelectorAll('.textual-button label');

        if (offerLabels.length > 1) {
            offerLabels[1].classList.add('best-offer');
        }

        if (offerLabels.length > 2) {
            offerLabels[2].classList.add('best-value');
        }

        // --- PART 2: ADD PRICES (INSTANT METHOD) ---

        

// Get currency from the page

    const currency = document.querySelector('.single-product .single-price .currency')?.textContent || 'ریال سعودی';

    

    // Get all variant radio inputs

    const variantInputs = document.querySelectorAll('.single-variant [type=radio]');

    

    // Remember which one was originally selected

    let originallySelected = document.querySelector('.single-variant [type=radio]:checked');

    if (!originallySelected && variantInputs.length > 0) {

        originallySelected = variantInputs[0];

    }

    

    // Store prices for each variant

    let variantPrices = [];

    let currentIndex = 0;

    

    // Function to get price for a variant (with better timing)

    function getPriceForVariant(input, index) {

        // Select this variant

        input.checked = true;

        input.dispatchEvent(new Event('change', { bubbles: true }));

        

        // Wait longer for price to update (increased from 150ms to 400ms)

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

        }, 400); // Increased delay to ensure price updates

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

            }

        });

    }

    

    // Start processing from the first variant

    if (variantInputs.length > 0) {

        getPriceForVariant(variantInputs[0], 0);

    }

}, 1000); // Increased initial delay
});

    }, 800);
  });
})();
