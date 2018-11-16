// 视图切换
const SwitchView = {
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
SwitchView.init();

// 登录模块
const Login = {
    init(){
        this.render();
        this.bindEvent();
    },
    render(){
        this.loginUname = $('#username');
        this.nameTip = $("#login-uname-tips");
        this.passTip = $("#login-pass-tips");
        this.signinSubmit = $("#signin-btn");
        this.password = $("#password");
        this.nameDrag = false;
        this.passDrag = false;
    },
    bindEvent(){
        this.loginUname.on('input',debounce(this.methods.isNameRule.bind(this),500));
        this.password.on('input',debounce(this.methods.isPassRule.bind(this),500));
        this.signinSubmit.on('click',throttle(this.methods.ajaxSubmit.bind(this),2000));
    },
    methods : {
        isNameRule : function(e){
            this.nameDrag = false;
            var firstDrge = e.target.value.match(/^[A-z]/);
            var lengthDrag = e.target.value.match(/(\w){6,}/)
            if (firstDrge && lengthDrag) {
                this.nameDrag = true;
                this.nameTip.removeClass("err-tips").html("用户名格式正确");
            } else {
                this.nameTip.html("用户名格式不正确").addClass("err-tips").css("display", "block");
            }
        },
         isPassRule: function (e) {
             this.passDrag = false;
             var drag = e.target.value.match(/[A-z0-9_!\.@+-]{6,}/) != null ? true : false;
             if (drag) {
                 this.passDrag = true;
                 this.passTip.removeClass("err-tips").html("密码格式正确");
             } else {
                 this.passTip.addClass("err-tips").html("密码格式不正确").css("display", "block");
             }
         },
        ajaxSubmit : function(){
           if(this.nameDrag&&this.passDrag) {
                var data = `name=${this.loginUname.val()}&password=${this.password.val()}`;
                console.log(data);
                const promise = asyncMethods.postMessages("http://jsonplaceholder.typicode.com/posts");
                promise.then(data => {
                    new Tips("success", '登录成功', 2000);
                    setTimeout(() => {
                        window.location.href = `index/${data.id}`;
                    }, 1000)
                }).catch(err => {
                    new Tips('error', '用户名或密码输入错误', 2000);
                })
           } else {
               new Tips('error','用户名或密码输入错误',1000);
           }
        },

    },
}
 Login.init();

//找回密码模块
 const Retrieve = {
     init(){
         this.render();
         this.bindEvent();
     },
     render(){
         this.retrieveEmial = $("#retrieve-emial");
         this.retrieveTips = $("#retrieve-tips");
         this.newPassword = $("#new-password");
         this.retrieveBtn = $("#retrieve-btn");
         this.passTip = $("#retrieve-pass-tips")
         this.emialDrag = false;
         this.passDrag = false;
     },
     bindEvent(){
         this.retrieveEmial.on("input",debounce(this.methods.isEmialRule.bind(this),500));
         this.newPassword.on('input',debounce(this.methods.isPassRule.bind(this),500));
         this.retrieveBtn.on("click",this.methods.ajaxSubmit.bind(this));
     },
     methods:{
         isEmialRule : function(e){
             this.emialDrag =false;
             var drag = e.target.value.match(/^([w]{3}\.|[w]{0})([\w\W]{1,})(\.com$)/) != null ? true : false;
             if(drag){
                 this.emialDrag = true;
                 this.retrieveTips.removeClass("err-tips").html("邮箱格式正确");
             } else {
                 this.retrieveTips.addClass("err-tips").html("邮箱格式不正确").css("display","block");
             }
         },
         isPassRule : function(e){
            this.passDrag = false;
            var drag = e.target.value.match(/[A-z0-9_!\.@+-]{6,}/) != null ? true : false;
            if(drag){
                this.passDrag = true;
                this.passTip.removeClass("err-tips").html("密码格式正确");
            } else {
                this.passTip.addClass("err-tips").html("密码格式不正确").css("display", "block");
            }
         },
         ajaxSubmit : function(){
             if(this.emialDrag&&this.passDrag) {
                 var data = `emial=${this.retrieveEmial.val()}&newPassword=${this.newPassword.val()}`
                 console.log(data);
                 const promise = asyncMethods.postMessages("http://jsonplaceholder.typicode.com/posts", data);
                 promise.then(data => {
                     new Tips("success", "修改成功", 1000);
                     console.log(data);
                     setTimeout(() => {
                         location.reload();
                     }, 500)
                 }).catch(err => {
                     new Tips("error", "修改失败", 1000);
                 })
             } else{
                 new Tips("error","您输入的信息不正确",1000);
             }
         }
     }
 }
 Retrieve.init();

//注册模块
const Register = {
    init(){
        this.render();
        this.bindEvent();
    },
    render(){
        this.registerName = $("#register-name");
        this.registerEmial = $("#register-emial");
        this.registerPassword = $("#register-password");
        this.nameTip = $("#register-name-tips");
        this.emialTip = $("#register-emial-tips");
        this.passTip = $("#register-pass-tips");
        this.registerBtn = $("#register-btn");
        this.nameDrag = false;
        this.emialDrag = false;
        this.passDrag = false;
    },
    bindEvent(){
        this.registerName.on('input',debounce(this.methods.isNameRule.bind(this),500));
        this.registerEmial.on("input",debounce(this.methods.isEmialRule.bind(this),500));
        this.registerPassword.on('input',debounce(this.methods.isPassRule.bind(this),500));
        this.registerBtn.on("click",this.methods.ajaxSubmit.bind(this));
    },
    methods : {
        isNameRule : function(e){
            this.nameDrag =false;
            var firstDrge = e.target.value.match(/^[A-z]/);
            var lengthDrag = e.target.value.match(/(\w){6,}/)
            if (firstDrge && lengthDrag) {
                this.nameDrag = true;
                this.nameTip.removeClass("err-tips").html("用户名格式正确");
            } else {
                this.nameTip.html("用户名格式不正确").addClass("err-tips").css("display","block");
            }
        },
        isEmialRule : function(e){
            this.emialDrag = false;
            var drag = e.target.value.match(/^([w]{3}\.|[w]{0})([\w\W]{1,})(\.com$)/) != null ? true : false;
            if (drag) {
                this.emialDrag = true;
                this.emialTip.removeClass("err-tips").html("邮箱格式正确");
            } else {
                this.emialTip.addClass("err-tips").html("邮箱格式不正确").css("display", "block");
            }
        },
        isPassRule : function(e){
            this.passDrag = false;
            var drag = e.target.value.match(/[A-z0-9_!\.@+-]{6,}/) != null ? true : false;
            if(drag){
                this.passDrag = true;
                this.passTip.removeClass("err-tips").html("密码格式正确");
            } else {
                this.passTip.addClass("err-tips").html("密码格式不正确").css("display", "block");
            }
        },
        ajaxSubmit : function(){
            if(this.nameDrag&&this.emialDrag&&this.passDrag){
                var data = `name=${this.registerName.val()}&emial=${this.registerEmial.val()}&password=${this.registerPassword.val()}`;
                const promise = asyncMethods.postMessages("http://jsonplaceholder.typicode.com/posts",data);
                promise.then(data => {
                    new Tips("success","注册成功",1000);
                    setTimeout(()=> {
                        location.reload();
                    },500)
                }).catch(err => {
                    new Tips("error","注册失败",1000);
                })
            } else {
                new Tips("error","您的信息输入不正确",1000);
            }
        }
    }
}
Register.init();



// ajax  异步方法
 var asyncMethods = {
     postMessages: function (url, data) {
         var data = data || "";
         return new Promise((resolve, reject) => {
             $.ajax({
                 type: "POST",
                 url: url,
                 data : data,
                 success: function (data) {
                     resolve(data)
                 },
                 error: function (err) {
                     reject(err);
                 }
             })
         })
     }
 }