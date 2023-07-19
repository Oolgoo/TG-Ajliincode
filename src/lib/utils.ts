import { AxiosResponse } from 'axios';
import moment, { Moment } from 'moment';
import { exec } from 'pell';
import { DATE_FORMAT } from '../enums';

export const pellFontSize = (obj: HTMLSelectElement) => {
  const size = obj.value;
  const sel = document.getSelection();
  if (sel?.rangeCount && sel?.toString()?.length) {
    const container = document.createElement('div');
    for (let i = 0, len = sel.rangeCount; i < len; ++i) {
      Array.from(sel.getRangeAt(i).cloneContents().childNodes).forEach(
        child => {
          if (child.nodeType === Node.ELEMENT_NODE) {
            (child as HTMLElement).style.fontSize = size;
            container.appendChild(child);
          } else {
            const wrapper = document.createElement('font');
            wrapper.style.fontSize = size;
            wrapper.append(child);
            container.append(wrapper);
          }
        }
      );
    }
    const children = container.getElementsByTagName('*');
    Array.from(children).forEach(_child => {
      const child = _child as HTMLElement;
      if (child.style.fontSize) {
        child.style.fontSize = size;
      }
    });
    exec('insertHTML', container.innerHTML);
  }
}
export const findFontSizeSpan = (elem: HTMLElement): HTMLElement | false => {
  const result = false;

  if (elem.parentElement) {
    if (elem.parentElement.style.fontSize.length > 0) {
      return elem.parentElement;
    } else {
      const _find = findFontSizeSpan(elem.parentElement);
      if (_find) return _find;
    }
  }
  return result;
}

export const formattedNumber = (n: number) => {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
};
export const convertDate = (date: Moment[] | string[], time?: boolean) => {
  let convertType;

  if (typeof date[0] !== 'string') {
    convertType = time ? 'YYYY-MM-DD HH:MM:SS' : 'YYYY-MM-DD';
  } else {
    convertType = undefined;
  }

  return [
    moment(date[0]).format(convertType),
    moment(date[1]).format(convertType)
  ];
}

export const convertNewDate = (date: Date | string, type?: 'YMD' | 'YMDHM') => {
  let convertType;
  if (typeof date === 'string') {
    convertType = undefined;
  }
  if (!type) {
    convertType = 'YYYY-MM-DD HH:MM:SS';
  } else if (type === 'YMD') {
    convertType = 'YYYY-MM-DD';
  } else if (type === 'YMDHM') {
    convertType = 'YYYY-MM-DD HH:mm'
  }
  return moment(date).format(convertType);
}

export const randomString = (length = 6) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  const stringLength = length;
  let randomstring = '';
  for (let i = 0; i < stringLength; i++) {
    const randomVal =
      Number(window.crypto.getRandomValues(new Uint32Array(1))) / 4294967296;
    const rnum = Math.floor(randomVal * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
}

export const getTodayDate = () => {
  const startDate = new Date();
  const endDate = new Date();

  return {
    startDate: moment(startDate).startOf('days').format(DATE_FORMAT),
    endDate: moment(endDate).endOf('days').format(DATE_FORMAT)
  };
};

export const enumKeys = <O extends object, K extends keyof O = keyof O>(
  obj: O
): K[] => {
  return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
};

export const priceToString = (price: number | string) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const emptyStringCheck = (
  str?: string | number,
  emptyString?: string
): string => {
  return (str && `${str}`) || emptyString || '-';
};

export const hideLast4Char = (str: string) => {
  return str.replace(/\d(?!\d{4})/g, '*');
};

export const numberToLocaleString = (number?: number | string) => {
  if (isNaN(Number(`${number}`))) {
    return 0;
  }
  return Number(`${number}`).toLocaleString();
};

export const hideMiddle4Char = (str: string) => {
  const sstr = str.split('');
  const result: any = [];

  sstr.forEach((x, i) => {
    if (i === 3 || i === 4 || i === 5 || i === 6) {
      result[i] = '*';
    } else {
      result[i] = x;
    }
  });

  return result.join('');
};

export const changeBinaryToFile = (file: any) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      resolve(event.target.result);
    };
    reader.onerror = error => {
      reject(error);
    };
  });
};

export const getImgSize = (
  src: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };

    img.onerror = err => {
      reject(err);
    };
  });
};

export const fileSizeMB = (num?: number) => {
  if (num) {
    if (num > 1000000) {
      return (num / 1000000).toFixed(2) + ' MB'
    } else if (num > 10000) {
      return (num / 10000).toFixed(2) + ' KB'
    }
    else {
      return (num + ' B');
    }
  } else {
    return ''
  }
};

export const convertEmail = (email: string) => {
  const _email = email.split('@');

  if (_email[0].length <= 2) {
    return _email[0].replace(/\w(?!\w{1})/g, '*') + '@' + _email[1];
  } else {
    return _email[0].replace(/\w(?!\w{2})/g, '*') + '@' + _email[1];
  }
};

export const shutOffBrowserFc = () => {
  window.document.onmousedown = event => {
    if (event.button === 2) {
      return false;
    }
  };
  window.document.onkeydown = event => {
    if (event.keyCode === 123) {
      return false;
    }
  };
  window.document.oncontextmenu = () => {
    return false;
  };
};

export const handleBlobToExcel = (
  responseBlob: AxiosResponse,
  fileName: string
) => {
  const url = window.URL.createObjectURL(
    new Blob([responseBlob.data], {
      type: responseBlob.headers['content-type']
    })
  );
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${fileName}.xlsx`);
  document.body.appendChild(link);
  link.click();
};

export const handleBlobToFile = (
  responseBlob: AxiosResponse,
  fileName: string
) => {
  const url = window.URL.createObjectURL(
    new Blob([responseBlob.data], {
      type: responseBlob.headers['content-type']
    })
  );
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${fileName}`);
  document.body.appendChild(link);
  link.click();
}

export const handleFileToDown = (
  response:AxiosResponse,
  fileName: string
) => {
  const url = window.URL.createObjectURL(
    new Blob([response.data], {
      type: 'image/jpg'
    }) 
  );
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${fileName}`);
  document.body.appendChild(link);
  link.click();
}

// multipart/form-data 용
export const convertToFormData = (obj: any) => {
  const formData = new FormData();

  try {
    // params
    formData.append('params', new Blob([JSON.stringify(obj.params)], {
        type: "application/json"
    }));

    if(obj.files){
      //파일명이 old인 파일 제거
      const updFile = obj.files?.filter((e: { fileName: string; }) => e.fileName !== 'old')
      const fileList = updFile.map((file: { originFileObj: any; }) => file.originFileObj) as File[];
  
      for (let i = 0; i < fileList.length; i++) {
        formData.append("file", fileList[i], fileList[i].name);
      }
    }

    return formData;
  } catch (err) {
      console.warn(err);
      return obj;
  }
}