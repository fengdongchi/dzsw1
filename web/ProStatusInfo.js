Ext.define('ProStatusInfo',{
    extend:'Ext.grid.Panel',
//    renderTo:Ext.getBody(),
    states: Ext.create('Ext.data.Store', {
        fields: ['abbr', 'name'],
        data : [
            {abbr:"true", name:"促销"},
            {abbr:"false", name:"非促销"}
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
                url:'/ProStatusInfo',
                reader:{
                    type:'json',
                    root:'proslist',
                    totalProperty:'rows'
                }
            },
            fields:[
                {name:"proStatusId",type:"Integer"},
                {name:"proStatusName",type:"String"},
                {name:"status",type:"boolean"},
                {name:"remark",type:"String"}

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
        id: 'pros',
        title:'商品促销状态',
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
                fieldLabel:'请输入所要查询的促销状态编码：',
                labelWidth:250,
                labelAlign:'right',
                id:'proStatusId'

            },{
                xtype:'button',
                text:'查询',
                handler:function(){me.selectbutton(me)}
            }
            ],
        columns: [

            {text: "促销状态编码", dataIndex: 'proStatusId', align: "center",flex : 1},
            {text: "促销状态名称", dataIndex: 'proStatusName', menuDisabled: true,flex : 1},
            {text: "状态", dataIndex: 'status', menuDisabled: true,flex : 1},
            {text: "备注", dataIndex: 'remark', menuDisabled: true,flex : 1}
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
                    labelWidth:70,
                    allowBlank:false
                },
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'促销状态编码',
                        name:'pros.proStatusId'
                    },{
                        xtype:'textfield',
                        fieldLabel:'促销状态名称',
                        name:'pros.proStatusName'
                    },{
                        xtype:'combo',
                        fieldLabel:'状态',
                        name:'pros.status',
                        editable:false,
                        store: me.states,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'abbr'
                    },{
                        xtype:'textfield',
                        fieldLabel:'备注',
                        name:'pros.remark'

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
                url : '/insertaction3',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.failse){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("pros").store.reload();
                        Ext.getCmp("messege").close();
                    }
                    Ext.Msg.show({
                        title:"系统提示！",
                        msg:msg.message,
                        buttons:Ext.Msg.YES

                    })
                    Ext.getCmp("pros")
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
        var record= Ext.getCmp("pros").getSelectionModel().getSelection()[0];
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
                        fieldLabel:'促销状态编码',
                        name:'pros.proStatusId',
                        value:record.get('proStatusId')
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
                url:'/deleteaction3',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.failse){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("pros").store.reload();
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
        var record= Ext.getCmp("pros").getSelectionModel().getSelection()[0];
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
                    labelWidth:70,
                    allowBlank:false
                },
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'促销状态编码',
                        name:'pros.proStatusId',
                        value:record.get('proStatusId')
                    },{
                        xtype:'textfield',
                        fieldLabel:'促销状态名称',
                        name:'pros.proStatusName'
                    },{
                        xtype:'combo',
                        fieldLabel:'状态',
                        name:'pros.status',
                        editable:false,
                        store: me.states,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'abbr'
                    },{
                        xtype:'textfield',
                        fieldLabel:'备注',
                        name:'pros.remark'
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
                url:'/updateaction3',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    //if(msg.failse){
                        Ext.MessageBox.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("pros").store.reload();
                        Ext.getCmp("ldy1").close();
                },
// else{
//                    Ext.Msg.show({
//                        title: '系统提示！',
//                        msg: msg.message,
//                        buttons: Ext.Msg.YES
//                    });
//                        Ext.getCmp("ldy1").close()
//                    }
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
        Ext.getCmp('pros').store.load({
            params:{
                proStatusId:Ext.getCmp('proStatusId').getValue()
            }
        })
    }
})