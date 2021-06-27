import logo from './maxlogo.png';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>A NodeJS Backend Task by IkennaGIfenna</p>
        <a
          className='App-link'
          href='https://max.ng/'
          target='_blank'
          rel='noopener noreferrer'>
          Visit Max.ng
        </a>
      </header>
    </div>
  );
};

export default App;
