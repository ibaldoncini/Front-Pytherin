import React from "react";

export const ChaosCounter = props =>{
    
    
  const chaos_begin = () => {
    const header =  {
      Accept: "application/json",
      Authorization: `Bearer `
    }
  }

  return(
    <div class='container align-cntr'>
      <div class='column is-3 is-offset-4'>
        <div class='card'>
          <div class='card-content'>
            <p class='game-title is-small'>Chaos Counter</p>
            <progress class='chaos-progress is-small' value={props.chaos_counter} max='3'/>
            {
              props.chaos_counter === '3' ? chaos_begin() : <div></div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
