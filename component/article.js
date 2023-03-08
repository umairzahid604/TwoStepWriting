// CURRENTLY NOT IN USE


import React from 'react'
// import styles from "../styles/article.module.css"
import { useState } from 'react'
import Select from 'react-select'
// import "../styles/globals.css"
import writearticle from "./writearticle"


const Article = ({ article, writearticle, setwriteArticle, index, writeIntro, setArticles, Articles, Mode, setMode }) => {


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
      setArticles([...Articles.map(item => {
        if(item === article){
          return data.article
        }
        return item
      })])




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
    <div className={"small_content_box"}>
      {/* <h2 suppressContentEditableWarning="true" contentEditable="true" onInput={(e)=>{changeHeading(e.currentTarget.textContent,topic)}}>{topic.title}</h2> */}
      <input className={"articletitle"} onChange={(e) => {
        changeHeading(e.target.value, article)
      }} value={article.title} />

      <div className={"actions"}>
        <button className={"button"} onClick={() => { deleteArticle(article) }}>Delete</button>
        {!article._id ?
          (<button className={"button"} onClick={() => {
            saveArticle(article)
          }}>Save</button>) :
          <button className={"button"} onClick={() => {
            setwriteArticle(article)
            setMode("writearticle")
          }}>Write</button>
        }

      </div>

    </div>
  )
}
export default Article