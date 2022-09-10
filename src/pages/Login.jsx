import React from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";

const Login = () => {
	return (
		<div>
			<h2>Страница для логина</h2>
			<form>
				<MyInput type={'text'} placeholder={"введите логин"}/>
				<MyInput type={'text'} placeholder={"введите пароль"}/>
				<MyButton>Войти</MyButton>
			</form>
		</div>
	);
};

export default Login;