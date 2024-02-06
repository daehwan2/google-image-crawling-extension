console.log("Let's go");

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  sendResponse({});
  const { message, search, imageLength } = request;
  console.log("Received message from Popup:", request);

  // 수신한 데이터에 대한 처리
  const tab = await chrome.tabs.create({
    url: `https://www.google.com/search?q=${search}&sca_esv=37f724872de16756&tbm=isch&sxsrf=ACQVn08I62MXskXDk_Xw_5spowreKvl3uQ:1707046109275&source=lnms&sa=X&ved=2ahUKEwjm_tSnypGEAxWzk1YBHbUHAXAQ_AUoAXoECAIQAw&biw=1440&bih=788&dpr=2`,
    active: true,
  });

  console.log(tab);

  await sleep(2000);
  chrome.tabs.sendMessage(tab.id, {
    search,
    imageLength,
    message: "download-image",
  });
  return true;
});
