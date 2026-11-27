import { useAnecdotesAction } from "../store";

const Filter = () => {
  const { setFilter } = useAnecdotesAction();
  const handleChange = (e) => {
    const value = e.target.value;
    setFilter(value);
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} data-testid="filter" />
    </div>
  )
}

export default Filter
