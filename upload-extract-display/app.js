(function () {
  const fileInput = document.getElementById("file-input");
  const imagesContainer = document.querySelector(".append-images-here");

  let selectedFile;
  let entries;
  
  const getEntries = (file, options) => {
    return new zip.ZipReader(new zip.BlobReader(file)).getEntries(options);
  };

  const refreshList = async () => {
    // for all entries, getData and convert it to image and append it
    // get rid of all children except the first one
    while (imagesContainer.firstChild) {
        imagesContainer.removeChild(imagesContainer.firstChild);
    }

    // using promise all to get all entries
    const entriesPromises = Promise.all(
        entries.map(async (entry) => {
            return  await entry.getData(new zip.BlobWriter());
        }
    ));

    // wait for all entries to be loaded
    const entriesData = await entriesPromises;

    // for each entry, create an image and append it
    entriesData.forEach((entryData) => {
        const image = document.createElement("img");
        image.src = URL.createObjectURL(entryData);
        image.width = 200;
        imagesContainer.appendChild(image);
    }
    );
  };

  const loadFiles = async (filenameEncoding) => {
    entries = await getEntries(selectedFile, { filenameEncoding });
    if (entries && entries.length > 0) {
      await refreshList();
    }
  };

  fileInput.addEventListener("change", async function (e) {
    const file = e.target.files[0];
    selectedFile = file;
    await loadFiles();
  });
})();
