import { css } from '@emotion/css'
import { restyler } from 'reactronic-front'
import { themes } from './Themes'

export const style = restyler(() => {

  const theme = themes.active

  return {
    Page: css`
      margin: 0;
      display: grid;
      grid-gap: 2em 4em;
      grid-template-rows: auto 1fr;
      grid-template-columns: 1.2fr 1.7fr 1.2fr;

      @media screen and (max-width: 750px) {
        grid-template-rows: auto auto 1fr;
        grid-template-columns: 0.3fr 1fr 0.3fr;
      }
      @media screen and (max-width: 450px) {
        grid-template-rows: auto auto 1fr;
        grid-template-columns: 0fr 1fr 0fr;
      }
    `,

    Title: css`
      font-size: 300%;
      font-weight: bold;
      line-height: 1.2;
      text-transform: uppercase;
      border-bottom: 0.12ch solid ${theme.activeItemMarker};
      color: ${theme.titleForeground};
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
      grid-row-start: 3;
      font-size: 100%;
      line-height: 1.2;
      padding-bottom: 0.5ch;
      text-align: center;

      @media screen and (max-width: 450px) {
        grid-row: 3 / span 1;
        font-size: 120%;
      }
    `,

    Description: css`
      font-size: 22px;

      @media screen and (max-width: 650px) {
        font-size: 19px;
      }
      @media screen and (max-width: 450px) {
        font-size: 18px;
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
      margin: 1ch 0;
      background-color: ${theme.formTextAreaBackground};
      color: ${theme.formTextAreaForeground};;
      caret-color: ${theme.formTextAreaCaretColor};

      &:focus {
        outline: none;
      }

      &:focus:not([readOnly]) {
        box-shadow: 0 0 0 2px ${theme.activeItemMarker};
      }
    `,

    ButtonInner: css`
      display: flex;
      flex-direction: row;
      padding-left: 4ch;
    `,

    Button: css`
      font-size: 125%;
      display: flex;
      flex-direction: row;
      color: white;
      text-shadow: 0 0 1px gray;
      background-color: ${theme.formFindButtonBackground};
      margin: 1ch 0.5ch 1ch 0.5ch;
      cursor: pointer;
      box-shadow: 0 0 1px 0 transparent;
      transition: box-shadow 0.3s ease;
      border-radius: 0.25em;
      width: fit-content;

      &:hover {
        box-shadow: 0 0 0 1px rgb(0, 190, 50);
      }

      &:focus {
        outline: none;
      }

      &:active {
        background-color: lighten(${theme.formFindButtonBackground}, 10%);
      }
    `,

    ButtonLabel: css`
      padding: 0.7ch 1.5ch 0.7ch 1.5ch;
      background-color: transparent;
      display: flex;
      align-items: center;
    `,

    AuthenticationIndicator: css`
      height: 4ch;
      width: 4ch;
      margin-right: 0.5ch;
      visibility: hidden;
      margin-top: 1.5ch;

      &[rx-active=true] {
        visibility: visible;
      }
    `,

    Error: css`
      font-size: 110%;
      color: ${theme.errorText};
    `,

    ButtonContainer: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 1.75ch;
    `,
  }
})
