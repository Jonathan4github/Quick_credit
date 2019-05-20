import { Pool } from 'pg';
import dotenv from 'dotenv';
import configuration from '../config/config';

const env = process.env.Node_ENV || 'test';
const config = configuration[env];
const connectionString = config.url;

dotenv.config();

const db = new Pool({
  connectionString
});

db.on('connect', () => {
  console.log('connected to the db');
});

const createTables = () => {
  const query = `
  DROP TABLE IF EXISTS "public"."users" CASCADE;
  DROP TABLE IF EXISTS "public"."loans" CASCADE;
  DROP TABLE IF EXISTS "public"."repayments" CASCADE;

  CREATE TABLE IF NOT EXISTS users(
  
    id serial PRIMARY KEY,
  
    firstName VARCHAR(150) NOT NULL,

    lastName VARCHAR(150) NOT NULL,
  
    email VARCHAR(255) UNIQUE NOT NULL,
  
    password VARCHAR(255) NOT NULL,
    
    token VARCHAR(255) DEFAULT NULL,

    status VARCHAR(150) DEFAULT 'unverified',

    isAdmin BOOLEAN DEFAULT FALSE,

    image VARCHAR(255) DEFAULT 'https://via.placeholder.com/150',
    
    created_date TIMESTAMP,
    
    modified_date TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS loans(
    
    id serial PRIMARY KEY,
  
    userId int REFERENCES users(id) ON DELETE CASCADE,
    
    status VARCHAR(150) DEFAULT 'pending',

    repaid BOOLEAN DEFAULT FALSE,

    tenor NUMERIC NOT NULL,

    amount NUMERIC NOT NULL,

    interest NUMERIC NOT NULL,

    paymentInstallment NUMERIC NOT NULL,

    total_due NUMERIC NOT NULL,

    balance NUMERIC NOT NULL,    
  
    created_date TIMESTAMP,
    
    modified_date TIMESTAMP    
  );
  CREATE TABLE IF NOT EXISTS repayments(
    
    id serial PRIMARY KEY,
  
    loanId int REFERENCES loans(id) ON DELETE CASCADE,
    
    amount NUMERIC NOT NULL,
  
    created_date TIMESTAMP,
    
    modified_date TIMESTAMP    
  )`;


  db.query(query, (err) => {
    if (err) {
      return err.message;
    }
    db.end();
  });
};

module.exports = {
  createTables
};
require('make-runnable');
