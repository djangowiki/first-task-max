import './App.css';
const App = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <img
          src='https://max.ng/images/logo2.png'
          className='App-logo'
          alt='logo'
        />
        <p>A NodeJS Backend Task by IkennaGIfenna</p>
        <a
          className='App-link'
          href='https://github.com/djangowiki/first-task-max'
          target='_blank'
          rel='noopener noreferrer'>
          Github Repo
        </a>
        <a
          className='App-link'
          href='https://documenter.getpostman.com/view/9429895/Tzedi5MS'
          target='_blank'
          rel='noopener noreferrer'>
          API Documentation.
        </a>
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
