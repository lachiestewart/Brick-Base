import axios from "axios"
import { useState } from "react"
import RegisterForm from "./components/RegisterForm"

const App = () => {

  const [setImage, setSetImage] = useState<string>('')

  const makeLegoRequest = () => {
    axios.get('http://localhost:3000/set/10221-1')
      .then(res => {
        console.log(res.data)
        setSetImage('https:' + res.data.data.image_url)
      })
      .catch(error => console.error('Error:', error))
  }

  const makeUsersRequest = () => {
    axios.get('http://localhost:3000/users')
      .then(res => {
        console.log(res.data)
      })
      .catch(error => console.error('Error:', error))
  }

  const makeClearUsersRequest = () => {
    axios.post('http://localhost:3000/clear')
      .then(res => {
        console.log(res.data)
      })
      .catch(error => console.error('Error:', error))
  }

  const makeResetUsersRequest = () => {
    axios.post('http://localhost:3000/reset')
      .then(res => {
        console.log(res.data)
      })
      .catch(error => console.error('Error:', error))
  }

  return (
    <div>
      <div>App</div>
      <button onClick={makeLegoRequest}>Click to get super star destroyer</button>
      {setImage && <img src={setImage} alt="set image" />}
      <button onClick={makeUsersRequest}>Click to get all users</button>
      <button onClick={makeClearUsersRequest}>Click to remove all users</button>
      <button onClick={makeResetUsersRequest}>Click to reset users to default</button>
      <RegisterForm />
    </div>
  )
}

export default App