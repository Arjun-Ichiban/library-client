import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class CreateBook extends Component {
  constructor() {
    super();
    this.state = {
      genrelist: [],
      genreselected: '',
      title: '',
      author:'',
      genre:''      
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/books/genre')
      .then(res => {
        this.setState({
          genrelist: res.data
        })
        console.log(this.genrelist);
      })
      .catch(err =>{
        console.log('Error from GenreList');
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    let data = {};

    if(this.state.genreselected === "others"){
      data = {
        title: this.state.title,
        author: this.state.author,
        genre: this.state.genre    
      };
    }
    else {
      data = {
        title: this.state.title,
        author: this.state.author,
        genre: this.state.genreselected     
      };
    }
 

    axios
      .post('http://localhost:8082/api/books', data)
      .then(res => {
        this.setState({
          title: '',
          author:'',
          genre:'' ,
          genreselected:''         
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in CreateBook!");
      })
  };

  render() {
    return (
      <div className="CreateBook">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  SHOW BOOK LIST
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">ADD BOOK</h1>
              <p className="lead text-center">
                  CREATE NEW BOOK
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
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
                  <select
                    name='genreselected'
                    className='form-control'
                    value={this.state.genreselected}
                    onChange={this.onChange}
                  >
                    <option value="">Genre</option>
                    {this.state.genrelist.map(lists => (
                      <option
                        key={lists.genre}
                        value={lists.genre}
                        >{lists.genre}
                      </option>
                    ))}
                    <option value="others">Others</option>
                  </select>
                </div>

                  { this.state.genreselected==="others" ?
                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Genre'
                        name='genre'
                        className='form-control'
                        value={this.state.genre}
                        onChange={this.onChange}
                      />
                    </div>
                    :(
                      <div></div>
                    )
                  }

                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateBook;