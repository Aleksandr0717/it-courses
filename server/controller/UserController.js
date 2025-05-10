import { auth_key, base_name } from '../ServerData.js'
import express from 'express'
import Airtable from 'airtable-node'
import { reFormaterResponseData } from '../ServerDataFunction.js'

const router = express.Router()
const airtable = new Airtable({ apiKey: auth_key }).base(base_name).table('users')

router.get('/', (req, res) => {
  airtable
    .list({})
    .then((resp) => {
      try {
        const records = reFormaterResponseData(resp.records)
        res.json(records)
      } catch (err) {
        console.error('Ошибка при обработке данных:', err)
        res.status(500).json({ error: 'Ошибка при обработке данных' })
      }
    })
    .catch((err) => {
      console.error('Ошибка при получении данных из Airtable:', err)
      res.status(500).json({ error: 'Ошибка при получении данных из Airtable' })
    })
})

router.get('/login', (req, res) => {
  const { login, password } = req.query

  if (!login || !password) {
    return res.status(400).json({ message: 'Не заполнены обязательные поля' })
  }

  airtable
    .list({
      filterByFormula: `AND({Login} = '${login}', {Password} = '${password}')`,
      maxRecords: 1,
    })
    .then((resp) => {
      if (resp.error) return res.status(404).json({ message: 'Произошла ошибка сервера' })
      if (reFormaterResponseData(resp.records)[0].status === 'Deleted') {
        return res.status(404).json({ message: 'Неверный логин или пароль' })
      } 
      if (resp.records.length > 0) {
        const user = reFormaterResponseData(resp.records)[0]
        return res.status(200).json({ message: 'Успешный вход', user })
      } else {
        return res.status(404).json({ message: 'Неверный логин или пароль' })
      }
    })
    .catch((err) => {
      console.error('Ошибка при запросе к Airtable:', err)
      return res.status(500).json({ message: 'Ошибка сервера' })
    })
})

router.get('/:userId', (req, res) => {
  const { userId } = req.params
  airtable
    .list({
      filterByFormula: `{ID} = '${userId}'`,
      maxRecords: 1,
    })
    .then((resp) => {
      if (resp.error) return res.status(404).json({ message: 'Произошла ошибка сервера' })
      if (resp.records.length > 0) {
        const user = reFormaterResponseData(resp.records)[0]
        return res.status(200).json(user)
      } else {
        return res.status(404).json({ message: 'Пользователь не найден' })
      }
    })
})

router.post('/', (req, res) => {
  try {
    airtable.create({...req.body})
    .then((resp) => {
      if (resp.error) return res.status(404).json({ message: 'Произошла ошибка сервера' })
      return res.status(200).json({
        message: 'Пользователь успешно зарегистрирован',
      });
    })
  } catch (error) {
    console.error('Ошибка при запросе к Airtable:', error);
    return res.status(500).json({ 
      message: 'Ошибка сервера'
    });
  }
});

router.put('/', (req, res) => {
  try {
    const uid = req.body.id;
    delete req.body.id;
    airtable.update(uid, {...req.body})
    .then((resp) => {
      if (resp.error) return res.status(404).json({ message: 'Произошла ошибка сервера' })
      if (Object.keys(req.body.fields).length > 1) {
        return res.status(200).json({
          message: 'Данные успешно обновлены',
        });
      } else {
        return res.status(200).json({
          message: 'Аккаунт был удален',
        });
      }
    })
  } catch (error) {
    console.error('Ошибка при запросе к Airtable:', error);
    return res.status(500).json({
      message: 'Ошибка сервера'
    });
  }
})
  
export default router
