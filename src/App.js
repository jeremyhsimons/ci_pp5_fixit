import styles from './App.module.css';
import NavigationBar from './components/NavigationBar';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';

function App() {
  return (
    <div className={styles.App}>
      <NavigationBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>} />
        </Switch>
        <Switch>
          <Route exact path="/signin" render={() => <SignInForm />} />
        </Switch>
        <Switch>
          <Route exact path="/signup" render={() => <SignUpForm />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;