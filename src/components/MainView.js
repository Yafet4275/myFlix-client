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

export function MainView() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBookClick = (selectedBook) => {
    console.log("Selected Book:", selectedBook);
    // 
  };

  useEffect(() => {
    fetch("https://openlibrary.org/search.json?q=star+wars")
      .then(response => response.json())
      .then(data => {
        const booksFromApi = data.docs.map(doc => ({
          id: doc.key,
          title: doc.title,
          image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
          author: doc.author_name?.[0]
        }));
        setBooks(booksFromApi);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  return (
    <div>
      <hr />
      <h2>Book List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <hr />
          {books.map(book => (
            <BookCard key={book.id} book={book} onClick={handleBookClick} />
          ))}
        </div>
      )}
    </div>
  );
}