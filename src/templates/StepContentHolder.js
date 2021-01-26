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

  const scrollToTopOfBox = () => document.getElementById('promptScrollBox').scrollTop = 0;
  const GoToNextPrompt = () => { setPrompt(promptsElementNum + 1); scrollToTopOfBox(); }
  const GoToPreviousPrompt = () => { setPrompt(promptsElementNum - 1); scrollToTopOfBox(); }

  const ButtonProvidedIfNeeded = () => {
    if (promptsElementNum === 0) {
      return (
        <div>
          <ButtonForPrompt onClick={() => GoToNextPrompt()} buttonWords={buttonWords} />
          <hr/>
        </div>)
    } else if (promptsElementNum !== prompts.length-1) {
      return (
        <div>
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
        <div
          id="promptScrollBox"
          style={{width:`100%`,height:`200px`,lineHeight:`1.5em`,overflowY:`scroll`,padding:`5px`,backgroundColor:`#FCFADD`,color:`#714D03`,border:`4px double #DEBB07`}}
          dangerouslySetInnerHTML={{
            __html: prompts[promptsElementNum].promptContent.childMarkdownRemark.html
          }}
        />
        {ButtonProvidedIfNeeded()}
      </div>
    </div>
  )
}

export default ImgAndLinksHolder
