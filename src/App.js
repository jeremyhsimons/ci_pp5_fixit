import styles from './App.module.css';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <div className={styles.App}>
      <header className="App-header">
        <NavigationBar />
      </header>
    </div>
  );
}

export default App;