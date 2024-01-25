import { useState } from "react"

type Props = {
  src: string;
  pokemon_name: string;
}

export default function PokeImage({ src, pokemon_name }: Props) {
  const [error, setError] = useState(false)

  return (
    <>
      {
        error ?
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-9">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
          </svg> :
          <img src={src} alt={`${pokemon_name} sprite`} onError={(e) => {
            console.log(e)
            setError(true)
          }} />
      }
    </>
  )
}

