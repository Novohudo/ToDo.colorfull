import React, {useRef, useState} from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";

//rsc-снипед для создания функции
//e.preventDefault()-предотвращает дефолтное поведение
//useRef()-для доступа к дом дереву и извлечению значений

function App() {
	const [posts, setPosts] = useState([
		{id:1,title:'Javascript', body:'Description'},
		{id:2,title:'Javascript2', body:'Description'},
		{id:3,title:'Javascript3', body:'Description'}
	]);
	const [newPost, setNewPost] = useState({title:'', body:''});
	//сокращаем код не создавая кучи хуков-используй мультизадачный хук
	//создавая в хуке обьект для внедрения в стейт
	// const [title, setTitle] = useState('');
	// const [body, setBody] = useState('');

	const addNewPost = (e) => {
		e.preventDefault();
		setPosts([...posts,{...newPost,id:Date.now()}])
		setNewPost({ title:'',body:''})
	}
	return (
		<div className="App">
			<form>
				{/*управляемая компонента*/}
				<MyInput
					value={newPost.title}
					onChange={e => setNewPost({...newPost, title: e.target.value})}
					type={"text"}
					placeholder={'название поста'}/>

				{/*Неуправляемая компонента*/}
				<MyInput
					value={newPost.body}
					onChange={e => setNewPost({...newPost, body: e.target.value})}
					type={"text"}
					placeholder={'описание поста'}/>
				<MyButton onClick={addNewPost}>новый пост</MyButton>
			</form>
			<PostList posts={posts} title={'Посты про JS'}/>

		</div>
	);
}

export default App;
