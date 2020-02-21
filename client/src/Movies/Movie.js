import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5001/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5001/api/movies/${this.state.movie.id}`)
      .then(response => {
        console.log(response);
        this.props.history.push('/')
      })
      .catch (error => console.log(error))
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="movie-buttons button-group no-margin">
          <button className="small" onClick={this.saveMovie}>
            Save
          </button>
          <button className="small" onClick={() => this.props.history.push(`/movies/${this.state.movie.id}/update`)}>
            Edit
          </button>
          <button className="small" onClick={this.handleDelete}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}
