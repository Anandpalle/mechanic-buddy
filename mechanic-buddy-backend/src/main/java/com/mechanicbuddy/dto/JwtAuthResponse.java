package com.mechanicbuddy.dto;

import com.mechanicbuddy.entity.Role;

public class JwtAuthResponse {
    private String token;
    private String tokenType = "Bearer";
    private Long userId;
    private String name;
    private String email;
    private Role role;
    private String phone;

    public JwtAuthResponse() {}

    public JwtAuthResponse(String token, String tokenType, Long userId, String name, String email, Role role, String phone) {
        this.token = token;
        if (tokenType != null) this.tokenType = tokenType;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
        this.phone = phone;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public static JwtAuthResponseBuilder builder() { return new JwtAuthResponseBuilder(); }

    public static class JwtAuthResponseBuilder {
        private String token;
        private String tokenType = "Bearer";
        private Long userId;
        private String name;
        private String email;
        private Role role;
        private String phone;

        public JwtAuthResponseBuilder token(String token) { this.token = token; return this; }
        public JwtAuthResponseBuilder tokenType(String tokenType) { this.tokenType = tokenType; return this; }
        public JwtAuthResponseBuilder userId(Long userId) { this.userId = userId; return this; }
        public JwtAuthResponseBuilder name(String name) { this.name = name; return this; }
        public JwtAuthResponseBuilder email(String email) { this.email = email; return this; }
        public JwtAuthResponseBuilder role(Role role) { this.role = role; return this; }
        public JwtAuthResponseBuilder phone(String phone) { this.phone = phone; return this; }

        public JwtAuthResponse build() {
            return new JwtAuthResponse(token, tokenType, userId, name, email, role, phone);
        }
    }
}
