Ext.define('Operpage',{
    extend:'Ext.grid.Panel',
//    renderTo:Ext.getBody(),
    stores:Ext.create('Ext.data.Store',{
        proxy:{
            type:'ajax',
            url:'/role',
            reader:{
                type:'json',
                root:'rolelist'
            }
        },fields:[
            {
                name:'roleId',
                type:'String'
            },{
                name:'roleName',
                type:'String'
            }
        ],
        autoLoad:true
    }),

    initComponent:function(){
        var me=this;
       //定义一个checkbox,给下面的apply调用
        var checkbox = Ext.create('Ext.selection.CheckboxModel');
        var store=Ext.create('Ext.data.Store',{
            id:'mystore',
            pageSize:5,

            proxy:{
                type:'ajax',
                url:'/Operpage',
                reader:{
                    type:'json',
                    root:'operlist',
                    totalProperty:'rows'
                }
            },
            fields:[
                {name:"operId",type:"String"},
                {name:"operName",type:"String"},
                {name:"pwd",type:"String"},
                {name:"linkTel",type:"String"},
                {name:"TAuRoleInfoByRoleId.roleName",type:"String"},
                {name:"mobile",type:"String"}
            ],
            autoLoad:true
        });
        store.load({
        params:{
            start:0,
            limit:5
             }
        });


    Ext.apply(this, {
        id: 'oper',
        title:'人事管理',
        closable:true,
        store: Ext.data.StoreManager.lookup("mystore"),
        //添加到grid
        selModel:checkbox,
        disableSelection:false,//表示可以选择行
        tbar:[
            {
                xtype:'button',
                text:'添加',
                handler:function(){me.insertbutton(me)}
            },{
                xtype:'button',
                text:'修改',
                handler:function(){me.updatebutton(me)}
            },{
                xtype:'button',
                text:'删除',
                handler:function(){me.deletebutton(me)}
            },{
                xtype:'textfield',
                fieldLabel:'请输入所要查询的操作员编号：',
                labelWidth:250,
                labelAlign:'right',
                id:'operId'

            },{
                xtype:'button',
                text:'查询',
                handler:function(){me.selectbutton(me)}
            }
            ],
        columns: [

            {text: "操作员编号", dataIndex: 'operId', align: "center",flex : 1},
            {text: "操作员名称", dataIndex: 'operName', menuDisabled: true,flex : 1},
            {text: "密码", dataIndex: 'pwd', menuDisabled: true,flex : 1},
            {text: "联系电话", dataIndex: 'linkTel', menuDisabled: true,flex : 1},
            {text: "角色", dataIndex: 'TAuRoleInfoByRoleId.roleName', menuDisabled: true,flex : 1},
            {text: "手机号码", dataIndex: 'mobile', menuDisabled: true,flex : 1},
            {
                header: '操作',
                style:'text-align:center',
                renderer: function(){
                    var display="";
                    display+='<input type="button"  value="查看权限树"  onclick="quanxianshu.opertree()" />';
                    return display;
                },flex : 1
            }
        ],

        dockedItems: [
            {
                xtype: "pagingtoolbar",
                store: store,
                dock: "bottom",
                displayInfo: true
            }
        ]
    });
    this.center();
    this.callParent();
    },

    insertbutton: function(obj){
        var me=this;
        Ext.create('Ext.window.Window',{
            id:'messege',
            title:'请输入要添加的信息...',
            width:'15%',
            height:'35%',
            items:[{
                xtype:'form',
                layout:'form',
                border:false,
                margin:'5 5 5 5',
                id:'form1',
                defaults:{
                    labelAlign:'right',
                    labelWidth:70,
                    allowBlank:false
                },
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'操作员编号',
                        name:'operinfo.operId'
                    },{
                        xtype:'textfield',
                        fieldLabel:'操作员名称',
                        name:'operinfo.operName'
                    },{
                        xtype:'textfield',
                        fieldLabel:'密码',
                        name:'operinfo.pwd'
                    },{
                        xtype:'textfield',
                        fieldLabel:'联系电话',
                        name:'operinfo.linkTel'
                    },{
                        xtype:'textfield',
                        fieldLabel:'手机号码',
                        name:'operinfo.mobile'
                    },{
                        xtype:'combo',
                        fieldLabel:'角色',
                        editable:false,
                        store:me.stores,
                        displayField:'roleName',
                        valueField:'roleId',
                        name:'operinfo.TAuRoleInfoByRoleId.roleId'
                    }
                   ]
                }

            ],
            buttonAlign:'center',
            buttons:[{
                text:'确认',
                handler:obj.doinsert
            },{
                text:'重置',
                handler:function(){this.up('window').down('form').getForm().reset();}
            }]
        }).show()
    },
    doinsert:function(){
        var form=this.up('window').down('form').getForm();
        if(form.isValid()){
            form.submit({

                url : '/insertaction',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.faile){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("oper").store.reload();
                        Ext.getCmp("messege").close();
                    }
                    Ext.Msg.show({
                        title:"系统提示！",
                        msg:msg.message,
                        buttons:Ext.Msg.YES

                    })
                    Ext.getCmp("oper")
                },
                failure:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.show({
                        title:"系统提示！",
                        msg:msg.message,
                        buttons:Ext.Msg.YES
                    });
                    Ext.getCmp("messege").close();
                }

            })
        }
    },
