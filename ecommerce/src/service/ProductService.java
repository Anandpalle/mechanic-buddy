package service;

import model.Product;
import java.util.*;

public class ProductService {

    public Map<Integer, Product> products = new HashMap<>();
    int id = 1;

    public void addProduct(String name, double price, int stock) {
        products.put(id, new Product(id, name, price, stock));
        id++;
    }

    public void viewProducts() {
        for (Product p : products.values()) {
            System.out.println(p.id + " " + p.name + " ₹" + p.price + " Stock:" + p.stock);
            if (p.stock < 5) System.out.println("⚠ Low stock!");
        }
    }

    public Product getProduct(int id) {
        return products.get(id);
    }
}