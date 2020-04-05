import React from 'react'
import Book from './Book'

class Bookshelf extends React.Component {
    render() {
        const { books } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book => (
                            <li key={book.title}>
                                <Book book={book} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Bookshelf