FROM jboss/keycloak:15.0.2

# Copy Custom resources into the container
COPY themes /opt/jboss/keycloak/themes
COPY realms /opt/jboss/keycloak/custom/realms

EXPOSE 8080

ENTRYPOINT ["/opt/jboss/tools/docker-entrypoint.sh", "-b", "0.0.0.0"]