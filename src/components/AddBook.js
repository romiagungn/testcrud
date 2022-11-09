import React, { useContext } from 'react';
import BookForm from './BookForm';
import BooksContext from '../context/BooksContext';
import Swal from "sweetalert2";

const AddBook = ({ history }) => {
  const { books, setBooks } = useContext(BooksContext);

  const handleOnSubmit = (book) => {
    setBooks([book, ...books]);
    Swal.fire({
      icon: 'success',
      title: 'Yay...',
      text: 'You have successfully added a new booking!'
    }).then(() => {
      history.push('/');
    })
  };

  return (
    <React.Fragment>
      <BookForm handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );
};

export default AddBook;
