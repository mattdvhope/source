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
        <div>Scroll in this box if necessary</div>
        <div
          style={{width:`100%`,height:`150px`,lineHeight:`1.5em`,overflow:`scroll`,padding:`5px`,backgroundColor:`#FCFADD`,color:`#714D03`,border:`4px double #DEBB07`}}
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
