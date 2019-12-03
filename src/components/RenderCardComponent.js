import React, { Component } from 'react';
import { Card, List } from 'semantic-ui-react';

class RenderCard extends Component {

    constructor(props) {
        super(props)

        this.renderCard = this.renderCard.bind(this);
    }

    renderCard() {
        let newArr = [];
        for (var index = 0; index < 50; index++) {
            newArr.push(this.props.postsArray[index]);
        }
        const listPosts = newArr.map((post) =>
            <List.Item key={post.id}>
                <Card.Group>
                    <Card fluid color='red'>
                        <Card.Content>
                            <Card.Header><a href={post.url}>{post.title}</a></Card.Header>
                            <Card.Description>
                                <p>By: <a href={'/user/' + post.by}>{post.by + ' '}</a>
                                    On: {new Date(post.time * 1000).toDateString() + ' '}
                                    With {post.descendants} comments.</p>
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