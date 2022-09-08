# Helper functions for Rest API operations

# checks to see if the request body was sent and num of values
# match the number of values in the req_body
def req_body_exist(req_body: object, num_values: int):
    return req_body is not None and len(req_body) == num_values