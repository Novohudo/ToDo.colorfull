import React, {useState} from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";

//rsc-снипед для создания функции
//e.preventDefault()-предотвращает дефолтное поведение
//useRef()-для доступа к дом дереву и извлечению значений
//(post.filter(p=>p.id !== post.id))-отфильтровывает обьект по указаному варианту (отфильтрованый обьект выполнен не будет
//если id переданого обьекта равняеться тому что есть внутри - совпадение будет удалено
//options={[
// 						{value:'title',name:'По названию'},
// 						{value:'body',name:'По описанию'},
// 					]}именно по этим обьектам из хука posts будет происходить сортировка


function App() {
	const [posts, setPosts] = useState([
		{id: 1, title: 'Javascript', body: 'Description'},
		{id: 2, title: 'Javascript2', body: 'Description'},
		{id: 3, title: 'Javascript3', body: 'Description'}
	]);
	const [selectedSort,setSelectedSort] = useState('');
	//колбэк функция получающая аргумент из дочерней функции
	const createPost = (newPost) => {
		setPosts([...posts, newPost])
	}
	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}
	const sortPosts=(sort)=>{
		setSelectedSort(sort)
		setPosts([...posts].sort((a,b)=>a[sort].localeCompare(b[sort])))
	}
	//каждая новая компонента может быть использована с разными пропсами
	return (
		<div className="App">
			<PostForm create={createPost}/>
			<hr style={{margin:'15px 0'}}/>
			<div>
				<MySelect
					value={selectedSort}
					onChange={sortPosts}
					defaultValue={"Сортировка"}
					options={[
						{value:'title',name:'По названию'},
						{value:'body',name:'По описанию'},
					]}
				/>
			</div>

			{posts.length !== 0
				? <PostList remove={removePost}
						  posts={posts}
						  title={'Посты про JS'}/>

				: <h1 style={{textAlign: 'center'}}>Посты не найдены !</h1>
			}
		</div>
	);
}

export default App;

//отрисовка по условию - {posts.length !== 0
// 			? <PostList remove={removePost} posts={posts} title={'Посты про JS'}/>
//! 				:	<div>Посты не найдены !</div>
// 			}
