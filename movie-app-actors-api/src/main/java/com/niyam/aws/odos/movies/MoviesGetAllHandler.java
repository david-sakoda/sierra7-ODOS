package com.niyam.aws.odos.movies;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * This API returns all movies for the UI search screen
 */
public class MoviesGetAllHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context) {
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        MovieLogger movieLogger = new MovieLogger();
        LambdaLogger lambdaLogger = context.getLogger();
        movieLogger.setLogger(lambdaLogger);
        try {
            Map<String, String> qryParams = input.getQueryStringParameters();
            String pageIndexFrom = qryParams.get("from");   //pageIndexFrom
            String pageSize = qryParams.get("size");        //pageSize

            MoviesGetAllJestClient moviesGetAllJestClient = new MoviesGetAllJestClient();
            //call elastic search API
            String searchReturn = moviesGetAllJestClient.getAllMovies(pageIndexFrom, pageSize, movieLogger);

            response.withStatusCode(200).withBody(searchReturn);
            java.util.Map<String, String> headers = new HashMap<>();
            headers.put("Access-Control-Allow-Headers", "Content-Type");
            headers.put("Access-Control-Allow-Origin", "*");
            headers.put("Access-Control-Allow-Methods", "OPTIONS,POST,GET");
            response.withHeaders(headers);
        } catch (IOException ioe) {
            movieLogger.getLogger().log("IOException in MovieSearchHandler handleRequest.");
            response.withStatusCode(500).withBody("{}");
        } catch (Exception e) {
            movieLogger.getLogger().log("Exception in MovieSearchHandler handleRequest.");
            response.withStatusCode(500).withBody("{}");
        }
        return response;
    }
}

