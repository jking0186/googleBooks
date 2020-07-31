import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import API from '../utils/API';
import MediaCard from '../components/MediaCard';

const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: '20px'
    },
    heading: {
        margin: "25px"
    },
    gridList: {
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    }
});

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
        <Container border={1} borderColor="secondary" className={classes.root}>
            <Typography color="secondary" variant="h3" component="h1" className={classes.heading}>
                Saved Books
            </Typography>
            <GridList className={classes.gridList} cols={3}>
                {books.map((book, i) => (
                    <MediaCard
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
            </GridList>
        </Container>
    );
}

export default Saved;