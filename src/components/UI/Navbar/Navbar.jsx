import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {
	const {isAuth, setIsAuth} = useContext(AuthContext)

	const logout = () =>{
		setIsAuth(false);
		localStorage.removeItem('auth');
	}

	return (
		<div className={"navbar"}>
			<div className="navbar__links">
				<Link to={"/about"}>About</Link>
				<Link to={"/posts"}>Posts</Link>
			</div>
			<MyButton style={{marginLeft: 40}} onClick={logout}>Log out</MyButton>
		</div>
	);
};

export default Navbar;