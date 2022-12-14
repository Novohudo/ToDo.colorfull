import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../components/hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
	const params = useParams();
	const [post, setPost] = useState({})
	const [comments, setComments] = useState([])

	const [fetchPostById, isLoading, error] = useFetching(async () => {
		const response = await PostService.getById(params.id)
		setPost(response.data)
	})
	const [fetchComments, isComLoading, comError] = useFetching(async () => {
		const response = await PostService.getCommentsByPostId(params.id)
		setComments(response.data)
	})

	useEffect(() => {
		fetchPostById(params.id)
		fetchComments(params.id)
	}, [])
	return (
		<div className={"pageIdWrap"}>
			<h1>You are open page with ID = {params.id}</h1>
			{isLoading
				? <Loader/>
				: <div>{post.id}.{post.title}</div>
			}
			<h1>Comments</h1>
			{isComLoading
				? <Loader/>
				: <div style={{marginTop: 15}}>
					{comments.map(comm =>
						<div>
							<h5>{comm.email}</h5>
							<div>{comm.body}</div>
						</div>
					)}
				</div>
			}

		</div>
	);
};

export default PostIdPage;