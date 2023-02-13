import React from 'react'
import { useState } from 'react'
// import Select from 'react-select'
import "../styles/globals.css"

const App = ({Component,pageProps }) => {
    return (
        <Component {...pageProps}/>        
    )
}
export default App