// headphoneAlarm.js
// Minimal headphone alarm module. Exports playAlarm() for other pages.
// Uses audio element and setSinkId if available. Attempts to route to device labeled "head".

let audioEl = null;

export async function playAlarm() {
  if (!audioEl) {
    audioEl = document.createElement('audio');
    audioEl.src = '/public/alarm.mp3'; // if using static host, this path may be '/alarm.mp3'
    audioEl.loop = true;
    audioEl.preload = 'auto';
    document.body.appendChild(audioEl);
  }

  // Try to detect audio output devices and route if possible
  try {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const outputs = devices.filter(d => d.kind === 'audiooutput');
      const hp = outputs.find(d => d.label && d.label.toLowerCase().includes('head'));
      if (hp && audioEl.setSinkId) {
        try {
          await audioEl.setSinkId(hp.deviceId);
          console.log('Audio routed to', hp.label);
        } catch (err) {
          console.warn('setSinkId failed', err);
        }
      }
    }
  } catch (e) {
    // no device API available or permission denied
  }

  try {
    await audioEl.play();
  } catch (e) {
    console.warn('Autoplay failed — user interaction may be required', e);
  }

  // stop after 6s for a demo (caller may control)
  setTimeout(() => {
    if (audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
    }
  }, 6000);
}
