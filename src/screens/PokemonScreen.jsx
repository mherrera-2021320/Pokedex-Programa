import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getPokemonDetailsApi } from '../api/pokemon'
import PokemonHeader from '../components/Pokemon/PokemonHeader';
import PokemonStats from '../components/Pokemon/PokemonStats';
import PokemonType from '../components/Pokemon/PokemonType';

export default function PokemonScreen({ navigation, route: { params } }) {

  const [pokemon, setPokemon] = useState(null)
  const { id } = params;
  //console.log(params);

  // se ejeuta cada ves que lleva un parametro diferente (params cambia su valor)
  useEffect(() => {
    (async () => {
      try {
        const respuesta = await getPokemonDetailsApi(id);
        setPokemon(respuesta)
      } catch (error) {
        navigation.goBack()
      }
    })()

  }, [params])

  if (!pokemon) return null;

  return (
    <View>

      <ScrollView>
        <PokemonHeader 
        nombre={pokemon.name}
        numero={pokemon.order}
        image={pokemon.sprites.other["official-artwork"].front_default }
        tipo={pokemon.types[0].type.name}
        />
        <PokemonType tipos={pokemon.types} />
        <PokemonStats estadisticas={pokemon.stats} />

      </ScrollView>

    </View>
  )
}