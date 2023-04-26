import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

class BankAccountImpl implements IBankAccount{

   private double balance;
   private String id, holders_name;
   private String creation_date, last_modified_time;

   BankAccountImpl (double balance, String id, String holders_name){
      this.balance = balance;
      this.id = id;
      this.holders_name = holders_name;
      creation_date = setTime();
      last_modified_time = "Bank Account has never been updated";
   }

   public String getCreationDate() {
      return creation_date;
   }
   
   public double getBalance(){
      return balance;
   }

   public String getID(){
      return id;
   }

   public String getHoldersName(){
      return holders_name;
   }

   public String getLast_modified_time(){
      return last_modified_time;
   }

   public void setBalance(double balance){
      this.balance = balance;
      setLastTimeModified();
   }

   public void setID(String id){
      this.id = id;
      setLastTimeModified();
   }

   public void setHoldersName(String holders_name){
      this.holders_name = holders_name;
      setLastTimeModified();
   }

   public void withdraw(double amount){
      balance-=amount;
      setLastTimeModified();
   }

   public void deposit(double amount){
      balance+=amount;
      setLastTimeModified();
   }

   public String toString(){
      return "Holders Name"+": "+holders_name+"\n"
            +"ID"+": "+id+"\n"
            +"Balance"+": "+"$"+balance+"\n"
            +"Account Creation Date"+": "+creation_date+"\n"
            +"Last Modified"+": "+last_modified_time+"\n";
   }

   private void setLastTimeModified(){
      last_modified_time = setTime();
   }

   private String setTime(){
      LocalDateTime current = LocalDateTime.now();
      DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy HH:mm:ss"); 
      return current.format(formatter);
   }
}