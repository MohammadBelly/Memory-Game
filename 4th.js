document.querySelector(".control-buttons span").onclick = () => {
  let yName = prompt("Type Your Name :)");

  if (yName === null || yName === "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yName;
  }

  document.querySelector(".control-buttons").remove();
};

let duration = 1000;

let blocksCont = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksCont.children);

let ordering = Array.from(Array(blocks.length).keys());

shuffle(ordering);

function shuffle(array) {
  let current = array.length,
    random,
    temp;

  while (current > 0) {
    random = Math.floor(Math.random() * current);

    current--;

    temp = array[current];

    array[current] = array[random];

    array[random] = temp;
  }
  return array;
}

blocks.forEach((block, index) => {
  block.style.order = ordering[index];

  block.addEventListener("click", function () {
    flipBlocks(block);
    document.querySelector(".flip").play();
  });
});

function flipBlocks(selected) {
  selected.classList.add("is-flipped");

  let allFlipped = blocks.filter((allFlipped) =>
    allFlipped.classList.contains("is-flipped")
  );

  if (allFlipped.length === 2) {
    stop();

    checkBlocks(allFlipped[0], allFlipped[1]);
  }
}

function stop() {
  blocksCont.classList.add("no-clicking");

  setTimeout(() => {
    blocksCont.classList.remove("no-clicking");
  }, duration);
}

function checkBlocks(firstBlock, secondBlock) {
  if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    let git = document.querySelector(".git span");
    setTimeout(() => {
      document.querySelector(".right").play();
      git.innerHTML = parseInt(git.innerHTML) + 1;
    }, duration);
  } else {
    let tries = document.querySelector(".tries span");

    setTimeout(() => {
      tries.innerHTML = parseInt(tries.innerHTML) + 1;

      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
      document.querySelector(".wrong").play();
    }, duration);

    if (tries.innerHTML === "120") {
      setTimeout(() => {
        blocksCont.classList.add("game-over");
        let over = document.querySelector(".over");
        over.style.visibility = "visible";
        document.querySelector(".g-over").play();
      }, 2000);
    }
  }
}
