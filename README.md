# Hypersolid - Pokémon App
<!-- Geef je project een titel en schrijf in één zin wat het is -->

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

### Pokédex App

Een server-side gerenderde Pokédex webapplicatie gebouwd als schoolopdracht bij FDND. Gebruikers kunnen bladeren door Pokémon, filteren op type, zoeken op naam of ID, een detailpagina bekijken en favorieten opslaan.

**Tech stack**
- Runtime: Node.js
- Framework: Express
- Templating: LiquidJS
- Data: PokéAPI
- Client-side opslag: localStorage
- Hosting: Render

### Features

**Overzichtspagina**

- 20 Pokémon per pagina, maximaal 68 pagina's
- Server-side paginering via query parameters

**Filter op type**

- Klikbare type-badges filteren het volledige Pokémon-aanbod
- Gefilterde resultaten hebben eigen paginering
- Bewuste keuze: geen ID-filter vanwege de 10.000+ Pokémon — type is gebruiksvriendelijker

**Zoekbalk**

- Zoeken op naam én op ID
- Compenseert het ontbreken van een ID-filter

**Detailpagina**

- Drie tabs: About, Stats, Evolutions
- CSS-only tab navigatie via :target
- Geanimeerde tab-indicator die meeschuift naar het actieve tabblad
- Dynamische stat progress bars op basis van API-data
- Per-type CSS theming via data-type attributen
- View Transitions voor paginaovergangen
- "Go back" knop om terug te keren naar de overzichtspagina

**Favorieten**

- Pokémon liken via een hartknop
- Opgeslagen in localStorage — blijft bewaard na herladen
- Heart-animatie bij het toevoegen

### Technische details

**Server-side rendering**

Alle data wordt opgehaald en verwerkt op de server via Express en doorgegeven aan LiquidJS templates. Geen client-side fetches voor kernfunctionaliteit.

**In-memory caching**

API-responses worden gecached in het geheugen om herhaalde requests naar de PokéAPI te voorkomen en de laadtijd te verbeteren.

**CSS-only tabs**

Tabnavigatie op de detailpagina werkt zonder JavaScript via de CSS :target selector. De actieve tab wordt gestyled op basis van de URL-hash.

**Per-type theming**

Elk Pokémon-type heeft eigen kleuren. Dit wordt toegepast via een data-type attribuut op de root van de detailpagina, waarmee CSS custom properties per type worden overschreven.

**View Transitions API**

Paginaovergangen maken gebruik van de View Transitions API voor vloeiende animaties, met een progressieve enhancement fallback voor browsers die dit nog niet ondersteunen.

## Installatie
<!-- Bij Instalatie staat hoe een andere developer aan jouw repo kan werken -->

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
