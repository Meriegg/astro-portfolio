export default (command: string) => {
  const splitCommand = command.split(" ");

  const action = splitCommand[0];
  const unparsedArgs = splitCommand.slice(1, splitCommand.length);

  let parsedArgs: { [key: string]: string } = {};
  let argsLen = 0;

  unparsedArgs.forEach((arg, i) => {
    if (arg.startsWith("--") && unparsedArgs[i + 1]) {
      parsedArgs[arg.replace("--", "")] = unparsedArgs[i + 1];
      argsLen += 1;
    }
  });

  return {
    action,
    argsLen,
    args: parsedArgs,
  };
};
