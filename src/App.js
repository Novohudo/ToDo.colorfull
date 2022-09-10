import React, {useEffect, useState} from "react";
import './styles/App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/UI/AppRouter";
import {AuthContext} from "./context";

//browserRouter-отслеживает все пути и перерисовывает компоненты
//Switch позволяет групировать маршруты
//<AuthContext.Provider value-формируем значение которые через провайдер будут оболочкой для всех компонент
//вызываем с помошью хука useContext
function App() {
	const [isAuth,setIsAuth] = useState(false);
	const [isLoading,setIsLoading] = useState(true);

	//проверяет по ключу :auth:  и не дает после перезагрузки сбросить значение авторизации
	useEffect(()=>{
		if(localStorage.getItem('auth')){
			setIsAuth(true)
		}
		setIsLoading(false)
	},[])


	return (
		<AuthContext.Provider value={{
			isAuth,
			setIsAuth,
			isLoading
		}}>
		<BrowserRouter>
			<Navbar/>
			<AppRouter/>
		</BrowserRouter>
		</AuthContext.Provider>
	)
}

export default App;