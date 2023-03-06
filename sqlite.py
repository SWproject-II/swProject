import sqlite3

# Connect to the database
conn = sqlite3.connect('mydatabase.db')

# Get the cursor
cursor = conn.cursor()

# Get a list of all tables in the database
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

# Loop through the tables and print their data
for table_name in tables:
    print(f"Table name: {table_name[0]}")
    cursor.execute(f"SELECT * FROM {table_name[0]};")
    rows = cursor.fetchall()
    for row in rows:
        print(row)

# Close the connection
conn.close()