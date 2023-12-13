import copy
import time
import random
from threading import Thread
from src.part1.client import request_loop


class Test:
    def __init__(self, n_threads, amp_time, client_request_list, shuffle_requests=True):
        self.n_threads = abs(n_threads or 1) # no of client threads
        self.amp_time = abs(amp_time + 0.000001) # time distribution across threads
        self.client_request_list = client_request_list # query list
        self.shuffle_requests = shuffle_requests
        pass

    # Create and start client threads
    def run(self):
        print("LOAD TEST RUNNING")
        print(f"Running {self.n_threads} threads in {self.amp_time} seconds")
        print(f"Request list length = {len(self.client_request_list)}, shuffle = {self.shuffle_requests}")
        start = time.time()
        thread_list = []
        for i in range(self.n_threads):
            time.sleep(self.amp_time/self.n_threads)
            t = Thread(target=self.run_client, args=[i])
            thread_list.append(t)
            t.start()
        for t in thread_list:
            t.join()
        end = time.time()
        total_time = end - start
        request_count = self.n_threads * len(self.client_request_list)
        average_time_per_request = total_time/request_count
        print(f"Time taken = {total_time} seconds")
        print(f"Number of client threads = {self.n_threads}")
        print(f"Number of requests sent = {request_count}")
        print(f"Average processing time = {average_time_per_request}")
        print("DONE")

    # calls the part 1 client function
    def run_client(self, thread_id):
        rs = self.client_request_list.copy()
        if self.shuffle_requests:
            random.shuffle(rs)
        start_time = time.time()
        request_loop(rs)
        end_time = time.time()
        # with open(f'part1_output_{thread_id}.txt', 'a') as f:
        #     f.write(f'{end_time-start_time}\n')

def generate_random_contact_no():
    # Generate a random 10-digit contact number
    return ''.join(random.choices('0123456789', k=10))

def generate_random_address():
    # Generate a random address
    street_number = random.randint(100, 999)
    street_name = random.choice(['Main', 'Oak', 'Maple', 'Cedar', 'Elm'])
    city = random.choice(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'])
    return f'{street_number} {street_name} Street, {city}'

def generate_random_email(first_name):
    # Generate a random email address using the first name
    username = ''.join(random.choices(string.ascii_lowercase, k=8))
    domain = random.choice(['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com'])
    return f'{username}_{first_name.lower()}@{domain}'

if __name__ == "__main__":
    create_profile_base_url = 'http://localhost:8080/api/user/create_profile'
    first_names = ['John', 'Jane', 'Michael', 'Emily', 'William', 'Olivia', 'Daniel', 'Sophia', 'Christopher', 'Ava',
                   'Matthew', 'Emma', 'David', 'Isabella', 'Andrew', 'Mia', 'Ethan', 'Amelia', 'James', 'Grace']
    last_names = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
                  'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez',
                  'Robinson']
    cl_req_lst = ['Lookup GameStart']
    # Create test object with desired parameters
    test = Test(n_threads=20, amp_time=0.00001, client_request_list=cl_req_lst)
    test.run()
