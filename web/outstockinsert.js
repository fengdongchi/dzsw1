Ext.define('outstockinsert',{
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
    outtype:Ext.create('Ext.data.Store',{
        fields: ['abbr', 'name'],
        data : [
            {"abbr":"1", "name":"正常出库"},
            {"abbr":"2", "name":"报损"},
            {"abbr":"3", "name":"盘亏"}
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
                            Ext.getCmp('outtotalmoney').setValue(me.totalmoney);
                        }

                    }
                }
            }
        );
        Ext.apply(this,{
                title: '出货信息添加',
                id:'outstock',
                layout: 'vbox',
                closable: true,
                tbar: [
                    { xtype: 'tbfill' },
                    {
                        width:100,
                        text: '提交',
                        handler: function(){
                            var mydata = Ext.data.StoreManager.lookup('myStore').data.items;
                            var outstockdetail = '';
                            Ext.each(mydata, function(item, index){
                                if (!item.data.total)
                                {
                                    return;
                                }
                                outstockdetail += 'outstockdetail['+index+'].num=' + item.data.number + '&outstockdetail['+index+'].price=' +  item.data.price + '&outstockdetail['+index+'].stockPrice=' +  item.data.price1 + '&outstockdetail['+index+'].TMeMerchandiseInfoByMerchandiseId.merchandiseId=' + item.data.name;
                                if (index != mydata.length - 1)
                                {
                                    outstockdetail += '&';
                                }
                            });
                            Ext.getCmp('myFrom').submit({

                                url: '/OutstockInfoinsert?'+outstockdetail,
                                success:function(form,action){
                                    var msg=Ext.JSON.decode(action.response.responseText)
                                    Ext.Msg.show({
                                        title:"系统提示！",
                                        msg:msg.message,
                                        buttons:Ext.Msg.YES
                                    });
                                    // Ext.getCmp("myFrom").store.reload();
                                    Ext.getCmp("sb").store.reload();//对apply进行重新加载

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
                        id:'myFrom',
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
                                name:'myFrom.TAuOperInfoByOperId.operId'
                            },
                            {
                                xtype:'combo',
                                fieldLabel: '出库方式',
                                allowBlank:false,
                                editable:false,
                                store:me.outtype,
                                displayField:'name',
                                valueField:'abbr',
                                name:'myFrom.outType'
                            },
                            {
                                xtype:'datefield',
                                fieldLabel: '出库时间',
                                name:'myFrom.outTime',
                                readOnly:true,
                                editable:false,
                                value:new Date(),
                                format : "Y-m-d H:i:s"
                            },
                            {
                                xtype:'textfield',
                                fieldLabel: '经手人',
                                name:'myFrom.handlers'
                            },
                            {
                                xtype:'textfield',
                                fieldLabel: '出库金额',
                                readOnly:true,
                                id:'outtotalmoney',
                                name:'myFrom.totalMoney'
                            },
                            {
                                xtype:'textfield',
                                fieldLabel: '备注',
                                name:'myFrom.remark'
                            }
                        ]
                    },
                    {
                        xtype: 'grid',
                        width: '100%',
                        plugins: cellEditing,
                        id : "sb",
                        store: Ext.create('Ext.data.ArrayStore', {
                            id: 'myStore',
                            data: [
                                {}
                            ],
                            fields:[
                                'name','number','price','price1','total'
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
                                text: '出货数量',
                                flex : 1,
                                editor:new Ext.form.field.Number({
                                    maxValue: 99,
                                    minValue: 1,
                                    allowBlank: false
                                }),
                                dataIndex: 'number'
                            },
                            {
                                text: '出售价',
                                flex : 1,
                                editor:new Ext.form.field.Number({
                                    maxValue: 9999,
                                    minValue: 1,
                                    allowBlank: false
                                }),
                                dataIndex: 'price'
                            },
                            {
                                text: '成本价',
                                flex : 1,
                                editor:new Ext.form.field.Number({
                                    maxValue: 9999,
                                    minValue: 1,
                                    allowBlank: false
                                }),
                                dataIndex: 'price1'
                            },
                            {
                                text: '出库金额',
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