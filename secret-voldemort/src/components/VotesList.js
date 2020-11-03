import React, { useState, useEffect } from 'react';


/* This component take a list of user with their votes as
 * [{user: "username", vote: "lumox/nox"},...] */
export function VotesList(props) {
    
  const [usersVotes, setUsersVotes] = useState([])

  useEffect(() =>{
    setUsersVotes(props.usersVotes)
  },[props]);

  return(
    <div>
      <ul>
        {usersVotes.map(user =>
          <li>{user.user} votes: {user.vote}</li>
        )}
      </ul>
    </div>
  );
}