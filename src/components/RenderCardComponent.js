import React, { Component } from 'react';
import { Card, List } from 'semantic-ui-react';

class RenderCard extends Component {

    constructor(props) {
        super(props)
        this.renderCard = this.renderCard.bind(this);
    }

    renderCard() {
        const listPosts = this.props.postsArray.map((post) =>
            <List.Item key={post.id}>
                <Card.Group>
                    <Card fluid color='red'>
                        <Card.Content>
                            <Card.Header><a href={post.url}>{post.title}</a></Card.Header>
                            <Card.Description>
                                <p>By: <a href={'/user/' + post.by}>{post.by + ' '}</a>
                                    On: {new Date(post.time * 1000).toDateString() + ' '}
                                    With <a href={'/post/' + post.id}>{post.descendants}</a> comments.</p>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </List.Item>
        );
        return (
            <List>{listPosts}</List>
        );
    }

    render() {
        return (
            this.renderCard()
        );
    }
}

export default RenderCard;