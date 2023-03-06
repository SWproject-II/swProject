import sqlite3

# Connect to the database
conn = sqlite3.connect('mydatabase.db')

# Get the cursor
cursor = conn.cursor()


cursor.execute("DELETE FROM reservation;")

# Commit the changes
conn.commit()

# Close the connection
conn.close()