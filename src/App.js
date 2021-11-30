import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Article from "./components/article/Article";
import { Context } from "./context/Context";
import Profil from "./pages/profil/Profil";
import ProfilEdit from "./pages/profil/ProfilArticleEdit";

function App() {
  const {token} = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">{token ? <Home/>:<Register />}</Route>
        <Route path="/login">{token ? <Home/>:<Login />}</Route>
        <Route path="/write">{token ? <Write /> : <Register/>}</Route>
        <Route path="/settings">{token ? <Settings /> : <Register/>}</Route>
        <Route path="/profil">{token ? <Profil /> : <Login/>}</Route>
        <Route path="/edit/:username/post/:postId">{token ? <ProfilEdit /> : <Login/>}</Route>
        <Route path="/author/:username/post/:postId">
          <Article/> 
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
