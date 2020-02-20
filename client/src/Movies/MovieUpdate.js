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
			.get(`http://localhost:5000/api/movies/${id}`)
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

	const handleStars = event => {
		setMovie({
			...movie,
			stars: [event.target.value],
		})
	}

	const handleSubmit = e => {
		e.preventDefault();
		axios
			.put(`http://localhost:5000/api/movies/${id}`, movie)
			.then(res => {
				setMovie(movieItem)
				props.history.push('/')
			})
			.catch(err => console.log(err))
	};

	return (
		<div>
			<h2 className="form">Update Movie</h2>
			<form onSubmit={handleSubmit} className="form">
				<label>Title</label>
				<input
					name="title"
					type="text"
					onChange={handleChange}
					value={movie.title}
				/>
				<label>Director</label>
				<input
					name="director"
					type="text"
					onChange={handleChange}
					value={movie.director}
				/>
				<label>Metascore</label>
				<input
					name="metascore"
					type="text"
					onChange={handleChange}
					value={movie.metascore}
				/>
				<label>Stars</label>
				<input
					type="text"
					name="Stars"
					onChange={handleStars}
					value={movie.stars}
				/>
				<button>Submit</button>
			</form>
		</div>
	);
};

export default MovieUpdate;