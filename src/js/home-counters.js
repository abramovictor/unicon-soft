(() => {
  const countersSection = document.querySelector('#performance-in-numbers');
  const countersElements = countersSection.querySelectorAll('[data-counter-value]');

  const initializeCounters = () => {
    countersElements.forEach(counterElement => {
      const counterEndValue = counterElement.getAttribute('data-counter-value');
      const countUpObject = new countUp.CountUp(counterElement, counterEndValue, { separator: ' ' });

      if (!countUpObject.error) {
        countUpObject.start();
      } else {
        console.error(countUpObject.error);
      }
    });
  };

  ScrollReveal().reveal(countersSection, {
    viewFactor: 0.7,
    afterReveal: initializeCounters,
  });
})();
