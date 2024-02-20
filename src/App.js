import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import {Route,Routes} from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateFOrm from './pages/posts/PostCreateFOrm';

function App() {
  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Routes>
              <Route path = "/" element={<h1>Home Page</h1>} />
              <Route path = "/signin" element={<SignInForm/>}/>
              <Route path = "/signup" element={<SignUpForm/>}/>
              <Route path = "/posts/create" element={<PostCreateFOrm/>}/>
              <Route path="*" element={<p>Page not found!</p>} />
            </Routes>
          </Container>
        </div>
  );
}

export default App;
