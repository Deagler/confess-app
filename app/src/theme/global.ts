import { css } from 'glamor';

export const backgroundColor = css({
  '@media(prefers-color-scheme: light)': {
    '--background': 'rgb(250, 250, 250)',
    backgroundColor: 'rgb(250, 250, 250)',
  },
  '@media(prefers-color-scheme: dark)': {
    '--background': 'rgb(3, 3, 3)',
    backgroundColor: 'rgb(3, 3, 3)',
  },
});

export const appPageCSS = css(
  {
    '@media(min-width:992px)': {
      marginTop: '82px',
    },
  },
  backgroundColor,
  {
    '& ion-content': backgroundColor,
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
