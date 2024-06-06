function createNode(
  {
    tag = 'p',
    classList = null, //['bg','red',],
    id = null, // ["first-img"]
    textContent = null, // 'Test test'
    href = null, // www.google.com
    src = null, // ./assetes/mobile/image.img
    data = null,
    backgroundColor = null,
  },
  parentNode = document.body
) {
  const element = document.createElement(tag);
  if (classList) {
    element.classList.add(...classList);
  }
  if (id) {
    element.id = id;
  }
  if (textContent) {
    element.textContent = textContent;
  }
  if (href) {
    element.href = href;
  }
  if (src) {
    element.src = src;
  }
  if (data) {
    element.dataset.title = data;
  }

  parentNode.appendChild(element);
  return element;
}
