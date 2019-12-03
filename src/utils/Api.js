import axios from 'axios';

const base_api = "https://hacker-news.firebaseio.com/v0/";
const append_pretty = ".json?print=pretty";

// Gets the top 500 stories, returns the top 50.
export async function getTopStoryIds() {
  return await axios.get(`${base_api}topstories${append_pretty}`).then(response => {
    return response.data.slice(0, 50)
  })
}

// Gets the newest 500 stories, returns the top 50.
export async function getNewStoryIds() {
  return await axios.get(`${base_api}newstories${append_pretty}`).then(response => {
    return response.data.slice(0, 50)
  })
}

// Gets any item's data 
export async function getItem(id) {
  return await axios.get(`${base_api}item/${id}${append_pretty}`).then(response => {
    return response.data
  })
}

// Returns JSON user object / data given the id
export async function getUser(id) {
  return await axios.get(`${base_api}user/${id}${append_pretty}`).then(response => {
    return response.data
  })
}

// Takes an array of id's and returns JSON object data, filtered for stories. 
// Also filters out deleted stories. 
export async function getPosts(idArray) {
  const returnList = await Promise.all(
    idArray.map(id =>
      axios.get(`${base_api}item/${id}${append_pretty}`).then(response => {
        return response.data
      })
    )
  );
  if (returnList.length > 50) {
    return returnList.filter((item) => !!item && item.type === "story" && !item.deleted).slice(0, 50)
  }
  else {
    return returnList.filter((item) => item.type === "story" && !item.deleted)
  }
}

// Pretty much the same as getPosts except unlimited comments...
export async function getComments(idArray){
  const returnList = await Promise.all(
    idArray.map(id =>
      axios.get(`${base_api}item/${id}${append_pretty}`).then(response => {
        return response.data
      })
    )
  );
  return returnList
}