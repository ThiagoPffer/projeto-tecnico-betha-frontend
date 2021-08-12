appModule.config(function($httpProvider) {
    $httpProvider.interceptors.push("timestampInterceptor");
    $httpProvider.interceptors.push("tokenInterceptor");
    $httpProvider.interceptors.push("loginInterceptor");
    $httpProvider.interceptors.push("errorInterceptor");
});