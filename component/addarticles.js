import React from 'react'
import { useState, useEffect } from 'react'
import Article from './article'
const AddArticles = ({ writeArticle, setwriteArticle, Articles, setArticles, Mode, setMode }) => {
  const [Input, setInput] = useState([])
  const [saveClicked, setsaveClicked] = useState(false)

  // const [Articles, setArticles] = useState([])

  useEffect(() => {
    if (saveClicked) {
      saveAllArticles(Articles).then(articles => {
        console.log(articles)
        setArticles(articles)
      })

      setsaveClicked(false)
    }
    // setsaveClicked(false)

  }, [saveClicked])


  async function saveAllArticles(articles) {
    let unSavedArticles = articles.map((article) => {
      if (!article._id) {
        return article
      }
    })
    try {

      const response = await fetch("/api/addallarticles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ articles: unSavedArticles })
      });

      const data = await response.json();


      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }



      return data.articles


    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }


  async function saveArticle(article) {
    try {

      const response = await fetch("/api/addarticle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: article.title })
      });

      const data = await response.json();


      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      console.log(data.article)

      console.log(Article)

      return data.article


    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }


  return (
    <>
      <div className="startMenu">
        <h3>Two Step Writing</h3>

        <div className={"searchBox"} >

          <textarea name="input" placeholder={"Enter Article Titles"} value={Input} onChange={(e) => setInput(e.target.value)} id=""></textarea>

          <button className={"button"} onClick={() => {
            if (Input == "") return alert("please enter keywords")
            let titles = Input.split(/\r?\n|\r|\n/g);
            let arr = []
            titles.forEach((title) => {
              if (title != "") {
                arr.push({ title: title, intro: "", })
              }
              // saveArticle({ title: title, content: { hello: "hello" } })
            })
            setArticles([...Articles, ...arr])
            setsaveClicked(true)
            console.log(Articles)
            setInput("")

          }}>Add New Articles</button>

          {/* <button className={"button"} onClick={() => {

          // Articles.forEach((article)=>{
          //   if(!article._id){
          //     saveArticle(article)
          //   }
          // })
          setsaveClicked(true)
        }}>Save All Article</button> */}



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
      </div>

      {/* <div className={"content_box"}>
        {Articles.map((article, index) => {
          return (
            <Article article={article} setwriteArticle={setwriteArticle} Articles={Articles} setArticles={setArticles} Mode={Mode} setMode={setMode}
              // writeIntro={writeIntro} writePara={writePara} 
              key={index} index={index}
            />
          )
        })}
      </div> */}
    </>



  )
}


export default AddArticles