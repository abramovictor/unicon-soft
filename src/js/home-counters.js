(() => {
  const countersSection = document.querySelectorAll('[data-reveal]');
  const countersElements = document.querySelectorAll('[data-counter-value]');

  const initializeCounters = element => {
    if (element.getAttribute('data-animation') === 'countup') {
      countersElements.forEach(counterElement => {
        const counterEndValue = counterElement.getAttribute('data-counter-value');
        const countUpObject = new countUp.CountUp(counterElement, counterEndValue, { separator: ' ' });

        if (!countUpObject.error) {
          countUpObject.start();
        } else {
          console.error(countUpObject.error);
        }
      });
    }
  };

  ScrollReveal().reveal(countersSection, {
    viewFactor: 0.25,
    afterReveal: initializeCounters,
    distance: '100px',
    scale: 0.9,
    duration: 800,
  });
})();
