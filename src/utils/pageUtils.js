export const urlInitialization = () => {
  if (window.location.hash === "#_=_") {
    window.location.hash = "";
    history.pushState("", document.title, window.location.pathname);
  }
};