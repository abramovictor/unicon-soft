let isShown = false;

const initializeSidebar = params => {
  const { toggler, sidebar, overlay } = params;
  const { lock: lockBodyScroll, unlock: unlockBodyScroll } = createBodyScrollManager();

  const open = () => {
    sidebar.classList.add('sidebar--show', 'sidebar--visible');
    overlay.classList.add('overlay--show');
    lockBodyScroll();

    window.setTimeout(() => {
      overlay.classList.add('overlay--visible');
      isShown = true;
    }, 0);
  };

  const close = () => {
    sidebar.classList.remove('sidebar--show');
    overlay.classList.remove('overlay--show');

    addOnceEventListener(overlay, 'transitionend', () => {
      overlay.classList.remove('overlay--visible');
    });

    addOnceEventListener(sidebar, 'transitionend', () => {
      sidebar.classList.remove('sidebar--visible');
    });

    unlockBodyScroll();

    window.setTimeout(() => {
      isShown = false;
    }, 0);
  };

  const handleTogglerClick = () => {
    if (!isShown) {
      open();
    } else {
      close();
    }
  }

  if (toggler && sidebar && overlay) {
    toggler.addEventListener('click', handleTogglerClick);
  }

  const handleDocumentClick = event => {
    const { target } = event;

    if (isShown && target !== sidebar && !sidebar.contains(target)) {
      close();
    }
  }

  document.documentElement.addEventListener('click', handleDocumentClick);
}

const handleWindowLoad = () => {
  const toggler = document.querySelector('#sidebar-toggler');
  const sidebar = document.querySelector('#sidebar');
  const overlay = document.querySelector('#overlay');

  initializeSidebar({ toggler, sidebar, overlay });
};

window.addEventListener('load', handleWindowLoad);
