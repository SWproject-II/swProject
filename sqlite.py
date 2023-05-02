import sqlite3

# Connect to the database
conn = sqlite3.connect('instance/database.db')

# Get the cursor
cursor = conn.cursor()

# Get a list of all tables in the database
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

# Loop through the tables
for table_name in tables:
    # Print the table name
    print(f"Table name: {table_name[0]}")

    # Get the column names and data types for the table
    cursor.execute(f"PRAGMA table_info({table_name[0]})")
    columns = cursor.fetchall()
    for column in columns:
        print(f"{column[1]} ({column[2]})")

    # Select all rows from the table and print them
    cursor.execute(f"SELECT * FROM {table_name[0]};")
    rows = cursor.fetchall()
    for row in rows:
        print(row)
    print()  # Add an empty line for readability

# Close the connection
conn.close()