import { useState } from 'react';

import { Button, Divider, Form, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const DecryptForm = () => {
    const [decryptedMessage, setMessage] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = async values => {
        try {
            setSubmitting(true);

            const response = await fetch('https://us-central1-sql-academy-285317.cloudfunctions.net/decrypt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const messageData = await response.json();

            setMessage(messageData.decryptedMessage);
        } catch (e) {
            message.error('Не удалось сохранить сообщение.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Form onFinish={onSubmit} layout="vertical">
                <Form.Item label="Зашифрованное сообщение" name="encryptedMessage" rules={[{ required: true, message: 'Введите сообщение!' }]}>
                    <TextArea />
                </Form.Item>

                <Form.Item label="Секретный ключ" name="secretKey" rules={[{ required: true, message: 'Введите ключ!' }]}>
                    <TextArea />
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                    Submit
                </Button>
            </Form>

            <Divider />

            <TextArea value={decryptedMessage} placeholder="Расшифрованное сообщение" />
        </>
    );
};

export default DecryptForm;
