const DefensieModal = (() => {
    let overlay = null;
    let closeButton = null;
    let lastFocus = null;

    function ensure() {
        if (overlay) return overlay;
        overlay = document.createElement('div');
        overlay.id = 'defensieImageModal';
        overlay.className = 'defensie-modal-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.innerHTML = `
            <div class="defensie-modal-content" role="dialog" aria-modal="true" aria-label="Afbeelding">
                <button class="defensie-modal-close" type="button" aria-label="Sluiten"><i class="fas fa-times"></i></button>
                <img class="defensie-modal-image" alt="">
            </div>`;
        document.body.appendChild(overlay);
        closeButton = overlay.querySelector('.defensie-modal-close');
        const image = overlay.querySelector('.defensie-modal-image');
        closeButton.addEventListener('click', close);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); });
        return overlay;
    }

    function open(src, alt) {
        ensure();
        lastFocus = document.activeElement;
        const image = overlay.querySelector('.defensie-modal-image');
        image.src = src;
        image.alt = alt || '';
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('defensie-modal-active');
        if (!overlay.classList.contains('open')) {
            void overlay.offsetWidth;
            overlay.classList.add('open');
        }
        requestAnimationFrame(() => closeButton.focus({ preventScroll: true }));
    }

    function close() {
        if (!overlay || !overlay.classList.contains('open')) return;
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('defensie-modal-active');
        if (lastFocus && typeof lastFocus.focus === 'function') {
            try { lastFocus.focus({ preventScroll: true }); } catch (e) {}
        }
    }

    const style = document.createElement('style');
    style.id = 'defensie-modal-style';
    style.textContent = `
        .defensie-modal-overlay {
            position: fixed; inset: 0; z-index: 9999;
            display: flex; align-items: center; justify-content: center;
            background: rgba(8,10,7,.82); backdrop-filter: blur(8px);
            opacity: 0; visibility: hidden; pointer-events: none;
            transition: opacity 230ms ease, visibility 0s linear 230ms;
        }
        .defensie-modal-overlay.open { opacity: 1; visibility: visible; pointer-events: auto; transition-delay: 0s; }
        .defensie-modal-content { position: relative; max-width: 90vw; max-height: 90vh; }
        .defensie-modal-image { display: block; max-width: 100%; max-height: 90vh; border-radius: 6px; box-shadow: 0 24px 80px rgba(0,0,0,.48); }
        .defensie-modal-close {
            position: absolute; top: -14px; right: -14px;
            width: 36px; height: 36px; border-radius: 4px;
            background: var(--gold, #F0AE4A); color: #000; border: 1px solid var(--gold, #F0AE4A);
            font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center;
            transition: background-color 150ms, border-color 150ms;
        }
        .defensie-modal-close:hover { background: #FFD078; border-color: #FFD078; }
        .defensie-modal-close i { line-height: 1; margin: 0; }
        body.defensie-modal-active { overflow: hidden; }
        @media (prefers-reduced-motion: reduce) { .defensie-modal-overlay { transition: none; } }
    `;
    if (!document.getElementById('defensie-modal-style')) document.head.appendChild(style);

    return { open, close };
})();

window.DefensieModal = DefensieModal;