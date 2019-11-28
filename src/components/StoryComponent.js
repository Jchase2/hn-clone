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
    }

    setTopStoryIds(topStoryIds) {
        this.setState({ topStoryIds })
    }

    setPosts(postsArray) {
        this.setState({ postsArray })
        this.setState({isLoading: false})
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

    renderStory(){

    }

    render() {
        return (
            <div>
                <p>Story Id's:</p>
                {this.state.isLoading ? <p>Loading...</p> : JSON.stringify(this.state.topStoryIds)}
                <div>
                    <p>Posts: </p>
                    {this.state.isLoading ? <p>Loading...</p> : JSON.stringify(this.state.postsArray[0])}
                </div>
            </div>
        );
    }

}

export default StoryComponent;