/************************
 * Made by [M Malone]  *
 * in July 2020        *
 ************************/

import React from "react";
import { FaLinkedin, FaGithubSquare, FaLine, FaFacebook, FaBloggerB } from "react-icons/fa";
import { GiPerson } from "react-icons/gi";
import "./sidebar/sidebar.css";

const buildSocialLink = (contact, title, color, Icon) => {
  return (
    <a className={`text-${color} p-2`} href={contact} target="_blank" rel="noopener noreferrer">
      <span title={title}>{<Icon size={26} />}</span>
    </a>
  );
};

const Socials = ({ mobile, contacts }) => {
  return (
    <div className={mobile ? `mobile-bio-main mobile-social pt-1` : "side-social-links float-left mt-3 mb-3"}>
      {buildSocialLink(contacts.linkedin, "Linked In", "primary", FaLinkedin)}
      {buildSocialLink(contacts.facebook, "Facebook", "info", FaFacebook)}
      {buildSocialLink(contacts.blogger, "Blogger", "warning", FaBloggerB)}
      {buildSocialLink(contacts.resume, "Resume", "danger", GiPerson)}
      {buildSocialLink(contacts.line, "Line", "success", FaLine)}
    </div>
  );
};

export default Socials;
