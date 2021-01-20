import React, { Component } from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";
import moment from "moment";

export default class Steps extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="steps-section section" id="Steps">
        <div className="container">
          <div className="section-head">
            <h2>Steps</h2>
          </div>
          <ul
            className={`steps-list ${data.edges.length < 5 ? "few-steps" : ""}`}
          >
            {data.edges.map((item, index) => {
              return (
                <li key={index} className="item">
                  <div className="inner">
                    <Link className="link" to={`/${item.node.slug}`} />

                    {item.node.featureImage ? (
                      <Img
                        fluid={item.node.featureImage.fluid}
                        objectFit="cover"
                        objectPosition="50% 50%"
                      />
                    ) : (
                      <div className="no-image"></div>
                    )}
                    <div className="details">
                      <h3 className="title">{item.node.title}</h3>
                      <span className="date">
                        <i className="fas fa-calendar-alt"></i>{" "}
                        {moment(item.node.createdAt).format("LL")}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="see-more">
            <Link to="/steps">
              <span>More Steps</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
