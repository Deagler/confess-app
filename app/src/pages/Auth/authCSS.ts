import { css } from "glamor";

export const authPageCSS = css({
  height: '100vh',
  width: '100wh',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
});

export const authCenterCardCSS = css({
  '@media(min-width:992px)': {
    width: '500px',
  },
  width: '350px',
  padding: '16px',
  minHeight: '400px',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  flexDirection: 'column',
});
