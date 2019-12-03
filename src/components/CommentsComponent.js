import React, { Component } from 'react';
import { Card, List } from 'semantic-ui-react';
import * as api from '../utils/Api';

class CommentsComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            commentsArray: [],
            activePost: null,
        }
        this.setComments = this.setComments.bind(this);
        this.setActivePost = this.setActivePost.bind(this);
        this.renderUserCard = this.renderUserCard.bind(this);
    }

    setComments(comments) {
        this.setState({
            commentsArray: comments,
            isLoading: false
        })
    }

    setActivePost(obj) {
        this.setState({ activePost: obj })
    }

    componentDidMount() {
        api.getItem(this.props.match.params.id).then(
            results => {
                this.setActivePost(results)
                api.getComments(results.kids).then(
                    results => {
                        this.setComments(results)
                    }
                )
            }
        )
    }

    renderCard() {
        const listPosts = this.state.commentsArray.map((comment) =>
            <List.Item key={comment.id}>
                <Card.Group>
                    <Card fluid color='red'>
                        <Card.Content>
                            <Card.Meta>
                                <p>By: <a href={'/user/' + comment.by}>{comment.by + ' '}</a>
                                    On: {new Date(comment.time * 1000).toDateString() + ' '}</p>
                            </Card.Meta>
                            <Card.Description>
                                <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
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

    renderUserCard() {
        const post = this.state.activePost;
        return (
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
        );
    }

    render() {
        if (!this.state.isLoading && this.state.commentsArray) {
            return (
                <React.Fragment>
                    {this.renderUserCard()}
                    {this.renderCard()}
                </React.Fragment>
            );
        }
        else if (this.state.isLoading) {
            return <p>Loading...</p>
        }
        else if (!this.state.activePost) {
            return <p>Post is null (post may not exist).</p>
        }
        else {
            return <p>Something went wrong!</p>
        }
    }
}

export default CommentsComponent;