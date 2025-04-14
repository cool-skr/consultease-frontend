import React from 'react';

const FileItem = ({ href, onDelete }) => {
  return (
    <div style={styles.container}>
      <a href={href} target="_blank" rel="noopener noreferrer" style={styles.link}>
        {href}
      </a>
      <button onClick={() => onDelete(href)} style={styles.deleteButton}>Delete</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ccc',
    marginBottom: '8px',
  },
  link: {
    textDecoration: 'none',
    color: '#007BFF',
    fontSize: '16px',
  },
  deleteButton: {
    backgroundColor: '#FF4C4C',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default FileItem;
