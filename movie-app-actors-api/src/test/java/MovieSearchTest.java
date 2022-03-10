import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.niyam.aws.odos.movies.MovieLogger;
import com.niyam.aws.odos.movies.MovieSearchJestClient;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class MovieSearchTest {
    @Test
    public void testSearchMovie() throws Exception{
    /*    MovieSearchJestClient searchMovieJestClient = new MovieSearchJestClient();
        //String searchInput = "warewolf";
        String searchInput = "joker";
        String pageIndexFrom = "0";
        String pageSize = "4";
        MovieLogger movieLogger = new MovieLogger();
        String searchReturn = searchMovieJestClient.searchMovie(searchInput, pageIndexFrom, pageSize, movieLogger);
        movieLogger.getLogger().log("searchReturn="+searchReturn);
        JsonArray movieArray = new Gson().fromJson(searchReturn, JsonArray.class);
        JsonObject movieObj = movieArray.get(0).getAsJsonObject();
        String url = movieObj.get("url").getAsString();
        Assertions.assertTrue(url.contains("http"));*/
    }
}

