import {
  CONTACT_EMAIL,
  EMAIL_LINK,
  INSTAGRAM_LINK,
  INSTAGRAM_USERNAME,
  GITHUB_LINK,
  GITHUB_USERNAME,
  TWITTER_LINK,
  TWITTER_USERNAME,
} from "@mariodev14/socials";
import { SOURCE_LINK } from "@src/config";

export const CREDENTIAL_COMMAND_OUTPUT = `
mariodev.vercel.app [Version 2.0.0]
(c) Site developed and deployed by me. All rights reserved.

Welcome to my website!

You can start by typing <span class="text-terminal-yellow">help</span>

`;

// TO BE ADDED
// <span class="text-terminal-yellow">ls</span>: display current directory files
// <span class="text-terminal-yellow">run [PATH]</span>: runs executable files?!
export const HELP_COMMAND_OUTPUT = `
Here is a list of all things you can do:

    <span class="text-terminal-yellow">help</span>: shows a list of available commands
    <span class="text-terminal-yellow">about</span>: something about myself
    <span class="text-terminal-yellow">contact</span>: shows my contact info
    <span class="text-terminal-yellow">contact --source [github || instagram || twitter || email]</span>: navigates you to the preferred contact method
    <span class="text-terminal-yellow">clear || cls</span>: clears the terminal 
    <span class="text-terminal-yellow">source</span>: gives you a link for the source code of this website
    <span class="text-terminal-yellow">source --navigate [true || false]</span>: navigates you to the source code of this website
    <span class="text-terminal-yellow">navigate --path [PATH]</span>: navigates you to the chosen path on the website
    <span class="text-terminal-yellow">cursorBubble --active [true || false]</span>: disable or enable the cursor bubble
    <span class="text-terminal-red">exit</span>: closes the terminal

`;

export const ABOUT_COMMAND_OUTPUT = `
Hi there, I am <span class="text-terminal-blue">Mario</span>!

I am a 14 year old full stack developer based in Romania. I can build Backends, Web Apps, and Mobile apps from scratch using modern technologies that won't give you a headache in production.
You can contact me by closing this terminal and going to the <span class="text-terminal-blue">contact section</span> on my website or by typing <span class="text-terminal-blue">contact</span> in this terminal.

`;

export const CONTACT_COMMAND_OUTPUT = `
You can contact me on:

  <span class="text-terminal-yellow">Email:</span> ${CONTACT_EMAIL} | <a href="${EMAIL_LINK}">press here</a>
  <span class="text-terminal-yellow">Instagram:</span> @${INSTAGRAM_USERNAME} | <a href="${INSTAGRAM_LINK}">visit page</a>
  <span class="text-terminal-yellow">Github:</span> ${GITHUB_USERNAME} | <a href="${GITHUB_LINK}">visit page</a>
  <span class="text-terminal-yellow">Twitter:</span> @${TWITTER_USERNAME} | <a href="${TWITTER_LINK}">visit page</a>

`;

export const SOURCE_COMMAND_OUTPUT = `
You can click this link to open the source code of this website!

<a href="${SOURCE_LINK}">${SOURCE_LINK}</a>

`;

export const COMMAND_OUTPUTS = {
  help: HELP_COMMAND_OUTPUT,
  about: ABOUT_COMMAND_OUTPUT,
  credentials: CREDENTIAL_COMMAND_OUTPUT,
  contact: CONTACT_COMMAND_OUTPUT,
  source: SOURCE_COMMAND_OUTPUT,
};
