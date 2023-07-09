import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Tabs, Tab, Box, Typography, useMediaQuery } from "@mui/material";
import BookCard from "./BookCard";
import { setBooks } from "./state";

const BookList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const cartBooks = useSelector((state) => state.cart.books);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [userBooks, setUserBooks] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const getBooks = () => {
    axios
      .get("https://inkwell-library.onrender.com/books")
      .then((res) => {
        const fetchedBooks = res.data;
        setUserBooks(fetchedBooks);
        dispatch(setBooks(fetchedBooks));
      })
      .catch((err) => {
        setError("Failed to fetch books.");
        console.log(err);
      });
  };

  const getCategories = () => {
    axios
      .get("https://inkwell-library.onrender.com/categories")
      .then((res) => {
        const fetchedCategories = res.data;
        setUserCategories(fetchedCategories);
      })
      .catch((err) => {
        setError("Failed to fetch categories.");
        console.log(err);
      });
  };

  useEffect(() => {
    getBooks();
    getCategories();
  }, []);

  let filteredBooks = userBooks;
  if (value === "categories") {
    filteredBooks = userBooks.filter((book) =>
      userCategories.some((category) =>
        category.books.includes(book.title)
      )
    );
  }

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Featured <b>Books</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab onClick={() => setValue("all")} label="All" value="all" />
        <Tab onClick={() => setValue("categories")} label="Categories" value="categories" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          filteredBooks.map((book) => (
            <BookCard book={book} key={book.id} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default BookList;
