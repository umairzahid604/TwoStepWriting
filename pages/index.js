// Compnents
import Head from "next/head";
// import Article from "../component/article";
import Settings from "../component/settings";
import AddArticles from "../component/addarticles";
import WriteArticle from "../component/writearticle";
import { getTopics, saveAllTopics, deleteTopic, writeTopic } from "../utils/Topicfunctions"
import { writeIntro,deleteArticle } from "../utils/Articlefunctions"



import { useState, useEffect } from "react";
// import "./index.module.css";
// import "../styles/glov"

export default function Home() {
  const [Input, setInput] = useState("");
  const [Topics, setTopics] = useState([])
  const [Articles, setArticles] = useState([])
  const [writeArticle, setwriteArticle] = useState({})
  const [articleChanged, setarticleChanged] = useState(false)
  const [saveTopicClicked, setsaveTopicClicked] = useState(false)
  const [writeCompleteArticle, setwriteCompleteArticle] = useState(false)




  const [settings, setSettings] = useState({ model: {}, temperature: null, tokens: null, prompt: "", apiKey: "", autoload: false })
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
    if (articleChanged) {
      getTopics(writeArticle).then((topics) => {
        setTopics(topics)
        // Autoload is true
        if (topics.length != 0 && settings.autoload) {
          topics.forEach((topic) => {
            if (topic._id && topic.para == "") {
              writeTopic(topic, settings)
            }
          })
        }
        setarticleChanged(false)
      })
    }


  }, [articleChanged])


  useEffect(() => {
    if (saveTopicClicked) {
      saveAllTopics(Topics, writeArticle).then(topics => {
        setTopics(topics)
        // setwriteCompleteArticle(true)
      })

      setsaveTopicClicked(false)
    }


    if (writeCompleteArticle) {
      writeIntro(writeArticle, setwriteArticle, settings)
      Topics.forEach((topic) => {
        if (topic._id) {
          writeTopic(topic, Topics, setTopics, settings)
        }
      })
      setwriteCompleteArticle(false)
    }


  }, [saveTopicClicked, writeCompleteArticle])



  useEffect(() => {
    if (window.localStorage.getItem("settings")) {
      let settingss = JSON.parse(window.localStorage.getItem("settings"))
      console.log(settingss)
      setSettings(settingss)
    }
    getArticles().then((articles) => setArticles(articles))

  }, [])

  // async function deleteArticle(article,Articles,setArticles) {
  //   if (!article._id) {
  //     setArticles(Articles.filter(item => item !== article))
  //     return
  //   }

  //   try {

  //     const response = await fetch("/api/deletearticle", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ _id: article._id })
  //     });

  //     const data = await response.json();


  //     if (response.status !== 200) {
  //       throw data.error || new Error(`Request failed with status ${response.status}`);
  //     }

  //     console.log(data.articles)
  //     setArticles(Articles.filter(item => item !== article))
  //     if (writeArticle == article) {
  //       setMode("addarticles")
  //     }


  //   } catch (error) {
  //     // Consider implementing your own error handling logic here
  //     console.error(error);
  //     alert(error.message);
  //   }
  // }

  return (
    <div>
      <div className={"container"}>
        {/* SAVED ARTICLES SIDEBAR */}
        <div className="sidebar-wrapper">
          <div className="sidebar">
            <h3>Saved Articles</h3>
            <div className="sidebar-items">
              {Articles.map((article) => {
                if (article._id) {
                  return (
                    <div className="sidebar-item"> <div className="link" onClick={() => {
                      setwriteArticle(article)
                      setMode("writearticle")
                      setarticleChanged(true)
                    }}>{article.title}</div>
                      
                      <div className="actions">
                        <button className={"button"} onClick={() => { deleteArticle(article,writeArticle,Articles,setArticles) }}>Delete</button>
                      </div>

                    </div>
                  )
                }

              })}

            </div>
            <div className={"searchBox articleBox"} >

              <textarea name="input" placeholder={"Enter Article Titles"} value={Input} onChange={(e) => setInput(e.target.value)} id=""></textarea>

              <button className={"button"} onClick={() => {
                if (Input == "") return alert("please enter keywords")
                let titles = Input.split(/\r?\n|\r|\n/g);
                let arr = []
                titles.forEach((title) => {
                  if (title != "") {
                    arr.push({ title: title, intro: "", })
                  }

                })
                setArticles([...Articles, ...arr])
                setsaveClicked(true)
                console.log(Articles)
                setInput("")

              }}>Add New Articles</button>

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

        {/* SAVED TOPICS SIDEBAR */}
        {Mode == "writearticle" &&
          <div className={`${Object.keys(writeArticle).length == 0 ? "hideSidebar" : "topic-sidebar-wrapper"}`}>
            <div className="topicSidebar sidebar">
              <h3>Saved Topics</h3>

              <div className="sidebar-items">
                <div className="sidebar-item">
                  <div className="link" onClick={() => {
                  }}>{writeArticle.title}</div>
                  <div className="actions">

                    {/* <button className={"button"} onClick={() => { deleteArticle(topic, Topics, setTopics) }}>Delete</button> */}
                    {/* <button className={"button "} onClick={() => { writeIntro(topic, Topics, setTopics, settings) }}>write</button> */}

                  </div>
                </div>

                {Topics.map((topic) => {
                  if (topic._id) {
                    return (

                      <div className="sidebar-item">
                        <div className="link" onClick={() => {
                        }}>{topic.topic}</div>
                        <div className="actions">

                          <button className={"button"} onClick={() => { deleteTopic(topic, Topics, setTopics) }}>Delete</button>
                          <button className={"button "} onClick={() => { writeTopic(topic, Topics, setTopics, settings) }}>write</button>

                        </div>
                      </div>
                    )
                  }

                })}

              </div>
              <div className={"searchBox topicsBox"} >
                <textarea name="input" placeholder={"Add Topics"} value={Input} onChange={(e) => setInput(e.target.value)} id=""></textarea>

                <button className={"button"} onClick={() => {
                  if (Input != "") {
                    let topics = Input.split(/\r?\n|\r|\n/g);
                    let topicArray = []
                    topics.forEach((topic) => {
                      if (topic == "") return
                      topicArray.push({ topic: topic, para: "" })
                    })
                    setTopics([...Topics, ...topicArray])
                  }

                  setsaveTopicClicked(true)
                  console.log(Topics)
                  setInput("")

                }}>Add Topics</button>

                <button className={"button"} onClick={() => {
                  setwriteCompleteArticle(true)
                }}>Write All Topics</button>

              </div>

              {/* <div className="actions">
        
            <button className="button" onClick={() => {
              setMode("addarticles")
            }}>Add New Articles</button>

            <button className="button" onClick={() => {
              setMode("settings")
            }}>Settings</button>

          </div> */}
            </div>
          </div>
        }



        <div className={"main"}>


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
            // <WriteArticle settings={settings} writeArticle={writeArticle} setwriteArticle={setwriteArticle} articleChanged={articleChanged} setarticleChanged={setarticleChanged} Articles={Articles} setArticles={setArticles} Mode={Mode} setMode={setMode} />
            <div contentEditable={true} className="completeArticle">
              <h1>{writeArticle.title}</h1>
              <div>{writeArticle.intro.trim()}</div>
              {Topics.map((topic, index) => {
                return (
                  <>
                    <h2>{topic.topic}</h2>
                    <div>{topic.para.trim()}</div>
                  </>

                )
              })}
            </div>
          }

          {Mode == "settings" &&
            <Settings setSettings={setSettings} settings={settings} setMode={setMode} />
          }

        </div>
      </div>
    </div>
  );
}

