(() => {
  let isShown = false;

  const initializeSidebar = params => {
    const { toggler, sidebar, overlay } = params;
    const { lock: lockBodyScroll, unlock: unlockBodyScroll } = createBodyScrollManager();

    let openTimeoutId;
    const open = () => {
      sidebar.classList.add('sidebar--show');
      overlay.classList.add('overlay--show');
      lockBodyScroll();

      if (openTimeoutId) {
        clearTimeout(openTimeoutId);
      }

      openTimeoutId = setTimeout(() => {
        overlay.classList.add('overlay--visible');
        sidebar.classList.add('sidebar--visible');
        isShown = true;
      }, 0);
    };

    let closeTimeoutId;
    const close = () => {
      sidebar.classList.remove('sidebar--visible');
      overlay.classList.remove('overlay--visible');

      if (closeTimeoutId) {
        clearTimeout(closeTimeoutId);
      }

      closeTimeoutId = setTimeout(() => {
        overlay.classList.remove('overlay--show');
        sidebar.classList.remove('sidebar--show');
        isShown = false;
      }, 250);

      unlockBodyScroll();
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
})();
