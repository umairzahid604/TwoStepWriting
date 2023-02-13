async function getArticles(){
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