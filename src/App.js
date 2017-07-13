import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      query: '',
      comments: [],
      titles: []
    };

    this.updateQuery = this.updateQuery.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  submitSearch(e) {
    if (this.state.query == 0) { return null; }

    fetch(`https://www.reddit.com/user/${this.state.query}/comments.json`)
      .then(e => e.json())
      .then(res => this.setState({comments: res.data.children.map(obj => obj.data.body)}));

    fetch(`https://www.reddit.com/user/${this.state.query}/submitted.json`)
      .then(e => e.json())
      .then(res => this.setState({titles: res.data.children.map(obj => obj.data.title)}));

  }

  updateQuery(e) {
    this.setState({ query: e.currentTarget.value });
  }

  componentDidUpdate(){
    window.state = this.state;
  }

  render() {
    const { comments, titles } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src="https://image.flaticon.com/icons/svg/37/37263.svg" className="App-logo" alt="logo" />
          <h2>A Better Reddit Search Engine: Powered by React</h2>
        </div>
        <p className="App-intro">
          To get started, type some fool's screenname here and laugh at their history.
        </p>
        <input
          type="text"
          onChange={this.updateQuery}/>
        <button onClick={this.submitSearch}>Search</button>
        <ul>
          {comments.map((body, i) =>
            <li key={`c-${i}`}>{body}</li>
          )}
          {titles.map((title, i) =>
            <li key={`t-${i}`}>{title}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
