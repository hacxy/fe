import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
import { CommonNavBar, CommonTabbar } from './components';
import './App.css';

function App() {
  return (
    <div className={classNames('page-wrapper')}>
      <CommonNavBar />
      <div className={classNames('page-content')}>
        <Outlet />
      </div>
      <CommonTabbar />
    </div>
  );
}

export default App;
