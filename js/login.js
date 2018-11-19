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
        //element
        this.loginName = $('#username');
        this.loginPass = $("#password");
        //tip
        this.nameTip = $("#login-name-tip");
        this.passTip = $("#login-pass-tip");
        //btn
        this.signinSubmit = $("#signin-btn");
    },
    bindEvent(){
        //toggle tip
        this.loginName.on('focus',this.methods.toggleTip.bind(this,this.nameTip,true));
        this.loginName.on('blur',this.methods.toggleTip.bind(this,this.nameTip,false));
        this.loginPass.on('focus', this.methods.toggleTip.bind(this, this.passTip, true));
        this.loginPass.on('blur', this.methods.toggleTip.bind(this, this.passTip, false));
        // btn
        this.signinSubmit.on('click',throttle(this.methods.ajaxSubmit.bind(this),2000));
    },
    methods : {
        toggleTip: function (tip, drag) {
            drag ? tip.css("display", "block") : tip.css("display", "none");
        },
        ajaxSubmit : function(){
            var data = `name=${this.loginName.val()}&password=${this.loginPass.val()}`;
            console.log(data);
            const promise = asyncMethods.postMessages("http://jsonplaceholder.typicode.com/posts",data);
            promise.then(data => {
                console.log(data.id);
                new Tips("success", '登录成功', 2000);
                setTimeout(() => {
                    window.location.href = `index/${data.id}`;
                }, 1000)
            }).catch(err => {
                new Tips('error', '用户名或密码输入错误', 2000);
            })
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
        //element
         this.retrieveName = $("#retrieve-name");
         this.retrievePhone = $("#retrieve-phone")
         this.newPassword = $("#new-password");
        // tip
        this.passTip = $("#retrieve-pass-tip")
        this.nameTip = $("#retrieve-name-tip");
        this.phoneTip = $("#retrieve-phone-tip");
        //drag
        this.nameDrag = $("#retrieve-name-drag");
        this.phoneDrag = $("#retrieve-phone-drag");
        this.passDrag = $("#retrieve-pass-drag");
        //btn
        this.retrieveBtn = $("#retrieve-btn");
        this.user;
     },
     bindEvent(){
         this.retrieveName.on("blur",this.methods.isName.bind(this));
         this.retrievePhone.on("blur",this.methods.isPhoneRule.bind(this));
         this.newPassword.on('input',debounce(this.methods.isPassRule.bind(this),500));
         this.retrieveBtn.on("click",this.methods.ajaxSubmit.bind(this));
     },
     methods:{
        toggleTip: function (tip, drag) {
            drag ? tip.css("display", "block") : tip.css("display", "none");
        },
        isName : function(e){
            this.nameDrah.addClass("fa-spinner fa-spin");
            var data = e.target.value;
            var promise = asyncMethods.postMessages("", data);
            promise.then( data => {
                user = data;
                this.nameDrag.removeClass("fa-spinner fa-spin").addClass("fa-check-circle-o greenColor");
            }).catch(err => {
                this.nameDrag.removeClass("fa-spinner fa-spin").addClass("fa-times-circle-o redColor");
            })
        },
        isPhoneRule : function(e){
            e.target.value == this.user.phone ? this.phoneDrag.removeClass("fa-times-circle-o redColor").addClass("fa-check-circle-o greenColor") : this.phoneDrag.removeClass("fa-check-circle-o greenColor").addClass("fa-times-circle-o redColor");
        },
         isPassRule: function (e) {
             var drag = e.target.value.match(/[A-z0-9_!\.@+-]{6,}/) != null ? true : false;
             if (drag) {
                 this.passDrag.removeClass("fa-times-circle-o redColor").addClass("fa-check-circle-o greenColor");
             } else {
                 this.passDrag.removeClass("fa-check-circle-o greenColor").addClass("fa-times-circle-o redColor");
             }
         },
         ajaxSubmit : function(){
             var drag = this.nameDrag.hasClass("greenColor") && this.phoneDrag.hasClass("greenColor") && this.passDrag.hasClass("greenColor") ? true : false;
             if(drag) {
                 var data = `password=${this.newPassword.val()}`
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
        //element
        this.registerName = $("#register-name");
        this.registerPhone = $("#register-phone");
        this.registerPass = $("#register-password");
        this.registerSex = $("#register-sex");
        //tips
        this.nameTip = $("#register-name-tip");
        this.phoneTip = $("#register-phone-tip");
        this.passTip = $("#register-pass-tip");
        this.sexTip = $("#register-sex-tip");
        //drag
        this.nameDrag = $("#register-name-drag");
        this.phoneDrag = $("#register-phone-drag");
        this.passDrag = $("#register-pass-drag");
        this.sexDrag = $("#register-sex-drag");
        //btn
        this.registerBtn = $("#register-btn");
    },
    bindEvent(){
        //toggle Tip
        this.registerName.on("focus",this.methods.toggleTip.bind(this,this.nameTip,true));
        this.registerName.on("blur", this.methods.toggleTip.bind(this,this.nameTip, false));
        this.registerPhone.on("focus", this.methods.toggleTip.bind(this,this.phoneTip, true));
        this.registerPhone.on("blur", this.methods.toggleTip.bind(this,this.phoneTip, false));
        this.registerPass.on("focus", this.methods.toggleTip.bind(this,this.passTip, true));
        this.registerPass.on("blur", this.methods.toggleTip.bind(this,this.passTip, false));
        this.registerSex.on("focus", this.methods.toggleTip.bind(this,this.sexTip, true));
        this.registerSex.on("blur", this.methods.toggleTip.bind(this,this.sexTip, false));
        // toggle drag
        this.registerName.on('input',debounce(this.methods.isNameRule.bind(this),500));
        this.registerPhone.on('input',debounce(this.methods.isPhoneRule.bind(this),500));
        this.registerPass.on('input',debounce(this.methods.isPassRule.bind(this),500));
        this.registerSex.on('input',debounce(this.methods.isSexRule.bind(this),500));
        // btn
        this.registerBtn.on("click",this.methods.ajaxSubmit.bind(this));
    },
    methods : {
        isNameRule : function(e){
            var firstDrge = e.target.value.match(/^[A-z]/);
            var lengthDrag = e.target.value.match(/(\w){6,}/)
            if (firstDrge && lengthDrag) {
                this.nameDrag.removeClass("fa-times-circle-o redColor").addClass("fa-check-circle-o greenColor");
            } else {
                this.nameDrag.removeClass("fa-check-circle-o greenColor").addClass("fa-times-circle-o redColor");
            }
        },
        isPhoneRule : function(e) {
            var drag = e.target.value.match(/^[1]([0-9]{10})$/) != null ? true : false;
            if(drag) {
                this.phoneDrag.removeClass("fa-times-circle-o redColor").addClass("fa-check-circle-o greenColor");
            } else{
                this.phoneDrag.removeClass("fa-check-circle-o greenColor").addClass("fa-times-circle-o redColor");
            }
        },
        isPassRule : function(e){
            var drag = e.target.value.match(/[A-z0-9_!\.@+-]{6,}/) != null ? true : false;
           if (drag) {
               this.passDrag.removeClass("fa-times-circle-o redColor").addClass("fa-check-circle-o greenColor");
           } else {
               this.passDrag.removeClass("fa-check-circle-o greenColor").addClass("fa-times-circle-o redColor");
           }
        },
        isSexRule : function(e) {
            var drag = e.target.value == '男' || e.target.value == '女' ? true : false;
            if (drag) {
                this.sexDrag.removeClass("fa-times-circle-o redColor").addClass("fa-check-circle-o greenColor");
            } else {
                this.sexDrag.removeClass("fa-check-circle-o greenColor").addClass("fa-times-circle-o redColor");
            }
        },
        toggleTip : function(tip,drag){
            drag ? tip.css("display","block") : tip.css("display","none");
        },
        ajaxSubmit : function(){
            var drag = this.nameDrag.hasClass('greenColor') && this.phoneDrag.hasClass('greenColor') && this.passDrag.hasClass('greenColor') && this.sexDrag.hasClass('greenColor') ? true : false;
            console.log(drag);
            if(drag){
                var data = `name=${this.registerName.val()}&phone=${this.registerPhone.val()}&password=${this.registerPass.val()}&sex=${this.registerSex.val()}`;
                const promise = asyncMethods.postMessages("http://jsonplaceholder.typicode.com/posts",data);
                promise.then(data => {
                    console.log(data);
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
     },
     getMessage :function(url,data) {
         var data = data || "";
         return Promise( (resolve , reject) => {
             $.ajax({
                 type:"GET",
                 url : url,
                 data : data,
                 success : function(data) {
                     resolve(data);
                 },
                 error : function(err){
                     reject(err);
                 }
             })
         })
     },
 }