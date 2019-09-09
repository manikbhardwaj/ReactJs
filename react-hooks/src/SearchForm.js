import React from 'react';

const SearchForm = (props) => (
		<form onSubmit={props.handleSub}>
			<input type="text" value={props.searchQuery} onChange={props.handleChange} />
			<button>Search</button>
		</form>
	);

	export default SearchForm;
