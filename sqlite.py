import sqlite3

with sqlite3.connect('mydatabase.db') as conn:
    # Select all data from the person table
    cursor = conn.execute("SELECT * FROM person")
    data = cursor.fetchall()

    # Print the data for each person
    for person in data:
        print("ID:", person[0])
        print("Name:", person[1])
        print("Age:", person[2])
        print("Item:", person[3])