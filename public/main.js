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
document.querySelector('.heart').addEventListener('click', function() {
    this.closest('.heart-icon-container').classList.toggle('on');
});

// ONCLICK SAVE POKEMON
document.querySelector('.heart').addEventListener('click', function() {
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