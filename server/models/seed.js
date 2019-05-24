import dotenv from 'dotenv';
import moment from 'moment';
import Helper from '../helpers/AuthHelper';
import db from './db';

dotenv.config();

const hashPassword = Helper.hashPassword('password');

const address = 'No 12 ladipo lagos nigeria';

const seedDatabase = (req, res) => {
  const createQuery = 'INSERT INTO users (firstName, lastName, email, password, work_address, home_address, created_date, modified_date, isadmin, status)  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *';
  const values = ['admin', 'admin', 'admin@gmail.com', hashPassword, address, address, moment(new Date()), moment(new Date()), true, 'verified'];

  db.query(createQuery, values).then((user) => {
  }).catch(e=>(e));
}

seedDatabase();
export default seedDatabase;