Ext.define('instockinsert',{
    extend: 'Ext.panel.Panel',
    oper:Ext.create('Ext.data.Store',{
        proxy:{
            type:'ajax',
            url:'/Operpage',
            reader:{
                type:'json',
                root:'operlist'
            }
        },fields:[
            {
                name:'operId',
                type:'String'
            },{
                name:'operName',
                type:'String'
            }
        ],
        autoLoad:true
    }),
    supper:Ext.create('Ext.data.Store',{
        proxy:{
            type:'ajax',
            url:'/Supplierpage',
            reader:{
                type:'json',
                root:'supplist'
            }
        },fields:[
            {
                name:'supplierId',
                type:'String'
            },{
                name:'supplierName',
                type:'String'
            }
        ],
        autoLoad:true
    }),
    merdise:Ext.create('Ext.data.Store',{
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
    intype:Ext.create('Ext.data.Store',{
        fields: ['abbr', 'name'],
        data : [
            {"abbr":"1", "name":"正常入库"},
            {"abbr":"2", "name":"报溢"},
            {"abbr":"3", "name":"盘盈"}
        ]
    }),
    initComponent:function(){
        var me = this, cellEditing;
        cellEditing = new Ext.grid.plugin.CellEditing(
            {
                clicksToEdit: 1,
                listeners:{
                    edit:function(editor, context){
                        if (context.value)
                        {
                            var myStore = Ext.data.StoreManager.lookup('myStore');
                            if (context.field === "number")
                            {
                                if (context.record.data.price)
                                {
                                    context.record.data.total = context.record.data.price * context.value;
                                    myStore.remove(context.record);
                                    myStore.insert(context.rowIdx, context.record);
                                }
                            }
                            if (context.field === "price")
                            {
                                if (context.record.data.number)
                                {
                                    context.record.data.total = context.record.data.number * context.value;
                                    myStore.remove(context.record);
                                    myStore.insert(context.rowIdx, context.record);
                                }
                            }
                            if (context.record.data.name && context.record.data.number && context.record.data.price)
                            {
                                myStore.add({});
                            }

                            me.totalmoney = 0;
                            for(var i=0;i<myStore.data.items.length;i++){
                                if (!isNaN(myStore.data.items[i].data.total) && myStore.data.items[i].data.total != "")
                                {
                                    me.totalmoney += myStore.data.items[i].data.total;
                                }
                            }
                            Ext.getCmp('intotalmoney').setValue(me.totalmoney);
                        }

                    }
                }
            }
        );
        Ext.apply(this,{
                title: '进货信息录入',
                id:'instock',
                layout: 'vbox',
                closable: true,
                tbar: [
                    { xtype: 'tbfill' },
                    {
                        width:100,
                        text: '提交',
                        handler: function(){
                            var mydata = Ext.data.StoreManager.lookup('myStore').data.items;
                            var instockdetail = '';
                            Ext.each(mydata, function(item, index){
                                if (!item.data.total)
                                {
                                    return;
                                }
                                instockdetail += 'instockdetail['+index+'].num=' + item.data.number + '&instockdetail['+index+'].price=' +  item.data.price + '&instockdetail['+index+'].TMeMerchandiseInfoByMerchandiseId.merchandiseId=' + item.data.name;
                                if (index != mydata.length - 1)
                                {
                                    instockdetail += '&';
                                }
                            });
                            Ext.getCmp('inmyFrom').submit({

                                url: '/InstockInfoinsert?'+instockdetail,
                                success:function(form,action){
                                    var msg=Ext.JSON.decode(action.response.responseText)
                                    Ext.Msg.show({
                                        title:"系统提示！",
                                        msg:msg.message,
                                        buttons:Ext.Msg.YES
                                    });
                                    Ext.getCmp("sbin").store.reload();//对apply进行重新加载

                                },
                                failure:function(form,action){
                                    var msg=Ext.JSON.decode(action.response.responseText)
                                    Ext.Msg.show({
                                        title:"系统提示！",
                                        msg:msg.message,
                                        buttons:Ext.Msg.YES
                                    });

                                }
                            });

                        }
                    },{
                        width:100,
                        text:'重置',
                        handler:function(){

                        }
                    }
                ],
                items:[
                    {
                        xtype:'form',
                        height: 100,
                        width: '100%',
                        id:'inmyFrom',
                        layout: 'column',
                        defaults:{
                            labelWidth: 90,
                            margin:'15 15 10 20',
                            labelAlign: 'right'
                        },
                        items:[
                            {
                                xtype:'combo',
                                store:me.oper,
                                editable:false,
                                fieldLabel: '操作员编号',
                                allowBlank:false,
                                displayField:'operName',
                                valueField:'operId',
                                name:'inmyFrom.TAuOperInfoByOperId.operId'
                            },
                            {
                                xtype:'combo',
                                store:me.supper,
                                editable:false,
                                fieldLabel: '供应商编号',
                                allowBlank:false,
                                displayField:'supplierName',
                                valueField:'supplierId',
                                name:'inmyFrom.TBaSupplierInfoBySupplierId.supplierId'
                            },
                            {
                                xtype:'combo',
                                fieldLabel: '入库方式',
                                allowBlank:false,
                                editable:false,
                                store:me.intype,
                                displayField:'name',
                                valueField:'abbr',
                                name:'inmyFrom.inType'
                            },
                            {
                                xtype:'datefield',
                                fieldLabel: '入库时间',
                                name:'inmyFrom.inTime',
                                readOnly:true,
                                editable:false,
                                value:new Date(),
                                format : "Y-m-d H:i:s"
                            },
                            {
                                xtype:'textfield',
                                fieldLabel: '经手人',
                                name:'inmyFrom.handlers'
                            },
                            {
                                xtype:'textfield',
                                fieldLabel: '入库金额',
                                readOnly:true,
                                id:'intotalmoney',
                                name:'inmyFrom.totalMoney'
                            },
                            {
                                xtype:'textfield',
                                fieldLabel: '备注',
                                name:'inmyFrom.remark'
                            }
                        ]
                    },
                    {
                        xtype: 'grid',
                        width: '100%',
                        plugins: cellEditing,
                        id : "sbin",
                        store: Ext.create('Ext.data.ArrayStore', {
                            id: 'myStore',
                            data: [
                                {}
                            ],
                            fields:[
                                'name','number','price','code','total'
                            ]
                        }),
                        columns:[
                            {
                                text: '商品编号',
                                flex : 1,
                                editor:{
                                    allowBlank: false,
                                    xtype:'combo',
                                    store:me.merdise,
                                    editable:false,
                                    displayField:'merchandiseName',
                                    valueField:'merchandiseId'

                                },
                                dataIndex: 'name'
                            },

                            {
                                text: '入库数量',
                                flex : 1,
                                editor:new Ext.form.field.Number({
                                    maxValue: 99,
                                    minValue: 1,
                                    allowBlank: false
                                }),
                                dataIndex: 'number'
                            },
                            {
                                text: '进价',
                                flex : 1,
                                editor:new Ext.form.field.Number({
                                    maxValue: 9999,
                                    minValue: 1,
                                    allowBlank: false
                                }),
                                dataIndex: 'price'
                            },
                            {
                                text: '总价',
                                flex : 1,
                                dataIndex: 'total'
                            }
                        ]
                    }
                ]
            }
        );

        this.callParent();
    }
});