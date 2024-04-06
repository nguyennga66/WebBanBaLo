import React from "react";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import couchImage from "../images/couch.png";
import personImage1 from "../images/person_1.jpg";
import personImage2 from "../images/person_2.jpg";
import personImage3 from "../images/person_3.jpg";
import personImage4 from "../images/person_4.jpg";


export default function About() {
  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>About Us</h1>
                <p className="mb-4">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>
                <p><a href="" className="btn btn-secondary me-2">Shop Now</a><a href="#" className="btn btn-white-outline">Explore</a></p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="hero-img-wrap">
                <img src={couchImage} className="img-fluid" alt="Couch" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="untree_co-section">
        <div className="container">

          <div className="row mb-5">
            <div className="col-lg-5 mx-auto text-center">
              <h2 className="section-title">Our Team</h2>
            </div>
          </div>

          <div className="row">

            <div className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0">
              <img src={personImage1} className="img-fluid mb-5" alt="Person 1" />
              <h3 className=""><a href="#"><span className="">Lawson</span> Arnold</a></h3>
              <span className="d-block position mb-4">CEO, Founder, Atty.</span>
              <p>Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
              <p className="mb-0"><a href="#" className="more dark">Learn More <span className="icon-arrow_forward"></span></a></p>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0">
              <img src={personImage2} className="img-fluid mb-5" alt="Person 2" />
              <h3 className=""><a href="#"><span className="">Jeremy</span> Walker</a></h3>
              <span className="d-block position mb-4">CEO, Founder, Atty.</span>
              <p>Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
              <p className="mb-0"><a href="#" className="more dark">Learn More <span className="icon-arrow_forward"></span></a></p>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0">
              <img src={personImage3} className="img-fluid mb-5" alt="Person 3" />
              <h3 className=""><a href="#"><span className="">Patrik</span> White</a></h3>
              <span className="d-block position mb-4">CEO, Founder, Atty.</span>
              <p>Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
              <p className="mb-0"><a href="#" className="more dark">Learn More <span className="icon-arrow_forward"></span></a></p>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0">
              <img src={personImage4} className="img-fluid mb-5" alt="Person 4" />
              <h3 className=""><a href="#"><span className="">Kathryn</span> Ryan</a></h3>
              <span className="d-block position mb-4">CEO, Founder, Atty.</span>
              <p>Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
              <p className="mb-0"><a href="#" className="more dark">Learn More <span className="icon-arrow_forward"></span></a></p>
            </div>

          </div>
        </div>
      </div>

      
    </div>
  );
}
