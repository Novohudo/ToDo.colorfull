import React, {useState} from "react";
import './styles/App.css'
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";

//rsc-снипед для создания функции

function App() {
	const [posts, setPosts] = useState([
		{id: 1, title: 'Javascript', body: 'Description'},
		{id: 2, title: 'Javascript 2', body: 'Description'},
		{id: 3, title: 'Javascript 3', body: 'Description'}
	])
	const [posts2, setPosts2] = useState([
		{id: 1, title: 'python', body: 'Description'},
		{id: 2, title: 'python 2', body: 'Description'},
		{id: 3, title: 'python 3', body: 'Description'}
	])
	return (
		<div className="App">
			<PostList posts={posts} title={'Посты про JS'}/>
			<PostList posts={posts2} title={'Посты про Python'}/>
		</div>
	);
}

export default App;
