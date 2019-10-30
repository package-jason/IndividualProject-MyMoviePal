function request(){
console.log("helloo");
const Http = new XMLHttpRequest();
const url='http://34.89.125.196:9001/showAllMovies';
Http.open("GET", url);
Http.onreadystatechange = function(e){
	if(Http.readyState==4){
	data=JSON.parse(Http.responseText);
	data.forEach(function(item){
		var movieTitle=document.createElement("div");
		var releaseYear=document.createElement("div");
		var plot=document.createElement("div");
		var genre=document.createElement("div");
		var cast=document.createElement("div");
		var poster_url=document.createElement("div");
		var watched=document.createElement("div");
		
		movieTitle.innerHTML=item.movie_title;
		releaseYear.innerHTML=item.release_year;
		plot.innerHTML=item.plot;
		genre.innerHTML=item.genre;
		cast.innerHTML=item.cast;
		poster_url.innerHTML=item.poster_url;
		watched.innerHTML=item.watched;
		
		document.body.appendChild(movieTitle);
		document.body.appendChild(releaseYear);
		document.body.appendChild(plot);		
		document.body.appendChild(genre);		
		document.body.appendChild(cast);		
		document.body.appendChild(poster_url);		
		document.body.appendChild(watched);		
	});
}
}
Http.send();
}