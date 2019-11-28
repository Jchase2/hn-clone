import React, { Component } from 'react';
import axios from 'axios';

const base_api = "https://hacker-news.firebaseio.com/v0";
const append_pretty = ".json?print=pretty";

class Api extends Component {

  constructor(props) {
    super(props)
    this.state = {
      topPosts: null
    }
    this.getTopPosts = this.getTopPosts.bind(this);
  }

  async getTopPosts() {
    try {
      const response = await axios.get(`${base_api}/topstories${append_pretty}`);
      this.setState({ topPosts: response.data})
    } catch (error) {
      console.error(error);
    }
  }


  render() {
    this.getTopPosts();
    return (
      <div>
        <p>{JSON.stringify(this.state.topPosts)}</p>
      </div>
    );
  }

}

export default Api;