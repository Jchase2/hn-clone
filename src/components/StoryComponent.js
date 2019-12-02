import React, { Component } from 'react';
import * as api from '../utils/Api';
import { Card, Grid } from 'semantic-ui-react';

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
                        <Card.Header>{this.state.postsArray[0].title}</Card.Header>
                        <Card.Description>
                            <p>by: {this.state.postsArray[0].by} on: {new Date(this.state.postsArray[0].time * 1000).toDateString()} with {this.state.postsArray[0].descendants} comments.</p>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
        );
    }


    render() {
        if (!this.state.isLoading) {
            return (
                <React.Fragment>
                    <Grid centered={true}>
                        <Grid.Column width={10}>
                            {this.renderCard()}
                        </Grid.Column>
                    </Grid>
                </React.Fragment>
            );
        }
        else {
            return <p>Loading...</p>
        }
    }
}

export default StoryComponent;