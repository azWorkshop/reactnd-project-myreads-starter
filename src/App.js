import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './components/SearchBooks'
import Bookshelf from './components/Bookshelf'
import { Link, Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    updatedBookShelf: null
  }

  componentDidMount = () => {
    BooksAPI.getAll()
      .then((data) => {
        this.setState({ books: data });
      })
  }

  getBooksForShelf = (shelf) => {
    return this.state.books.filter(book => book.shelf === shelf);
  }

  handleShelfChanged = (book, event) => {
    const changedBook = this.state.books.find(b => b === book);
    changedBook.shelf = event.target.value;
    this.setState({ updatedBookShelf: changedBook });
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
              <Link to='/add' className="open-search-button">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path='/add' component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
