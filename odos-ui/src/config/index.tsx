const local = {
    api: {
      URL: "/api/v1" //URL Rewrite will take care of this
    },
    keycloak:{
        URL: "http://localhost:8080/auth"
    }
  };
  
  const dev = {
    api: {
      URL: "http://a5bfebcf4b07b4d7cb1872bd241a5279-1779508900.us-east-1.elb.amazonaws.com:8000/api/v1/"
    },
    keycloak:{
        URL: "http://ab8c95a9dbf8847fe91b4f6a06434dab-180042736.us-east-1.elb.amazonaws.com:8080/auth/"
    }
  };
  
  const variables = process.env.REACT_APP_STAGE === "development" ? dev : local;
  
  export const config = {
    // Add common config values here
    ...variables
  };
   