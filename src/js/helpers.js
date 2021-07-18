const createBodyScrollManager = () => {
  const {
    overflow: initialOverflow,
    paddingRight: initialPaddingRight,
  } = document.body.style;

  const scrollbarWidth = window.innerWidth - document.body.clientWidth;

  return {
    lock: () => {
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = scrollbarWidth + 'px';
      }
    },
    unlock: () => {
      document.body.style.overflow = initialOverflow;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = initialPaddingRight;
      }
    }
  }
};


const addOnceEventListener = (object, type, handler) => {
  object.addEventListener(type, function once(event) {
    handler.call(object, event);

    object.removeEventListener(type, once);
  });
};
