import Posts from "../pages/Posts";
import About from "../pages/About";
import PostIdPage from "../pages/PostIdPage";
import {Route} from "react-router-dom";
import Login from "../pages/Login";

const privateRoutes = [
	{path: "/posts", element: <Posts/>},
	{path: "/about", element: <About/>},
	{path: "/posts/:id", element: <PostIdPage/>},
]
const publicRoutes = [
	{path: "/login", element: <Login/>},
]

export const privateMap = privateRoutes.map(route =>
	<Route path={route.path} element={route.element}/>
)
export const publicMap = publicRoutes.map(route =>
	<Route path={route.path} element={route.element}/>
)