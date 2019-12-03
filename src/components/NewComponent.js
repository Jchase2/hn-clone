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
        this.setNewStoryIds = this.setNewStoryIds.bind(this);
        this.setPosts = this.setPosts.bind(this);
    }

    setNewStoryIds(newStoryIds) {
        this.setState({ newStoryIds })
    }

    setPosts(postsArray) {
        this.setState({ postsArray })
        this.setState({ isLoading: false })
    }

    async componentDidMount() {
        await api.getNewStoryIds().then(result => { this.setNewStoryIds(result) })
        await api.getPosts(this.state.newStoryIds).then(result => { this.setPosts(result) })
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