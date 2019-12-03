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
        this.setTopStoryIds = this.setTopStoryIds.bind(this);
        this.setPosts = this.setPosts.bind(this);
    }

    setTopStoryIds(topStoryIds) {
        this.setState({ topStoryIds })
    }

    setPosts(postsArray) {
        this.setState({ postsArray })
        this.setState({ isLoading: false })
    }

    async componentDidMount() {
        await api.getTopStoryIds().then(result => { this.setTopStoryIds(result) })
        await api.getPosts(this.state.topStoryIds).then(result => { this.setPosts(result) })
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