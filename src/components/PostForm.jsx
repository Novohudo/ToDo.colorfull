import React from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import {useState} from "react";

const PostForm = ({create}) => {
	const [post, setPost] = useState({title:'', body:''});
//create(newPost)-передает сформированый обьект на уровень выше к колбеку

	const addNewPost = (e) => {
		e.preventDefault()
		const newPost={
			...post,id:Date.now()
		}
			create(newPost)
		setPost({ title:'',body:''})
	}
	return (
			<form>
				{/*управляемая компонента*/}
				<MyInput
					value={post.title}
					onChange={e => setPost({...post, title: e.target.value})}
					type={"text"}
					placeholder={'название поста'}/>

				{/*Неуправляемая компонента*/}
				<MyInput
					value={post.body}
					onChange={e => setPost({...post, body: e.target.value})}
					type={"text"}
					placeholder={'описание поста'}/>
				<MyButton onClick={addNewPost}>новый пост</MyButton>
			</form>
	);
};

export default PostForm;