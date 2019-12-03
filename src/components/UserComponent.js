import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import * as api from '../utils/Api';

class UserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            activeUser: null
        }
        this.setUser = this.setUser.bind(this);
    }


    setUser(user) {
        this.setState({ activeUser: user })
        this.setState({ isLoading: false })
    }


    componentDidMount() {
        api.getUser(this.props.match.params.id).then(
            results => {
                this.setUser(results)
            })
            .catch(error => this.setState({ error }))
    }

    renderCard() {
        return (
            <Card.Group>
                <Card fluid color='red'>
                    <Card.Content>
                        <Card.Header>{this.state.activeUser.id}</Card.Header>
                        <Card.Description>
                            <p>Joined: {new Date(this.state.activeUser.created * 1000).toDateString()} </p>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
        );
    }
    render() {
        if (!this.state.isLoading && this.state.activeUser) {
            return (
                this.renderCard()
            );
        }
        else if (this.state.isLoading){
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