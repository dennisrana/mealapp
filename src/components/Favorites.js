import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

const Favorites = ({ removeFavorite }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <>
      <div className="text-center">
        <h1 className="text-center fontSize-2">My Favorites</h1>
        <div className="home">
          <ul className="sidebar-heading">
            {favorites &&
              favorites.map((meal) => (
                <>
                  <li
                    key={meal.idMeal}
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    className="box"
                  >
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      width={50}
                      height={50}
                      style={{ marginRight: "10px" }}
                    />
                    <span>{meal.strMeal}</span>
                    <span>{meal.strCategoryDescription}</span>
                  </li>
                  <FontAwesomeIcon
                    icon={solidHeart}
                    style={{
                      marginLeft: "auto",
                      cursor: "pointer",
                      paddingTop: "28px",
                    }}
                    className="heart-icon"
                    onClick={() => removeFavorite(meal.idMeal)}
                  />
                </>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Favorites;
