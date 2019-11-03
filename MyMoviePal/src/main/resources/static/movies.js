/**
 * This function will get all the movies and push to render.
 */
function showMovies() {
	// console.log("helloo");
	const Http = new XMLHttpRequest();
	// const url='http://34.89.125.196:9001/showAllMovies';
	const url = 'http://' + location.hostname + ':9001/showAllMovies';
	Http.open("GET", url);
	Http.onload = function (e) {
		// console.log("status"+Http.readyState);
		data = JSON.parse(Http.responseText); // Returns the body of the server's
		console.log(data);
		render(data);
	};
	Http.send();
}

/**
 * create the UI elements according to the given data set.
 * @param data movie array
 */
function render(data) {

	let container = document.getElementById("card-holder");
	container.innerHTML = ""; // clear the current content.

	for (let cardInfo of data) {
		function generateTags() {
			let outputString = '';
			let genres = cardInfo.genre.split(",");
			for (let genre of genres) {
				outputString += '<p class="m-1 genre badge badge-dark">' + genre + '</p>'
			}
			return outputString;
		}

		let contentTempalte = `
			<div class="card">
			  <div class="row" style="padding: 10px 10px 10px 0;">
                <div class="col-sm-4">
                  <img class="card-img-left w-100" src="${cardInfo.poster_url}" style="margin-top: 10%;margin-left: 10%;">
                </div>
                <div class="col-sm-8">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title">${cardInfo.movie_title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${cardInfo.release_year}</h6>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <p>${cardInfo.plot}</p>
                    </div>
                  </div>
    
                  <div class="dropdown-divider"></div>
                  <div class="row">
                    <div class="col">
                      ${generateTags()}
                    </div>
                  </div>
    
                  <div class="row">
                    <div class="col">
                      <p class="cast">${cardInfo.cast}</p>
                    </div>
                  </div>
                  <div class="row" id="action-${cardInfo.id}">
                </div>
            </div>
		</div>`;

		// create main row for a card.
		let mainRow = document.createElement('div');
		mainRow.setAttribute('style', 'margin-bottom: 10px');
		mainRow.className = 'col-sm-6';
		mainRow.innerHTML = contentTempalte;

		container.appendChild(mainRow);

		// create action buttons and toggle.
		let actionDiv = document.getElementById('action-' + cardInfo.id);

		let column1 = document.createElement('div');
		column1.className = 'col-sm-8';

		let watchedToggle = document.createElement('input');
		watchedToggle.setAttribute('id', 'watch-toggle-' + cardInfo.id);
		watchedToggle.setAttribute('type', 'checkbox');
		if (cardInfo.watched) {
			watchedToggle.setAttribute('checked', true);
		}
		watchedToggle.addEventListener('click', function () {
			editWatchStatus(cardInfo);
		});
		let watchedLabel = document.createElement('label');
		let textLabel = document.createElement('label');
		textLabel.innerText = 'Watched:';
		watchedLabel.innerHTML = '<i>    </i>';
		textLabel.setAttribute('style', 'padding-right: 4%');

		watchedLabel.setAttribute('for', 'watch-toggle-' + cardInfo.id);
		watchedLabel.setAttribute('data-text-true', 'Yes');
		watchedLabel.setAttribute('data-text-false', 'No');

		document.createElement('div');
		column1.appendChild(textLabel);
		column1.appendChild(watchedToggle);
		column1.appendChild(watchedLabel);

		actionDiv.appendChild(column1); // add toggle finish

		let buttonsDiv = document.createElement('div');
		buttonsDiv.className = 'row';

		// edit button
		let editButton = document.createElement("button");
	//	editButton.innerHTML = '<i class="fas fa-edit"></i>';
	//	editButton.className = "btn btn-secondary";
		editButton.innerHTML = '<img src="edit.png" />';

		editButton.addEventListener("click", function () {
			openEditModal(cardInfo);
		});

		buttonsDiv.appendChild(editButton);

		// delete button
		let removeButton = document.createElement("button");
	//	removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
		removeButton.innerHTML = '<img src="delete.png" />';
	//	removeButton.className = "btn btn-danger";
		removeButton.setAttribute('style', 'margin-left: 5px');
		removeButton.addEventListener("click", function () {
			deleteMovieById(cardInfo.id);
		});

		buttonsDiv.appendChild(removeButton);
		actionDiv.appendChild(buttonsDiv);
	}
}

