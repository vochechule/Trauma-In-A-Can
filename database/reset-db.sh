#!/bin/bash
# Script to reset and seed the database

echo "Resetting database..."

# Wait for PostgreSQL to be ready
until PGPASSWORD=postgres psql -h localhost -U postgres -d product_catalog -c '\q' 2>/dev/null; do
  echo "Waiting for PostgreSQL..."
  sleep 2
done

echo "PostgreSQL is ready!"

# Run init script
echo "Running init.sql..."
PGPASSWORD=postgres psql -h localhost -U postgres -d product_catalog -f init.sql

# Run seed script
echo "Running seed.sql..."
PGPASSWORD=postgres psql -h localhost -U postgres -d product_catalog -f seed.sql

echo "Database reset and seeded successfully!"
