SELECT 'CREATE DATABASE codrrdb'
WHERE NOT EXISTS (SELECT FROM pg_database where datname='codrrdb')\gexec