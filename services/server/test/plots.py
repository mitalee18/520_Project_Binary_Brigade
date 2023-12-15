import pandas as pd
import matplotlib.pyplot as plt
import os

# Constants
num_files = 10
file_prefix = "part1_output_"
file_extension = ".txt"

# Read data from files
all_data = pd.DataFrame()

for i in range(0, num_files):
    file_path = f"{file_prefix}{i}{file_extension}"
    thread_data = pd.read_csv(file_path, header=None, names=[f"Thread_{i}"])
    all_data = pd.concat([all_data, thread_data], axis=1)

# Process data
# Here you can perform any processing needed, like calculating means, etc.
# For this example, let's assume we're plotting raw data

# Plot data
plt.figure(figsize=(15, 8))
for column in all_data.columns:
    plt.plot(all_data[column], label=column)

plt.title("Load Test Time Taken per Request")
plt.xlabel("Request Number")
plt.ylabel("Time Taken (seconds)")
plt.legend()
plt.show()
