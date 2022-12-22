import commandParser from "./commandParser";
import { Help, About, Credentials, CreateError } from "./commands";

interface IsValidCheckProps {
  action: string;
  argsLen: number;
}

const isValid = (valid: IsValidCheckProps, toBeChecked: IsValidCheckProps) => {
  // Comparing 2 objects in javascript makes me wanna die 😁
  return JSON.stringify(valid) === JSON.stringify(toBeChecked);
};

export default (command: string) => {
  const { action, args, argsLen } = commandParser(command);

  switch (true) {
    case isValid({ action: "help", argsLen: 0 }, { action, argsLen }):
      return Help();

    case isValid({ action: "about", argsLen: 0 }, { action, argsLen }):
      return About();

    case isValid({ action: "credentials", argsLen: 0 }, { action, argsLen }):
      return Credentials();

    default:
      return CreateError(
        `Unknown command ${action} with argumens ${JSON.stringify(args)}`
      );
  }
};
