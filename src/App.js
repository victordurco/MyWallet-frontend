import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";

function App() {
    return (
        <div>
            <Router>
                <GlobalStyle />
                <Switch>
                    <Route path="/" exact component={SignIn} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
