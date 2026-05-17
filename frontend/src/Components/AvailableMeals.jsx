import React, { useContext, useEffect, useState } from "react";
import {API} from '../config/api.js'
import { useNavigate } from "react-router-dom";
import { Context } from "../store/Context.jsx";
import AddItemBar from "./AddItemBar.jsx";
import Logo from "../assets/logo.jpg";
import Button from "./Button.jsx";

function AvailableMeals() {

  const navigate = useNavigate();
  
  const { availableMeals, addMeals, items, user, removeMeals } = useContext(Context);
  
    if(!user){
      navigate("/")
    }

  return <>
    <ul className="meals">
      {Array.isArray(availableMeals) && availableMeals.map(meal => {
        return (
          <li key={meal.id} className="meal-item">
            <img src={meal.image} alt={meal.name} />
            <h3>{meal.name}</h3>
            <p className="meal-item-price">{meal.price}</p>
            <p className="meal-item-description">{meal.description}</p>
            <div className="meal-item-button-section">
              {meal.quantity !== 0 && <button onClick={() => removeMeals(meal.id)} className="button">-</button>}
              {meal.quantity !== 0 && <p>{meal.quantity}</p>}
              <button onClick={() => addMeals(meal)} className="button">{meal.quantity === 0 ? "Add To Card" : "+"}</button>
            </div>
          </li>
        )
      })}
      {!Array.isArray(availableMeals) && <li className="meal-item">No meals available.</li>}
    </ul>
    {items.length !== 0 && <AddItemBar />}
  </>
}

export default AvailableMeals;
