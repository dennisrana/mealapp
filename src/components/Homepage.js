import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <div className="text-center">
        <h1 className="text-center fontSize-2">Home</h1>
        <div className="home">
          <div className="sidebar-heading">
            <div className="box">
              <Link to="/menu" className="link">
                <img src="./images/menu.png" alt="menu" width={150} />
                <h2>Menu</h2>
              </Link>
            </div>
            <div className="box">
              <Link to="/favorites" className="link">
                <img
                  src="./images/favourites.png"
                  alt="favourites"
                  width={150}
                />
                <h2>Favorites</h2>
              </Link>
            </div>
            <div className="box">
              <Link to="/random-meal" className="link">
                <img src="./images/random.png" alt="random" width={150} />
                <h2> Random Meal </h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
