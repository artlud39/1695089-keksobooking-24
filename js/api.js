const Urls = {
  GET: 'https://24.javascript.pages.academy/keksobooking/data',
  POST: 'https://24.javascript.pages.academy/keksobooking/',
};

const getData = (onSuccess) => {
  fetch(Urls.GET)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    });
};


const sendData = (onSuccess, onError, body) => {
  fetch(Urls.POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        onError('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onError('Не удалось отправить форму. Попробуйте ещё раз');
    });
};


export {getData, sendData};
