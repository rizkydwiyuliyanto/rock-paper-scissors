let test = document.querySelector(".test");
let btn_playagain = document.querySelector(".btn-playagain");
let result = document.querySelector(".result");
let hand_sign = document.querySelector(".hand-sign");
let result_text = document.getElementById("result-text");
let score_text = document.getElementById("score-text");
let result_and_playagain = document.querySelector(".result-and-playagain");
btn_playagain.onclick = () => {
  hand_sign.style.display = "block";
  result.style.display = "none"
  result_text.innerText = "";
  document.getElementById("sign_picked").style.display = "none"
  document.getElementById("sign_house_picked").style.display = "none"
  result_and_playagain.style.display = "none";
}
let rules = {
  "paper": {
    img: './images/icon-paper.svg',
    result: {
      1: ["rock", "spock"],
      0: ["scissors", "lizard"]
    }
  },
  "scissors": {
    img: './images/icon-scissors.svg',
    result: {
      1: ["paper", "lizard"],
      0: ["rock", "spock"]
    }
  },
  "rock": {
    img: "./images/icon-rock.svg",
    result: {
      1: ["scissors", "lizard"],
      0: ["paper", "spock"]
    }
  },
  "spock": {
    img: "./images/icon-spock.svg",
    result: {
      1: ["scissors", "rock"],
      0: ["paper", "lizard"]
    }
  },
  "lizard": {
    img: './images/icon-lizard.svg',
    result: {
      1: ["spock", "paper"],
      0: ["scissors", "rock"]
    }
  }
}
let rules_btn = document.querySelector(".rules-btn");
let close_rules = document.getElementById("close-rules");
let sign = document.querySelectorAll(".sign");
rules_btn.onclick = () => {
  let modal = document.querySelector('.modal');
  console.log("MODAL")
  modal.style.display = "flex"
}
close_rules.onclick = () => {
  let modal = document.querySelector('.modal');
  modal.style.display = "none"
}

let score = 0;

let setScore = (result) => {
  score += result
  score_text.innerText = `${score}`
}
setScore(0)
const setSide = (side) => {
  let sign_picked;
  let img_sign_picked;
  let bg_sign_picked;
  const bg_dark = document.querySelector(".bg-dark");
  sign_picked = document.getElementById("sign_picked")
  img_sign_picked = document.getElementById("img_sign_picked");
  bg_sign_picked = document.getElementById("bg_sign_picked");
  bg_dark.style.display = "block"
  if (side === "house-picked") {
    bg_dark.style.display = "none"
    sign_picked = document.getElementById("sign_house_picked")
    img_sign_picked = document.getElementById("img_house_picked");
    bg_sign_picked = document.getElementById("bg_house_picked")
  }
  sign_picked.style.display = "flex"
  return {
    sign_picked, img_sign_picked, bg_sign_picked
  }
}
const setWinnerBg = (id) => {
  const circle = document.querySelectorAll(".circle3x");
  circle.forEach(elem => {
    if (elem.id === id) {
      elem.style.display = "block"
    } else {
      elem.style.display = "none"
    }
  })
}
let setPicked = (id, side) => {
  const { sign_picked, img_sign_picked, bg_sign_picked } = setSide(side)
  img_sign_picked.src = rules[id].img
  if (sign_picked.classList.length > 0) {
    sign_picked.classList.forEach(x => {
      sign_picked.classList.replace(x, id)
    })
  } else {
    sign_picked.classList.add(id);
    bg_sign_picked.classList.add('bg-white')
  }
}
sign.forEach((elem, idx) => {
  elem.onclick = () => {
    let result = document.querySelector(".result");
    hand_sign.style.display = "none";
    result.style.display = "flex"

    setPicked(elem.id, 'picked');
    setWinnerBg("")
    let myFunction = () => {
      let random = Math.floor(Math.random() * Object.keys(rules).length);
      let check = Object.keys(rules[elem.id].result).find(prop => {
        return rules[elem.id].result[prop].includes(sign[random].id)
      });
      setPicked(sign[random].id, "house-picked")
      if (check === "1") {
        setWinnerBg("w_picked")
        result_text.innerText = 'YOU WIN'
        setScore(1)
      } else if (check === "0") {
        setWinnerBg("w_house_picked")
        result_text.innerText = 'YOU LOSE'
        setScore(-1)
      } else {
        result_text.innerText = 'DRAW'
        setWinnerBg("")
        setScore(0)
      }
      result_and_playagain.style.display = "flex"
    }
    setTimeout(myFunction, 1000)
    clearTimeout(myFunction)
  }
})