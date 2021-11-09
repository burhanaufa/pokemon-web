import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_DETAIL, GET_POKEMONS } from "../graphQl/queries.js";
import Arrow from "../../components/Icon/IconArrow";
import Modal from "../../components/modal";
import ArrowRight from "../../components/Icon/IconArrowRight";

const Container = styled.div`
	padding: 0 2rem;
	margin-top: 20px;
`;

const Main = styled.div`
	display: flex;
	@media (max-width: 600px) {
		flex-direction: column;
	}
`;

const WrapperNavigation = styled.div`
	margin-bottom: 10px;
	color: #455dc7;
	font-size: 20px;
`;

const CardDetail = styled.div`
	padding: 10px 20px;
	text-align: center;
	color: inherit;
	text-decoration: none;
	border: 1px solid #eaeaea;
	border-radius: 10px;
	width: 30%;
	height: 50%;
	transition: color 0.15s ease, border-color 0.15s ease;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	margin-right: 20px;

	@media (max-width: 600px) {
		width: 100%;
		margin-bottom: 20px;
	}
`;

const CardStat = styled.div`
	padding: 10px 20px;
	color: inherit;
	text-decoration: none;
	border: 1px solid #eaeaea;
	border-radius: 10px;
	width: 70%;
	margin-left: auto;
	transition: color 0.15s ease, border-color 0.15s ease;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

	@media (max-width: 600px) {
		width: 100%;
	}
`;

const Border = styled.div`
	border: 1px solid #eaeaea;
	border-radius: 50px;
	margin: 10px 0;
	font-size: 30px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	background-color: gainsboro;
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const BorderType = styled(Border)`
	background-color: azure;
`;

const BorderStat = styled(Border)`
	background-color: lavender;
	border-radius: 10px;
	text-align: center;

	@media (max-width: 600px) {
		font-size: 20px;
	}
`;

const WrapperAbility = styled.div`
	display: flex;
	flex-wrap: wrap;
`;
const BorderAbility = styled(Border)`
	width: auto;
	padding: 0px 20px;
	margin-right: 10px;
	background-color: lightcyan;

	@media (max-width: 600px) {
		font-size: 20px;
	}
`;

const BorderMoves = styled(Border)`
	width: auto;
	padding: 0px 20px;
	margin-right: 10px;
	background-color: white;
	font-size: 14px;
`;

const CustomImage = styled(Image)`
	height: 20px;
	width: 20px;
	margin: 0;
`;

const ButtonCatch = styled.button`
	cursor: pointer;
	font-size: 30px;
	margin-top: 20px;
	width: 30%;
	background-color: #455dc7;
	color: white;
	border: 1px solid white;
	border-radius: 10px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	@media (max-width: 600px) {
		width: 100%;
	}

	:hover,
	:focus {
		color: #0070f3;
		background-color: white;
		border-color: #0070f3;
	}
