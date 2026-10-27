(function gateNavbarFonts() {
    if (!document.head || document.getElementById('defensie-navbar-gate')) return;
    const style = document.createElement('style');
    style.id = 'defensie-navbar-gate';
    style.textContent = 'defensie-navbar{visibility:hidden}html.defensie-fonts-ready defensie-navbar{visibility:visible}';
    document.head.appendChild(style);
    function reveal() { document.documentElement.classList.add('defensie-fonts-ready'); }
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(reveal);
        setTimeout(reveal, 2500);
    } else {
        reveal();
    }
})();

class Navbar extends HTMLElement {
    constructor() {
        super();
        this.currentPage = this.getCurrentPage();
        this.isMobileMenuOpen = false;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.updateActiveState();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('fotogalerij')) return 'gallery';
        if (path.includes('locaties')) return 'locations';
        if (path.includes('materieel')) return 'materieel';
        if (path.includes('dashboard')) return 'dashboard';
        if (path.includes('voertuigen')) return 'voertuigen';
        if (path.includes('locatie-detail')) return 'locations';
        if (path.includes('voertuig-detail')) return 'voertuigen';
        if (path.includes('kenteken')) return 'voertuigen';
        if (path.includes('luchthavenbrandweer')) return 'luchthavenbrandweer';
        if (path.includes('afkortingen')) return 'afkortingen';
        return 'home';
    }

    rootPrefix() {
        const path = window.location.pathname;
        if (path.includes('/materieel/fotopagina/')) return '../../';
        if (path.includes('/materieel/')) return '../';
        return '';
    }

    getCurrentTopic() {
        const path = window.location.pathname.split('/').pop().split('?')[0];
        return path || '';
    }

    render() {
        window.DefensieNavbarRoot = this.rootPrefix();
        this.innerHTML = `
            <style>
                .navbar { background: rgba(12, 14, 9, 0.92); backdrop-filter: blur(10px); position: fixed; top: 0; left: 0; right: 0; z-index: 1000; }
                .navbar::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #dc2626 0%, #dc2626 50%, #F0AE4A 50%, #F0AE4A 75%, #1F4FE0 75%, #1F4FE0 100%); }
                .nav-container { max-width: 1280px; margin: 0 auto; padding: 0 48px; }
                .nav-content { display: flex; align-items: center; justify-content: space-between; height: 84px; }
                .brand { display: flex; align-items: center; gap: 12px; text-decoration: none; color: #EDEFE6; font-weight: 700; font-size: 18px; letter-spacing: -0.02em; }
                .brand-icon { width: 40px; height: 40px; background: #dc2626; color: #fff; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
                .brand-text span { color: #dc2626; }
                .nav-links { display: flex; gap: 6px; align-items: center; }
                .nav-btn { background: none; border: 1px solid transparent; padding: 10px 14px; border-radius: 4px; font-size: 14px; font-weight: 600; color: #B9BFAE; cursor: pointer; transition: all .2s; display: inline-flex; align-items: center; gap: 8px; font-family: inherit; }
                .nav-btn:hover { color: #EDEFE6; background: #1E2417; border-color: #3A4130; }
                .nav-btn.active { color: #fff; background: #1F4FE0; border-color: #1F4FE0; }
                .nav-btn .caret { font-size: 11px; transition: transform .2s; }
                .nav-dropdown { position: relative; }
                .nav-dropdown.open .nav-btn .caret { transform: rotate(180deg); }
                .dropdown-panel {
                    position: absolute;
                    top: calc(100% + 4px);
                    left: 50%;
                    transform: translateX(-50%) translateY(-4px);
                    min-width: 220px;
                    background: #1E2417;
                    border: 1px solid #3A4130;
                    border-radius: 6px;
                    box-shadow: 0 16px 40px rgba(0,0,0,.4);
                    padding: 8px;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity .2s, visibility .2s, transform .2s;
                    z-index: 1001;
                }
                .nav-dropdown::after {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    height: 12px;
                }
                .nav-dropdown.open .dropdown-panel,
                .nav-dropdown:hover .dropdown-panel {
                    opacity: 1;
                    visibility: visible;
                    transform: translateX(-50%) translateY(0);
                }
                .drop-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    width: 100%;
                    padding: 10px 14px;
                    border: none;
                    background: none;
                    border-radius: 4px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #D3D8C8;
                    cursor: pointer;
                    font-family: inherit;
                    transition: all .2s;
                    text-align: left;
                }
                .drop-item:hover { color: #EDEFE6; background: #2F3A25; }
                .drop-item.active { color: #fff; background: #1F4FE0; }
                .drop-sep { height: 1px; background: #3A4130; margin: 6px 4px; }
                .drop-has-sub { position: relative; }
                .flyout {
                    position: absolute;
                    top: 0;
                    left: 100%;
                    min-width: 220px;
                    background: #1E2417;
                    border: 1px solid #3A4130;
                    border-radius: 6px;
                    box-shadow: 0 16px 40px rgba(0,0,0,.4);
                    padding: 8px;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity .2s, visibility .2s, transform .2s;
                    transform: translateX(-6px);
                    z-index: 1002;
                }
                .drop-has-sub:hover .flyout { opacity: 1; visibility: visible; transform: translateX(0); }
                .mobile-menu-btn { display: none; background: none; border: none; font-size: 22px; cursor: pointer; color: #EDEFE6; }
                .mobile-menu { display: none; }
                .mobile-nav-btn { display: block; width: 100%; padding: 14px 20px; background: none; border: none; text-align: left; font-size: 15px; font-weight: 500; color: #B9BFAE; cursor: pointer; font-family: inherit; transition: all .2s; border-bottom: 1px solid #3A4130; }
                .mobile-nav-btn:hover { background: #1E2417; color: #EDEFE6; }
                .mobile-nav-btn.active { color: #fff; background: #1F4FE0; }
                .brand:focus-visible, .navbar button:focus-visible { outline: 2px solid #F0AE4A; outline-offset: 2px; }
                @media (max-width: 768px) {
                    .nav-container { padding: 0 20px; }
                    .nav-links { display: none; }
                    .mobile-menu-btn { display: block; }
                    .mobile-menu { display: block; position: absolute; top: 84px; left: 0; right: 0; background: #1E2417; border-bottom: 1px solid #3A4130; box-shadow: 0 16px 40px rgba(0,0,0,.4); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .navbar *, .navbar *::before, .navbar *::after { transition-duration: .01ms !important; }
                }
            </style>

            <nav class="navbar">
                <div class="nav-container">
                    <div class="nav-content">
                        <a class="brand" href="${this.rootPrefix()}index">
                            <div class="brand-icon"><i class="fi fi-rr-flame"></i></div>
                            <div class="brand-text">Defensiebrandweer <span>NL</span></div>
                        </a>
                        <div class="nav-links">
                            <button class="nav-btn ${this.currentPage === 'home' ? 'active' : ''}" data-page="home">
                                <i class="fi fi-rr-home"></i> Home
                            </button>
                            <button class="nav-btn ${this.currentPage === 'locations' ? 'active' : ''}" data-page="locations">
                                <i class="fi fi-rr-marker"></i> Locaties
                            </button>
                            <div class="nav-dropdown">
                                <button class="nav-btn ${this.currentPage === 'voertuigen' || this.currentPage === 'luchthavenbrandweer' ? 'active' : ''}" data-page="voertuigen">
                                    <i class="fi fi-rr-truck-moving"></i> Rollend materieel <i class="fi fi-rr-angle-small-down caret"></i>
                                </button>
                                <div class="dropdown-panel" id="rollendDropdown">
                                    <button class="drop-item ${this.currentPage === 'voertuigen' ? 'active' : ''}" data-page="voertuigen"><i class="fi fi-rr-truck-moving"></i> Voertuigen</button>
                                    <button class="drop-item" data-page="kenteken-register"><i class="fi fi-rr-file"></i> Kentekenregister</button>
                                    <button class="drop-item" data-page="luchthavenbrandweer"><i class="fi fi-rr-plane"></i> Luchthavenbrandweer</button>
                                </div>
                            </div>
                            <button class="nav-btn ${this.currentPage === 'gallery' ? 'active' : ''}" data-page="gallery">
                                <i class="fi fi-rr-gallery"></i> Foto's
                            </button>
                            <div class="nav-dropdown">
                                <button class="nav-btn ${this.currentPage === 'materieel' ? 'active' : ''}" data-page="materieel">
                                    <i class="fi fi-rr-tools"></i> Materieel <i class="fi fi-rr-angle-small-down caret"></i>
                                </button>
                                <div class="dropdown-panel" id="matDropdown">
                                    <button class="drop-item" data-mat="all"><i class="fi fi-rr-apps"></i> Alle materieel</button>
                                    <div class="drop-sep"></div>
                                    <button class="drop-item" data-topic="materieel/ademluchtapparatuur">Ademluchtapparatuur</button>
                                    <button class="drop-item" data-topic="materieel/armaturen">Armaturen water &amp; schuim</button>
                                    <button class="drop-item" data-topic="materieel/blusmiddelen">Blusmiddelen &amp; blusapparatuur</button>
                                    <div class="drop-sep"></div>
                                    <button class="drop-item" data-mat="Blustoestel">Blustoestellen</button>
                                    <button class="drop-item" data-topic="materieel/brandweerkleding">Brandweerkleding</button>
                                    <button class="drop-item" data-mat="Materieellijst">Materieellijst</button>
                                    <button class="drop-item" data-mat="Pomp">Pompen – Techniek</button>
                                    <button class="drop-item" data-mat="Redgereedschap">Redgereedschap</button>
                                </div>
                            </div>
                            <button class="nav-btn ${this.currentPage === 'dashboard' ? 'active' : ''}" data-page="dashboard">
                                <i class="fi fi-rr-dashboard"></i> Dashboard
                            </button>
                            <button class="nav-btn ${this.currentPage === 'afkortingen' ? 'active' : ''}" data-page="afkortingen">
                                <i class="fi fi-rr-book"></i> Afkortingen
                            </button>
                        </div>
                        <button class="mobile-menu-btn" id="mobileMenuBtn">
                            <i class="fi fi-rr-${this.isMobileMenuOpen ? 'cross' : 'menu-burger'}"></i>
                        </button>
                    </div>
                    <div class="mobile-menu" id="mobileMenu" style="display: ${this.isMobileMenuOpen ? 'block' : 'none'}">
                        <button class="mobile-nav-btn ${this.currentPage === 'home' ? 'active' : ''}" data-page="home"><i class="fi fi-rr-home"></i> Home</button>
                        <button class="mobile-nav-btn ${this.currentPage === 'locations' ? 'active' : ''}" data-page="locations"><i class="fi fi-rr-marker"></i> Locaties</button>
                        <button class="mobile-nav-btn ${this.currentPage === 'voertuigen' ? 'active' : ''}" data-page="voertuigen"><i class="fi fi-rr-truck-moving"></i> Voertuigen</button>
                        <button class="mobile-nav-btn ${this.currentPage === 'luchthavenbrandweer' ? 'active' : ''}" data-page="luchthavenbrandweer"><i class="fi fi-rr-plane"></i> Luchthavenbrandweer</button>
                        <button class="mobile-nav-btn ${this.currentPage === 'gallery' ? 'active' : ''}" data-page="gallery"><i class="fi fi-rr-gallery"></i> Fotogalerij</button>
                        <button class="mobile-nav-btn ${this.currentPage === 'materieel' ? 'active' : ''}" data-page="materieel"><i class="fi fi-rr-tools"></i> Materieel</button>
                        <button class="mobile-nav-btn ${this.currentPage === 'dashboard' ? 'active' : ''}" data-page="dashboard"><i class="fi fi-rr-dashboard"></i> Dashboard</button>
                        <button class="mobile-nav-btn ${this.currentPage === 'afkortingen' ? 'active' : ''}" data-page="afkortingen"><i class="fi fi-rr-book"></i> Afkortingen</button>
                    </div>
                </div>
            </nav>
        `;
    }

    setupEventListeners() {
        const desktopBtns = this.querySelectorAll('.nav-links .nav-btn');
        const mobileBtns = this.querySelectorAll('.mobile-nav-btn');
        const mobileMenuBtn = this.querySelector('#mobileMenuBtn');

        desktopBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (btn.closest('.nav-dropdown') && !e.target.closest('.dropdown-panel')) {
                    const wrap = btn.closest('.nav-dropdown');
                    if (window.innerWidth > 768 && e.target.closest('.nav-btn') && !wrap.classList.contains('open')) {
                        if (matchMedia('(hover: none)').matches) {
                            e.preventDefault();
                            wrap.classList.add('open');
                            return;
                        }
                    }
                }
                e.preventDefault();
                const page = btn.dataset.page;
                this.navigateTo(page);
            });
        });

        this.querySelectorAll('.dropdown-panel .drop-item[data-page]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const page = item.dataset.page;
                this.closeMobileMenu();
                const slug = { 'home':'index','locations':'locaties','materieel':'materieel','voertuigen':'voertuigen','gallery':'fotogalerij','dashboard':'dashboard','afkortingen':'afkortingen','luchthavenbrandweer':'luchthavenbrandweer','kenteken-register':'kenteken-register' }[page];
                if (slug) window.location.href = this.rootPrefix() + slug;
            });
        });

        this.querySelectorAll('[data-mat]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const q = item.dataset.mat;
                this.closeMobileMenu();
                const base = `${this.rootPrefix()}materieel`;
                window.location.href = q === 'all' ? base : `${base}?zoek=${encodeURIComponent(q)}`;
            });
        });

        this.querySelectorAll('[data-topic]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeMobileMenu();
                let t = item.dataset.topic;
                if (t.startsWith('materieel/')) t = this.rootPrefix() + t;
                window.location.href = t;
            });
        });

        mobileBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const page = btn.dataset.page;
                this.navigateTo(page);
                this.closeMobileMenu();
            });
        });

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }

        document.addEventListener('click', (e) => {
            if (!this.contains(e.target) && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }

    navigateTo(page) {
        const pageMap = {
            'home': 'index',
            'locations': 'locaties',
            'materieel': 'materieel',
            'voertuigen': 'voertuigen',
            'gallery': 'fotogalerij',
            'dashboard': 'dashboard',
            'afkortingen': 'afkortingen',
            'luchthavenbrandweer': 'luchthavenbrandweer'
        };
        const slug = pageMap[page];
        if (slug) window.location.href = this.rootPrefix() + slug;
    }

    updateActiveState() {
        this.querySelectorAll('.nav-links .nav-btn').forEach(btn => {
            const isActive = btn.dataset.page === this.currentPage;
            if (isActive) btn.classList.add('active');
            else btn.classList.remove('active');
        });
        this.querySelectorAll('.mobile-nav-btn').forEach(btn => {
            const isActive = btn.dataset.page === this.currentPage;
            if (isActive) btn.classList.add('active');
            else btn.classList.remove('active');
        });
        this.querySelectorAll('.dropdown-panel .drop-item').forEach(item => {
            const isActive = item.dataset.page === this.currentPage || item.dataset.mat === this.getCurrentTopic() || item.dataset.topic === this.getCurrentTopic();
            if (isActive) item.classList.add('active');
            else item.classList.remove('active');
        });
    }

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        const mobileMenu = this.querySelector('#mobileMenu');
        const menuBtnIcon = this.querySelector('#mobileMenuBtn i');
        if (mobileMenu) mobileMenu.style.display = this.isMobileMenuOpen ? 'block' : 'none';
        if (menuBtnIcon) menuBtnIcon.className = `fi fi-rr-${this.isMobileMenuOpen ? 'cross' : 'menu-burger'}`;
    }

    closeMobileMenu() {
        this.isMobileMenuOpen = false;
        const mobileMenu = this.querySelector('#mobileMenu');
        const menuBtnIcon = this.querySelector('#mobileMenuBtn i');
        if (mobileMenu) mobileMenu.style.display = 'none';
        if (menuBtnIcon) menuBtnIcon.className = 'fi fi-rr-menu-burger';
    }
}

if (!customElements.get('defensie-navbar')) {
    customElements.define('defensie-navbar', Navbar);
}

function mountNavbar() {
    if (document.querySelector('defensie-navbar') || !document.body) return false;
    const navbarElement = document.createElement('defensie-navbar');
    document.body.insertBefore(navbarElement, document.body.firstChild);
    return true;
}

(function gateNavbarFonts() {
    // already defined above
})();

if (!mountNavbar()) {
    const navbarObserver = new MutationObserver(() => {
        if (mountNavbar()) navbarObserver.disconnect();
    });
    navbarObserver.observe(document.documentElement, { childList: true, subtree: true });
}