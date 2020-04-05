import React from 'react'
import BookShelfChanger from './BookShelfChanger'

class Book extends React.Component {
    render() {
        const { book } = this.props;
        console.log(book);
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{ width: 128, height: 193, backgroundImage: `url(${book.cover})` }}>
                    </div>
                    <BookShelfChanger />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.author}</div>
            </div>
        );
    }
}

export default Book