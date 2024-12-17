import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AddIntern from "../pages/AddIntern";
import Login from "../pages/Login";
import Interns from "../pages/Interns";
import InternList from "../pages/InternList";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: "/",
                element: <AddIntern/>
            },
            {
                path: "/interns",
                element: <Interns/>
            },

        ]
    },
    {
        path: "/login",
        element: <Login/>
    }
])

export default router