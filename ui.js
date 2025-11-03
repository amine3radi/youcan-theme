// ui.js - small UI helpers: bundle heading and phone input
document.addEventListener('DOMContentLoaded', function() {
  // bundle heading
  const optionContainers = document.querySelectorAll('.single-variants');
  optionContainers.forEach(container => {
    if (container.querySelector('.textual-buttons-container')) {
      const heading = container.querySelector('.option-name');
      if (heading) heading.classList.add('bundle-heading');
    }
  });

  // phone input
  const phone = document.querySelector('input[name="phone"]');
  if (phone) {
    phone.setAttribute('type', 'tel');
    phone.setAttribute('inputmode', 'decimal');
  }
});
