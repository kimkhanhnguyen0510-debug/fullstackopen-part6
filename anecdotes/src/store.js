import { create } from "zustand";
import anecdoteService from "./services/anecdoteService";

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: "",
  actions: {
    voteUpdate: async (id) => {
      const anecdote = get().anecdotes.find((a) => a.id === id);
      const updated = await anecdoteService.update(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });
      set((state) => ({
        anecdotes: state.anecdotes.map((a) => (a.id === id ? updated : a)),
      }));
    },
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content);
      set((state) => ({ anecdotes: state.anecdotes.concat(newAnecdote) }));
    },
    setFilter: (value) => set({ filter: value }),
    setAnecdotes: async () => {
      const anecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes }));
    },
    remove: async (id) => {
      await anecdoteService.remove(id)
      set((state) => ({
        anecdotes: state.anecdotes.filter((anecdote) => anecdote.id !== id)
      }))
    }
  },
}));

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes);
export const useFilter = () => useAnecdoteStore((state) => state.filter);
export const useAnecdotesAction = () =>
  useAnecdoteStore((state) => state.actions);
