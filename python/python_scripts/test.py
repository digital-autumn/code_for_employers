import statistics
import json

class TestResultContainer():
   
    def __init__(this):
        this.resultsDictionary = {"Throughput":[], "RTT":[], "ConnectionStatus":[]}
        this.through_put = "Throughput"
        this.rtt = "RTT"
        this.connection_status = "ConnectionStatus"

    def addKey (this, k, value):
        this.resultsDictionary[k].append(value)
    
    def average (this, k):
        return statistics.mean(this.resultsDictionary.get(k,""))

    def standardDeviation (this, k):
        return statistics.stdev(this.resultsDictionary.get(k,""), this.average(k))

    def write_to_json (this):
        with open('results.json', 'w') as fp:
            json.dump(this.resultsDictionary, fp)
    
    def printToConsole (this, testResults):
        print(f'\nYou have entered {testResults} test results')
        print(f'The average and standard deviation of Throughput are {this.average(this.through_put)}  and {this.standardDeviation(this.through_put)}')
        print(f'The average and standard deviation of RTT are {this.average(this.rtt)} and {this.standardDeviation(this.rtt)}')
        print(f'The average and standard deviation of Connection Status are {this.average(this.connection_status)} and {this.standardDeviation(this.connection_status)}')







