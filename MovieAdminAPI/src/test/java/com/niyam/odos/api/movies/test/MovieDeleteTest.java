package com.niyam.odos.api.movies.test;

import com.niyamit.odos.api.movieadmin.db.MovieDeleteDB;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class MovieDeleteTest {
    @Test
    public void testDeleteMovie() throws Exception {
        String movieDeleteData = "{  " +
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
      //     MovieDeleteDB deleteMovieDB = new MovieDeleteDB();
       //    Assertions.assertEquals(1, deleteMovieDB.deleteMoviePG(movieDeleteData));
    }

}

