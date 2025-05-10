export function lowerCaseFirstLetter(str) {
  return str[0].toLowerCase() + str.slice(1);
}

export function reFormaterResponseData(obj){
  return obj.map(record => {
      const fields = {};
      for (const key of Object.keys(record.fields)) {
          if (typeof record.fields[key] === "object") {
              fields[lowerCaseFirstLetter(key)] = record.fields[key];
          } else if (typeof record.fields[key] === "string" || typeof record.fields[key] === "number") {
              fields[lowerCaseFirstLetter(key)] = record.fields[key];
          }
      }
      return {
          customId: record.id,
          ...fields,
      };
  });
}