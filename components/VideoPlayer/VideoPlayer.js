import React, { useEffect, useState,useRef } from "react";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { MdPlayDisabled, MdPlayArrow } from "react-icons/md";
import { IconContext } from "react-icons";
import styled from "styled-components";
import Hls from "hls.js";
import plyr from "plyr";
import "plyr/dist/plyr.css";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import useWindowSize from "../../hooks/useWindowSize";
function VideoPlayer({
  sources,
  subtitles,
  internalPlayer,
  setInternalPlayer,
  previewThumbnails ,
  dub,
  dubAvailable,
  setDub,
  title,
  server,
  type,
  totalEpisodes,
  currentEpisode,
}) {
  const router = useRouter()
  const { width } = useWindowSize();
  const {epId,epNum} = router.query
  let src = sources;
  const [autoPlay, setAutoplay] = useState(false);


  function updateAutoplay(data) {
    toast.success(`Autoplay ${data ? "Enabled" : "Disabled"}`, {
      position: "top-center",
    });
    localStorage.setItem("autoplay", data);
    setAutoplay(data);
  }
  
  useEffect(() => {
    console.log(`Switched to ${dub}`);
    setDub(dub)
    if(typeof window !== "undefined"){
      if(typeof window.hls !== "undefined" && typeof window.hls.destroy !== "undefined"){
        window.hls.destroy()
        console.log("destroyed")
      }
    }
  }, [dub]);
  const playerRef = useRef(null);
  useEffect(() => {
    console.log(previewThumbnails)
    // let tracks= subtitles.map((e,i) => {
    //   return {
    //     kind: 'captions',
    //     label: e.lang,
    //     src:  "https://3000-reyangurjar-miyoume-7yhhgj1d4lw.ws-us83.gitpod.io/zorores/"+ e.url.slice(23) ,
    //     default :
    //     subtitles[i].lang == "English" ? 
    //     true
    //   :
    //   false,

    //   srclang: e.lang
    // }
    // })
    if (!localStorage.getItem("autoplay")) {
      localStorage.setItem("autoplay", false);
    } else {
      setAutoplay(localStorage.getItem("autoplay") === "true");
    }
    const video = document.getElementById("player");
    let flag = true;

    const defaultOptions = {
      captions: { active: true, update: true, language: "en" },
      controls:
        width > 600
          ? [
              "play-large",
              "rewind",
              "play",
              "fast-forward",
              "progress",
              "current-time",
              "duration",
              "mute",
              "volume",
              "settings",
              "fullscreen",
            ]
          : [
              "play-large",
              "rewind",
              "play",
              "fast-forward",
              "progress",
              "current-time",
              "duration",
              "settings",
              "fullscreen",
            ],
            previewThumbnails: previewThumbnails ? {
              enabled: true,
              src: previewThumbnails,
            }
            : {
              enabled: false,
            },
            tooltips: { controls: true, seek: true },
        seekTime: 5,
        invertTime: false,
        fullscreen: { iosNative: true },
        preload: "auto",
        
    };

    if (type === "mp4") {
      
      // video.removeAttribute("crossorigin");
      playerRef.current = new plyr(video, defaultOptions);
      playerRef.current.source = {
        type: "video",
        title: "Example title",
        sources: src,
      };

    }
    if(type === "hls"){
    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(src);
      hls.attachMedia(video);
      if(subtitles.length !== 0){
        const track = document.createElement('track');
        let engSubtitle =subtitles.find(subtitle => subtitle.lang == "English")
        video.appendChild(track);
        Object.assign(track, {
          label: 'English',
          srclang: 'en',
          default: true,
          src:"/zorores/"+ engSubtitle.url.slice(23)
        });
        // tracks.map((e,i) => {
        //   const track = document.createElement('track');
        //   track.src = e.src;
        //   track.label = e.label;
        //   track.default =e.default;
        //   video.appendChild(track);
        // })
      }
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        const availableQualities = hls.levels.map((l) => l.height);
        availableQualities.unshift(0);
        defaultOptions.quality = {
          default: 0,
          options: availableQualities,
          forced: true,
          onChange: (e) => updateQuality(e),
        };
        hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
          var span = document.querySelector(
            ".plyr__menu__container [data-plyr='quality'][value='0'] span"
          );
          if (hls.autoLevelEnabled) {
            span.innerHTML = `Auto (${hls.levels[data.level].height}p)`;
          } else {
            span.innerHTML = `Auto`;
          }
        });
        let player = new plyr(video, defaultOptions);
        let plyer;
      
        player.on("ready", () => {
          plyer = document.querySelector(".plyr__controls");
          document
            .querySelector(".plyr__video-wrapper")
            .addEventListener("click", () => {
              let regexp = /android|iphone|kindle|ipad/i;
              if (
                regexp.test(navigator.userAgent) &&
                getComputedStyle(player.elements.controls).opacity === "1"
              ) {
                player.togglePlay();
              }
            });

          var tapedTwice = false;
          function tapHandler(event) {
            if (!tapedTwice) {
              tapedTwice = true;
              setTimeout(function () {
                tapedTwice = false;
              }, 300);
              return false;
            }
            event.preventDefault();
            //action on double tap goes below
            player.fullscreen.toggle();
          }
          document
            .querySelector(".plyr__video-wrapper")
            .addEventListener("touchstart", tapHandler);
        });

        player.on("enterfullscreen", (event) => {
          window.screen.orientation.lock("landscape");
        });

        player.on("exitfullscreen", (event) => {
          window.screen.orientation.lock("portrait");
        });

        player.on("timeupdate", function (e) {
          var time = player.currentTime,
            lastTime = localStorage.getItem(title);
          if (time > lastTime) {
            localStorage.setItem(title, Math.round(player.currentTime));
          }
        });

        player.on("ended", function () {
          localStorage.removeItem(title);

          if (
            localStorage.getItem("autoplay") === "true" &&
            parseInt(currentEpisode) !== parseInt(totalEpisodes)
          ) {
            navigate(`/v1/${epId}/${parseInt(epNum) + 1}`);
          }
        });

        player.on("play", function (e) {
          if (flag) {
            var lastTime = localStorage.getItem(title);
            if (lastTime !== null && lastTime > player.currentTime) {
              player.forward(parseInt(lastTime));
            }
            flag = false;
          }
        });

        player.on("seeking", (event) => {
          localStorage.setItem(title, Math.round(player.currentTime));
        });
      });
      hls.attachMedia(video);
      window.hls = hls;

      function updateQuality(newQuality) {
        if (newQuality === 0) {
          window.hls.currentLevel = -1;
          console.log("Auto quality selection");
        } else {
          window.hls.levels.forEach((level, levelIndex) => {
            if (level.height === newQuality) {
              console.log("Found quality match with " + newQuality);
              window.hls.currentLevel = levelIndex;
            }
          });
        }
      }
    } 
    else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      const defaultOptions = {
        captions: { active: true, update: true, language: "en" },
        controls: [
          "play-large",
          "rewind",
          "play",
          "fast-forward",
          "progress",
          "current-time",
          "duration",
          "mute",
          "volume",
          "settings",
          "fullscreen",
        ],
        previewThumbnails: previewThumbnails ? {
          enabled: true,
          src: previewThumbnails,
        }
        : {
          enabled: false,
        },
        tooltips: { controls: true, seek: true },
    seekTime: 5,
    invertTime: false,
    fullscreen: { iosNative: true },
    // preload: "auto",
    // autoplay: true,
      };
      let player = new plyr(video, defaultOptions);

      let plyer;

      player.on("ready", () => {
        plyer = document.querySelector(".plyr__controls");
      });

      player.on("enterfullscreen", (event) => {
        plyer.appendChild(button);
        window.screen.orientation.lock("landscape");
      });

      player.on("exitfullscreen", (event) => {
        window.screen.orientation.lock("portrait");
      });

      player.on("timeupdate", function (e) {
        var time = player.currentTime,
          lastTime = localStorage.getItem(title);
        if (time > lastTime) {
          localStorage.setItem(title, Math.round(player.currentTime));
        }
        if (player.ended) {
          localStorage.removeItem(title);
        }
      });

      player.on("play", function (e) {
        if (flag) {
          var lastTime = localStorage.getItem(title);
          if (lastTime !== null && lastTime > player.currentTime) {
            player.forward(parseInt(lastTime));
          }
          flag = false;
        }
      });

      player.on("seeking", (event) => {
        localStorage.setItem(title, Math.round(player.currentTime));
      });
    } else {
      const player = new plyr(video, defaultOptions);
      player.source = {
        type: "video",
        title: "Example title",
        sources: src,
      };
    }
  }
  // hls.destroy()
  }, [src]);


  return (
    <div
      style={{
        marginBottom: "1rem",
        "--plyr-color-main": "#7676FF",
      }}
    >
      <Conttainer>
        <IconContext.Provider
          value={{
            size: "1.5rem",
            color: "white",
            style: {
              verticalAlign: "middle",
            },
          }}
        >
          {internalPlayer && <p>Internal Player</p>}
          {server == "tenshi" && (dubAvailable ? <p>Playing {dub ? "Dub" : "Sub"}</p> : <p>Playing Sub (No Dub source available for this episode)</p>) }
          {server == "zoro" && (dubAvailable ? <p>Playing {dub ? "Dub" : "Sub"}</p> : <p>Playing Sub (No Dub source available for this episode)</p>) }
          
          <div>
            {autoPlay && (
              <div className="tooltip1">
                <button
                  title="Disable Autoplay"
                  onClick={() => updateAutoplay(false)}
                >
                  <MdPlayArrow />
                </button>
              </div>
            )}
            {!autoPlay && (
              <div className="tooltip1">
                <button
                  title="Enable Autoplay"
                  onClick={() => updateAutoplay(true)}
                >
                  <MdPlayDisabled />
                </button>
              </div>
            )}
            {server == "tenshi" && dubAvailable && <div className="tooltip1">
              <button
                title="Change Audio"
                onClick={() => {
                  toast.success(dub ? "Switched To Sub" : "Switched To Dub", {
                    position: "top-center",
                  });
                  setDub(!dub);
                }}
              >
                <HiOutlineSwitchHorizontal />
              </button>
            </div> }
            {server == "zoro" && dubAvailable && <div className="tooltip1">
              <button
                title="Change Audio"
                onClick={() => {
                  toast.success(dub ? "Switched To Sub" : "Switched To Dub", {
                    position: "top-center",
                  });
                  setDub(!dub);
                }}
              >
                <HiOutlineSwitchHorizontal />
              </button>
            </div> }
            {server == "gogoanime" && 
            <div className="tooltip1">
            <button
              title="Change Server"
              onClick={() => {
                toast.success("Swtitched to External Player", {
                  position: "top-center",
                });
                setInternalPlayer(!internalPlayer);
              }}
            >
              <HiOutlineSwitchHorizontal />
            </button>
          </div>
            }
            
            
          </div>
        </IconContext.Provider>
      </Conttainer>
      <video
        id="player"
        playsInline
        crossorigin
        style={{
          aspectRatio: 16 / 9,
        }}
      ></video>
    </div>
  );
}

const Conttainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #242235;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem 0.5rem 0 0;
  border: 1px solid #393653;
  margin-top: 1rem;
  border-bottom: none;
  font-weight: 400;
  p {
    color: white;
  }

  button {
    outline: none;
    border: none;
    background: transparent;
    margin-left: 1rem;
    cursor: pointer;
  }

  .tooltip1 {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
  }

  .tooltip1 .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 5px;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .tooltip1 .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }

  .tooltip1:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;

export default VideoPlayer;
