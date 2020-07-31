import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";
import axios from "axios";

function saveBook(bookInfo, index) {
  axios.post('/api/books', bookInfo)
    .catch(error => {
      console.log(`Error received: ${error}`);
    })
}

export function BookList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

export function BookListItem({
  image,
  title,
  author,
  synopsis
}) {
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={image || "https://placehold.it/200x300"} />
          </Col>
          <Col size="xs-8 sm-9">
            <h3>{title}</h3>
            <p>Author: {author}</p>
            <p>Synopsis: {synopsis}</p>
            <a rel="noreferrer noopener" target="_blank">
              <button className="btn btn-info">View</button>
            </a>
              <button className="btn btn-info" onClick={() => saveBook()}>Save</button>
          </Col>
        </Row>
      </Container>
    </li>
  );
}
