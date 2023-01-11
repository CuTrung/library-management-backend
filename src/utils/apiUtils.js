const resFormat = (errorCode = -1, errorMessage, data = '') => {
    return {
        EC: errorCode,
        EM: errorMessage ?? 'Something wrongs on server...',
        DT: data
    }
}

const delay = async (time = 500) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, time)
    })

}

const convertPathToUrl = (path, method) => {
    switch (method) {
        case 'GET':
            method = 'read';
            break;
        case 'POST':
            method = 'create';
            break;
        case 'PATCH':
            method = 'update';
            break;
        case 'DELETE':
            method = 'delete';
            break;
        default:
            break;
    }


    if (method)
        return path.concat(`/${method}`).replace('/api', '');
    return path.replace('/api', '');
}


export default {
    resFormat, delay, convertPathToUrl
}