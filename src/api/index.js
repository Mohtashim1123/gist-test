import axios from 'axios'

const baseUrl = "https://api.github.com"

export const getGistListByUserName = async (username) => {
    return await axios.get(`${baseUrl}/users/${username}/gists`)
}