package controller;


import service.*;
import model.*;
import java.util.*;

public class AppController {

    Scanner sc = new Scanner(System.in);

    ProductService productService = new ProductService();
    CartService cartService = new CartService();
    OrderService orderService = new OrderService();
    PaymentService paymentService = new PaymentService();

    public void start() {

        while (true) {

            System.out.println("\n1.Add Product\n2.View Products\n3.Add to Cart\n4.Place Order\n5.Pay\n6.View Orders\n7.Cancel\n8.Exit");

            int ch = sc.nextInt();

            switch (ch) {
                case 1 -> addProduct();
                case 2 -> productService.viewProducts();
                case 3 -> addToCart();
                case 4 -> placeOrder();
                case 5 -> payment();
                case 6 -> orderService.viewOrders();
                case 7 -> cancel();
                case 8 -> System.exit(0);
            }
        }
    }

    void addProduct() {
        System.out.print("Name: ");
        String name = sc.next();
        System.out.print("Price: ");
        double price = sc.nextDouble();
        System.out.print("Stock: ");
        int stock = sc.nextInt();

        productService.addProduct(name, price, stock);
    }

    void addToCart() {
        System.out.print("Product ID: ");
        int id = sc.nextInt();
        System.out.print("Qty: ");
        int qty = sc.nextInt();

        Product p = productService.getProduct(id);
        cartService.addToCart(p, qty);
    }

    void placeOrder() {
        Order o = orderService.placeOrder(cartService.getCart());
        if (o != null) {
            System.out.println("Order Created ID: " + o.id);
            cartService.clearCart();
        }
    }

    void payment() {
        System.out.print("Order ID: ");
        int id = sc.nextInt();

        Order o = orderService.getOrder(id);
        paymentService.processPayment(o);
    }

    void cancel() {
        System.out.print("Order ID: ");
        int id = sc.nextInt();

        Order o = orderService.getOrder(id);
        orderService.cancelOrder(o);
    }
}