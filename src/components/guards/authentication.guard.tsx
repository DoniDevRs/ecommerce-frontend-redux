import { FunctionComponent, useContext, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

// Utilities
import { useSelector } from 'react-redux'

// Components
import Header from '../header/header.component'
import Loading from '../loading/loading.component'

const AuthenticationGuard: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  //const { isAuthenticated } = useContext(UserContext)
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
        <Loading message="Você precisa estar logado para acessar esta página. Você será redirecionado para a página de login em instantes..." />
      </>
    )
  }

  return <>{children}</>
}

export default AuthenticationGuard