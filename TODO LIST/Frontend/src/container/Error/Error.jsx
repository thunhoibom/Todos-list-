import {useRouteError} from "react-router-dom"


function Error(){
    const error = useRouteError();
    return(
        <div>
            <h1>Oops! Something went wrong</h1>
            <p>
                <i>
                    {error.statusText || error.message}
                </i>
            </p>
        </div>
    )
}
export default Error;