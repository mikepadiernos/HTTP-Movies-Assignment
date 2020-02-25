import React, { useContext } from 'react';
import axios from "axios";

// IMPORT CONTEXT: MovieContext
import MovieContext from "../contexts/MovieContext";

const MovieAdd = props => {

	const {movie, setMovie, movieItem}   = useContext(MovieContext);

	const handleChange = event => {
		let value = event.target.value;
		if (event.target.name === "metascore") {
			value = parseInt(value, 10);
		}

		setMovie({
			...movie,
			[event.target.name]: value,
		});
	};

	const handleStarsAdd = event => {
		setMovie({
			...movie,
			stars: event.target.value.split(",\n"),
		})
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
				<br/>
				<input
					name="title"
					type="text"
					onChange={handleChange}
					value={movie.title}
				/>
				<br/>
				<label>Director</label>
				<br/>
				<input
					name="director"
					type="text"
					onChange={handleChange}
					value={movie.director}
				/>
				<br/>
				<label>Metascore</label>
				<br/>
				<input
					name="metascore"
					type="text"
					onChange={handleChange}
					value={movie.metascore}
				/>
				<br/>
				<label>Stars</label>
				<br/>
				<textarea
					name="stars"
					id="stars"
					cols="30"
					rows="10"
					onChange={handleStarsAdd}
					value={movie.stars.map(row=>row).join(`,\n`)}
				/>
				<br/>
				<button>Submit</button>
			</form>
		</div>
	);
};
export default MovieAdd;