import { Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { getTotal } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import "./Cart.css";
import CartProduct from "./CartProduct";
import CheckoutForm from "./CheckoutForm";
import Subtotal from "./Subtotal";

function Cart() {
  const [{ basket }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);

  const checkoutForm = () => {
    if (basket.length !== 0) setFlag(!flag);
    else setOpen(true);
    console.log(flag);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    console.log("componentdidupdate");

    return () => console.log("componentWillUnmout");
  }, []);

  return (
    <div className="cart">
      <div className="cart__left">
        {/* <img className="cart__ad"
                    src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/OPPO/Jupiter2020/BrandDays/Rv1_Gifting_brand-days_1500x200.jpg"
                    alt=""/> */}
        <div className="cart__product">
          <h2 className="cart__title">
            Shopping Cart ({basket?.length} items)
          </h2>
          {basket.length === 0 && (
            <h3 className="cart__title">Your Cart is empty!!</h3>
          )}
          {basket.map((item) => (
            <CartProduct product={item} />
          ))}
          {/* cart Item */}
          {/* cart Item */}
          <hr />
        </div>
        <div>
          <h3 className="cart__subtotal">
            Total:&nbsp;$&nbsp;{getTotal(basket)}
          </h3>
        </div>
      </div>
      <div className="cart__right">
        <Subtotal checkoutForm={checkoutForm} />
        {flag && <CheckoutForm />}
      </div>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled" onClose={handleClose} severity="warning">
          <AlertTitle>Hey,Your cart is Empty!!</AlertTitle>
          <small>There is nothing in your shopping cart</small>
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Cart;
