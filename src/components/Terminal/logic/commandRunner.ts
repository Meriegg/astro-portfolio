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
  NavigateToPath,
  NavigateToResume,
  DownloadResume,
  ToggleCursorBubble,
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
  const toBeChecked = { action, argsLen };

  switch (true) {
    case isValid({ action: "help", argsLen: 0 }, toBeChecked):
      return Help();

    case isValid({ action: "about", argsLen: 0 }, toBeChecked):
      return About();

    case isValid({ action: "credentials", argsLen: 0 }, toBeChecked):
      return Credentials();

    case isValid({ action: "contact", argsLen: 1 }, toBeChecked):
      return NavigateToContact(args);

    case isValid({ action: "contact", argsLen: 0 }, toBeChecked):
      return Contact();

    case isValid({ action: "source", argsLen: 1 }, toBeChecked):
      return NavigateToSource(args);

    case isValid({ action: "source", argsLen: 0 }, toBeChecked):
      return Source();

    case isValid({ action: "clear", argsLen: 0 }, toBeChecked):
      return Clear();

    case isValid({ action: "cls", argsLen: 0 }, toBeChecked):
      return Clear();

    case isValid({ action: "navigate", argsLen: 1 }, toBeChecked):
      return NavigateToPath(args);

    case isValid({ action: "resume", argsLen: 1 }, toBeChecked):
      return DownloadResume(args);

    case isValid({ action: "cursorBubble", argsLen: 1 }, toBeChecked):
      return ToggleCursorBubble(args);

    case isValid({ action: "resume", argsLen: 0 }, toBeChecked):
      return NavigateToResume();

    default:
      return CreateError(
        `Unknown command ${action} with argumens ${JSON.stringify(args)}`
      );
  }
};
