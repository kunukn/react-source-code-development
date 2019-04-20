import React, { Fragment, StrictMode, lazy, Suspense } from 'react'; // uses Webpack alias
import ReactDOM from 'react-dom'; // uses Webpack alias
import 'components/Base/base.css';

const simulateLatencyMSec = 800;
const Hello = lazy(() => import('./components/Hello')
  .then(x => new Promise(resolve => setTimeout(() => resolve(x), simulateLatencyMSec))));

  const obj = {
    foo: {
      bar: {
        baz: 42
      },
    },
  };

  const baz = obj?.foo?.bar?.baz; // 42

ReactDOM.render(
  <StrictMode>
    <Fragment>
    { do { 
      if (true) <div>I can use <strong>if</strong> syntax in React render method</div>; } 
    }
    <Suspense fallback={<div style={{fontSize: '10rem'}}>loading...</div>}>
      <Hello>React source code development</Hello>
    </Suspense>
    </Fragment>
  </StrictMode>,
  document.getElementById('root')
);

ReactDOM.consoleLog && ReactDOM.consoleLog('%c I updated the react-dom code! ', 'background: #000; color: #fff');
