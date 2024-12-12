FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim

COPY --from=build /app/target/*.jar /app/app.jar

CMD ["java", "-Xms512m", "-Xmx7g", "-XX:+UseG1GC", "-XX:MaxGCPauseMillis=200", "-XX:+HeapDumpOnOutOfMemoryError", "-XX:+UseStringDeduplication", "-XX:+UnlockExperimentalVMOptions", "-XX:G1HeapRegionSize=16m", "-XX:InitiatingHeapOccupancyPercent=45", "-XX:ConcGCThreads=2", "-XX:ParallelGCThreads=4", "-XX:+DisableExplicitGC", "-jar", "/app/app.jar"]

