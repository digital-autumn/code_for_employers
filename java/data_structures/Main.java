package structs;

public class Main 
{
    public static void main(String [] args)
    {
        IList<String> list = new LinkedListImp<>();
        list.append("I");
        list.append("want");
        list.append("a");
        list.append("job.");

        list.print();

    }    
}
