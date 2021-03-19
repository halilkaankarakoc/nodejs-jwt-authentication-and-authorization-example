# nodejs-jwt-authentication-and-authorization

# Overview

API that implements authentication and authorization using nodejs, express, jwt and mongodb (mongoose).

You can create a new user (`signup`), try `signin` and `signout` features. Also you can try access to protected routes `protectedRoute1`, `protectedRoute2`, `userUpgrade`, `levelUpgarade`.

For example when you try to access `user-upgrade (/api/user/:id/upgrade)` endpoint to upgrade your role from `standard` to `admin`,  you must be authenticated and also your level must be greater than or equal to 10. By default when you sign up your level is 0. To increase that level you can make a request to `update-level (/api/user/:id/level)` endpoint.

# User Model

**Attributes**

|  attribute | type |
|---|---|
|  email | string |
|  password | string |
|  role | enum (string) |
|  level | number |

# Endpoints

**Url :** `/api/user/signup`
**Description :** `Endpoint for create a new user`
**Method :** `POST`  
**Request parameters :** 

|  Name | Type |
|---|---|
|  email | string |
|  password | string |

#

**Url :** `/api/user/signin`
**Description :** `Endpoint for sign in`
**Method :** `POST`  
**Request parameters :** 

|  Name | Type |
|---|---|
|  email | string |
|  password | string |

#

**Url :** `/api/user/signout`  
**Description :** `Endpoint for sign out`
**Method :** `POST`  

#

**Url :** `/api/user/currentuser`
**Description :** `Endpoint for getting currentuser`
**Method :** `GET`  

#

**Url :** `/api/user/:id/level`  
**Method :** `POST`  
**Description :** `Endpoint for increasing user level one by one`
**Request parameters :** 

|  Name | Type |
|---|---|
|  userId | string |

#

**Url :** `/api/user/:id/upgrade`  
**Method :** `POST`  
**Description :** `Endpoint for upgrading user role to admin if users level is greater than 10`
**Request parameters :** 

|  Name | Type |
|---|---|
|  userId | string |


# Middlewares

|  name | description |
|---|---|
|  error-handler | Global error handling middleware |
|  current-user | Checks user session existence, verifies jwt token and returns user info back. |
|  require-authentication | Checks user authenticated |
|  validate-request | Validates request body parameters. For example email or not, password with length longer than 4 characters etc.  |
|  level-authorization | Higher order function takes determined level and compares with user level. |
|  role-authorization | Higher order function takes determined role and compares with user role. |


# Errors 

**Base Error** `CustomError`

|  name |status code |
|---|---|
|  BadRequestError | 400 |
|  NotAuthorizedError | 401 |
|  NotFoundError | 404 |
|  RequestValidationError | 400 |




