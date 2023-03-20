// #region lazyYT
/**
 *
 * @param {*}
 */

window.addEventListener("DOMContentLoaded", (event) => {
  const lazyYT = {
    videoParents: document.querySelectorAll(".big-card__media"),
    videoPicClassName: "picture",
    videoImgClassName: ".js_lazy__preview",
    videoIframeClassName: ".js_lazy__content",
  };
  setupLazyYT(lazyYT);
});
function setupLazyYT($) {
  const {
    videoParents,
    videoPicClassName,
    videoImgClassName,
    videoIframeClassName,
  } = $;

  videoParents.forEach((review, index) => {
    let ytId = review.getAttribute("data-yt-id");
    if (!ytId) return;

    // let ytThumbUrl = `https://i.ytimg.com/vi/${ytId}/hq720.jpg`;
    let ytThumbUrl = `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
    let ytThumbWebpUrl = `https://i.ytimg.com/vi_webp/${ytId}/hqdefault.webp`;
    let ytVideoUrl = `https://www.youtube.com/embed/${ytId}/?autoplay=1`;
    // let ytVideoUrl = `https://www.youtube.com/watch?v=${ytId}`;

    let pic = review.querySelector(videoPicClassName);
    let thumb = review.querySelector(videoImgClassName);
    let thumbWebp = document.createElement("source");
    thumbWebp.srcset = ytThumbWebpUrl;
    thumbWebp.type = "image/webp";
    pic.appendChild(thumbWebp);
    pic.appendChild(thumb);
    thumb.src = ytThumbUrl;

    let video = review.querySelector(videoIframeClassName);
    // let play = review.querySelector($.playButtonClassName);
    video.setAttribute("data-src", ytVideoUrl);
    let videoClass = `js_video--${index}`;
    video.classList.add(videoClass);

    function initVideo() {
      console.log("yep");
      // if (review.classList.contains("js_lazy-init"))
      review.classList.add("js_lazy-init");
      video.src = video.getAttribute("data-src");
      debugger;
      review.removeEventListener("click", initVideo);
    }
    review.addEventListener("click", initVideo);
  });
}
// #endregion lazyYT
