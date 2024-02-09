import React, { useState, useEffect } from 'react';
import { BookCard } from './BookCard';


export class Hello extends React.Component {
  // code executed right when the component is created
  constructor() {
    super();
    this.state = { currentDate: new Date() };
  }

  // code executed right after the component is added to the DOM.
  componentDidMount() {
    const interval = setInterval(() => {
      this.setState({ currentDate: new Date() });
    }, 1000);

    this.setState({ interval });
  }

  // code executed just before the moment the component gets removed from the DOM.
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <h1>
        Hello, {this.props.name}! The time is:
        {this.state.currentDate.toLocaleTimeString()}
      </h1>
    );
  }
}

export function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://my-flix-app-yafet-1527256b5000.herokuapp.com/movies")
      .then(response => response.json())
      .then(data => {
        console.log("Movies from API:", data); // Log the received data
        setMovies(data);
    })
    .catch(error => {
      console.error('Error fetching movies:', error);
    });
  }, []);
  return (
    <div>
      <h2>Movies</h2>
      {movies.map(movie => (
        <div key={movie._id}>
          <h3>Title: {movie.Title}</h3>
          <p>Year: {movie.Year}</p>
          <p>Director: {movie.Director.Name}</p>
          <p>Genre: {movie.Genre.Name}</p>
          <p>Description: {movie.Description}</p>
          {/* Add .... */}
        </div>
      ))}
    </div>
  );
}

// export function Movies() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const handleBookClick = (selectedBook) => {
//     console.log("Selected Book:", selectedBook);
//     // 
//   };

//   useEffect(() => {
//     fetch("https://openlibrary.org/search.json?q=star+wars")
//       .then(response => response.json())
//       .then(data => {
//         console.log("Movies from API:", data);
//         const booksFromApi = data.docs.map(doc => ({
//           id: doc.key,
//           title: doc.title,
//           image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
//           author: doc.author_name?.[0]
//         }));
//         setBooks(booksFromApi);
//         setLoading(false); // Set loading to false once data is fetched
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setLoading(false); // Set loading to false on error
//       });
//   }, []);

//   return (
//     <div>
//       <hr />
//       <h2>Book List</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           <hr />
//           {books.map(book => (
//             <BookCard key={book.id} book={book} onClick={handleBookClick} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }