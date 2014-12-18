Ext.define('instockselect',{
    extend:'Ext.panel.Panel',
    initComponent:function(){
        var me=this;
        var checkbox = Ext.create('Ext.selection.CheckboxModel');
        var store1=Ext.create('Ext.data.Store',{
            id:'mystore1',
            pageSize:5,
            proxy:{
                type:'ajax',
                url:'/InstockInfoselect',
                reader:{
                    type:'json',
                    root:'instocklist',
                    totalProperty:'rows'
                }
            },
            fields:[
                {name:"billCode",type:"String"},
                {name:"inType",type:"String"},
                {name:"inTime",type:"String"},
                {name:"handlers",type:"String"},
                {name:"totalMoney",type:"String"},
                {name:"remark",type:"String"},
                {name:"TAuOperInfoByOperId.operName",type:"String"},
                {name:"TBaSupplierInfoBySupplierId.supplierName",type:"String"}
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
            pageSize:5,
            proxy:{
                type:'ajax',
                url:'/InstockdetailInfoselect',
                reader:{
                    type:'json',
                    root:'stockdetaillist',
                    totalProperty:'rows'
                }
            },
            fields:[
                {name:"id",type:"Integer"},
                {name:"TMeMerchandiseInfoByMerchandiseId.merchandiseName",type:"String"},
                {name:"TMeInStockInfoByBillCode.billCode",type:"String"},
                {name:"num",type:"String"},
                {name:"price",type:"String"}
            ],
            autoLoad:true
        });
        store2.load({
            params:{
                start:0,
                limit:5
            }
        });

        Ext.apply(this, {
            title:'入库信息操作',
            closable:true,
            layout:'border',
            items:[
                    {
                    region:'north',
                    flex:1,
                    xtype:'grid',
                    id:'ingrid1',
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
                                var record= Ext.getCmp("ingrid1").getSelectionModel().getSelection()[0];
                                Ext.Ajax.request({
                                    url: '/instockdetaildelete?arry='+record.get('billCode'),
                                    success: function (response) {
                                        var msg = Ext.JSON.decode(response.responseText);
                                        if (msg.failse) {
                                            Ext.MessageBox.show({
                                                title: "提示",
                                                msg: msg.message,
                                                icon: Ext.MessageBox.WARNING,
                                                buttons: Ext.MessageBox.YES
                                            });
                                            Ext.getCmp('ingrid1').store.reload();
                                            Ext.getCmp('ingrid2').store.reload();
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
                            fieldLabel:'请输入账单编号：',
                            labelWidth:250,
                            labelAlign:'right',
                            id:'billCode'

                        },{
                            xtype:'button',
                            text:'查询',
                            handler:function(){me.selectbutton1(me)}
                        }
                    ],
                    columns: [
                        {text: "入库单号", dataIndex: 'billCode', align: "center",flex : 1},
                        {text: "入库方式", dataIndex: 'inType', menuDisabled: true,flex : 1},
                        {text: "入库时间", dataIndex: 'inTime', menuDisabled: true,flex : 1},
                        {text: "经手人", dataIndex: 'handlers', menuDisabled: true,flex : 1},
                        {text: "入库金额", dataIndex: 'totalMoney', menuDisabled: true,flex : 1},
                        {text: "操作员名称", dataIndex: 'TAuOperInfoByOperId.operName', menuDisabled: true,flex : 1},
                        {text: "供应商名称", dataIndex: 'TBaSupplierInfoBySupplierId.supplierName', menuDisabled: true,flex : 1},
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
                                Ext.getCmp('ingrid2').store.reload({
                                    params:{billCode:record.get('billCode')}
                            })
                        }

                    }

                },
                {
                    region: 'center',
                    xtype: 'grid',
                    flex: 2,
                    id: 'ingrid2',
                    store:store2,
                    selModel:checkbox,
                    tbar:[
                        {
                            xtype:'button',
                            text:'删除',
                            handler:function(){
                                var idlist="";
                                var listcode="";
                                var record=Ext.getCmp('ingrid2').getSelectionModel().getSelection();
                                for(var i= 0,len=record.length;i<len;i++){
                                    idlist+=record[i].get("id");
                                    listcode+=record[i].get("TMeInStockInfoByBillCode.billCode");
                                    if(i!=len-1){
                                        idlist+=",";
                                        listcode+=",";

                                    }
                                }
                                Ext.Ajax.request({
                                    url:'/instockdetaildelete1?arry1='+ idlist,
                                    success:function(response){
                                        var msg=Ext.JSON.decode(response.responseText);
                                        if(msg.failse){
                                            Ext.MessageBox.show({
                                                title:'提示',
                                                msg:msg.message,
                                                icon: Ext.MessageBox.WARNING,
                                                buttons: Ext.MessageBox.YES
                                            });
                                            Ext.getCmp('ingrid2').store.reload();

                                            Ext.Ajax.request({
                                                url: '/instockdetailselect2?arry2=' + listcode,
                                                success: function () {
                                                    if (msg.failse) {
                                                        Ext.MessageBox.show({
                                                            title: '提示',
                                                            msg: msg.message,
                                                            icon: Ext.MessageBox.WARNING,
                                                            buttons: Ext.MessageBox.YES
                                                        });
                                                        Ext.getCmp('ingrid1').store.reload();
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
                        {text: "入库单号", dataIndex: 'TMeInStockInfoByBillCode.billCode', menuDisabled: true,flex : 1},
                        {text: "入库数量", dataIndex: 'num', menuDisabled: true,flex : 1},
                        {text: "单价", dataIndex: 'price', menuDisabled: true,flex : 1}
                        ],
                    dockedItems: [
                        {
                            xtype: "pagingtoolbar",
                            store: store2,
                            dock: "bottom",
                            displayInfo: true
                        }
                    ]
                }
                ]

        });
        this.callParent();
    },
    selectbutton1: function(obj){
        Ext.getCmp('ingrid1').store.load({
            params:{
                billCode:Ext.getCmp('billCode').getValue()  //根据谁的模糊查询，要根据某个字段得到的数据，来进行模糊查询
            }
        })
    }


})