import express from 'express'
import cors from 'cors'
import { nanoid } from 'nanoid'
const app = express()
import morgan from 'morgan'

// JSON data on the server
let taskList = [
  { id: nanoid(), title: 'walk the dog', isDone: false },
  { id: nanoid(), title: 'wash dishes', isDone: false },
  { id: nanoid(), title: 'drink coffee', isDone: true },
  { id: nanoid(), title: 'take a nap', isDone: false },
  { id: nanoid(), title: 'sleep on time', isDone: true }
]

// In the development, we'll have these morgan generated METHOD, /resource/ time Status in the console.
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// Again middleware for cors()
app.use(cors())
// For Json API, I believe
app.use(express.json())

// Root request, but much here honestly
app.get('/', (req, res) => {
  res.send('<h1>Welcome to React Query! I am your server to serve pages</h1> ')
})

// Get request to fetch resource tasks
app.get('/api/tasks', (req, res) => {
  res.json({ taskList })
})

app.post('/api/tasks', (req, res) => {
  const { title } = req.body
  if (!title) {
    res.status(400).json({ msg: 'please provide title' })
    return
  }
  const newTask = { id: nanoid(), title, isDone: false }
  taskList = [...taskList, newTask]
  res.json({ task: newTask })
})

app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params
  const { isDone } = req.body

  taskList = taskList.map(task => {
    if (task.id === id) {
      return { ...task, isDone }
    }
    return task
  })

  res.json({ msg: 'task updated' })
})

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params
  taskList = taskList.filter(task => task.id !== id)

  res.json({ msg: 'task removed' })
})

app.use((req, res) => res.status(404).send('Route does not exist'))

const port = process.env.PORT || 5000

const startApp = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

startApp()
