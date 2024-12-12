import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AddIntern from "../pages/AddIntern";
import InternList from "../pages/InternList";
import Login from "../pages/Login";

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
                element: <InternList/>
            },

        ]
    },
    {
        path: "/login",
        element: <Login/>
    }
])

export default router