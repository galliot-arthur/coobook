import React from 'react'

export default function Images({ recipe, style = 'img-full' }) {

    const handleError = ({ target }) => {
        target.src = 'images/recipes/default-placeholder.png'
    }
    let source = "images/recipes/default-placeholder.png"

    if (recipe.recipesImages && recipe.recipesImages[0]) source = "images/recipes/" + recipe.recipesImages[0].path

    return <div className='img-container'>
        <img src={source} alt={recipe.slug} className={style} onError={handleError}/>
    </div>
}