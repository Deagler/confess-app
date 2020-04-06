import { css } from 'glamor';

export const offWhiteCSS = css({
  '--background': 'rgb(250, 250, 250)',
  backgroundColor: 'rgb(250, 250, 250)',
});

export const appPageCSS = css(
  {
    '@media(min-width:992px)': {
      marginTop: '82px',
    },
  },
  offWhiteCSS,
  {
    '& ion-content': offWhiteCSS,
  }
);
