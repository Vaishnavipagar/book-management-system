import { useState } from "react";
import API from "../services/api";

function BookList({ books, fetchBooks }) {

  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
  });

  // delete book
  const deleteBook = async (id) => {
    try {
      await API.delete(`/books/${id}`);

      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  // edit button click
  const startEdit = (book) => {
    setEditingId(book.id);

    setEditData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      year: book.year,
    });
  };

  // update book
  const updateBook = async (id) => {
    try {
      await API.put(`/books/${id}`, editData);

      setEditingId(null);

      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="books-container">
      {books.map((book) => (
        <div className="book-card" key={book.id}>

          {editingId === book.id ? (
            <>
              <input
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    title: e.target.value,
                  })
                }
              />

              <input
                type="text"
                value={editData.author}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    author: e.target.value,
                  })
                }
              />

              <input
                type="text"
                value={editData.genre}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    genre: e.target.value,
                  })
                }
              />

              <input
                type="number"
                value={editData.year}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    year: e.target.value,
                  })
                }
              />

              <button
                onClick={() => updateBook(book.id)}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h2>{book.title}</h2>

              <p>
                <strong>Author:</strong> {book.author}
              </p>

              <p>
                <strong>Genre:</strong> {book.genre}
              </p>

              <p>
                <strong>Year:</strong> {book.year}
              </p>

              <button
                onClick={() => startEdit(book)}
              >
                Edit
              </button>

              <button
                onClick={() => deleteBook(book.id)}
              >
                Delete
              </button>
            </>
          )}

        </div>
      ))}
    </div>
  );
}

export default BookList;