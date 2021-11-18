import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Pagination from '../components/Pagination'
import API from '../services/API'
import { SearchIcons } from '../ui/Icons'
import { Loader } from '../ui/Loader'

export default function SearchPage() {

    /* FETCHING DATA */
    const [recipes, setRecipes] = useState([])
    const fetchRecipes = async () => {
        let data = await API.findAll('recipes')
        setRecipes(data)
    }
    useEffect(() => {
        fetchRecipes()
    }, [])

    /* PAGINATION */
    const [currentPage, setCurrentPage] = useState(1)
    const handlePageChanged = page => setCurrentPage(page);
    const itemsPerPage = 11;

    /* SEARCH */
    const [search, setSearch] = useState("")
    const [arrayTerms, setArrayTerms] = useState([""])
    let filteredRecipes = []

    const handleSearch = ({ currentTarget }) => {
        const terms = currentTarget
            .value
            .normalize("NFD").replace(/\p{Diacritic}/gu, "")
            .replace(/[.,\/#!?$%\^&\*;:{}=\-_`"'~()]/g, ' ')
            .replace(/\s+/g, " ")
            .split(' ')

        setSearch(currentTarget.value)
        setArrayTerms(terms)
        //console.log(terms)
        setCurrentPage(1)
        filteredRecipes = []


    }
    /* FILTERING RECIPES BY SEARCH */

    recipes.map(recipe => {
        arrayTerms.map(term => {
            if (
                recipe.title
                    .toLowerCase()
                    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
                    .includes(term.toLowerCase())) {
                filteredRecipes.unshift(recipe)
            }
        })
    })
    const uniqueSet = new Set(filteredRecipes)
    const uniqueFilteredRecipes = [...uniqueSet]

    console.log(uniqueFilteredRecipes)
    /* HANDLE PAGINATION */
    const paginatedRecipes = Pagination.getData(uniqueFilteredRecipes, currentPage, itemsPerPage)

    return (
        <div>
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

                    recipes.length == 0 ?
                        <div>
                            <Loader look="d-flex justify-content-center my-3 align-items-center" />
                        </div> :
                        paginatedRecipes.length == 0 ?
                            <p className="fade-start">Nous ne trouvons aucuns résultats. Merci de préciser votre recherche.</p>
                            :
                            paginatedRecipes.map(recipe =>
                                <>
                                    <Recipe recipe={recipe} key={recipe.id} />
                                </>
                            )

                }

                {
                    itemsPerPage < filteredRecipes.length &&
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        length={filteredRecipes.length}
                        onPageChanged={handlePageChanged}
                    />
                }
            </div>
        </div>
    )
}

const Recipe = ({ recipe }) => {

    return (
        <div key={recipe.id} className="row align-items-center fade-start">
            <div className="col-6 align-items-center">
                <div>
                    <NavLink
                        to={"recette/" + recipe.id}
                        className="lead text-decoration-none"
                    >{recipe.title}</NavLink>
                </div>
            </div>

            <div className="col-6">
                <div className="d-flex flex-column justify-content-between align-items-end">
                    <div className="ps-1">
                        <NavLink to={"recette/" + recipe.id} >
                            {
                                recipe.recipesImages[0] ?
                                    <img className="img-thumbnail-small" src={"images/recipes/" + recipe.recipesImages[0].path} alt={recipe.slug} />
                                    :
                                    <img className="img-thumbnail-small" src={"images/recipes/default-placeholder.png"} alt="illustration recette par défault" />
                            }
                        </NavLink>
                    </div>
                </div>
            </div>
            <hr className="mt-1" />
        </div>
    )

}