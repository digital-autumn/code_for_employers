package structs;

public class Main 
{
    public static void main(String [] args)
    {
        IList<String> list = new LinkedListImp<>();
        list.append("I want");
        list.append("a job.");
        list.append("I hope");
        list.append("this helps.");

        list.print();

    }    
}
