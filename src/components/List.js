import React from 'react';

class List extends React.Component {

  constructor() {
    super();
    this.state = {
      bookList: [],
      value: 'rank'
    }
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const apiUrl = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=ghmnCOlFdPq51FrzUGFR2j5fNOHgZDQD';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('This is your data', data);
        const bookList = data.results.books;
        this.setState({ bookList });
      });
  }

  handleChange(e) {
    this.setState({ value: e.target.value })    
    const param = e.target.value;
    console.log(param);
    switch (param) {
      case 'title':
        this.sortByTitle();
        break;
      case 'author':
        this.sortByAuthor();
        break;
      case 'isbn':
        this.sortByISBN();
        break;
      default:
        this.sortByRank();
        break;
    }
  }

  sortByTitle() {
    this.state.bookList.sort(function (x, y) {
      let a = x.title.toUpperCase(),
        b = y.title.toUpperCase();
      return a === b ? 0 : a > b ? 1 : -1;
    });
  }

  sortByAuthor() {
    this.state.bookList.sort(function (x, y) {
      let a = x.author.toUpperCase(),
        b = y.author.toUpperCase();
      return a === b ? 0 : a > b ? 1 : -1;
    });
  }

  sortByISBN() {
    this.state.bookList.sort(function (x, y) {
      return x.primary_isbn13 - y.primary_isbn13;
    });
  }

  sortByRank() {
    this.state.bookList.sort(function (x, y) {
      return x.rank - y.rank;
    });

  }

  render() {
    if (this.state.bookList.length < 1) return null;
    return (
      <React.Fragment>
        {/* select */}
        <div className='select'>
          <form onSubmit={this.handleSubmit}>
            <label>Sort by: </label>
            <select onChange={this.handleChange}>
              <option value="rank">Rank</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="isbn">ISBN</option>
            </select>
          </form>
        </div>

        {/* list */}
        <div>
          {this.state.bookList.map(book => {
            return (
              <div className='container' key={book.primary_isbn13}>
                <div className='left'>
                  <div className='rank'>{book.rank}</div>
                  <img className='pic' src={book.book_image} alt={book.title} />
                </div>

                <div className='right'>
                  <h3 className='title'>{book.title}</h3>
                  <p>by {book.author}</p>
                  <p>{book.description}</p>
                  <p>ISBN: {book.primary_isbn13}</p>
                </div>
              </div>
            )
          })}
        </div>
      </React.Fragment>
    );
  }

}

export default List;