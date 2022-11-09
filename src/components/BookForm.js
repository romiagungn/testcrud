import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';

const BookForm = (props) => {
  const history = useHistory();
  const [book, setBook] = useState(() => {
    return {
      bookname: props.book ? props.book.bookname : '',
      name: props.book ? props.book.name : '',
      quantity: props.book ? props.book.quantity : '',
      price: props.book ? props.book.price : '',
      date: props.book ? props.book.date : '',
      from: props.book ? props.book.from : '',
      to: props.book ? props.book.to : '',
    };
  });

  const [errorMsg, setErrorMsg] = useState('');
  const { bookname, name, price, quantity, from, to } = book;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [bookname, name, price, quantity, from, to];
    let errorMsg = '';

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      const book = {
        id: uuidv4(),
        bookname,
        name,
        price,
        quantity,
        date: new Date(),
        from,
        to
      };
      console.log(book);
      props.handleOnSubmit(book);
    } else {
      errorMsg = 'Please fill out all the fields.';
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'quantity':
        if (value === '' || parseInt(value) === +value) {
          setBook((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      case 'price':
        if (value === '' || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setBook((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      default:
        setBook((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }
  };
  console.log(book,'from');

  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Booking Title</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="bookname"
            value={bookname}
            placeholder="Enter name of book"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="name"
            value={name}
            placeholder="Enter name of name"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            className="input-control"
            type="number"
            name="quantity"
            value={quantity}
            placeholder="Enter available quantity"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Booking Price</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="price"
            value={price}
            placeholder="Enter price of book"
            onChange={handleInputChange}
          />
        </Form.Group><Form.Group controlId="from">
          <Form.Label>From</Form.Label>
          <Form.Control
            as="select"
            name="from"
            value={from}
            onChange={handleInputChange}
          >
            <option>Select City</option>
            <option value="Bandung">Bandung</option>
            <option value="Jakarta">Jakarta</option>
            <option value="Yogyakarta">Yogyakarta</option>
          </Form.Control>
        </Form.Group><Form.Group controlId="to" value={to}>
          <Form.Label>To</Form.Label>
          <Form.Control
            as="select"
            name="to"
            value={to}
            onChange={handleInputChange}
          >
            <option>Select City</option>
            <option value="Bandung">Bandung</option>
            <option value="Jakarta">Jakarta</option>
            <option value="Yogyakarta">Yogyakarta</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
        <Button variant="light" className="submit-btn" onClick={() => history.push('/')}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default BookForm;
