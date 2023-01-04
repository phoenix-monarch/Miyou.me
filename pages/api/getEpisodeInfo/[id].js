import cheerio from 'cheerio';
// import cacheData from "memory-cache";




const scrapeAnimeDetails = async (id) => {
  // Check the cache for the requested data
  // const value = cacheData.get(id);
  // if (value) {
  //   console.log("Gave from cache")
  //   return value;
  // }

  try {
    let response = await fetch(`https://gogoanime.tel/category/${id}`);
    let res = await response.text()
    const $ = cheerio.load(res);
    let totalEp = $('#episode_page > li').last().find('a').attr('ep_end');
    let status =$('div.anime_info_body_bg > p:nth-child(8) > a').text()
    totalEp = parseInt(totalEp)

    // cacheData.put(id, {status,totalEp}, 18000000); // Time in ms (5 hours)
    return { status, totalEp };
  } catch (err) {
    console.log(err);
    return {error: err};
  }
};




const fetchSlug = async function (id) {
    let response = await fetch(`https://raw.githubusercontent.com/MALSync/MAL-Sync-Backup/master/data/myanimelist/anime/${id}.json`);
    let data = await response.json()

    let slug = {}
    slug.subId = Object.keys(data.Pages.Gogoanime)[0]
    slug.dubId = Object.keys(data.Pages.Gogoanime)[1]
    return(slug)

}

export default async function handler(req, res) {
    const {id} = req.query
    const slugs = await fetchSlug(id)
    const {subId,dubId} = slugs

    const episodeInfo = {}
    episodeInfo.subLink = subId
    episodeInfo.dubLink = dubId
    episodeInfo.malId = id

    let subAnimeInfo = await scrapeAnimeDetails(subId)
    episodeInfo.subTotalEpisodes =subAnimeInfo.totalEp
    if (dubId == undefined) {
        episodeInfo.isDub = false
    } else {
        episodeInfo.isDub = true
    }


    if (episodeInfo.isDub) {
        // episodeInfo.dubTotalEpisodes = await scrapeAnimeDetails(episodeInfo.dubLink).ep_end
        let dubAnimeInfo = await scrapeAnimeDetails(episodeInfo.dubLink)
        episodeInfo.dubTotalEpisodes =dubAnimeInfo.totalEp
        if(dubAnimeInfo.status == 'Completed'){
            // To cache data for later if the anime is not releasing
            res.setHeader('Cache-Control', 'max-age=86400');
        }
    }
    // If there is no dub episodes but sub is complete
    if(!episodeInfo.isDub){
        if(subAnimeInfo.status == 'Completed'){
            // To cache data for later if the anime is not releasing
            console.log("setting cache for completed sub")
            res.setHeader('Cache-Control','max-age=86400');
        }
    }
    res.send(episodeInfo)
};
