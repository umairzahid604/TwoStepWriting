import React from 'react'
import { useState, useEffect } from 'react'
import Article from './article'
const AddArticles = ({writeArticle,setwriteArticle,Articles,setArticles,Mode,setMode}) => {
    const [Input, setInput] = useState([])
    // const [Articles, setArticles] = useState([])


    async function saveArticle(title){
      try {

        const response = await fetch("/api/addarticle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title:title})
        });
  
        const data = await response.json();
  
  
        if (response.status !== 200) {
          throw data.error || new Error(`Request failed with status ${response.status}`);
        }
  
        console.log(data.result)
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


    return (
        <>
        
        <div className={"searchBox"} >
            <textarea name="input" placeholder={Object.keys(writeArticle).length == 0 ? "Enter Articles Titles" : "Enter Article Topics"} value={Input} onChange={(e) => setInput(e.target.value)} id=""></textarea>

            <button className={"button"} onClick={() => {
                if (Input == "") return alert("please enter keywords")
                let titles = Input.split(/\r?\n|\r|\n/g);
                let arr = []
                titles.forEach((title) => {
                    if (title == "") return
                    arr.push({title:title,intro:null,content:[]})
                    // saveArticle({ title: title, content: { hello: "hello" } })
                })
                setArticles([...Articles, ...arr])
                console.log(Articles)
                setInput("")

            }}>Add Article Titles</button>

          
           
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
            {Articles.map((article, index) => {
              return (
                <Article article={article} setwriteArticle={setwriteArticle} Articles={Articles} setArticles={setArticles} Mode={Mode} setMode={setMode}
                // writeIntro={writeIntro} writePara={writePara} 
                key={index} index={index} 
                />
              )
            })}
          </div>
        </>


        
    )
}


export default AddArticles