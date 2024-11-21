import { Button } from "@mui/material"

export const SimulationTutorialModal = (props: {
	endTutorial: () => void
  children: React.ReactNode
}) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000, // Ensure the modal is on top
    }}>
      <div style={{
        width: '50%',
        height: '50%',
        minHeight: '480px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <h1 style={{ margin: 0 }}>Energize Communities Tutorial</h1>
          <Button style={{
            color: 'black',
            backgroundColor: 'grey',
            fontSize: '12px',
            padding: '5px',
          }} onClick={props.endTutorial}>
            Skip
          </Button>
        </div>
        {props.children}
      </div>
    </div>
  )
}
