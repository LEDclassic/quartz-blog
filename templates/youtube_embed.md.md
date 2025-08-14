<%*
const url = await tp.system.prompt("YouTube URL?");
const match = url.match(/(?:v=|\.be\/)([a-zA-Z0-9_-]+)/);
const id = match ? match[1] : "INVALID_ID";

tR += `<figure class="youtube-embed">
  <a href="https://www.youtube.com/watch?v=H-q65az1G84" target="_blank" rel="noopener">
    <img src="https://img.youtube.com/vi/H-q65az1G84/mqdefault.jpg" alt="YouTube Thumbnail" />
  </a>
</figure>`;
-%>