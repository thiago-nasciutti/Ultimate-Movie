function search(){
    let title = document.getElementById("movieInput").value

    //Get url 1 to access OMDDb API 
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
        })


}
