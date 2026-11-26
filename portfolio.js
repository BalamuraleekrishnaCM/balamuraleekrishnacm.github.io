const filters = document.querySelector('.filters');
const buttons = [...filters.querySelectorAll('[data-filter]')];
const projects = [...document.querySelectorAll('[data-category]')];
const studio = document.querySelector('[data-studio]');
const status = document.querySelector('#filter-status');

function applyFilter(category) {
    const selected = buttons.find((button) => button.dataset.filter === category);
    if (!selected) return;

    for (const button of buttons) {
        button.setAttribute('aria-pressed', String(button === selected));
    }
    for (const project of projects) {
        project.hidden = category !== 'all' && !project.dataset.category.split(' ').includes(category);
    }
    studio.hidden = !studio.querySelector('[data-category]:not([hidden])');
    const count = projects.filter((project) => !project.hidden).length;
    status.textContent = `${selected.textContent}. ${count} ${count === 1 ? 'project' : 'projects'} shown.`;
}

filters.hidden = false;
filters.addEventListener('click', (event) => {
    const selected = event.target.closest('[data-filter]');
    if (selected) applyFilter(selected.dataset.filter);
});

document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const target = document.getElementById(link.hash.slice(1));
    if (target?.closest('[hidden]')) applyFilter('all');
});
