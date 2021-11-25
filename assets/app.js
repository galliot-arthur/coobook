import React, { useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import './bootstrap';
import './css/app.css';
import './css/GT-MARU.woff2'
import { NavBar } from './js/components/Navbar';
import PrivateRoute from './js/components/PrivateRoute';
import { HomePage } from './js/pages/HomePage';
import LoginPage from './js/pages/LoginPage';
import authAPI from './js/services/authAPI';
import AuthContext from './js/context/AuthContext';
import RegisterPage from './js/pages/RegisterPage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './js/components/Footer';
import AddRecipe from './js/pages/Recipe/AddRecipe';
import AddRecipeStep from './js/pages/Recipe/AddRecipeStep';
import AddIngredients from './js/pages/Recipe/AddIngredients';
import AddRecipeCover from './js/pages/Recipe/AddRecipeCover';
import MyRecipes from './js/pages/User/MyRecipes';
import ShowRecipe from './js/pages/Recipe/ShowRecipe';
import AddRecipeContext from './js/context/AddRecipeContext';
import BookmarkedRecipes from './js/pages/User/BookmarkedRecipes'
import SearchPage from './js/pages/SearchPage';
import AddComment from './js/pages/Comment/AddComment';
import EditProfile from './js/pages/User/EditProfile';
import EditRecipe from './js/pages/Recipe/EditRecipe';

const App = () => {

    /* AUTH CONTEXT */
    const [connected, setConnected] = useState(authAPI.setUp())
    const NavbarWithRouter = withRouter(NavBar)
    const contextValue = { connected, setConnected }

    /* ADDING RECIPE CONTEXT */
    const [IRI, setRecipe] = useState("")
    const setIRI = useCallback(id => {
        setRecipe('/api/recipes/' + id)
    }, [])

    const addRecipeValue = useMemo(() => {
        return {
            IRI: IRI,
            setIRI: setIRI
        }
    }, [IRI, setIRI])


    return (<AuthContext.Provider value={contextValue} >
        <AddRecipeContext.Provider value={addRecipeValue}>
            <HashRouter >
                <NavbarWithRouter />

                {/* MAIN */}
                <main className="container" >
                    <Switch >


                        {/* SECURITY */}
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />


                        {/* RECIPES */}
                        <PrivateRoute path="/enregistrer-recette/:id" component={AddRecipe} />
                        <PrivateRoute path="/enregistrer-ingredients/:id" component={AddIngredients} />
                        <PrivateRoute path="/enregistrer-etape/" component={AddRecipeStep} />
                        <PrivateRoute path="/enregistrer-photo/" component={AddRecipeCover} />
                        <PrivateRoute path="/recette/:id" component={ShowRecipe} />


                        {/* COMMENTS */}
                        <PrivateRoute path="/commenter/:id" component={AddComment} />


                        {/* USER */}
                        <PrivateRoute path="/mes-recettes" component={MyRecipes} />
                        <PrivateRoute path="/marques-pages" component={BookmarkedRecipes} />
                        <PrivateRoute path="/editer-mon-profil" component={EditProfile} />


                        {/* SEARCH */}
                        <PrivateRoute path="/rechercher" component={SearchPage} />


                        {/* HOME */}
                        <Route path="/" component={HomePage} />


                    </Switch>
                </main>
                <Footer />

            </HashRouter>
            <ToastContainer
                position={toast.POSITION.BOTTOM_RIGHT}
                autoClose={2000}
                hideProgressBar={true}
            />
        </AddRecipeContext.Provider>
    </AuthContext.Provider>
    )
}

const rootElement = document.getElementById('app')
ReactDOM.render(< App />, rootElement)