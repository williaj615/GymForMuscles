import React, { useState, useEffect } from 'react';
import { createAuthHeaders } from '../../API/userManager';
import WorkoutQueue from '../../components/WorkoutQueue/WorkoutQueue';

class Home extends React.Component {
  

  
  render () {
  
    return (
      <>
        <WorkoutQueue />
      </>
    )
    }
}

export default Home;