// Compnents
import Head from "next/head";
// import Article from "../component/article";
import Settings from "../component/settings";
import AddArticles from "../component/addarticles";
import WriteArticle from "../component/writearticle";



import { useState, useEffect } from "react";
// import "./index.module.css";
// import "../styles/glov"

export default function Home() {
  const [Input, setInput] = useState("");
  const [Topics, setTopics] = useState([])
  const [Articles, setArticles] = useState([])
  const [writeArticle, setwriteArticle] = useState({})
  const [articleChanged, setarticleChanged] = useState(false)



  const [settings, setSettings] = useState({ model: {}, temperature: null, tokens: null, prompt: "", apiKey: "" })
  console.log(settings)


  const [Mode, setMode] = useState("addarticles")

  async function getArticles() {
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
    if (window.localStorage.getItem("settings")) {
      let settingss = JSON.parse(window.localStorage.getItem("settings"))
      console.log(settingss)
      setSettings(settingss)
    }
    getArticles().then((articles) => setArticles(articles))

  }, [])

  // useEffect(() => {
    
  // setwriteArticle({})
   
  // }, [Mode])
  


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



  // async function writeIntro(topic, settings) {
  //   if (settings.apiKey == "") return alert("add api key")

  //   try {

  //     const response = await fetch("/api/writeIntro", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ input: topic.title, apiKey: settings.apiKey, settings: settings })
  //     });

  //     const data = await response.json();


  //     if (response.status !== 200) {
  //       throw data.error || new Error(`Request failed with status ${response.status}`);
  //     }

  //     console.log(data.result)
  //     setTopics(Topics.map((e) => {
  //       if (e.title == topic.title) {
  //         e.para = data.result
  //       }
  //       console.log(e)
  //       return e
  //     }))
  //     console.log(Topics)

  //   } catch (error) {
  //     // Consider implementing your own error handling logic here
  //     console.error(error);
  //     alert(error.message);
  //   }



  // }

  async function deleteArticle(article) {
    if(!article._id){
      setArticles(Articles.filter(item => item !== article))
      return
    }
    
    try {

      const response = await fetch("/api/deletearticle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: article._id })
      });

      const data = await response.json();


      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      console.log(data.articles)
      setArticles(Articles.filter(item => item !== article))
      if(writeArticle == article){
        setMode("addarticles")
      }
      

    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }


  return (
    <div>
      <div className={"container"}>
        <div className="sidebar-wrapper">
          <div className="sidebar">
            <h3>Saved Articles</h3>
            <div className="articles">
              {Articles.map((article) => {
                if (article._id) {
                  return (
                    <div className="article"> <div className="link" onClick={() => {
                      setwriteArticle(article)
                      setMode("writearticle")
                      setarticleChanged(true)
                    }}>{article.title}</div>
                      <button className={"button"} onClick={() => { deleteArticle(article) }}>Delete</button>

                    </div>
                  )
                }

              })}

            </div>
            <div className="actions">
              {/* <button className="button" onClick={() => {
                setMode("")
              }}>Home</button> */}

              <button className="button" onClick={() => {
                setMode("addarticles")
              }}>Add New Articles</button>

              <button className="button" onClick={() => {
                setMode("settings")
              }}>Settings</button>

            </div>
          </div>
        </div>
        <div className={"main"}>
          {/* <img src="/dog.png" className={styles.icon} /> */}


          {Mode == "" &&

            <div className="startMenu">
              <h3>Two Step Writing</h3>

              <button className="button" onClick={() => {
                setMode("addarticles")
              }}>Start Writing</button>

              {/* <button className="button" onClick={() => {
                setMode("settings")
              }}>Settings</button> */}
            </div>

          }

          {Mode == "addarticles" &&
            <AddArticles writeArticle={writeArticle} setwriteArticle={setwriteArticle} Articles={Articles} setArticles={setArticles} Mode={Mode} setMode={setMode} />
          }

          {Mode == "writearticle" &&
            <WriteArticle settings={settings} writeArticle={writeArticle} setwriteArticle={setwriteArticle} articleChanged={articleChanged} setarticleChanged={setarticleChanged} Articles={Articles} setArticles={setArticles} Mode={Mode} setMode={setMode} />

          }

          {Mode == "settings" &&
            <Settings setSettings={setSettings} settings={settings} setMode={setMode} />
          }

        </div>
      </div>
    </div>
  );
}

