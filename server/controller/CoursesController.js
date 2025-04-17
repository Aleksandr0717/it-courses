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

router.get('/title', (req, res) => {
  airtable
    .table('coursesTitle')
    .list({
      sort: [{ field: 'Id' }],
      filterByFormula: `SEARCH('python', ARRAYJOIN(CourseTypeTitle, ','))`
      // filterByFormula: `{CourseType} = [${}]`
    })
    .then((resp) => {
      console.log(resp)
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
