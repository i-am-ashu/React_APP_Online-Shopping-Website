import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import "./Product.css";
function Product({ products }) {
  const [{ search }, dispatch] = useStateValue();

  const filteredProduct = products.filter(
    (product) => product.title.toLowerCase().indexOf(search) !== -1);

  return (
    <>
      {filteredProduct.map((product,index) => (
        <div className="product" key = {`${index}-${product.id}`}>
          <Link
            to={{ pathname: "/product", state: { product: product } }}
            style={{ textDecoration: "none", color: "#0066c0" }} >
            <div className="product__info">
              <h4>{product.title}</h4>
              <p className="product__price">
                <strong>$</strong>
                <strong>{product.price}</strong>
              </p>
              <div className="product__rating">
                {Array(product.rating)
                  .fill()
                  .map((_, i) => (
                    <p>★</p>
                  ))}
              </div>
            </div>
          </Link>
          <img src={product.image} alt="" />
        </div>
      ))}
    </>
  );
}

export default Product;
