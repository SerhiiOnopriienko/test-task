import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProtectedRouter from './routes/ProtectedRouter';
import Login from './Components/Login';
import TableContent from './Components/TableContent';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRouter
                redirectTo='/login'
                children={<TableContent />}
              />
            }
          />
          <Route path='login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
