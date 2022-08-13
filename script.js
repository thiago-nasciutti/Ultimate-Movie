function search(){
    let title = document.getElementById("title").value

    //Get url 1 to access OMDDb API 
    let url1 = "https://www.omdbapi.com/?t="+title+"&apikey=db0da826"
    fetch(url1)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            //Plot
            let plot = data.Plot
            document.getElementById("plot").innerHTML = plot
            let poster = data.Poster

            //Poster
            document.getElementById("poster").src = poster
        })


}
