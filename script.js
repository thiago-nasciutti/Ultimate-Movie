function search(){
    let title = document.getElementById("movieInput").value
  
    //Get url 1 to access OMDb-API 
    let url1 = "https://www.omdbapi.com/?t="+title+"&apikey=db0da826"
   
    fetch(url1)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            
            //Plot
            let title = data.Title
            document.getElementById("title").innerHTML = title

            //Plot
            let plot = data.Plot
            document.getElementById("plot").innerHTML = plot

            //Poster
            let poster = data.Poster
            document.getElementById("poster").src = poster

            //imdbID
            let imdbID = data.imdbID

            //Get url 2 to access IMDb-API
            let url2 = "https://imdb-api.com/en/API/Ratings/k_vnngt5ar/"+imdbID
                fetch(url2)
                .then(function(response){
                    return response.json()
                })
                .then(function(data){
        
                    //Rotten Tomatoes
                    let rotten= data.rottenTomatoes
                    document.getElementById("rotten").innerHTML = "Rotten Tomatoes: "+ rotten + "%"
                })
        })
           

}
