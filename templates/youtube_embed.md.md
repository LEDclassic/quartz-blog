<%*
const url = await tp.system.prompt("YouTube 링크를 입력하세요 (전체 주소):");
const match = url.match(/(?:v=|\.be\/)([a-zA-Z0-9_-]{11})/);
const id = match ? match[1] : null;

if (!id) {
  tR += "**⚠️ 유효한 YouTube 링크가 아닙니다. 다시 확인해주세요.**";
} else {
  const title = await tp.system.prompt("영상 제목:");
  const channel = await tp.system.prompt("채널명:");

  tR += `<figure class="youtube-embed">
  <a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">
    <img src="https://img.youtube.com/vi/${id}/mqdefault.jpg" alt="youtube thumbnail" class="youtube-thumb" />
    <figcaption class="youtube-caption">
      <strong>${title}</strong><br>
      <span class="channel-name">${channel}</span>
    </figcaption>
  </a>
</figure>`;
}
-%>

