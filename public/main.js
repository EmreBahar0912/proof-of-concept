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


document.querySelector('.heart').addEventListener('click', function() {
    this.closest('.heart-icon-container').classList.toggle('on');
});