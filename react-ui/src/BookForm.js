import React from 'react';
import { store, actions } from './store/store.js';

class BookForm extends React.Component {

  handleChange(actionName, evt) {
    store.dispatch({ type: actionName, value: evt.target.value });
  }

  handleSave() {
    const submittedData = {
      title: this.props.addBookTitle,
      author: this.props.addBookAuthor,
      description: this.props.addBookDescription,
      pubYear: this.props.addBookPubYear
    };

    this.props.onSave(submittedData);
  }

  render() {
    return (
      <div>
      <div className="form-group">
        <input
          className="form-control"
          value={this.props.addBookTitle}
          onChange={(evt) => this.handleChange(actions.ADD_BOOK_TITLE_CHANGE, evt)}
          placeholder="title" />
      </div>

      <div className="form-group">
        <input
          className="form-control"
          value={this.props.addBookAuthor}
          onChange={(evt) => this.handleChange(actions.ADD_BOOK_AUTHOR_CHANGE, evt)}
          placeholder="author" />
      </div>

      <div className="form-group">
        <input
          className="form-control"
          value={this.props.addBookPubYear}
          onChange={(evt) => this.handleChange(actions.ADD_BOOK_PUB_YEAR_CHANGE, evt)}
          placeholder="year of publication" />
      </div>

      <div className="form-group">
        <textarea
          className="form-control"
          onChange={(evt) => this.handleChange(actions.ADD_BOOK_DESCRIPTION_CHANGE, evt)}
          value={this.props.addBookDescription}></textarea>
      </div>

      <button className="btn btn-default" onClick={() => this.handleSave()}>save</button>
      </div>
    );
  }

}

export default BookForm;
