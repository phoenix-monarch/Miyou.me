export default  (req, res) => {
// const { source } = req.query
const source ="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
res.setHeader('Content-Type', 'text/html')
res.send(`
<html>
<head>
<link rel="stylesheet" href="https://cdn.plyr.io/1.8.2/plyr.css">
<head/>
<body>
  <div>
    <video controls crossorigin playsinline poster="https://bitdash-a.akamaihd.net/content/sintel/poster.png"></video>
  </div>
  <script src="https://cdn.plyr.io/1.8.2/plyr.js"></script>
    <script src="https://cdn.jsdelivr.net/hls.js/latest/hls.js"></script>
  <script>
      const video = document.querySelector('video')
      
      const defaultOptions = {}
      console.log
      if (!Hls.isSupported()) {
        video.src = '${source}'
        console.log("hello")
        var player = new Plyr(video, defaultOptions)
        
      } else {
        const hls = new Hls()
        hls.loadSource('${source}')
        console.log("hello")
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          const availableQualities = hls.levels.map((l) => l.height)
          availableQualities.unshift(0)

          defaultOptions.quality = {
            default: 0,
            options: availableQualities,
            forced: true,
            onChange: (e) => updateQuality(e),
          }
          defaultOptions.i18n = {
            qualityLabel: {
              0: 'Auto',
            },
          }

          hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
            var span = document.querySelector(".plyr__menu__container [data-plyr='quality'][value='0'] span")
            if (hls.autoLevelEnabled) {
              span.innerHTML = \`AUTO (\${hls.levels[data.level].height}p)\`
            } else {
              span.innerHTML = 'AUTO'
            }
          })

          var player = new Plyr(video, defaultOptions)
          console.log(player)
          console.log(Plyr)
          player.setup(video)
        })

        hls.attachMedia(video)
        window.hls = hls
      }

      function updateQuality(newQuality) {
        if (newQuality === 0) {
          window.hls.currentLevel = -1
        } else {
          window.hls.levels.forEach((level, levelIndex) => {
            if (level.height === newQuality) {
              console.log("Found quality match with " + newQuality)
              window.hls.currentLevel = levelIndex
            }
          })
        }
      }
  </script>
  <body/>
  </html>
`)

}