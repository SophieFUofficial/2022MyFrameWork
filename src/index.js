import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (module.hot) {
    //如果accept传了依赖, 只会执行依赖对应的回调
    // todo 使用react-hot-loader 在Router文件中配置
    module.hot.accept('./App', () => {
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
    })
}
