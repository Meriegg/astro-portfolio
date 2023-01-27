export default (link: string) => {
  const element = document.createElement("a");
  element.setAttribute("href", link);
  element.setAttribute("download", link);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
