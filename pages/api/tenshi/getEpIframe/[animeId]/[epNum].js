import cheerio from 'cheerio';
import { tenshiHeader } from '../../../../../hooks/headers';
export default async function handler(req, res) {
    const {animeId , epNum} = req.query
    const {Source , TotalEp,Name} = await scrapeDetails(animeId , epNum)


    res.send({Source,TotalEp,Name})
};

const scrapeDetails = async function (epId,epNum ){
    const response  = await fetch(`https://tenshi.moe/anime/${epId}/${epNum}`,tenshiHeader);
    console.log(response)
    const res = await response.text()
    const $ = cheerio.load(res);

    $('.dropdown-header').remove();
let data = []
    $('.dropdown-menu li').each((i, element) => {
        const $element = $(element);
        const src = $element.find('a').attr('href').split('=')[1];
        const audio = $element.find('span').first().attr('title').split(': ')[1];


        data.push({ src, audio });
      });

      const Source = {
        Sub: data.filter(item => {
          const [audio] = item.audio.split(' / ');
          return audio.trim() !== 'English';
        }).map(item => {
          const [audio] = item.audio.split(' / ');
          return {
            episodeId: item.src,
            audio: audio.trim(),
           
          };
        }),
        Dub: data.filter(item => {
          const [audio] = item.audio.split(' / ');
          return audio.trim() === 'English';
        }).map(item => {
          return {
            episodeId: item.src,
            audio: 'English',
          };
        }),
      };
      const TotalEp = $('.playlist-episodes').find('li').length;
      const Name = $(".entry-header > h1").text()
      console.log(Name)
      return {Source, TotalEp,Name};
}
