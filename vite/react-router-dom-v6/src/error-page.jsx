import React from 'react'
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
    const error = useRouteError();
    console.error(error);
  return (
    <div id="error-page">
    
        <h1 style={
            {
            marginBottom:"50px",
            color:"red",
            fontWeight:"bold",
            fontSize:"50px"
            
            }
            }>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
        <i>{error.statusText || error.message}</i>
        </p>
  </div>
  );
}

export default ErrorPage