import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";

//!это заглушка логинизации
//элемент реакции из useEffect(App)->>localStorage.setItem('auth','true')

const Login = () => {
	const {isAuth,setIsAuth}=useContext(AuthContext)
	const login = event =>{
		event.preventDefault();
		setIsAuth(true);
		localStorage.setItem('auth','true')
	}
	return (
		<div>
			<h2>Страница для логина</h2>
			<form onSubmit={login}>
				<MyInput type={'text'} placeholder={"введите логин"}/>
				<MyInput type={'text'} placeholder={"введите пароль"}/>
				<MyButton>Войти</MyButton>
			</form>
		</div>
	);
};

export default Login;