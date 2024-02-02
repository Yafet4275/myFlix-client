import React from 'react';
import './App.css';
import {MainView} from './components/MainView';
import MovieView from './components/MovieView';
import MovieCard from './components/MovieCard';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'main', // Set the initial view to 'main'
      selectedMovie: null, // Store the selected movie
    };
  }

  // Function to handle when a movie card is clicked
  handleMovieClick = (movie) => {
    this.setState({
      currentView: 'movie',
      selectedMovie: movie,
    });
  };

  // Function to handle navigating back to the main view
  handleBackToMain = () => {
    this.setState({
      currentView: 'main',
      selectedMovie: null,
    });
  };

  render() {
    const { currentView, selectedMovie } = this.state;

    return (
      <div className="container">
        <div className='title'><h1>My Flix App</h1></div>
        <div className='content'>
        {/* Render the appropriate view based on the current state */}
        {currentView === 'main' && <MainView onMovieClick={this.handleMovieClick} />}
        {currentView === 'movie' && (
          <MovieView movie={selectedMovie} onBackToMain={this.handleBackToMain} />
        )}
        </div>
      </div>
    );
  }
}

export default App;

