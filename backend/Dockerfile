FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

COPY backend/pom.xml backend/pom.xml
COPY backend/src backend/src

WORKDIR /app/backend

RUN mvn package -DskipTests

FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /app/backend/target/quarkus-app/ /app/

EXPOSE 8080

CMD ["java", "-jar", "quarkus-run.jar"]