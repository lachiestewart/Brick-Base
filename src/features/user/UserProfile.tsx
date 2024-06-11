import {useSelector, useDispatch} from 'react-redux'
import {login, logout} from './userSlice'
import {IUser} from '../../types'
import { useEffect } from 'react'

const UserProfile = () => {
  const user = useSelector((state: {user: IUser})  => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('user', user)
    console.log('user', user !== null)
  }, [])

  const defaultUser: IUser = {
    id: 1,
    name: 'hello',
    email: 'hi@hi.com'
  }

  return (
    <div>
      <h1>User Profile</h1>
      {user !== null ? 
        <div>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
       : 
        <div>
          default
          <div>{defaultUser.name}</div>
          <div>{defaultUser.email}</div>
          <button onClick={() => dispatch(login(defaultUser))}>Login</button>
        </div>
      }
    </div>
  )
}

export default UserProfile