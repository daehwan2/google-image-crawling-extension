const start = () => {
  const searchButton = document.querySelector(".search-button");
  const searchInput = document.querySelector(".search-input");
  const lengthInput = document.querySelector(".image-length-input");

  searchButton.addEventListener("click", async () => {
    const search = (searchInput as HTMLInputElement).value;
    const imageLength = (lengthInput as HTMLInputElement).value;

    if (search.trim() !== "" && +imageLength > 0) {
      const dataToSend = { message: "download-image", search, imageLength };

      chrome.runtime.sendMessage(dataToSend, function (response) {
        console.log("Received response:", response);
      });
    }
  });

  searchInput.addEventListener("keypress", (e: any) => {
    const search = (searchInput as HTMLInputElement).value;

    if (e.key === "Enter" && search.trim() !== "") {
      const dataToSend = { message: "download-image", search };

      chrome.runtime.sendMessage(dataToSend, function (response) {
        console.log("Received response:", response);
      });
    }
  });
};

start();
