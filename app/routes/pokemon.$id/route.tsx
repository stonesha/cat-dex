import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { pokeapi } from "~/pokemon";

export async function loader({
  params
}: LoaderFunctionArgs) {
  const { id } = params;
  if (!id) {
    throw json("Not Found", { status: 404 })
  }

  const pokemon_id = Number(id)

  const pokemon_data = await pokeapi.getPokemonById(pokemon_id);

  const pokemon_sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon_id}.png`

  return json({ pokemon_data, pokemon_sprite })
}

export default function Pokemon() {
  const { pokemon_data, pokemon_sprite } = useLoaderData<typeof loader>();

  console.log(pokemon_data)

  return (
    <div>
      <h1 className="text-xl text-center font-bold">{pokemon_data.species.name}</h1>
      <div className="flex flex-row">
        <img src={pokemon_sprite} alt={`${pokemon_data.species.name} gif sprite`} />
        <div>
          <p>Abilities</p>
          <ul>
            {pokemon_data.abilities.map(ability => <li>{ability.ability.name}</li>)}
          </ul>
          <hr />
        </div>
      </div>
    </div>
  )
}
