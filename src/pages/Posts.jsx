import React, {useEffect, useRef, useState} from "react";
import '../styles/App.css'
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {usePosts} from "../components/hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import {useFetching} from "../components/hooks/useFetching";
import {getPageCount} from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../components/hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({sort: '', query: ''})
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const lastElement = useRef();

	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

	const [fetchPosts, isLoading, error] = useFetching(async () => {
		const response = await PostService.getAll(limit, page);
		setPosts([...posts, ...response.data]);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit))
	})

	useObserver(lastElement, page < totalPages, isLoading, () => {
		setPage(page + 1);
	})
	useEffect(() => {
		fetchPosts(limit, page)
	}, [page,limit])

	const changePage = (page) => {
		setPage(page);
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
			<Pagination
				changePage={changePage}
				page={page}
				totalPages={totalPages}/>
			<MyButton style={{marginTop: '30px', marginLeft: '2px'}} onClick={() => setModal(true)}>
				Create Post
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

			<div style={{backgroundColor:"rgba(255, 255, 255, 0.29)",width:177,marginTop:5,padding:5}}>
			<MySelect
			value={limit}
			onChange={value=>setLimit(value)}
			defaultValue={"number of items on page"}
			options={[
				{value:5,name:'items:5'},
				{value:10,name:'items:10'},
				{value:25,name:'items:25'},
				{value:-1,name:'items:show all'},
			]}
			/>
			</div>
			{error && <h1>Error{error}</h1>}

			{isLoading &&
				<div style={{display: 'flex', justifyContent: 'center', marginTop: "50px"}}><Loader/></div>
			}
			<PostList
				remove={removePost}
				posts={sortedAndSearchedPosts}
				title={'Posts'}/>

			<div ref={lastElement}></div>

		</div>
	);
}

export default Posts;