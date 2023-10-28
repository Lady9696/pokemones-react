import { useState } from "react";
import axios from "axios";

const Pokemon = () => {
  const [nombre, setNombre] = useState("");
  const [infoPokemon, setInfoPokemon] = useState(null);

  const handleNamePokemon = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
      setInfoPokemon(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Hubo un error al obtener la información del Pokemon:", error);
      setInfoPokemon(null);
    }
  }

  return (
    <div>
      <form onSubmit={handleNamePokemon}>
        <input
          type="text"
          placeholder="Ingresa el nombre del Pokémon"
          value={nombre}
          onChange={(event) => {
            setNombre(event.target.value);
          }}
        />
        <button type="submit">Consulta</button>
      </form>

      {infoPokemon && (
        <div>
          <h3>{infoPokemon.name}</h3>
          <img src={infoPokemon.sprites.front_default} alt={infoPokemon.name} />
          <p>Altura: {infoPokemon.height}</p>
          <p>Peso: {infoPokemon.weight}</p>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
