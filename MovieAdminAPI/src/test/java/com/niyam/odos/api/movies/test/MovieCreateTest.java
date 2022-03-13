package com.niyam.odos.api.movies.test;

import com.niyamit.odos.api.movieadmin.db.MovieCreateDB;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class MovieCreateTest {
    @Test
    public void testCreateMovie() throws Exception{
        String movieCreateData = "{  " +
                "  \"dossierId\": 0,  " +
                "  \"imdbTitleId\": \"\",  " +
                "  \"name\": \"SLTestCreate\",  " +
                "  \"description\": \"\",  " +
                "  \"releaseYear\": 2009,  " +
                "  \"posterUrl\": \"\",  " +
                "  \"genres\": \"Action, Crime, Horror, Mystery, Thriller, Test1\",  " +
                "  \"plotSummary\": \"\",  " +
                "  \"rating\": 1,  " +
                "  \"directors\": [\"Dominic Sena\", \"J. Lee Thompson\"]," +
                "  \"actors\": [\"Columbus Short as [\\\"Delfy\\\"]\", \"Gabriel Macht as [\\\"Robert Pryce\\\"]\"] " +
                "}";
   //     MovieCreateDB movieCreateDB = new MovieCreateDB();
   //     Assertions.assertEquals(1, movieCreateDB.createMoviePG(movieCreateData));
    }

}