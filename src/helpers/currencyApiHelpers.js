export const setDataToLocalStorage = data => {
    const currencyDataWithTimestamp = {
        timestamp: Date.now(),
        data,
    };
    localStorage.setItem('lastCurrencyDate', JSON.stringify(currencyDataWithTimestamp));
};

export const getCurrencyDataFromLocalStorage = () => {
    const storedData = localStorage.getItem('lastCurrencyDate');
    if (storedData) {
        const parsedStoredData = JSON.parse(storedData);
        const now = Date.now();
        const oneHourStep = 60 * 60 * 1000; // 1 saat (milisaniye cinsinden)
        if (now - parsedStoredData.timestamp < oneHourStep) {
            return parsedStoredData; // 1 saat geçmemiş, cache'deki veriyi döndür
        }
    }
    return null; // Cache yok veya 1 saat geçmiş, yeni veri çek
};
