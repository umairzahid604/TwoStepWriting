export async function getTopics(article) {
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

    } catch (error) {

      console.error(error);
      alert(error.message);

    }
}


export async function saveAllTopics(Topics, article) {
    let unSavedTopics = Topics.map((topic) => {
      if (!topic._id) {
        return topic
      }
    })
    console.log(unSavedTopics.length)
    if (unSavedTopics.length == 0) return []
    try {

      const response = await fetch("/api/addalltopics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topics: unSavedTopics, article: article })
      });

      const data = await response.json();


      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      console.log("topic", data)
      return data.topics


    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }


  export async function deleteTopic(topic,Topics,setTopics) {
    if (!topic._id) {
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


  export async function writeTopic(topic,Topics,setTopics,settings) {

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