package com.niyamit.odos.api.movieadmin.db;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.niyamit.odos.api.movieadmin.util.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class MovieDeleteDB {
    public int deleteMoviePG(String movieDeleteData) throws Exception {
        Connection conn = null;
        int rowCount;
        int dossierUpdCount;
        PreparedStatement preparedStatement = null;
        try {
            JsonObject movieObj = new Gson().fromJson(movieDeleteData, JsonObject.class);
            long dossierId = movieObj.get("dossierId").getAsLong();
            String imdbTitleId = movieObj.get("imdbTitleId").getAsString();

            String SQL_UPDATE_DOSSIER = "delete from dossiers "
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

