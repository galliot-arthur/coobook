import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './bootstrap';
import './css/app.css';
import './css/GT-MARU.woff2';
import Fetcher from './js/components/Fetcher';
import Footer from './js/components/Footer';
import NavBar from './js/components/Navbar';
import PrivateRoute from './js/components/PrivateRoute';
import useWindowDimensions from './js/hooks/useWindowDimensions';
import AdminIdex from './js/pages/Admin/AdminIndex';
import AddComment from './js/pages/Comment/AddComment';
import { HomePage } from './js/pages/HomePage';
import About from './js/pages/infos/About';
import CGU from './js/pages/infos/CGU';
import Contact from './js/pages/infos/Contact';
import RGPD from './js/pages/infos/RGPD';
import LoginPage from './js/pages/LoginPage';
import AddIngredients from './js/pages/Recipe/AddIngredients';
import AddRecipe from './js/pages/Recipe/AddRecipe';
import AddRecipeCover from './js/pages/Recipe/AddRecipeCover';
import AddRecipeStep from './js/pages/Recipe/AddRecipeStep';
import EditRecipe from './js/pages/Recipe/EditRecipe';
import ShowRecipe from './js/pages/Recipe/ShowRecipe';
import RegisterPage from './js/pages/RegisterPage';
import SearchPage from './js/pages/SearchPage';
import BookmarkedRecipes from './js/pages/User/BookmarkedRecipes';
import EditProfile from './js/pages/User/EditProfile';
import Profile from './js/pages/User/Profile';
import { store } from './store';


const App = () => {

    const NavbarWithRouter = withRouter(NavBar)
    /* HANDLE WINDOW RESIZE */
    const { width } = useWindowDimensions()

    return (
        <Provider store={store}>
            <HashRouter>
                <Fetcher />
                <div className="row">
                    <NavbarWithRouter />
                    {/* MAIN */}
                    <main className={width > 991 ? 'col px-5 pt-3' : 'container'} >
                        <Switch >

                            {/* SECURITY */}
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />

                            {/* RECIPES */}
                            <PrivateRoute path="/enregistrer-recette/:id" component={AddRecipe} />
                            <PrivateRoute path="/enregistrer-ingredients/:id" component={AddIngredients} />
                            <PrivateRoute path="/enregistrer-etape/" component={AddRecipeStep} />
                            <PrivateRoute path="/enregistrer-photo/" component={AddRecipeCover} />
                            <PrivateRoute path="/modifier-recette/:id" component={EditRecipe} />
                            <PrivateRoute path="/recette/:id" component={ShowRecipe} />

                            {/* COMMENTS */}
                            <PrivateRoute path="/commenter/:id" component={AddComment} />

                            {/* USER */}
                            <PrivateRoute path="/profil/:id" component={Profile} />
                            <PrivateRoute path="/marques-pages" component={BookmarkedRecipes} />
                            <PrivateRoute path="/editer-mon-profil" component={EditProfile} />

                            {/* SEARCH */}
                            <PrivateRoute path="/rechercher" component={SearchPage} />

                            {/* ADMIN */}
                            <PrivateRoute path="/admin" component={AdminIdex} />

                            {/* HOME */}
                            <Route path="/contact" component={Contact} />
                            <Route path="/coobook-cgu" component={CGU} />
                            <Route path="/rgpd" component={RGPD} />
                            <Route path="/a-propos" component={About} />
                            <Route path="/" component={HomePage} />

                        </Switch>
                    </main>

                    {width > 922 && <aside className='col-1 text-muted sticky-top'></aside>}
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