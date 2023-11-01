# pulling official base image
FROM python:3.11.3-slim-buster

# copying file contents
COPY . .

# setting environment variables
ENV PYTHONPATH /

# setting working directory
WORKDIR .
RUN pwd

# install system dependencies
RUN apt-get update && apt-get install -y netcat

# installing dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
# CMD ["python","run.py"]

