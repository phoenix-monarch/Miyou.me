import { ANIME } from '@consumet/extensions';


export default async (req,res) => {
  const zoro = new ANIME.Zoro();
    const {animeId,subOrDub,episodeId} = req.query;
try {
  const response = await zoro.fetchEpisodeSources(`${animeId}$episode$${episodeId}$${subOrDub}`)
  res.setHeader("Cache-control", "max-age=86400");
  res.send(response)
} 
// fallback to consumet api if the keys are invalid in consumet extensions 
catch(error) {
    // console.log(error)
      const response = await fetch(`https://api.consumet.org/anime/zoro/watch?episodeId=${animeId}$episode$${episodeId}$${subOrDub}`)
      const resp = await response.json()
      res.send(resp)
      res.setHeader("Cache-control", "max-age=86400");
}

  

}
