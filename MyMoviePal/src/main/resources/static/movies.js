
function showMovies() {
	// console.log("helloo");
	const Http = new XMLHttpRequest();
	// const url='http://34.89.125.196:9001/showAllMovies';
	const url = 'http://'+location.hostname+':9001/showAllMovies';
	Http.open("GET", url);
	Http.onload = function(e) {
		// console.log("status"+Http.readyState);
			data = JSON.parse(Http.responseText); // Returns the body of the server's
			console.log(data)
			render(data);
		}
	Http.send();
}

function render(data) {

	let container = document.getElementById("card-holder");
	container.innerHTML="";

	for (let cardInfo of data) {
		let card = document.createElement("div");
		card.className = "card col-sm-10 col-md-5 col-lg-3 m-3";
		
		let cardContainer = document.createElement("div");
		cardContainer.className = "container";

		// POSTER ROW
		let posterRow = document.createElement("div");
		posterRow.className="row";

		let posterColumn = document.createElement("div");
		posterColumn.className = "col";

		let image = document.createElement("img");
		image.className = "card-img-left w-100";
		
		
		image.setAttribute("src", cardInfo.poster_url);

		posterColumn.appendChild(image);

		posterRow.appendChild(posterColumn);

		// TITLE ROW
		let titleRow = document.createElement("div");
		titleRow.className = "row";
		
		let titleColumn = document.createElement("div");
		titleColumn.className = "col";

		let heading = document.createElement("h4");
		heading.innerText = cardInfo.movie_title +" (" + cardInfo.release_year + ")";

		titleColumn.appendChild(heading);
		titleRow.appendChild(titleColumn);

		// CAST ROW
		
		let castRow = document.createElement("div");
		castRow.className = "row";

		let castCol = document.createElement("div");
		castCol.className = "col";

		let castPara = document.createElement("p");
		castPara.className = "cast";
		castPara.innerText = cardInfo.cast;

		castCol.appendChild(castPara);
		castRow.appendChild(castCol);

		

		// GENRES ROW
		

		let genresRow = document.createElement("div");
		genresRow.className = "row";
		let genresColumn = document.createElement("div");
		genresColumn.className="col";

		// let genresPara = document.createElement("p");
		// genresPara.className = "cast";
		// genresPara.innerText = cardInfo.genre;

		// genresColumn.appendChild(genresPara);
		// genresRow.appendChild(genresColumn);
	

	
		let genres = cardInfo.genre.split(",");
		for (let genre of genres) {
			let para = document.createElement("p");
			para.className = "m-1 genre badge badge-dark";
			para.innerText=genre;
			genresColumn.appendChild(para);
		}
		genresRow.appendChild(genresColumn);

		// PLOT ROW

		let plotRow = document.createElement("div");
		plotRow.className = "row";
		let plotCol = document.createElement("div");
		plotCol.className = "col";

		let plotPara = document.createElement("p");
		plotPara.innerText= cardInfo.plot;

		plotCol.appendChild(plotPara);
		plotRow.appendChild(plotCol);

		
		// EDIT ROW AND BUTTON


		let buttonRow = document.createElement("div");
		buttonRow.className ="row"
		// buttonRow.style.position = "relative";
		// buttonRow.style.top = "41px"

		
		let editColumn = document.createElement("div");
		editColumn.className ="col-6";
		let editButton = document.createElement("button");
		editButton.innerText = "EDIT"
		editButton.className = "btn btn-secondary w-100"
		editColumn.addEventListener("click", function() {
			openEditModal(cardInfo);
		})
		editColumn.appendChild(editButton);
		buttonRow.appendChild(editColumn);


		

	//	<input id="toggle-one" checked type="checkbox">

		// DELETE ROW AND BUTTON


		let deleteColumn = document.createElement("div");
		deleteColumn.className = "col-6";
		let deleteButton = document.createElement("button");
		deleteButton.innerText = "DELETE"
		deleteButton.className = "btn btn-danger w-100";
		deleteButton.addEventListener("click", function() {
			deleteMovieById(cardInfo.id);
		})
		deleteColumn.appendChild(deleteButton);
		buttonRow.appendChild(deleteColumn);
		
		cardContainer.appendChild(posterRow);
		cardContainer.appendChild(titleRow);
		cardContainer.appendChild(genresRow);
		cardContainer.appendChild(plotRow);
		cardContainer.appendChild(castRow);
		cardContainer.appendChild(buttonRow);

		card.appendChild(cardContainer);

		container.appendChild(card);

	}
}

function addMovie(form) {
	let body = {};
	for(let input of form) {
		if(input.name) {
			body[input.name] = input.value;
			input.value = "";
		}
	}


	const Http = new XMLHttpRequest();
	const url = 'http://'+location.hostname+':9001/addMovie';

	Http.open("POST", url);
	Http.setRequestHeader("Content-Type", "application/json");

	Http.onload = function(event) {
		showMovies();
	}
	Http.send(JSON.stringify(body));

	$('#addMovieModal').modal('hide');
	return false;
}

function deleteMovieById(id){
	const Http = new XMLHttpRequest();
	const url = 'http://'+location.hostname+':9001/deleteMovie/'+id;

	Http.open("DELETE", url);
	
	Http.onload = function(event) {
		showMovies();
	}
	
	Http.send();
}

let selectedId;

function openEditModal(cardInfo) {
	selectedId = cardInfo.id;
	for(let key in cardInfo){
		if (key != "watched" && key != "id") {
			document.getElementById(key).value = cardInfo[key];
		}
	}

	$('#editModal').modal('show');
	
}

function editMovie(form) {
	let body = {};
	for(let input of form) {
		if(input.name) {
			body[input.name] = input.value;
			input.value = "";
		}
	}
	body.id = selectedId;

	const Http = new XMLHttpRequest();
	const url = 'http://'+location.hostname+':9001/updateMovie';

	Http.open("PUT", url);
	Http.setRequestHeader("Content-Type", "application/json");

	Http.onload = function(event) {
		showMovies();
	}
	Http.send(JSON.stringify(body));

	$('#editModal').modal('hide');
	return false;
}
