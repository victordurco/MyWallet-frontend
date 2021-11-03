import { React } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Wallet from "./pages/Wallet";
import NewEntry from "./pages/NewEntry";
import NewExit from "./pages/NewExit";

function App() {

    return (
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
    );
}

export default App;
