// Progressive enhancement: all content and anchor navigation work without JavaScript.
const menuButton = document.getElementById('hamburger');
const menu = document.getElementById('navMenu');
function closeMenu() {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu';
}
menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menu.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? 'Close' : 'Menu';
});
menu.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu(); menuButton.focus();
    }
});
document.addEventListener('click', event => {
    if (!event.target.closest('.navbar')) closeMenu();
});
const themeButton = document.getElementById('themeToggle');
let savedTheme;
try { savedTheme = localStorage.getItem('theme'); } catch {}
function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
}
setTheme(savedTheme === 'dark' ? 'dark' : 'light');
themeButton.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try { localStorage.setItem('theme', theme); } catch {}
    trackEvent('theme_toggle', 'User Preferences', theme);
});
function trackEvent(name, category, label) {
    if (typeof gtag === 'function') gtag('event', name, { event_category: category, event_label: label });
}
// Keep long career entries available in native, keyboard-accessible disclosures.
document.querySelectorAll('.timeline-description').forEach(list => {
    if (list.textContent.length < 1100) return;
    const disclosure = document.createElement('details');
    disclosure.className = 'experience-details';
    const summary = document.createElement('summary');
    summary.textContent = 'Read responsibilities and achievements';
    list.before(disclosure);
    disclosure.append(summary, list);
});
const search = document.getElementById('courseSearch');
const cards = [...document.querySelectorAll('.course-card')];
const showButton = document.getElementById('showCourses');
const status = document.getElementById('courseStatus');
let expanded = false;
function renderCourses() {
    const query = search.value.trim().toLocaleLowerCase();
    const matching = cards.filter(card => card.textContent.toLocaleLowerCase().includes(query));
    const visible = query || expanded ? matching : matching.slice(0, 6);
    const shown = new Set(visible);
    cards.forEach(card => { card.hidden = !shown.has(card); });
    status.textContent = matching.length
        ? 'Showing ' + visible.length + ' of ' + matching.length + ' courses'
        : 'No courses found. Try another topic or clear your search.';
    showButton.hidden = !!query || matching.length <= 6;
    showButton.textContent = expanded ? 'Show fewer courses' : 'View all ' + cards.length + ' courses';
    showButton.setAttribute('aria-expanded', String(expanded));
}
document.querySelector('.course-tools').hidden = false;
showButton.setAttribute('aria-controls', 'courseList');
search.addEventListener('input', renderCourses);
document.getElementById('clearSearch').addEventListener('click', () => {
    search.value = ''; renderCourses(); search.focus();
});
showButton.addEventListener('click', () => {
    expanded = !expanded; renderCourses();
    if (!expanded) document.getElementById('courses').scrollIntoView({ behavior: 'instant' });
});
renderCourses();
// Restore deep links after progressive disclosures and course filtering change page height.
window.addEventListener('load', () => {
    if (!location.hash) return;
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
}, { once: true });
const navLinks = [...menu.querySelectorAll('a')];
if ('IntersectionObserver' in window) {
    const sections = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top-b.boundingClientRect.top);
        if (!visible.length) return;
        navLinks.forEach(link => {
            if (link.hash === '#' + visible[0].target.id) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }, { rootMargin: '-15% 0px -60% 0px' });
    document.querySelectorAll('main > section[id]').forEach(section => sections.observe(section));
}
const backToTop = document.getElementById('backToTop');
function updateTopButton() { backToTop.classList.toggle('show', window.scrollY > 700); }
window.addEventListener('scroll', updateTopButton, { passive: true });
backToTop.addEventListener('click', () => {
    window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    document.querySelector('.nav-brand').focus({preventScroll:true});
});
updateTopButton();
document.getElementById('copyrightYear').textContent = new Date().getFullYear();
document.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    const href = link.getAttribute('href') || '';
    if (href.startsWith('#')) trackEvent('section_navigation', 'Navigation', href.slice(1));
    else if (link.hasAttribute('download')) trackEvent('download', 'PDF', link.textContent.trim());
    else if (href.startsWith('mailto:') || href.startsWith('tel:')) trackEvent('click', 'Contact', link.textContent.trim());
    else if (link.target === '_blank') trackEvent('click', 'External Link', link.textContent.trim());
}));
