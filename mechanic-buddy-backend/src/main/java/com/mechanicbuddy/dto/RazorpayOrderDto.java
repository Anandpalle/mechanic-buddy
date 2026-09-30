package com.mechanicbuddy.dto;

public class RazorpayOrderDto {
    private String orderId;
    private String currency;
    private Double amount;
    private String keyId;
    private Long serviceRequestId;

    public RazorpayOrderDto() {}

    public RazorpayOrderDto(String orderId, String currency, Double amount, String keyId, Long serviceRequestId) {
        this.orderId = orderId;
        this.currency = currency;
        this.amount = amount;
        this.keyId = keyId;
        this.serviceRequestId = serviceRequestId;
    }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getKeyId() { return keyId; }
    public void setKeyId(String keyId) { this.keyId = keyId; }

    public Long getServiceRequestId() { return serviceRequestId; }
    public void setServiceRequestId(Long serviceRequestId) { this.serviceRequestId = serviceRequestId; }

    public static RazorpayOrderDtoBuilder builder() { return new RazorpayOrderDtoBuilder(); }

    public static class RazorpayOrderDtoBuilder {
        private String orderId;
        private String currency;
        private Double amount;
        private String keyId;
        private Long serviceRequestId;

        public RazorpayOrderDtoBuilder orderId(String orderId) { this.orderId = orderId; return this; }
        public RazorpayOrderDtoBuilder currency(String currency) { this.currency = currency; return this; }
        public RazorpayOrderDtoBuilder amount(Double amount) { this.amount = amount; return this; }
        public RazorpayOrderDtoBuilder keyId(String keyId) { this.keyId = keyId; return this; }
        public RazorpayOrderDtoBuilder serviceRequestId(Long serviceRequestId) { this.serviceRequestId = serviceRequestId; return this; }

        public RazorpayOrderDto build() {
            return new RazorpayOrderDto(orderId, currency, amount, keyId, serviceRequestId);
        }
    }
}
