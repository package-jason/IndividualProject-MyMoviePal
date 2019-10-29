package com.MyMoviePal.controllers;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.MyMoviePal.entitites.Movie;
import com.MyMoviePal.repos.MovieRepo;

@RestController
public class MovieController {
	@Autowired
	private MovieRepo repo;

	@CrossOrigin
	@GetMapping("/showAllMovies")
	public ArrayList<Movie> showall() {
		return repo.findAll();
	}
	
	@PostMapping("/addMovie")
	public String SaveData(@RequestBody Movie Ref) {
		repo.save(Ref);
		return "movie saved";
	}
	
	@DeleteMapping("/deleteMovie/{id}")
	public String deleteMovie(@PathVariable Integer id) {
		repo.deleteById(id);
		return "movie deleted";
	}
	
	/*@DeleteMapping("/deleteMovie/{movie_title}")
	public String deleteRecord(@PathVariable String movie_title) {
		service.deleteMovie(movie_title);
		return "deleted movie";*/
	}
	
	
	
