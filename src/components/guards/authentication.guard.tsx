import { FunctionComponent, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Components
import Header from '../header/header.component'
import Loading from '../loading/loading.component'

const AuthenticationGuard: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSelector((rootReducer: any) => rootReducer.userReducer);

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <Loading message="You need to be logged in to access this page. You will be redirected to the login page shortly..." />
      </>
    )
  }

  return <>{children}</>
}

export default AuthenticationGuard