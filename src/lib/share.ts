export const share = async (shareData: ShareData) => {
  try {
    await navigator.share(shareData);
    return true;
  } catch {
    return false;
  }
};
