import React, { Component } from 'react';
import * as api from '../utils/Api';
import RenderCard from './RenderCardComponent';

class StoryComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            topStoryIds: null,
            postsArray: null
        }
    }

    async componentDidMount() {
        await api.getTopStoryIds().then(topStoryIds => this.setState({ topStoryIds }))
        await api.getPosts(this.state.topStoryIds).then(postsArray => this.setState({ postsArray }))
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

export default StoryComponent;