// SEARCHBAR
const form = document.getElementById('searchbar-form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const val = document.getElementById('searchbar').value.toLowerCase();
        if (!val) return;

        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${val}`);
        if (!res.ok) return;
        const data = await res.json();

        window.location.href = `/pokemon/${data.id}`;
    });
}

// LIKE BUTTON
const heart = document.querySelector('.heart');
if (heart) {
    // Bij laden: check of al geliked
    const id = heart.dataset.id;
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.some(p => p.id === id)) {
        heart.closest('.heart-icon-container').classList.add('on');
    }

    // Bij klik: toggle + opslaan
    heart.addEventListener('click', function() {
        const container = this.closest('.heart-icon-container');
        container.classList.toggle('on');

        const id = this.dataset.id;
        const name = this.dataset.name;
        const image = this.dataset.image;

        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        if (container.classList.contains('on')) {
            favorites.push({ id, name, image });
        } else {
            favorites = favorites.filter(p => p.id !== id);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
    });
}

// FAVORITES PAGINA
const favContainer = document.getElementById('favorites-container');
if (favContainer) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favorites.length === 0) {
        favContainer.innerHTML = '<p>Geen favorieten opgeslagen.</p>';
    } else {
        favContainer.innerHTML = favorites.map(p => `
            <a href="/pokemon/${p.id}">
                <article class="pokemon-card">
                    <img src="${p.image}" alt="${p.name}">
                    <div class="pokemon-name-container">
                        <span>${p.name}</span>
                    </div>
                </article>
            </a>
        `).join('');
    }
}

// TAB INDICATOR
const indicator = document.querySelector('.tab-indicator');
if (indicator) {
    const tabs = document.querySelectorAll('.pokemon-details-tab a');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            indicator.style.left = `${index * 33.33}%`;
        });
    });

    const hash = window.location.hash || '#about';
    const activeIndex = ['#about', '#stats', '#evolution'].indexOf(hash);
    if (activeIndex !== -1) indicator.style.left = `${activeIndex * 33.33}%`;
}


// TAB ACTIVE STATE
const tabLinks = document.querySelectorAll('.pokemon-details-tab a');
if (tabLinks.length) {
    const indicator = document.querySelector('.tab-indicator');

    const setActive = (hash) => {
        tabLinks.forEach(a => {
            const isActive = a.getAttribute('href') === hash;
            a.classList.toggle('active', isActive);
            if (isActive && indicator) {
                indicator.style.left = a.offsetLeft + 'px';
                indicator.style.width = a.offsetWidth + 'px';
            }
        });
    };

    setActive(window.location.hash || '#about');

    tabLinks.forEach(a => {
        a.addEventListener('click', () => setActive(a.getAttribute('href')));
    });
}