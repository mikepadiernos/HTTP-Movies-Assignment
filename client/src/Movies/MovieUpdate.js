import React from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieUpdate = () => {

	const [movie, setMovie] = useState(initialItem);
	const { id } = useParams();


	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/movies/${id}`)
			.then(response => {
				console.log(response)
				setMovie(response.data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [id])

	const changeHandler = ev => {
		ev.persist();
		let value = ev.target.value;
		if (ev.target.name === 'metascore') {
			value = parseInt(value, 10);
		}

		setMovie({
			...movie,
			[ev.target.name]: value
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
				setMovie(initialItem)
				props.history.push('/')
			})
			.catch(err => console.log(err))
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
					value={addMovie.title}
				/>
				<label>Director</label>
				<input
					name="director"
					type="text"
					onChange={handleChange}
					value={addMovie.director}
				/>
				<label>Metascore</label>
				<input
					name="metascore"
					type="text"
					onChange={handleChange}
					value={addMovie.metascore}
				/>
				<label>Stars</label>
				<input
					type="text"
					name="Stars"
					onChange={handleStars}
					value={addMovie.stars}
				/>
				<button>Add Movie</button>
			</form>
		</div>
	);
};

export default MovieUpdate;