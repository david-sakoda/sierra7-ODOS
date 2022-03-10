
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.niyam.aws.odos.movies.MovieLogger;
import com.niyam.aws.odos.movies.MoviesGetAllJestClient;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class MoviesGetAllTest {
    @Test
    public void testGetAllMovies() throws Exception {
    /*    MoviesGetAllJestClient moviesGetAllJestClient = new MoviesGetAllJestClient();
        String pageIndexFrom = "0";
        String pageSize = "4";
        MovieLogger movieLogger = new MovieLogger();
       String searchReturn = moviesGetAllJestClient.getAllMovies(pageIndexFrom, pageSize, movieLogger);
        movieLogger.getLogger().log("searchReturn=" + searchReturn);
        JsonArray movieArray = new Gson().fromJson(searchReturn, JsonArray.class);
        JsonObject movieObj = movieArray.get(0).getAsJsonObject();
        String url = movieObj.get("url").getAsString();
        Assertions.assertTrue(url.contains("http"));*/
    }
}
