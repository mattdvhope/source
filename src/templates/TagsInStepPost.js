import React from "react"
import { Link } from "gatsby";
import kebabCase from "lodash/kebabCase"

const TagsInStepPost = ({tags}) => {
	return (
    <div className="left col-md-7 col-lg-8">
      <ul>
        {tags.map(tag => (
          <li key={tag}>
            <Link to={`/tags/${kebabCase(tag)}/`}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TagsInStepPost
