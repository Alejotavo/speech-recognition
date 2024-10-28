
const kitchen = "/imgs/kitchen.png";
import "./axonometrix.scss"
const background = "/imgs/background.png";

interface ChildProps {
    kitchenLight: boolean;
    livingRoomLight: boolean;
  }
  

  const Axonometric = ({ kitchenLight, livingRoomLight }: ChildProps) =>{

  return (
    <>
        {kitchenLight && (
        <img className="kitchen" src={kitchen}/>
        )}
        {livingRoomLight && (
        <div style={{ padding: '20px', backgroundColor: 'lightblue', marginTop: '10px' }}>
            <h3>LIGHT 02</h3>
        </div>
        )}
        <img className="background" src={background}></img>
    </>
  )
}

export default Axonometric
