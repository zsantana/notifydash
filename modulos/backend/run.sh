#!/bin/bash

mvn clean package

# Script para iniciar múltiplas instâncias da aplicação Java

# Configurações comuns de JVM
JVM_OPTS="
-Xms512M 
-Xmx1024M 
-Xss256k
-XX:ActiveProcessorCount=4
-XX:+UseG1GC 
-XX:+UseContainerSupport 
-XX:+ExitOnOutOfMemoryError 
-XX:+UseStringDeduplication 
-XX:+UseCompressedOops 
-XX:+UseCompressedClassPointers 
-XX:MaxHeapFreeRatio=20 
-XX:MinHeapFreeRatio=10"

# Caminho para o JAR
JAR_PATH="target/demo-0.0.1-SNAPSHOT.jar"

java -Dserver.port=9010 $JVM_OPTS -jar $JAR_PATH &
echo "Aplicação iniciada na porta 9010"

java -Dserver.port=9011 $JVM_OPTS -jar $JAR_PATH &
echo "Aplicação duplicada iniciada na porta 9011"

java -Dserver.port=9012 $JVM_OPTS -jar $JAR_PATH &
echo "Aplicação iniciada na porta 9012"

# Aguardar alguns segundos para garantir inicialização
sleep 2

# Verificar processos em execução
ps -ef | grep "$JAR_PATH"
