import React, {useEffect, useState} from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./components/hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";

//rsc-снипед для создания функции
//e.preventDefault()-предотвращает дефолтное поведение
//useRef()-для доступа к дом дереву и извлечению значений
//(post.filter(p=>p.id !== post.id))-отфильтровывает обьект по указаному варианту (отфильтрованый обьект выполнен не будет
//если id переданого обьекта равняеться тому что есть внутри - совпадение будет удалено
//options={[
// 						{value:'title',name:'По названию'},
// 						{value:'body',name:'По описанию'},
// 					]}именно по этим обьектам из хука posts будет происходить сортировка
//Метод includes() определяет, содержит ли массив определённый элемент, возвращая в зависимости от этого true или false.

function App() {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({sort: '', query: ''})
	const [modal, setModal] = useState(false);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const [isPostsLoading, setPostsLoading] = useState(false)
	useEffect(() => {
		fetchPosts()
	}, [])

	//сервис идет из отдельной компоненты в папке API
	async function fetchPosts() {
		setPostsLoading(true)
		const posts = await PostService.getAll();
		setPosts(posts);
		setPostsLoading(false)
	}

	const createPost = (newPost) => {
		setPosts([...posts, newPost])
		setModal(false)
	}
	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	return (
		<div className="App">
			<button onClick={fetchPosts}>GET POSTS</button>
			<MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
				Создать пользователя
			</MyButton>
			<MyModal
				visible={modal}
				setVisible={setModal}
			>
				<PostForm create={createPost}/>
			</MyModal>
			<hr style={{margin: '15px 0'}}/>
			<PostFilter
				filter={filter}
				setFilter={setFilter}/>

			{isPostsLoading
				? <h1>Загружаю</h1>
				: <PostList
					remove={removePost}
					posts={sortedAndSearchedPosts}
					title={'Посты про JS'}/>}
		</div>
	);
}

export default App;