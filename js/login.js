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


const Login = {
    init(){
        this.render();
        this.bindEvent();
    },
    render(){
        this.loginUname = $('#username');
        this.loginTips = $("#login-uname-tips");
        this.signinSubmit = $("#signin-btn");
        this.password = $("#password");
    },
    bindEvent(){
        this.loginUname.on('input',debounce(this.methods.isNameRule.bind(this),1000));
        this.loginUname.on('focus',this.methods.errTip.bind(this));
        this.signinSubmit.on('click',throttle(this.methods.ajaxSubmit.bind(this),2000));
    },
    methods : {
        isNameRule : function(e){
            var firstDrge = e.target.value.match(/^[A-z]/);
            var lengthDrag = e.target.value.match(/(\w){6,}/)
            if (firstDrge && lengthDrag) {
            this.loginTips.css("display", 'none');
            } else {
                this.loginTips.css("display",'block');
            }
        },
        errTip : function(){
            this.loginTips.css("display", 'none');             
        },
        ajaxSubmit : function(){
            var data = `name=${this.loginUname.val()}&password=${this.password.val()}`;
            console.log(data);
            const promise = asyncMethods.postMessages("http://jsonplaceholder.typicode.com/posts");
            promise.then(data => {
                new Tips("success",'登录成功',2000);
                setTimeout(()=> {
                     window.location.href = `index/${data.id}`;
                },1000)
            }).catch(err => {
                new Tips('error','账号或密码输入错误',2000);
            })
        },

    },
}
 Login.init();

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
     },
     bindEvent(){
         this.retrieveEmial.on("input",debounce(this.methods.isEmialRule.bind(this),500));
         this.retrieveBtn.on("click",this.methods.ajaxSubmit.bind(this));
     },
     methods:{
         isEmialRule : function(e){
             var drag = e.target.value.match(/^([w]{3}\.|[w]{0})([\w\W]{1,})(\.com$)/) != null ? true : false;
             if(drag){
                 this.retrieveTips.removeClass("err-tips").html("邮箱格式正确");
             } else {
                 this.retrieveTips.addClass("err-tips").html("邮箱格式不正确").css("display","block");
             }
         },
         ajaxSubmit : function(){
             var data = `emial=${this.retrieveEmial.val()}&newPassword=${this.newPassword.val()}`
             console.log(data);
             const promise = asyncMethods.postMessages("http://jsonplaceholder.typicode.com/posts",data);
             promise.then(data => {
                 new Tips("success","修改成功",1000);
                 console.log(data);
                 setTimeout(()=> {
                    location.reload();
                 },500)
             }).catch(err => {
                 new Tips("error","修改失败",1000);
             })
         }
     }
 }
 Retrieve.init();

const Register = {
    init(){
        this.render();
        this.bindEvent();
    },
    render(){
        this.registerName = $("#register-name");
        this.registerEmial = $("#register-emial");
        this.registerPassword = $("#register-password");
        this.nameTips = $("#register-name-tips");
        this.emialTips = $("#register-emial-tips");
        this.passTips = $("#register-pass-tips");
        this.registerBtn = $("#register-btn");
        this.submitDrag = false;
    },
    bindEvent(){
        
    },
    methods : {

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