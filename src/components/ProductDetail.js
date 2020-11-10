import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Alert from "@material-ui/lab/Alert";
import { useStateValue } from "../context/StateProvider";
import "./ProductDetail.css";
import { Snackbar } from "@material-ui/core";
import { AlertTitle } from "@material-ui/lab";


function ProductDetail() {
  let location = useLocation();
  const { product } = location.state;
  const [quantity, setQuantity] = useState(1);
  const [{basket}, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);

  // useEffect(()=>{
  //     const getProductDetails = async ()=>{
  //         await fetch(`https://fakestoreapi.com/products/${id}`)
  //              .then(res=>res.json())
  //              .then(data=>{setItem(data); console.log(item)})
  //     }
  //     getProductDetails();
  // },[])

  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(basket));
  })

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const addToCart = () => {
    console.log("hi");
    setOpen(true);

    const { id, title, price, image, rating, category } = product;
    // dispatch item into context store
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: id,
        title: title,
        price: price,
        image: image,
        rating: rating,
        category: category,
        quantity: quantity,
      },
    });
  };
  return (
    <div className="productDetail">
      <div className="productDetail__left">
        <img src={product.image} alt="" />
      </div>

      <div className="productDetail__right">
        <h3>{product.title}</h3>
        <div className="productDetail__ratings">
          {Array(product.rating)
            .fill()
            .map((_, i) => (
              <p>★</p>
            ))}
        </div>
        <p className="productDetail__price">
          Price:&nbsp;
          <strong>$</strong>&nbsp;
          <strong>{product.price}</strong>
        </p>
        <small className="taxes">Inclusive of all taxes </small>
        <p className="productDetail__desc">{product.description}</p>
        <div className="productDetail__quantity">
          <h5>Select Quantity :</h5>
          <button
            onClick={() => {
              if (quantity !== 1) setQuantity(quantity - 1);
            }}
          >
            -
          </button>
          <input type="number" value={quantity} />
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <button onClick={addToCart}>Add to cart</button>

        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert variant="filled"  onClose={handleClose} severity="success">
            <AlertTitle>Success</AlertTitle>
            <p>Item Added to Cart successfully!</p>
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default ProductDetail;
