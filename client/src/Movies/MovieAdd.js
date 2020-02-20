import React, { useContext } from 'react';
import axios from "axios";

// IMPORT CONTEXT: MovieContext
import MovieContext from "../contexts/MovieContext";

const MovieAdd = props => {

	const {movie, setMovie, savedList, setSavedList, movieItem}   = useContext(MovieContext);

	const handleChange = ev => {
		let value = ev.target.value;
		if (ev.target.name === "metascore") {
			value = parseInt(value, 10);
		}

		setMovie({
			...movie,
			[ev.target.name]: value,
		});
	};

	const handleStars = event => {
		setMovie({
			...movie,
			stars: [event.target.value],
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		setMovie({ ...movie });
		axios
			.post("http://localhost:5001/api/movies/", movie)
			.then(response => {
				console.log("Response, Add: ", response.data);
				setMovie(movieItem);
				props.history.push("/");
			})
			.catch(error => {
				console.log("Error adding movie!", error);
			});
	};

	return (
		<div>
			<h2 className="form">Add Movie</h2>
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
export default MovieAdd;