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
import { useCurrentUser } from './contexts/CurrentUserContext';

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

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
          
          <Route
            exact 
            path="/bikes-and-cars"
            render={() => (
              <PostsPage 
                message="No results found. Try a different category."
                filter="category=BC&"
              />
            )}
          />
          <Route
            exact 
            path="/electronics" 
            render={() => (
              <PostsPage 
                message="No results found. Try a different category."
                filter="category=EC&"
              />
            )}
          />
          <Route
            exact 
            path="/diy" 
            render={() => (
              <PostsPage 
                message="No results found. Try a different category."
                filter="category=DIY&"
              />
            )}
          />
          <Route render={() => <p>404: Page not found</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;