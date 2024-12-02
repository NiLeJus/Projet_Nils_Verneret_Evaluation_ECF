export function appIsDev() {
    return process.env.NODE_ENV === 'development';
  }

export function devConsoleLog(string) {
    if (appIsDev()){
        console.log(string);
    }
};