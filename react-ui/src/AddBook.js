import React from 'react';
import { store, actions } from './store/store.js';
import $ from 'jquery';

class AddBook extends React.Component {

  constructor() {
    super();

    this.state = store.getState();
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsub();
  }

  handleTitleChange(evt) {
    store.dispatch({ type: actions.ADD_BOOK_TITLE_CHANGE, value: evt.target.value });
  }

  handleAuthorChange(evt) {
    store.dispatch({ type: actions.ADD_BOOK_AUTHOR_CHANGE, value: evt.target.value });
  }

  handlePubYearChange(evt) {
    store.dispatch({ type: actions.ADD_BOOK_PUB_YEAR_CHANGE, value: evt.target.value });
  }

  handleDescriptionChange(evt) {
    store.dispatch({ type: actions.ADD_BOOK_DESCRIPTION_CHANGE, value: evt.target.value });
  }

  handleSaveClick() {

    const data = {
      title: this.state.addBookTitle,
      author: this.state.addBookAuthor,
      description: this.state.addBookDescription,
      pubYear: this.state.addBookPubYear
    };

    $.ajax({
      url: '/api/book',
      method: 'POST',
      data: data
    })
    .done((data) => {
      store.dispatch({ type: actions.SAVE_NEW_BOOK, book: data });
    });

  }

  render() {
    return (
      <div>

        <div className="form-group">
          <input
            className="form-control"
            value={this.state.addBookTitle}
            onChange={(evt) => this.handleTitleChange(evt)}
            placeholder="title" />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            value={this.state.addBookAuthor}
            onChange={(evt) => this.handleAuthorChange(evt)}
            placeholder="author" />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            value={this.state.addBookPubYear}
            onChange={(evt) => this.handlePubYearChange(evt)}
            placeholder="year of publication" />
        </div>

        <div className="form-group">
          <textarea
            className="form-control"
            onChange={(evt) => this.handleDescriptionChange(evt)}
            value={this.state.addBookDescription}></textarea>
        </div>

        <button className="btn btn-default" onClick={() => this.handleSaveClick()}>save</button>
      </div>
    );
  }

}

export default AddBook;
