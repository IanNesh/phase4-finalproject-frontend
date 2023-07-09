import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "./state";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = () => {
    dispatch(addToCart({ item: { ...book, count } }));
  };

  const handleDecrement = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 1));
  };

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const { category, price, title, image_url } = book;

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          alt={title}
          width="300px"
          height="400px"
          src={image_url}
          onClick={() => {
            console.log(book.id);
            navigate(`/book/${book.id}`);
          }}
          style={{ cursor: "pointer" }}
        />
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={handleDecrement}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={handleIncrement}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              onClick={handleAddToCart}
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
      <Box mt="3px">
        <Typography variant="subtitle2" color={shades.neutral.dark}>
          {category.genre}
        </Typography>
        <Typography>{title}</Typography>
        <Typography fontWeight="bold">KES {price}</Typography>
      </Box>
    </Box>
  );
};

export default BookCard;
