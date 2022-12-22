import { COMMAND_OUTPUTS } from "../../../constants";
import {
  INSTAGRAM_LINK,
  GITHUB_LINK,
  EMAIL_LINK,
  TWITTER_LINK,
  SOURCE_LINK,
} from "../../../config";
import type { CommandArgsType } from "../../../types";

export const CreateError = (errorMessage: string) =>
  `<span><span class="text-terminal-red">Error:</span> ${errorMessage}</span>`;

export const Help = () => COMMAND_OUTPUTS.help;
export const About = () => COMMAND_OUTPUTS.about;
export const Credentials = () => COMMAND_OUTPUTS.credentials;
export const Contact = () => COMMAND_OUTPUTS.contact;
export const Source = () => COMMAND_OUTPUTS.source;
export const NavigateToSource = (args: CommandArgsType) => {
  if (!args.navigate) {
    return CreateError(`Invalid arguments!`);
  }
  const navigate = args.navigate;

  switch (navigate.toLowerCase()) {
    case "true":
      window.location.href = SOURCE_LINK;
      return "Navigating to the source code...";

    case "false":
      return "You won't be redirected to the source code";

    default:
      return CreateError(
        `Invalid value <span class="text-terminal-red">${navigate}</span>. It can either be <span class="text-terminal-blue">true</span> or <span class="text-terminal-blue">false</span>`
      );
  }
};
export const NavigateToContact = (args: CommandArgsType) => {
  if (!args.source) {
    return CreateError(`Invalid arguments!`);
  }
  const source = args.source;

  switch (source.toLowerCase()) {
    case "github":
      window.location.href = GITHUB_LINK;
      return "Navigating to Github...";

    case "twitter":
      window.location.href = TWITTER_LINK;
      return "Navigating to Twitter...";

    case "email":
      window.location.href = EMAIL_LINK;
      return "Opening your preferred email client...";

    case "instagram":
      window.location.href = INSTAGRAM_LINK;
      return "Navigating to Instagram...";

    default:
      return CreateError(`I cannot be contacted on ${source}`);
  }
};
export const Clear = () => {
  const terminalContent = document.getElementById("TERMINAL_CONTENT");
  if (!terminalContent) {
    return CreateError("There was a problem executing this command");
  }

  terminalContent.innerHTML = "";
  return "";
};
