Ext.define("login",{
        extend:"Ext.panel.Panel",
        title:'登陆页面',
        layout:'fit',
        width:240,
        height:150,
        bodyStyle:'background:initial',
        items:[
            {
                xtype:'form',
                layout:'form',
                margin:'5 5 5 5',
                border:false,
                bodyStyle:'background:initial',
                defaults:{
                    xtype:'textfield',
                    allowBlank:false,
                    labelAlign:'right',
                    cls:"Diy-text",
                    labelWidth:45
                },
                items:[
                {
                    fieldLabel:'用户名',
                    name:'oper.OperName'
                },{
                    fieldLabel:'密码',
                    inputType:'password',
                    name:'oper.Pwd'
                },{
                    xtype:'panel',
                    layout:'column',
                    border:false,
                    bodyStyle:'background:initial',
                    defaults:{
                    labelAlign:'right',
                        labelWidth:45,
                        allowBlank:false,
                        bodyStyle:'background:initial',
                        blankText:'验证码不允许为空！'
                    },
                    items:[
                        {
                            fieldLabel:'验证码',
                            xtype:'textfield',
                            width:150,
                            name:'valide'
                        },{
                            border : false,
                            html:"&nbsp;<img src='validCode.jsp' style='width: 70px; height: 22px;' onclick='this.src=\"validCode.jsp?r=\"+Math.random()'/> "
                        }
                    ]

                    }

            ],
                buttonAlign:'center',
                    buttons:[
                        {
                           text:'登录',
                            handler:function(){
                                var form=this.up('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url:'/login',
                                        success:function(form,action){
                                            var msg=Ext.JSON.decode(action.response.responseText);
                                            if(msg.faile){
                                                window.location="main3.jsp";
                                                return;
                                            }
                                            Ext.Msg.alert('系统提示...',msg.message);
                                        },
                                        failure:function(form,action){
                                            var msg=Ext.JSON.decode(action.response.responseText);
                                            Ext.Msg.alert('系统提示...',msg.message);
                                        }
                                    })
                                }
                            }
                        },{
                            text:'重置',
                            handler:function(){
                                this.up('form').getForm().reset();
                            }
                        }
                    ]
            }
        ]

})