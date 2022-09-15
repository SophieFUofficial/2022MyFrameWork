import './App.css';
import Axios from '../public/utils/axios';
import Sample from './modules/sample';

function App() {
  const handleClick = () => {
    Axios.axiosGet('/test/apiSuccess').then(res => console.log(res, 'res'))
  };

  return (
    <div className="App">
      <button onClick={handleClick}>Get Axios Response</button>
      <br/>
      <br/>
      <br/>
      <Sample/>
    </div>
  );
}

export default App;
