import * as React from 'react';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { Pokemon } from './interface';

function usePokemonSource() {
  // const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  type PokemonState = {
    pokemon: Pokemon[];
    search: string;
    setSearch: (search: string) => void;
  };
  type PokemonAction =
    | {
        type: 'setPokemon';
        payload: Pokemon[];
      }
    | {
        type: 'setSearch';
        payload: string;
      };

  const setSearch = React.useCallback(
    (search: string) =>
      dispatch({
        type: 'setSearch',
        payload: search,
      }),
    []
  );

  const [{ pokemon, search }, dispatch] = useReducer(
    (state: PokemonState, action: PokemonAction) => {
      switch (action.type) {
        case 'setPokemon':
          return { ...state, pokemon: action.payload };
        case 'setSearch':
          return { ...state, search: action.payload };
      }
    },
    {
      pokemon: [],
      search: '',
      setSearch: setSearch,
    }
  );

  useEffect(() => {
    console.log('running');
    fetch(
      'https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json'
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => dispatch({ type: 'setPokemon', payload: data }));
  }, []);

  const filteredPokemon = useMemo(
    () => pokemon.filter((p) => p.name.english.includes(search)),
    [pokemon, search]
  );
  const sortedPokemon = useMemo(
    () =>
      filteredPokemon.sort((a, b) =>
        a.name.english.localeCompare(b.name.english)
      ),
    [pokemon, search]
  );

  return { pokemon: sortedPokemon, search, setSearch };
}

const PokemonContext = createContext<ReturnType<typeof usePokemonSource> | undefined>({} as unknown as ReturnType<typeof usePokemonSource>);

export function usePokemon() {
  const ctxData = useContext(PokemonContext);
  if (ctxData)
    return ctxData;
  else
    return { pokemon: [], search: "", setSearch: (search: string) => {} };
}

export function PokemonProvider({ children }: { children: React.ReactNode }) {
  return (
    <PokemonContext.Provider value={usePokemonSource()}>
      {children}
    </PokemonContext.Provider>
  );
}
