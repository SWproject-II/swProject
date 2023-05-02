import sqlite3

# Connect to the database
conn = sqlite3.connect('instance/database.db')

# Create a cursor object
cursor = conn.cursor()

# Define the update query
update_query = """UPDATE game
                  SET name = 'Ticket to Ride'
                  WHERE id = 5"""

# Execute the update query
cursor.execute(update_query)

# Commit the changes to the database
conn.commit()

# Close the cursor and database connection
cursor.close()
conn.close()
