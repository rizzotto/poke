import axios from 'axios'

const host = `http://${
  process.env.REACT_APP_ENV === 'homologation' ? 'TODO' : 'localhost'
}`
const port = process.env.REACT_APP_ENV === 'homologation' ? '8000' : '8080'

export default axios.create({
  baseURL: `${host}:${port}`,
})
