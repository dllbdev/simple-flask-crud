# Import necessary modules from Flask and flask_mysqldb
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL
import MySQLdb.cursors

# Create a Flask app instance
app = Flask(__name__)
# Load configuration from a separate file
app.config.from_object('config.Config')
# Initialize a MySQL connection
mysql = MySQL(app)

'''
Retrieves all data from a given table in the database.
'''
def get_all(table_name):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(f'SELECT * FROM {table_name}')
    return cursor.fetchall()

'''
Adds a new item to a given table in the database.
'''
def add_item(table_name, data):
    cursor = mysql.connection.cursor()
    columns = ', '.join(data.keys())
    placeholders = ', '.join(['%s'] * len(data))
    query = f'INSERT INTO {table_name} ({columns}) VALUES ({placeholders})'
    cursor.execute(query, list(data.values()))
    mysql.connection.commit()
    flash(f'{table_name.capitalize()} added successfully')

'''
Deletes an item from a given table in the database.
'''
def delete_item(table_name, id):
    cursor = mysql.connection.cursor()
    cursor.execute(f'DELETE FROM {table_name} WHERE id = %s', (id,))
    mysql.connection.commit()
    flash(f'{table_name.capitalize()} deleted successfully')

'''
Renders the index.html template.
'''
@app.route('/')
def index():
    return render_template('index.html')

'''
Manages products, including adding new products and displaying the list of products.
'''
@app.route('/products', methods=['GET', 'POST'])
def manage_products():
    if request.method == 'POST':
        data = {
            'brand': request.form['brand'],
            'type': request.form['type'],
            'origin': request.form['origin'],
            'price': request.form['price']
        }
        add_item('products', data)
        return redirect(url_for('manage_products'))

    products = get_all('products')
    return render_template('products.html', products=products)

'''
Deletes a product from the database.
'''
@app.route('/products/delete/<int:product_id>', methods=['POST'])
def delete_product(product_id):
    delete_item('products', product_id)
    return redirect(url_for('manage_products'))

'''
Manages clients, including adding new clients and displaying the list of clients.
'''
@app.route('/clients', methods=['GET', 'POST'])
def manage_clients():
    if request.method == 'POST':
        data = {
            'name': request.form['name'],
            'rut': request.form['rut'],
            'location': request.form['location']
        }
        add_item('clients', data)
        return redirect(url_for('manage_clients'))

    clients = get_all('clients')
    return render_template('clients.html', clients=clients)

'''
Manages sales, including adding new sales and displaying the list of sales.
'''
@app.route('/sales', methods=['GET', 'POST'])
def manage_sales():
    if request.method == 'POST':
        product_id = request.form['product_id']
        client_id = request.form['client_id']
        quantity = int(request.form['quantity'])
        product = get_all('products')[int(product_id) - 1]
        total_price = product['price'] * quantity
        data = {
            'product_id': product_id,
            'client_id': client_id,
            'quantity': quantity,
            'total_price': total_price
        }
        add_item('sales', data)
        return redirect(url_for('manage_sales'))

    sales = get_all('sales')
    products = get_all('products')
    clients = get_all('clients')
    return render_template('sales.html', sales=sales, products=products, clients=clients)

'''
Deletes a sale from the database.
'''
@app.route('/sales/delete/<int:sale_id>', methods=['POST'])
def delete_sale(sale_id):
    delete_item('sales', sale_id)
    return redirect(url_for('manage_sales'))

if __name__ == '__main__':
    app.secret_key = 'your_secret_key'
    app.run(debug=True)