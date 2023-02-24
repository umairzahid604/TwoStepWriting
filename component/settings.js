import React from 'react'
import { useState,useEffect } from 'react'
import Select from 'react-select'
// import styles from "../styles/settings.module.css"


const Settings = ({settings,setSettings,setMode }) => {
    const options = [
        { value: "text-davinci-003", label: "text-davinci-003" },
    ]

    useEffect(() => {
        // Client-side-only code
        if (window.localStorage.getItem("settings")) {
            let settings = JSON.parse(window.localStorage.getItem("settings"))
            console.log(settings)
            // alert(settings)
        }
    })

   

    function saveSettings(settings) {
        window.localStorage.setItem("settings", JSON.stringify(settings))
    }

    return (
        <div className={"settingBox"}>
            <h1>Settings</h1>
            <div className={"actions"}>
                <span>ApiKey</span>
                <input type="text" className={"save"} name="apikey" value={settings.apiKey} placeholder="Enter your OpenAi ApiKey" onChange={(e) => { setSettings({...settings,apiKey:e.target.value}) }} />

                <span>Prompt</span>
                <input name='promt' type="text" value={settings.prompt} placeholder='Prompt' onChange={(e) => {setSettings({...settings,promt:e.target.value}) }} />

                <span>Temperature</span>
                <input name='temperature' type="number" value={settings.temperature} placeholder="Temperature" onChange={(e) => {setSettings({...settings,temperature:parseFloat(e.target.value)}) }} />

                <span>MaxTokens</span>
                <input name='tokens' type="number" value={settings.tokens} placeholder='Max Tokens' onChange={(e) => { setSettings({...settings,tokens:parseInt(e.target.value)})}} />

                <span>Model</span>
                <Select defaultValue={options[0]} className={"select"} options={options} onChange={(e) => {
                    setSettings({...settings,model:e.value}) 
                }} />
                <button className={"asd"} onClick={() => {
                    if(settings.apiKey == "") return alert("add api key")
                    // setSettings({tokens:parseInt(tokens), temperature, prompt, model,apiKey})
                    saveSettings(settings)
                    setMode("")
                    

                }}>Save Settings</button>

            </div>
        </div>
    )
}
export default Settings