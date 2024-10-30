import {useRouteError} from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error)

    return (
        <div className="error-page">
            <h1>Oops</h1>
            <p><strong>Sorry, an unexpected error has occured</strong>.</p>
            <p><strong>{error.status}: {error.statusText}</strong></p>
            <p><em>{error.data}</em></p>
        </div>
    )
}

export default ErrorPage;