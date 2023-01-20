import cheerio from 'cheerio';
// import cacheData from "memory-cache";




const scrapeAnimeDetails = async (id) => {

  try {
    let response = await fetch(`https://tenshi.moe/anime/${id}`, {
      "headers": {
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35',
          "cookie": 'loop-view=thumb;__ddg1_=;__ddg2_=',
      },
      "referrer": "https://tenshi.moe/",
    });
    
    console.log(response)
    let res = await response.text()
    const $ = cheerio.load(res);
    const status = $('.status .value a').attr('href').slice((26))
    const totalEp = $('.entry-episodes > h2 > span').text();
    // Implement caching here on the basis of status
    return { status, totalEp };
  } catch (err) {
    console.log(err);
    return {error: err};
  }
};


export default async function handler(req, res) {
    const {tenshiId} = req.query
    let episodeInfo = {}
   
    let AnimeInfo = await scrapeAnimeDetails(tenshiId)
   episodeInfo.totalEp =AnimeInfo.totalEp
   episodeInfo.status = AnimeInfo.status
  
    
   
   res.send(episodeInfo)
};
