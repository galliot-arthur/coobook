import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, withRouter } from 'react-router-dom';
import './bootstrap';
import './css/app.css'
import './css/GT-MARU.woff2'
import NavBar from './js/components/Navbar';
import PrivateRoute from './js/components/PrivateRoute';
import { HomePage } from './js/pages/HomePage';
import LoginPage from './js/pages/LoginPage';
import RegisterPage from './js/pages/RegisterPage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './js/components/Footer';
import AddRecipe from './js/pages/Recipe/AddRecipe';
import AddRecipeStep from './js/pages/Recipe/AddRecipeStep';
import AddIngredients from './js/pages/Recipe/AddIngredients';
import AddRecipeCover from './js/pages/Recipe/AddRecipeCover';
import ShowRecipe from './js/pages/Recipe/ShowRecipe';
import BookmarkedRecipes from './js/pages/User/BookmarkedRecipes'
import SearchPage from './js/pages/SearchPage';
import AddComment from './js/pages/Comment/AddComment';
import EditProfile from './js/pages/User/EditProfile';
import Profile from './js/pages/User/Profile';
import About from './js/pages/infos/About';
import Contact from './js/pages/infos/Contact';
import { store } from './store';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import useWindowDimensions from './js/hooks/useWindowDimensions';
import Fetcher from './js/components/Fetcher';


const App = () => {

    const NavbarWithRouter = withRouter(NavBar)
    /* HANDLE WINDOW RESIZE */
    const { width } = useWindowDimensions()

    return (
        <Provider store={store}>
            <Fetcher />
            <HashRouter>
                <div className="row">

                    <NavbarWithRouter />

                    {/* MAIN */}
                    <main className={width > 991 ? 'col-9 px-5 pt-5' : 'container'} >
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
                            <PrivateRoute path="/profil/:id" component={Profile} />
                            <PrivateRoute path="/marques-pages" component={BookmarkedRecipes} />
                            <PrivateRoute path="/editer-mon-profil" component={EditProfile} />


                            {/* SEARCH */}
                            <PrivateRoute path="/rechercher" component={SearchPage} />


                            {/* HOME */}
                            <Route path="/contact" component={Contact} />
                            <Route path="/a-propos" component={About} />
                            <Route path="/" component={HomePage} />


                        </Switch>
                    </main>
                </div>

                {width < 992 && <Footer />}
            </HashRouter>
            <ToastContainer
                position={toast.POSITION.BOTTOM_RIGHT}
                autoClose={2000}
                hideProgressBar={true}
            />
        </Provider>
    )
}

const rootElement = document.getElementById('app')
ReactDOM.render(< App />, rootElement)