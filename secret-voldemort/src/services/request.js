/* This function allows you to send a request to address `path`,
 with the given `method` and `body` */

 async function sendRequest(methodOpt, keys, path) {

    const requestOptions = {
      method: methodOpt,
      body: keys
    };
  
    return (await fetch(path, requestOptions))
  
  } export default sendRequest