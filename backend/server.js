
import bodyParser from 'body-parser';
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';


const PORT = process.env.PORT ?? 3000
const app = express();


app.use(cors());
app.use(bodyParser.json());

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
app.post('/register', async (req, res) => {
  const { username, password, policy } = req.body;
  console.log('Тело запроса:', req)

  // Валидация данных
  if (!username || !password) {
    return res.status(400).json({ error: 'Имя пользователя и пароль обязательны.' });
  }
  if(!policy){
    return res.status(400).json({ error: 'Нам нужно ваше согласие на обработку персональных данных' });
  }

  try {
    // Проверяем, существует ли уже такой пользователь
    connection.query('SELECT * FROM users WHERE name = ?', [username], async (err, results) => {
      if (err) {
        console.error('Ошибка при проверке пользователя в базе:', err);
        return res.status(500).json({ error: 'Ошибка базы данных.' });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'Пользователь с таким именем уже существует.' });
      }

      // Хешируем пароль
      const hashedPassword = await bcrypt.hash(password, 10);

      // Вставляем нового пользователя в базу
      connection.query('INSERT INTO users (name, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
        if (err) {
          console.error('Ошибка при добавлении пользователя:', err);
          return res.status(500).json({ error: 'Ошибка при добавлении пользователя.' });
        }

        // Ответ отправляется только один раз
        return res.status(201).json({ message: 'Пользователь успешно зарегистрирован!' });
      });
    });
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
  }
});

app.post('/login', async (req, res) => {
  const {username, password} = req.body;
  if(!username || !password){
    return res.status(401).json({error: "Имя пользователь и пароль обязательны."})
  }
  try{
    connection.query('SELECT * FROM users WHERE name = ?', [username], async (err, result) =>{
      if(err){
        return res.status(400).json({error: 'Ошибка при попытке взять значение из базы данных'})
      }
      console.log(result);
      if(result.length === 0){
        return res.status(400).json({error: 'Пользователь не найден'})
      }
      const user = result[0];
  
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        return res.status(400).json({error: "Неверный пароль"})
      }
      const token = jwt.sign({ userId: user.id, username: user.name }, 'secretKey', {
        expiresIn: '1h' // Токен действует 1 час
      });
      return res.status(200).json({ token });
    })
  }
  catch (error) {
    console.error('Ошибка при авторизации:', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
  }
  
})

app.post('/comments', async (req, res) => {
  const {estimation, comment, name, tel, privacy} = req.body;
  const regex = /^\+7 \(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
  const errors = {
    estimation: "Вам нужно оценить нас)",
    comment: "Вы не заполнили поле \"Ваш отзыв\"",
    name: "Пожалуйста, заполните поле \"Имя\"",
    tel: "Нам нужен ваш номер телефона, чтобы мы могли связаться с вами",
    telRegex: "Вы не до конца ввели номер телефона",
    privacy: "Нам необходимо ваше согласие на Обработку персональных данных"
  }

  if(!estimation) return res.status(400).json({error: errors.estimation});
  if(!comment) return res.status(400).json({error: errors.comment});
  if(!name) return res.status(400).json({error: errors.name});
  if(!tel) return res.status(400).json({error: errors.tel});
  if(!privacy) return res.status(400).json({error: errors.privacy});
  if(!tel.match(regex)) return res.status(400).json({error: errors.telRegex});

  try{
    connection.query('INSERT INTO comments (estimation, comment, name, tel) VALUES (?, ?, ?, ?)', [estimation, comment, name, tel], ((err, result)=>{
      if(err){
        console.error("Ошибка при запросе к базе данных:", err); 
        return res.status(400).json({error: "Ошибка при запросе к базе данных"})
      }
      return res.status(201).json({message: "Ваш комментарий был успешно добавлен!"})
    }))
  }catch(err){
    console.error("Техническая ошибка:", err); // Логирование технической ошибки
    return res.status(400).json({error: "Технические шоколадки :)"})
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})