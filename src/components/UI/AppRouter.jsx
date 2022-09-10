import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateMap, publicMap} from "../../router/routers";
import {AuthContext} from "../../context";
import Loader from "./Loader/Loader";

//const {isAuth,setIsAuth}=useContext(AuthContext);-вызов данных из контекста
//обьект privateMap/publicMap -содержит в себе шаблон работы с роутами -routes.jsx
const AppRouter = () => {
	const {isAuth,isLoading} = useContext(AuthContext);

	if(isLoading){
		return <Loader/>
	}

	return (
		isAuth
			?
			<Routes >
				{privateMap}
				<Route  path="/*" element={<Navigate replace to="/posts"/>}/>
			</Routes>
			:
			<Routes >
				{publicMap}
				<Route  path="/*" element={<Navigate replace to="/login"/>}/>
			</Routes>
	)
};
//<Route path="/posts/:id" element={<PostIdPage/>}/>-работает с navigate(`/posts/${props.post.id}`)
export default AppRouter;