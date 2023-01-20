import cheerio from "cheerio"
export default async (req,res) => {
    const {episodeId} =req.query
    const response = await fetch(`https://zoro.to/ajax/v2/episode/servers?episodeId=${episodeId}`)
    const resp = await response.json()
    const $ = cheerio.load(resp.html)
    const isDub ={}
    
const hasClass = $('div').hasClass("servers-dub");

if (hasClass) {
    isDub.dubAvailable = true;

}
else{
    isDub.dubAvailable = false;
}
res.send(isDub)
}