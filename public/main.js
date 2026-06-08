document.getElementById('searchbar-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const val = document.getElementById('searchbar').value.toLowerCase();
  if (!val) return;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${val}`);
  if (!res.ok) return;
  const data = await res.json();

  window.location.href = `/pokemon/${data.id}`;
});