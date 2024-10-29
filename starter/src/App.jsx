import { ToastContainer } from 'react-toastify'
import { nanoid } from 'nanoid'
import Form from './Form'
import Items from './Items'
import { useEffect, useState } from 'react'
import fetchCustom from './utils'

const defaultItems = [
  { id: nanoid(), title: 'walk the dog', isDone: false },
  { id: nanoid(), title: 'wash dishes', isDone: false },
  { id: nanoid(), title: 'drink coffee', isDone: true },
  { id: nanoid(), title: 'take a nap', isDone: false }
]

const App = () => {
  const [items, setItems] = useState(defaultItems)

  const fetchData = async () => {
    try {
      const { data } = await fetchCustom()

      console.log(data)
      setItems(data.taskList)
    } catch (error) {}
  }

  // To perform side effects, fetch, DOM manipulations etc, using some service
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <section className="section-center">
      <ToastContainer position="top-center" />
      <Form />
      <Items items={items} />
    </section>
  )
}
export default App
