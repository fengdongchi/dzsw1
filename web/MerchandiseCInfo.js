Ext.define('MerchandiseCInfo',{
    extend:'Ext.grid.Panel',
    states: Ext.create('Ext.data.Store', {
        fields: ['abbr', 'name'],
        data : [
            {abbr:"true", name:"促销"},
            {abbr:"false", name:"非促销"}

            //...
        ]
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
                url:'/MerchandiseCInfo',
                reader:{
                    type:'json',
                    root:'mcdlist',
                    totalProperty:'rows'
                }
            },
            fields:[
                {name:"id",type:"Integer"},
                {name:"merchandiseCid",type:"String"},
                {name:"merchandiseCName",type:"String"},
                {name:"sortId",type:"Integer"},
                {name:"state",type:"Boolean"}
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
        id: 'mcd',
        title:'商品类别管理',
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
                fieldLabel:'请输入所要查询的商品类别编号：',
                labelWidth:250,
                labelAlign:'right',
                id:'mcdId'

            },{
                xtype:'button',
                text:'查询',
                handler:function(){me.selectbutton(me)}
            }
            ],
        columns: [
            {text: "编号", dataIndex: 'id', menuDisabled: true,flex : 1},
            {text: "商品类别编码", dataIndex: 'merchandiseCid', align: "center",flex : 1},
            {text: "商品类别名称", dataIndex: 'merchandiseCName', menuDisabled: true,flex : 1},
            {text: "排序编码", dataIndex: 'sortId', menuDisabled: true,flex : 1},
            {text: "状态", dataIndex: 'state', menuDisabled: true,flex : 1}
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
            height:200,
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
                        fieldLabel:'编号',
                        name:'mcd.id'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'商品类别编码',
                        name:'mcd.merchandiseCid'
                    },{
                        xtype:'textfield',
                        fieldLabel:'商品类别名称',
                        name:'mcd.merchandiseCName'
                    },{
                        xtype:'textfield',
                        fieldLabel:'排序编码',
                        name:'mcd.sortId'
                    },{
                        fieldLabel:'状态',
                        xtype : "combo",
                        editable:false,
                        store: me.states,
                        queryMode: 'local',
                        displayField: 'name',
                        name:'mcd.state',
                        valueField: 'abbr'
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
                url : '/insertaction2',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.failse){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("mcd").store.reload();//对apply进行重新加载
                        Ext.getCmp("messege").close();
                    }
                    Ext.Msg.show({
                        title:"系统提示！",
                        msg:msg.message,
                        buttons:Ext.Msg.YES

                    })
                    Ext.getCmp("mcd")
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
        var record= Ext.getCmp("mcd").getSelectionModel().getSelection()[0];
        Ext.create('Ext.window.Window',{
            title:'请输入要删除的商品类别编码...',
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
                        fieldLabel:'商品类别编码',
                        name:'mcd.merchandiseCid',
                        value:record.get('merchandiseCid')
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
                url:'/deleteaction2',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.failse){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("mcd").store.reload();//对apply进行重新加载
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
        var record= Ext.getCmp("mcd").getSelectionModel().getSelection()[0];
        Ext.create('Ext.window.Window',{
            title:'请输入要修改的信息...',
            id:'ldy1',
            width:300,
            height:200,
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
                        fieldLabel:'编号',
                        name:'mcd.id',
                        value:record.get('id')
                    },{
                        xtype:'textfield',
                        fieldLabel:'商品类别编码',
                        name:'mcd.merchandiseCid',
                        value:record.get('merchandiseCid')
                    },{
                        xtype:'textfield',
                        fieldLabel:'商品类别名称',
                        name:'mcd.merchandiseCName',
                        value:record.get('merchandiseCName')
                    },{
                        xtype:'textfield',
                        fieldLabel:'排序编码',
                        name:'mcd.sortId',
                        value:record.get('sortId')
                    },{
                        fieldLabel:'状态',
                        xtype : "combo",
                        editable:false,
                        store: me.states,
                        queryMode: 'local',
                        displayField: 'name',
                        name:'mcd.state',
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
                url:'/updateaction2',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)

                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("mcd").store.reload();
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
        Ext.getCmp('mcd').store.load({
            params:{
                merchandiseCid:Ext.getCmp('merchandiseCid').getValue()
            }
        })
    }
});