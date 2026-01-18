import BookForm from './components/BookForm';
import './App.css'

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: 'auto' }}>
      <h1>Mini Book CMS</h1>
      <BookForm />
    </div>
  );
}
