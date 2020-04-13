import React from 'react'

class BookShelfChanger extends React.Component {
    render() {
        const { book, onShelfChanged } = this.props;
        return (
            <div className="book-shelf-changer">
                <select
                    defaultValue={book.shelf != null ? book.shelf : "none"}
                    onChange={(event) => {
                        onShelfChanged(book, event)
                    }}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}

export default BookShelfChanger