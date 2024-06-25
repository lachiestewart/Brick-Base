import { useState } from 'react'
import { UserApi } from '../apis/UserApi'

const DashBoard = () => {

    const [email, setEmail] = useState('')

    const printUser = async () => UserApi.getUser(email).then((res) => console.log(res.data))
    

    return (
        <>
            <div>DashBoard</div>
            <label htmlFor='email'>Email</label>
            <input id='email' type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <button onClick={printUser}>print user</button>
        </>
    )
}

export default DashBoard