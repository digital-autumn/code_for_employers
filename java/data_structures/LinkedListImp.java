package structs;

public class LinkedListImp <T> implements IList <T> 
{
    protected class Node <T>
    {
        Node <T> next;
        T data;
        Node (T data)
        {
            this.data = data;
        }
    }

    private Node <T> head;
    private Node <T> tail;

    LinkedListImp(){}

    public void append (T data)
    {
        if (head == null)
        {
            head = new Node <T>(data);
            tail = head;
            return;
        }
        
        tail.next = new Node <T>(data);
        tail = tail.next;
    }

    public void delete(T data)
    {
        if (head.data == data)
        {
            head = head.next;
            return;
        }

        if (tail.data == data)
        {
            tail = null;
            return;
        }
        
        for (Node <T> i = head; i != null; i = i.next)
        {
            if (i.next.data == data)
            {
                i.next = i.next.next;
                return;
            }
        }
    }

    public boolean find(T data)
    {
        if (head.data == data || tail.data == data)
            return true;
        
        for (Node <T> i = head; i != null; i = i.next)
            if (i.data == data)
                return true;

        return false;
    }
    
    public void print()
    {
        for (Node <T> i = head; i != null; i = i.next)
            System.out.print(i.data+" ");
        System.out.println();
    }
}
