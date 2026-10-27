(function() {
    const style = document.createElement('style');
    style.textContent = `
        .scroll-container {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .scroll-content {
            height: 100%;
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }
        .scroll-content::-webkit-scrollbar {
            width: 0;
            background: transparent;
        }
        .custom-scrollbar-body {
            position: absolute;
            top: 84px;
            right: 0;
            width: 8px;
            height: calc(100% - 84px);
            background: #1E2417;
            border: 1px solid #3A4130;
            border-radius: 4px;
            opacity: .8;
            transition: opacity 150ms;
            z-index: 10;
        }
        .scrollbar-thumb {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            background: #687254;
            border-radius: 3px;
            cursor: pointer;
            min-height: 40px;
            transition: background 150ms;
        }
        .scrollbar-thumb:hover {
            background: #F0AE4A;
        }
        .scrollbar-thumb.visible {
            opacity: 1 !important;
        }
        @media (max-width: 1024px) {
            .custom-scrollbar-body {
                opacity: 0;
            }
            .scrollbar-thumb.visible {
                opacity: 1 !important;
            }
        }
        @media (prefers-reduced-motion: reduce) {
            .custom-scrollbar-body, .scrollbar-thumb { transition-duration: .01ms !important; }
        }
    `;
    document.head.appendChild(style);
})();

(function () {
    'use strict';

    let scrollableContent = null;
    let scrollbarThumb = null;
    let scrollableWrapper = null;
    let isDragging = false;
    let isMobile = window.innerWidth <= 1024;
    let resizeTimeout = null;
    let isInitialized = false;
    let fadeTimeout = null;

    const MIN_THUMB_HEIGHT = 40;
    const FADE_DELAY = 1000;

    function initialize() {
        if (isInitialized) return;

        scrollableContent = document.querySelector('.scroll-content');
        scrollbarThumb = document.querySelector('.custom-scrollbar-body .scrollbar-thumb');
        scrollableWrapper = document.querySelector('.scroll-container');

        if (!scrollableContent || !scrollbarThumb || !scrollableWrapper) {
            setTimeout(initialize, 100);
            return;
        }

        isInitialized = true;

        function getThumbPosition() {
            const transform = scrollbarThumb.style.transform;
            const match = transform.match(/translate3d\(0px,\s*([-\d.]+)px,\s*0px\)/);
            return match ? parseFloat(match[1]) : 0;
        }

        function setThumbPosition(y) {
            scrollbarThumb.style.transform = `translate3d(0, ${y}px, 0)`;
        }

        function showScrollbarTemporarily() {
            if (!isMobile || !scrollbarThumb) return;
            if (fadeTimeout) clearTimeout(fadeTimeout);
            scrollbarThumb.classList.add('visible');
            fadeTimeout = setTimeout(() => scrollbarThumb.classList.remove('visible'), FADE_DELAY);
        }

        function updateScrollbar() {
            if (!scrollableContent || !scrollbarThumb || !scrollableWrapper || isDragging) return;
            window.requestAnimationFrame(() => {
                const contentHeight = scrollableContent.scrollHeight;
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 84;
                const wrapperHeight = scrollableWrapper.clientHeight;
                if (contentHeight <= wrapperHeight) {
                    scrollbarThumb.style.display = 'none';
                    return;
                }
                scrollbarThumb.style.display = 'block';
                const availableHeight = wrapperHeight - navbarHeight;
                let thumbHeight = (wrapperHeight / contentHeight) * availableHeight;
                thumbHeight = Math.max(thumbHeight, MIN_THUMB_HEIGHT);
                const maxScrollTop = contentHeight - wrapperHeight;
                const thumbMaxTop = availableHeight - thumbHeight;
                const thumbTop = (scrollableContent.scrollTop / maxScrollTop) * thumbMaxTop;
                scrollbarThumb.style.height = `${thumbHeight}px`;
                setThumbPosition(thumbTop);
            });
        }

        scrollableContent.addEventListener('scroll', function () {
            updateScrollbar();
            showScrollbarTemporarily();
        }, { passive: true });

        window.addEventListener('resize', function () {
            isMobile = window.innerWidth <= 1024;
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateScrollbar, 50);
        });

        const observer = new MutationObserver(updateScrollbar);
        observer.observe(scrollableContent, { childList: true, subtree: true });

        setTimeout(updateScrollbar, 100);
        setTimeout(updateScrollbar, 500);

        scrollbarThumb.addEventListener('mousedown', function (e) {
            if (isMobile) return;
            e.preventDefault();
            e.stopPropagation();
            isDragging = true;
            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'grabbing';
            const startY = e.clientY;
            const startTop = getThumbPosition();
            const wrapperHeight = scrollableWrapper.clientHeight - (document.getElementById('navbar')?.offsetHeight || 84);
            const thumbHeight = parseFloat(scrollbarThumb.style.height) || MIN_THUMB_HEIGHT;
            const maxThumbTop = wrapperHeight - thumbHeight;
            function onMouseMove(e) {
                if (!isDragging) return;
                e.preventDefault();
                const deltaY = e.clientY - startY;
                let newTop = startTop + deltaY;
                newTop = Math.max(0, Math.min(newTop, maxThumbTop));
                setThumbPosition(newTop);
                const contentHeight = scrollableContent.scrollHeight;
                const maxScrollTop = contentHeight - scrollableWrapper.clientHeight;
                const scrollRatio = newTop / maxThumbTop;
                scrollableContent.scrollTop = scrollRatio * maxScrollTop;
            }
            function onMouseUp() {
                isDragging = false;
                document.body.style.userSelect = '';
                document.body.style.cursor = '';
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        window.updateScrollbar = updateScrollbar;

        const navbar = document.getElementById('navbar');
        if (scrollableContent && navbar) {
            scrollableContent.addEventListener('scroll', function () {
                if (scrollableContent.scrollTop > 84) navbar.classList.add('scrolled');
                else navbar.classList.remove('scrolled');
            }, { passive: true });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    window.addEventListener('load', function () {
        if (window.updateScrollbar) {
            setTimeout(window.updateScrollbar, 200);
        } else {
            isInitialized = false;
            initialize();
        }
    });
})();