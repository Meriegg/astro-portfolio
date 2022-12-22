import commandParser from "./commandParser";
import {
  Help,
  About,
  Credentials,
  Clear,
  CreateError,
  Contact,
  NavigateToContact,
  Source,
  NavigateToSource,
} from "./commands";

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

    case isValid({ action: "contact", argsLen: 1 }, { action, argsLen }):
      return NavigateToContact(args);

    case isValid({ action: "contact", argsLen: 0 }, { action, argsLen }):
      return Contact();

    case isValid({ action: "source", argsLen: 1 }, { action, argsLen }):
      return NavigateToSource(args);

    case isValid({ action: "source", argsLen: 0 }, { action, argsLen }):
      return Source();

    case isValid({ action: "clear", argsLen: 0 }, { action, argsLen }):
      return Clear();

    case isValid({ action: "cls", argsLen: 0 }, { action, argsLen }):
      return Clear();

    default:
      return CreateError(
        `Unknown command ${action} with argumens ${JSON.stringify(args)}`
      );
  }
};
