import { useAnecdotesAction } from "../store"
import { useNotificationAction } from "../notificationStore"

const AnecdoteForm = () => {
  const { add } = useAnecdotesAction()
  const setMessage = useNotificationAction()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    await add(content)
    setMessage(`'${content}' is created`)
    e.target.reset()
  }

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input data-testid="new" name="anecdote" />
      </div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm