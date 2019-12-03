import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import * as api from '../utils/Api';
import RenderCardComponent from '../components/RenderCardComponent';

class UserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            activeUser: null,
            postsArray: []
        }
        this.setUser = this.setUser.bind(this);
        this.setPosts = this.setPosts.bind(this);
    }


    setUser(user) {
        this.setState({ activeUser: user })
        this.setState({ isLoading: false })
    }

    setPosts(posts) {
        this.setState({ postsArray: posts })
    }

    componentDidMount() {
        api.getUser(this.props.match.params.id).then(
            results => {
                this.setUser(results)
                api.getPosts(this.state.activeUser.submitted).then(
                    results => {
                        this.setPosts(results)
                    }   
                )
            }
        )
    }

    renderCard() {
        return (
            <Card.Group>
                <Card fluid color='red'>
                    <Card.Content>
                        <Card.Header>{this.state.activeUser.id}</Card.Header>
                        <Card.Meta>
                            <p>Joined: {new Date(this.state.activeUser.created * 1000).toDateString() + ' '}
                                has {this.state.activeUser.karma} karma.</p>
                        </Card.Meta>
                        <Card.Description>
                            <div dangerouslySetInnerHTML={{ __html: this.state.activeUser.about }}></div>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
        );
    }
    render() {
        if (!this.state.isLoading && this.state.activeUser && this.state.postsArray) {
            return (
                <React.Fragment>
                    {this.renderCard()}
                    <h3>Posts</h3>
                    <RenderCardComponent postsArray={this.state.postsArray} />
                </React.Fragment>
            );
        }
        else if (this.state.isLoading) {
            return <p>Loading...</p>
        }
        else if (!this.state.activeUser) {
            return <p>User is null (user may not exist). Usernames are case sensitive.</p>
        }
        else {
            return <p>Something went wrong!</p>
        }
    }
}

export default UserComponent;