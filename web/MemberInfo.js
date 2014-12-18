Ext.define('MemberInfo',{
    extend:'Ext.grid.Panel',
    states: Ext.create('Ext.data.Store', {
        fields: ['abbr', 'name'],
        data : [
            {abbr:"true", name:"使用"},
            {abbr:"false", name:"关闭"}
        ]
    }),
    initComponent:function(){
        var me=this;
        var store=Ext.create('Ext.data.Store',{
            id:'store1',
            pageSize:5,
            proxy:{
                type:'ajax',
                url:'/TBaMemberInfo',
                reader:{
                    type:'json',
                    root:'memberlist',
                    totalProperty:'rows'
                }
            },
            fields:[
                {name:'userName',type:'String'},
                {name:'pwd',type:'String'},
                {name:'email',type:'String'},
                {name:'iname',type:'String'},
                {name:'balance',type:'BigDecimal'},
                {name:'status',type:'Boolean'},
                {name:'regDate',type:'Timestamp'},
                {name:'activeDate',type:'Timestamp'},
                {name:'remark',type:'String'}



            ],
            autoLoad:true
        });
        store.load({
            params:{
                start:0,
                limit:5
            }
        });
        Ext.apply(this,{
            id:'Member',
            title:'配送商信息',
            closable:true,
            store:Ext.data.StoreManager.lookup("store1"),
            tbar:[
                {
                    text:'添加',
                    xtype:'button',
                    handler:function(){me.insertbutton(me)}
                },{
                    text:'删除',
                    xtype:'button',
                    handler:function(){me.deletebutton(me)}
                },{
                    text:'修改',
                    xtype:'button',
                    handler:function(){me.updatebutton(me)}
                },{
                    labelField:'所要查询会员用户名',
                    xtype:'textfield',
                    id:'userName'
                },{
                    text:'查询',
                    xtype:'button',
                    handler:function(){me.selectbutton(me)}

                }
            ],
            columns:[
                {text:'用户名',dataIndex:'userName',flex : 1},
                {text:'密码',dataIndex:'pwd',flex : 1},
                {text:'Email',dataIndex:'email',flex : 1},
                {text:'姓名',dataIndex:'iname',flex : 1},
                {text:'余额',dataIndex:'balance',flex : 1},
                {text:'状态',dataIndex:'status',flex : 1},
                {text:'注册日期',dataIndex:'regDate',flex : 1},
                {text:'激活日期',dataIndex:'activeDate',flex : 1},
                {text:'备注',dataIndex:'remark'}
            ],
            dockedItems: [
                {
                    xtype: "pagingtoolbar",
                    store: store,
                    dock: "bottom",
                    displayInfo: true
                }
            ]
        }),
        this.callParent();

    },
    insertbutton: function(obj){
        var me=this;
        Ext.create('Ext.window.Window',{
            id:'messege',
            title:'请输入要添加的信息...',
            width:300,
            height:300,
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
                        fieldLabel:'用户名',
                        name:'mem.userName'
                    },{
                        xtype:'textfield',
                        fieldLabel:'密码',
                        name:'mem.pwd'
                    },{
                        xtype:'textfield',
                        fieldLabel:'Email',
                        name:'mem.email'
                    },{
                        xtype:'textfield',
                        fieldLabel:'姓名',
                        name:'mem.iname'

                    },{
                        xtype:'textfield',
                        fieldLabel:'余额',
                        name:'mem.balance'

                    },{
                        xtype:'combo',
                        fieldLabel:'状态',
                        name:'mem.status',
                        editable:false,
                        store: me.states,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'abbr'
                    },{
                        xtype:'datefield',
                        fieldLabel:'注册日期',
                        name:'mem.regDate',
                        editable:false,
                        format : "Y-m-d H:i:s"

                    },{
                        xtype:'datefield',
                        fieldLabel:'激活日期',
                        name:'mem.activeDate',
                        editable:false,
                        format : "Y-m-d H:i:s"

                    },{
                        xtype:'textfield',
                        fieldLabel:'备注',
                        name:'mem.remark'
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
            }]
        }).show()
    },
    doinsert:function(){
        var form=this.up('window').down('form').getForm();
        if(form.isValid()){
            form.submit({
                url : '/insertaction8',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.failse){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("Member").store.reload();
                        Ext.getCmp("messege").close();
                    }
                    Ext.Msg.show({
                        title:"系统提示！",
                        msg:msg.message,
                        buttons:Ext.Msg.YES

                    })
                    Ext.getCmp("Member")
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
    deletebutton: function(obj){
        var record= Ext.getCmp("Member").getSelectionModel().getSelection()[0];
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
                        fieldLabel:'用户名',
                        name:'mem.userName',
                        value:record.get('userName')
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
                url:'/deleteaction8',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.failse){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("Member").store.reload();
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
        var record= Ext.getCmp("Member").getSelectionModel().getSelection()[0];
        Ext.create('Ext.window.Window',{
            title:'请输入要修改的信息...',
            id:'ldy1',
            width:300,
            height:300,
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
                        fieldLabel:'用户名',
                        name:'mem.userName',
                        readOnly:true,
                        value:record.get('userName')
                    },{
                        xtype:'textfield',
                        fieldLabel:'密码',
                        name:'mem.pwd',
                        value:record.get('pwd')
                    },{
                        xtype:'textfield',
                        fieldLabel:'Email',
                        name:'mem.email',
                        value:record.get('email')
                    },{
                        xtype:'textfield',
                        fieldLabel:'姓名',
                        name:'mem.iname',
                        value:record.get('iname')

                    },{
                        xtype:'textfield',
                        fieldLabel:'余额',
                        name:'mem.balance',
                        value:record.get('balance')

                    },{
                        xtype:'combo',
                        fieldLabel:'状态',
                        name:'mem.status',
                        editable:false,
                        store: me.states,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'abbr',
                        value:record.get('status')
                    },{
                        xtype:'textfield',
                        fieldLabel:'注册日期',
                        name:'mem.regDate',
                        value:record.get('regDate')

                    },{
                        xtype:'textfield',
                        fieldLabel:'激活日期',
                        name:'mem.activeDate',
                        value:record.get('activeDate')

                    },{
                        xtype:'textfield',
                        fieldLabel:'备注',
                        name:'mem.remark',
                        value:record.get('remark')
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
                url:'/updateaction8',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.failse) {
                        Ext.MessageBox.show({
                            title: "系统提示！",
                            msg: msg.message,
                            buttons: Ext.Msg.YES
                        });
                        Ext.getCmp("Member").store.reload();
                        Ext.getCmp("ldy1").close();
                    }
                },

                failure:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    Ext.MessageBox.show({
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
        Ext.getCmp('Member').store.load({
            params:{
                userName:Ext.getCmp('userName').getValue()
            }
        })
    }

})