import API from "./API";
import { HomeController} from "./Home";

const Routes = {
    "/api": API,
    "/": [ HomeController ]
};

export default Routes;