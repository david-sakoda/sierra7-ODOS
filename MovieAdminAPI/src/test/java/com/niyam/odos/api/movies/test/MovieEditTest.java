package com.niyam.odos.api.movies.test;

import com.niyamit.odos.api.movieadmin.db.MovieEditDB;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class MovieEditTest {
    @Test
    public void testEditMovie() throws Exception{
        String movieEditData = "{  " +
                "  \"dossierId\": 114056,  " +
                "  \"imdbTitleId\": \"114024i\",  " +
                "  \"name\": \"SLTestCreate\",  " +
                "  \"description\": \"\",  " +
                "  \"releaseYear\": 2009,  " +
                "  \"posterUrl\": \"\",  " +
                "  \"genres\": \"Action, Crime, Horror, Mystery, Thriller, Test2\",  " +
                "  \"plotSummary\": \"\",  " +
                "  \"rating\": 1,  " +
                "  \"directors\": [\"Dominic Sena\", \"J. Lee Thompson\"]," +
                "  \"actors\": [\"Columbus Short as [\\\"Delfy\\\"]\", \"Gabriel Macht as [\\\"Robert Pryce\\\"]\"] " +
                "}";
     //   MovieEditDB editMovieDB = new MovieEditDB();
     //   Assertions.assertEquals(1, editMovieDB.updateMoviePG(movieEditData));
    }

}

