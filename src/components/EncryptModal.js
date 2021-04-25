import { Descriptions, Modal, Typography } from 'antd';

const EncryptModal = ({ isVisible, closeModal, encryptedMessage, secretKey }) => {
    return (
        <>
            <Modal title="Данные о сообщении" visible={isVisible} onOk={closeModal} onCancel={closeModal}>
                <Descriptions layout="vertical" column={1}>
                    <Descriptions.Item label={<Typography.Text strong>Зашифрованное сообщение</Typography.Text>}>
                        <Typography.Text copyable>{encryptedMessage}</Typography.Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={<Typography.Text strong>Ключ для расшифровки</Typography.Text>}>
                        <Typography.Text copyable>{secretKey}</Typography.Text>
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    );
};

export default EncryptModal;
