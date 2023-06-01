export function embedYouTubeUrl(url) {
    const regExp1 = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
    const regExp2 = /[?&]list=([^#&?]+)/;
    const match1 = url.match(regExp1);
    const match2 = url.match(regExp2);
    const videoId = match1 && match1[2].length === 11 ? match1[2] : null;
    const playlistId = match2 ? match2[1] : null;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}${playlistId ? `?list=${playlistId}` : ''}`;
    }
  }