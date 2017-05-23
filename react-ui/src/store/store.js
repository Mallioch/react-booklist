import { createStore } from 'redux';

const actions = {
  LOGIN_USERNAME_CHANGE: 'LOGIN_USERNAME_CHANGE',
  LOGIN_PASSWORD_CHANGE: 'LOGIN_PASSWORD_CHANGE',
  LOGIN: 'LOGIN',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SIGNUP_USERNAME_CHANGE: 'SIGNUP_USERNAME_CHANGE',
  SIGNUP_PASSWORD_CHANGE: 'SIGNUP_PASSWORD_CHANGE',
  SIGNUP: 'SIGNUP',
  SIGNUP_FAILURE: 'SIGNUP_FAILURE',
  LOAD_BOOKS: 'LOAD_BOOKS',
  ADD_BOOK_TITLE_CHANGE: 'ADD_BOOK_TITLE_CHANGE',
  ADD_BOOK_AUTHOR_CHANGE: 'ADD_BOOK_AUTHOR_CHANGE',
  ADD_BOOK_PUB_YEAR_CHANGE: 'ADD_BOOK_PUB_YEAR_CHANGE',
  ADD_BOOK_DESCRIPTION_CHANGE: 'ADD_BOOK_DESCRIPTION_CHANGE',
  SAVE_NEW_BOOK: 'SAVE_NEW_BOOK',
  REMOVE_BOOK: 'REMOVE_BOOK',
  START_BOOK_EDIT: 'START_BOOK_EDIT',
  EDIT_BOOK_COMPLETE: 'EDIT_BOOK_COMPLETE'
}

const initialState = {
  isLoggedIn: false,
  loginUsernameValue: 'mallioch', //tired up typing in my test username
  loginPasswordValue: 'test',
  loginErrorMessage: '',
  signupUsernameValue: '',
  signupPasswordValue: '',
  signupErrorMessage: '',
  books: [],
  addBookTitle: '',
  addBookAuthor: '',
  addBookPubYear: '',
  addBookDescription: ''
}

const reducer = (state = initialState, action) => {
  //console.log('reducer', action);
  switch (action.type) {
    case actions.LOGIN_USERNAME_CHANGE:
      return Object.assign({}, state, { loginUsernameValue: action.value });
    case actions.LOGIN_PASSWORD_CHANGE:
      return Object.assign({}, state, { loginPasswordValue: action.value });
    case actions.LOGIN: {
      return Object.assign({}, state, {
        loginUsernameValue: '',
        loginPasswordValue: '',
        isLoggedIn: true,
        loginErrorMessage: ''
      });
    }
    case actions.LOGIN_FAILURE:
      return Object.assign({}, state, { loginErrorMessage: action.message });
    case actions.LOGOUT:
      return Object.assign({}, state, { isLoggedIn: false });
    case actions.SIGNUP_USERNAME_CHANGE:
      return Object.assign({}, state, { signupUsernameValue: action.value });
    case actions.SIGNUP_PASSWORD_CHANGE:
      return Object.assign({}, state, { signupPasswordValue: action.value });
    case actions.SIGNUP:
      return Object.assign({}, state, {
        signupPasswordValue: '',
        signupUsernameValue: '',
        signupErrorMessage: '',
        isLoggedIn: true
      });
    case actions.SIGNUP_FAILURE:
      return Object.assign({}, state, { signupErrorMessage: action.message });
    case actions.LOAD_BOOKS:
      return Object.assign({}, state, { books: action.books });
    case actions.ADD_BOOK_TITLE_CHANGE:
      return Object.assign({}, state, { addBookTitle: action.value });
    case actions.ADD_BOOK_AUTHOR_CHANGE:
      return Object.assign({}, state, { addBookAuthor: action.value });
    case actions.ADD_BOOK_PUB_YEAR_CHANGE:
      return Object.assign({}, state, { addBookPubYear: action.value });
    case actions.ADD_BOOK_DESCRIPTION_CHANGE:
      return Object.assign({}, state, { addBookDescription: action.value });
    case actions.SAVE_NEW_BOOK:
      const books = state.books.slice();
      books.push(action.book);
      return Object.assign({}, state, {
        books: books,
        addBookTitle: '',
        addBookAuthor: '',
        addBookPubYear: '',
        addBookDescription: ''
      });
    case actions.REMOVE_BOOK:
      const booksCopy = state.books.slice();
      const index = booksCopy.indexOf(action.book);
      booksCopy.splice(index, 1);
      return Object.assign({}, state, { books: booksCopy });
    case actions.START_BOOK_EDIT:
      const bookToEdit = state.books.find((x) => x.id === action.bookId);

      return Object.assign({}, state, {
        addBookTitle: bookToEdit.title,
        addBookAuthor: bookToEdit.author,
        addBookPubYear: bookToEdit.pubYear,
        addBookDescription: bookToEdit.description
      });
    case actions.EDIT_BOOK_COMPLETE:
      return (function(){
        const booksCopy = state.books.slice();
        const editedBook = state.books.find((x, i) => {
          if (x.id === action.bookId) {
            index = i;
            return true;
          }
          return false;
        });
        editedBook.title = action.book.title;
        editedBook.description = action.book.description;
        editedBook.pubYear = action.book.pubYear;
        editedBook.author = action.book.author;

        return Object.assign({}, state, {
          books: booksCopy,
          addBookTitle: '',
          addBookAuthor: '',
          addBookPubYear: '',
          addBookDescription: ''
        });

      })();

    default: return state;
  }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

module.exports = {
  store: store,
  actions: actions
}
