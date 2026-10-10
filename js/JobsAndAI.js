class JobsAndAI {
  async run(env) {
    if (!env || !env.container) {
      throw new Error("run() requires an environment object with a valid container.");
    }
    this.env = env;
    this.targetElement = env.container;

    this.activeVideoPlayers = [];
    this.initializeTheme();
    this.loadGoogleFont();
    this.setupState();
    this.loadAppStyles();
    this.setupKeyboardListeners();
    this.handleRoute();

    window.addEventListener('hashchange', () => this.handleRoute());
  }

  destroy() {
    this.cleanupActiveVideos();
    if (this._currentKeydownHandler) {
      window.removeEventListener('keydown', this._currentKeydownHandler);
    }
    const viewer = document.getElementById('screen-image-viewer');
    if (viewer) viewer.remove();
  }

  cleanupActiveVideos() {
    if (this.activeVideoPlayers && this.activeVideoPlayers.length) {
      this.activeVideoPlayers.forEach(p => {
        try { p.destroy(); } catch (e) {}
      });
      this.activeVideoPlayers = [];
    }
  }

  setupState() {
    this.motionValue = parseFloat(localStorage.getItem('jobs-ai-motion-val') || '1.0');
    this.currentTheme = localStorage.getItem('jobs-ai-theme') || 'dark';
    this.currentRoute = 'graphics-video';
  }

  handleRoute() {
    this.cleanupActiveVideos();
    const hash = window.location.hash || '';
    if (hash === '#/thesis' || hash === '#/overview') {
      this.currentRoute = 'thesis';
    } else if (hash === '#/code-reasoning') {
      this.currentRoute = 'code-reasoning';
    } else if (hash === '#/robotics') {
      this.currentRoute = 'robotics';
    } else {
      this.currentRoute = 'graphics-video';
    }
    this.renderApp();
  }

  renderApp() {
    this.targetElement.innerHTML = "";
    
    const themeClass = this.currentTheme === "light" 
      ? "cad-container cad-grid-bg theme-light" 
      : "cad-container cad-grid-bg";
    
    const appContainer = makeElement("div", { className: themeClass });
    appContainer.style.setProperty("--motion-scale", String(this.motionValue));

    const innerWrapper = makeElement("div", { className: "cad-wrapper" });
    innerWrapper.appendChild(this.buildHeader());

    if (this.currentRoute === 'thesis') {
      const page = new ThesisPage();
      innerWrapper.appendChild(page.render(this));
    } else if (this.currentRoute === 'code-reasoning') {
      innerWrapper.appendChild(this.buildPlaceholderPage(
        'Code & Autonomous Software Loops',
        'Analysis of recursive programming systems, AST parsing, and why software engineering is ground zero for universal substitution.'
      ));
    } else if (this.currentRoute === 'robotics') {
      innerWrapper.appendChild(this.buildPlaceholderPage(
        'Physical Embodiment & Foundation Robotics',
        'Vision-Language-Action (VLA) foundation models, Sim-to-Real dexterity transfer, and why the physical manual trades will not remain safe.'
      ));
    } else {
      const page = new GraphicsVideoPage();
      innerWrapper.appendChild(page.render(this));
    }

    innerWrapper.appendChild(this.buildFooter());
    appContainer.appendChild(innerWrapper);
    this.targetElement.appendChild(appContainer);
  }

  buildHeader() {
    const controlsGroup = makeElement('div', {
      className: 'header-controls-group'
    }, [
      this.buildThemeToggle(),
      this.buildMotionSlider(),
      makeElement('button', {
        className: 'deploy-nav-btn',
        onclick: (e) => this.triggerGitHubDeploy(e.currentTarget)
      }, '🚀 Deploy')
    ]);

    const navTabs = makeElement('nav', { className: 'app-nav-bar' }, [
      makeElement('a', {
        href: '#/graphics-video',
        className: 'nav-tab-link ' + (this.currentRoute === 'graphics-video' ? 'active' : ''),
        onclick: (e) => { e.preventDefault(); window.location.hash = '#/graphics-video'; }
      }, '🎨 Graphics, Diffusion & Video'),
      makeElement('a', {
        href: '#/thesis',
        className: 'nav-tab-link ' + (this.currentRoute === 'thesis' ? 'active' : ''),
        onclick: (e) => { e.preventDefault(); window.location.hash = '#/thesis'; }
      }, '🧠 The Automation Thesis'),
      makeElement('a', {
        href: '#/code-reasoning',
        className: 'nav-tab-link ' + (this.currentRoute === 'code-reasoning' ? 'active' : ''),
        onclick: (e) => { e.preventDefault(); window.location.hash = '#/code-reasoning'; }
      }, '💻 Autonomous Code Loops'),
      makeElement('a', {
        href: '#/robotics',
        className: 'nav-tab-link ' + (this.currentRoute === 'robotics' ? 'active' : ''),
        onclick: (e) => { e.preventDefault(); window.location.hash = '#/robotics'; }
      }, '🤖 Foundation Robotics')
    ]);

    return makeElement('header', { className: 'minimal-header' }, [
      makeElement('div', { className: 'header-top' }, [
        makeElement('div', { className: 'tags-wrapper' }, [
          makeElement('span', { className: 'tag-pill tag-pill-blue' }, 'The Automation Horizon'),
          makeElement('span', { className: 'tag-pill tag-pill-purple' }, 'Visual Intelligence & Labor'),
          makeElement('span', { className: 'tag-pill tag-pill-slate' }, 'Rob Brown')
        ]),
        controlsGroup
      ]),
      
      makeElement('div', { className: 'title-group' }, [
        makeElement('h1', {}, 'The Automation Horizon'),
        makeElement('p', { className: 'title-subtitle' }, 
          'How generative graphics, spatial models, autonomous code, and physical robotics replace all human jobs'
        )
      ]),

      navTabs
    ]);
  }

  buildPlaceholderPage(title, desc) {
    return makeElement('div', { className: 'cad-panel space-y-4' }, [
      makeElement('h2', { className: 'text-xl font-bold font-mono text-blue-400' }, title),
      makeElement('p', { className: 'text-sm text-[var(--text-secondary)] leading-relaxed' }, desc),
      makeElement('div', {
        className: 'p-4 rounded-lg bg-[var(--bg-panel-inner)] border border-[var(--border-color)] text-xs font-mono text-slate-400'
      }, 'Section actively being expanded. Primary visual and video evidence is accessible on the "Graphics, Diffusion & Video" tab.')
    ]);
  }

  buildThemeToggle() {
    return makeElement('div', { className: 'theme-switcher' }, [
      makeElement('button', {
        className: this.currentTheme === 'light' ? 'active' : '',
        onclick: () => this.setTheme('light')
      }, [
        makeElement('span', { innerHTML: '☀️' }),
        makeElement('span', {}, 'Light')
      ]),
      makeElement('button', {
        className: this.currentTheme === 'dark' ? 'active' : '',
        onclick: () => this.setTheme('dark')
      }, [
        makeElement('span', { innerHTML: '🌙' }),
        makeElement('span', {}, 'Dark')
      ])
    ]);
  }

  buildMotionSlider() {
    const slider = makeElement('input', {
      type: 'range',
      min: '0.1',
      max: '2.0',
      step: '0.1',
      value: String(this.motionValue || 1.0),
      className: 'motion-slider',
      title: 'Animation & transition pace',
      oninput: (e) => {
        this.updateMotionValue(parseFloat(e.target.value));
      }
    });

    return makeElement('div', { className: 'motion-slider-row' }, [
      makeElement('span', { className: 'motion-slider-label' }, 'Motion'),
      slider
    ]);
  }

  updateMotionValue(val) {
    this.motionValue = val;
    localStorage.setItem('jobs-ai-motion-val', String(val));
    const container = this.targetElement.querySelector('.cad-container');
    if (container) {
      container.style.setProperty('--motion-scale', String(val));
    }
  }

  setTheme(themeName) {
    this.currentTheme = themeName;
    localStorage.setItem('jobs-ai-theme', themeName);
    const container = this.targetElement.querySelector('.cad-container');
    if (container) {
      if (themeName === 'light') {
        container.classList.add('theme-light');
      } else {
        container.classList.remove('theme-light');
      }
    }
    this.renderApp();
  }

  initializeTheme() {
    document.body.classList.add('js-active');
    this.currentTheme = localStorage.getItem('jobs-ai-theme') || 'dark';
  }

  loadGoogleFont() {
    const fontId = 'GoogleFontInterSpace';
    if (!document.getElementById(fontId)) {
      const link = makeElement('link', {
        id: fontId,
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap'
      });
      document.head.appendChild(link);
    }
  }

  /**
   * Screen-Filling Image Viewer:
   * - No dramatic dark background; clean light outline.
   * - Fills as much of the screen as possible while maintaining aspect ratio.
   * - Click image or zoom button to toggle between full viewport fit and 100% natural resolution (scrollable).
   * - Left/Right arrows and keyboard arrows to cycle through items in an image group.
   */
  openImageViewer(imageGroup = [], initialIndex = 0) {
    const existing = document.getElementById('screen-image-viewer');
    if (existing) existing.remove();

    if (!imageGroup || !imageGroup.length) return;
    let currentIndex = Math.max(0, Math.min(initialIndex, imageGroup.length - 1));
    let isFullNaturalSize = false;

    const overlay = makeElement('div', {
      id: 'screen-image-viewer',
      className: 'screen-image-viewer-overlay',
      onclick: (e) => {
        if (e.target === overlay) closeViewer();
      }
    });

    const closeViewer = () => {
      window.removeEventListener('keydown', handleKeys);
      overlay.remove();
    };

    // Header Controls (Counters, Fit/Full toggle, Arrows, Close)
    const counterBadge = makeElement('span', { className: 'viewer-badge' }, '');
    const titleLabel = makeElement('span', { className: 'viewer-title-label' }, '');
    
    const zoomToggleBtn = makeElement('button', {
      className: 'viewer-control-btn zoom-btn',
      onclick: () => toggleZoom()
    }, '🔍 Fit Screen');

    const prevBtn = makeElement('button', {
      className: 'viewer-arrow-btn prev-btn',
      title: 'Previous Image (Left Arrow)',
      onclick: (e) => { e.stopPropagation(); navigate(-1); }
    }, '‹');

    const nextBtn = makeElement('button', {
      className: 'viewer-arrow-btn next-btn',
      title: 'Next Image (Right Arrow)',
      onclick: (e) => { e.stopPropagation(); navigate(1); }
    }, '›');

    const closeBtn = makeElement('button', {
      className: 'viewer-control-btn close-btn',
      title: 'Close (Esc)',
      onclick: (e) => { e.stopPropagation(); closeViewer(); }
    }, '✕ Close');

    const topBar = makeElement('div', { className: 'viewer-top-bar' }, [
      makeElement('div', { className: 'flex items-center gap-2 overflow-hidden' }, [
        counterBadge,
        titleLabel
      ]),
      makeElement('div', { className: 'flex items-center gap-2 flex-shrink-0' }, [
        zoomToggleBtn,
        closeBtn
      ])
    ]);

    const imageElement = makeElement('img', {
      className: 'viewer-display-image fit-mode',
      title: 'Click image to toggle 100% natural resolution',
      onclick: (e) => {
        e.stopPropagation();
        toggleZoom();
      }
    });

    const captionElement = makeElement('div', { className: 'viewer-caption-bar' });
    const scrollContainer = makeElement('div', { className: 'viewer-scroll-viewport' }, [
      imageElement
    ]);

    const viewerFrame = makeElement('div', { className: 'viewer-frame-box' }, [
      topBar,
      scrollContainer,
      captionElement,
      prevBtn,
      nextBtn
    ]);

    overlay.appendChild(viewerFrame);
    document.body.appendChild(overlay);

    const toggleZoom = () => {
      isFullNaturalSize = !isFullNaturalSize;
      if (isFullNaturalSize) {
        imageElement.classList.remove('fit-mode');
        imageElement.classList.add('natural-mode');
        zoomToggleBtn.textContent = '🔎 100% Natural Size (Click to Fit)';
        zoomToggleBtn.classList.add('active');
        scrollContainer.classList.add('can-scroll');
      } else {
        imageElement.classList.remove('natural-mode');
        imageElement.classList.add('fit-mode');
        zoomToggleBtn.textContent = '🔍 Fit Screen (Click to 100%)';
        zoomToggleBtn.classList.remove('active');
        scrollContainer.classList.remove('can-scroll');
        scrollContainer.scrollTop = 0;
        scrollContainer.scrollLeft = 0;
      }
    };

    const updateDisplay = () => {
      const item = imageGroup[currentIndex];
      if (!item) return;

      imageElement.src = item.src;
      imageElement.alt = item.title || 'Exhibit';
      titleLabel.textContent = item.title || '';
      captionElement.textContent = item.caption || '';
      captionElement.style.display = item.caption ? 'block' : 'none';

      if (imageGroup.length > 1) {
        counterBadge.textContent = `${currentIndex + 1} of ${imageGroup.length}`;
        counterBadge.style.display = 'inline-block';
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
      } else {
        counterBadge.style.display = 'none';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      }

      // Reset scroll
      scrollContainer.scrollTop = 0;
      scrollContainer.scrollLeft = 0;
    };

    const navigate = (dir) => {
      currentIndex = (currentIndex + dir + imageGroup.length) % imageGroup.length;
      updateDisplay();
    };

    const handleKeys = (e) => {
      if (e.key === 'Escape') {
        closeViewer();
      } else if (e.key === 'ArrowLeft') {
        navigate(-1);
      } else if (e.key === 'ArrowRight') {
        navigate(1);
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleZoom();
      }
    };

    window.addEventListener('keydown', handleKeys);
    updateDisplay();
  }

  createInlineVideoPlayer(containerElement, videoId) {
    if (!containerElement || !videoId) return null;
    if (typeof VideoPlayer === 'undefined') {
      containerElement.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${videoId}" 
          style="width:100%;height:100%;border:none;border-radius:8px;" 
          allowfullscreen></iframe>`;
      return null;
    }

    try {
      const player = new VideoPlayer({
        container: containerElement,
        playerType: 'youtube',
        videoId: videoId,
        autoplay: 0,
        controls: 1
      }, (evt) => {
        // Ready or time tracking hook if needed
      });

      this.activeVideoPlayers.push(player);
      return player;
    } catch (e) {
      console.warn('VideoPlayer initialization fallback to iframe:', e);
      containerElement.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${videoId}" 
          style="width:100%;height:100%;border:none;border-radius:8px;" 
          allowfullscreen></iframe>`;
      return null;
    }
  }

  async triggerGitHubDeploy(btnElement) {
    if (btnElement) {
      btnElement.disabled = true;
      btnElement.style.opacity = '0.7';
      btnElement.textContent = '⏳ Deploying...';
    }

    try {
      const res = await fetch('/api/deploy?project=JobsAndAI', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project: 'JobsAndAI',
          commitMsg: 'Update Automation Horizon and AI replacement treatise'
        })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        this.showToastMessage('✨ Deployed successfully to GitHub Pages!\n\n' + (data.output || ''));
      } else {
        const errMsg = (data && (data.error || data.message)) || 'Server error during deployment';
        this.showToastMessage('Deploy error: ' + errMsg);
      }
    } catch (e) {
      this.showToastMessage('Deploy exception: ' + e.message);
    } finally {
      if (btnElement) {
        btnElement.disabled = false;
        btnElement.style.opacity = '1';
        btnElement.textContent = '🚀 Deploy';
      }
    }
  }

  showToastMessage(msg) {
    const existing = document.getElementById('jobs-ai-toast');
    if (existing) existing.remove();

    const toast = makeElement('div', {
      id: 'jobs-ai-toast',
      style: {
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%) translateY(20px)',
        background: '#0f172a',
        border: '1px solid #3b82f6',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '8px',
        zIndex: '100000',
        fontSize: '12px',
        fontFamily: 'ui-monospace, monospace',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
        transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
        opacity: '0',
        pointerEvents: 'none',
        whiteSpace: 'pre-line',
        textAlign: 'center'
      }
    }, msg);

    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  buildFooter() {
    return makeElement('footer', { className: 'dashboard-footer' }, [
      makeElement('div', { className: 'footer-content' }, [
        makeElement(
          'p',
          { className: 'footer-left' },
          'An empirical study on technological acceleration, spatial foundation models, and universal machine substitution.'
        ),
        makeElement(
          'p',
          { className: 'footer-right' },
          'The Automation Horizon • Rob Brown'
        )
      ])
    ]);
  }

  setupKeyboardListeners() {
    if (this._currentKeydownHandler) {
      window.removeEventListener('keydown', this._currentKeydownHandler);
    }
    this._currentKeydownHandler = (e) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
        return;
      }
      if (e.key === 't' || e.key === 'T') {
        const selection = window.getSelection();
        const text = selection ? selection.toString().trim() : '';
        if (text) {
          navigator.clipboard.writeText(text).then(() => {
            this.showToastMessage('Copied selected excerpt:\n' + text.slice(0, 50) + (text.length > 50 ? '...' : ''));
          }).catch(() => {});
        }
      }
    };
    window.addEventListener('keydown', this._currentKeydownHandler);
  }

  loadAppStyles() {
    this.applyCoreResetCSS();
    this.applyCoreLayoutCSS();
    this.applyHeaderCSS();
    this.applyThemeSwitcherCSS();
    this.applyImageViewerCSS();
  }

  applyCoreResetCSS() {
    applyCss(`
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        min-height: 100vh;
        width: 100%;
        background-color: #070a12;
      }
      .cad-container, .cad-container * {
        box-sizing: border-box;
      }
    `, "cad-core-reset-styles");
  }

  applyCoreLayoutCSS() {
    applyCss(`
      .cad-container {
        --bg-primary: #070a12;
        --bg-grid: rgba(255, 255, 255, 0.02);
        --bg-panel: #0c111d;
        --bg-panel-inner: #05070a;
        --text-primary: #cbd5e1;
        --text-secondary: #94a3b8;
        --text-title: #ffffff;
        --border-color: #1e293b;
        --border-hover: #334155;
        --btn-bg: #1e293b;
        --btn-hover: #334155;
        --btn-text: #e2e8f0;
        background-color: var(--bg-primary);
        color: var(--text-primary);
        min-height: 100vh;
        width: 100%;
        padding: 40px 16px;
      }
      .cad-container.theme-light {
        --bg-primary: #f8fafc;
        --bg-grid: rgba(0, 0, 0, 0.03);
        --bg-panel: #ffffff;
        --bg-panel-inner: #f1f5f9;
        --text-primary: #1e293b;
        --text-secondary: #64748b;
        --text-title: #0f172a;
        --border-color: #e2e8f0;
        --border-hover: #cbd5e1;
        --btn-bg: #f1f5f9;
        --btn-hover: #e2e8f0;
        --btn-text: #0f172a;
      }
      .cad-grid-bg {
        background-size: 32px 32px;
        background-image: linear-gradient(to right, var(--bg-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--bg-grid) 1px, transparent 1px);
      }
      .cad-wrapper {
        max-width: 1020px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 32px;
      }
      .cad-panel {
        background-color: var(--bg-panel);
        border: 1px solid var(--border-color);
        border-radius: 14px;
        padding: 32px;
      }
      .dashboard-footer {
        border-top: 1px solid var(--border-color);
        padding-top: 24px;
        margin-top: 24px;
      }
      .footer-content {
        display: flex;
        flex-direction: column;
        gap: 12px;
        font-size: 12px;
        color: var(--text-secondary);
        font-family: ui-monospace, monospace;
      }
      @media (min-width: 768px) {
        .footer-content {
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      }
    `, "cad-core-layout-styles");
  }

  applyHeaderCSS() {
    applyCss(`
      .minimal-header {
        display: flex;
        flex-direction: column;
        gap: 18px;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 20px;
      }
      .header-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 16px;
      }
      .tags-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .tag-pill {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        padding: 4px 10px;
        border-radius: 4px;
        font-family: ui-monospace, monospace;
      }
      .tag-pill-blue {
        background-color: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
        border: 1px solid rgba(59, 130, 246, 0.3);
      }
      .tag-pill-purple {
        background-color: rgba(168, 85, 247, 0.1);
        color: #a855f7;
        border: 1px solid rgba(168, 85, 247, 0.3);
      }
      .tag-pill-slate {
        background-color: rgba(148, 163, 184, 0.1);
        color: #94a3b8;
        border: 1px solid rgba(148, 163, 184, 0.2);
      }
      .header-controls-group {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .title-group h1 {
        font-size: 32px;
        font-weight: 900;
        color: var(--text-title);
        letter-spacing: -0.025em;
        margin-bottom: 6px;
        line-height: 1.15;
      }
      @media (min-width: 768px) {
        .title-group h1 {
          font-size: 42px;
        }
      }
      .title-subtitle {
        font-size: 14.5px;
        color: var(--text-secondary);
        font-weight: 500;
        line-height: 1.5;
        max-width: 820px;
      }
      .app-nav-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 10px;
        border-top: 1px solid var(--border-color);
        padding-top: 14px;
      }
      .nav-tab-link {
        font-size: 12px;
        font-family: ui-monospace, monospace;
        font-weight: 700;
        color: var(--text-secondary);
        text-decoration: none;
        padding: 8px 16px;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        background: var(--bg-panel);
        transition: all 0.2s ease;
      }
      .nav-tab-link:hover {
        background: var(--btn-hover);
        color: var(--text-title);
        border-color: var(--border-hover);
      }
      .nav-tab-link.active {
        background: #3b82f6;
        color: #ffffff;
        border-color: #3b82f6;
      }
      .deploy-nav-btn {
        cursor: pointer;
        border: 1px solid #10b981;
        color: #10b981;
        background-color: rgba(16, 185, 129, 0.08);
        border-radius: 8px;
        padding: 6px 12px;
        font-size: 11px;
        font-weight: bold;
        font-family: ui-monospace, monospace;
        text-transform: uppercase;
        transition: all 0.2s ease;
      }
      .deploy-nav-btn:hover {
        background-color: rgba(16, 185, 129, 0.18);
      }
    `, "cad-header-styles");
  }

  applyThemeSwitcherCSS() {
    applyCss(`
      .theme-switcher {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 3px;
        background-color: var(--btn-bg);
        border: 1px solid var(--border-color);
        border-radius: 8px;
      }
      .theme-switcher button {
        padding: 4px 10px;
        font-size: 11px;
        font-weight: 600;
        border-radius: 6px;
        border: none;
        cursor: pointer;
        background: transparent;
        color: var(--text-secondary);
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .theme-switcher button.active {
        background-color: #3b82f6;
        color: #ffffff;
      }
      .motion-slider-row {
        display: flex;
        align-items: center;
        gap: 6px;
        background-color: var(--btn-bg);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 4px 10px;
      }
      .motion-slider-label {
        font-size: 10px;
        font-family: ui-monospace, monospace;
        text-transform: uppercase;
        color: var(--text-secondary);
        font-weight: bold;
      }
      .motion-slider {
        width: 60px;
        height: 4px;
        border-radius: 2px;
        background: var(--border-hover);
        outline: none;
        cursor: pointer;
      }
    `, "cad-theme-switcher-styles");
  }

  applyImageViewerCSS() {
    applyCss(`
      .screen-image-viewer-overlay {
        position: fixed;
        inset: 0;
        z-index: 999999;
        /* Subtle translucent wash without dramatic dark occlusion */
        background-color: rgba(5, 8, 16, 0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px;
      }
      .viewer-frame-box {
        position: relative;
        background-color: var(--bg-panel);
        border: 2px solid #3b82f6;
        border-radius: 8px;
        width: calc(100vw - 12px);
        height: calc(100vh - 12px);
        display: flex;
        flex-direction: column;
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.7);
        overflow: hidden;
      }
      .viewer-top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 12px;
        background-color: var(--bg-panel-inner);
        border-bottom: 1px solid var(--border-color);
        min-height: 40px;
        gap: 12px;
      }
      .viewer-badge {
        font-size: 11px;
        font-weight: bold;
        font-family: ui-monospace, monospace;
        color: #3b82f6;
        background: rgba(59, 130, 246, 0.15);
        padding: 3px 8px;
        border-radius: 4px;
        border: 1px solid rgba(59, 130, 246, 0.3);
      }
      .viewer-title-label {
        font-size: 13px;
        font-weight: 700;
        color: var(--text-title);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .viewer-control-btn {
        background: var(--btn-bg);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
        font-size: 12px;
        font-weight: 600;
        font-family: ui-monospace, monospace;
        padding: 4px 10px;
        border-radius: 6px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        transition: all 0.15s ease;
      }
      .viewer-control-btn:hover {
        background: var(--btn-hover);
        color: #ffffff;
      }
      .viewer-control-btn.zoom-btn.active {
        border-color: #3b82f6;
        color: #60a5fa;
        background: rgba(59, 130, 246, 0.15);
      }
      .viewer-control-btn.close-btn:hover {
        background: #ef4444;
        border-color: #ef4444;
        color: #ffffff;
      }
      .viewer-scroll-viewport {
        flex: 1;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #030508;
        overflow: hidden;
      }
      .viewer-scroll-viewport.can-scroll {
        overflow: auto;
        display: block;
        padding: 12px;
      }
      .viewer-display-image {
        display: block;
        transition: transform 0.15s ease;
      }
      .viewer-display-image.fit-mode {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        object-fit: contain;
        cursor: zoom-in;
        margin: auto;
      }
      .viewer-display-image.natural-mode {
        max-width: none !important;
        max-height: none !important;
        width: auto !important;
        height: auto !important;
        cursor: zoom-out;
        margin: 0 auto;
      }
      .viewer-arrow-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 44px;
        height: 64px;
        background: rgba(12, 17, 29, 0.85);
        border: 1px solid var(--border-color);
        color: #ffffff;
        font-size: 32px;
        font-weight: 300;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        border-radius: 6px;
        transition: all 0.2s;
        user-select: none;
      }
      .viewer-arrow-btn:hover {
        background: #3b82f6;
        border-color: #3b82f6;
      }
      .viewer-arrow-btn.prev-btn { left: 8px; }
      .viewer-arrow-btn.next-btn { right: 8px; }
      .viewer-caption-bar {
        padding: 8px 16px;
        background: var(--bg-panel-inner);
        border-top: 1px solid var(--border-color);
        font-size: 13px;
        color: var(--text-secondary);
        line-height: 1.5;
      }
    `, "cad-image-viewer-styles");
  }
}

window.JobsAndAI = JobsAndAI;
globalThis.JobsAndAI = JobsAndAI;