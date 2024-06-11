import axios from "axios"
import { useState } from "react"

const App = () => {

  const [setImage, setSetImage] = useState<string>('')

  const makeRequest = () => {
    axios.get('http://localhost:3000/set/10221-1')
      .then(res => {
        console.log(res.data)
        setSetImage('https:' + res.data.data.image_url)
      })
      .catch(error => console.error('Error:', error))
  }

  return (
    <div>
      <div>App</div>
      <button onClick={makeRequest}>Click to hit backend</button>
      {setImage && <img src={setImage} alt="set image" />}
    </div>
  )
}

export default App