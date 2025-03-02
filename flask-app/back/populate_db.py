from faker import Faker
import pymysql
import random

# Configuración de la base de datos
db = pymysql.connect(
    host="localhost",
    user="root",
    password="password",
    database="inventory_db"
)
cursor = db.cursor()

fake = Faker()

# Generar datos para la tabla products
def populate_products(n):
    brands = ['Corona', 'Heineken', 'Budweiser', 'Stella Artois', 'Guinness']
    types = ['Lager', 'Ale', 'Stout', 'Pilsner', 'Porter']
    origins = ['México', 'Países Bajos', 'Estados Unidos', 'Bélgica', 'Irlanda']

    for _ in range(n):
        brand = random.choice(brands)
        type = random.choice(types)
        origin = random.choice(origins)
        price = round(random.uniform(1, 10), 2)

        cursor.execute(
            "INSERT INTO products (brand, type, origin, price) VALUES (%s, %s, %s, %s)",
            (brand, type, origin, price)
        )
    db.commit()

# Generar datos para la tabla clients
def populate_clients(n):
    for _ in range(n):
        name = fake.name()
        rut = fake.unique.ssn()
        location = fake.address()

        cursor.execute(
            "INSERT INTO clients (name, rut, location) VALUES (%s, %s, %s)",
            (name, rut, location)
        )
    db.commit()

# Generar datos para la tabla sales
def populate_sales(n):
    cursor.execute("SELECT id FROM products")
    product_ids = [row[0] for row in cursor.fetchall()]

    cursor.execute("SELECT id FROM clients")
    client_ids = [row[0] for row in cursor.fetchall()]

    for _ in range(n):
        product_id = random.choice(product_ids)
        client_id = random.choice(client_ids)
        quantity = random.randint(1, 100)
        cursor.execute("SELECT price FROM products WHERE id=%s", (product_id,))
        price = cursor.fetchone()[0]
        total_price = round(price * quantity, 2)

        cursor.execute(
            "INSERT INTO sales (product_id, client_id, quantity, total_price) VALUES (%s, %s, %s, %s)",
            (product_id, client_id, quantity, total_price)
        )
    db.commit()

# Poblar las tablas con datos aleatorios
populate_products(50)
populate_clients(50)
populate_sales(100)

db.close()
