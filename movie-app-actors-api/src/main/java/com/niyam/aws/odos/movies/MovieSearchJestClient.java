package com.niyam.aws.odos.movies;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import io.searchbox.client.JestClient;
import io.searchbox.core.Search;

public class MovieSearchJestClient {
    public String searchMovie(String searchInput, String pageIndexFrom, String pageSize,  MovieLogger movieLogger) throws Exception {
        JsonArray returnValues = new JsonArray();
        //    String search = "{\"from\":" + pageIndexFrom + ",\"size\":" + pageSize + ",\"query\": {\"fuzzy\": {\"title\": {\"value\": \"" + searchInput + "\", \"fuzziness\": 2 }}}}";
        //    String search = "{\"from\":" + pageIndexFrom + ",\"size\":" + pageSize + ",\"query\": {\"multi_match\": {\"query\": \"" + searchInput + "\", \"fields\": [\"title\", \"cast\", \"overview\"]}}}";
        String search = "{\"from\":" + pageIndexFrom + ",\"size\":" + pageSize + ",\"query\": {\"multi_match\": {\"query\": \"" + searchInput + "\", \"fields\": [\"title\", \"cast\", \"overview\"], \"fuzziness\": 2}}}";
        movieLogger.getLogger().log("search=" + search);
        try {
            JestClient jestClient = OdosJestClientFactory.getJestClient();
            JsonObject jestReturn = jestClient.execute(new Search.Builder(search).addIndex("tmdb").build()).getJsonObject();
            // movieLogger.getLogger().log("jestReturn="+jestReturn);
            JsonObject hits = jestReturn.getAsJsonObject("hits");
            JsonArray searchResults = hits.getAsJsonArray("hits");
            searchResults.forEach(searchResult -> {
                JsonObject searchSource = searchResult.getAsJsonObject().getAsJsonObject("_source");
                JsonObject returnValue = new JsonObject();
                if (searchSource.get("id") != null) {
                    returnValue.addProperty("id", searchSource.get("id").getAsString());
                    returnValue.addProperty("name", searchSource.get("title").getAsString());
                    returnValue.addProperty("description", searchSource.get("overview").getAsString());
                    returnValue.addProperty("url", searchSource.get("poster_path").getAsString());
                    movieLogger.getLogger().log(returnValues.size() + " Movie id %s " + searchSource.get("id").getAsString() + " %s " + searchSource.get("title").getAsString());
                    returnValues.add(returnValue);
                }
            });

        } catch (Exception e) {
            movieLogger.getLogger().log("Exception in MovieSearchJestClient jestClient.execute ");
            throw new Exception(e);
        }
        return returnValues.toString();
    }
}
