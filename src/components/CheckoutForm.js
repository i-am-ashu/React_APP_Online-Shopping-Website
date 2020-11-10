import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useStateValue } from "../context/StateProvider";
import "./CheckoutForm.css";

function CheckoutForm() {
  const [{ basket }, dispatch] = useStateValue();
  const { register, errors, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const [checkout, setCheckout] = useState(false);
  const [formData, setFormData] = useState({});
  let history = useHistory();

  const clearCart = () => {
    dispatch({
      type: "REFRESH_CART",
    });
  };

  const onSubmit = (data) => {
    console.log(data);
    setCheckout(true);
    setFormData(data);
    clearCart();

    //redirect to home page
    setTimeout(() => {
      history.push("/");
    }, 2000);
  };
  return (
    <>
      {" "}
      {!checkout && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="checkoutForm">
            <h3 className="checkoutForm__title">Checkout Form</h3>

            <small>
              {" "}
              Name
              <span className="checkoutform__errors">
                {errors.name && "Name is required"}
              </span>
            </small>
            <input type="text" name="name" ref={register({ required: true })} placeholder="Enter name"/>

            <small>
              {" "}
              Email
              <span className="checkoutform__errors">
                {errors.email?.type === "required" && "Email is required!!"}
                {errors.email?.type === "pattern" &&
                  "Invalid email!! format  : xxx@something.com"}
              </span>
            </small>
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              ref={register({
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />

            <small>
              Phone
              <span className="checkoutform__errors">
                {errors.phone?.type === "required" &&
                  "contact details required!!"}
                {errors.phone?.type === "minLength" &&
                  "minimum 6 digits are required!!"}
                {errors.phone?.type === "maxLength" &&
                  "maximum 10 digits are allowed!!"}
              </span>
            </small>
            <input
              type="number"
              name="phone"
              placeholder="Enter phone number"
              ref={register({ required: true, minLength: 6, maxLength: 10 })}
            />

            <small>
              Credit card
              <span className="checkoutform__errors">
                {errors.credit?.type === "required" &&
                  "credit card details are required!!"}
                {errors.credit?.type === "pattern" &&
                  "credit card number is not valid!!"}
              </span>
            </small>
            <input
              type="number"
              name="credit"
              placeholder="Try 378282246310006"
              ref={register({
                required: true,
                pattern: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
              })}
            />
            <button type="submit" disabled={!formState.isValid}>
              Buy
            </button>
          </div>
        </form>
      )}
      {checkout && (
        <div className="checkoutForm">
          <p className="checkoutForm__submitTitle">
            Your Order has been placed successfully!!
          </p>
          <h5 className="checkoutForm__tableTitle">Order summary:</h5>
          <table>
            <tr>
              <td>Name</td>
              <td>:</td>
              <td>{formData.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>:</td>
              <td>{formData.email}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>:</td>
              <td>{formData.phone}</td>
            </tr>
          </table>
        </div>
      )}
    </>
  );
}

export default CheckoutForm;
