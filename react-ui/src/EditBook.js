import React from 'react';
import { store, actions } from './store/store.js';
import BookForm from './BookForm.js';
import $ from 'jquery';

class EditBook extends React.Component {

  constructor() {
    super();

    this.state = store.getState();
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => this.setState(store.getState()));

    store.dispatch({ type: actions.START_BOOK_EDIT, bookId: this.props.match.params.id });
  }

  handleSaveClick(submittedData) {

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

  render() {
    return (
      <div>
        <BookForm {...this.state} onSave={(data) => this.handleSaveClick(data)} />
      </div>
    )
  }

}

export default EditBook;
