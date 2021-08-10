import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class UpdateBookInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      isbn: '',
      author: '',
      description: '',
      published_date: '',
      publisher: ''
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/books/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          title: res.data.title,
          isbn: res.data.isbn,
          author: res.data.author,
          description: res.data.description,
          published_date: res.data.published_date,
          publisher: res.data.publisher
        })
      })
      .catch(err => {
        console.log("Error from UpdateBookInfo");
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      title: this.state.title,
      isbn: this.state.isbn,
      author: this.state.author,
      description: this.state.description,
      published_date: this.state.published_date,
      publisher: this.state.publisher
    };

    axios
      .put('http://localhost:8082/api/books/'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/show-book/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in UpdateBookInfo!");
      })
  };


  render() {
    return (
      <div className="UpdateBookInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  SHOW BOOK LIST
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">EDIT BOOK</h1>
              <p className="lead text-center">
                  UPDATE BOOK'S INFO
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor="title">TITLE</label>
              <input
                type='text'
                placeholder='Title of the Book'
                name='title'
                className='form-control'
                value={this.state.title}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="isbn">AUTHOR</label>
              <input
                type='text'
                placeholder='Author'
                name='author'
                className='form-control'
                value={this.state.author}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="author">GENRE</label>
              <input
                type='text'
                placeholder='Genre'
                name='genre'
                className='form-control'
                value={this.state.genre}
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">UPDATE BOOK</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdateBookInfo;