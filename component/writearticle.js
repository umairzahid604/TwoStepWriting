import React from 'react'
import { useState, useEffect } from 'react'
import WritingBox from "./writingbox"
const writeArticle = ({ writeArticle, setwriteArticle, Articles, setArticles, Mode, setMode }) => {
  const [Input, setInput] = useState([])
  const [Topics, setTopics] = useState([])

  useEffect(() => {
    getTopics(writeArticle).then((topics) => {
      setTopics(topics)
      console.log(topics)
    })


  }, [])


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
      setTopics([...Topics.filter(item => item !== topic), data.topic])


    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }


  async function deleteTopic(topic) {
    if(!topic._id){
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



  return (
    <>

      <div className={"searchBox"} >
        <textarea name="input" placeholder={"Enter Article Topics"} value={Input} onChange={(e) => setInput(e.target.value)} id=""></textarea>

        <button className={"button"} onClick={() => {
          if (Input == "") return alert("please enter keywords")
          let topics = Input.split(/\r?\n|\r|\n/g);
          let topicArray = []
          topics.forEach((topic) => {
            if (topic == "") return
            topicArray.push({ topic: topic, para: "" })
            // saveArticle({ title: title, content: { hello: "hello" } })
            // saveArticle()
          })
          // topicArray = [...writeArticle.content,...topicArray]
          setTopics([...Topics, ...topicArray])
          console.log(Topics)
          setInput("")


        }}>Add Article Topics</button>



        {/* {Topics.length != 0 &&
    <button className={"button"} onClick={() => {
      Topics.forEach((topic)=>{
        let settings = {
          tokens:parseInt(500),
          promt:"Use daily life words, sentences, phrases, make this engaging to the reader, expert touch, include a fact to show expertise and elaborate if needed",
          temperature:parseFloat(1.5),
          model:"text-davinci-003"
      }
        writeIntro(topic,settings)
      })
    }}>Write All Topics</button>
    } */}
      </div>

      <div className={"content_box"}>
        {writeArticle.title}

        {Topics.map((topic, index) => {
          return (
            <div>
              {index}
              {topic.topic}
              <button onClick={()=>{deleteTopic(topic)}}>Delete</button>

              {!topic._id ? (
                <button onClick={() => {
                  saveTopic(topic, writeArticle)

                }

                }>Save</button>
              ) :
                (
                  <button onClick={() => {

                  }

                  }>Write</button>
                )
              }


            </div>
          )
        })}
      </div>
    </>



  )
}


export default writeArticle