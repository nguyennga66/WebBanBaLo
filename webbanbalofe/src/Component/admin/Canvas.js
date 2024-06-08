import React, { useEffect, useRef } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  const data = [5, 20, 20, 30, 25, 20, 10, 28]; // Dữ liệu mẫu cho các cột
  const colors = ['blue']; // Màu sắc cho các cột

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        const width = 5; // Chiều rộng của mỗi cột
        const spacing = 5; // Khoảng cách giữa các cột

        data.forEach((value, index) => {
          const x = index * (width + spacing); 
          const y = canvas.height - value; 
          context.fillStyle = colors[index % colors.length]; 
          context.fillRect(x, y, width, value); 
        });
      } else {
        console.error('Unable to get 2D context');
      }
    } else {
      console.error('Unable to get canvas element');
    }
  }, [data, colors]);

  return (
    <li>
      <div id="sparklinedash">
        <canvas
          ref={canvasRef}
          width="200"
          height="50"
          style={{ display: 'inline-block', verticalAlign: 'top' }}
        ></canvas>
      </div>
    </li>
  );
};

export default Canvas;
