FROM jboss/keycloak:15.1.0

# Copy Custom resources into the container
COPY themes /opt/jboss/keycloak/themes
COPY realms /opt/jboss/keycloak/custom/realms
COPY ./custom-registration-profile/target/spi-registration-profile-0.0.1-SNAPSHOT.jar /opt/jboss/keycloak/standalone/deployments/spi-registration-profile-0.0.1-SNAPSHOT.jar
EXPOSE 8080

ENTRYPOINT ["/opt/jboss/tools/docker-entrypoint.sh", "-b", "0.0.0.0"]