Ext.define('outstockselect',{
    extend:'Ext.panel.Panel',
    initComponent:function(){
        var me=this;
        var checkbox = Ext.create('Ext.selection.CheckboxModel');
        var store1=Ext.create('Ext.data.Store',{
            id:'mystore1',
            pageSize:5,
            proxy:{
                type:'ajax',
                url:'/OutstockInfoselect',
                reader:{
                    type:'json',
                    root:'outstocklist',
                    totalProperty:'rows'
                }
            },
            fields:[
                {name:"outBillCode",type:"String"},
                {name:"outType",type:"String"},
                {name:"outTime",type:"String"},
                {name:"handlers",type:"String"},
                {name:"totalMoney",type:"String"},
                {name:"remark",type:"String"},
                {name:"TAuOperInfoByOperId.operName",type:"String"}
            ],
            autoLoad:true
        });
        store1.load({
            params:{
                start:0,
                limit:5
            }
        });
        var store2=Ext.create('Ext.data.Store',{
            id:'mystore2',
            pageSize:50,
            proxy:{
                type:'ajax',
                url:'/outstockdetailInfoselect',
                reader:{
                    type:'json',
                    root:'stockdetaillist',
                    totalProperty:'rows'
                }
            },
            fields:[
                {name:"id",type:"Integer"},
                {name:"TMeMerchandiseInfoByMerchandiseId.merchandiseName",type:"String"},
                {name:"TMeOutStockInfoByOutBillCode.outBillCode",type:"String"},
                {name:"num",type:"String"},
                {name:"price",type:"String"}
            ],
            autoLoad:true
        });
        store2.load({
            params:{
                start:0,
                limit:50
            }
        });

        Ext.apply(this, {
            title:'出库信息操作',
            closable:true,
            layout:'border',
            items:[
                    {
                    region:'north',
                    flex:1,
                    xtype:'grid',
                    id:'outgrid1',
                    store:store1,
                    height:300,
                    tbar:[
                        {
                            xtype:'button',
                            text:'修改',
                            handler:function(){me.updatebutton1(me)}
                        },{
                            xtype:'button',
                            text:'删除',
                            handler:function(){
                                var record= Ext.getCmp("outgrid1").getSelectionModel().getSelection()[0];
                                Ext.Ajax.request({
                                    url: '/outstockdetaildelete?arry='+record.get('outBillCode'),
                                    success: function (response) {
                                        var msg = Ext.JSON.decode(response.responseText);
                                        if (msg.failse) {
                                            Ext.MessageBox.show({
                                                title: "提示",
                                                msg: msg.message,
                                                icon: Ext.MessageBox.WARNING,
                                                buttons: Ext.MessageBox.YES
                                            });
                                            Ext.getCmp('outgrid1').store.reload();
                                            Ext.getCmp('outgrid2').store.reload();
                                        } else {
                                            Ext.MessageBox.show({
                                                title: "提示",
                                                msg: msg.message,
                                                icon: Ext.MessageBox.WARNING,
                                                buttons: Ext.MessageBox.YES
                                            });
                                        }
                                    },
                                    failure: function (response) {
                                        var msg = Ext.JSON.decode(response.responseText);
                                        Ext.MessageBox.show({
                                            title: "提示",
                                            msg: msg.message,
                                            icon: Ext.MessageBox.WARNING,
                                            buttons: Ext.MessageBox.YES
                                        });
                                    }
                                });

                            }
                        },{
                            xtype:'textfield',
                            fieldLabel:'请输入账单编号',
                            labelWidth:250,
                            labelAlign:'right',
                            id:'outBillCode'

                        },{
                            xtype:'button',
                            text:'查询',
                            handler:function(){me.selectbutton1(me)}
                        }
                    ],
                    columns: [
                        {text: "出库单号", dataIndex: 'outBillCode', align: "center",flex : 1},
                        {text: "出库方式", dataIndex: 'outType', menuDisabled: true,flex : 1},
                        {text: "出库时间", dataIndex: 'outTime', menuDisabled: true,flex : 1},
                        {text: "经手人", dataIndex: 'handlers', menuDisabled: true,flex : 1},
                        {text: "出库金额", dataIndex: 'totalMoney', menuDisabled: true,flex : 1},
                        {text: "操作员名称", dataIndex: 'TAuOperInfoByOperId.operName', menuDisabled: true,flex : 1},
                        {text: "备注", dataIndex: 'remark', menuDisabled: true,flex : 1}


                    ],
                    dockedItems: [
                        {
                            xtype: "pagingtoolbar",
                            store: store1,
                            dock: "bottom",
                            displayInfo: true
                        }
                    ],
                    listeners:{
                            select:function(gg,record){
                                Ext.getCmp('outgrid2').store.reload({
                                    params:{
                                        outBillCode:record.get('outBillCode')
                                    }
                            })
                        }

                    }

                },
                {
                    region: 'center',
                    xtype: 'grid',
                    flex: 2,
                    id: 'outgrid2',
                    store:store2,
                    selModel:checkbox,
                    tbar:[
                        {
                            xtype:'button',
                            text:'删除',
                            handler:function(){
                                var idlist="";
                                var listcode="";
                                var record=Ext.getCmp('outgrid2').getSelectionModel().getSelection();
                                for(var i= 0,len=record.length;i<len;i++){
                                    idlist+=record[i].get("id");
                                    listcode+=record[i].get("TMeOutStockInfoByOutBillCode.outBillCode");
                                    if(i!=len-1){
                                        idlist+=",";
                                        listcode+=",";

                                    }
                                }
                                Ext.Ajax.request({
                                    url:'/outstockdetaildelete1?arry1='+ idlist,
                                    success:function(response){
                                        var msg=Ext.JSON.decode(response.responseText);
                                        if(msg.failse){
                                            Ext.MessageBox.show({
                                                title:'提示',
                                                msg:msg.message,
                                                icon: Ext.MessageBox.WARNING,
                                                buttons: Ext.MessageBox.YES
                                            });
                                            Ext.getCmp('outgrid2').store.reload();

                                            Ext.Ajax.request({
                                                url: '/outstockdetailselect2?arry2=' + listcode,
                                                success: function () {
                                                    if (msg.failse) {
                                                        Ext.MessageBox.show({
                                                            title: '提示',
                                                            msg: msg.message,
                                                            icon: Ext.MessageBox.WARNING,
                                                            buttons: Ext.MessageBox.YES
                                                        });
                                                        Ext.getCmp('outgrid1').store.reload();
                                                    }
                                                    Ext.MessageBox.show({
                                                        title: '提示',
                                                        msg: msg.message,
                                                        icon: Ext.MessageBox.WARNING,
                                                        buttons: Ext.MessageBox.YES
                                                    })

                                                }
                                            })
                                        }
                                        Ext.MessageBox.show({
                                            title:'提示',
                                            msg:msg.message,
                                            icon: Ext.MessageBox.WARNING,
                                            buttons: Ext.MessageBox.YES
                                        })

                                    },
                                    failure:function(response){
                                        var msg = Ext.JSON.decode(response.responseText);
                                        Ext.MessageBox.show({
                                            title:'提示',
                                            msg:msg.message,
                                            icon: Ext.MessageBox.WARNING,
                                            buttons: Ext.MessageBox.YES
                                        })
                                    }
                                })
                            }
                        }
                    ],
                    columns: [
                        {text:"编号", dataIndex:'id', menuDisabled:true,flex : 1},
                        {text: "商品名称", dataIndex: 'TMeMerchandiseInfoByMerchandiseId.merchandiseName', align: "center",flex : 1},
                        {text: "出库单号", dataIndex: 'TMeOutStockInfoByOutBillCode.outBillCode', menuDisabled: true,flex : 1},
                        {text: "出库数量", dataIndex: 'num', menuDisabled: true,flex : 1},
                        {text: "单价", dataIndex: 'price', menuDisabled: true,flex : 1}
                        ]
                }
                ]

        });
        this.callParent();
    },
    selectbutton1: function(obj){
        Ext.getCmp('outgrid1').store.load({
            params:{
                outBillCode:Ext.getCmp('outBillCode').getValue()  //根据谁的模糊查询，要根据某个字段得到的数据，来进行模糊查询
            }
        })
    }


})