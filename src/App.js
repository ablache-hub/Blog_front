import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Article from "./components/article/Article";

function App() {
  const user = false;
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">{localStorage.getItem('user') ? <Home/>:<Register />}</Route>
        <Route path="/login">{localStorage.getItem('user') ? <Home/>:<Login />}</Route>
        <Route path="/write">{localStorage.getItem('user') ? <Write /> : <Register/>}</Route>
        <Route path="/settings">{localStorage.getItem('user') ? <Settings /> : <Register/>}</Route>
        <Route path="/post/:postId">
          <Article/>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
