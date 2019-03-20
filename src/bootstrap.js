import React, { StrictMode, lazy, Suspense } from 'react'; // uses Webpack alias
import ReactDOM from 'react-dom'; // uses Webpack alias
import 'components/Base/base.css';

const simulateLatencyMSec = 800;
const Hello = lazy(() => import('./components/Hello/Hello.jsx')
  .then(x => new Promise(resolve => setTimeout(() => resolve(x), simulateLatencyMSec))));

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={<div style={{fontSize: '10rem'}}>loading...</div>}>
      <Hello>React source code development</Hello>
    </Suspense>
  </StrictMode>,
  document.getElementById('root')
);

ReactDOM.consoleLog && ReactDOM.consoleLog('%c I updated the react-dom code! ', 'background: #000; color: #fff');
