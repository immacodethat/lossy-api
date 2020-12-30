const express = require('express')
const rateLimit = require('express-rate-limit')
const chaos = require('chaos-middleware')

const port = 3000

const app = express()

const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 5 // limit each IP to 5 requests per windowMs
})

const monkey = chaos({
  probability: 0.1,
  rules: [
    { event: 'httpStatus', params: 500 }
  ]
})

app.get('/next/:value', limiter, monkey, (req, res) => {
  nextValue = parseInt(req.params['value']) + 1
  res.json({ result: nextValue })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})