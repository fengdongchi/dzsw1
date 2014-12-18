Ext.define('MerchandiseInfo',{
    extend:'Ext.grid.Panel',
    states:Ext.create('Ext.data.Store',{
        fields: ['abbr', 'name'],
        data : [
            {"abbr":"true", "name":"正在销售"},
            {"abbr":"false", "name":"停止销售"}
        ]
    }),
    merc:Ext.create('Ext.data.Store',{
        proxy:{
            type:'ajax',
            url:'/MerchandiseCInfo',
            reader:{
                type:'json',
                root:'mcdlist'
            }
        },fields:[
            {
                name:'merchandiseCid',
                type:'String'
            },{
                name:'merchandiseCName',
                type:'String'
            }
        ],
        autoLoad:true
    }),
    meun:Ext.create('Ext.data.Store',{
        proxy:{
            type:'ajax',
            url:'/UnitInfo',
            reader:{
                type:'json',
                root:'unitlist'
            }
        },fields:[
            {
                name:'unitId',
                type:'String'
            },{
                name:'name',
                type:'String'
            }
        ],
        autoLoad:true
    }),
    pros:Ext.create('Ext.data.Store',{
        proxy:{
            type:'ajax',
            url:'/ProStatusInfo',
            reader:{
                type:'json',
                root:'proslist'
            }
        },fields:[
            {
                name:'proStatusId',
                type:'String'
            },{
                name:'proStatusName',
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
                url:'/MerchandiseInfo',
                reader:{
                    type:'json',
                    root:'chanlist',
                    totalProperty:'rows'
                }
            },
            fields:[
                {name:"merchandiseId",type:"String"},
                {name:"TMeMerchandiseCInfoByMerchandiseCid.merchandiseCName",type:"String"},
                {name:"TMeProStatusInfoByProStatusId.proStatusName",type:"String"},
                {name:"TMeUnitInfoByUnitId.name",type:"String"},
                {name:"merchandiseName",type:"String"},
                {name:"merchandiseAb",type:"String"},
                {name:"price",type:"Integer"},
                {name:"saleStatus",type:"Boolean"},
                {name:"spec",type:"String"},
                {name:"describe",type:"String"},
                {name:"picPath",type:"String"},
                {name:"clickCount",type:"Integer"},
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
            id: 'chan',
            title:'商品信息管理',
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
                    fieldLabel:'请输入所要查询的商品编号：',
                    labelWidth:250,
                    labelAlign:'right',
                    id:'merchandiseId'

                },{
                    xtype:'button',
                    text:'查询',
                    handler:function(){me.selectbutton(me)}
                }
            ],
            columns: [
                {text: "商品编码", dataIndex: 'merchandiseId', align: "center",flex : 1},
                {text: "商品类别", dataIndex: 'TMeMerchandiseCInfoByMerchandiseCid.merchandiseCName', menuDisabled: true,flex : 1},
                {text: "促销状态", dataIndex: 'TMeProStatusInfoByProStatusId.proStatusName', menuDisabled: true,flex : 1},
                {text: "单位编码", dataIndex: 'TMeUnitInfoByUnitId.name', menuDisabled: true,flex : 1},
                {text: "商品名称", dataIndex: 'merchandiseName', menuDisabled: true,flex : 1},
                {text: "商品助记码", dataIndex: 'merchandiseAb', menuDisabled: true,flex : 1},
                {text: "商品价格", dataIndex: 'price', menuDisabled: true,flex : 1},
                {text: "销售状态", dataIndex: 'saleStatus', menuDisabled: true,flex : 1},
                {text: "规格", dataIndex: 'spec', menuDisabled: true,flex : 1},
                {text: "描述", dataIndex: 'describe', menuDisabled: true,flex : 1},
                {text: "图片", dataIndex: 'picPath', menuDisabled: true,flex : 1},
                {text: "点击数", dataIndex: 'clickCount', menuDisabled: true,flex : 1},
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
                        fieldLabel:'商品编码',
                        name:'chan.merchandiseId'
                    },
                    {
                        xtype:'combo',
                        store:me.merc,
                        editable:false,
                        fieldLabel:'商品类别',
                        allowBlank:false,
                        displayField:'merchandiseCName',
                        valueField:'merchandiseCid',
                        name:'chan.TMeMerchandiseCInfoByMerchandiseCid.merchandiseCid'

                    },{
                        fieldLabel:'促销状态编码',
                        xtype : "combo",
                        editable:false,
                        store: me.pros,
                        allowBlank:false,
                        displayField: 'proStatusName',
                        name:'chan.TMeProStatusInfoByProStatusId.proStatusId',
                        valueField: 'proStatusId'
                    },{
                        xtype:'combo',
                        store:me.meun,
                        editable:false,
                        fieldLabel:'单位编码',
                        allowBlank:false,
                        displayField:'name',
                        valueField:'unitId',
                        name:'chan.TMeUnitInfoByUnitId.unitId'
                    },{
                        xtype:'textfield',
                        fieldLabel:'商品名称',
                        name:'chan.merchandiseName'
                    },{
                        xtype:'textfield',
                        fieldLabel:'商品助记码',
                        name:'chan.merchandiseAb'
                    },{
                        xtype:'textfield',
                        fieldLabel:'商品价格',
                        name:'chan.price'
                    },{
                        xtype:'combo',
                        fieldLabel:'销售状态',
                        store:me.states,
                        editable:false,
                        allowBlank:false,
                        displayField:'name',
                        valueField:'abbr',
                        name:'chan.saleStatus'
                    },{
                        xtype:'textfield',
                        fieldLabel:'规格',
                        name:'chan.spec'
                    },{
                        xtype:'textfield',
                        fieldLabel:'描述',
                        name:'chan.describe'
                    },{
                        xtype:'textfield',
                        fieldLabel:'图片',
                        name:'chan.picPath'
                    },{
                        xtype:'textfield',
                        fieldLabel:'点击数',
                        name:'chan.clickCount'
                    },{
                        xtype:'textfield',
                        fieldLabel:'备注',
                        name:'chan.remark'
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
                url : '/insertaction5',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.failse){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("chan").store.reload();//对apply进行重新加载
                        Ext.getCmp("messege").close();
                    }
                    Ext.Msg.show({
                        title:"系统提示！",
                        msg:msg.message,
                        buttons:Ext.Msg.YES

                    })
                    Ext.getCmp("chan")
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
        var record= Ext.getCmp("chan").getSelectionModel().getSelection()[0];
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
                        fieldLabel:'商品编码',
                        name:'chan.merchandiseId',
                        value:record.get('merchandiseId')
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
                url:'/deleteaction5',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.failse){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("chan").store.reload();//对apply进行重新加载
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
        var record= Ext.getCmp("chan").getSelectionModel().getSelection()[0];
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
//                height:90,
                defaults:{
                    labelAlign:'right',
                    labelWidth:90,
                    allowBlank:false
                },
                items:[
                    {
                        xtype:'textfield',
                        hidden:true,
                        fieldLabel:'商品编码',
                        name:'chan.merchandiseId',
                        value:record.get('merchandiseId')
                    },
                    {
                        xtype:'combo',
                        store:me.merc,
                        editable:false,
                        fieldLabel:'商品类别',
                        allowBlank:false,
                        displayField:'merchandiseCName',
                        valueField:'merchandiseCid',
                        name:'chan.TMeMerchandiseCInfoByMerchandiseCid.merchandiseCid'

                    },{
                        fieldLabel:'促销状态编码',
                        xtype : "combo",
                        editable:false,
                        store: me.pros,
                        allowBlank:false,
                        displayField: 'proStatusName',
                        valueField: 'proStatusId',
                        name:'chan.TMeProStatusInfoByProStatusId.proStatusId'
                    },{
                        xtype:'combo',
                        store:me.meun,
                        editable:false,
                        fieldLabel:'单位编码',
                        allowBlank:false,
                        displayField:'name',
                        valueField:'unitId',
                        name:'chan.TMeUnitInfoByUnitId.unitId'
                    },{
                        xtype:'textfield',
                        fieldLabel:'商品名称',
                        name:'chan.merchandiseName',
                        value:record.get('merchandiseName')
                    },{
                        xtype:'textfield',
                        fieldLabel:'商品助记码',
                        name:'chan.merchandiseAb',
                        value:record.get('merchandiseAb')
                    },{
                        xtype:'textfield',
                        fieldLabel:'商品价格',
                        name:'chan.price',
                        value:record.get('price')
                    },{
                        xtype:'combo',
                        fieldLabel:'销售状态',
                        store:me.states,
                        editable:false,
                        allowBlank:false,
                        displayField:'name',
                        valueField:'abbr',
                        name:'chan.saleStatus'
                    },{
                        xtype:'textfield',
                        fieldLabel:'规格',
                        name:'chan.spec',
                        value:record.get('spec')
                    },{
                        xtype:'textfield',
                        fieldLabel:'描述',
                        name:'chan.describe',
                        value:record.get('describe')
                    },{
                        xtype:'textfield',
                        fieldLabel:'图片',
                        name:'chan.picPath',
                        value:record.get('picPath')
                    },{
                        xtype:'textfield',
                        fieldLabel:'点击数',
                        name:'chan.clickCount',
                        value:record.get('clickCount')
                    },{
                        xtype:'textfield',
                        fieldLabel:'备注',
                        name:'chan.remark',
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
                url:'/updateaction5',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)

                    Ext.Msg.show({
                        title:"系统提示！",
                        msg:msg.message,
                        buttons:Ext.Msg.YES
                    });
                    Ext.getCmp("chan").store.reload();
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
        Ext.getCmp('chan').store.load({
            params:{
                merchandiseId:Ext.getCmp('merchandiseId').getValue()
            }
        })
    }
});