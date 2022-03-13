package com.niyamit.odos.api.movieadmin.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.niyamit.odos.api.movieadmin.db.MovieDeleteDB;
import com.niyamit.odos.api.movieadmin.util.MovieLogger;

public class MovieDeleteHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context) {
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        MovieLogger movieLogger = new MovieLogger();
        try {
            LambdaLogger lambdaLogger = context.getLogger();
            movieLogger.setLogger(lambdaLogger);
            String movieDeleteData = input.getBody();
            movieLogger.getLogger().log("movieDeleteData=" + movieDeleteData);

            MovieDeleteDB deleteMovieDB = new MovieDeleteDB();
            int rowCount = deleteMovieDB.deleteMoviePG(movieDeleteData);

            response.withStatusCode(200).withBody(String.valueOf(rowCount));
        } catch (Exception e) {
            movieLogger.getLogger().log("Exception in MovieDeleteHandler handleRequest. " + e.getMessage());
            response.withStatusCode(500).withBody("{}");
        }

        return response;
    }
}

