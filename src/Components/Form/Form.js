import React, { Component } from 'react';
import axios from 'axios';
import noImage from './../../assets/no_image.jpg';
import './Form.css';
import { connect } from 'react-redux'

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      img: '',
      content: ''
    };
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault()
    axios.post('/api/post', {id: this.props.id, title: this.state.title, img: this.state.img, content: this.state.content})
      .then(() => this.props.history.push('/dash'))
      .catch((err) => console.log(err))
  }
  
  render() {
    let imgSrc = this.state.img ? this.state.img : noImage;

    return (
      <div className='form content-box'>
        <h2 className='title'>New Post</h2>
        <div className='form-main'>
          <div className='form-input-box'>
            <p>Title:</p>
            <input value={this.state.title} onChange={e => this.setState({ title: e.target.value })} />
          </div>
          <img className='form-img-prev' src={imgSrc} alt='preview'/>
          <div className='form-input-box'>
            <p>Image URL:</p>
            <input value={this.state.img} onChange={e => this.setState({ img: e.target.value })} />
          </div>
          <div className='form-text-box'>
            <p>Content:</p>
            <textarea value={this.state.content} onChange={e => this.setState({ content: e.target.value })} />
          </div>
        </div>
        <button onClick={(e) => this.submit(e)} className='dark-button'>Post</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}
export default connect(mapStateToProps)(Form);