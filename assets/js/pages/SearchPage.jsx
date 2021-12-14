import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import RecipeSmall from '../components/RecipeSmall'
import { isConnected } from '../services/authSlice'
import { fetchRecipes, selectAllRecipes } from '../services/recipeSlice'
import { SearchIcons } from '../ui/Icons'
import { Loader } from '../ui/Loader'

export default function SearchPage() {

    const { connected } = useSelector(isConnected)
    const feed = useSelector(selectAllRecipes)

    if (connected && feed.length < 1) {
        const dispatch = useDispatch()
        dispatch(fetchRecipes())
    }

    /* SEARCH */
    const [search, setSearch] = useState("")
    const [arrayTerms, setArrayTerms] = useState([""])
    let filteredRecipes = []

    const handleSearch = ({ currentTarget }) => {
        /* NORMALIZE SEARCH TERMS */
        const terms = currentTarget
            .value
            .normalize("NFD").replace(/\p{Diacritic}/gu, "")
            .replace(/[.,\/#!?$%\^&\*;:{}=\-_`"'~()]/g, ' ')
            .replace(/\s+/g, " ")
            .toLowerCase()
            .split(' ')
        setSearch(currentTarget.value)
        setArrayTerms(terms)
        filteredRecipes = []
    }

    /* FILTERING RECIPES BY SEARCH */
    const recipesCopies = feed

    recipesCopies.map(recipe => {
        recipe = { ...recipe, selected: 0 }
        arrayTerms.map(term => {
            if (
                recipe.title
                    .toLowerCase()
                    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
                    .includes(term) &&
                recipe.intro
                    .toLowerCase()
                    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
                    .includes(term)
            ) {
                recipe.selected += 1
            }
        })
        if (recipe.selected > 0) filteredRecipes.push(recipe)
    })

    filteredRecipes.sort((a, b) => a.selected < b.selected)

    return (
        <div className='fade-left'>
            <div className="d-flex justify-content-between align-items-start">
                <div>
                    <h1 className="display-4">Rechercher</h1>
                    <p className="lead">Vos recettes préférées, en un clin d'œil</p>
                </div>
            </div>
            <hr className="my-4" />

            <div className="input-group mb-3">
                <label
                    className="input-group-text"
                    htmlFor="search">
                    <SearchIcons />
                </label>
                <input
                    type="text"
                    id="search"
                    onChange={handleSearch}
                    value={search}
                    className="form-control"
                    placeholder="Rechercher..."
                />
            </div>
            <div className="container mb-5">
                {

                    feed.length == 0 ?
                        <div>
                            <Loader look="d-flex justify-content-center my-3 align-items-center" />
                        </div> :
                        filteredRecipes.length == 0 ?
                            <p className="fade-start">Nous ne trouvons aucuns résultats. Merci de préciser votre recherche.</p>
                            :
                            filteredRecipes.map(recipe =>
                                <RecipeSmall recipe={recipe} key={recipe.id} />
                            )

                }
            </div>
        </div>
    )
}