export async function saveAllArticles(articles) {
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
      alert("3")

      alert(error.message);
    }
  }


  export async function writeIntro(writeArticle,setwriteArticle,settings) {

    try {

      const response = await fetch("/api/writeintro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ article: writeArticle, settings: settings })
      });

      const data = await response.json();


      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      // console.log(data.topics)
      // setArticles(Topics.map(item => {
      //   if (item == article) {
      //     item.intro = data.result
      //   }
      //   return item
      // }))
      setwriteArticle({ title: writeArticle.title, intro: data.result })
      console.log(data.result)


    } catch (error) {
      writeIntro(article)
      // Consider implementing your own error handling logic here
      console.error(error);
      alert("2")

      alert(error.message);
    }
  }



// not in use
  export function copyArticle(){
    console.log(completeArticle.current.innerHTML)
    navigator.clipboard.writeText(completeArticle.current.innerText)
    // windo(completeArticle.current.innerText)
  }



 export async function deleteArticle(article,writeArticle,Articles,setArticles) {
    if (!article._id) {
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
      if (writeArticle == article) {
        setMode("addarticles")
      }


    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert("1")
      alert(error.message);
    }
  }