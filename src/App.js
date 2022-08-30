import React, {useMemo, useState} from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";

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
	const [posts, setPosts] = useState([
		{id: 1, title: 'Javascript', body: 'Description'},
		{id: 2, title: 'Javascript2', body: 'Description'},
		{id: 3, title: 'Javascript3', body: 'Description'}
	]);

	const [filter, setFilter] = useState({sort: '', query: ''})

	const [modal,setModal] = useState(false);
//==========поиск=====================================================
	const sortedPosts = useMemo(() => {
		if (filter.sort) {
			return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
		}
		return posts;
	}, [filter.sort, posts])

	const sortedAndSearchedPosts = useMemo(() => {
		return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
	}, [filter.query, sortedPosts])
//--------------------------------------------------------------------
	//колбэк функция получающая аргумент из дочерней функции
	const createPost = (newPost) => {
		setPosts([...posts, newPost])
		setModal(false)
	}
	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}
	//каждая новая компонента может быть использована с разными пропсами
	return (
		<div className="App">
			<MyButton style={{marginTop:'30px'}} onClick={()=>setModal(true)}>
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
			<PostList
				remove={removePost}
				posts={sortedAndSearchedPosts}
				title={'Посты про JS'}/>
		</div>
	);
}

export default App;

//отрисовка по условию - {posts.length !== 0
// 			? <PostList remove={removePost} posts={posts} title={'Посты про JS'}/>
//! 				:	<div>Посты не найдены !</div>
// 			}
