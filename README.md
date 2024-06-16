## Video Demo untuk persiapan

Video Demo untuk persiapan [Video Demo](https://www.loom.com/share/3a662c31f8f54e9b97cce0e726043f9d?sid=b3d8d2bb-54c0-4b0a-a951-262b30572b4f).

## Tech Stack

### Server :
- PostgreSQL
- Expressjs
- Nodejs
### Client :
- React
- Axios
- bootstrap

### Panduan penggunaan aplikasi :
1. lakukan clone github melalui link https://github.com/He12u/Technical_Test-IT_Trainer_Sekawan_Media.git
   ```
   git clone https://github.com/He12u/Technical_Test-IT_Trainer_Sekawan_Media.git
   ```
2. pada folder server install depedencies yang diperlukan
   ```
   cd server
   npm i
   ```
3. buat file .env sesuai dengan env_template yang ada pada folder server
4. setup database
   ```
   npx sequelize db:create && npx sequelize db:migrate && npx sequelize db:seed:all
   ```
5. jalankan server
   ```
   npm run dev
   ```
7. pada folder client install depedencies yang diperlukan
   ```
   cd client
   npm i
   ```
9. jalankan client
   ```
   npm run dev
   ```

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


   
