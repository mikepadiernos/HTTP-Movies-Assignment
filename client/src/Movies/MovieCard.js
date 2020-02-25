import React from 'react';

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  return (
    <div className="card-container">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <div className="movie-actors">
          <h3>Actors</h3>
          {stars.map(star => (
            <div key={stars.index} className="movie-star">
              {star}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
