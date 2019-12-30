# Express-Sequelize-Boilerplate
This is a boilerplate for creating APIs using express framework
In this boilerplate user can register and login 
User can change there password and view his/her profile, implemented with JWT token verification

## Installation
You can download this repo or clone this using the below command

 git clone https://github.com/sakshibohora/sequelize-express-boilerplate.git

 or download from **Download Zip**

https://github.com/sakshibohora/sequelize-express-boilerplate

## Setup
Once you clone or download project go into you folder
 >now copy ***.env.local*** file to ***.env***

 >npm install (it will install all the dependencies required for the project)

### Database Config Setup
Create new database (my database name is **express-sequelize**).
so in my **.env** file will set below parameters.
```
DB_HOST=localhost               # database connection host
DB_USER=root                    # database username
DB_PASS=mysecret           # database password
DB_NAME=express-sequelize    # database name
DB_DIALECT=postgres            # database dialect
DB_PORT=3306                # database port
```
some other important keys in **.env** file
```
APP_HOST=localhost      # application host name
APP_PORT=3000           # application port
SECRET=secret           # secret key for encrypt/decrypt JWT token
```

