import express from 'express'
import router from "./routes"
import * as swaggerUi  from 'swagger-ui-express'

const swaggerDocument = require('./swagger_output.json')

const app = express()

app.use(express.json())
app.use(router)

app.listen(3000, () => console.log('Server is running at http://localhost:3000'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

