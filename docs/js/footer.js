// Reserve footer space while <head> is still parsing, so the late-mounted
// footer never shifts page layout when it replaces its placeholder.
(function prepareFooterShell() {
    if (!document.head || document.getElementById('defensie-footer-shell')) return;
    const style = document.createElement('style');
    style.id = 'defensie-footer-shell';
    style.textContent = `
        #footer-placeholder { display: block; min-height: 420px; background: #0C0E09; }
        @media (max-width: 768px) { #footer-placeholder { min-height: 720px; } }
    `;
    document.head.appendChild(style);
})();

class Footer extends HTMLElement {
    constructor() { super(); }

    connectedCallback() { this.render(); }

    rootPrefix() {
        const path = window.location.pathname;
        if (path.includes('/materieel/fotopagina/')) return '../../';
        if (path.includes('/materieel/')) return '../';
        return '';
    }

    render() {
        const root = this.rootPrefix();
        const currentYear = new Date().getFullYear();
        this.innerHTML = `
            <style>
                .footer { background: #0C0E09; color: #B9BFAE; border-top: 1px solid #3A4130; font: 400 14px/1.6 'Barlow', sans-serif; padding: 40px 0 20px; margin-top: 40px; }
                .footer-container { max-width: 1280px; margin: 0 auto; padding: 0 48px; }
                .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 24px; }
                .brand-logo { display: flex; align-items: center; gap: 12px; }
                .brand-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #2F3A25; border: 1px solid #3A4130; border-radius: 4px; }
                .brand-icon i { font-size: 17px; display: inline-flex; color: #F0AE4A; }
                .brand-icon i::before { line-height: 1; margin: 0; }
                .brand-text { color: #EDEFE6; font: 700 24px/1 'Barlow Condensed', sans-serif; text-transform: uppercase; letter-spacing: .02em; }
                .brand-text span { color: #F0AE4A; }
                .disclaimer-box { margin-top: 16px; padding: 14px 16px; background: #1E2417; border: 1px solid #3A4130; border-left: 3px solid #F0AE4A; border-radius: 4px; max-width: 360px; }
                .disclaimer-label, .footer .section-title, .contact-label { color: #B9BFAE; }
                .disclaimer-text { color: #B9BFAE; font-size: 14px; line-height: 1.6; }
                .disclaimer-text strong { color: #EDEFE6; }
                .footer .section-title { color: #B9BFAE; font: 700 16px 'Barlow Condensed', sans-serif; letter-spacing: .1em; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
                .footer .section-title i { font-size: 14px; display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; color: #F0AE4A; }
                .footer .section-title i::before { line-height: 1; margin: 0; }
                .nav-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 2px; }
                .nav-item { margin-bottom: 4px; }
                .nav-link { min-height: 32px; color: #D3D8C8; font: 500 15px 'Barlow', sans-serif; transition: color 150ms; display: inline-flex; align-items: center; gap: 10px; text-decoration: none; }
                .nav-link i, .contact-value i { color: #F0AE4A; transition: color 150ms; }
                .nav-link:hover, .contact-value:hover, .bottom-link:hover { color: #FFD078; }
                .nav-link:hover i { color: #FFD078; }
                .bottom-link { color: #B9BFAE; font: 500 13px 'Barlow', sans-serif; transition: color 150ms; text-decoration: none; }
                .bottom-link:hover { color: #FFD078; text-decoration: underline; text-underline-offset: 3px; }
                .social-btn { width: 40px; height: 40px; border-radius: 4px; background: #1E2417; border: 1px solid #3A4130; color: #F0AE4A; display: inline-flex; align-items: center; justify-content: center; transition: background-color 150ms, color 150ms, border-color 150ms; }
                .social-btn:hover { background: #F0AE4A; color: #14170F; border-color: #F0AE4A; }
                .social-btn i { font-size: 16px; line-height: 1; }
                .social-btn i::before { line-height: 1; margin: 0; }
                .footer-bottom { border-top: 1px solid #3A4130; padding-top: 16px; margin-top: 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
                .copyright { color: #B9BFAE; font-size: 14px; display: inline-flex; align-items: center; gap: 8px; }
                .copyright i { color: #F0AE4A; }
                .bottom-links { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
                .footer :focus-visible { outline: 2px solid #F0AE4A; outline-offset: 2px; }
                @media (max-width: 1024px) { .footer-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; } .footer-container { padding: 0 32px; } }
                @media (max-width: 768px) { .footer { padding: 40px 0 20px; margin-top: 40px; } .footer-grid { grid-template-columns: 1fr; gap: 32px; } .footer-bottom { flex-direction: column; text-align: center; } .bottom-links { justify-content: center; } }
                @media (prefers-reduced-motion: reduce) { .footer *, .footer *::before, .footer *::after { transition-duration: .01ms !important; animation: none !important; } }
            </style>
            <div class="footer">
                <div class="footer-container">
                    <div class="footer-grid">
                        <div class="brand-column">
                            <div class="brand-logo">
                                <div class="brand-icon"><i class="fi fi-rr-flame"></i></div>
                                <div class="brand-text">Defensiebrandweer <span>NL</span></div>
                            </div>
                            <div class="disclaimer-box">
                                <div class="disclaimer-text">
                                    Dé online community voor de <strong>Defensiebrandweer</strong> in Nederland.
                                    Informatie over voertuigen, locaties en materieel. Geen officiële website van het Ministerie van Defensie.
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 class="section-title"><i class="fi fi-rr-compass-north"></i> Navigatie</h3>
                            <ul class="nav-list">
                                <li class="nav-item"><a href="${root}index" class="nav-link"><i class="fi fi-rr-home"></i> Home</a></li>
                                <li class="nav-item"><a href="${root}locaties" class="nav-link"><i class="fi fi-rr-marker"></i> Locaties</a></li>
                                <li class="nav-item"><a href="${root}voertuigen" class="nav-link"><i class="fi fi-rr-truck-moving"></i> Voertuigen</a></li>
                                <li class="nav-item"><a href="${root}materieel" class="nav-link"><i class="fi fi-rr-tools"></i> Materieel</a></li>
                                <li class="nav-item"><a href="${root}dashboard" class="nav-link"><i class="fi fi-rr-dashboard"></i> Dashboard</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="section-title"><i class="fi fi-rr-link"></i> Snel naar</h3>
                            <ul class="nav-list">
                                <li class="nav-item"><a href="${root}afkortingen" class="nav-link"><i class="fi fi-rr-book"></i> Afkortingen</a></li>
                                <li class="nav-item"><a href="${root}kenteken-register" class="nav-link"><i class="fi fi-rr-file"></i> Kentekenregister</a></li>
                                <li class="nav-item"><a href="${root}fotogalerij" class="nav-link"><i class="fi fi-rr-gallery"></i> Fotogalerij</a></li>
                                <li class="nav-item"><a href="${root}historie" class="nav-link"><i class="fi fi-rr-time-past"></i> Historie</a></li>
                                <li class="nav-item"><a href="${root}contact" class="nav-link"><i class="fi fi-rr-shield"></i> Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="section-title"><i class="fi fi-rr-envelope"></i> Contact</h3>
                            <ul class="nav-list">
                                <li class="nav-item"><a href="${root}contact" class="nav-link"><i class="fi fi-rr-shield"></i> Contactpagina</a></li>
                                <li class="nav-item"><a href="mailto:info@defensiebrandweer.nl" class="nav-link"><i class="fi fi-rr-envelope"></i> info@defensiebrandweer.nl</a></li>
                            </ul>
                            <div class="contact-item">
                                <h3 class="section-title" style="margin-top:16px;"><i class="fi fi-rr-share"></i> Volg ons</h3>
                                <div class="social-links">
                                    <a href="#" class="social-btn" aria-label="Facebook"><i class="fi fi-brands-facebook"></i></a>
                                    <a href="#" class="social-btn" aria-label="Instagram"><i class="fi fi-brands-instagram"></i></a>
                                    <a href="#" class="social-btn" aria-label="LinkedIn"><i class="fi fi-brands-linkedin"></i></a>
                                    <a href="#" class="social-btn" aria-label="YouTube"><i class="fi fi-brands-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <div class="copyright">
                            <i class="fi fi-rr-flame"></i> &copy; ${currentYear} Defensiebrandweer NL
                        </div>
                        <div class="bottom-links">
                            <a href="${root}privacybeleid" class="bottom-link"><i class="fi fi-rr-lock"></i> Privacybeleid</a>
                            <a href="${root}disclaimer" class="bottom-link"><i class="fi fi-rr-file"></i> Disclaimer</a>
                            <a href="${root}credits" class="bottom-link"><i class="fi fi-rr-heart"></i> Credits</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        try {
            if (window.location.pathname.includes('/materieel/')) {
                this.querySelectorAll('a[href]').forEach(a => {
                    const href = a.getAttribute('href');
                    if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#') && !href.startsWith('../') && !href.startsWith('/')) {
                        a.setAttribute('href', '../' + href);
                    }
                });
            }
        } catch (e) {}
    }
}

if (!customElements.get('defensie-footer')) {
    customElements.define('defensie-footer', Footer);
}

function mountFooter() {
    if (document.querySelector('defensie-footer')) return true;
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return false;
    const footerElement = document.createElement('defensie-footer');
    placeholder.replaceWith(footerElement);
    return true;
}

function mountFooterFallback() {
    if (document.querySelector('defensie-footer')) return;
    const footerElement = document.createElement('defensie-footer');
    const scrollContent = document.querySelector('.scroll-content');
    if (scrollContent) {
        scrollContent.appendChild(footerElement);
    } else if (document.body) {
        document.body.appendChild(footerElement);
    }
}

(function prepareFooterShell() {
    if (!document.head || document.getElementById('defensie-footer-shell')) return;
    const style = document.createElement('style');
    style.id = 'defensie-footer-shell';
    style.textContent = `
        #footer-placeholder { display: block; min-height: 420px; background: #0C0E09; }
        @media (max-width: 768px) { #footer-placeholder { min-height: 720px; } }
    `;
    document.head.appendChild(style);
})();

if (!mountFooter()) {
    const footerObserver = new MutationObserver(() => {
        if (mountFooter()) footerObserver.disconnect();
    });
    footerObserver.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(mountFooterFallback, 1000);
}