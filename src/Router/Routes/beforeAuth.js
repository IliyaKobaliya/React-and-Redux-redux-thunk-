import SignIn from "../../Components/SignIn";
import SignUp from "../../Components/SignUp";


const AppRoutesBefore = [
    {
        component: SignIn,
        path: `/SignIn`,
        key: 1
    },
    {
        component: SignUp,
        path: `/SignUp`,
        key: 2
    }
];

export default AppRoutesBefore;