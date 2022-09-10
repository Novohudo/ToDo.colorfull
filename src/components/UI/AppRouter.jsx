import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateMap, publicMap} from "../../router/routers";

//обьект privateMap/publicMap -содержит в себе шаблон работы с роутами -routes.jsx
const AppRouter = () => {
	const isAuth = false;
	return (
		isAuth
			?
			<Routes>
				{privateMap}
				<Route path="/*" element={<Navigate replace to="/posts"/>}/>
			</Routes>
			:
			<Routes>
				{publicMap}
				<Route path="/*" element={<Navigate replace to="/login"/>}/>
			</Routes>
	)
};
//<Route path="/posts/:id" element={<PostIdPage/>}/>-работает с navigate(`/posts/${props.post.id}`)
export default AppRouter;