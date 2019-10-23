package com.MyMoviePal.repos;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.MyMoviePal.entitites.Movies;

@Repository
public interface MovieRepo extends JpaRepository<Movies,Integer>{
	public ArrayList<Movies> findAll();
}