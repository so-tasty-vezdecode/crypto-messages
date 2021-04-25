import { Button, Form, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useCallback, useState } from 'react';
import EncryptModal from './EncryptModal';

const EncryptForm = () => {
    const [isModalVisible, setModalVisibility] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);

    const [messageData, setMessageData] = useState({
        encryptedMessage: null,
        secretKey: null,
    });

    const toggleModal = useCallback(() => {
        setModalVisibility(!isModalVisible);
    }, [isModalVisible]);

    const onSubmit = async values => {
        try {
            setSubmitting(true);

            const response = await fetch('https://us-central1-sql-academy-285317.cloudfunctions.net/encrypt', {
                method: 'POST',
                header: {
                    'Content-Type': 'text/plain',
                },
                body: values.message,
            });

            const messageData = await response.json();

            setModalVisibility(true);

            setMessageData(messageData);
        } catch (e) {
            message.error('Не удалось сохранить сообщение.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <EncryptModal
                isVisible={isModalVisible}
                closeModal={toggleModal}
                {...messageData}
            />
            <Form onFinish={onSubmit} layout="vertical">
                <Form.Item label="Сообщение" name="message" rules={[{ required: true, message: 'Введите сообщение!' }]}>
                    <TextArea />
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default EncryptForm;
