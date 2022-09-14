import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateMap, publicMap} from "../../router/routers";
import {AuthContext} from "../../context";
import Loader from "./Loader/Loader";

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

export default AppRouter;