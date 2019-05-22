![Quick Credit](./client/public/img/logo.png)

# Quick Credit
> Simple, flexible loans that are tailored for you

Quick Credit is an online lending platform that provides short term soft loans to individuals. This
helps solve problems of financial inclusion as a way to alleviate poverty and empower low
income earners.

[![Build Status](https://travis-ci.org/Jonathan4github/Quick_credit.svg?branch=develop)](https://travis-ci.org/Jonathan4github/Quick_credit)
[![Coverage Status](https://coveralls.io/repos/github/Jonathan4github/Quick_credit/badge.svg?branch=ch-setuo-continues-integration-165954421)](https://coveralls.io/github/Jonathan4github/Quick_credit?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/0877bb31e6b9859cf679/maintainability)](https://codeclimate.com/github/Jonathan4github/Quick_credit/maintainability)

## Table of Contents
- [Required Features](#required-features)
- [UI Templates](#ui-templates)
- [API](#api)
- [Pivotal Tracker ID](#pivotal-tracker-id)
- [Technologies](#technologies)
- [Installing](#installing)
- [Working Routes](#working-routes)

## Required Features
- User (client) can sign up.
- User (client) can login.
- User (client) can request for only one loan at a time.
- User (client) can view loan repayment history, to keep track of his/her liability or responsibilities.
- Admin can mark a client as verified, after confirming his/her home and work address.
- Admin can view a specific loan application.
- Admin can approve or reject a client’s loan application.
- Admin can post loan repayment transaction in favour of a client.
- Admin can view all loan applications.
- Admin can view all current loans (not fully repaid).
- Admin can view all repaid loans.

## UI Templates
The application UI template is hosted on gh-pages with [Quick credit](https://jonathan4github.github.io/Quick_credit/client/)

## API
API endpoints hosted on heroku at https://quickcredit-v1.herokuapp.com/

## Pivotal Tracker ID
Click on the link below to view this project user story

[Quick credit pivotal tracker story](https://www.pivotaltracker.com/n/projects/2326582)

## Technologies
- HyperText Mark-up Language (HTML)
- Cascade Style Sheet (CSS)
- Nodejs (Express framework)
- Mocha & Chai
- ESLint
- Babel
- Travis
- Code Climate
- Coveralls

## Installing / Getting started

A quick introduction of the minimal setup you need to get Quick Credit web app up &
running.

`git clone 
https://github.com/Jonathan4github/Quick_credit/`

Navigate into project

`cd Quick_credit`

Install require dependencies

`npm install`

Run server

`npm run dev-start`

Server listens on port 3000

> To run test

npm test

## Working Routes

| HTTP VERB | ENDPOINT                           | TASK                                                                            |
|-----------|------------------------------------|---------------------------------------------------------------------------------|
| POST      | api/v1/auth/signup                 | Create user account.                                                            |
| POST      | api/v1/auth/signin                 | Login a user.                                                                   |
| PATCH     | api/v1/users/<:user-email>/verify  | Mark a user as verified.                                                        |
| GET       | api/v1/loans/<:loan-id>            | Get a specific loan application.                                                |
| GET       | loans?status=approved&repaid=false | Get all current loans that are not fully repaid.                                |
| GET       | loans?status=approved&repaid=true  | Get all repaid loans.                                                           |
| GET       | api/v1/loans                       | Get all loan applications.                                                      |
| GET       | api/v1/loans/<:loan-id>/repayments | View loan repayment history.                                                    |
| POST      | api/v1/loans                       | Create a loan application.                                                      |
| PATCH     | api/v1/loans/<:loan-id>            | Approve or reject a loan application. Specify the status in the request’s body. |
| POST      | api/v1/loans/<:loan-id>/repayment  | Create a loan repayment record.                                                 |
|           |                                    |                                                                                 |

## Author
Jonathan Williams