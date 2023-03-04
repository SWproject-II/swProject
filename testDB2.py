import mysql.connector

db = mysql.connector.connect(
    host='localhost',
    user='alisa',
    password='root',
    database='testibase'
)

mycursor = db.cursor()

# mycursor.execute("INSERT INTO person (name, age, personID) VALUES ('pauli', 100, 1)")
mycursor.execute("SELECT * FROM person WHERE name='pauli'")

data = mycursor.fetchone()

# closing db
mycursor.close()
db.close()

# printing data
print(data)
