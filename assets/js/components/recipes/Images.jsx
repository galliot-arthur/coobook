import React from 'react'

export default function Images({ recipe }) {

    if (recipe.recipesImages == undefined) {
        return (
            <img
                className="img-thumbnail"
                src={"images/recipes/default-placeholder.png"}
                alt="illustration recette par défault" />
        )
    } else if (recipe.recipesImages[0] == undefined) {
        return (
            <img
                className="img-thumbnail"
                src={"images/recipes/default-placeholder.png"}
                alt="illustration recette par défault" />
        )
    } else {
        return (
            <img
                className="img-thumbnail"
                src={"images/recipes/" + recipe.recipesImages[0].path}
                alt={recipe.slug} />
        )
    }
}