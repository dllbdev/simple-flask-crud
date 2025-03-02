# Simple Inventory & Sales CRUD app

A simple CRUD web app for inventory and sales recording.

This was a semestral project I created as TA for the *Database Systems* course at UTEM.

I emulated the web app in a simple static website (HTML, JS, CSS) as a [live demo](https://dllbdev.github.io/simple-inventory-sales-crud/).

## Requirements

 `MySQL` is used for the databases in the backend. So, the **first step** is to install `MySQL Workbench 8.0` (recommended) and set up your localhost server and password there.

Then, the python libraries needed are:

- `flask`
- `flask_mysqldb`
- `faker`
- `pymysql`

To install run in terminal:

    pip install -r requirements.txt

## Set up

To locally deploy this application, first follow these set up instructions:

1. Create a *schema* inside Workbench, for this project the name used is `inventory_db`.

2. Create the tables needed inside `inventory_db` schema. You can do this by executing the SQL file at `back/sql/tables.sql` inside Workbench.

3. Modify the `populate_db.py` and `config.py` to add the MySQL localhost server connection credentials (host, user, password, database).

4. Execute the `populate_db.py` file in terminal to populate the databases created with random fake data.

## Deployment

Run in terminal

    python app.py