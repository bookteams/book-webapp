const LOGIN = {
    init(){
        this.render();
        this.bindEvent();
    },
    render(){
        this.boxLogin = $(".box-login");
        this.boxRegister = $(".box-register");
        this.boxRetrieve = $(".box-retrieve");

        this.signUp = $("#sign-up");
        this.forgetPassword = $("#forgat-password");
        this.signupReturnLogin = $("#signup-return-login");
        this.retrieveReturnLogin = $("#retrieve-return-login");

    },
    bindEvent(){
        this.forgetPassword.on("click",this.methods.switchDrag.bind(this,this.boxLogin,this.boxRetrieve));
        this.signUp.on("click",this.methods.switchDrag.bind(this,this.boxLogin,this.boxRegister));
        this.signupReturnLogin.on("click",this.methods.switchDrag.bind(this,this.boxRegister,this.boxLogin));
        this.retrieveReturnLogin.on("click",this.methods.switchDrag.bind(this,this.boxRetrieve,this.boxLogin));
    },
    methods : {
        switchDrag(origin, target) {
            let drag = parseInt(target.css("left")) > 0 ? true : false;
            if (drag) {
                origin.animate({
                    left: "-2500px",
                }, 500);
                target.animate({
                    left: "0px",
                })
            } else {
                origin.animate({
                    left: "2500px",
                }, 500);
                target.animate({
                    left: "0px",
                })
            }
        },
    }
}
LOGIN.init();
