import React from 'react'
import BookShelfChanger from './BookShelfChanger'

class Book extends React.Component {
    render() {
        const { book } = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{ width: 128, height: 193, 
                        backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
                    </div>
                    <BookShelfChanger shelf={book.shelf}/>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        );
    }
}

export default Book