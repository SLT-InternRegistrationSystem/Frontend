import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../pages/Login";
import InternList from "../pages/InternList";
import LandingPage from "../pages/LandingPage";
import ApplicationForm from "../pages/ApplicationForm";
import ThankYouForApply from "../pages/ThankYouForApply";
import Admin from "../layout/Admin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import NewApplications from "../pages/Admin/NewApplications";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: "/",
                element: <LandingPage/>
            },
            {
                path: "/apply",
                element: <ApplicationForm/>
            },
            {
                path: "/applicationSubmitted",
                element: <ThankYouForApply/>
            },
            {
                path: "/allinterns",
                element: <InternList/>
            },

        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/admin",
        element: <Admin/>,
        children: [
            {
                path: "/admin",
                element: <AdminDashboard/>
            },
            {
                path: "/admin/new-applications",
                element: <NewApplications/>
            }
        ]
    }
])

export default router