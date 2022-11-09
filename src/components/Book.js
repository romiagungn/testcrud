import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Book = ({
  id,
  bookname,
  name,
  price,
  quantity,
  date,
  from,
  to,
  handleRemoveBook
}) => {
  const history = useHistory();
  const currencyFormat = (num) => {
    return 'Rp.' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

  return (
    <Card style={{ width: '18rem' }} className="book">
      <Card.Body>
        <Card.Title className="book-title">{bookname}</Card.Title>
        <div className="book-details">
          <div>Author: {name}</div>
          <div>Quantity: {quantity} </div>
          <div>Price: {currencyFormat(Number(price))} </div>
          <div>Date: {new Date(date).toDateString()}</div>
          <div>From: {from}</div>
          <div>To: {to}</div>
        </div>
        <Button variant="primary" onClick={() => history.push(`/edit/${id}`)}>
          Edit
        </Button>{' '}
        <Button variant="danger" onClick={() => handleRemoveBook(id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Book;
