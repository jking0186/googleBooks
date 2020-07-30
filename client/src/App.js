import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import Input from "./components/Input";
import Button from "./components/Button";
import API from "./utils/API";
import { RecipeList, RecipeListItem } from "./components/RecipeList";
import { Container, Row, Col } from "./components/Grid";

function App() {

  const [books, setBooks] = useState([]);
  const [bookSearch, setBookSearch] = useState("");

  const handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { value } = event.target;
    setBookSearch(value);
  };

  const handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    API.getRecipes(bookSearch)
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  };

  return (
    <Router>
    <div>
      <Nav />
      <Jumbotron />
      <Container>
        <Row>
          <Col size="md-12">
            <form>
              <Container>
                <Row>
                  <Col size="xs-9 sm-10">
                    <Input
                      name="BookSearch"
                      value={bookSearch}
                      onChange={handleInputChange}
                      placeholder="e.g. The Lord of The Flies"
                    />
                  </Col>
                  <Col size="xs-3 sm-2">
                    <Button
                      onClick={handleFormSubmit}
                      type="success"
                      className="input-lg"
                    >
                        Search
                    </Button>
                  </Col>
                </Row>
              </Container>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="xs-12">
            {!books.length ? (
              <h1 className="text-center">No Recipes to Display</h1>
            ) : (
              <RecipeList>
                {books.map(books => {
                  return (
                    <RecipeListItem
                      key={books.title}
                      title={books.title}
                      href={books.href}
                      ingredients={books.ingredients}
                      thumbnail={books.thumbnail}
                    />
                  );
                })}
              </RecipeList>
            )}
          </Col>
        </Row>
      </Container>
    </div>
    </Router>
  );
}

export default App;
