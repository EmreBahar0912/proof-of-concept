document.getElementById('searchbar').addEventListener('input', async (e) => {
  const val = e.target.value;
  if (val.length < 2) return;

  const res = await fetch(`/search?q=${val}`);
  const pokemon = await res.json();

  const list = document.getElementById('suggestions');
  list.innerHTML = pokemon.map(p => `
    <li><a href="/pokemon/${p.id}">#${p.id} ${p.name}</a></li>
  `).join('');
});