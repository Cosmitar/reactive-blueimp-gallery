export const generate_uuid = () => {
  return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const get_safe_html_uuid = () => {
  let uuid = generate_uuid();
  while (!uuid.match(/^[a-zA-Z].*/)) {
    uuid = generate_uuid();
  }
  return uuid;
};

export const constants = {
  REACT_MIME_TYPE: 'text/react',
};
