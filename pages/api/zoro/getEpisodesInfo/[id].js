import cheerio from 'cheerio';
// import cacheData from "memory-cache";




const scrapeAnimeDetails = async (id) => {

  try {
    let response = await fetch(`https://9anime.se/ajax/episode/list/${id}`, );
    
    let res = await response.json()
    const $ = cheerio.load(res.html);
    let episodes = [];
    const zoroAnimeId  = $('#episodes-page-1  a').attr('href').slice(7).split("?")[0]
    $('a').each(function(i, el) {
      // console.log(el.attribs.href)
      episodes.push({
              id: $(el).attr('data-id'),
              epNum: $(el).attr('data-number')
      })
    
      });
    const totalEp = res.totalItems
    return {zoroAnimeId,episodes,totalEp};
  } catch (err) {
    console.log(err);
    return {error: err};
  }
};


export default async function handler(req, res) {
    const {id} = req.query
    // ID example =27    
   
   let AnimeInfo = await scrapeAnimeDetails(id)
   res.send(AnimeInfo)
  //  res.send("AnimeInfo")
};
