<%*
const url = await tp.system.prompt("YouTube URL?");
const match = url.match(/(?:v=|\.be\/)([a-zA-Z0-9_-]+)/);
const id = match ? match[1] : "INVALID_ID";

tR += `<figure class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/${id}" allowfullscreen></iframe>
</figure>`;
-%>