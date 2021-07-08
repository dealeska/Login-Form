import { css } from '@emotion/css'
import { restyler } from 'reactronic-front'
import { themes } from './Themes'

export const style = restyler(() => {

  const theme = themes.active

  return {
    AppWindow: css`
      display: grid;
      grid-gap: 2em 4em;
      grid-template-rows: auto 1fr auto;
      grid-template-columns: 0 30fr 30fr 30fr 0;
      font-size: calc(14px + (20 - 14) * (100vw - 800px) / (1920 - 800));
      font-family: Calibri, Tahoma, Arial, sans-serif;
      background-color: ${theme.background};
      color: ${theme.foreground};
      min-height: 100vh;

      @media screen and (max-width: 750px) {
        grid-column-gap: 2em;
      }
    `,

    Body: css`
      grid-row: 2 / span 1;
      grid-column: 2 / span 3;
    `,
  }
})
