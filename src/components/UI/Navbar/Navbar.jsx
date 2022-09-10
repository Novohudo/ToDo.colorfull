import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {
	const {isAuth, setIsAuth} = useContext(AuthContext)
//элемент реакции из useEffect(App)
	const logout = () =>{
		setIsAuth(false);
		localStorage.removeItem('auth');
	}

	return (
		<div className={"navbar"}>
			<div className="navbar__links">
				<Link to={"/about"}>О Сайте</Link>
				<Link to={"/posts"}>Посты</Link>
			</div>
			<MyButton style={{marginLeft: 40}} onClick={logout}>Выйти</MyButton>
		</div>
	);
};

export default Navbar;