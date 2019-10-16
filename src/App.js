import './App.css';
import React, { Component,Fragment } from 'react'; 
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom'; 
import Navbar from './components/layout/Navbar';
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import axios from 'axios';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

 class App extends Component {
     state = {
         users:[],
         loading:false,
         alert:null,
         user:{}
     };

    //   async componentDidMount() {
        
    //       this.setState({ loading: true});
    //    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    //    this.setState({users:res.data, loading: false});
    //  }

      searchUsers =  async text => {
       
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({users:res.data.items, loading: false});
     };

     // get single github user
     getUser = async(username) => {
        this.setState({ loading:true});
       
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({user:res.data, loading: false});
     

     }

     //clear users from state

     clearUsers = () => this.setState({ users: [], loading:false });
       
     setAlert = (msg, type) => {
       this.setState({ alert: { msg, type}});
            setTimeout(() =>this.setState({alert: null}), 2000)
     };
    

     render() {
       const {users,user,loading} = this.state; //destructring from state


    return (
      <Router>
      <div className='App'>
      <Navbar/>
     <div className="container">
       <Alert alert={this.state.alert}/>
       <Switch>
         <Route exact path='/' render={props =>(
           <Fragment>
       <Search searchUsers={this.searchUsers} setAlert={this.setAlert} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false}/>
     <Users loading ={loading} users={users} />  
           </Fragment>
         )}/>
         <Route exact path='/about' component={About}/>
         <Route exact path='/user/:login' render={props => (
           <User{...props} getUser={this.getUser} user={user} loading={loading}/>
         ) }/>

       </Switch>
       
     </div>
      </div>
      </Router>
    );
  }
}


export default App
