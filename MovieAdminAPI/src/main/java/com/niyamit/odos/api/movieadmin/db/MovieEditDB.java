package com.niyamit.odos.api.movieadmin.db;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.niyamit.odos.api.movieadmin.util.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class MovieEditDB {
    public int updateMoviePG(String movieEditData) throws Exception {
        Connection conn = null;
        int rowCount;
        int dossierUpdCount;
        PreparedStatement preparedStatement = null;
        try {
            JsonObject movieObj = new Gson().fromJson(movieEditData, JsonObject.class);
            long dossierId = movieObj.get("dossierId").getAsLong();
            String imdbTitleId = movieObj.get("imdbTitleId").getAsString();
            String name = movieObj.get("name").getAsString();
            String description = movieObj.get("description").getAsString();
            int releaseYear = movieObj.get("releaseYear").getAsInt();
            String genres = movieObj.get("genres").getAsString();
            String plotSummary = movieObj.get("plotSummary").getAsString();
            int rating = movieObj.get("rating").getAsInt();
            JsonArray directorArr = movieObj.get("directors").getAsJsonArray();
            String directors = directorArr.get(0).getAsString();
            String actors = movieObj.get("actors").getAsJsonArray().get(0).getAsString();

            String SQL_UPDATE_DOSSIER = "update dossiers set "
                    + " name  = '" + name + "',"
                    + " description = '" + description + "',"
                    + " release_year  = " + releaseYear + ","
                    + " genres  = '" + genres + "',"
                    + " plot_summary  = '" + plotSummary + "',"
                    + " rating  = " + rating + ","
                    + " directors  = '" + directors + "',"
                    + " actors  = '" + actors + "',"
                    + " modified_mode  = 'U',"
                    + " modified_date  = NOW() "
                    + " where dossier_id = " + dossierId
                    + " and imdb_title_id = '" + imdbTitleId + "'";

            conn = DBUtil.createConnection();
            preparedStatement = conn.prepareStatement(SQL_UPDATE_DOSSIER);
            dossierUpdCount = preparedStatement.executeUpdate();
            rowCount = dossierUpdCount;
            return rowCount;
        } finally {
            DBUtil.closeConnection(conn, preparedStatement);
        }
    }

}

