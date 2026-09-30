-- Mechanic Buddy Initial Database Seeding Script

-- Seed Admin User
INSERT INTO users (id, name, email, password, role, phone)
VALUES (1, 'System Admin', 'admin@mechanicbuddy.com', '$2a$10$e8wJ.NqG/q.4rL02aA9bE.9H6A4gXw9E3U8y1g4f9v3e0W1k2Z3Y4', 'ROLE_ADMIN', '+91 9876543210');

-- Seed Mechanic Accounts
INSERT INTO users (id, name, email, password, role, phone)
VALUES (2, 'Rajesh Kumar (Apex Auto)', 'rajesh@apexauto.com', '$2a$10$e8wJ.NqG/q.4rL02aA9bE.9H6A4gXw9E3U8y1g4f9v3e0W1k2Z3Y4', 'ROLE_MECHANIC', '+91 9811223344');

INSERT INTO users (id, name, email, password, role, phone)
VALUES (3, 'Vikram Singh (Express Moto)', 'vikram@expressmoto.com', '$2a$10$e8wJ.NqG/q.4rL02aA9bE.9H6A4gXw9E3U8y1g4f9v3e0W1k2Z3Y4', 'ROLE_MECHANIC', '+91 9822334455');

INSERT INTO users (id, name, email, password, role, phone)
VALUES (4, 'Priya Sharma (EV Care)', 'priya@evmechanic.com', '$2a$10$e8wJ.NqG/q.4rL02aA9bE.9H6A4gXw9E3U8y1g4f9v3e0W1k2Z3Y4', 'ROLE_MECHANIC', '+91 9833445566');

-- Seed Mechanic Profiles
INSERT INTO mechanic_profiles (id, user_id, workshop_name, address, latitude, longitude, hourly_rate, rating, is_available, specializations)
VALUES (1, 2, 'Apex Auto Garage & Roadside Care', 'Main Ring Road, Sector 14', 12.9716, 77.5946, 499.00, 4.8, true, 'Engine Diagnostics, Brake Repair, Towing');

INSERT INTO mechanic_profiles (id, user_id, workshop_name, address, latitude, longitude, hourly_rate, rating, is_available, specializations)
VALUES (2, 3, 'Express Moto & Car Assistance', 'Outer Ring Road, Block B', 12.9850, 77.6050, 399.00, 4.6, true, 'Battery Jumpstart, Flat Tire Change, Oil Service');

INSERT INTO mechanic_profiles (id, user_id, workshop_name, address, latitude, longitude, hourly_rate, rating, is_available, specializations)
VALUES (3, 4, 'Priya EV & Premium Auto Care', 'MG Road, Tech Corridor', 12.9620, 77.5800, 699.00, 4.9, true, 'EV Battery Diagnostics, Hybrid Systems, AC Repair');
