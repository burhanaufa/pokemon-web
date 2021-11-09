/* eslint-disable @next/next/no-img-element */
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Arrow from "../../components/Icon/IconArrow";
import Trash from "../../components/Icon/IconTrash";

const Container = styled.div`
	padding: 0 2rem;
	margin-top: 20px;
`;

const WrapperMain = styled.div`
	padding: 10px 20px;
	color: inherit;
	text-decoration: none;
	border: 1px solid #eaeaea;
	border-radius: 10px;
	width: 100%;
	margin-left: auto;
	transition: color 0.15s ease, border-color 0.15s ease;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

	@media (max-width: 600px) {
		width: 100%;
	}
`;

const WrapperNavigation = styled.div`
	margin-bottom: 10px;
	color: #455dc7;
	font-size: 20px;
`;

const Border = styled.div`
	border: 1px solid #eaeaea;
	border-radius: 50px;
	margin: 10px 0;
	font-size: 30px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	background-color: aliceblue;
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	text-align: center;

	@media (max-width: 600px) {
		font-size: 20px;
	}
`;

const Grid = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: nowrap;
`;

const ButtonRelease = styled.button`
	flex-direction: column;
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
	@media (max-width: 600px) {
		margin: 0.25em;
		width: 136px;
	}
`;

const Text = styled.div`
	font-size: 20px;
	margin: 6px 0px;
`;

const Mypokemon = () => {
	const [myPokemons, setMyPokemons] = useState([]);
	console.log(myPokemons);
	const router = useRouter();
	useEffect(() => {
		const storedData = localStorage.getItem("myPokemons");
		if (storedData) {
			setMyPokemons(JSON.parse(storedData));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("myPokemons", JSON.stringify(myPokemons));
	}, [myPokemons]);

	const onDeletePokemon = (key) => {
		setMyPokemons(myPokemons.filter((d) => d.name !== key.name));
	};

	return (
		<Container>
			<WrapperNavigation>
				<span
					onClick={() => router.push("/")}
					style={{ cursor: "pointer", marginRight: "6px" }}
				>
					<Arrow />
				</span>
				To Pokemon List
			</WrapperNavigation>
			<WrapperMain>
				<Border>YOUR POKEMON PAGE</Border>
				{myPokemons.length === 0 ? (
					<h3 style={{ textAlign: "center" }}>
						You Dont Have any Pokemon... Go Catch em All{" "}
					</h3>
				) : (
					<Grid>
						{myPokemons.map((pokemon) => (
							<>
								<Card key={pokemon.name}>
									<h3
										onClick={() =>
											router.push(`/detail?pokemon=${pokemon.pokemon}`)
										}
									>
										{pokemon.pokemon.toUpperCase()}
									</h3>
									<img
										onClick={() =>
											router.push(`/detail?pokemon=${pokemon.pokemon}`)
										}
										src={pokemon.image}
										alt={pokemon.id}
									/>
									<Text>{pokemon.name}</Text>
									<span
										key={pokemon.name}
										onClick={() => onDeletePokemon(pokemon)}
									>
										<Trash />
									</span>
								</Card>
							</>
						))}
					</Grid>
				)}
			</WrapperMain>
		</Container>
	);
};

export default Mypokemon;
