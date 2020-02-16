require('source-map-support').install()
require('dotenv').config()

const { USER_AGENT, CLIENT_ID, CLIENT_SECRET, USERNAME, PASSWORD } = process.env

export const credentials = {
  user_agent: USER_AGENT!,
   o2a: {
    client_id: CLIENT_ID!,
    client_secret: CLIENT_SECRET!,
    username: USERNAME!,
    password: PASSWORD!,
  }
}

export const subreddits = [ 'detroitRedWings' ]
