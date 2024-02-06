import java.util.ArrayList;
import java.util.List;

public class BankApp {
   public static void main(String[] args){
      
      List<IBankAccount> bank_accounts = new ArrayList<>();
      bank_accounts.add(new BankAccountImpl(13.00, "1", "Andrea Mitchell"));
      bank_accounts.add(new BankAccountImpl(255000.52, "2", "Jack Conner"));
      bank_accounts.add(new BankAccountImpl(345.23, "3", "Daniel Mitchell"));
      bank_accounts.add(new BankAccountImpl(85500.36, "4", "Davis Tyler"));

      System.out.println();
      bank_accounts.get(2).withdraw(4.00);

      bank_accounts.stream()
         .filter(s -> s.getBalance() > 340.00)
         .forEach(s -> System.out.println(s.toString()));
   }
}
