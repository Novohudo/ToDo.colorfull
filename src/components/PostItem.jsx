import React from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate} from "react-router-dom";
//useNavigate позволяет использовать историю перехода и по онклику переключать компоненты-аналог useHistory

const PostItem = (props) => {
	const navigate = useNavigate();
	console.log(navigate)
	return (
		<div className="post">
			<div className="post__content">
				<strong>{props.post.id} {props.post.title}</strong>
				<div>
					{props.post.body}
				</div>
			</div>
			<div className="post__btns">
				<MyButton onClick={()=>props.remove(props.post)}>X</MyButton>
				<MyButton onClick={()=>navigate(`/posts/${props.post.id}`)}>Открыть</MyButton>

			</div>
		</div>
	);
};//navigate(`/posts/${props.post.id}`)-для перехода на определенный обьект по id

export default PostItem;