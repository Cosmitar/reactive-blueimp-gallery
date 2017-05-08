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

export const generate_hash = (chain) => {
  let hash = 0;
  let i;
  let chr;
  if (chain.length === 0) {
    return hash;
  }
  for (i = 0; i < chain.length; i++) {
    chr = chain.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export const object_to_key = (obj) => {
  return obj
    ? generate_hash(Object.values(obj).reduce((a, b) => `${b}${a}`))
    : '';
};

export const constants = {
  DEFAULT_CLASS_NAME: 'react-blueimp',
  REACT_MIME_TYPE: 'text/react',
};
