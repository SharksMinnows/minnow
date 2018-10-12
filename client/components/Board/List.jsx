import React, { Component } from 'react';

function List(props) {
  const { items } = props;

  if (!items.length) {
    return <span className="empty-message">Nothing</span>
  }

  return (
    <ul className="list-items">
      {items.map(elem => <li key={elem} className="item">{elem}</li>)}
    </ul>
  )
}

export default List;