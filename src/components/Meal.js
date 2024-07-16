import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Meal = () => {
  const { mealId } = useParams();
  const [meal, setMeal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMeal = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      setMeal(response.data.meals);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeal();
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="text-center">
        <h1 className="text-center fontSize-2">Meal</h1>
        <div className="home">
          <ul className="sidebar-heading">
            {meal &&
              meal.map((meal) => (
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
                </>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Meal;
