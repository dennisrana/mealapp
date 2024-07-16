import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const RandomMeal = () => {
  const [randomMeal, setRandomMeal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomMeal = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      setRandomMeal(response.data.meals);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  // Save favorites to local storage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(randomMeal));
  }, [randomMeal]);

  const addFavorite = (meal) => {
    setRandomMeal((prevFavorites) => {
      const newFavorites = [...prevFavorites, meal];
      return newFavorites;
    });
  };

  const removeFavorite = (idMeal) => {
    setRandomMeal((prevFavorites) =>
      prevFavorites.filter((meal) => meal.idMeal !== idMeal)
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const isFavorite = (idMeal) =>
    randomMeal.some((meal) => meal.idMeal === idMeal);

  return (
    <>
      <div className="text-center">
        <h1 className="text-center fontSize-2">Random Meal</h1>
        <div className="home">
          <ul className="sidebar-heading">
            {randomMeal &&
              randomMeal.map((meal) => (
                <>
                  <li key={meal.idMeal} className="box">
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      width={250}
                      height={250}
                    />
                    <h2>
                      {meal.strCategory} - {meal.strMeal}
                    </h2>
                    <p>{meal.strInstructions}</p>
                  </li>
                  <FontAwesomeIcon
                    icon={isFavorite(meal.idMeal) ? solidHeart : regularHeart}
                    style={{
                      marginLeft: "auto",
                      cursor: "pointer",
                      paddingTop: "28px",
                    }}
                    className="heart-icon"
                    onClick={() =>
                      isFavorite(meal.idMeal)
                        ? removeFavorite(meal.idMeal)
                        : addFavorite(meal)
                    }
                  />
                </>
              ))}
          </ul>
          <button className="button" onClick={() => fetchRandomMeal()}>
            Generate Random Meal
          </button>
        </div>
      </div>
    </>
  );
};

export default RandomMeal;
