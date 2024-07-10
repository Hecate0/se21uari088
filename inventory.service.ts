baseUrl='http://20.244.56.144/test;

getNumbers(type: string) {
    let url= this.baseUrl + '/prime';
    return this.http.get(url);
  }
