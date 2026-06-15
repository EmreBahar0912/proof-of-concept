import express from 'express'

import { Liquid } from 'liquidjs';

const app = express()

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express()); 

app.set('views', './views')

app.get('/', async function (request, response) {
    const page = parseInt(request.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    const type = request.query.type;

    let allPokemon = [];
    let totalPages = 1;

    if (type) {
        const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const typeData = await typeResponse.json();

        allPokemon = typeData.pokemon.map(({ pokemon }) => {
            const id = pokemon.url.split('/').filter(Boolean).pop();
            return {
                name: pokemon.name,
                id,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            };
        });

        totalPages = Math.ceil(allPokemon.length / limit);
        allPokemon = allPokemon.slice(offset, offset + limit);
    } else {
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const pokemonData = await pokemonResponse.json();

        allPokemon = pokemonData.results.map((p) => {
            const id = p.url.split('/').filter(Boolean).pop();
            return {
                name: p.name,
                id,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            };
        });

        totalPages = Math.ceil(pokemonData.count / limit);
    }

    response.render('index.liquid', { pokemons: allPokemon, page, totalPages, type });
})

app.get('/pokemon/:id', async function (request, response) {
    const id = request.params.id;
    
    // Pokémon data
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await pokemonResponse.json();
    
    // Species voor evolution chain URL
    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const species = await speciesResponse.json();
    
    // Evolution chain
    const evoResponse = await fetch(species.evolution_chain.url);
    const evoData = await evoResponse.json();
    
    // Evolutions uit de chain halen
    const evolutions = [];
    let current = evoData.chain;
    
    while (current) {
        const evoId = current.species.url.split('/').filter(Boolean).pop();
        evolutions.push({
            name: current.species.name,
            id: evoId,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evoId}.png`
        });
        // volgende evolutie
        current = current.evolves_to[0];
    }
    
    response.render('detailview.liquid', { pokemon, evolutions })
})

app.get('/favorites', (req, res) => {
    res.render('favorites.liquid');
});

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})