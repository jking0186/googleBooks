import React, { useEffect, useState } from 'react';
import API from '../utils/API';
import MediaCard from '../components/MediaCard';

function Saved() {
    const classes = useStyles();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        loadBooks()
    }, []);

    const loadBooks = () => {
    API.getBooks()
        .then(res => setBooks(res.data))
        .catch(err => console.log(err));
    }

    const deleteBook = (id) => {
        API.deleteBook(id)
            .then(res => loadBooks())
            .catch(err => console.log(err));
    }

    return (
        <div className="container">
            <h1>Saved Books</h1>
            <div className="col">
                {books.map((book, i) => (
                    <div className="card-box"
                        key={i}
                        id={book._id}
                        image={book.image}
                        title={book.title}
                        authors={book.authors}
                        description={book.description}
                        link={book.link}
                        action={() => {
                            deleteBook(book._id);
                        }}
                        btnContent={'Delete Book'}
                    />
                ))}
            </div>
        </div>
    );
}

export default Saved;