import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './components/SearchBooks'
import Bookshelf from './components/Bookshelf'
import { Link, Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount = () => {
    this.getBooks();
  }

  getBooks = () => {
    BooksAPI.getAll()
      .then((data) => {
        this.setState({ books: data });
      })
  }

  getBooksForShelf = (shelf) => {
    return this.state.books.filter(book => book.shelf === shelf);
  }

  handleShelfChanged = (book, event) => {
    const newShelf = event.target.value;
    BooksAPI.update(book, newShelf)
      .then((data) => {
        this.setState(currentState => {
          const changedBook =
            currentState.books.find(currentBook => currentBook === book);
          changedBook.shelf = newShelf;
          return currentState.books;
        });
      });
  }

  getNewBooks = () => {
    this.getBooks();
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  name="Currently Reading"
                  books={this.getBooksForShelf("currentlyReading")}
                  onShelfChanged={this.handleShelfChanged} />
                <Bookshelf
                  name="Want to Read"
                  books={this.getBooksForShelf("wantToRead")}
                  onShelfChanged={this.handleShelfChanged} />
                <Bookshelf
                  name="Read"
                  books={this.getBooksForShelf("read")}
                  onShelfChanged={this.handleShelfChanged} />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search' className="open-search-button">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path='/search' render={() => (
          <SearchBooks onSearchedBookChanged={this.getNewBooks}/> 
        )}/>
      </div>
    )
  }
}

export default BooksApp
