Ext.define('DeliveryInfo',{
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
                url:'/TBaDeliveryInfo',
                reader:{
                    type:'json',
                    root:'deliverylist',
                    totalProperty:'rows'
                }
            },
            fields:[
                {name:'deliveryId',type:'String'},
                {name:'deliveryName',type:'String'},
                {name:'address',type:'String'},
                {name:'linkName',type:'String'},
                {name:'linkTel',type:'String'},
                {name:'qq',type:'String'},
                {name:'email',type:'String'},
                {name:'sortId',type:'Byte'},
                {name:'state',type:'Boolean'}


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
            id:'Delivery',
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
                    labelField:'所要查询配送商编码',
                    xtype:'textfield',
                    id:'deliveryId'
                },{
                    text:'查询',
                    xtype:'button',
                    handler:function(){me.selectbutton(me)}

                }
            ],
            columns:[
                {text:'配送商编码',dataIndex:'deliveryId',flex : 1},
                {text:'配送商名称',dataIndex:'deliveryName',flex : 1},
                {text:'地址',dataIndex:'address',flex : 1},
                {text:'联系人',dataIndex:'linkName',flex : 1},
                {text:'联系电话',dataIndex:'linkTel',flex : 1},
                {text:'QQ',dataIndex:'qq',flex : 1},
                {text:'Email',dataIndex:'email',flex : 1},
                {text:'排序编码',dataIndex:'sortId',flex : 1},
                {text:'状态',dataIndex:'state',flex : 1}
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
                        fieldLabel:'配送商编码',
                        name:'deli.deliveryId'
                    },{
                        xtype:'textfield',
                        fieldLabel:'配送商名称',
                        name:'deli.deliveryName'
                    },{
                        xtype:'textfield',
                        fieldLabel:'地址',
                        name:'deli.address'
                    },{
                        xtype:'textfield',
                        fieldLabel:'联系人',
                        name:'deli.linkName'

                    },{
                        xtype:'textfield',
                        fieldLabel:'联系电话',
                        name:'deli.linkTel'

                    },{
                        xtype:'textfield',
                        fieldLabel:'QQ',
                        name:'deli.qq'

                    },{
                        xtype:'textfield',
                        fieldLabel:'Email',
                        name:'deli.email'

                    },{
                        xtype:'textfield',
                        fieldLabel:'排序编码',
                        name:'deli.sortId'
                    },{
                        xtype:'combo',
                        fieldLabel:'状态',
                        name:'deli.state',
                        editable:false,
                        store: me.states,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'abbr'
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
                url : '/insertaction7',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.failse){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("Delivery").store.reload();
                        Ext.getCmp("messege").close();
                    }
                    Ext.Msg.show({
                        title:"系统提示！",
                        msg:msg.message,
                        buttons:Ext.Msg.YES

                    })
                    Ext.getCmp("Delivery")
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
        var record= Ext.getCmp("Delivery").getSelectionModel().getSelection()[0];
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
                        fieldLabel:'配送商编码',
                        name:'deli.deliveryId',
                        value:record.get('deliveryId')
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
                url:'/deleteaction7',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.failse){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("Delivery").store.reload();
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
        var record= Ext.getCmp("Delivery").getSelectionModel().getSelection()[0];
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
                        fieldLabel:'配送商编码',
                        name:'deli.deliveryId',
                        readOnly:true,
                        value:record.get('deliveryId')
                    },{
                        xtype:'textfield',
                        fieldLabel:'配送商名称',
                        name:'deli.deliveryName',
                        value:record.get('deliveryName')

                    },{
                        xtype:'textfield',
                        fieldLabel:'地址',
                        name:'deli.address',
                        value:record.get('address')
                    },{
                        xtype:'textfield',
                        fieldLabel:'联系人',
                        name:'deli.linkName',
                        value:record.get('linkName')

                    },{
                        xtype:'textfield',
                        fieldLabel:'联系电话',
                        name:'deli.linkTel',
                        value:record.get('linkTel')

                    },{
                        xtype:'textfield',
                        fieldLabel:'QQ',
                        name:'deli.qq',
                        value:record.get('qq')

                    },{
                        xtype:'textfield',
                        fieldLabel:'Email',
                        name:'deli.email',
                        value:record.get('email')

                    },{
                        xtype:'textfield',
                        fieldLabel:'排序编码',
                        name:'deli.sortId',
                        value:record.get('sortId')
                    },{
                        xtype:'combo',
                        fieldLabel:'状态',
                        name:'deli.state',
                        editable:false,
                        store: me.states,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'abbr',
                        value:record.get('state')
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
                url:'/updateaction7',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    //if(msg.failse){
                    Ext.MessageBox.show({
                        title:"系统提示！",
                        msg:msg.message,
                        buttons:Ext.Msg.YES
                    });
                    Ext.getCmp("Delivery").store.reload();
                    Ext.getCmp("ldy1").close();
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
        Ext.getCmp('Delivery').store.load({
            params:{
                deliveryId:Ext.getCmp('deliveryId').getValue()
            }
        })
    }

})