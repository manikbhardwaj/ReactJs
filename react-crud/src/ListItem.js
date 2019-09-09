import React from 'react';

const ListItem = ({ item, editTodo, deleteTodo }) => {
	return <li key={item.id} className="list-group-item" id={item.id} >
            <button
        onClick={editTodo}
        className="btn-sm mr-4 btn-info">
        U
        </button>
            {item.name}
        <button
        onClick={deleteTodo}
        className="btn-sm ml-4 btn-danger">
        X
        </button>
            </li>;
};

export default ListItem;
