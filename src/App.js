import React, { useState } from 'react';

import { Tabs } from 'antd';
import 'antd/dist/antd.css';

import EncryptForm from './components/EncryptForm';
import DecryptForm from './components/DecryptForm';

const { TabPane } = Tabs;

function App() {
    const [activeTab, setActiveTab] = useState('encrypt');

    return (
        <Tabs activeKey={activeTab} onChange={setActiveTab} className="crypto-tabs">
            <TabPane tab="Шифрование" key="encrypt">
                <EncryptForm />
            </TabPane>
            <TabPane tab="Дешифрование" key="decrypt">
                <DecryptForm />
            </TabPane>
        </Tabs>
    );
}

export default App;
