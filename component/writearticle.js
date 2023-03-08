import React from 'react'
import { useState, useEffect,useRef } from 'react'

import {getTopics,saveAllTopics,deleteTopic} from "../utils/Topicfunctions"


const writeArticle = ({ writeArticle, setwriteArticle, settings, articleChanged, setarticleChanged }) => {
  
  const [Input, setInput] = useState([])
  const [Topics, setTopics] = useState([])
  const [saveTopicClicked, setsaveTopicClicked] = useState(false)
  const [writeCompleteArticle, setwriteCompleteArticle] = useState(false)
  const [toggleTopics, settoggleTopics] = useState(false)
  const completeArticle = useRef()

function breakPara(text){
// text = text.replaceAll(".",".\n\n").trimStart()
return text
}

  // useEffect(() => {
  //   if (articleChanged) {
  //     getTopics(writeArticle).then((topics) => {
  //       setTopics(topics)
  //       console.log(topics)
  //       console.log("hello")
  //       // Autoload is true
  //       if(topics.length != 0 && settings.autoload){
  //         topics.forEach((topic) => {
  //           if (topic._id && topic.para == "") {
  //             writeTopic(topic, settings)
  //           }
  //         })
  //       }
  //       setarticleChanged(false)
  //     })
  //   }


  // }, [articleChanged])

  // useEffect(() => {
  //   if (saveTopicClicked) {
  //     saveAllTopics(Topics, writeArticle).then(topics => {
  //       setTopics(topics)
  //       // setwriteCompleteArticle(true)
  //     })

  //     setsaveTopicClicked(false)
  //   }


  //   if (writeCompleteArticle) {
  //     writeIntro(writeArticle, settings)
  //     Topics.forEach((topic) => {
  //       if (topic._id) {
  //         writeTopic(topic, settings)
  //       }
  //     })
  //     setwriteCompleteArticle(false)
  //   }


  // }, [saveTopicClicked, writeCompleteArticle])



  // async function changeHeading(text, topic) {
  //   setTopics(Topics.map((e) => {
  //     if (e == topic) {
  //       e.topic = text
  //     }
  //     return e
  //   }))
  // }

  // async function changePara(text, topic) {
  //   setTopics(Topics.map((e) => {
  //     if (e == topic) {
  //       e.para = text
  //     }
  //     return e
  //   }))
  // }



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
      {/* <div className={"searchBox topicsBox"} >
        <textarea name="input" placeholder={"Enter Article Topics"} value={Input} onChange={(e) => setInput(e.target.value)} id=""></textarea>

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

      </div> */}

      {/* <div className={`topics-list ${toggleTopics ? "showTopics" : "hideTopics"}`}>
       <h2 className='topics-list-heading'>Topics <button onClick={()=>{toggleTopics ? settoggleTopics(false): settoggleTopics(true)}}>Toogle</button></h2>


        {Topics.map((topic, index) => {
          return ( 
            <div key={index} className={"topic"}>
                <div className='topicname'>{topic.topic}</div>
                <div className="action-wrapper">
                <button className='action' onClick={() => { deleteTopic(topic,Topics,setTopics) }}>Delete</button>
                <button className='action' onClick={() => { deleteTopic(topic,Topics,setTopics) }}>Write</button>
                </div>

           
            </div>
          )
        })} 
      </div> */}

        {/* <button onClick={()=>{copyArticle()}}>Copy Article</button> */}
      <div contentEditable={true} ref={completeArticle} className="completeArticle">
        <h1>{writeArticle.title}</h1>
        <div>{writeArticle.intro.trim()}</div>
        {Topics.map((topic, index) => {
          return (
            <>
              <h2>{topic.topic}</h2>
              <div>{breakPara(topic.para.trim())}</div>
            </>

          )
        })}
      </div>

    </>



  )
}


export default writeArticle