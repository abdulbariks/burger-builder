import React from 'react';
import './Burger.css';
import Ingredients from '../Ingredients/Ingredients';

const Burger = props => {
    let ingredientsArr = props.ingredients.map(item => {
        let amountArr = [...Array(item.amount).keys()];
        return amountArr.map(_ => {
            return <Ingredients type = {item.type} key={Math.random()} />
        })

})
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    //console.log(IngredientsArr);
    if (ingredientsArr.length === 0) {
        ingredientsArr = <p>Please start adding ingredients!</p>
    }
    return (
        <div className="Burger">
            <Ingredients type="bread-top" />
            {/* <Ingredients type="cheese" />
            <Ingredients type="salad" />
            <Ingredients type="meat" /> */}
            {ingredientsArr}
            <Ingredients type="bread-bottom" />
        </div>
    )
}

export default Burger;