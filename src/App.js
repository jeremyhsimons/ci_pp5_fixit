import styles from './App.module.css';
import NavigationBar from './components/NavigationBar';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import CreatePostForm from './pages/posts/CreatePostForm';
import PostPage from './pages/posts/PostPage';
import PostsPage from './pages/posts/PostsPage';

function App() {

  return (
    <div className={styles.App}>
      <NavigationBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <PostsPage message="No results found. Try using another keyword."/>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <CreatePostForm />}/>
          <Route exact path="/posts/:id" render={() => <PostPage />}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;