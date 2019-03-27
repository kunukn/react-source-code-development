import React from 'react';
import cx from 'classnames';
import './Hello.css';

const obj = {
  foo: {
    bar: {
      baz: 1,
    },
  },
};

const baz = obj?.foo?.bar?.baz;


let Hello = ({children}) => <p className='hello hello--awesome'>{children} {baz}</p>;
export default Hello;
