import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { IconButton, Box, Typography, Button, Tabs, Tab } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "./state";
import { useParams } from "react-router-dom";
import BookCard from "./BookCard";

const BookDetails = () => {
  const { bookId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);

  const dispatch = useDispatch();

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const getBook = () => {
    axios
      .get(`https://inkwell-library.onrender.com/books/${bookId}`)
      .then((res) => {
        const fetchedBook = res.data;
        console.log(fetchedBook);
        setBook(fetchedBook);
      })
      .catch((err) => console.log(err));
  };

  const getRelatedBooks = () => {
    axios
      .get("https://inkwell-library.onrender.com/books")
      .then((res) => {
        const fetchedBooks = res.data;
        console.log(fetchedBooks);
        setRelatedBooks(fetchedBooks.slice(0, 5));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBook();
    getRelatedBooks();
  }, [bookId]);

  return (
    <div className="box">
      <Box width="80%" m="80px auto">
        <Box display="flex" flexWrap="wrap" columnGap="40px">
          {/* images to render */}
          <Box flex="1 1 40%" mb="40px">
            <img
              alt={book?.title}
              width="100%"
              height="100%"
              src={book?.imageURL}
              style={{ objectFit: "contain" }}
            />
          </Box>

          {/* actions */}
          <Box flex="1 1 50%" mb="40px">
            <Box display="flex" justifyContent="space-between">
              {/* <Box>Home</Box>
            <Box>Prev Next</Box> */}
            </Box>

            <Box m="65px 0 25px 0">
              <Typography variant="h3">{book?.title}</Typography>
              <Typography>KSh. {book?.price}</Typography>
              <Typography sx={{ mt: "20px" }}>{book?.description}</Typography>
            </Box>

            <Box display="flex" alignItems="center" minHeight="50px">
              <Box
                display="flex"
                alignItems="center"
                border={`1.5px solid ${shades.neutral[300]}`}
                mr="20px"
                p="2px 5px"
              >
                <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ p: "0 5px" }}>{count}</Typography>
                <IconButton onClick={() => setCount(count + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Button
                sx={{
                  backgroundColor: "#222222",
                  color: "white",
                  borderRadius: 0,
                  minWidth: "150px",
                  padding: "10px 40px",
                }}
                onClick={() =>
                  dispatch(addToCart({ item: { ...book, count } }))
                }
              >
                ADD TO CART
              </Button>
            </Box>
            <Box>
              <Box m="20px 0 5px 0" display="flex" alignItems="center">
                <FavoriteBorderOutlinedIcon sx={{ mr: "5px" }} />
                <Typography>ADD TO WISHLIST</Typography>
              </Box>
              {/* <Typography>CATEGORIES: {book?.category?.genre}</Typography> */}
            </Box>
          </Box>
        </Box>

        {/* extra info about the book*/}
        <Box m="20px 0">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="DESCRIPTION" value="description" />
            <Tab label="REVIEWS" value="reviews" />
          </Tabs>
        </Box>
        <Box display="flex" flexWrap="wrap" gap="15px">
          {value === "description" && <div>{book?.description}</div>}
          {value === "reviews" && (
            <div>Reviews will be displayed here...coming soon!</div>
          )}
        </Box>

        {/* Display the first 5 related items */}
        <Box mt="50px" width="100%">
          <Typography variant="h3" fontWeight="bold">
            Related Products
          </Typography>
          <Box
            mt="20px"
            display="flex"
            flexWrap="wrap"
            columnGap="1.33%"
            justifyContent="space-between"
          >
            {relatedBooks.map((relatedBook) => (
              <BookCard key={relatedBook.id} book={relatedBook} />
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default BookDetails;
