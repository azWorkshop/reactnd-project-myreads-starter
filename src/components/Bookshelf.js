import React from 'react'
import Book from './Book'

class Bookshelf extends React.Component {
    render() {
        const { name, books, onShelfChanged } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book => (
                            <li key={book.id}>
                                <Book book={book} onShelfChanged={onShelfChanged} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Bookshelf