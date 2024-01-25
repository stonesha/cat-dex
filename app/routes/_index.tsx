import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { pokeapi } from "~/pokemon";
import PokeImage from "~/components/PokeImage";
import { Link } from "@remix-run/react";

export const loader = async () => {
  // won't fetch all pokemon if there are ever 3000 pokemon 
  const pokemon_list = await pokeapi.listPokemons(undefined, 3000);

  // sprite urls aren't served through api, have to get id of pokemon and then append to github url
  const pokemon_sprites = pokemon_list.results.map(pokemon => {
    const url_parts = pokemon.url.split("/")
    const index = url_parts[url_parts.length - 2]

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`
  })

  return json({ pokemon_list, pokemon_sprites });
};

export const meta: MetaFunction = () => {
  return [
    { title: "cat-dex" },
    { name: "description", content: "smol pokedex" },
  ];
};

export default function Index() {
  const { pokemon_list, pokemon_sprites } = useLoaderData<typeof loader>();

  return (
    <div className="grid grid-cols-5 items-center">
      {pokemon_list.results.map((pokemon, index) =>
        <Link to={`/pokemon/${index + 1}`} key={pokemon.name} className="m-4 p-2 rounded-md border flex flex-col justify-center items-center 
          hover:border-black hover:shadow-md hover:cursor-pointer">
          <PokeImage src={pokemon_sprites[index]} pokemon_name={pokemon.name} />
          {pokemon.name}
        </Link>)}
    </div>
  );
}
