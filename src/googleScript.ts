console.log("hi google");

const sleepMs = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });

const downloadImage = (imageUrl: string, fileName: string) => {
  const downloadLink = document.createElement("a");
  downloadLink.href = imageUrl;
  downloadLink.download = fileName;
  // 클릭 이벤트 발생
  downloadLink.click();
};

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  try {
    const imageLinkElementList = document.querySelectorAll(".FRuiCf");

    const length = request.imageLength;

    for (let i = 0; i < length; i++) {
      const imageLinkElement = imageLinkElementList[i];
      (imageLinkElement as HTMLAnchorElement).click();
      await sleepMs(1000);
      const imageElement = document.querySelector(`[jsname="JuXqh"]`);
      const imageUrl = imageElement.getAttribute("src");

      console.log("여기", i);
      downloadImage(imageUrl, `${request.search}_${i}.jpg`);
      await sleepMs(500);
    }
    console.log(123123);
    // 응답을 보내려면 sendResponse를 사용
    sendResponse({ message: "Message received in Content Script!" });
    return true;
  } catch (err) {
    sendResponse({ message: "error" });
    return true;
  }
});
