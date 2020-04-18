import React from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'

class SearchBooks extends React.Component {
    state = {
        findBooks: [],
        query: ""
    }

    isBookWithShelf(element, shelfedBook) {
        return (element.title === shelfedBook.title && element.subtitle === shelfedBook.subtitle);
    }

    assignShelves = (searchResult) => {
        const booksOnShelves = this.props.booksOnShelves;
        booksOnShelves.forEach(book => {
            const bookToUpdate = searchResult.find(result => this.isBookWithShelf(result, book));
            if (bookToUpdate) {
                bookToUpdate.shelf = book.shelf;
            }
        });
        return searchResult;
    }

    findBooks = (query) => {
        if (query !== "") {
            BooksAPI.search(query)
                .then(data => {
                    const result = data instanceof Array ? data : []; 
                    if (result.length > 0) {
                        this.assignShelves(result)
                    }
                    this.setState(() => ({
                        findBooks: result
                    }))
                });
        }
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }), this.findBooks(query))
    }

    handleShelfChanged = (book, event) => {
        const newShelf = event.target.value;
        BooksAPI.update(book, newShelf)
            .then((data) => {
                this.setState(currentState => {
                    this.props.onSearchedBookChanged();
                    const changedBook =
                        currentState.findBooks.find(currentBook => currentBook === book);
                    changedBook.shelf = newShelf;
                    return currentState.findBooks;
                });
            });
    }

    render() {
        const { query, findBooks } = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {(query !== "" && findBooks) &&
                            findBooks?.map(book => (
                                <li key={book.id}>
                                    <Book book={book} onShelfChanged={this.handleShelfChanged} />
                                </li>
                            ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBooks