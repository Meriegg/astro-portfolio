import { COMMAND_OUTPUTS } from "../../../constants";

export const Help = () => COMMAND_OUTPUTS.help;
export const About = () => COMMAND_OUTPUTS.about;
export const Credentials = () => COMMAND_OUTPUTS.credentials;

export const CreateError = (errorMessage: string) =>
  `<span><span class="text-terminal-red">Error:</span> ${errorMessage}</span>`;
