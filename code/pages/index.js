import Head from "next/head";
import Topic from "../component/topic";

import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [Input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [topics, settopics] = useState([
    {title:"how to upload video on youtube",para:""},{title:"in four steps",para:""}
  ])
  const [apiKey, setapiKey] = useState("")

  function deleteTopic(topic) {
    settopics(topics.filter((e) => {
      return e !== topic
    }))
  }

  async function writePara(topic) {
    settopics(topics.map((e) => {
      if (e.title == topic.title) {
        // let data =
        topic.para = "hye"
      }
      return e
    }))
  }

  async function changePara(text,topic) {
    settopics(topics.map((e) => {
      if (e.title == topic.title) {
        e.para = text
      }
      return e
    }))
  }

  async function changeHeading(text,topic) {
    settopics(topics.map((e) => {
      if (e.title == topic.title) {
        e.title = text
      }
      console.log(e)
      return e
    }))
  }

  async function writeIntro(topic) {
    if(apiKey == "") return alert("add api key")
    
    try {
    
      const response = await fetch("/api/writePara", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: topic.title, apiKey: apiKey }),
      });

      const data = await response.json();
     
      
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      
      // console.log(data.result)
      // setResult(data.result);
      // setInput("");
      console.log(data.result)
      settopics(topics.map((e) => {
        if (e.title == topic.title) {
          e.para = data.result
        }
        return e
      }))
      console.log(topics)
    
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }

    

  }





  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: Input }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log(data.result)
      setResult(data.result);
      setInput("");
      console.log(data.result)
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <div className={styles.container}>
        <div className={styles.sidebar}></div>

        <div className={styles.main}>
          {/* <img src="/dog.png" className={styles.icon} /> */}
          <h3>Two Step Writing</h3>

          <div className={styles.searchBox} >
            <input type="text" className={styles.input} name="apikey" placeholder="Enter your OpenAi ApiKey" onChange={(e) => { setapiKey(e.target.value) }} />
            <textarea name="input" placeholder="Enter Topics" value={Input} onChange={(e) => setInput(e.target.value)} id=""></textarea>
            {/* <input type="submit" value="Add Topics"/> */}
            <button className={styles.button} onClick={() => {
              settopics([...topics, { title: Input, para: "" }])
              setInput("")
            }}>Add topics</button>

          </div>

          <div className={styles.content_box}>
            {topics.map((topic, index) => {
              return (
                <Topic topic={topic} deleteTopic={deleteTopic} writeIntro={writeIntro} writePara={writePara} key={index} index={index} changeHeading={changeHeading} changePara={changePara} />
              )
            })}
          </div>

        </div>
      </div>
    </div>
  );
}

