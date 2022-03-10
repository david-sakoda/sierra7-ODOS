package com.niyam.aws.odos.movies;

import io.searchbox.client.JestClient;
import io.searchbox.client.JestClientFactory;
import io.searchbox.client.config.HttpClientConfig;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.nio.conn.SchemeIOSessionStrategy;
import org.apache.http.nio.conn.ssl.SSLIOSessionStrategy;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.ssl.TrustStrategy;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

/**
 * Uses Jest Client Factory API
 */
public class OdosJestClientFactory {
    private static JestClient jestClientObject;
    private static final String serverUri = "https://elastic:km20rMS0xcN25SxG9174i2EH@a87d134032ad54a19bfb2a495a7e9bbe-1725495744.us-east-1.elb.amazonaws.com:9200";

    /* Get a Jest client instance */
    public static JestClient getJestClient() throws Exception {
        if (jestClientObject != null) {
            return jestClientObject;
        }

        // trust ALL certificates
        SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
            public boolean isTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
                return true;
            }
        }).build();

        // skip hostname checks
        HostnameVerifier hostnameVerifier = NoopHostnameVerifier.INSTANCE;

        SSLConnectionSocketFactory sslSocketFactory = new SSLConnectionSocketFactory(sslContext, hostnameVerifier);
        SchemeIOSessionStrategy httpsIOSessionStrategy = new SSLIOSessionStrategy(sslContext, hostnameVerifier);

        JestClientFactory factory = new JestClientFactory();

        factory.setHttpClientConfig(new HttpClientConfig.Builder(serverUri)
                .defaultSchemeForDiscoveredNodes("https")       // required, otherwise uses http
                .sslSocketFactory(sslSocketFactory)             // this only affects sync calls
                .httpsIOSessionStrategy(httpsIOSessionStrategy) // this only affects async calls
                .build()
        );

        jestClientObject = factory.getObject();

        return jestClientObject;
    }
}
