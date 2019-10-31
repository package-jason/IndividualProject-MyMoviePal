package com.MyMoviePal.services;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MyMoviePal.entitites.Movie;
import com.MyMoviePal.repos.MovieRepo;

@Service
public class MovieService {
	@Autowired
	private MovieRepo repo;

	public ArrayList<Movie> showall() {
		return repo.findAll();
	}

	public void SaveData(Movie Ref) {
		repo.save(Ref);
	}

	public void updateMovie(Movie Ref) {
		repo.saveAndFlush(Ref);
	}

	public void deleteMovie(Integer id) {
		repo.deleteById(id);
	}

	/*
	 * @DeleteMapping("/deleteMovie/{movie_title}") public String
	 * deleteRecord(@PathVariable String movie_title) {
	 * service.deleteMovie(movie_title); return "deleted movie";
	 */
}
