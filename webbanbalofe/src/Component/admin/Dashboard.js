import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Canvas from "../../Component/admin/Canvas";
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [viewData, setViewData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [error, setError] = useState(null);
  const [totalFavorites, setTotalFavorites] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch views data
        const viewsResponse = await fetch('http://localhost:8080/products/views');
        if (!viewsResponse.ok) {
          throw new Error('Failed to fetch views data');
        }
        const viewsData = await viewsResponse.json();
        setViewData(viewsData);

        // Fetch purchases data
        const purchasesResponse = await fetch('http://localhost:8080/products/purchases');
        if (!purchasesResponse.ok) {
          throw new Error('Failed to fetch purchases data');
        }
        const purchasesData = await purchasesResponse.json();
        setPurchaseData(purchasesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data: ' + error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await axios.get('http://localhost:8080/revenue');
        setTotalRevenue(response.data);
      } catch (error) {
        console.error('Error fetching total revenue', error);
      }
    };

    fetchTotalRevenue();
  }, []);

  useEffect(() => {
    const fetchTotalFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:8080/totalFavorites');
        setTotalFavorites(response.data);
      } catch (error) {
        console.error('Error fetching total favorites', error);
      }
    };

    fetchTotalFavorites();
  }, []);

  useEffect(() => {
    const fetchTotalViews = async () => {
      try {
        const response = await axios.get('http://localhost:8080/totalViews');
        setTotalViews(response.data);
      } catch (error) {
        console.error('Error fetching total views', error);
      }
    };

    fetchTotalViews();
  }, []);

  // Check if data is loaded and valid
  if (!viewData.length || !purchaseData.length) {
    console.log('No data loaded yet');
    return <div>Loading data...</div>;
  }

  // Sort and filter top 10 products with view data
  const topViewData = [...viewData]
    .filter(item => item.viewCount > 0)
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 10);

  // Sort and filter top 10 products with purchase data
  const topPurchaseData = [...purchaseData]
    .filter(item => item.purchaseCount > 0)
    .sort((a, b) => b.purchaseCount - a.purchaseCount)
    .slice(0, 10);

  // Map data for chart
  const viewsChartData = {
    labels: topViewData.map(item => item.id), // Using productId for labels
    datasets: [
      {
        label: 'Lượt xem',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: topViewData.map(item => item.viewCount)
      }
    ]
  };

  const purchasesChartData = {
    labels: topPurchaseData.map(item => item.id), // Using productId for labels
    datasets: [
      {
        label: 'Lượt mua',
        backgroundColor: 'rgba(54, 162, 235, 0.4)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.6)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data: topPurchaseData.map(item => item.purchaseCount)
      }
    ]
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-12">
          <div className="white-box analytics-info">
            <h3 className="box-title">Tổng doanh thu</h3>
            <ul className="list-inline two-part d-flex align-items-center mb-0">
              <Canvas />
              <li className="ms-auto"><span className="counter text-success">{totalRevenue}000</span></li>
            </ul>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="white-box analytics-info">
            <h3 className="box-title">Tổng lượt xem</h3>
            <ul className="list-inline two-part d-flex align-items-center mb-0">
              <Canvas />
              <li className="ms-auto"><span className="counter text-purple">{totalViews}</span></li>
            </ul>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="white-box analytics-info">
            <h3 className="box-title">Tổng lượt thích</h3>
            <ul className="list-inline two-part d-flex align-items-center mb-0">
              <Canvas />
              <li className="ms-auto"><span className="counter text-info">{totalFavorites}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="white-box">
            <h4>Lượt xem sản phẩm</h4>
            <Bar data={viewsChartData} />
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="white-box">
            <h4>Lượt mua sản phẩm</h4>
            <Bar data={purchasesChartData} />
          </div>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Dashboard;
