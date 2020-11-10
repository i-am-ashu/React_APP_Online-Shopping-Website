import React, { useEffect, useState } from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  const [products, setProducts] = useState([]);
  const [list, setList] = useState(products);
  const [loader, setLoader] = useState(false);
  const categories = [
    "All",
    "Men clothing",
    "Women clothing",
    "Jewelery",
    "Electronics",
  ];

  useEffect(() => {
    setLoader(true);
    const getProducts = async () => {
      await fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLoader(false);
          const products = data.map((product) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            rating: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
            description: product.description,
            category: product.category,
          }));
          setProducts(products);
          setList(products);
          console.log(products[0]);
        });
    };
    getProducts();
  }, []);

  const handleSelect = (value) => {
    console.log(value);
    if (value !== "") {
      let sortedproducts = [...products].sort((a, b) => {
        return value === "rate"
          ? b.rating - a.rating
          : value === "asc"
          ? a.price - b.price
          : b.price - a.price;
      });
      setProducts(sortedproducts);
    } else setProducts(list);
  };

  const setFilter = (index) => {
    let category = categories[index];

    if (category !== "All") {
      const filteredproduct = [...list].filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
      setProducts(filteredproduct);
    } else setProducts(list);
  };
  return (
    <div className="home">
      <div className="home__container">
        <div className="home__filters">
          <p>Sort By</p>
          <select onChange={(e) => handleSelect(e.target.value)}>
            <option value="">All</option>
            <option value="asc">Price:low to high</option>
            <option value="desc">Price:high to low</option>
            <option value="rate">ratings</option>
          </select>
          <div className="home__category">
            {categories.map((category, index) => (
              <button 
                key = {`${index}-${category}`}
                className="category__item"
                onClick={() => {
                  setFilter(index);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <img
          className="home__image"
          height="600px"
          width="1500px"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Events/jupiter20/GWphase3/V4/Phase4_Unrec_PC_Hero_2X_ENGLISH._CB416349557_.jpg"
          alt=""
        />
        {products && (
          <div className="home__row">
            <Product products={products} />
          </div>
        )}
        {loader && (
          <div className="home__loader">
            <div className="loader"></div>
            <p>Wait a Moment....</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
