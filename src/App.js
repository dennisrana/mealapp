import "./App.css";
import Sidebar from "./components/Sidebar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Homepage from "./components/Homepage";
import Menu from "./components/Menu";
import Favorites from "./components/Favorites";
import RandomMeal from "./components/RandomMeal";
import Aboutme from "./components/Aboutme";
import Category from "./components/Category";
import Meal from "./components/Meal";
import { useEffect, useState } from "react";
function App() {
    const [favorites, setFavorites] = useState([]);

    // Load favorites from local storage
    useEffect(() => {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(savedFavorites);
    }, []);

    // Save favorites to local storage
    useEffect(() => {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

  
    const removeFavorite = (idMeal) => {
      setFavorites((prevFavorites) => prevFavorites.filter(meal => meal.idMeal !== idMeal));
    };

    return (
        <Router>
            <Sidebar />
            <Routes>
                <Route
                    path="/"
                    element={<Homepage />}
                />
                <Route
                    path="/menu"
                    element={<Menu />}
                />
                <Route
                    path="/favorites"
                    element={<Favorites removeFavorite={removeFavorite} />}
                />
                <Route
                    path="/random-meal"
                    element={<RandomMeal />}
                />
                <Route
                    path="/category/:categoryName"
                    element={<Category favorites={favorites}/>}
                />
                 <Route
                    path="/category/:categoryName/:mealId"
                    element={<Meal />}
                />
                <Route
                    path="/about-me"
                    element={<Aboutme />}
                />
            </Routes>
        </Router>
    );
}

export default App;
