/* Light / dark theme toggle, persisted in localStorage.
   Loaded from <head> so the saved theme is applied before paint. */
(function () {
    var KEY = 'theme';
    var root = document.documentElement;
    var saved = localStorage.getItem(KEY) || 'dark';
    root.setAttribute('data-theme', saved);

    var css =
        '#theme-toggle{position:fixed;left:20px;bottom:20px;z-index:9999;width:46px;height:46px;' +
        'border-radius:50%;border:1px solid rgba(61,245,255,.5);background:rgba(10,12,15,.7);' +
        'color:#3df5ff;font-size:19px;cursor:pointer;display:flex;align-items:center;justify-content:center;' +
        '-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);box-shadow:0 6px 24px rgba(0,0,0,.45);' +
        'transition:all .3s ease;}' +
        '#theme-toggle:hover{border-color:#ff44d6;color:#ff44d6;box-shadow:0 0 18px rgba(255,68,214,.4);}' +
        'html[data-theme="light"] #theme-toggle{background:rgba(255,255,255,.85);border-color:#0a8ea0;color:#0a8ea0;}' +
        'html[data-theme="light"] #theme-toggle:hover{border-color:#b81e9a;color:#b81e9a;}';

    function addStyle() {
        var s = document.createElement('style');
        s.textContent = css;
        document.head.appendChild(s);
    }

    function icon(t) {
        return t === 'light'
            ? '<em class="bi bi-moon-stars-fill"></em>'
            : '<em class="bi bi-brightness-high-fill"></em>';
    }

    function build() {
        var btn = document.createElement('button');
        btn.id = 'theme-toggle';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Toggle light or dark theme');
        btn.innerHTML = icon(root.getAttribute('data-theme'));
        btn.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            root.setAttribute('data-theme', next);
            localStorage.setItem(KEY, next);
            btn.innerHTML = icon(next);
        });
        document.body.appendChild(btn);
    }

    if (document.head) { addStyle(); }
    else { document.addEventListener('DOMContentLoaded', addStyle); }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', build);
    } else {
        build();
    }
})();