//    deletebutton:function(obj){
//            Ext.MessageBox.show({
//            title: '删除提示',
//            msg: '确实要删除' + Ext.getCmp('oper').getSelectionModel().getSelection().length + '条数据么?',
//            icon: Ext.MessageBox.WARNING,
//            buttons: Ext.MessageBox.YESNO,
//            fn: function (btn) {
//                if (btn === 'yes') {
//                    Ext.Ajax.request({
//                        url: '/restore/supplierdelet?more=' + list,
//                        success: function (response) {
//                            var msg=Ext.JSON.decode(response.responseText);
//                            Ext.getCmp('oper').store.reload();
//                            Ext.MessageBox.show({
//                                title:'提示',
//                                msg:msg.message,
//                                icon:Ext.MessageBox.WARNING,
//                                buttons:Ext.MessageBox.YES
//                            });
//                        },
//                        failure:function(response){
//                            var msg=Ext.JSON.decode(response.responseText);
//                            Ext.getCmp('oper').store.reload();
//                            Ext.MessageBox.show({
//                                title:'提示',
//                                msg:msg.message,
//                                icon:Ext.MessageBox.QUESTION,
//                                buttons:Ext.MessageBox.YES
//                            });
//                        }
//                    });
//                }
//            }
//        });
//    },
    deletebutton: function(obj){
        var record= Ext.getCmp("oper").getSelectionModel().getSelection()[0];
        Ext.create('Ext.window.Window',{
            title:'请输入要删除的操作员编号...',
            id:'ldy',
            width:300,
            height:130,
            items:[{
                xtype:'form',
                layout:'form',
                border:false,
                margin:'5 5 5 5',
                defaults:{
                    labelAlign:'right',
                    labelWidth:90,
                    allowBlank:false
                },
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'操作员编号',
                        name:'operinfo.operId',
                        value:record.get('operId')
                    }],
                buttonAlign:'center',
                buttons:[{
                    text:'确认',
                    handler:obj.dodelete
                },{
                    text:'重置',
                    handler:function(){this.up('window').down('form').getForm().reset();}
                }]
            }]
        }).show()
    },
    dodelete:function(){
        var form=this.up('window').down('form').getForm();
        if(form.isValid()){
            form.submit({
                url:'/deleteaction',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.faile){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("oper").store.reload();
                        Ext.getCmp("ldy").close();
                    }

                },
                failure:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.show({
                        title:"系统提示！",
                        msg:msg.message,
                        buttons:Ext.Msg.YES
                    });
                    Ext.getCmp("ldy").close();
                }
            })
        }

    },
    updatebutton: function(obj){
        var me=this;
        var record= Ext.getCmp("oper").getSelectionModel().getSelection()[0];
        Ext.create('Ext.window.Window',{
            title:'请输入要修改的信息...',
            id:'ldy1',
            width:300,
            height:250,
            items:[{
                xtype:'form',
                layout:'form',
                border:false,
                margin:'5 5 5 5',
                defaults:{
                    labelAlign:'right',
                    labelWidth:70,
                    allowBlank:false
                },
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'操作员编号',
                        name:'operinfo.operId',
                        value:record.get('operId')
                    },{
                        xtype:'textfield',
                        fieldLabel:'操作员名称',
                        value:record.get('operName'),
                        name:'operinfo.operName'
                    },{
                        xtype:'textfield',
                        fieldLabel:'密码',
                        value:record.get('pwd'),
                        name:'operinfo.pwd'
                    },{
                        xtype:'textfield',
                        fieldLabel:'联系电话',
                        value:record.get('linkTel'),
                        name:'operinfo.linkTel'
                    },{
                        xtype:'textfield',
                        fieldLabel:'手机号码',
                        value:record.get('mobile'),
                        name:'operinfo.mobile'
                    }
                    ,{
                        xtype:'combo',
                        fieldLabel:'角色',
                        value:record.get('TAuRoleInfoByRoleId.roleName'),
                        store:me.stores,
                        displayField:'roleName',
                        valueField:'roleId',
                        name:'operinfo.TAuRoleInfoByRoleId.roleId'
                    }
                ],
                buttonAlign:'center',
                buttons:[{
                    text:'确认',
                    handler:obj.doupdate
                },{
                    text:'重置',
                    handler:function(){this.up('window').down('form').getForm().reset();}
                }]
            }]
        }).show()
    },
    doupdate:function(){
        var form=this.up('window').down('form').getForm();
        if(form.isValid){
            form.submit({
                url:'/updateaction',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.faile){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("oper").store.reload();
                        Ext.getCmp("ldy1").close();
                    }else{
                    Ext.Msg.show({
                        title: '系统提示！',
                        msg: msg.message,
                        buttons: Ext.Msg.YES
                    });
                        Ext.getCmp("ldy1").close()
                    }
                },
                failure:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.show({
                        title:"系统提示！",
                        msg:msg.message,
                        button:Ext.Msg.YES
                    })
                    Ext.getCmp("ldy1").close();
                }
            })
        }
    },
    selectbutton: function(obj){
        Ext.getCmp('oper').store.load({
            params:{
                operId:Ext.getCmp('operId').getValue()
            }
        })
    }
});
Ext.define('quanxianshu', {

statics : {
    opertree: function () {

        var me=this;
        var record = Ext.getCmp("oper").getSelectionModel().getSelection()[0];
        Ext.Ajax.request({
            id: 'rolejson',
            url: "/opernametree?operName="+record.get('operName'),
            async: false,
            success: function (response) {
                me.jsonData = response.responseText;
                if (typeof(me.jsonData) === 'string') {
                    me.jsonData = Ext.JSON.decode(me.jsonData);
                }
            }

        });
           var storetree1 = Ext.create("Ext.data.TreeStore", {
            fields: [
                {name: "text", type: "String", mapping: "menu.menuName"}
            ],
            root: {
                text: 'parent',
                id: '-1',
                children: me.jsonData.node.children
            }
        });

        Ext.create('Ext.window.Window', {

            title: '这是该操作员的权限树',
            id: 'shu',
            width: 400,
            height: 200,
            autoScroll:true,
            items: [
                {
                    xtype : "treepanel",
                    border:false,
                    store: storetree1,
                    rootVisible: false

                }
            ]
        }).show()
    }
    }


});