import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

test('renders initial todos', () => {
  render(<TodoList />);
  expect(screen.getByText('Learn React')).toBeInTheDocument();
  expect(screen.getByText('Build Todo App')).toBeInTheDocument();
});

test('can add a new todo', () => {
  render(<TodoList />);
  fireEvent.change(screen.getByPlaceholderText(/add todo/i), { target: { value: 'New Todo' } });
  fireEvent.click(screen.getByText(/add/i));
  expect(screen.getByText('New Todo')).toBeInTheDocument();
});

test('can toggle todo', () => {
  render(<TodoList />);
  const todo = screen.getByText('Learn React');
  fireEvent.click(todo);
  expect(todo).toHaveStyle('text-decoration: line-through');
});

test('can delete todo', () => {
  render(<TodoList />);
  const todo = screen.getByText('Build Todo App');
  fireEvent.click(todo.nextSibling); // Delete button
  expect(todo).not.toBeInTheDocument();
});
