// Compnents
import Head from "next/head";
// import Article from "../component/article";
import Settings from "../component/settings";
import AddArticles from "../component/addarticles";
import WriteArticle from "../component/writearticle";



import { useState,useEffect } from "react";
// import "./index.module.css";
// import "../styles/glov"

export default function Home() {
  const [Input, setInput] = useState("");
  const [Topics, setTopics] = useState([])
  const [Articles, setArticles] = useState([])
  const [writeArticle, setwriteArticle] = useState({})



  const [Model, setModel] = useState({ value: 'text-davinci-003', label: 'text-davinci-003' })
  const [Temperature, setTemperature] = useState(0.7)
  const [Tokens, setTokens] = useState(300)
  const [Prompt, setPrompt] = useState("Use daily life words, sentences, phrases, make this engaging to the reader, expert touch, include a fact to show expertise and elaborate if needed")
  const [apiKey, setapiKey] = useState("")


  const [Mode, setMode] = useState("")

async function getArticles(){
  try {

    const response = await fetch("/api/getarticles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();


    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`);
    }

    console.log(data.articles)
    // setArticles(data.articles)
    return data.articles
    // setTopics(Topics.map((e) => {
    //   if (e.title == topic.title) {
    //     e.para = data.result
    //   }
    //   console.log(e)
    //   return e
    // }))
    // console.log(Topics)

  } catch (error) {
    // Consider implementing your own error handling logic here
    console.error(error);
    alert(error.message);
  }
}



useEffect(() => {
getArticles().then((articles)=> setArticles(articles))
  
}, [])



  // function deleteTopic(topic) {
  //   setTopics(Topics.filter((e) => {
  //     return e !== topic
  //   }))
  // }

  async function writePara(topic) {
    setTopics(Topics.map((e) => {
      if (e.title == topic.title) {
        // let data =
        topic.para = "hye"
      }
      return e
    }))
  }



  async function writeIntro(topic, settings) {
    if (apiKey == "") return alert("add api key")

    try {

      const response = await fetch("/api/writeIntro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: topic.title, apiKey: apiKey, settings: settings })
      });

      const data = await response.json();


      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      console.log(data.result)
      setTopics(Topics.map((e) => {
        if (e.title == topic.title) {
          e.para = data.result
        }
        console.log(e)
        return e
      }))
      console.log(Topics)

    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }



  }


  return (
    <div>
      <div className={"container"}>

        <div className={"main"}>
          {/* <img src="/dog.png" className={styles.icon} /> */}
          <h3>Two Step Writing
            {Mode != "" &&
              <button className="button" onClick={() => {
                setMode("")
              }}>Menu</button>
            }
          </h3>

          {Mode == "" &&
            <div className="startMenu">
              <button className="button" onClick={() => {
                setMode("addarticles")
              }}>Start Writing</button>

              <button className="button" onClick={() => {
                setMode("settings")
              }}>Settings</button>
            </div>

          }

          {Mode == "addarticles" &&
            <AddArticles writeArticle={writeArticle} setwriteArticle={setwriteArticle} Articles={Articles} setArticles={setArticles} Mode={Mode} setMode={setMode} />
          }

          {Mode == "writearticle" &&
            <WriteArticle writeArticle={writeArticle} setwriteArticle={setwriteArticle} Articles={Articles} setArticles={setArticles} Mode={Mode} setMode={setMode} />

          }

          {Mode == "settings" &&
            <Settings setMode={setMode} model={Model} setModel={setModel} apiKey={apiKey} setapiKey={setapiKey} setPrompt={setPrompt} prompt={Prompt} temperature={Temperature} setTemperature={setTemperature} tokens={Tokens} setTokens={setTokens} />
          }

        </div>
      </div>
    </div>
  );
}

