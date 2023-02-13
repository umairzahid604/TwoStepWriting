import React from 'react'
import styles from "../styles/article.module.css"
import { useState } from 'react'
import Select from 'react-select'
// import "../styles/globals.css"
import writearticle from "./writearticle"


const Article = ({ article, writearticle, setwriteArticle, index, writeIntro, setArticles, Articles, Mode, setMode }) => {





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

  

  // Change value of paragraph of topic
  async function changePara(text, article) {
    setArticles(Articles.map((e) => {
      if (e.title == article.title) {
        e.para = text
      }
      return e
    }))
  }

  // Change value of Heading of topic
  async function changeHeading(text, article) {
    setArticles(Articles.map((e) => {
      if (e.title == article.title) {
        e.title = text
      }
      console.log(article)
      return e
    }))
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
      setArticles([...Articles.filter(item => item !== article),data.article])




    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

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
      

    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }


 


  return (
    <div className={styles.small_content_box}>
      {/* <h2 suppressContentEditableWarning="true" contentEditable="true" onInput={(e)=>{changeHeading(e.currentTarget.textContent,topic)}}>{topic.title}</h2> */}
      <input className={styles.topicHeading} onChange={(e) => {
        changeHeading(e.target.value, article)
      }} value={article.title} />

      <div className={styles.actions}>
        <button className={styles.button} onClick={() => { deleteArticle(article) }}>Delete</button>
        {!article._id ?
          (<button className={styles.button} onClick={() => {
            saveArticle(article)
          }}>Save</button>) :
          <button className={styles.button} onClick={() => {
            setwriteArticle(article)
            setMode("writearticle")
          }}>Write</button>
        }

      </div>

    </div>
  )
}
export default Article