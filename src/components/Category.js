import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const Category = () => {
  const { categoryName } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
        );
        setMeals(response.data.meals);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [categoryName]);

  // Save favorites to local storage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (meal) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, meal];
      return newFavorites;
    });
  };

  const removeFavorite = (idMeal) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((meal) => meal.idMeal !== idMeal)
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const isFavorite = (idMeal) =>
    favorites.some((meal) => meal.idMeal === idMeal);

  return (
    <>
      <div className="text-center">
        <h1 className="text-center fontSize-2">Category {categoryName}</h1>
        <div className="home">
          <ul className="sidebar-heading">
            {meals.map((meal) => (
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
                  <Link
                    to={{
                      pathname: `/category/${categoryName}/${meal.idMeal}`,
                      state: { type: meal.idMeal },
                    }}
                    key={meal.idMeal}
                  >
                    <span>{meal.strMeal}</span>
                  </Link>

                  <FontAwesomeIcon
                    icon={isFavorite(meal.idMeal) ? solidHeart : regularHeart}
                    style={{ marginLeft: "auto", cursor: "pointer" }}
                    className="heart-icon"
                    onClick={() =>
                      isFavorite(meal.idMeal)
                        ? removeFavorite(meal.idMeal)
                        : addFavorite(meal)
                    }
                  />
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Category;
