// 1) Helper (DOIT être avant sTap/sOp/etc.)
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

// 2) Sons
const sTap   = makeSoundPool("assets/tetris_move_piece.wav");            // chiffres
const sOp    = makeSoundPool("assets/tetris_rotate_piece.wav");          // + - * /
const sClear = makeSoundPool("assets/tetris_line_clear.wav", 3, 0.35);   // C (je te conseille line_clear ici)
const sBack  = makeSoundPool("assets/tetris_piece_landed.wav", 4, 0.40); // ←
const sEqual = makeSoundPool("assets/tetris_level_up_jingle.wav", 3, 0.35); // =
const sDot   = makeSoundPool("assets/tetris_menu_sound.wav", 4, 0.4);
const sError = makeSoundPool("assets/tetris_game_over.wav", 2, 0.35);
const sCombo = makeSoundPool("assets/tetris_4_lines.wav", 2, 0.45);

// 3) Calculatrice
const appendToDisplay = (value) => {
  if (value === ".") sDot();
  else if (["+", "-", "*", "/"].includes(value)) sOp();
  else sTap();

  const display = document.getElementById("display");
  display.value += value;
};

const clearDisplay = () => {
  sClear();
  document.getElementById("display").value = "";
};

const deleteLast = () => {
  sBack();
  let display = document.getElementById("display").value;
  document.getElementById("display").value =
    display.substring(0, display.length - 1);
};

const calculateResult = () => {
  const display = document.getElementById("display");

  if (display.value.trim() === "") return;

  try {
    const result = eval(display.value);
    display.value = result;

    if (Math.abs(Number(result)) >= 100) sCombo();
    else sEqual();
  } catch {
    sError();
    display.value = "Error";
  }
};

// 4) Musique de fond (Chrome-safe)
window.addEventListener("DOMContentLoaded", () => {
  const bgm = document.getElementById("bgm");
  if (!bgm) return; // évite crash si <audio id="bgm"> absent

  bgm.volume = 0.1;

  const startMusic = () => {
    bgm.play().catch(() => {});
  };

  document.addEventListener("click", startMusic, { once: true });
  document.addEventListener("keydown", startMusic, { once: true });
});