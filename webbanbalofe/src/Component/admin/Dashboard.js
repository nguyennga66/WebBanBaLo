import React from 'react';
import "../../css/admin.css"
import Canvas from "../../Component/admin/Canvas"

function Dashboard() {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-12">
          <div className="white-box analytics-info">
            <h3 className="box-title">Total Visit</h3>
            <ul className="list-inline two-part d-flex align-items-center mb-0">
              <Canvas />
              <li className="ms-auto"><span className="counter text-success">659</span></li>
            </ul>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="white-box analytics-info">
            <h3 className="box-title">Total Page Views</h3>
            <ul className="list-inline two-part d-flex align-items-center mb-0">
            <Canvas />
              <li className="ms-auto"><span className="counter text-purple">869</span></li>
            </ul>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="white-box analytics-info">
            <h3 className="box-title">Unique Visitor</h3>
            <ul className="list-inline two-part d-flex align-items-center mb-0">
            <Canvas />
              <li className="ms-auto"><span className="counter text-info">911</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
      <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
        <div className="white-box">
          <h3 className="box-title">Products Yearly Sales</h3>
          <div className="d-md-flex">
            <ul className="list-inline d-flex ms-auto">
              <li className="ps-3">
                <h5><i className="fa fa-circle me-1 text-info"></i>Mac</h5>
              </li>
              <li className="ps-3">
                <h5><i className="fa fa-circle me-1 text-inverse"></i>Windows</h5>
              </li>
            </ul>
          </div>
          <div id="ct-visits" style={{ height: '405px' }}>
            <div className="chartist-tooltip" style={{ top: '-17px', left: '-12px' }}>
              <span className="chartist-tooltip-value">6</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12 col-lg-12 col-sm-12">
        <div className="white-box">
          <div className="d-md-flex mb-3">
            <h3 className="box-title mb-0">Recent sales</h3>
            <div className="col-md-3 col-sm-4 col-xs-6 ms-auto">
              <select className="form-select shadow-none row border-top">
                <option>March 2021</option>
                <option>April 2021</option>
                <option>May 2021</option>
                <option>June 2021</option>
                <option>July 2021</option>
              </select>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table no-wrap">
              <thead>
                <tr>
                  <th className="border-top-0">#</th>
                  <th className="border-top-0">Name</th>
                  <th className="border-top-0">Status</th>
                  <th className="border-top-0">Date</th>
                  <th className="border-top-0">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td className="txt-oflo">Elite admin</td>
                  <td>SALE</td>
                  <td className="txt-oflo">April 18, 2021</td>
                  <td><span className="text-success">$24</span></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="txt-oflo">Real Homes WP Theme</td>
                  <td>EXTENDED</td>
                  <td className="txt-oflo">April 19, 2021</td>
                  <td><span className="text-info">$1250</span></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="txt-oflo">Ample Admin</td>
                  <td>EXTENDED</td>
                  <td className="txt-oflo">April 19, 2021</td>
                  <td><span className="text-info">$1250</span></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="txt-oflo">Medical Pro WP Theme</td>
                  <td>TAX</td>
                  <td className="txt-oflo">April 20, 2021</td>
                  <td><span className="text-danger">-$24</span></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td className="txt-oflo">Hosting press html</td>
                  <td>SALE</td>
                  <td className="txt-oflo">April 21, 2021</td>
                  <td><span className="text-success">$24</span></td>
                </tr>
                <tr>
                  <td>6</td>
                  <td className="txt-oflo">Digital Agency PSD</td>
                  <td>SALE</td>
                  <td className="txt-oflo">April 23, 2021</td>
                  <td><span className="text-danger">-$14</span></td>
                </tr>
                <tr>
                  <td>7</td>
                  <td className="txt-oflo">Helping Hands WP Theme</td>
                  <td>MEMBER</td>
                  <td className="txt-oflo">April 22, 2021</td>
                  <td><span className="text-success">$64</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;