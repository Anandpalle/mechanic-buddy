package service;

import model.*;
import java.util.*;

public class PaymentService {

    public void processPayment(Order o) {

        boolean success = new Random().nextBoolean();

        if (success) {
            o.status = OrderStatus.PAID;
            System.out.println("Payment Success!");
        } else {
            rollback(o);
            System.out.println("Payment Failed!");
        }
    }

    private void rollback(Order o) {
        for (Product p : o.items.keySet()) {
            p.stock += o.items.get(p);
        }
        o.status = OrderStatus.FAILED;
    }
}