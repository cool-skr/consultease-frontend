import { Box } from '@mui/material';

export default function Loading() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <div className="spinner">
        <div className="spinner-inner"></div>
      </div>

      <style jsx>{`
        .spinner {
          width: 60px;
          height: 60px;
          position: relative;
        }
        
        .spinner-inner {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 4px solid transparent;
          border-top-color: #1976d2;
          border-radius: 50%;
          animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }
        
        .spinner-inner::before,
        .spinner-inner::after {
          content: '';
          position: absolute;
          border-radius: 50%;
        }
        
        .spinner-inner::before {
          top: 6px;
          left: 6px;
          right: 6px;
          bottom: 6px;
          border: 4px solid transparent;
          border-top-color: #4caf50;
          animation: spin 1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }
        
        .spinner-inner::after {
          top: 16px;
          left: 16px;
          right: 16px;
          bottom: 16px;
          border: 4px solid transparent;
          border-top-color: #ff9800;
          animation: spin 0.8s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
}
