package structs;
public interface IVector <T> 
{
    /**
     *Adds object to vector
     * @param data
     */
    public void add (T data);

    /**
     *Deletes object at specified index
     * @param index
     */
    public void delete (int index);

    /**
     *Returns an object
     * @param i
     * @return
     */
    public T get (int i);

    /**
     *Returns the size of the vector
     * @return size
     */
    public int size();

    /**
     *Prints the contents of the vector to console
     */
    public void print();

}
