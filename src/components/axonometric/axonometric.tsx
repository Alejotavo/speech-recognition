
interface ChildProps {
    kitchenLight: boolean;
    livingRoomLight: boolean;
  }
  

  const Axonometric = ({ kitchenLight, livingRoomLight }: ChildProps) =>{

  return (
    <>
       {kitchenLight && (
          <div style={{ padding: '20px', backgroundColor: 'lightgreen', marginTop: '10px' }}>
              <h3>LIGHT 01</h3>
          </div>
        )}
        {livingRoomLight && (
        <div style={{ padding: '20px', backgroundColor: 'lightblue', marginTop: '10px' }}>
            <h3>LIGHT 02</h3>
        </div>
        )}
    </>
  )
}

export default Axonometric
