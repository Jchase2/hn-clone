import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import * as api from '../utils/Api';
import RenderCardComponent from '../components/RenderCardComponent';

class UserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoadingUser: true,
            isLoadingPost: true,
            activeUser: null,
            postsArray: []
        }
    }

    async componentDidMount() {
        await api.getUser(this.props.match.params.id).then(activeUser => this.setState({ activeUser }))
        this.setState({ isLoadingUser: false })
        await api.getPosts(this.state.activeUser.submitted).then(postsArray => this.setState({ postsArray }))
        this.setState({ isLoadingPost: false })
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
        if (!this.state.isLoadingUser && this.state.activeUser) {
            return (
                <React.Fragment>
                    {this.renderCard()}
                    <h3>Posts</h3>
                    {!this.state.isLoadingPost ? <RenderCardComponent postsArray={this.state.postsArray} /> : <p>Loading...</p>}
                </React.Fragment>
            );
        }
        else if (this.state.isLoadingUser) {
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