import { React, useState } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContext from "./contexts/UserContext.js";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Wallet from "./pages/Wallet";
import NewEntry from "./pages/NewEntry";
import NewExit from "./pages/NewExit";

function App() {
    const [userInfo, setUserInfo] = useState("");

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            <Router>
                <GlobalStyle />
                <Switch>
                    <Route path="/" exact component={SignIn} />
                    <Route path="/signup" exact component={SignUp} />
                    <Route path="/wallet" exact component={Wallet} />
                    <Route path="/new-entry" exact component={NewEntry} />
                    <Route path="/new-exit" exact component={NewExit} />
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
