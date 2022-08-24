import React, {useState} from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";

//rsc-снипед для создания функции
//e.preventDefault()-предотвращает дефолтное поведение

function App() {
	const [posts, setPosts] = useState([
		{id: 1, title: 'Javascript', body: 'Description'},
		{id: 2, title: 'Javascript 2', body: 'Description'},
		{id: 3, title: 'Javascript 3', body: 'Description'}
	])
	const [title,setTitle] = useState('')
	const addNewPost =(e)=>{
		e.preventDefault()
		console.log(title)
	}

	return (
		<div className="App">
			<form>
				{/*управляемая компонента*/}
				<MyInput
					value={title}
					onChange={e=>setTitle(e.target.value)}
					type={"text"}
					placeholder={'название поста'}/>
				<MyInput type={"text"} placeholder={'описание поста'}/>
				<MyButton onClick={addNewPost}>новый пост</MyButton>
			</form>
			<PostList posts={posts} title={'Посты про JS'}/>

		</div>
	);
}

export default App;
