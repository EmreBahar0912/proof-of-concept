import express from 'express'

import { Liquid } from 'liquidjs';

const app = express()

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express()); 

app.set('views', './views')

app.get('/', async function (request, response) {
    const pokemonResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
    const pokemonData = await pokemonResponse.json();
    
    const allPokemon = pokemonData.results.map((p) => {
        const id = p.url.split('/').filter(Boolean).pop();
        return {
            name: p.name,
            id: id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        }
    });

   response.render('index.liquid', { pokemons: allPokemon })
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

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})