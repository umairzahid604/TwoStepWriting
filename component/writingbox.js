import React from 'react'
import { useState, useEffect } from 'react'

const writingBox = ({ topic,article }) => {
    const [Input, setInput] = useState([])
    
    async function saveTopic(topic, article) {
        try {
    
          const response = await fetch("/api/addtopic", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ topic: topic, article: article })
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
        <div>
            {topic.topic}
            <button>delete</button>
            <button>write</button>
        
        </div>



    )
}


export default writingBox