package br.com.kafka.demo.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PayloadGenerator {

    private static Logger log = LoggerFactory.getLogger(PayloadGenerator.class);

    private static final Random RANDOM = new Random();
    private static final String[] ORIGINS = {"USA", "Brazil", "Germany", "India", "China"};
    private static final String[] PLATFORMS = {"Web", "Mobile", "API", "Desktop"};
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");


    public static PayloadDTO generateRandomPayload(int incMinutes) {

        String origin = ORIGINS[RANDOM.nextInt(ORIGINS.length)];
        String platform = PLATFORMS[RANDOM.nextInt(PLATFORMS.length)];
        String unitValue = Integer.toString(RANDOM.nextInt(100)); //String.format("%.2f", RANDOM.nextInt() * 1000); // Valor entre 0.00 e 1000.00
        String receivedAt = LocalDateTime.now()
                .minusMinutes(incMinutes) 
                .format(DATE_FORMATTER);

        return new PayloadDTO(origin, platform, unitValue, receivedAt);

    }

}
