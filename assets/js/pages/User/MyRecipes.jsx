import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import Pagination from '../../components/Pagination'
import API from '../../services/API'
import { EditIcons, SearchIcons, TreeDotsIcon } from '../../ui/Icons'
import { Loader } from '../../ui/Loader'

export default function MyRecipes({ match, history }) {

    /* FETCH RECIPES */
    const [recipes, setRecipes] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")


    const fetchRecipes = async () => {
        try {
            const data = await API.findAll('users/' + window.localStorage.getItem('authId') + '/recipes')
            setRecipes(data)
        } catch (e) { console.log(e.response) }
    }
    useEffect(() => { fetchRecipes() }, [])


    /* PAGINATION */
    const handlePageChanged = page => setCurrentPage(page);
    const itemsPerPage = 11;
    /* SEARCH */
    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value)
        setCurrentPage(1)
    }
    /* FILTERING CUSTOMERS BY SEARCH */
    const filteredRecipes = recipes.filter(r =>
        r.title.toLowerCase().includes(search.toLowerCase())
    )
    /* HANDLE PAGINATION */
    const paginatedRecipes = Pagination.getData(filteredRecipes, currentPage, itemsPerPage)


    return (
        <div>
            <div className="d-flex justify-content-between align-items-start">
                <div>
                    <h1 className="display-4">
                        {window.localStorage.getItem('authToken')}
                    </h1>
                    <p className="lead">/!\ TODO : Add Description /!\</p>
                </div>
                <button onClick={() => alert('todo : edit user profile')}>
                    <TreeDotsIcon size="24" />
                </button>
            </div>
            <hr className="my-4" />

            {/* THEN */}
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

    const formatDate = str => moment(str).format('DD/MM/YYYY')

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