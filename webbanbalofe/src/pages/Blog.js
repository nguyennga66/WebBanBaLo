import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import Testimonial from "../Component/Testimonial";

export default function Blog() {
  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Blog</h1>
                <p className="mb-4">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>
                <p><a href="" className="btn btn-secondary me-2">Shop Now</a><a href="#" className="btn btn-white-outline">Explore</a></p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="hero-img-wrap">
                <img src={require("../images/couch.png")} className="img-fluid" alt="Couch" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="blog-section">
        <div className="container">

          <div className="row">

            {[...Array(3)].map((_, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 mb-5">
                <div className="post-entry">
                  <NavLink to="#" className="post-thumbnail"><img src={require(`../images/post-${index + 1}.jpg`)} alt="Image" className="img-fluid" /></NavLink>
                  <div className="post-content-entry">
                    <h3><NavLink to="#">First Time Home Owner Ideas</NavLink></h3>
                    <div className="meta">
                      <span>by <NavLink to="#">Kristin Watson</NavLink></span> <span>on <NavLink to="#">Dec {20 - index * 3}, 2021</NavLink></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

     <Testimonial />
    </div>
  );
}
