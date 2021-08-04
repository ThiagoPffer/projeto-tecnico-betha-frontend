appModule.config(function($httpProvider) {
    $httpProvider.interceptors.push("timestampInterceptor");
    $httpProvider.interceptors.push("tokenInterceptor");
});