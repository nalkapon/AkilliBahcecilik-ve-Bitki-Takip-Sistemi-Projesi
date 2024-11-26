import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Dashboard = () => {
  const data = {
    labels: ['Gül', 'Lale', 'Papatya'],
    datasets: [
      {
        label: 'Toplam Bitki Sayısı',
        data: [10, 7, 5],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h3>Bitki Durumları</h3>
        <Bar data={data} />
      </div>
      <div>
        <h3>İklim Verileri ve Diğer Aktiviteler</h3>
        {/* Burada iklim ve diğer aktivitelerle ilgili verileri gösterebilirsiniz */}
      </div>
    </div>
  );
};

export default Dashboard;
