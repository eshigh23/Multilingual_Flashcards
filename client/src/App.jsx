import { useEffect, useState } from 'react'
import { returnHelloApi } from './api/api'


function App() {
  const [message, setMessage] = useState("Loading...")

  useEffect(() => {
    const returnHello = async () => {
      try {
        const responseData = await returnHelloApi()
        setMessage(responseData.text)
      } catch (e) {
        setMessage('error when fetching')
      }
    }
    returnHello()
  }, [])


  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Flask + React Test</h1>
      <p>{message}</p>
    </div>
  );
}

export default App
