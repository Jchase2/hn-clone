import React, { Component } from 'react';
import * as api from '../utils/Api';
import { Card } from 'semantic-ui-react';

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
        return (
            <Card.Group>
                <Card fluid color='red'>
                    <Card.Content>
                        <Card.Header><a href={this.state.postsArray[0].url}>{this.state.postsArray[0].title}</a></Card.Header>
                        <Card.Description>
                            <p>by: <a href={'/user/' + this.state.postsArray[0].by}>{this.state.postsArray[0].by}</a>
                               on: {new Date(this.state.postsArray[0].time * 1000).toDateString()} 
                               with {this.state.postsArray[0].descendants} comments.</p>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
        );
    }


    render() {
        if (!this.state.isLoading) {
            return (
                this.renderCard() 
            );
        }
        else {
            return <p>Loading...</p>
        }
    }
}

export default StoryComponent;