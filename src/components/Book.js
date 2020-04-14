import React from 'react'
import BookShelfChanger from './BookShelfChanger'

class Book extends React.Component {

    render() {
        const { book, onShelfChanged } = this.props;
        const smallThumbnail = book.imageLinks ? book.imageLinks?.smallThumbnail : null;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{
                            width: 128, 
                            height: 193,
                            backgroundImage: `url(${smallThumbnail})`
                        }}>
                    </div>
                    <BookShelfChanger book={book} onShelfChanged={onShelfChanged} />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        );
    }
}

export default Book