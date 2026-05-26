import { Amplify } from 'aws-amplify'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'eu-north-1_8HjA0UcOF',
      userPoolClientId: '7k7k59d5fon8ovjf248fjbg63m',
      loginWith: {
        email: true,
      },
    },
  },
})