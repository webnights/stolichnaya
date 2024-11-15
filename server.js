
import bodyParser from 'body-parser';
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcryptjs'

const PORT = process.env.PORT ?? 3000
const app = express();

app.use(bodyParser.json());
app.use(cors())


const databaseLogs = {
  host: 'localhost',
  user: 'root',
  password: '624848(((((Kk',
  database: 'stolichnaya'
}
const tables = {
  advantages: 'advantages',
  schedules: 'schedules',
  contacts: 'contacts',
  users: 'users'
}
const connection = mysql.createConnection(databaseLogs)

connection.connect((error) => {
  if (error) {
    console.log('Ошибка соединения с базой данных')
    throw error;
  }
  console.log('Успешное соединение с базой данных')

});


app.get("/", (req, res) => {
  connection.query(`SELECT * FROM ${tables.advantages}`, (error, data) => {
    if (error) {
      console.log(error);
      throw error;
    }
    res.send(data);
  })
})

app.get("/schedules", (req, res) => {
  connection.query(`SELECT * FROM ${tables.schedules}`, (error, data) => {
    if (error) {
      console.log(error);
      throw error;
    }
    res.send(data);
  })
})

app.get("/contacts", (req, res) => {
  connection.query(`SELECT * FROM ${tables.contacts}`, (error, data) => {
    if (error) {
      console.log(error);
      throw error;
    }
    res.send(data);
  })
})
app.get('/buses', (req, res) => {
  const sql = `
      SELECT
        buses.id       as bus_id,
        buses.name         as bus_name,
        buses.small_description as small_description,
        buses.image as bus_image,
        buses.description  as bus_description,
        buses_types.name   as bus_type,
        params.name        as param,
        buses_params.value as param_value 

        FROM stolichnaya.buses
        INNER JOIN
            stolichnaya.buses_types ON buses_types.id = buses.type_id
        INNER JOIN 
            stolichnaya.buses_params ON buses.id = buses_params.bus_id
        INNER JOIN 
            stolichnaya.params ON buses_params.param_id = params.id;
    `;

    connection.query(sql, (err, data) => {
      if (err) throw err;
  
      const result = {};
  
      data.forEach(row => {
        const { bus_id, bus_name, small_description, bus_image, bus_description, bus_type, param, param_value } = row;
  
        if (!result[bus_id]) {
          result[bus_id] = {
            id:bus_id,
            name:bus_name,
            description:small_description,
            image:bus_image,
            fulldescription:bus_description,
            type:bus_type,
            params: []
          };
        }
  
        result[bus_id].params.push({ param, value: param_value });
      });
  
      res.json(Object.values(result)); 
   
  });
});




app.listen(PORT, () => console.log("Сервер был успешно запущен"))