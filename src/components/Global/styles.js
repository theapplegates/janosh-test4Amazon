import 'katex/dist/katex.min.css'
import { createGlobalStyle } from 'styled-components'
import mediaQuery, { screens } from 'utils/mediaQuery'
import typography from 'utils/typography'

const { phone, desktop } = screens
const { fonts, minFontSize, maxFontSize, minLineHeight, maxLineHeight } = typography

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    hyphens: auto;
    font-family: ${fonts};
    font-size: ${minFontSize}em;
    line-height: ${minLineHeight}em;
    /* Fix very large font size in code blocks in iOS Safari (https://stackoverflow.com/a/3428477). */
    -webkit-text-size-adjust: 100%;
    ${mediaQuery.minPhone} {
      font-size: calc(${minFontSize}em + (${maxFontSize} - ${minFontSize}) * ((100vw - ${phone}em) / (${desktop} - ${phone})));
      line-height: calc(${minLineHeight}em + (${maxLineHeight} - ${minLineHeight}) * ((100vw - ${phone}em) / (${desktop} - ${phone})));
    }
    ${mediaQuery.minDesktop} {
      font-size: ${maxFontSize}em;
      line-height: ${maxLineHeight}em;
    }
    /* Ensure full-height page even if unsufficient content. */
    #gatsby-focus-wrapper {
      min-height: 100vh;
      display: grid;
      grid-template-rows: auto 1fr auto;
    }
    /* The rules below enable dark mode. */
    background: ${props => props.theme.background};
    color: ${props => props.theme.textColor};
    a {
      text-decoration: none;
      color: ${props => props.theme.links};
      :hover {
        color: ${props => props.theme.hoveredLinks};
      }
    }
  }
  h1, h2, h3, h4, h5, h6 {
    line-height: initial;
  }
  /* Center image captions. */
  .gatsby-resp-image-wrapper + em, img + em, .js-plotly-plot + p > em, div.table + p > em {
    margin-top: 0.3em;
    display: block;
    text-align: center;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
    font-size: 0.95em;
  }
  /* Prevent wide equations from breaking layout. */
  .katex-display {
    overflow-x: scroll;
    overflow-y: hidden;
  }
  blockquote, details {
    border-left: 0.25em solid ${props => props.theme.lighterBlue};
    background: ${props => props.theme.accentBackground};
    padding: 0.1em 0.3em 0.1em 0.6em;
    margin: 0;
    summary {
      font-weight: bold;
    }
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  table td, table th {
    border: 1px solid ${props => props.theme.lightGray};
    padding: 0.2em 0.6em;
  }
  tbody tr:nth-child(odd) {
    background: ${props => props.theme.accentBackground};
  }
  div.scroll {
    overflow: scroll;
    margin: 1em auto;
    border: 1px solid ${props => props.theme.lightGray};
    border-width: 0 1px;
    white-space: nowrap;
    table td, table th {
      :first-child {
        border-left: none;
      }
      :last-child {
        border-right: none;
      }
    }
  }
  /* Enbales markdown mouseover text via ___~^note^ *Some mouseover text*~___ */
  strong > em > sub {
    position: relative;
    text-decoration: none;
    vertical-align: initial;
    > sup {
      color: ${props => props.theme.links};
      cursor: pointer;
    }
    > em {
      z-index: 3;
      font-style: normal;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s;
      position: absolute;
      width: 25em;
      max-width: 80vw;
      max-height: 80vh;
      overflow: scroll;
      background: ${props => props.theme.accentBackground};
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0.5em 0.8em;
      border-radius: 0.5em;
      ${mediaQuery.maxPhablet} {
        position: fixed;
      }
    }
  }
  strong > em > sub:hover {
    > em {
      opacity: 1;
      visibility: visible;
    }
  }
`
