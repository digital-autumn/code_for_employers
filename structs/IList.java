package structs;
public interface IList <T> 
{
    /**
     * adds object to the tail of the list.
     * @param data
     */
    public void append (T data);

    /**
     * This function deletes the data passed into it from the linked list.  
     * @param data
     */

    public void delete(T data);

    /**
     * This method finds a object then returns true if object is in the list and
     * false otherwise. 
     * If object is at the head or tail of the list time complexity is O(1) otherwise
     * O(n) time to find 
     * @param data
     * @return boolean
     */
    public boolean find(T data);

    /**
     * Prints the contents of the Linked List to console
     */
    public void print();
    
}
