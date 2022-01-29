# ODOS Tech Challenge Keycloak 

# Running Locally
*NOTE:* If you have WSL configured, make sure to run these from within the WSL environment.
`docker build -t odos/keycloak .`

If you are making updates to the login template, then make sure to use the following instead:
`docker build -t odos/keycloa --no-cache .`

Replace the <<image_id>> below with the result from the previous build step.
`docker run -d --name odos-keycloak -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -e KEYCLOAK_IMPORT=/opt/jboss/keycloak/custom/realms/local.json odos/keycloak:latest`