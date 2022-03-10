package com.niyam.aws.odos.movies;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import io.searchbox.client.JestClient;
import io.searchbox.core.Search;

public class MoviesGetAllJestClient {

    public String getAllMovies(String pageIndexFrom, String pageSize, MovieLogger movieLogger) throws Exception {
        String search;
        JsonArray returnValues = new JsonArray();
        //   search = "{\"from\":" + pageIndexFrom + ",\"size\":" + pageSize + ",\"query\": {\"fuzzy\": {\"title\": {\"value\": \"" + searchInput + "\", \"fuzziness\": 2 }}}}";
        search = "{\"from\":" + pageIndexFrom + ",\"size\":" + pageSize + ",\"query\": {\"match_all\":{}}}";
        //movieLogger.getLogger().log("search=" + search);
        //    try {
        JestClient jestClient = OdosJestClientFactory.getJestClient();
        //        JsonObject jestReturn = jestClient.execute(new Search.Builder(search).addIndex("tmdb").build()).getJsonObject();
        //    jestClient.execute(new CreateIndex.Builder("title").build());
        //   Sort sort = new Sort("title");
        //     JsonObject jestReturn = jestClient.execute(new Search.Builder(search).addIndex("tmdb").addSort(sort).build()).getJsonObject();
        JsonObject jestReturn = jestClient.execute(new Search.Builder(search).addIndex("tmdb").build()).getJsonObject();
        //movieLogger.getLogger().log("jestReturn=" + jestReturn);
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
        return returnValues.toString();
    }
}
