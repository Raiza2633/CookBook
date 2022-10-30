import './App.css';
import "./key";
import Axios from "axios";
import { useState } from "react";
import RecipeTile from './RecipeTile';

function App() {
  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState([]);
  const [healthLables, sethealthLables] = useState("vegan")

  const YOUR_APP_ID = "8d79a5f6";
  const YOUR_APP_KEY = "8a5be0e3968f09727d0bbded602958e8";


  var url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLables}`;

  async function getRecipes() {
    var result = await Axios.get(url);
    setrecipes(result.data.hits)
    console.log(result.data);

  }

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  }

  return (
    <div className="app">
      <h1>Food Recipes Plaza 🍔 🍕</h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input
          type="tex"
          className='app__input'
          placeholder="enter ingridient"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <input className="app__submit" type="submit" value="Search" />

        <select className="app_healthLables">
          <option onClick={() => sethealthLables("vegetarian")}>Vegan</option>
          <option onClick={() => sethealthLables("vegetarian")}>vegetarian</option>
          <option onClick={() => sethealthLables("paleo")}>paleo</option>
          <option onClick={() => sethealthLables("dairy-free")}>dairy-free</option>
          <option onClick={() => sethealthLables("non-veg")}>Non-veg</option>
          <option onClick={() => sethealthLables("sugar-free")}>sugar-free</option>
          

        </select>
      </form>
      {console.log('recipe', recipes)}
      <div className="app__recipes">
        {recipes.map((recipe) => {
          return <RecipeTile recipe={recipe} />;
        })}

      </div>
    </div>
  );
}

export default App;
