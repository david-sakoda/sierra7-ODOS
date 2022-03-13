package com.niyamit.odos.api.movieadmin.db;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.niyamit.odos.api.movieadmin.util.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class MovieCreateDB {
    public int createMoviePG(String movieCreateData) throws Exception {
        Connection conn = null;
        int rowCount;
        PreparedStatement preparedStatement = null;
        try {
            JsonObject movieObj = new Gson().fromJson(movieCreateData, JsonObject.class);
            String name = movieObj.get("name").getAsString();
            String description = movieObj.get("description").getAsString();
            int releaseYear = movieObj.get("releaseYear").getAsInt();
            String genres = movieObj.get("genres").getAsString();
            String plotSummary = movieObj.get("plotSummary").getAsString();
            int rating = movieObj.get("rating").getAsInt();
            String directors = movieObj.get("directors").getAsJsonArray().get(0).getAsString();
            String actors = movieObj.get("actors").getAsJsonArray().get(0).getAsString();

            String SQL_INSERT = "insert into dossiers(imdb_title_id, name, description, release_year, genres, plot_summary, " +
                    "rating, directors, actors, modified_mode, modified_date) "
                    + " values( (select concat(max(dossier_id)+1,'i') from dossiers), "
                    + " '" + name + "',"
                    + " '" + description + "',"
                    + " " + releaseYear + ","
                    + " '" + genres + "',"
                    + " '" + plotSummary + "',"
                    + " " + rating + ","
                    + " '" + directors + "',"
                    + " '" + actors  + "',"
                    + " 'I',"
                    + " NOW())";
            conn = DBUtil.createConnection();
            preparedStatement = conn.prepareStatement(SQL_INSERT);
            rowCount = preparedStatement.executeUpdate();
            return rowCount;
        } finally {
            DBUtil.closeConnection(conn, preparedStatement);
        }
    }
}

