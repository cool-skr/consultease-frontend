import React from 'react';
import { Typography, Button, Tooltip } from 'antd';
import {
  PaperClipOutlined,
  DeleteOutlined,
  CopyOutlined,
} from '@ant-design/icons';

const { Link } = Typography;

const FileItem = ({ href, onDelete }) => {
  return (
    <div style={styles.container}>
      <PaperClipOutlined style={{ color: '#595959', marginRight: 6 }} />
      <Link
        href={href}
        target="_blank"
        copyable
        ellipsis
        style={styles.link}
      >
        {href.trim()}
      </Link>
      <Tooltip title="Remove">
        <Button
          type="text"
          icon={<DeleteOutlined />}
          size="small"
          danger
          onClick={() => onDelete()}
        />
      </Tooltip>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 8,
    gap: 8,
    maxWidth: 800,
    overflow: 'hidden',
  },
  name: {
    fontWeight: 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 160,
  },
  link: {
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginLeft: 8,
  },
};

export default FileItem;
