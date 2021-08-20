import { Route, Router, Switch } from "react-router-dom";
import SearchView from "./SearchView"
import ServiceOrder from "./ServiceOrder";

const LoggedInView = () => {
    return (
        <div>
            <SearchView />
            <Router>
                <Switch>
                    <Route path="/ServiceOrder/:id" exact component={ServiceOrder} />
                </Switch>
            </Router>
        </div>
    );
};

export default LoggedInView;