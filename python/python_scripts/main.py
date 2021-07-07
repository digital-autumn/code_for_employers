from test import TestResultContainer

def main():
    t = TestResultContainer()
    numTestResults = 0
    switchMonitor = 3
    userValue = 0.0
    keyName = ""
    
    try:
        while True:
            try:
                if switchMonitor % 3 == 0:
                    keyName = "Throughput"
                elif switchMonitor % 3 == 1:
                    keyName = "RTT"
                elif switchMonitor % 3 == 2:
                    keyName = "ConnectionStatus"

                userValue = float(input(f'Please enter value for {keyName}: '))
                t.addKey(keyName, userValue)
                if switchMonitor % 3 == 2:
                    numTestResults+=1
                switchMonitor+=1
                
            except ValueError:
                print("You must input valid data Ex. 21.1, 5")
                continue

    except KeyboardInterrupt:
       t.printToConsole(numTestResults)
       t.write_to_json()
        
if __name__ == '__main__':
    main()
