import java.util.*;
import java.io.*;

public class DataParse {

    private List<String> inFile;

    DataParse(){
        inFile = new ArrayList<>();
        inputStream();
    }

    public void print(){
        System.out.println();
        for (String i : inFile)
            System.out.println(i);
    }

    private void inputStream(){
        try{
            File file = new File("webpages.txt");
            BufferedReader br = new BufferedReader(new FileReader(file));
            
            String input;
            while ((input = br.readLine()) != null)
                inFile.add(input);
            br.close();
                
        }catch (IOException e) {
            System.out.println("Error in the Parse");
        }
    }
}
