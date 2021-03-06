import React from 'react';
import { store, actions } from './store/store.js';
import $ from 'jquery';
import { withRouter } from 'react-router-dom';
import BookForm from './BookForm.js';

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

  handleSaveClick(submittedData) {
    $.ajax({
      url: '/api/book',
      method: 'POST',
      data: submittedData
    })
    .done((data) => {
      store.dispatch({ type: actions.SAVE_NEW_BOOK, book: data });
    });

  }

  render() {
    return (
      <div>
        <BookForm {...this.state} onSave={(data) => this.handleSaveClick(data)} />
      </div>
    );
  }

}

export default withRouter(AddBook);
