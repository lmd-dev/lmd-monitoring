window.onload = () =>
{
    //Login application
    new Vue({
        el: '#app-login',
        components: {
            app: Login
        }
    });
};