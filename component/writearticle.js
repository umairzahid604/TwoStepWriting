import React from 'react'
import { useState, useEffect,useRef } from 'react'

const writeArticle = ({ writeArticle, setwriteArticle, Articles, setArticles, Mode, setMode, settings, articleChanged, setarticleChanged }) => {
  const [Input, setInput] = useState([])
  const [Topics, setTopics] = useState([])
  const [saveTopicClicked, setsaveTopicClicked] = useState(false)
  const [writeCompleteArticle, setwriteCompleteArticle] = useState(false)
  const [toggleTopics, settoggleTopics] = useState(false)
  const completeArticle = useRef()

  function copyArticle(){
    console.log(completeArticle.current.innerHTML)
    navigator.clipboard.writeText(completeArticle.current.innerText)
    // windo(completeArticle.current.innerText)
    
  }


  console.log(settings)
  useEffect(() => {
    if (articleChanged) {
      getTopics(writeArticle).then((topics) => {
        setTopics(topics)
        console.log(topics)
        console.log("hello")
        setarticleChanged(false)
      })
    }

  }, [articleChanged])

  useEffect(() => {
    if (saveTopicClicked) {
      saveAllTopics(Topics, writeArticle).then(topics => {
        setTopics(topics)
        setwriteCompleteArticle(true)
      })

      setsaveTopicClicked(false)
    }


    if (writeCompleteArticle) {
      writeIntro(writeArticle, settings)
      Topics.forEach((topic) => {
        if (topic._id) {
          writeTopic(topic, settings)
        }
      })
      setwriteCompleteArticle(false)
    }


  }, [saveTopicClicked, writeCompleteArticle])





  async function getTopics(article) {
    try {

      const response = await fetch("/api/gettopics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ article: article })
      });

      const data = await response.json();


      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      console.log(data.topics)
      return data.topics
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


  async function saveAllTopics(topics, article) {
    let unSavedTopics = Topics.map((topic) => {
      if (!topic._id) {
        return topic
      }
    })
    console.log(unSavedTopics.length)
    if (unSavedTopics.length == 0) return []
    try {

      const response = await fetch("/api/addalltopics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topics: unSavedTopics, article: article })
      });

      const data = await response.json();


      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      console.log("topic", data)
      return data.topics


    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }


  // const [Articles, setArticles] = useState([])
  async function saveTopic(topic, article) {
    try {

      const response = await fetch("/api/addtopic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: topic.topic, article: article })
      });

      const data = await response.json();


      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      console.log("topic", data)
      setTopics([...Topics.map(item => {
        if (item == topic) {
          return data.topic
        }
        return item
      })])


    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }


  async function deleteTopic(topic) {
    if (!topic._id) {
      setTopics(Topics.filter(item => item !== topic))
      return
    }

    try {

      const response = await fetch("/api/deletetopic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: topic._id })
      });

      const data = await response.json();


      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      console.log(data.topics)
      setTopics(Topics.filter(item => item !== topic))


    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  async function changeHeading(text, topic) {
    setTopics(Topics.map((e) => {
      if (e == topic) {
        e.topic = text
      }
      return e
    }))
  }

  async function changePara(text, topic) {
    setTopics(Topics.map((e) => {
      if (e == topic) {
        e.para = text
      }
      return e
    }))
  }



  async function writeIntro(article) {

    try {

      const response = await fetch("/api/writeintro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ article: article, settings: settings })
      });

      const data = await response.json();


      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      // console.log(data.topics)
      // setArticles(Topics.map(item => {
      //   if (item == article) {
      //     item.intro = data.result
      //   }
      //   return item
      // }))
      setwriteArticle({ title: article.title, intro: data.result })
      console.log(writeArticle)
      console.log(data.result)


    } catch (error) {
      writeIntro(article)
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }


  async function writeTopic(topic) {

    try {

      const response = await fetch("/api/writetopic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: topic, settings: settings })
      });

      const data = await response.json();


      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      // console.log(data.topics)
      setTopics(Topics.map(item => {
        if (item == topic) {
          topic.para = data.result
        }
        return item
      }))


    } catch (error) {
      writeTopic(topic)
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }




  return (
    <>
      <div className={"searchBox"} >
        <textarea name="input" placeholder={"Enter Article Topics"} value={Input} onChange={(e) => setInput(e.target.value)} id=""></textarea>

        <button className={"button"} onClick={() => {
          if (Input != "") {
            let topics = Input.split(/\r?\n|\r|\n/g);
            let topicArray = []
            topics.forEach((topic) => {
              if (topic == "") return
              topicArray.push({ topic: topic, para: "" })
              // saveArticle({ title: title, content: { hello: "hello" } })
              // saveArticle()
            })
            setTopics([...Topics, ...topicArray])
          }

          // topicArray = [...writeArticle.content,...topicArray]
          setsaveTopicClicked(true)
          console.log(Topics)
          setInput("")




        }}>Write Complete Article</button>

        {/* <button className={"button"} onClick={() => {
          // saveAllTopics(Topics, writeArticle)
          setsaveTopicClicked(true)
        }}>Save All Topics</button> */}

        {/* Write Complete Article */}
        {/* {Topics.length != 0 &&
          <button className={"button"} onClick={() => {
            writeIntro(writeArticle, settings)
            Topics.forEach((topic) => {
              if (topic._id) {
                writeTopic(topic, settings)
              }
            })
          }}>Write All Topics</button>
        } */}


      </div>

      <div className={`topics-list ${toggleTopics ? "showTopics" : "hideTopics"}`}>
       <h2 className='topics-list-heading'>Topics <button onClick={()=>{toggleTopics ? settoggleTopics(false): settoggleTopics(true)}}>Toogle</button></h2>
        {/* <div className="writingBox">
          <div className="content">
            <input type="text" className='heading' value={writeArticle.title} />
            <textarea name="para" id="" className={writeArticle.intro == "" ? "hidePara" : 'showPara'}  value={writeArticle.intro} cols="30" rows="10">{writeArticle.intro}</textarea>
          </div>
          <div className="actions">
            <button className='action' onClick={() => { writeIntro(writeArticle) }}>Write</button>
          </div>
        </div> */}

        {Topics.map((topic, index) => {
          return ( 
            <div key={index} className={"topic"}>
                {/* <input type="text" className='heading' value={topic.topic} onChange={(e) => { changeHeading(e.target.value, topic) }} /> */}
                <div>{topic.topic}</div>
                <button className='action' onClick={() => { deleteTopic(topic) }}>Delete</button>
                {/* <textarea name="para" id="" className={topic.para == "" ? "hidePara" : 'showPara'} value={topic.para} cols="30" rows="10" onChange={(e) => { changePara(e.target.value, topic) }}></textarea> */}
              
              {/* <div className="actions">

                {!topic._id ? (
                  <button className='action' onClick={() => {
                    saveTopic(topic, writeArticle)
                  }
                  }>Save</button>
                ) : (
                  <button className='action' onClick={() => {
                    writeTopic(topic)
                  }
                  }>Write</button>
                )
                } 

              </div> */}
            </div>
          )
        })} 
      </div>

        {/* <button onClick={()=>{copyArticle()}}>Copy Article</button> */}
      <div contentEditable={true} ref={completeArticle} className="completeArticle">
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

    </>



  )
}


export default writeArticle