import React, { Component } from 'react';
import * as api from '../utils/Api';
import RenderCard from './RenderCardComponent';

class NewComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            newStoryIds: [],
            postsArray: []
        }
    }

    async componentDidMount() {
        let newStoryIds = await api.getNewStoryIds()
        this.setState({ newStoryIds })
        await api.getPosts(newStoryIds).then(postsArray => this.setState({ postsArray }));
        this.setState({ isLoading: false })
      }

    render() {
        if (!this.state.isLoading) {
            return (
                <RenderCard postsArray={this.state.postsArray} />
            );
        }
        else if (this.state.isLoading) {
            return <p>Loading...</p>
        }
        else {
            return <p>Something went wrong!</p>
        }
    }
}

export default NewComponent;