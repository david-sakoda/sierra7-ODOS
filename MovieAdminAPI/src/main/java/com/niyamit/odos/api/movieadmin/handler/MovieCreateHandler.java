package com.niyamit.odos.api.movieadmin.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.niyamit.odos.api.movieadmin.db.MovieCreateDB;
import com.niyamit.odos.api.movieadmin.util.MovieLogger;

public class MovieCreateHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context) {
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        MovieLogger movieLogger = new MovieLogger();
        try {
            LambdaLogger lambdaLogger = context.getLogger();
            movieLogger.setLogger(lambdaLogger);
            String movieCreateData = input.getBody();
            movieLogger.getLogger().log("movieCreateData=" + movieCreateData);

            MovieCreateDB movieCreateDB = new MovieCreateDB();
            int rowCount = movieCreateDB.createMoviePG(movieCreateData);

            response.withStatusCode(200).withBody(String.valueOf(rowCount));
        } catch (Exception e) {
            movieLogger.getLogger().log("Exception in MovieCreateHandler handleRequest. " + e.getMessage());
            response.withStatusCode(500).withBody("{}");
        }

        return response;
    }
}

