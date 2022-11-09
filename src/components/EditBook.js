import React, { useContext, useState, useEffect } from 'react';
import BookForm from './BookForm';
import { useParams } from 'react-router-dom';
import BooksContext from '../context/BooksContext';
import Swal from "sweetalert2";
import Loading from './Loading';

const EditBook = ({ history }) => {
  const { books, setBooks } = useContext(BooksContext);
  const [loading, setloading] = useState(true);
  const { id } = useParams();
  const bookToEdit = books.find((book) => book.id === id);

  useEffect(() => {
    setTimeout(() => {
        setloading(false);
    }, 1000);
  }, [])

  const handleOnSubmit = (book) => {
    const filteredBooks = books.filter((book) => book.id !== id);
    setBooks([book, ...filteredBooks]);
    Swal.fire({
      title: 'Do you want to change update booking?',
      showCancelButton: true,
      confirmButtonText: 'Update',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Yay...',
          text: 'You have successfully update booking!'
        })
        history.push('/');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  };

  return (
    <div>
      {
        loading
          ?
          <Loading/>
        :
        <BookForm book={bookToEdit} handleOnSubmit={handleOnSubmit} />
      }
    </div>
  );
};

export default EditBook;
