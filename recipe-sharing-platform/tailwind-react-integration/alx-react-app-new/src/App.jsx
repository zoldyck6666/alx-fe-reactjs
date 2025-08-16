import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import Counter from './components/Counter';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      backgroundColor: '#f5f5f5'
    }}>
      <Header />
      <MainContent />
      <UserProfile name="El Mehdi" age={25} bio="I love exploring cities and coding React apps." />
      <Counter />
      <Footer />
    </div>
  );
}

export default App;
