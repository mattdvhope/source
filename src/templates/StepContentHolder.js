import React, { useState } from "react"
import Img from "gatsby-image";
import { youtubeEmbeddable } from "../utils/youtubeEmbeddable"
import YoutubeVideo from "./YoutubeVideo"
import ButtonForPrompt from "./ButtonForPrompt"
import CtaUnderVideo from "./CtaUnderVideo"

const ImgAndLinksHolder = ({data}) => {

  const prompts = data.promptsForResponse;
  const [promptsElementNum, setPrompt] = useState(0);
  const buttonWords = prompts[promptsElementNum].buttonInvitation;

  const ImgOrVideo = () => {
    if (data.youtubeUrl) {
      return <YoutubeVideo src={youtubeEmbeddable(data.youtubeUrl)} />
    } 
    else {
      return <Img
              className="feature-img"
              fluid={data.featureImage.fluid}
              objectFit="cover"
              objectPosition="50% 50%"
            />
    } 
  }

  const GoToNextPrompt = () => {setPrompt(promptsElementNum + 1); window.scrollTo(0, 0);}
  const GoToPreviousPrompt = () => {setPrompt(promptsElementNum - 1); window.scrollTo(0, 0);}

  const ButtonProvidedIfNeeded = () => {
    if (promptsElementNum === 0) {
      return (
        <div>
          <hr/>
          <ButtonForPrompt onClick={() => GoToNextPrompt()} buttonWords={buttonWords} />
          <hr/>
        </div>)
    } else if (promptsElementNum !== prompts.length-1) {
      return (
        <div>
          <hr/>
          <h2 onClick={() => GoToPreviousPrompt()} >⬅️&nbsp;</h2>
          <ButtonForPrompt onClick={() => GoToNextPrompt()} buttonWords={buttonWords} />
          <hr/>
        </div>)
    } else if (promptsElementNum === prompts.length-1) {
      return (
        <div>
          <br/>
          <h1 onClick={() => GoToPreviousPrompt()} >⬅️&nbsp;</h1>
          <hr/>
        </div>)
    }
  }

  return (
    <div id="ImgAndLinksHolder" className="container-fluid">
      <div>
        {ImgOrVideo()}
        <hr/>
        <div
          dangerouslySetInnerHTML={{
            __html: prompts[promptsElementNum].promptContent.childMarkdownRemark.html
          }}
        />
        {ButtonProvidedIfNeeded()}
      </div>
      <CtaUnderVideo data={data} />
    </div>
  )

}

export default ImgAndLinksHolder
