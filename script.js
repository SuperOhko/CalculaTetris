// Write JavaScript code here
const appendToDisplay = (value) => {
  if (value === ".") {
    sDot();
  } else if (["+", "-", "*", "/"].includes(value)) {
    sOp();
  } else if (("=").includes(value)) {
    sEqual();
  } else if (("C").includes(value)) {
    sClear();
  } else if (("←").includes(value)) {
    sBack();
  } else {
    sTap();
  };

  const display = document.getElementById("display");
  display.value += value;
};


const clearDisplay = () => {
    const display = document.getElementById("display");
    display.value = "";
}

const deleteLast = () => {
  let display = document.getElementById('display').value;
  document.getElementById('display').value =
    display.substring(0, display.length - 1);
};

const calculateResult = () => {
  const display = document.getElementById("display");
  display.value = eval(display.value);
};

window.addEventListener("DOMContentLoaded", () => {
  const bgm = document.getElementById("bgm");
  bgm.volume = 0.2;

  const startMusic = () => {
    bgm.play().catch(() => {});
    document.removeEventListener("click", startMusic);
    document.removeEventListener("keydown", startMusic);
  };

  // Chrome: démarre dès la première interaction utilisateur
  document.addEventListener("click", startMusic, { once: true });
  document.addEventListener("keydown", startMusic, { once: true });
});

const makeSoundPool = (src, poolSize = 6, volume = 0.45) => {
  const pool = Array.from({ length: poolSize }, () => {
    const a = new Audio(src);
    a.volume = volume;
    return a;
  });

  let i = 0;

  return () => {
    const a = pool[i];
    i = (i + 1) % pool.length;
    a.currentTime = 0;
    a.play().catch(() => {});
  };
};

const sTap   = makeSoundPool("assets/tetris_move_piece.wav");         // chiffres + .
const sOp    = makeSoundPool("assets/tetris_rotate_piece.wav");       // + - * /
const sClear = makeSoundPool("assets/tetris_game_over.wav", 3, 0.35); // C
const sBack  = makeSoundPool("assets/tetris_piece_landed.wav", 4, 0.40); // ←
const sEqual = makeSoundPool("assets/tetris_level_up_jingle.wav", 3, 0.35); // =
const sDot   = makeSoundPool("assets/tetris_menu_sound.wav", 4, 0.4);
const sError = makeSoundPool("assets/tetris_game_over.wav", 2, 0.35);
const sCombo = makeSoundPool("assets/tetris_4_lines.wav", 2, 0.45);




