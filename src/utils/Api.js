import axios from 'axios';

const base_api = "https://hacker-news.firebaseio.com/v0/";
const append_pretty = ".json?print=pretty";

export async function getStoryIds() {
  return await axios.get(`${base_api}topstories${append_pretty}`).then(response => {
    return response.data
  })
}

export async function getItem(id) {
  return await axios.get(`${base_api}item/${id}${append_pretty}`).then(response => {
    return response.data
  })
}

export async function getPosts(idArray){
  const returnList = await Promise.all(
    idArray.map(id => 
      axios.get(`${base_api}item/${id}${append_pretty}`)
    )
  );
  return returnList
}