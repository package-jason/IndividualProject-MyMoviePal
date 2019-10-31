

function showMovies(){
//console.log("helloo");
const Http = new XMLHttpRequest();
// const url='http://34.89.125.196:9001/showAllMovies';
const url='http://localhost:9001/showAllMovies';
Http.open("GET", url);
Http.onreadystatechange = function(e){
// console.log("status"+Http.readyState);
	if(Http.readyState==4){
	data=JSON.parse(Http.responseText); // Returns the body of the server's
										// response as a string.
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
//		var edit=document.createElement("td");
//		var deleteMovie=document.createElement("td");
	
		
		movieTitle.innerHTML=item.movie_title;
		releaseYear.innerHTML=item.release_year;
		plot.innerHTML=item.plot;
		genre.innerHTML=item.genre;
		cast.innerHTML=item.cast;
		poster_url.innerHTML=item.poster_url;
		watched.innerHTML=item.watched;
//		var edit = document.createElement('input');
//		edit.type = 'button';
//		edit.value = "Edit";
//		edit.appendChild(edit);
//		var del = document.createElement('input');
//		del.type = 'button';
//		del.value = "Delete";
//		deleteMovie.appendChild(del);
		
		
		// append the data into separate rows
		row.appendChild(movieTitle);
		row.appendChild(releaseYear);
		row.appendChild(plot);		
		row.appendChild(genre);		
		row.appendChild(cast);		
		row.appendChild(poster_url);		
		row.appendChild(watched);
//		row.appendChild(edit);
//		row.appendChild(deleteMovie);
		
		movieTable.appendChild(row);
	});
	
	
}
	
	$('#myModal').on('shown.bs.modal', function () {
		  $('#myInput').trigger('focus')
		})
}
Http.send();
}


function addMovie(){
	const Http = new XMLHttpRequest();
	const url = 'http://localhost:9001/addMovie';
	
	Http.open("POST", url);
	Http.setRequestHeader("Content-Type", "application/json");

	const body = {
		'movie_title':document.getElementById("movieTitle").value,
		'release_year':document.getElementById("releaseYear").value,
		'plot':document.getElementById("plot").value,
		'genre':document.getElementById("genre").value,
		'cast':document.getElementById("cast").value,
		'poster_url':document.getElementById("poster_url").value,
		'watched':document.getElementById("watched").value	
	}
	
	Http.onreadystatechange = function(event){
		if(Http.readyState == 4){
			showMovies();
		}
	}
		Http.send(JSON.stringify(body));
		location.reload();
		return false;
}
/*function updateMovie(event){
    event.preventDefault();
    let body ={
        id: event.target.parentElement.parentElement.id,
        text: event.target.movieText.value

    movieRequest("PUT", body);
}*/