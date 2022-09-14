import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
	return (
		<div>
			<MyInput
				style={{background:'transparent'}}
				value={filter.query}
				onChange={e => setFilter({...filter, query: e.target.value})}
				placeholder={"search..."}
			/>
			<MySelect
				value={filter.sort}
				onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
				defaultValue={"Sorting"}
				options={[
					{value: 'title', name: 'name'},
					{value: 'body', name: 'description'},
				]}
			/>
		</div>
	);
};

export default PostFilter;