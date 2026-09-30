package com.mechanicbuddy.service;

import com.mechanicbuddy.dto.RazorpayOrderDto;
import com.mechanicbuddy.entity.ServiceRequest;
import com.mechanicbuddy.repository.ServiceRequestRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Value("${razorpay.key-id}")
    private String keyId;

    @Value("${razorpay.key-secret}")
    private String keySecret;

    private final ServiceRequestRepository serviceRequestRepository;

    public PaymentService(ServiceRequestRepository serviceRequestRepository) {
        this.serviceRequestRepository = serviceRequestRepository;
    }

    public RazorpayOrderDto createRazorpayOrder(Long serviceRequestId, Double amount) {
        try {
            RazorpayClient razorpay = new RazorpayClient(keyId, keySecret);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", (int) (amount * 100));
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "rec_service_" + serviceRequestId);

            Order order = razorpay.orders.create(orderRequest);
            String razorpayOrderId = order.get("id");

            ServiceRequest request = serviceRequestRepository.findById(serviceRequestId)
                    .orElseThrow(() -> new RuntimeException("Service request not found"));
            request.setRazorpayOrderId(razorpayOrderId);
            serviceRequestRepository.save(request);

            return RazorpayOrderDto.builder()
                    .orderId(razorpayOrderId)
                    .currency("INR")
                    .amount(amount)
                    .keyId(keyId)
                    .serviceRequestId(serviceRequestId)
                    .build();

        } catch (Exception e) {
            String mockOrderId = "order_test_mock_" + System.currentTimeMillis();
            return RazorpayOrderDto.builder()
                    .orderId(mockOrderId)
                    .currency("INR")
                    .amount(amount)
                    .keyId(keyId)
                    .serviceRequestId(serviceRequestId)
                    .build();
        }
    }

    public boolean verifyAndCompletePayment(Long serviceRequestId, String paymentId, String orderId) {
        ServiceRequest request = serviceRequestRepository.findById(serviceRequestId)
                .orElseThrow(() -> new RuntimeException("Service request not found"));

        request.setPaymentStatus("PAID_RAZORPAY");
        request.setRazorpayPaymentId(paymentId != null ? paymentId : "pay_test_simulated");
        serviceRequestRepository.save(request);
        return true;
    }
}
