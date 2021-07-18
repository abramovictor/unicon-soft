let isShown = false;

const initializeSidebar = params => {
  const { toggler, sidebar, header } = params;
  const { lock: lockBodyScroll, unlock: unlockBodyScroll } = createBodyScrollManager();

  const open = () => {
    header.classList.add('overlay');
    sidebar.classList.add('sidebar--show', 'sidebar--open');

    lockBodyScroll();

    window.setTimeout(() => {
      header.classList.add('overlay--show');
      isShown = true;
    }, 0);
  };

  const close = () => {
    sidebar.classList.remove('sidebar--open');
    header.classList.remove('overlay--show');

    addOnceEventListener(header, 'transitionend', () => {
      header.classList.remove('overlay');
    });

    addOnceEventListener(sidebar, 'transitionend', () => {
      sidebar.classList.remove('sidebar--show');
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

  if (toggler && sidebar && header) {
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
  const sidebar = document.querySelector('#header-sidebar');
  const header = document.querySelector('#header');

  initializeSidebar({ toggler, sidebar, header });
};

window.addEventListener('load', handleWindowLoad);
