import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
function Header() {
  const [{ basket }, dispatch] = useStateValue();
  const [search, setSearch] = useState();
  let history = useHistory();

  const handleSearch = (value) => {
    setSearch(value);
    console.log(history);
    dispatch({
      type: "SEARCH",
      search: value,
    });
    if (history.location.pathname !== "/") history.push("/");
  };

  return (
    <div className="header">
      <div className="header__search">
        <Link to="/">
          <img
            className="header__logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG25.png"
            alt=""
          />
        </Link>
        <input
          className="header__searchInput"
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          value={search}
          placeholder="Search for products, brands and more..."
        />
        <div className="header__searchIcon">
          <SearchIcon />
        </div>
      </div>
      <div className="header__nav">
        {/* langauge option */}
        <div className="header__option">
          <span className="header__optionLineOne">Hello,Sign in</span>
          <span className="header__optionLinetwo">Accounts & Lists</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLinetwo">& Orders</span>
        </div>
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <div className="header__optionBasket">
            <Badge badgeContent={basket?.length} color="secondary">
              <ShoppingCartIcon style={{ color: "white" }} fontSize="large" />
            </Badge>
            Cart
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
