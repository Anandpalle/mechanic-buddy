package com.mechanicbuddy.controller;

import com.mechanicbuddy.dto.RazorpayOrderDto;
import com.mechanicbuddy.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<RazorpayOrderDto> createOrder(
            @RequestParam Long serviceRequestId,
            @RequestParam Double amount) {
        RazorpayOrderDto orderDto = paymentService.createRazorpayOrder(serviceRequestId, amount);
        return ResponseEntity.ok(orderDto);
    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, Object>> verifyPayment(
            @RequestParam Long serviceRequestId,
            @RequestParam(required = false) String paymentId,
            @RequestParam(required = false) String orderId) {
        boolean success = paymentService.verifyAndCompletePayment(serviceRequestId, paymentId, orderId);
        return ResponseEntity.ok(Map.of("status", "SUCCESS", "message", "Payment processed successfully!"));
    }
}
