
const kitchen = "/imgs/kitchen.png";
import { useEffect, useState } from "react";
import "./axonometrix.scss"
const background = "/imgs/background.png";

interface ChildProps {
  response: "LIVING_ON" | "LIVING_OFF" | "COCINA_ON" | "COCINA_OFF" | null;
  }

  const Axonometric = ({ response }: ChildProps) =>{

    const [kitchenLight, setKitchenLight] = useState(false);
    const [livingLight, setLivingLight] = useState(false);

    useEffect(() => {
      if (!response) return;

      const normalizedResponse = response.trim();

      console.log("Response desde child component:", response);

      setLivingLight(normalizedResponse === "LIVING_ON");
      setKitchenLight(normalizedResponse === "COCINA_ON");

      console.log("Kitchen Light:", kitchenLight);
      console.log("Living Light:", livingLight); 
  
    }, [response]);

    
  return (
    <>
        {kitchenLight && (
        <img className="kitchen" src={kitchen}/>
        )}
        {livingLight ===true && (
        <div style={{ padding: '20px', backgroundColor: 'lightblue', marginTop: '10px' }}>
            <h3>LIGHT 02</h3>
        </div>
        )}
        <img className="background" src={background}></img>
    </>
  )
}

export default Axonometric
