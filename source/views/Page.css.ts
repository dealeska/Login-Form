import { css } from '@emotion/css'
import { restyler } from 'reactronic-front'
import { themes } from './Themes'

export const style = restyler(() => {

  const RightSide = css`
    grid-row: 1 / span 2;
    grid-column: 3;
    overflow: hidden;

    @media screen and (max-width: 450px) {
      grid-row: 2 / span 1;
      grid-column: 1 / span 2;
      justify-self: center;
    }
  `
  return {
    Page: css`
      margin: 0;
      display: grid;
      grid-gap: 2em 4em;
      grid-template-rows: auto 1fr;
      grid-template-columns: 1.2fr 1.7fr 1.2fr;
      overflow-x: hidden;

      @media screen and (max-width: 450px) {
        grid-template-rows: auto auto 1fr;
        grid-template-columns: 1fr 1fr;
      }
    `,

    Title: css`
      font-size: 300%;
      font-weight: bold;
      line-height: 1.2;
      text-transform: uppercase;
      border-bottom: 0.12ch solid ${themes.active.activeItemMarker};
      color: ${themes.active.titleForeground};
      grid-column-start: 2;
      grid-column-end: 2;
      text-align: center;

      @media screen and (max-width: 1110px) {
        font-size: 250%;
      }
      @media screen and (max-width: 800px) {
        font-size: 200%;
      }
    `,

    Content: css`
      grid-column-start: 2;
      grid-column-end: 2;
      grid-row-start: 4;
      font-size: 100%;
      line-height: 1.2;
      padding-bottom: 0.5ch;
      overflow: hidden;
      text-align: center;

      @media screen and (max-width: 450px) {
        grid-row: 3 / span 1;
        font-size: 120%;
      }
    `,

    RightSide,

    Description: css`
      font-size: 130%;

      img {
        height: 0.93ch;
        margin-left: 1ch;
        margin-right: 1ch;
      }

      b {
        font-weight: inherit;
        color: ${themes.active.emphasizedText};
      }

      a {
        border-bottom: 0.05em dashed ${themes.active.emphasizedText};
        color: ${themes.active.emphasizedText};
      }
    `,

    InputsContainer: css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `,

    Input: css`
      width: 80%;
      height: 30px;
      padding: 5px;
      z-index: 1000000;
      margin: 1ch 0;    
      background-color: ${themes.active.formTextAreaBackground};
      color: ${themes.active.formTextAreaForeground};;
      caret-color: ${themes.active.formTextAreaCaretColor};
      &:focus {
        outline: none;
      }

      &:focus:not([readOnly]) {
        box-shadow: 0 0 0 2px ${themes.active.activeItemMarker};
      }
    `,

    Button: css`
      font-size: 125%;
      display: flex;
      flex-direction: row;
      color: white;
      text-shadow: 0 0 1px gray;
      background-color: ${themes.active.formFindButtonBackground};
      margin-bottom: 1ch;
      margin-right: 0.5ch;
      margin-left: 4ch;
      margin-top: 5px;
      cursor: pointer;
      box-shadow: 0 0 1px 0 transparent;
      transition: box-shadow 0.3s ease;
      border-radius: 0.25em;
      user-select: none;
      width: fit-content;

      &:hover {
        box-shadow: 0 0 0 1px rgb(0, 190, 50);
      }

      &:focus {
        outline: none;
      }

      &:active {
        background-color: lighten(${themes.active.formFindButtonBackground}, 10%);
      }

    `,

    Result: css`
      height: 100%;
      display: flex;
      flex-direction: row;
    `,

    FindLabel: css`
      flex-grow: 0;
      padding: 0.7ch 1.5ch 0.7ch 1.5ch;
      background-color: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
    `,

    SearchIndicator: css`
      height: 4ch;
      width: 4ch;
      margin-right: 0.5ch;
      visibility: hidden;
      margin-top: 7px;

      &[rx-active=true] {
        visibility: visible;
      }
    `,

    Error: css`
      font-size: 110%;    
      color: ${themes.active.errorText};
    `,

    ButtonContainer: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 1.75ch;
    `,
  }

})
