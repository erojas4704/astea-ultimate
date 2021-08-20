const parseTextToHTML = str => {
    return str.replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
};

const nameToInitials = (name) => {
    if(!name) return name;
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part[0]).join('');
    return initials.toUpperCase();
};

const capitalizeNames = (names) => {
    if(!names) return names;
    const namesArray = names.split(' ');
    const capitalizedNames = namesArray.map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
    return capitalizedNames.join(' ');
};

export { parseTextToHTML, nameToInitials, capitalizeNames };