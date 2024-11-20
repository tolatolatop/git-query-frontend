import React from 'react';
import { Tabs } from 'antd';
import CommitsBetweenRefs from './components/CommitsBetweenRefs';
import CommitsByDepth from './components/CommitsByDepth';

const App: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h1>Git 提交查询</h1>
      <Tabs
        items={[
          {
            key: '1',
            label: '引用间提交查询',
            children: <CommitsBetweenRefs />,
          },
          {
            key: '2',
            label: '按深度查询提交',
            children: <CommitsByDepth />,
          },
        ]}
      />
    </div>
  );
};

export default App;
