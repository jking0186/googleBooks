import React, { useState } from 'react';
import Header from '../components/Header';
import Textfield from '../components/Textfield';
import API from '../utils/API';
import { makeStyles } from '@material-ui/core/styles';
import MediaCard from '../components/MediaCard';
import GridList from '@material-ui/core/GridList';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    box: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px'
    },
    gridList: {
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    }
}));

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
        <Container>
            <Header />
            <Textfield handleInputChange={handleInputChange} name="title" searchTerm={searchTerm} />
            <Box className={classes.box}>
                <Button variant="contained" color="secondary" onClick={searchBooks}>
                    Search
                </Button>
            </Box>
            {/* <GridList className={classes.gridList} cols={3}> */}
            {books.length ? (
                <GridList className={classes.gridList} cols={3}>
                    {books.map((book, i) => (
                        <MediaCard
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
                </GridList>
            ) : (
                <Typography color="primary" variant="h3" className={classes.box}>
                    {message}
                </Typography>
            )}
        </Container>
    );
}

export default Search;