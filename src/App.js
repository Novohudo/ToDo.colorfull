import React, { useState} from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

//rsc-снипед для создания функции
//e.preventDefault()-предотвращает дефолтное поведение
//useRef()-для доступа к дом дереву и извлечению значений
//(post.filter(p=>p.id !== post.id))-отфильтровывает обьект по указаному варианту (отфильтрованый обьект выполнен не будет
//если id переданого обьекта равняеться тому что есть внутри - совпадение будет удалено
function App() {
	const [posts, setPosts] = useState([
		{id:1,title:'Javascript', body:'Description'},
		{id:2,title:'Javascript2', body:'Description'},
		{id:3,title:'Javascript3', body:'Description'}
	]);
	//колбэк функция получающая аргумент из дочерней функции
	const createPost=(newPost)=>{
		setPosts([...posts,newPost])
	}
	const removePost=(post)=>{
		setPosts(posts.filter(p=>p.id !== post.id))
	}
	//каждая новая компонента может быть использована с разными пропсами
	return (
		<div className="App">
			<PostForm create={createPost}/>
			<PostList remove={removePost} posts={posts} title={'Посты про JS'}/>

		</div>
	);
}

export default App;
