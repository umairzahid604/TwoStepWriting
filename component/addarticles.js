
import React from 'react'
import { useState, useEffect } from 'react'
import {saveAllArticles} from "../utils/Articlefunctions"

const AddArticles = ({Articles, setArticles,}) => {

  const [Input, setInput] = useState([])
  const [saveClicked, setsaveClicked] = useState(false)


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

            })
            setArticles([...Articles, ...arr])
            setsaveClicked(true)
            console.log(Articles)
            setInput("")

          }}>Add New Articles</button>

        </div>
      </div>
    </>

  )
}


export default AddArticles