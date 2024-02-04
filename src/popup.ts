const start = () => {
  const searchButton = document.querySelector(".search-button");
  const searchInput = document.querySelector(".search-input");

  searchButton.addEventListener("click", async () => {
    const search = (searchInput as HTMLInputElement).value;

    const dataToSend = { message: "download-image", search };

    chrome.runtime.sendMessage(dataToSend, function (response) {
      console.log("Received response:", response);
    });
  });
};

start();
