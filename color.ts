import { bgGreen, bgYellow, bgBrightBlack, white, bold } from "./deps.ts";

const colorMethods = {
  green: bgGreen,
  yellow: bgYellow,
  gray: bgBrightBlack,
};

export function colorLetter(
  color: "green" | "yellow" | "gray",
  letter: string
) {
  const bg = colorMethods[color];
  const colorizedLetter = bg(bold(` ${white(letter)} `));

  return ` ${colorizedLetter} `;
}
