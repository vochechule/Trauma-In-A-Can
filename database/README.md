# Database Setup

This directory contains SQL scripts for database initialization and seeding.

## Files

- `init.sql` - Creates the database schema and tables
- `seed.sql` - Populates the database with sample data
- `reset-db.sh` - Shell script to reset and seed the database

## Usage

### Automatic Initialization

When running `docker-compose up`, the `init.sql` script is automatically executed by PostgreSQL on first startup.

### Manual Seeding

To seed the database with sample data:

```bash
# On Linux/Mac
cd database
./reset-db.sh

# On Windows (using PowerShell from project root)
$env:PGPASSWORD="postgres"; psql -h localhost -U postgres -d product_catalog -f database/seed.sql
```

### Connect to Database

```bash
# Using psql
psql -h localhost -U postgres -d product_catalog

# Connection details
Host: localhost
Port: 5432
Database: product_catalog
User: postgres
Password: postgres
```

## Schema

### Products Table

| Column          | Type         | Description                    |
|----------------|--------------|--------------------------------|
| id             | SERIAL       | Primary key                    |
| name           | VARCHAR(255) | Product name                   |
| description    | TEXT         | Product description            |
| price          | DECIMAL      | Product price                  |
| category       | VARCHAR(100) | Product category               |
| stock_quantity | INTEGER      | Available stock                |
| image_url      | VARCHAR(500) | URL to product image           |
| created_at     | TIMESTAMP    | Creation timestamp             |
| updated_at     | TIMESTAMP    | Last update timestamp          |
