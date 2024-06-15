Tech Stack yang digunakan
Server :
PostgreSQL, Expressjs, Nodejs
Client :
React, Axios, bootstrap

Panduan penggunaan aplikasi :
1. lakukan clone github melalui link https://github.com/He12u/Technical_Test-IT_Trainer_Sekawan_Media.git
2. pada folder server install depedencies yang diperlukan melalui terminal dengan perintah "npm i"
3. buat file .env sesuai dengan env_template yang ada pada folder server
4. jalan perintah "npx sequelize db:create && npx sequelize db:migrate && npx sequelize db:seed:all"
5. jalankan server dengan perintah "npm run dev"
6. pada folder client install depedencies yang diperlukan melalui terminal dengan perintah "npm i"
7. jalankan client dengan perintah "npm run dev"

untuk melakukan uji coba daftar user dapat diakses melalui folder server -> data -> user.json

## List of Available Endpoints :

- 'POST /login'

routes below need authentication :

- 'GET /bookings'
- 'GET /vehicles'
- 'POST /vehicles/add'
- 'GET /employes'
- 'GET /employes/approvers'
- 'GET /drivers'

routes below need authorization :

- 'POST /bookings'
- 'PUT /bookings/:id'

&nbsp;


   