function addMovie(form) {
	let body = {};
	let errorArea = document.getElementById('add-form-errors');

	for (let input of form) {
		if (input.name) {
			body[input.name] = input.value;
		}
	}

	// validate the inputs.
	const validationErrors = dataValidator(body);
	if(validationErrors) {
		console.log(validationErrors);
		errorArea.innerHTML = `<div class="alert alert-danger" role="alert">
              ${validationErrors}
            </div>`;
		return false;
	} else {
		errorArea.innerText = '';
	}

	for (let input of form) {
		if (input.name) {
			input.value = "";
		}
	}

	const Http = new XMLHttpRequest();
	const url = 'http://' + location.hostname + ':9001/addMovie';

	Http.open("POST", url);
	Http.setRequestHeader("Content-Type", "application/json");

	Http.onload = function (event) {
		showMovies();
	};
	Http.send(JSON.stringify(body));

	$('#addMovieModal').modal('hide');
	return false;
}

function deleteMovieById(id) {
	
	if(confirm('Are you sure you want to delete this movie ?') ) {

		const Http = new XMLHttpRequest();
		const url = 'http://' + location.hostname + ':9001/deleteMovie/' + id;

		Http.open("DELETE", url);

		Http.onload = function (event) {
			showMovies();
		};
		
		Http.send();
	}
}

let selectedMovie;

function openEditModal(cardInfo) {
	selectedMovie = cardInfo;
	for (let key in cardInfo) {
		if (key !== "watched" && key !== "id") {
			document.getElementById('edit-' + key).value = cardInfo[key];
		}
	}

	$('#editModal').modal('show');

}

function editMovie(form) {
	let body = {};
	let errorArea = document.getElementById('edit-form-errors');

	for (let input of form) {
		if (input.name) {
			body[input.name] = input.value;
		}
	}

	// validate inputs
	const validationErrors = dataValidator(body);
	if(validationErrors) {
		console.log(validationErrors);
		errorArea.innerHTML = `<div class="alert alert-danger" role="alert">
              ${validationErrors}
            </div>`;
		return false;
	} else {
		errorArea.innerText = '';
	}

	body.id = selectedMovie.id;
	body.watched = selectedMovie.watched;

	const Http = new XMLHttpRequest();
	const url = 'http://' + location.hostname + ':9001/updateMovie';

	Http.open("PUT", url);
	Http.setRequestHeader("Content-Type", "application/json");

	Http.onload = function (event) {
		showMovies();
	};
	Http.send(JSON.stringify(body));

	$('#editModal').modal('hide');
	return false;
}

function editWatchStatus(cardInfo) {
	let body = {
		movie_title: cardInfo.movie_title,
		release_year: cardInfo.release_year,
		plot: cardInfo.plot,
		genre: cardInfo.genre,
		cast: cardInfo.cast,
		poster_url: cardInfo.poster_url,
		id: cardInfo.id,
		watched: !cardInfo.watched,
	};
	const Http = new XMLHttpRequest();
	const url = 'http://' + location.hostname + ':9001/updateMovie';

	Http.open("PUT", url);
	Http.setRequestHeader("Content-Type", "application/json");

	Http.send(JSON.stringify(body));
}


/**
 * validator function
 * this will validate the the fields when adding and editing.
 * @param data
 * @returns {string|boolean}
 */
function dataValidator(data) {
	if(data.movie_title === '' || data.release_year === '' || data.plot === '' || data.genre === '' || data.cast === '' || data.poster_url === '') {
		return 'Please complete each field';
	}
	if(data.movie_title.length > 30) {
		return 'Movie title cannot be larger than 30 chars';
	} else if (data.plot.length > 130) {
		return 'Movie plot cannot be larger than 130 chars';
	} else if (data.genre && data.genre.split(',').length > 6) {
		return 'Maximum genres reached (6)';
	} else if (data.cast && data.cast.split(',').length > 3) {
		return 'Maximum cast members reached (3)';
	}
	return false;
}
