package com.MyMoviePal.repos;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.MyMoviePal.entitites.Movie;

@Repository
public interface MovieRepo extends JpaRepository<Movie,Integer>{
	public ArrayList<Movie> findAll();

}