
import './equalizer.scss'

function Equalizer() {

  return (
    <div className="equalizer">
       <div className="bar" style={{ "--i": 1 } as React.CSSProperties}></div>
      <div className="bar" style={{ "--i": 2 } as React.CSSProperties}></div>
      <div className="bar" style={{ "--i": 3 } as React.CSSProperties}></div>
      <div className="bar" style={{ "--i": 4 } as React.CSSProperties}></div>
      <div className="bar" style={{ "--i": 5 } as React.CSSProperties}></div>
  </div>
  )
}

export default Equalizer
