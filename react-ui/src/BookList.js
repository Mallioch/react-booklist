import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { store, actions } from './store/store.js';
import $ from 'jquery';

class BookList extends React.Component {

  constructor() {
    super();

    this.state = store.getState();
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => {
      this.setState(store.getState())
    });

    //If there are already books in state, no need to load.
    if (this.state.books.length === 0) {
      $.ajax({
        url: '/api/books'
      })
      .done((data) => {
        store.dispatch({ type: actions.LOAD_BOOKS, books: data.books });
      });
    }
  }

  componentWillUnmount() {
    this.unsub();
  }

  handleDelete(book) {
    $.ajax({
      url: `/api/book/${book.id}`,
      method: 'DELETE'
    })
    .done(() => {
      store.dispatch({ type: actions.REMOVE_BOOK, book: book });
    });
  }

  handleEdit(book) {
    this.props.history.push(`/editbook/${book.id}`)
  }

  render() {

    //console.log('state', this.state);

    let display;
    if (this.state.books.length === 0) {
      display = <p>You have no books? Scandalous! Are you uneducated? Prove that untrue by <Link to="/addbook">adding a new book now!</Link></p>
    }
    else {
      const items = this.state.books.map((book) => {
        return <li key={book.id} className="list-group-item">
          {book.title} by {book.author} ({book.pubYear})
          <button
            type="button"
            className="btn btn-danger btn-xs pull-right"
            onClick={() => this.handleDelete(book)}>Delete</button>
          <button
            type="button"
            className="btn btn-default btn-xs pull-right"
            onClick={() => this.handleEdit(book)}>Edit</button>
        </li>
      });

      display = <ul className="list-group">
        {items}
      </ul>
    }

    return (
      <div>
        {display}
      </div>
    );
  }

}

module.exports = withRouter(BookList);
