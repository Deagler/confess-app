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
  },
  {
    '& .contentContainer': {
      maxWidth: '1000px',
      '@media(min-width:992px)': {
        marginTop: '40px',
        marginLeft: 'auto',
        marginRight: '30%',
      },
      '@media(min-width:2000px)': {
        marginTop: '40px',
        marginLeft: 'auto',
        marginRight: 'calc(50%-1500px)',
      },
    },
  }
);
