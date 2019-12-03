import React from 'react';
import StoryComponent from './components/StoryComponent';
import UserComponent from './components/UserComponent';
import NewComponent from './components/NewComponent';
import CommentsComponent from './components/CommentsComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Menu, Grid } from 'semantic-ui-react'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Grid centered={true}>
            <Grid.Column width={12}>
              <Menu>
                <Menu.Item name="home">
                  <Link to="/">Top Stories</Link>
                </Menu.Item>
                <Menu.Item name="new">
                  <Link to="/new">Newest Stories</Link>
                </Menu.Item>
              </Menu>
            </Grid.Column>
          </Grid>
        </nav>
        <Switch>
          <Grid centered={true}>
            <Grid.Column width={12}>
              <Route exact path="/new">
                <NewComponent />
              </Route>
              <Route exact path="/">
                <StoryComponent />
              </Route>
              <Route exact path='/user/:id' component={UserComponent} />
              <Route exact path='/post/:id' component={CommentsComponent} />
            </Grid.Column>
          </Grid>
        </Switch>
      </div>
    </Router>
  );
}

export default App;