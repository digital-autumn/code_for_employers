package structs;
import java.util.Arrays;

public class VectorImp <T> implements IVector <T>
{
    private Object [] vector;
    private int size, capacity;

    private void shift(int index)
    {
        for (; index < size-1; index++)
            vector[index] = vector[index+1];
    }

    private void increaseCapacity()
    {
        capacity*=2;
        vector = Arrays.copyOf(vector, capacity);
    }

    VectorImp()
    {
        this.size = 0;
        this.capacity = 10;
        vector = (T[]) new Object[capacity];

    }

    VectorImp(int capacity){
        this.size = 0;
        vector = (T[]) new Object[capacity];
    }

    public void add (T data)
    {
        if (size == capacity-1)
            increaseCapacity();
        vector[size] = data;
        size++;
    }

    public void delete (int index)
    {
        if (index == size-1)
        {
            vector[index] = null;
            size--;
            return;
        }

        shift(index);
        size--;
    }

    public int size()
    {
        return size;
    }

    public T get (int index)
    {
        return (T) vector[index];
    }

    public void print()
    {
        for(int i = 0; i < size; i++)
            System.out.print(vector[i]+" ");
        System.out.println();
    }
}
