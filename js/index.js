import { baseUrl } from "./components/config/api.js";

 const url = baseUrl + "articles";


(async function getArticles() {

const container = document.querySelector(".article-container");


try {
    const response = await fetch(url);
    const json = await response.json();

  
  
    

    let articlesToRender = json;

   

    function renderArticles() {

        container.innerHTML = "";

        articlesToRender.forEach(function (article) {
            container.innerHTML += `<div class="article">
                                        <h2>${article.title}</h2>   
                                        <h3>${article.summary}</h3>    
                                        <h3>${article.author}<i class="fas fa-book btn" data-id="${article.id}" data-name="${article.title}"></i></h3>
                                                    </div>`;
        });

        console.log(articlesToRender);
    }

    renderArticles();



    const search = document.querySelector(".search");
    
    search.onkeyup = function() {
       // console.log(event);

        const searchValue = event.target.value.trim().toLowerCase();

        const filteredArticles = json.filter(function(article){
            if(article.title.toLowerCase().startsWith(searchValue)) {
                return true;
            }
        })
        console.log(filteredArticles);

        articlesToRender = filteredArticles;

        renderArticles();

    };

                                          
    const listkey = "article list";
    
   const iconButton = document.querySelectorAll(".btn");

   iconButton.forEach(function (toggle){
       
        toggle.addEventListener("click", handleClick);
       
   });

   function handleClick (event) {
    
      const toggle = event.target.classList.toggle("toggleOn");

       

       if(toggle === true){
            localStorage.setItem(listkey, JSON.stringify(articlesToRender));
            console.log(toggle);
            console.log(articlesToRender);
            console.log(localStorage);
            
       }

       if(toggle === false) {
           localStorage.removeItem(listkey);
           console.log(toggle);
           console.log(articlesToRender);
           console.log(localStorage);
       }
   }




    
} catch (error) {
   console.log(error);
    
}


})();


