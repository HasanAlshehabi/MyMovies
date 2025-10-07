let trailersArrowsBound = false; // prevent duplicate event listeners

export function renderTrailers(movie, num) {
  const container = document.querySelector('.trailers__container');
  if (!container) return;

  // If we already have 5 trailers, do nothing.
  const existing = container.querySelectorAll('.trailers__video');
  if (existing.length >= 5) return;

  const iframe = document.createElement('iframe');
  iframe.classList.add('trailers__video', `trailers__video-${num}`);

  // Lazy-load the iframe to avoid blocking main thread / layout
  iframe.loading = 'lazy';
  iframe.src = movie.Trailer_link;

  iframe.setAttribute(
    'allow',
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
  );
  iframe.setAttribute('allowfullscreen', '');

  container.appendChild(iframe);

  const list = container.querySelectorAll('.trailers__video');
  const arr = Array.from(list);

  list.forEach(item => {
    item.classList.remove(
      'trailers__video-1',
      'trailers__video-2',
      'trailers__video-3',
      'trailers__video-4',
      'trailers__video-5'
    );
  });

  // Apply positions to up to 5 items
  arr.slice(0, 5).forEach((item, i) => {
    item.classList.add(`trailers__video-${i + 1}`);
  });

  // Bind arrows only once
  if (!trailersArrowsBound) {
    document.querySelectorAll('.trailers__arrow').forEach(arrow => {
      arrow.addEventListener('click', event => {
        changeTrailer(event);
      });
    });
    trailersArrowsBound = true;
  }
}

let currentStartIndex = 0;

function changeTrailer(event) {
  const container = document.querySelector('.trailers__container');
  if (!container) return;
  const list = Array.from(container.querySelectorAll('.trailers__video'));
  if (list.length === 0) return;

  const isLeft = event.currentTarget.classList.contains('trailers__arrow--left');

  if (isLeft) {
    currentStartIndex = (currentStartIndex - 1 + list.length) % list.length;
  } else {
    currentStartIndex = (currentStartIndex + 1) % list.length;
  }


  list.forEach(item => {
    item.classList.remove(
      'trailers__video-1',
      'trailers__video-2',
      'trailers__video-3',
      'trailers__video-4',
      'trailers__video-5'
    );
  });

  for (let i = 0; i < 5 && i < list.length; i++) {
    const idx = (currentStartIndex + i) % list.length;
    list[idx].classList.add(`trailers__video-${i + 1}`);
  }
}
