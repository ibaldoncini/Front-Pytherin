import React, { useEffect, useState } from "react";
import { sendRequest } from "./../../services/request";
import { ChaosPiece } from "./ChaosPiece";
import dolores from "../../images/dolores.png"; 

// PROPS: token, room_name, chaos


// CORREGIR:  Centrar en tablero, contador en 0 => no mostrar, must be centered vert betwen dash y panel

//Display chaos counter and cast it
export const ChaosCounter = props =>{

  const [Images, setImages] = useState([])
  
  useEffect(() => {
    const count = props.chaos
    var array = [];
    for(let i = 0; i < count; i++){
      array.push(dolores);
    }

    setImages(array);
  }, [props])


  console.log(Images)

  const chaos_begin = () => {
    const path = `http://localhost:8000/${props.room_name}/chaos`

    const header =  {
      Accept: "application/json",
      Authorization: `Bearer + ${props.token}`,
    }

    sendRequest('PUT', header, path).then(async response =>{
      const data = await response.json()
      
      if (response.ok) {
        console.log("Chaos casted succesfuly");
      } else {
        console.log("there was an error on chaosCouter" + data.detail);
      }
    }).then(error => console.log("Error on Chaos request" + error.detail));
  
  }

  return(
    
    props.chaos === 0 ? <div></div> :
    
    <div class='container'>
      <div class='column is-6 is-offset-3 align-cntr is-vcentered'>
        <div class='chaos-card'>
          <div class='card-content'>
            <div class='columns align-cntr is-vcentered'>
              {(props.chaos > 0 ? 
                  
                <p class='chaos-text has-text-centered'>
                  {chaos_begin()}
                  Chaos              
                </p>
              
                : <div></div>
              )}
              { 

                Images.map( image =>
                  <ChaosPiece image={image}/>
                )              
                
              
                
              }
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}
