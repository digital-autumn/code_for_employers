import statistics
import json

class TestResultContainer():
    #Creates default contructor. Initializes resultsDictionary with key values
    #and creates lists associated with those values
    def __init__(this):
        this.resultsDictionary = {"Throughput":[], "RTT":[], "ConnectionStatus":[]}
        this.through_put = "Throughput"
        this.rtt = "RTT"
        this.connection_status = "ConnectionStatus"

    #addKey method arguments k which equals the key to index into the Dictionary and 
    #value which is the value to be appended to the list in the dictionay
    def addKey (this, k, value):
        this.resultsDictionary[k].append(value)
    
    #excepts k as an arguement which is one of the keys in the dictionary as an arguement
    #calculates the average of the list and returns to caller
    def average (this, k):
        return statistics.mean(this.resultsDictionary.get(k,""))

    #excepts k which is one of the keys in the dictionary as an arguement
    #calculates the standard deviation of the list and returns to caller
    def standardDeviation (this, k):
        return statistics.stdev(this.resultsDictionary.get(k,""), this.average(k))

    #writes dictionary to json file named results.json
    def write_to_json (this):
        with open('results.json', 'w') as fp:
            json.dump(this.resultsDictionary, fp)
    
    #print the number of tests, average and standard deviation to console
    def printToConsole (this, testResults):
        print(f'\nYou have entered {testResults} test results')
        print(f'The average and standard deviation of Throughput are {this.average(this.through_put)}  and {this.standardDeviation(this.through_put)}')
        print(f'The average and standard deviation of RTT are {this.average(this.rtt)} and {this.standardDeviation(this.rtt)}')
        print(f'The average and standard deviation of Connection Status are {this.average(this.connection_status)} and {this.standardDeviation(this.connection_status)}')







