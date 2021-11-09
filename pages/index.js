/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../graphQl/queries.js";
import ArrowRight from "../components/Icon/IconArrowRight";

const Container = styled.div`
	padding: 0 2rem;
`;

const WrapperNavigation = styled.div`
	margin-bottom: 10px;
	color: #455dc7;
	font-size: 20px;
`;

const Main = styled.main`
	min-height: 100vh;
	padding: 2rem 0;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Border = styled.div`
	border: 1px solid #eaeaea;
	border-radius: 50px;
	margin: 10px 0;
	font-size: 30px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	background-color: gainsboro;
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	width: 60%;
	text-align: center;

	@media (max-width: 600px) {
		font-size: 20px;
		width: 100%;
	}
`;

const Grid = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	max-width: 1000px;
`;

const Card = styled.div`
	text-align: center;
	margin: 0.5rem;
	color: inherit;
	text-decoration: none;
	border: 1px solid #eaeaea;
	border-radius: 10px;
	transition: color 0.15s ease, border-color 0.15s ease;
	width: 150px;
	box-shadow: 0 4px 8px 0 lavender;
	cursor: pointer;

	:hover,
	:focus,
	:active {
		color: #0070f3;
		border-color: #0070f3;
	}
`;

const limits = {
	limit: 100,
};

export default function Home() {
	const { data, loading, error } = useQuery(GET_POKEMONS, {
		variables: limits,
	});
	const listPokemons = data && data.pokemons && data.pokemons.results;
	const router = useRouter();
	if (loading) {
		return <h2>Loading...</h2>;
	}

	if (error) {
		console.error(error);
		return null;
	}

	return (
		<Container>
			<Head>
				<title>Pokemon App</title>
			</Head>

			<Main>
				<WrapperNavigation>
					<span
						onClick={() => router.push("/mypokemon")}
						style={{ cursor: "pointer", marginLeft: "6px", float: "right" }}
					>
						<ArrowRight />
					</span>
					<span style={{ float: "right" }}>To My Pokemon</span>
				</WrapperNavigation>
				<Border>Welcome to Pokemon World</Border>
				{!loading && (
					<Grid>
						{listPokemons.map((pokemon) => (
							<Card
								key={pokemon.id}
								onClick={() => router.push(`/detail?pokemon=${pokemon.name}`)}
							>
								<h3>{pokemon.name.toUpperCase()}</h3>
								<img src={pokemon.image} alt={pokemon.id} />
							</Card>
						))}
					</Grid>
				)}
			</Main>
		</Container>
	);
}
