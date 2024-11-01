
const kitchen = "/imgs/kitchen.png";
const bedRoom = "/imgs/bed_room.png";
const livingRoom = "/imgs/living_room.png";
import { useEffect, useState } from "react";
import "./axonometrix.scss"
const background = "/imgs/background.png";

interface ChildProps {
  response: "LIVING_ON" | "LIVING_OFF" | "KITCHEN_ON" | "KITCHEN_OFF" | "BEDROOM_ON"| "BEDROOM_OFF" | null;
  }

  const Axonometric = ({ response }: ChildProps) =>{

    const [kitchenLight, setKitchenLight] = useState(false);
    const [livingLight, setLivingLight] = useState(false);
    const [bedRoomLight, setBedRoomLight] = useState(false);

    useEffect(() => {
      if (!response) return;


      const normalizedResponse = response.trim();

      console.log("Response desde child component:", response);
    
      // Mapa de acciones para actualizar los estados de las luces
      const actions = {
        "LIVING_ON": () => setLivingLight(true),
        "LIVING_OFF": () => setLivingLight(false),
        "KITCHEN_ON": () => setKitchenLight(true),
        "KITCHEN_OFF": () => setKitchenLight(false),
        "BEDROOM_ON": () => setBedRoomLight(true),
        "BEDROOM_OFF": () => setBedRoomLight(false),
      };
    
      // Ejecuta la acción correspondiente al response, sin afectar el otro estado
      if (normalizedResponse in actions) {
        actions[normalizedResponse as keyof typeof actions]();
      }
    
    }, [response]);
    
  return (
    <>
        {kitchenLight && (
        <img className="sprite" src={kitchen}/>
        )}
        {livingLight && (
         <img className="sprite" src={livingRoom}/>
        )}
        {bedRoomLight && (
         <img className="sprite" src={bedRoom}/>
        )}
        <img className="background" src={background}></img>
    </>
  )
}

export default Axonometric
