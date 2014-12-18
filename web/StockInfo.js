Ext.define('StockInfo',{
    extend:'Ext.grid.Panel',
    merch:Ext.create('Ext.data.Store',{
        proxy:{
            type:'ajax',
            url:'/MerchandiseInfo',
            reader:{
                type:'json',
                root:'chanlist'
            }
        },fields:[
            {
                name:'merchandiseId',
                type:'String'
            },{
                name:'merchandiseName',
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
                url:'/StockInfo',
                reader:{
                    type:'json',
                    root:'stocklist',
                    totalProperty:'rows'
                }
            },
            fields:[
                {name:"id",type:"Integer"},
                {name:"avgPrice",type:"Integer"},
                {name:"num",type:"Integer"},
                {name:"TMeMerchandiseInfoByMerchandiseId.merchandiseName",type:"String"}
            ],
            autoLoad:true,
            //模糊查询的监听事件，是用来查询出来数据以后的下一页，或刷新，防止数据的重新加载！
            listeners:{
                beforeload:function(store,operation){
                    var id=Ext.getCmp('id');
                    if(id){
                        if(id.getValue()){
                            if(operation.params){
                                operation.params.id=id.getValue();

                            }else{
                                operation.params={id:id.getValue()}
                            }
                        }


                    }

                }
            }
        });

        store.load({
            params:{
                start:0,
                limit:5
            }
        });

        Ext.apply(this, {
            id: 'stock',
            title:'库存信息管理',
            closable:true,
            store: Ext.data.StoreManager.lookup("mystore"),
            height: 400,
            width: 500,
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
                    fieldLabel:'请输入所要查询的流水号：',
                    labelWidth:250,
                    labelAlign:'right',
                    id:'id'

                },{
                    xtype:'button',
                    text:'查询',
                    handler:function(){me.selectbutton(me)}
                }
            ],
            columns: [
                {text: "递增流水号", dataIndex: 'id', align: "center",flex : 1},
                {text: "商品名称", dataIndex: 'TMeMerchandiseInfoByMerchandiseId.merchandiseName', menuDisabled: true,flex : 1},
                {text: "加权平均价", dataIndex: 'avgPrice', menuDisabled: true,flex : 1},
                {text: "库存数量", dataIndex: 'num', menuDisabled: true,flex : 1}
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
            width:300,
            height:400,
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
                items:[{
                    xtype:'textfield',
                    fieldLabel:'递增流水号',
                    name:'stock.id'
                },{
                        xtype:'combo',
                        store:me.merch,
                        editable:false,
                        fieldLabel:'商品名称',
                        allowBlank:false,
                        displayField:'merchandiseName',
                        valueField:'merchandiseId',
                        name:'stock.TMeMerchandiseInfoByMerchandiseId.merchandiseId'

                    },{
                        xtype:'textfield',
                        fieldLabel:'加权平均价',
                        name:'stock.avgPrice'
                    },{
                        xtype:'textfield',
                        fieldLabel:'库存数量',
                        name:'stock.num'
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
                url : '/insertaction6',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.failse){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("stock").store.reload();//对apply进行重新加载
                        Ext.getCmp("messege").close();
                    }
                    Ext.Msg.show({
                        title:"系统提示！",
                        msg:msg.message,
                        buttons:Ext.Msg.YES

                    })
                    Ext.getCmp("stock")
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
        var record= Ext.getCmp("stock").getSelectionModel().getSelection()[0];
        Ext.create('Ext.window.Window',{
            title:'请输入要删除的商品...',
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
                        fieldLabel:'递增流水号',
                        name:'stock.id',
                        value:record.get('id')
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
                url:'/deleteaction6',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.failse){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("stock").store.reload();//对apply进行重新加载
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
        var me = this;
        var record= Ext.getCmp("stock").getSelectionModel().getSelection()[0];
        Ext.create('Ext.window.Window',{
            title:'请输入要修改的信息...',
            id:'ldy1',
            width:300,
            height:400,
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
                        readOnly:true,
                        fieldLabel:'递增流水号',
                        name:'stock.id',
                        value:record.get('id')
                    },{
                        xtype:'combo',
                        store:me.merch,
                        editable:false,
                        fieldLabel:'商品名称',
                        allowBlank:false,
                        displayField:'merchandiseName',
                        valueField:'merchandiseId',
                        name:'stock.TMeMerchandiseInfoByMerchandiseId.merchandiseId'

                    },{
                        xtype:'textfield',
                        fieldLabel:'加权平均价',
                        name:'stock.avgPrice'
                    },{
                        xtype:'textfield',
                        fieldLabel:'库存数量',
                        name:'stock.num'
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
                url:'/updateaction6',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)

                    Ext.Msg.show({
                        title:"系统提示！",
                        msg:msg.message,
                        buttons:Ext.Msg.YES
                    });
                    Ext.getCmp("stock").store.reload();
                    Ext.getCmp("ldy1").close();

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
        Ext.getCmp('stock').store.load({
            params:{
                id:Ext.getCmp('id').getValue()
            }
        })
    }
});