document.addEventListener("DOMContentLoaded", () => {
    const videos = [
      "pages/content/video/video1.mp4",
      "pages/content/video/video2.mp4",
      "pages/content/video/video3.mp4",
      "pages/content/video/video4.webm",
      "pages/content/video/video5.webm"
    ];



    const counter = [
        "1 | 5",
        "2 | 5",
        "3 | 5",
        "4 | 5",
        "5 | 5",
    ];

    const links = [
      'pages/kiev.html',
      'pages/feelphysics.html',
      'pages/cyber.html',
      'pages/haptic.html',
      'pages/angst.html'
    ]


    const themes = [
        "theme-dark",
        "theme-light",
        "theme-dark",
        "theme-dark",
        "theme-dark"
    ];

    const fallbackImages = [
        "pages/content/video/fallback-video1.jpg",
        "pages/content/video/fallback-video2.webp",
        "pages/content/video/fallback-video3.webp",
        "pages/content/video/fallback-video4.jpg",
        "pages/content/video/fallback-video5.jpg"
      ];
    

    const headlines = [
      "Kiev 60 L-Grip",
      "Feel Physics",
      "CyberEscape2077",
      "Work at Nuilab",
      "Angst"
    ];

    const subheadlines = [
      "[Product Design]",
      "[UX Research & Design]",
      "[VR Game-Development]",
      "[Haptic Interaction & Bachelor-Thesis]",
      "[Creative Director & DOP]"
    ];


    
    let index = 0;
    let canScroll = true;
    const cooldown = 200;
  
    const getBody = document.body;
    const video = document.getElementById("bgVideo");
    const headline = document.getElementById("headline");
    const subheadline = document.getElementById("subheadline");
    const counters = document.getElementById("counter");
    const fadeOverlay = document.createElement('div');  // Erstelle das Overlay
    fadeOverlay.classList.add('fade-overlay');
    document.body.appendChild(fadeOverlay);  // Füge das Overlay hinzu
  
    // Setze das erste Video sofort beim Laden der Seite
    const firstSource = document.createElement("source");
    firstSource.src = videos[index];
    firstSource.type = "video/webm";
    video.innerHTML = "";  // Entferne alte Quellen (falls vorhanden)
    video.appendChild(firstSource);  // Füge das erste Video hinzu
    video.poster = fallbackImages[index];  // Dynamisch das Poster-Bild setzen
    video.muted = true;
    video.load();
    video.oncanplay = () => {
      video.play().catch(err => {
        console.warn("Autoplay fehlgeschlagen:", err);
      });
    };
    
    //debug
    const v = document.querySelector('#bgVideo');
    v.muted = true;
    v.play().catch(e => console.log('Fehler beim Play:', e));
    
    // Setze den ersten Text sofort nach dem Laden der Seite
    headline.textContent = headlines[index];
    subheadline.textContent = subheadlines[index]; // Setzt den Text sofort beim Laden
    counters.textContent = counter[index];
    applyThemeByIndex(index);
    setClickOverlay(index);

    //Clickoverlay anpassen um zu gewünschten Seite zu kommen

    function setClickOverlay(index) {
      const overlay = document.querySelector('.click-overlay');
      if (overlay && links[index]) {
        overlay.onclick = function () {
          window.location.href = links[index];
        };
      } else {
        console.error('Ungültiger Index oder kein Overlay gefunden.');
      }
    }


    //Setze Color Theme
    function applyThemeByIndex(index) {
        
        // Alle möglichen Theme-Klassen entfernen
        getBody.classList.remove("theme-dark", "theme-light");
    
        // Klasse aus dem Array holen und anwenden (wenn gültig)
        getBody.classList.add(themes[index]);
    }
    
    
    function changeContent(dir) {
      if (!canScroll) return;
  
      let newIndex = index + dir;
      // Wenn das Ende erreicht wird, starte wieder bei 1
      if (newIndex >= videos.length) {
        newIndex = 0;
      } else if (newIndex < 0) {
        newIndex = videos.length - 1;
      }
  
      
      canScroll = false;
      fadeOverlay.style.opacity = 1;

  
      setTimeout(() => {
        const newSource = document.createElement("source");
        newSource.src = videos[newIndex];
        newSource.type = "video/webm";
  
        video.innerHTML = ""; // Entfernt alte Quellen
        video.appendChild(newSource);
        video.poster = fallbackImages[newIndex];  // Dynamisch das Poster-Bild setzen
        video.muted = true;
        video.load();
        video.oncanplay = () => {
          video.play().catch(err => {
            console.warn("Autoplay fehlgeschlagen:", err);
          });
        };
  
        headline.textContent = headlines[newIndex];
        subheadline.textContent = subheadlines[newIndex];
        counters.textContent = counter[newIndex];
        applyThemeByIndex(newIndex);
        setClickOverlay(newIndex)
        // Blende das Overlay aus
        fadeOverlay.style.opacity = 0;
        

        index = newIndex;
  
        setTimeout(() => canScroll = true, cooldown);
      }, 400);
    }
  
    let lastTouchY = 0;
  


    // Scroll-Ereignis (Mausrad)
    document.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaY) > 50) {
        changeContent(e.deltaY > 0 ? 1 : -1);
      }
    });
  
    // Touch-Ereignis (Touchscreen-Swipe)
    document.addEventListener("touchstart", (e) => {
      lastTouchY = e.touches[0].clientY;
    });
  
    document.addEventListener("touchend", (e) => {
      let newY = e.changedTouches[0].clientY;
      let diff = lastTouchY - newY;
      if (Math.abs(diff) > 50) {
        changeContent(diff > 0 ? 1 : -1);
      }
    });


  });

  

