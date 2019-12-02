import React from 'react';
import StoryComponent from './components/StoryComponent';
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
                  <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item name="test">
                  <Link to="/test">Test</Link>
                </Menu.Item>
              </Menu>
            </Grid.Column>
          </Grid>
        </nav>
        <Switch>
          <Grid centered={true}>
            <Grid.Column width={12}>
              <Route path="/test">
                <Test />
              </Route>
              <Route path="/">
                <StoryComponent />
              </Route>
            </Grid.Column>
          </Grid>
        </Switch>
      </div>
    </Router>
  );
}

function Test() {
  return <h2>Test Page</h2>;
}

export default App;