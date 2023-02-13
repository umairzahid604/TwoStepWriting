import React from 'react'
import styles from "../styles/topics.module.css"

const Topic = ({ topic, deleteTopic, index, writeIntro, changeHeading, changePara }) => {



    return (
        <div className={styles.small_content_box}>
            {/* <h2 suppressContentEditableWarning="true" contentEditable="true" onInput={(e)=>{changeHeading(e.currentTarget.textContent,topic)}}>{topic.title}</h2> */}
            <input className={styles.topicHeading} onChange={(e) => { changeHeading(e.target.value, topic) }} value={topic.title} />

            {topic.para != "" ?
                (
                    <textarea className={styles.para} onChange={(e) => { changePara(e.target.value, topic) }}>
                        {topic.para}
                    </textarea>
                ) : ""
            }
            <div className={styles.actions}>
                <button className={styles.button} onClick={() => { deleteTopic(topic) }}>Delete</button>
                {index == 0 ? (<button className={styles.button} onClick={() => { writeIntro(topic) }}>Write Introduction</button>) :
                    (<button className={styles.button} onClick={() => { writeIntro(topic) }}>Write Para</button>)
                }
            </div>

        </div>
    )
}
export default Topic