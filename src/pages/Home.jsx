import { useEffect, useState } from "react";
import API from "../services/api";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";

function Home() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  // fetch books
  const fetchBooks = async () => {
    try {

      setLoading(true);

      const response = await API.get("/books");

      setBooks(response.data);

      setLoading(false);

    } catch (err) {

      setError("Failed to fetch books");

      setLoading(false);
    }
  };

  // load books on page load
  useEffect(() => {
    fetchBooks();
  }, []);

  // search + filter
  const filteredBooks = books.filter((book) => {

    return (
      (book.title.toLowerCase().includes(search.toLowerCase()) ||

        book.author.toLowerCase().includes(search.toLowerCase())) &&

      (genre === "" || book.genre === genre)
    );

  });

  return (

    <div className="container">

      {/* heading */}
      <h1>Book Management System</h1>

      {/* search + filter */}
      <div className="top-bar">

        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >

          <option value="">All Genres</option>

          <option value="Fantasy">Fantasy</option>

          <option value="Self Help">Self Help</option>

          <option value="Programming">Programming</option>

        </select>

      </div>

      {/* add form */}
      <BookForm fetchBooks={fetchBooks} />

      {/* loading */}
      {loading && (
        <p style={{ marginBottom: "20px" }}>
          Loading books...
        </p>
      )}

      {/* error */}
      {error && (
        <p style={{ color: "red", marginBottom: "20px" }}>
          {error}
        </p>
      )}

      {/* book list */}
      <BookList
        books={filteredBooks}
        fetchBooks={fetchBooks}
      />

      {/* footer */}
      <p className="footer">
        Developed by Vaishnavi ✨
      </p>

    </div>
  );
}

export default Home;