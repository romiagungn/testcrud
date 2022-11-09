import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import Book from './Book';
import BooksContext from '../context/BooksContext';
import Swal from "sweetalert2";
import Loading from './Loading';

const BooksList = () => {
  const { books, setBooks } = useContext(BooksContext);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
        setloading(false);
    }, 2000);
  }, [])

  const handleRemoveBook = (id) => {
    Swal.fire({
      title: 'Do you want to delete booking?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        setBooks(books.filter((book) => book.id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Yay...',
          text: 'You have successfully delete booking!'
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  };

  return (
    <>
      {
        loading
          ?
          <Loading/>
        :
          <div className="book-list">
            {!_.isEmpty(books) ? (
              books.map((book) => (
                <Book key={book.id} {...book} handleRemoveBook={handleRemoveBook} />
              ))
            ) : (
              <p className="message">No books available. Please add some books.</p>
            )}
          </div>
        }
    </>
  );
};

export default BooksList;
