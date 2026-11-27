import { useAnecdotes, useAnecdotesAction, useFilter } from "../store";
import { useNotificationAction } from "../notificationStore";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { voteUpdate, remove } = useAnecdotesAction();
  const filter = useFilter();
  const setMessage = useNotificationAction();

  const vote = async (id, anecdote) => {
    await voteUpdate(id);
    setMessage(`you voted '${anecdote.content}'`);
  };

  const anecdotesToShow = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()),
  );

  const sortedAnecdotes = anecdotesToShow.toSorted((a, b) => b.votes - a.votes);

  const removeAnecdote = async (id) => {
    await remove(id);
    setMessage("Anecdote deleted");
  };

  return sortedAnecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
        {anecdote.votes === 0 && (
          <button onClick={() => removeAnecdote(anecdote.id)}>delete</button>
        )}
      </div>
    </div>
  ));
};

export default AnecdoteList;
