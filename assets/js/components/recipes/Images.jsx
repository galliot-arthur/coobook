import React from 'react'

export default function Images({ recipe }) {

    const handleError = ({ target }) => {
        target.src = 'images/recipes/default-placeholder.png'
    }

    if (recipe.recipesImages == undefined) {
        return (
            <img
                className="img-full"
                src={"images/recipes/default-placeholder.png"}
                alt="illustration recette par défault" />
        )
    } else if (recipe.recipesImages[0] == undefined) {
        return (
            <img
                className="img-full"
                src={"images/recipes/default-placeholder.png"}
                alt="illustration recette par défault"
            />
        )
    } else {
        return (
            <img
                className="img-full"
                src={"images/recipes/" + recipe.recipesImages[0].path}
                alt={recipe.slug}
                onError={handleError} />
        )
    }
}