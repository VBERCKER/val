import React from 'react'



export const Profile = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  const handleLogout = () => {
    auth.logout()
    navigate('/')
  }
  return (
    <div style={{fontSize:"100px"}}>
      Welcome {auth.user}.<button onClick={handleLogout}>Logout</button>
    </div>
  )
}