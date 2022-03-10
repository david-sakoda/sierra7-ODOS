package com.niyam.aws.odos.movies;

import com.amazonaws.services.lambda.runtime.LambdaLogger;

import java.util.Arrays;
import java.util.Objects;

public class MovieLogger implements LambdaLogger {
    LambdaLogger logger;

    public void log(String msg) {
        if (logger != null) {
            logger.log(msg);
        } else {
            System.out.println("MovieLogger: " + msg);
        }
    }

    public void log(byte[] msg) {
        if (logger != null) {
            logger.log(msg);
        } else {
            System.out.println("MovieLogger: " + Arrays.toString(msg));
        }
    }

    public LambdaLogger getLogger() {
        return Objects.requireNonNullElseGet(logger, MovieLogger::new);
    }

    public void setLogger(LambdaLogger logger) {
        this.logger = logger;
    }
}
