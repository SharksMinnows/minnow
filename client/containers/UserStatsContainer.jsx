import React, { Component } from 'react'; 
import UserStatsDisplay from '../components/UserStatsDisplay.jsx'



class UserStatsContainer extends Component {
    constructor(props){
        super(props);
    }



  render(){
    return (
      <div>
       <UserStatsDisplay />
      </div>
    )
  }
}


export default UserStatsContainer; 