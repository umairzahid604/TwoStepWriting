import React from 'react'
import { useState,useEffect } from 'react'
import Select from 'react-select'
import styles from "../styles/settings.module.css"


const Settings = ({ setMode, model, setModel, temperature, setTemperature, apiKey, setapiKey, tokens, setTokens, prompt, setPrompt }) => {
    const options = [
        { value: "text-davinci-003", label: "text-davinci-003" },
    ]

    useEffect(() => {
        // Client-side-only code
        if (window.localStorage.getItem("settings")) {
            let settings = JSON.parse(window.localStorage.getItem("settings"))
            console.log(settings)
        }
    })

   

    function saveSettings(tokens, temperature, prompt, model) {
        window.localStorage.setItem("settings", JSON.stringify({
            model, tokens:parseInt(tokens), temperature:parseFloat(temperature), prompt
        }))
    }

    return (
        <div className={styles.settingBox}>
            <h1>Settings</h1>
            <div className={styles.actions}>
                <span>ApiKey</span>
                <input type="text" className={"save"} name="apikey" value={apiKey} placeholder="Enter your OpenAi ApiKey" onChange={(e) => { setapiKey(e.target.value) }} />

                <span>Prompt</span>
                <input name='promt' type="text" value={prompt} placeholder='Prompt' onChange={(e) => { setPrompt(e.target.value) }} />

                <span>Temperature</span>
                <input name='temperature' type="number" value={temperature} placeholder="Temperature" onChange={(e) => { setTemperature(e.target.value) }} />

                <span>MaxTokens</span>
                <input name='tokens' type="number" value={tokens} placeholder='Max Tokens' onChange={(e) => { setTokens(e.target.value) }} />

                <span>Model</span>
                <Select defaultValue={options[0]} className={styles.select} options={options} onChange={(e) => {
                    setModel(e.value)
                }} />
                <button className={"asd"} onClick={() => {
                    if(apiKey == "") return alert("add api key")
                    saveSettings(tokens, temperature, prompt, model)
                    setMode("")
                    

                }}>Save Settings</button>

            </div>
        </div>
    )
}
export default Settings