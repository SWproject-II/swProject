import sqlite3
import random

# Create a connection to the database
conn = sqlite3.connect('mydatabase.db')

# Create the person table
conn.execute('''CREATE TABLE person
             (id INTEGER PRIMARY KEY,
              name TEXT,
              age INTEGER,
              item TEXT)''')

# Define the names to be inserted
names = ['Pauli', 'Alisa', 'Jyri', 'Aki', 'Sauli']

# Define a function to generate random ages
def generate_age():
    return random.randint(20, 30)

# Define a function to generate random items
def generate_item():
    items = ['phone', 'laptop', 'watch', 'guitar']
    return random.choice(items)

# Insert the data for each person
for name in names:
    age = generate_age()
    item = generate_item()
    conn.execute("INSERT INTO person (name, age, item) VALUES (?, ?, ?)", (name, age, item))

# Commit the changes to the database
conn.commit()

# Close the connection to the database
conn.close()