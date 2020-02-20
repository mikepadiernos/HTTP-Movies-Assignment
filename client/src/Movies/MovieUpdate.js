import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// IMPORT CONTEXT: MovieContext
import MovieContext from "../contexts/MovieContext";

const MovieUpdate = props => {

	const {movie, setMovie, savedList, setSavedList, movieItem}   = useContext(MovieContext);
	const { id } = useParams();


	useEffect(() => {
		axios
			.get(`http://localhost:5001/api/movies/${id}`)
			.then(response => {
				console.log("Response, Update: ", response);
				setMovie(response.data)
			})
			.catch(error => {
				console.log("Error updating movie! ", error);
			})
	}, [id]);

	const handleChange = event => {
		event.persist();
		let value = event.target.value;
		if (event.target.name === 'metascore') {
			value = parseInt(value, 10);
		}

		setMovie({
			...movie,
			[event.target.name]: value
		});
	};

	const handleStarsUpdate = event => {
		setMovie({
			...movie,
			stars: event.target.value.split(",\n"),
		})
	};

	const handleSubmit = e => {
		e.preventDefault();
		axios
			.put(`http://localhost:5001/api/movies/${id}`, movie)
			.then(response => {
				setMovie(movieItem);
				props.history.push('/')
			})
			.catch(error => console.log(error))
	};

	return (
		<div>
			<h2 className="form">Update Movie</h2>
			<form onSubmit={handleSubmit} className="form">
				<label>Title</label>
				<br />
				<input
					name="title"
					type="text"
					onChange={handleChange}
					value={movie.title}
				/>
				<br />
				<label>Director</label>
				<br />
				<input
					name="director"
					type="text"
					onChange={handleChange}
					value={movie.director}
				/>
				<br />
				<label>Metascore</label>
				<br />
				<input
					name="metascore"
					type="text"
					onChange={handleChange}
					value={movie.metascore}
				/>
				<br />
				<label>Stars</label>
				<br />
				<textarea
					name="stars"
					id="stars"
					cols="30"
					rows="10"
					onChange={handleStarsUpdate}
					value={movie.stars.map(r=>r).join(`,\n`)}
				/>
				<br />
				<button>Submit</button>
			</form>
		</div>
	);
};

export default MovieUpdate;