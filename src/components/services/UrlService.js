let apiDomain = "http://calsmaitmei-app.test/api/";;



class UrlService {
  static loginUrl() {
    return apiDomain + "login";
  }
  static currentUserProfileUrl() {
    return apiDomain + "user";
  }
  static registerUrl() {
    return apiDomain + "register";
  }
  static forgotUrl() {
    return apiDomain + 'password/email';
  }
  static resetPasswordUrl() {
    return apiDomain + 'password/reset';
  }
  static handleRandomizer() {
    return apiDomain + 'randomizer/generate';
  }
  // static saveUserProfileUrl() {
  //   return apiDomain + "api/user";
  // }
  // static getCurrentUserAcitiviesUrl() {
  //   return apiDomain + "api/activities";
  // }
  // static getTodoUrl() {
  //   return apiDomain + "api/todos";
  // }
  // static markTodoCompleteUrl(id) {
  //   return apiDomain + "api/todo/complete/" + id;
  // }
  // static changeTodoOrderUrl() {
  //   return apiDomain + "api/todo/reorder";
  // }
  // static saveTodoUrl() {
  //   return apiDomain + "api/todo/save";
  // }
  // static removeTodoUrl() {
  //   return apiDomain + "api/todo/remove";
  // }
}

export default UrlService;