package com.MyMoviePal.controllers;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.MyMoviePal.entitites.Movie;
import com.MyMoviePal.services.MovieService;

@RestController
@CrossOrigin("*")
public class MovieController {
	@Autowired
	private MovieService service;

	
	@GetMapping("/showAllMovies")
	public ArrayList<Movie> showall() {
		return service.showall();
	}
	
	@PostMapping("/addMovie")
	public String SaveData(@RequestBody Movie Ref) {
		service.SaveData(Ref);
		return "movie saved";
	}
	
	@PutMapping("/updateMovie")
	public String updateMovie(@RequestBody Movie Ref) {
		service.updateMovie(Ref);
		return "updated movie";
	}
	

	
	@DeleteMapping("/deleteMovie/{id}")
	public String deleteMovie(@PathVariable Integer id) {
		service.deleteMovie(id);
		return "movie deleted";
	}
	
	/*@DeleteMapping("/deleteMovie/{movie_title}")
	public String deleteRecord(@PathVariable String movie_title) {
		service.deleteMovie(movie_title);
		return "deleted movie";*/
	}
	
	
	
