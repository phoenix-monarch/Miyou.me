import {request} from 'graphql-request'

export async function cacheGraphQlFetch(query,variables,cacheKey) {
    const cacheExpiration = 5 * 60 * 60 * 1000;  // 5 hours

    
    // Cache Key is to locate the item in the local Storage by the name
    console.log(`Functin called with  ${variables } ${cacheKey}`)

    // Check if the data is already in localStorage
    if(typeof window !== "undefined"){
      const cacheData = localStorage.getItem(cacheKey);
    if (cacheData) {
      console.log("item found in cache")
      // If the data is in localStorage, check if it has expired
      const cacheTimestamp = JSON.parse(cacheData).timestamp;
      const currentTime = Date.now();
      if (currentTime < cacheTimestamp + cacheExpiration) {
        // If the data is not expired, return it
       
        return Promise.resolve(JSON.parse(cacheData).data);
      }
    }
    }
    
  
    // If the data is not in localStorage or has expired, make a fetch request
     return request(process.env.NEXT_PUBLIC_BASE_URL, query,variables)
      .then(data => {
       console.log("fetching ")
        // Store the data and timestamp in localStorage
        localStorage.setItem(cacheKey, JSON.stringify({
          timestamp: Date.now(),
          data: data
        }));
        return data;
      }).catch(function (error) {
        console.log(error);
        throw error;
      })
  }

export async function cacheFetchRequest(url,cacheKey) {
    const cacheExpiration = 5 * 60 * 60 * 1000;  // 5 hours
    console.log(`function called with  url : ${url} and cacheKey : ${cacheKey}`)

    // Cache Key is to locate the item in the local Storage by the name
    

    // Check if the data is already in localStorage
    if(typeof window !== "undefined"){
      const cacheData = localStorage.getItem(cacheKey);
    if (cacheData) {

      console.log("item found in cache")
      // If the data is in localStorage, check if it has expired
      const cacheTimestamp = JSON.parse(cacheData).timestamp;
      const currentTime = Date.now();
      if (currentTime < cacheTimestamp + cacheExpiration) {
        // If the data is not expired, return it
        console.log(JSON.parse(cacheData).data)
        return Promise.resolve(JSON.parse(cacheData).data);
      }
    }
    }
    
    // If the data is not in localStorage or has expired, make a fetch requesty
 

    try {
      // Make the fetch request
      const response = await fetch(url);
      const data = await response.json();
      localStorage.setItem(cacheKey, JSON.stringify({
      timestamp: Date.now(),
      data: data
    }));
      return data;
    } catch (error) {
      // Log the error
      console.error(error);
  
      // Return the error
      throw error;
    }
 
    
  }
