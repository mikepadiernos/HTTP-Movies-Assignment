import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
export default class SavedList extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <header id="header" className="header">
        <div className="container">
          <h3>Saved Movies:</h3>
          {this.props.list.map(movie => {
            return (
              <NavLink
                to={`/movies/${movie.id}`}
                key={movie.id}
                activeClassName="saved-active"
              >
                <span className="saved-movie">{movie.title}</span>
              </NavLink>
            );
          })}
          <div className="button-group no-margin">
            <Link to="/" className="button"><span>Home</span></Link>
            <Link to="/movies/add" className="button"><span>Add Movie</span></Link>
          </div>
        </div>
      </header>
    );
  }
}
