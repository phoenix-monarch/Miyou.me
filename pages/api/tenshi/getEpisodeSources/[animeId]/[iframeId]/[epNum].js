import cheerio from "cheerio"
export default async function(req, res) {
    const { animeId,iframeId ,epNum} = req.query
    const details =  await scrapeSources(animeId,epNum,iframeId)
    res.send(details)
}

const scrapeSources = async function(animeId , epNum,iframeId) {
    const response = await fetch(`https://tenshi.moe/embed?v=${iframeId}`,
    {
    headers: {
        // Without this the resonse will only have 360p video attr
        'referer': `https://tenshi.moe/anime/${animeId}/${epNum}`,
      }})
      
    const res   = await response.text()
    const $ = cheerio.load(res);
    const sources = [];
$('video source').each((i, elem) => {
  sources.push({
    src: process.env.NEXT_PUBLIC_URL + "/api/suzaki/" + $(elem).attr('src').split('/').pop(),
    type: $(elem).attr('type'),  
    size: $(elem).attr('size'),
  });
});

// Get the previewThumbnails
const previewThumbnails = res.match(/previewThumbnails: {[^}]+src: '([^']+)'/)[1]

return {sources,previewThumbnails}
}