import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: `calc(${theme.spacing.xl} * 2)`,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3]}`,

    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      flexDirection: 'column-reverse',
      padding: theme.spacing.xl,
    },
  },

  image: {
    maxWidth: '29%',

    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      maxWidth: '100%',
    },
  },

  body: {
    paddingRight: `calc(${theme.spacing.xl} * 4)`,

    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      paddingRight: 0,
      marginTop: theme.spacing.xl,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Outfit, ${theme.fontFamily}`,
    fontWeight: 500,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },
}));