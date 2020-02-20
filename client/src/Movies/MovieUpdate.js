import React from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieUpdate = () => {
	return (
		<section>
			<form>
				<label>Title</label>
				<input type="text"/>
				<label>Director</label>
				<input type="text"/>
				<label>Metascore</label>
				<input type="number"/>
				<button>Submit</button>
			</form>
		</section>
	);
};

export default MovieUpdate;