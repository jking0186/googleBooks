import React, { useState } from 'react';
import API from '../utils/API';

function Search() {
    const classes = useStyles();

    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [message, setMessage] = useState("Search for a Book to Get Started!")

    const searchBooks = () => {
        API.search(searchTerm)
            .then(response => {
                setBooks(response.data);
            })
            .catch(() => {
                setBooks([]);
                setMessage('No New Books Found, Try a Different Search!');
            });
    }

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
    }

    const saveBook = (bookData) => {
        API.saveBook({
            title: bookData.volumeInfo.title,
            authors: bookData.volumeInfo.authors ? bookData.volumeInfo.authors : 'No authors found',
            description: bookData.volumeInfo.description
                ? bookData.volumeInfo.description
                : 'No synopsis found',
            image: bookData.volumeInfo.imageLinks
                ? bookData.volumeInfo.imageLinks.thumbnail
                : 'https://via.placeholder.com/150.png?text=No+Image+Found',
            link: bookData.volumeInfo.infoLink
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }


    return (
        <div className="container">
            <input handleInputChange={handleInputChange} name="title" searchTerm={searchTerm} />
            <div>
                <button className="btn btn-secondary" onClick={searchBooks}>
                    Search
                </button>
            </div>
            {books.length ? (
                <div className="col-4">
                    {books.map((book, i) => (
                        <div className="card-box"
                            key={i}
                            image={
                                book.volumeInfo.imageLinks
                                    ? book.volumeInfo.imageLinks.thumbnail
                                    : 'https://via.placeholder.com/150.png?text=No+Image+Found'
                            }
                            title={book.volumeInfo.title}
                            authors={book.volumeInfo.authors.join(', ')}
                            description={
                                book.volumeInfo.description
                                    ? book.volumeInfo.description
                                    : 'No synopsis found'
                            }
                            link={book.volumeInfo.infoLink}
                            action={() => {
                                saveBook(book);
                            }}
                            btnContent={'Save Book'}
                        />
                    ))}
                </div>
            ) : (
                <input className="input">
                    {message}
                </input>
            )}
        </div>
    );
}

export default Search;