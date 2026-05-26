import { useState } from "react";
import API from "../services/api";

function BookForm({ fetchBooks }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/books", formData);

      setFormData({
        title: "",
        author: "",
        genre: "",
        year: "",
      });

      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Enter title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="author"
        placeholder="Enter author"
        value={formData.author}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="genre"
        placeholder="Enter genre"
        value={formData.genre}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="year"
        placeholder="Enter year"
        value={formData.year}
        onChange={handleChange}
        required
      />

      <button type="submit">
        Add Book
      </button>
    </form>
  );
}

export default BookForm;