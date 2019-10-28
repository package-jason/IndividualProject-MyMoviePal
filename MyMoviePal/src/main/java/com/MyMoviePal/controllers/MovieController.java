package com.MyMoviePal.controllers;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.MyMoviePal.entitites.Movies;
import com.MyMoviePal.repos.MovieRepo;

@RestController
public class MovieController {
	@Autowired
	private MovieRepo repo;

	@CrossOrigin
	@GetMapping("/showAll")
	public ArrayList<Movies> showall() {
		return repo.findAll();
	}
	
	@PostMapping("/addMovie")
	public String SaveData(@RequestBody Movies Ref) {
		repo.save(Ref);
		return "saved";
	}
	
	
	
}