import moment from 'moment';

export function convertStringToTimeStamp(timeString) {
    if (timeString) {
      const date = moment(timeString, 'YYYY-MM-DD');
      if (date) {
        return date.unix();
      }
    }
    return null;
}

export function convertTimeStampToDateString(timeStamp) {
    if (timeStamp) {
        return moment(timeStamp * 1000).format('DD/MM/YYYY');
    }
    return '';
}

export function convertTimeStampToTimeString(timeStamp) {
    if (timeStamp) {
        return moment(timeStamp * 1000).format('DD/MM/YYYY HH:mm:ss');
    }
    return '';
}

export function convertTimeStampToMinString(timeStamp) {
    if (timeStamp) {
        return moment(timeStamp * 1000).format('HH:mm DD/MM');
    }
    return '';
}

export function getDuration(timeStamp) {
    if (timeStamp) {
        return moment(timeStamp * 1000).format('HH:mm:ss');
    }
    return '';
}