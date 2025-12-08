import { FunctionComponent } from "react"
import { SyncLoader } from "react-spinners";

// Styles
import { LoadingContainer } from "./loading.style"
interface LoadingProps {
    message?: string
}

const LoadingComponent: FunctionComponent<LoadingProps> = ( {message} ) => {
    return  <LoadingContainer>
                {message && <p>{message}</p>}
                <SyncLoader size={30}/>
            </LoadingContainer>
}

export default LoadingComponent;