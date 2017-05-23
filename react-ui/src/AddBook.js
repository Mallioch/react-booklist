import React from 'react';
import { store, actions } from './store/store.js';
import $ from 'jquery';
import { withRouter } from 'react-router-dom';

class AddBook extends React.Component {

  constructor() {
    super();

    this.state = store.getState();
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => this.setState(store.getState()));

    if (this.props.match.params.id !== undefined) {
      store.dispatch({ type: actions.START_BOOK_EDIT, bookId: this.props.match.params.id });
    }
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

    const submittedData = {
      title: this.state.addBookTitle,
      author: this.state.addBookAuthor,
      description: this.state.addBookDescription,
      pubYear: this.state.addBookPubYear
    };

    if (this.props.match.params.id !== undefined) {
      //must be editing, so PUT time
      $.ajax({
        url: `/api/book/${this.props.match.params.id}`,
        method: 'PUT',
        data: submittedData
      })
      .done((data) => {
        store.dispatch({
          type: actions.EDIT_BOOK_COMPLETE,
          book: submittedData,
          bookId: this.props.match.params.id
        });
        this.props.history.push('/booklist');
      });
    }
    else {
      //must be new, so POST time
      $.ajax({
        url: '/api/book',
        method: 'POST',
        data: submittedData
      })
      .done((data) => {
        store.dispatch({ type: actions.SAVE_NEW_BOOK, book: data });
      });
    }


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

export default withRouter(AddBook);
