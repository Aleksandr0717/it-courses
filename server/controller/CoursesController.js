import { auth_key, base_name } from '../ServerData.js'
import express from 'express'
import Airtable from 'airtable-node'
import { reFormaterResponseData } from '../ServerDataFunction.js'

const router = express.Router()

const airtable = new Airtable({ apiKey: auth_key }).base(base_name)
router.get('/', (req, res) => {
  airtable
    .table('coursesTypes')
    .list({
      sort: [{ field: 'Id' }],
    })
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

//отфильтрованный список курсов по языку программирования
router.get('/title/filtered', (req, res) => {
  const { courseType } = req.query
  airtable
    .table('coursesTitle')
    .list({
      sort: [{ field: 'Id' }],
      filterByFormula: `AND({Status} = 'Active', SEARCH('${courseType}', ARRAYJOIN(CourseTypeTitle, ',')))`
    })
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

router.put('/title', (req, res) => {
  try {
    const uid = req.body.id;
    delete req.body.id;
    airtable.table('coursesTitle').update(uid, {...req.body})
    .then((resp) => {
      if (resp.error) return res.status(404).json({ message: 'Произошла ошибка сервера' })
      return res.status(200).json({
        message: 'Данные успешно обновлены',
      })
    })
  } catch (error) {
    console.error('Ошибка при запросе к Airtable:', error);
    return res.status(500).json({
      message: 'Ошибка сервера'
    });
  }
})

router.get('/title/program', (req, res) => {
  const { courseId } = req.query
  airtable
    .table('coursesProgram')
    .list({
      filterByFormula: `SEARCH('${courseId}', ARRAYJOIN(CourseId, ','))`,
      sort: [{ field: 'Id' }],
      maxRecords: 1
    })
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

export default router
