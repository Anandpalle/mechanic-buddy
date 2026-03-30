package model;

import java.time.LocalDateTime;
import java.util.Map;

public class Order {
    public int id;
    public Map<Product, Integer> items;
    public double total;
    public OrderStatus status;
    public LocalDateTime time;

    public Order(int id, Map<Product, Integer> items, double total) {
        this.id = id;
        this.items = items;
        this.total = total;
        this.status = OrderStatus.CREATED;
        this.time = LocalDateTime.now();
    }
}