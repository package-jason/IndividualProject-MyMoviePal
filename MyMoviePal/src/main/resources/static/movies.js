function showMovies(){
console.log("helloo");
const Http = new XMLHttpRequest();
//const url='http://34.89.125.196:9001/showAllMovies';
const url='http://localhost:9001/showAllMovies';
Http.open("GET", url);
Http.onreadystatechange = function(e){
//	console.log("status"+Http.readyState);
	if(Http.readyState==4){
	data=JSON.parse(Http.responseText); // Returns the body of the server's response as a string.
	data.forEach(function(item){
		var movieTable = document.getElementById("moviesTable");
		var row=document.createElement("tr");
		
		var movieTitle=document.createElement("td");
		var releaseYear=document.createElement("td");
		var plot=document.createElement("td");
		var genre=document.createElement("td");
		var cast=document.createElement("td");
		var poster_url=document.createElement("td");
		var watched=document.createElement("td");
		
		
		movieTitle.innerHTML=item.movie_title;
		releaseYear.innerHTML=item.release_year;
		plot.innerHTML=item.plot;
		genre.innerHTML=item.genre;
		cast.innerHTML=item.cast;
		poster_url.innerHTML=item.poster_url;
		watched.innerHTML=item.watched;
		
		//append child will append the data into separate rows
		row.appendChild(movieTitle);
		row.appendChild(releaseYear);
		row.appendChild(plot);		
		row.appendChild(genre);		
		row.appendChild(cast);		
		row.appendChild(poster_url);		
		row.appendChild(watched);
		
		movieTable.appendChild(row);
	});
}
}
Http.send();
}