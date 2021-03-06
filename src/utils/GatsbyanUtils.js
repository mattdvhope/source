/************************
 * Made by [MR Ferry™]  *
 * on March 2020        *
 ************************/

import React from "react";
import { Link } from "gatsby";
import { kebabCase } from "lodash";
import { format } from "date-fns"

export const getTechTags = tags => {
  const techTags = new Set();
  if (tags) {
    tags.forEach((tag, i) => {
      const kebabTag = kebabCase(tag);
      techTags.add(
        <span key={kebabTag}>
          {i > 0 ? ", " : ""}
          <Link to={`/tags/${kebabTag}/`}>{tag}</Link>
        </span>
      );
    });
  }
  return techTags;
};

export const getPublishDate = date => format(Date.parse(date), "MMM do, yyyy");

export const getPublishDateTime = date => format(Date.parse(date), "MMM do, yyyy hh:mm a");

export const getMonthYearDate = date => format(Date.parse(date), "yyyy-MMMM");

export const getPlurals = count => {
  return count > 1 ? "s" : "";
};

export const PAGE_COUNT = 5;

export const DEFAULT_ICON_SIZE = 22;

