const getMethod = async url => {
    console.log('get::url ', url);
    
    await fetch(url)
    .then(res => res.json())
    .then(resultJson => {
        console.log('get::resultJson ', resultJson);
        return resultJson;
    })
    .catch(error => {
        const e = error.json();
        console.log('error in get method', e);
        return e;
    });
}

export {
    getMethod,
};