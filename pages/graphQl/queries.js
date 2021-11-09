import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
	query Pokemons($limit: Int) {
		pokemons(limit: $limit) {
			results {
				id
				name
				image
				dreamworld
			}
		}
		types {
			results {
				id
				name
			}
		}
	}
`;

export const GET_POKEMON_DETAIL = gql`
	query Pokemon($name: String!) {
		pokemon(name: $name) {
			name
			id
			stats {
				stat {
					name
					id
				}
				base_stat
				effort
			}
			abilities {
				ability {
					name
				}
			}
			forms {
				name
			}
			moves {
				move {
					name
				}
			}
			height
			types {
				type {
					name
				}
			}
			weight
			species {
				name
			}
			sprites {
				front_default
				back_default
			}
		}
	}
`;
