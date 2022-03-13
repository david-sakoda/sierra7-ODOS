package com.niyamit.odos.api.movieadmin.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Properties;

public class DBUtil {
    private static Connection conn;

    public static Connection createConnection() {
        try {
            if (conn == null) {
                String url = "jdbc:postgresql://localhost/odosmoviedbdev";
                //  String url = "jdbc:postgresql://odosmoviedbdev.ceer5egq7vs2.us-east-1.rds.amazonaws.com/odosmoviedbdev";
                Properties props = new Properties();
                props.setProperty("user", "odos_user");
                props.setProperty("password", "odos_password_123!");
                //  props.setProperty("ssl","true");

                conn = DriverManager.getConnection(url, props);
            }

        } catch (SQLException e) {
            throw new RuntimeException("Not able to connect to database", e);
        }

        // String url = "jdbc:postgresql://localhost/test?user=fred&password=secret&ssl=true";
        // Connection conn = DriverManager.getConnection(url);
        return conn;
    }

    public static void closeConnection(Connection conn, PreparedStatement preparedStatement) {
        try {
            if (preparedStatement != null) {
                preparedStatement.close();
            }
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException e) {
          //do nothing
        }
    }
}
