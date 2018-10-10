import React from 'react';
import UserGameStatsComponent from '../containers/UserDashboardContainer.jsx';



class UserDashboardComponent extends React.Component {
  constructor(props){
    super(props); 
  }
  
  render() {
    return (
      <div>
      <UserGameStatsComponent />
     </div>
    )
  }
}


export default UserDashboardComponent; 

// //Will display the following: 
// // 0. Over games played
// // 1. User wins as a shark 
// // 2. User wins as a Minno 
// // 3. Average time alive as a minno 