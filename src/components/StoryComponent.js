import React, { Component } from 'react';
import * as api from '../utils/Api';


class StoryComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            topStoryIds: null,
            postsArray: null
        }
        this.setTopStoryIds = this.setTopStoryIds.bind(this);
        this.renderCard = this.renderCard.bind(this);
    }

    setTopStoryIds(topStoryIds) {
        this.setState({ topStoryIds })
    }

    setPosts(postsArray) {
        this.setState({ postsArray })
        this.setState({ isLoading: false })
    }

    componentDidMount() {
        api.getStoryIds().then(
            result => {
                this.setTopStoryIds(result);
                api.getPosts(result)
                    .then(result => {
                        this.setPosts(result)
                    })
            })
            .catch(error => this.setState({ error }))
    }

    renderCard() {
        if (!this.state.isLoading) {
            return (
                <div>
                    <p>Title: {this.state.postsArray[0].title}</p>
                    <p>by: {this.state.postsArray[0].by} on: {new Date(this.state.postsArray[0].time * 1000).toDateString()} with {this.state.postsArray[0].descendants} comments.</p>
                </div>
            );
        }
        else{
            return <p>Loading...</p>
        }
    }

    render() {
        return (
            <div>
                <p>Story Id's:</p>
                {this.state.isLoading ? <p>Loading...</p> : JSON.stringify(this.state.topStoryIds)}
                <div>
                    <p>Post: </p>
                    {this.renderCard()}
                </div>
            </div>
        );
    }

}

export default StoryComponent;