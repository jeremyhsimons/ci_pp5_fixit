import styles from './App.module.css';
import NavigationBar from './components/NavigationBar';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './api/axiosDefaults'

function App() {
  return (
    <div className={styles.App}>
      <NavigationBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>} />
        </Switch>
        <Switch>
          <Route exact path="/signin" render={() => <h1>Sign In</h1>} />
        </Switch>
        <Switch>
          <Route exact path="/signup" render={() => <h1>Sign up</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;