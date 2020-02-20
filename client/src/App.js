import React, { useState }  from "react";
import { Route }            from "react-router-dom";

// IMPORT CONTEXT
import MovieContext         from "./contexts/MovieContext";

// IMPORT APP COMPONENTS
import SavedList            from "./Movies/SavedList";
import MovieList            from "./Movies/MovieList";
import Movie                from "./Movies/Movie";
import MovieUpdate          from "./Movies/MovieUpdate";
import MovieAdd             from "./Movies/MovieAdd";

const App = () => {

  const movieItem = {
    title:      "",
    director:   "",
    metascore:  "",
    stars:      [],
  };

  const [movie, setMovie]           = useState(movieItem);
  const [savedList, setSavedList]   = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <MovieContext.Provider value={{movie, setMovie, savedList, setSavedList, movieItem}}>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie
            {...props}
            addToSavedList={addToSavedList}
          />
        }}
      />
      <Route
        path="/movies/:id/update"
        render={props => {
          return <MovieUpdate
            {...props}
            addToSavedList={addToSavedList}
          />
        }}
      />
      <Route
        path="/movies/add"
        render={props => {
          return <MovieAdd
            {...props}
            addToSavedList={addToSavedList}
          />
        }}
      />
    </MovieContext.Provider>
  );
};

export default App;
