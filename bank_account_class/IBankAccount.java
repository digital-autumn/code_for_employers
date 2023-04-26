interface IBankAccount {
   
   /** 
    * returns the creation date of the Bank Account
    * @return
    */
   public String getCreationDate();
   /** 
    * returns the the Balance of the Bank Account
    * requires that the Balance is set before invocation
    * @return
    */ 
   public double getBalance();
   /**
    * returns Holder's ID
    * ID should be set when Bank Account is created
    * @return
    */
   public String getID();
   /**
    * returns the Date and time the Bank Account was last updated
    * @return
    */
   public String getLast_modified_time();
   /**
    * sets a new balance for the bank account
    * @param balance
    */
   public void setBalance(double balance);
   /**
    * sets a new id for the bank account
    * @param id
    */
   public void setID(String id);
   /**
    * sets the account holders name
    * @param holders_name
    */
   public void setHoldersName(String holders_name);
   /**
    * caller must check account balance before invoking this method
    * in order to ensure that account has sufficient funds for withdrawl
    * @param amount
    */
   public void withdraw(double amount);
   /**
    * invoke this method to deposit money into account
    * @param amount
    */
   public void deposit(double amount);
   /**
    * returns the Holders Name, Balance, ID, Account Creation Date and the
    * last time the account was updated
    * @return
    */
   public String toString();

}
