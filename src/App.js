import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './components/SearchBooks'
import Bookshelf from './components/Bookshelf'

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
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

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage
          ? <SearchBooks />
          : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Bookshelf name="Currently Reading" books={this.getBooksForShelf("currentlyReading")} />
                  <Bookshelf name="Want to Read" books={this.getBooksForShelf("wantToRead")} />
                  <Bookshelf name="Read" books={this.getBooksForShelf("read")} />
                </div>
              </div>
              <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
