<div align="center" style="margin-bottom: 20px;">
<img alt="gobarber" src="./img/logo.png" width="auto" heigth="auto"/>
</div>

<div align="center" style="margin: 20px;">

</div>

## :barber: The Project

This is an application to profissional hairdressers to manage their day of work, where their customers can schedule appointments, so they can see in his dashboard, all the customers they will serve that day.

## :fire: About the Application

### :sunglasses: Features

- Full User signup interface,
- Reset password email for user, using Amazon SES
- Update user profile, with avatar image storaged on Amazon S3
- Cache memory managing with redis
- Better user experience with message Toasts
- User Notifications, storing using mongoDB
- {...}


### :rocket: Used Technologies

Some of the technologies used in this project:

- [NodeJS](https://nodejs.org/en/)
- [ReactJS](https://pt-br.reactjs.org/)
- [ExpressJS](https://expressjs.com/pt-br/)
- [JWT](https://jwt.io/)
- [Yup](https://github.com/jquense/yup)
- [Styled-Components](https://styled-components.com/)
{...}

## :zap: Running the Project
#### Clone Repository
```sh
$ git clone https://github.com/rodrigogdev/GoBarber.git
$ cd GoBarber
```
#### Iniciando a API
```sh
$ cd backend

# Create a Docker image of the data base:
# Inside the project there is a docker-compose.yml file which has the
# PostgreSQL as database, just have the docker installed on your computer.
$ docker-compose up -d

# Rodando as migrations para o banco de dados e iniciando o projeto
# Run the migrations to build the tables on database
$ npm install && npm run typeorm migration:run && npm run dev:server
```

#### Iniciando o Frontend
```sh
$ cd web
$ npm install && npm start
```
### :memo: Licença

This project was developed under MIT licence. Read the file [LICENSE](LICENSE.md) to know more about it.

<p align="center" style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">Made with :purple_heart: by <strong> Rodrigo Gonçalves</strong> </p>