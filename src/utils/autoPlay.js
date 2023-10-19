import canAutoplay from "can-autoplay";

export async function checkUnmutedAutoplaySupport() {
  const response = await canAutoplay.video({ timeout: 100, muted: false });
  if (response.result === false) {
    // Unmuted autoplay is not allowed.
    return await checkMutedAutoplaySupport();
  } else {
    // Unmuted autoplay is allowed.
    return { autoplayAllowed: true, autoplayRequiresMute: false };
  }
}

async function checkMutedAutoplaySupport() {
  const response = await canAutoplay.video({ timeout: 100, muted: true });
  if (response.result === false) {
    // Muted autoplay is not allowed.
    return { autoplayAllowed: false, autoplayRequiresMute: false };
  } else {
    // Muted autoplay is allowed.
    return { autoplayAllowed: true, autoplayRequiresMute: true };
  }
}
