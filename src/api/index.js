import axios from 'axios'

const baseUrl = "https://api.github.com"


export const getGistListByUserName = async (username) => {
    const res = await axios.get(`${baseUrl}/users/${username}/gists`)
    return res;
}