package service;

import model.*;
import java.util.*;

public class OrderService {

    public Map<Integer, Order> orders = new HashMap<>();
    int orderId = 1;

    public Order placeOrder(Map<Product, Integer> cart) {

        if (cart.isEmpty()) {
            System.out.println("Cart empty!");
            return null;
        }

        double total = calculateTotal(cart);

        // Lock stock
        for (Product p : cart.keySet()) {
            int qty = cart.get(p);
            if (p.stock < qty) {
                System.out.println("Stock issue!");
                return null;
            }
            p.stock -= qty;
        }

        Order order = new Order(orderId, new HashMap<>(cart), total);
        order.status = OrderStatus.PENDING_PAYMENT;

        orders.put(orderId, order);
        orderId++;

        return order;
    }

    public double calculateTotal(Map<Product, Integer> cart) {
        double total = 0;
        int qtySum = 0;

        for (Product p : cart.keySet()) {
            int qty = cart.get(p);
            total += p.price * qty;
            qtySum += qty;
        }

        if (total > 1000) total *= 0.9;
        if (qtySum > 3) total *= 0.95;

        return total;
    }

    public void viewOrders() {
        for (Order o : orders.values()) {
            System.out.println("Order " + o.id + " ₹" + o.total + " " + o.status);
        }
    }

    public Order getOrder(int id) {
        return orders.get(id);
    }

    public void cancelOrder(Order o) {
        if (o.status == OrderStatus.CANCELLED) {
            System.out.println("Already cancelled!");
            return;
        }

        o.status = OrderStatus.CANCELLED;

        for (Product p : o.items.keySet()) {
            p.stock += o.items.get(p);
        }
    }
}