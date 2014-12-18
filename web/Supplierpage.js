Ext.define('Supplierpage',{
    extend:'Ext.grid.Panel',
    initComponent:function(){
        var me=this;
        var store=Ext.create('Ext.data.Store',{
            id:'mystore',
            pageSize:5,
            proxy:{
                type:'ajax',
                url:'/Supplierpage',
                reader:{
                    type:'json',
                    root:'supplist',
                    totalProperty:'rows'
                }
            },
            fields:[
                {name:"supplierId",type:"String"},
                {name:"supplierName",type:"String"},
                {name:"address",type:"String"}


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
        id: 'supplier',
        title:'供应商管理',
        closable:true,
        store: Ext.data.StoreManager.lookup("mystore"),
        height: 400,
        width: 500,
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
                fieldLabel:'请输入所要查询的供应商编号：',
                labelWidth:250,
                labelAlign:'right',
                id:'supplierId'

            },{
                xtype:'button',
                text:'查询',
                handler:function(){me.selectbutton(me)}
            }
            ],
        columns: [
            {text: "供应商编码", dataIndex: 'supplierId', align: "center",flex : 1},
            {text: "供应商名称", dataIndex: 'supplierName', menuDisabled: true,flex : 1},
            {text: "地址", dataIndex: 'address', menuDisabled: true,flex : 1}
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
        Ext.create('Ext.window.Window',{
            id:'messege',//这里要注意不要重名
            title:'请输入要添加的信息...',
            width:300,
            height:200,
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
                        fieldLabel:'供应商编码',
                        name:'supplier.supplierId'
                    },{
                        xtype:'textfield',
                        fieldLabel:'供应商名称',
                        name:'supplier.supplierName'
                    },{
                        xtype:'textfield',
                        fieldLabel:'地址',
                        name:'supplier.address'
                    }],
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
                url : '/insertaction1',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.faile){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("supplier").store.reload();
                        Ext.getCmp("messege").close();
                    }
                    Ext.Msg.show({
                        title:"系统提示！",
                        msg:msg.message,
                        buttons:Ext.Msg.YES

                    })
                    Ext.getCmp("supplier")
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
        var record= Ext.getCmp("supplier").getSelectionModel().getSelection()[0];
        Ext.create('Ext.window.Window',{
            title:'请输入要删除的供应商编号...',
            id:'ldy',//这里要注意不要重名
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
                        fieldLabel:'供应商编号',
                        name:'supplier.supplierId',
                        value:record.get('supplierId')
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
                url:'/deleteaction1',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.faile){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("supplier").store.reload();
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
        var record= Ext.getCmp("supplier").getSelectionModel().getSelection()[0];
        Ext.create('Ext.window.Window',{
            title:'请输入要修改的信息...',
            id:'ldy1',//这里要注意不要重名
            width:300,
            height:200,
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
                        fieldLabel:'供应商编号',
                        name:'supplier.supplierId',
                        value:record.get('supplierId')
                    },{
                        xtype:'textfield',
                        fieldLabel:'供应商名称',
                        name:'supplier.supplierName'
                    },{
                        xtype:'textfield',
                        fieldLabel:'地址',
                        name:'supplier.address'
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
                url:'/updateaction1',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.faile){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("supplier").store.reload();
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
        Ext.getCmp('supplier').store.load({
            params:{
                supplierId:Ext.getCmp('supplierId').getValue()  //根据谁的模糊查询，要根据某个字段得到的数据，来进行模糊查询
            }
        })
    }
});