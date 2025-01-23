package br.com.kafka.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.kafka.demo.websocket.WebSocketHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/v1/notificacao")
public class WebPageController {

   @Autowired
   WebSocketHandler webSocketHandler;

   @PostMapping("v1")
   public String execute(@RequestBody PayloadDTO dto) {

        for (int i = 0; i < 10; i++) {

            var payload = PayloadGenerator.generateRandomPayload(i);

            try {
                var message = new ObjectMapper().writeValueAsString(payload);
                webSocketHandler.sendMessage(message);
            } catch (JsonProcessingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        
        return "Send Message";
   }

   @PostMapping("v2")
   public String execute2(@RequestBody PayloadDTO dto) {

        try {
            var message = new ObjectMapper().writeValueAsString(dto);
            webSocketHandler.sendMessage(message);
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        return "Send Message";
   }
   

}
