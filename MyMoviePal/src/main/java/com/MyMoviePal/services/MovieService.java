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
		Ref.setWatched(false);
		repo.save(Ref);
	}
	

	public void updateMovie(Movie Ref) {
		Movie foundMovie = repo.getOne(Ref.getId());
		foundMovie.setMovie_title(Ref.getMovie_title());
		foundMovie.setPlot(Ref.getPlot());
		foundMovie.setGenre(Ref.getGenre());
		foundMovie.setRelease_year(Ref.getRelease_year());
		foundMovie.setCast(Ref.getCast());
		foundMovie.setPoster_url(Ref.getPoster_url());
		repo.flush();
	}
	
	

	public void deleteMovie( Integer id) {
		repo.deleteById(id);
	}
	
	/*@DeleteMapping("/deleteMovie/{movie_title}")
	public String deleteRecord(@PathVariable String movie_title) {
		service.deleteMovie(movie_title);
		return "deleted movie";*/
	}
	
	
	
