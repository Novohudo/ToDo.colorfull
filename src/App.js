import React from "react";
import './styles/App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/UI/AppRouter";

//browserRouter-отслеживает все пути и перерисовывает компоненты
//Switch позволяет групировать маршруты
function App() {
	return (
		<BrowserRouter>
			<Navbar/>
			<AppRouter/>
		</BrowserRouter>
	)
}

export default App;