`;

const DetailPokemon = () => {
	const [showDetailModal, setShowDetailModal] = useState(false);
	const [pokemonName, setPokemonName] = useState("");
	const [myPokemons, setMyPokemons] = useState([]);
	const [probability, setProbability] = useState(null);
	const router = useRouter();
	const pokemonNames = router.query.pokemon;
	const pokeName = {
		name: pokemonNames,
	};

	const { data, loading, error } = useQuery(GET_POKEMON_DETAIL, {
		variables: pokeName,
	});
	const limits = {
		limit: 100,
	};
	const names = data && data.pokemon && data.pokemon.name;
	const types = data && data.pokemon && data.pokemon.types;
	const height = data && data.pokemon && data.pokemon.height;
	const weight = data && data.pokemon && data.pokemon.weight;
	const abilities = data && data.pokemon && data.pokemon.abilities;
	const moves = data && data.pokemon && data.pokemon.moves;
	const spritesFront =
		data &&
		data.pokemon &&
		data.pokemon.sprites &&
		data.pokemon.sprites.front_default;

	let obj = {
		pokemon: names,
		image: spritesFront,
		name: pokemonName,
	};

	const {
		data: listPokemon,
		loading: listLoading,
		error: listError,
	} = useQuery(GET_POKEMONS, {
		variables: limits,
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			if (probability < 0.5 && probability !== null) {
				setShowDetailModal(false);
				router.push("/");
			}
		}, 5000);
		return () => clearTimeout(timer);
	}, [showDetailModal, probability, router]);

	useEffect(() => {
		const storedData = localStorage.getItem("myPokemons");
		if (storedData) {
			setMyPokemons(JSON.parse(storedData));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("myPokemons", JSON.stringify(myPokemons));
	}, [myPokemons]);

	if (loading) {
		return <h2>Loading...</h2>;
	}

	if (error) {
		console.error(error);
		return null;
	}

	const pokemonCardDetail = () => {
		if (!loading && !listLoading) {
			const listPokemons =
				listPokemon && listPokemon.pokemons && listPokemon.pokemons.results;
			const findPokemon = listPokemons.find(
				(item) => item.name === data.pokemon.name
			);

			return (
				<CardDetail>
					<Border>{names.toUpperCase()}</Border>
					<CustomImage
						src={findPokemon.dreamworld}
						alt={findPokemon.id}
						width={16}
						height={16}
						layout="responsive"
						objectFit="contain"
					/>
					{types.map((item) => (
						<BorderType key={item.type.name}>
							{item.type.name.toUpperCase()}
						</BorderType>
					))}
				</CardDetail>
			);
		}
		return null;
	};

	const onClickCatch = () => {
		setShowDetailModal(true);
		setProbability(Math.random());
	};

	const onClickBack = () => {
		router.push("/");
	};

	const onHandleChangeName = (e) => {
		setPokemonName(e.target.value);
	};

	const onSubmit = (e) => {
		if (myPokemons.find((item) => item.name === pokemonName)) {
			e.preventDefault();
			return alert("Cannot have same Nickname");
		} else {
			e.preventDefault();
			setShowDetailModal(false);
			setMyPokemons([...myPokemons, obj]);
			router.push("/mypokemon");
		}
	};

	return (
		<div>
			{showDetailModal && (
				<Modal
					probability={probability}
					names={names}
					pokemonName={pokemonName}
					handleChangeName={onHandleChangeName}
					onSubmit={onSubmit}
				/>
			)}
			<Container>
				<WrapperNavigation>
					<span
						onClick={() => onClickBack()}
						style={{ cursor: "pointer", marginRight: "6px" }}
					>
						<Arrow />
					</span>
					Back
					<span
						onClick={() => router.push("/mypokemon")}
						style={{ cursor: "pointer", marginLeft: "6px", float: "right" }}
					>
						<ArrowRight />
					</span>
					<span style={{ float: "right" }}>To My Pokemon</span>
				</WrapperNavigation>

				<Main>
					{pokemonCardDetail()}
					<CardStat>
						<BorderStat> Pokemon Stats and Abilities </BorderStat>
						<WrapperAbility>
							<div> Height : </div>
							<BorderAbility>{height} </BorderAbility>
							<div> Weight : </div>
							<BorderAbility>{weight} </BorderAbility>
						</WrapperAbility>
						<span> Abilities : </span>
						<WrapperAbility>
							{abilities.map((ability) => (
								<BorderAbility key={ability.ability.name}>
									{ability.ability.name.toUpperCase()}
								</BorderAbility>
							))}
						</WrapperAbility>
						<span> Moves : </span>
						<WrapperAbility>
							{moves.map((move) => (
								<BorderMoves key={move.move.name}>{move.move.name}</BorderMoves>
							))}
						</WrapperAbility>
					</CardStat>
				</Main>
				<ButtonCatch onClick={() => onClickCatch()}>Catch em</ButtonCatch>
			</Container>
		</div>
	);
};

export default DetailPokemon;
