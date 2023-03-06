import sqlite3

# Connect to the database
conn = sqlite3.connect('mydatabase.db')

# Get the cursor
cursor = conn.cursor()

# Delete the items with id 7, 8, and 9 from the "game" table
cursor.execute("DELETE FROM reservation;")

# Commit the changes
conn.commit()

# Close the connection
conn.close()