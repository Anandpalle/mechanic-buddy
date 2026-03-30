package service;

import model.Product;
import java.util.*;

public class CartService {

    public Map<Product, Integer> cart = new HashMap<>();

    public void addToCart(Product p, int qty) {
        if (p.stock == 0) {
            System.out.println("Out of stock!");
            return;
        }

        if (qty > p.stock) {
            System.out.println("Not enough stock!");
            return;
        }

        cart.put(p, cart.getOrDefault(p, 0) + qty);
    }

    public void clearCart() {
        cart.clear();
    }

    public Map<Product, Integer> getCart() {
        return cart;
    }
}