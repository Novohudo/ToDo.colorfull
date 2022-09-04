import React, {useEffect, useState} from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./components/hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./components/hooks/useFetching";
import {getPageCount, getPagesArray} from "./utils/pages";
import Pagination from "./components/UI/pagination/Pagination";

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
	//состояние для пагинации
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	//с помошью map который возьмет получениые данные - прорисуем кнопки
	const changePage = (page) => {
		setPage(page);
	}
	//------------------------------------------------------------------
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	//обработка индикации загрузки и вывод ошибок
	const [fetchPosts, isLoading, error] = useFetching(async () => {
		const response = await PostService.getAll(limit, page);
		setPosts(response.data);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit))
	})
//юз эфект следит за изменением состояния post и обновляет страницу
	useEffect(() => {
		fetchPosts()
	}, [page])

	//timeout для проверки анимации
	//сервис идет из отдельной компоненты в папке API

	const createPost = (newPost) => {
		setPosts([...posts, newPost])
		setModal(false)
	}
	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	return (
		<div className="App">
			<Pagination
				changePage={changePage}
				page={page}
				totalPages={totalPages}/>
			<MyButton onClick={fetchPosts}>GET POSTS</MyButton>
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

			{/*отображение списка*/}
			{error && <h1>Произошла ошибка {error}</h1>}

			{isLoading
				? <div style={{display: 'flex', justifyContent: 'center', marginTop: "50px"}}><Loader/></div>
				: <PostList
					remove={removePost}
					posts={sortedAndSearchedPosts}
					title={'Посты про JS'}/>}
			{/*отображение кнопок в пагинации*/}

		</div>
	);
}

export default App;