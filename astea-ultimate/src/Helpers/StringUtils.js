const parseTextToHTML = str => {
    return str.replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
};

export { parseTextToHTML };