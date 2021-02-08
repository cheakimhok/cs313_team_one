let apiDomain = "";
if (process.env.NODE_ENV === "production") {
  apiDomain = "https://life-api.amitavroy.com/";
} else {
  apiDomain = "http://calsmaitmei-app.test/";
}

class UrlService {
  static loginUrl() {
    return apiDomain + "api/login";
  }
  static currentUserProfileUrl() {
    return apiDomain + "api/user";
  }
  static registerUrl() {
    return apiDomain + "api/register";
  }
  static forgotUrl() {
    return apiDomain + 'api/password/email';
  }
  static resetPasswordUrl() {
    return apiDomain + 'api/password/reset/{id}';
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