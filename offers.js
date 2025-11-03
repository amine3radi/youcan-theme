// offers.js - add offer badges and attach prices to labels
(function(){
  function addOfferBadges() {
    const offerLabels = document.querySelectorAll('.textual-button label');
    if (offerLabels.length > 1) offerLabels[1].classList.add('best-offer');
    if (offerLabels.length > 2) offerLabels[2].classList.add('best-value');
  }

  // Price extraction (keeps your original logic, simplified)
  function attachPricesToVariants() {
    const currency = document.querySelector('.single-product .single-price .currency')?.textContent || '';
    const variantInputs = document.querySelectorAll('.single-variant [type=radio]');
    let index = 0;
    let prices = [];

    function getPrice(input, idx, done) {
      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      setTimeout(function() {
        const current = document.querySelector('.single-product .single-price .value')?.textContent || '';
        const before = document.querySelector('.single-product .before.currency-value .value')?.textContent || '';
        prices[idx] = { current: current, before: before };
        done();
      }, 400);
    }

    function runAll(i) {
      if (i >= variantInputs.length) {
        // add prices to labels
        variantInputs.forEach(function(input, j) {
          const label = document.querySelector(`label[for="${input.id}"]`);
          if (label && prices[j]) {
            const container = document.createElement('div'); container.className = 'offer-price-container';
            const cur = document.createElement('span'); cur.className='current-price'; cur.innerHTML = prices[j].current + ' ' + currency;
            container.appendChild(cur);
            if (prices[j].before) { const bef = document.createElement('span'); bef.className='before-price'; bef.innerHTML = prices[j].before + ' ' + currency; container.appendChild(bef); }
            label.appendChild(container);
          }
        });
        return;
      }
      getPrice(variantInputs[i], i, function() { runAll(i+1); });
    }

    if (variantInputs.length > 0) runAll(0);
  }

  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(function(){
      addOfferBadges();
      attachPricesToVariants();
    }, 800);
  });
})();
