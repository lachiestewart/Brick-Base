import User from './features/user/UserProfile'

const App = () => {
  return (
    <div className="tw-flex tw-flex-col tw-w-full tw-justify-center tw-items-center">
      <h1 className="tw-text-2xl">Welcome to Brick Base</h1>
      <div>A web app to help you keep track of your LEGO sets and their value</div>
      <User />
    </div>
  )
}

export default App