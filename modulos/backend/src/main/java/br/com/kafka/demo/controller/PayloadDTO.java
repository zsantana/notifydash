package br.com.kafka.demo.controller;

public record PayloadDTO(String origin, String platform, String unitValue, String receivedAt) {}
