import { Button, Space } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ActionButton = ({ icon, color, onClick }) => (
  <Button icon={icon} style={{ fontSize: '16px', color }} onClick={onClick} />
);

const ActionButtons = ({ onView, onEdit, onDelete }) => (
  <Space>
    <ActionButton icon={<EyeOutlined />} color="#08c" onClick={onView} />
    <ActionButton icon={<EditOutlined />} color="#0000FF" onClick={onEdit} />
    {/* <ActionButton icon={<DeleteOutlined />} color="#FF0000" onClick={onDelete} /> */}
  </Space>
);

export default ActionButtons;