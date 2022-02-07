export const writePokemonFile = (pokemon: string) => {
  return Deno.writeTextFile("./solution.txt", pokemon);

  // write file in Uint8Array
  /*const encoder = new TextEncoder();
  const bytes = encoder.encode(pokemon);
  return Deno.writeFile("./solution.txt", bytes);*/
};
