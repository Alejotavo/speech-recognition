
const kitchen = "/imgs/kitchen.png";
const bedRoom = "/imgs/bed_room.png";
const livingRoom = "/imgs/living_room.png";
const garden = "/imgs/garden.png";
import { useEffect, useState } from "react";
import "./axonometrix.scss"
const background = "/imgs/axonometric.png";

interface ChildProps {
  response: string | null;
  }

  const Axonometric = ({ response }: ChildProps) =>{

    const [kitchenLight, setKitchenLight] = useState(false);
    const [livingLight, setLivingLight] = useState(false);
    const [bedRoomLight, setBedRoomLight] = useState(false);
    const [gardenLight, setGardenLight] = useState(false);

    useEffect(() => {
      if (!response) return;

      const normalizedResponse =  response.trim().split(/\s+/);
    console.log("respuesta desde el hijo", normalizedResponse);
      // Mapa de acciones para actualizar los estados de las luces
      const actions = {
        "LIVING_ON": () => setLivingLight(true),
        "LIVING_OFF": () => setLivingLight(false),
        "KITCHEN_ON": () => setKitchenLight(true),
        "KITCHEN_OFF": () => setKitchenLight(false),
        "BEDROOM_ON": () => setBedRoomLight(true),
        "BEDROOM_OFF": () => setBedRoomLight(false),
        "GARDEN_ON": () => setGardenLight(true),
        "GARDEN_OFF": () => setGardenLight(false),
        "ALL_ON": () => {
            setKitchenLight(true);
            setLivingLight(true);
            setBedRoomLight(true);
            setGardenLight(true);
        },
        "ALL_OFF": () => {
            setKitchenLight(false);
            setLivingLight(false);
            setBedRoomLight(false);
            setGardenLight(false);
        },
      };
    
    // Procesa cada comando y ejecuta la acción correspondiente
    normalizedResponse.forEach((command) => {
      const normalizedCommand = command.trim().toUpperCase();
      if (normalizedCommand in actions) {
        actions[normalizedCommand as keyof typeof actions]();
      }
    });
    
    }, [response]);
    
  return (
    <>
        {( kitchenLight) && (
            <img className="sprite" src={kitchen} />
        )}
        {( livingLight) && (
            <img className="sprite" src={livingRoom} />
        )}
        {( bedRoomLight) && (
            <img className="sprite" src={bedRoom} />
        )}
        {( gardenLight) && (
            <img className="sprite" src={garden} />
        )}
        <img className="background" src={background} />
    </>
  )
}

export default Axonometric
