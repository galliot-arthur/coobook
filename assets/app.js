import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './bootstrap';
import './css/app.css';
import { NavBar } from './js/components/Navbar';
import PrivateRoute from './js/components/PrivateRoute';
import { CustomerPage } from './js/pages/CustomerPage';
import { HomePage } from './js/pages/HomePage';
import { InvoicePage } from './js/pages/InvoicePage';
import LoginPage from './js/pages/LoginPage';
import authAPI from './js/services/authAPI';
import AuthContext from './js/context/AuthContext';
import RegisterPage from './js/pages/RegisterPage';



const App = () => {
    const [connected, setConnected] = useState(authAPI.setUp())
    const NavbarWithRouter = withRouter(NavBar)
    const contextValue = { connected, setConnected }

    return (
        <AuthContext.Provider value={contextValue}>
            <HashRouter>
                <NavbarWithRouter />
                <main className="container">
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <PrivateRoute path="/clients" component={CustomerPage} />
                        <PrivateRoute path="/factures" component={InvoicePage} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>
        </AuthContext.Provider>
    )
}

const rootElement = document.getElementById('app')
ReactDOM.render(<App />, rootElement)
