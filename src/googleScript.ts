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

  console.log(downloadLink);
  // 클릭 이벤트 발생
  downloadLink.click();
};

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log("Received message:", request);

  const imageLinkElementList = document.querySelectorAll(".FRuiCf");

  const length = request.imageLength;

  for (let i = 0; i < length; i++) {
    const imageLinkElement = imageLinkElementList[i];
    (imageLinkElement as HTMLAnchorElement).click();
    await sleepMs(1000);
    const imageElement = document.querySelector(`[jsname="JuXqh"]`);
    const imageUrl = imageElement.getAttribute("src");

    console.log("여기");
    downloadImage(imageUrl, `${request.search}_${i}.jpg`);
    await sleepMs(500);
  }

  // 응답을 보내려면 sendResponse를 사용
  sendResponse({ message: "Message received in Content Script!" });

  return true;
});
