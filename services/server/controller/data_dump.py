import pandas as pd
from sqlalchemy import create_engine



engine = create_engine('postgresql://hello_flask:hello_flask@localhost:5434/hello_flask_dev')
login_details_csv_file_path = '../data/login_details.csv'
patient_csv_file_path = '../data/patient.csv'

def read_csv_and_insert_to_db(table_name,csv_file_path):
    # Read CSV file into a pandas DataFrame
    print('Reading CSV file to DataFrame...')
    df = pd.read_csv(csv_file_path)
    print(df.shape)
    # print(df.head())
    # Use pandas to_sql function to insert the DataFrame into the PostgreSQL database
    print('Inserting records into DB...')
    df.to_sql(name=table_name, con=engine, if_exists = 'append', index=False)
    print('Done!')

if __name__ == "__main__":
    try:
        # Call the function to read CSV and insert into the database
        read_csv_and_insert_to_db('login_details',login_details_csv_file_path)
        print("Login Data inserted successfully!")
        read_csv_and_insert_to_db('patient',patient_csv_file_path)
        print("Patient Data inserted successfully!")

    except Exception as e:
        print(f"Error: {e}")